import { DashboardCard } from "@/components/ui/DashboardCard";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/shared/EmptyState";
import { getAllMonthsWithProgress, getCurrentDay } from "@/repositories/learningDay.repo";
import { calculateOverallProgress } from "@/services/progress.service";
import { getAllProjects } from "@/repositories/project.repo";
import { getAllContent } from "@/repositories/content.repo";

type ProjectItem = Awaited<ReturnType<typeof getAllProjects>>[number];
type ContentItem = Awaited<ReturnType<typeof getAllContent>>[number];
type MilestoneItem = ProjectItem["milestones"][number];

type MonthWithWeeks = Awaited<ReturnType<typeof getAllMonthsWithProgress>>[number];
type WeekWithDays = MonthWithWeeks["weeks"][number];
type DayWithTasks = WeekWithDays["days"][number];
type TaskItem = DayWithTasks["tasks"][number];

export default async function DashboardPage() {
  const months = await getAllMonthsWithProgress();

  if (months.length === 0) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Selamat datang, Devit 👋</h1>
          <p className="mt-1 text-[13px] text-muted">
            Perjalanan 90 hari · Belajar → Praktik → Bangun → Uji → Rilis → Bagikan
          </p>
        </div>
        <EmptyState
          title="Kurikulum belum dimuat"
          description="Jalankan `npm run db:seed` untuk mengisi 90 hari kurikulum ke database."
        />
      </div>
    );
  }

  const currentDay = await getCurrentDay();
  const overallProgress = calculateOverallProgress(months);
  const currentWeek = months
    .flatMap((m: MonthWithWeeks) => m.weeks)
    .find((w: WeekWithDays) => w.days.some((d: DayWithTasks) => d.dayNumber === currentDay?.dayNumber));

  const projects = await getAllProjects();
  const activeProject = projects.find((p: ProjectItem) => p.status === "IN_PROGRESS") ?? projects[0];

  const contentItems = await getAllContent();
  const nextContent = contentItems.find((c: ContentItem) => c.status !== "PUBLISHED");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-foreground">Selamat datang, Devit 👋</h1>
        <p className="mt-1 text-[13px] text-muted">
          Perjalanan 90 hari · Belajar → Praktik → Bangun → Uji → Rilis → Bagikan
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card className="col-span-1 flex items-center gap-5 p-5 md:col-span-1">
          <ProgressRing value={overallProgress} label="90 hari" />
          <div>
            <p className="text-[12px] text-muted">Hari saat ini</p>
            <p className="text-lg font-semibold text-foreground">
              {currentDay ? `Hari ${currentDay.dayNumber}` : "Belum dimulai"}
            </p>
            {currentWeek && (
              <p className="mt-1 text-[12px] text-muted-dim">
                Minggu {currentWeek.number} — {currentWeek.title}
              </p>
            )}
          </div>
        </Card>

        <DashboardCard
          label="Proyek Aktif"
          value={activeProject ? activeProject.name : "Belum ada proyek"}
          hint={
            activeProject
              ? `${activeProject.milestones.filter((m: MilestoneItem) => m.completed).length} / ${activeProject.milestones.length} milestone`
              : "Belum ada milestone"
          }
        />
        <DashboardCard
          label="Konten Berikutnya"
          value={nextContent ? nextContent.title : "Belum ada konten direncanakan"}
          hint={nextContent ? `Status: ${nextContent.status}` : "Dijadwalkan tiap 2 hari"}
        />
      </div>

      {currentDay && (
        <Card className="p-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-[12px] text-muted">Fokus hari ini</p>
              <h2 className="text-base font-semibold text-foreground">{currentDay.title}</h2>
            </div>
            <Button href={`/roadmap/day/${currentDay.dayNumber}`}>Lanjutkan Belajar</Button>
          </div>

          {currentDay.tasks.length === 0 ? (
            <p className="text-[13px] text-muted-dim">
              Belum ada task untuk hari ini — tambahkan lewat halaman detail hari.
            </p>
          ) : (
            <ul className="space-y-2">
              {currentDay.tasks.map((task: TaskItem) => (
                <li key={task.id} className="flex items-center gap-2.5 text-[13px] text-muted">
                  <span
                    className={`h-4 w-4 flex-shrink-0 rounded border ${
                      task.completed ? "border-accent bg-accent" : "border-border-strong"
                    }`}
                  />
                  <span className={task.completed ? "text-muted-dim line-through" : ""}>
                    {task.label}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </Card>
      )}

      <Card className="p-5">
        <p className="mb-3 text-[12px] text-muted">Progres keseluruhan</p>
        <ProgressBar value={overallProgress} />
      </Card>
    </div>
  );
}
