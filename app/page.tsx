import Link from "next/link";
import { EmptyState } from "@/components/shared/EmptyState";
import { Button } from "@/components/ui/Button";
import { JourneyGrid } from "@/components/dashboard/JourneyGrid";
import { NextMilestoneCard } from "@/components/dashboard/NextMilestoneCard";
import { getAllMonthsWithProgress, getCurrentDay, getDayByNumber } from "@/repositories/learningDay.repo";
import { getAllProjects } from "@/repositories/project.repo";
import { getAllContent } from "@/repositories/content.repo";
import { getAllMilestones } from "@/repositories/milestone.repo";
import { countCompletedDays } from "@/services/progress.service";

type MonthWithWeeks = Awaited<ReturnType<typeof getAllMonthsWithProgress>>[number];
type WeekWithDays = MonthWithWeeks["weeks"][number];
type DayWithTasks = WeekWithDays["days"][number];
type ProjectItem = Awaited<ReturnType<typeof getAllProjects>>[number];
type ProjectMilestone = ProjectItem["milestones"][number];
type ContentItem = Awaited<ReturnType<typeof getAllContent>>[number];
type MilestoneItem = Awaited<ReturnType<typeof getAllMilestones>>[number];
type DayDetail = NonNullable<Awaited<ReturnType<typeof getDayByNumber>>>;
type Topic = DayDetail["topics"][number];
type DayTask = DayDetail["tasks"][number];

const STATUS_LABEL: Record<string, string> = {
  IDEA: "Ide",
  DRAFT: "Draf",
  READY: "Siap terbit",
  PUBLISHED: "Terbit",
};

function getGreeting(): string {
  const hour = Number(
    new Intl.DateTimeFormat("en-US", { hour: "numeric", hour12: false, timeZone: "Asia/Jakarta" }).format(new Date())
  );
  if (hour < 11) return "Selamat pagi";
  if (hour < 15) return "Selamat siang";
  if (hour < 18) return "Selamat sore";
  return "Selamat malam";
}

export default async function DashboardPage() {
  const months = await getAllMonthsWithProgress();

  if (months.length === 0) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">{getGreeting()}, Devit</h1>
        <EmptyState
          title="Kurikulum belum dimuat"
          description="Jalankan `npm run db:seed` untuk mengisi 90 hari kurikulum ke database."
        />
      </div>
    );
  }

  const allDays = months
    .flatMap((m: MonthWithWeeks) => m.weeks.flatMap((w: WeekWithDays) => w.days))
    .sort((a: DayWithTasks, b: DayWithTasks) => a.dayNumber - b.dayNumber);

  const completedDays = countCompletedDays(months);
  const currentSummary = await getCurrentDay();
  const currentDay = currentSummary ? await getDayByNumber(currentSummary.dayNumber) : null;

  const projects = await getAllProjects();
  const activeProject = projects.find((p: ProjectItem) => p.status === "IN_PROGRESS") ?? projects[0];

  const contentItems = await getAllContent();
  const nextContent = contentItems.find((c: ContentItem) => c.status !== "PUBLISHED");

  const milestones = await getAllMilestones();
  const nextMilestone = milestones.find((m: MilestoneItem) => !m.unlocked) ?? null;

  const tasksDone = currentDay ? currentDay.tasks.filter((t: DayTask) => t.completed).length : 0;
  const tasksTotal = currentDay ? currentDay.tasks.length : 0;
  const allDone = completedDays >= 90;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">{getGreeting()}, Devit</h1>
        <p className="mt-1 text-[13px] text-muted">
          {allDone
            ? "90 hari selesai. Kamu sudah melewati semuanya."
            : `${90 - completedDays} hari lagi menuju AI Engineer. Satu hari, satu bukti.`}
        </p>
      </div>

      <section className="grid grid-cols-1 overflow-hidden rounded-xl border border-border bg-surface lg:grid-cols-5">
        <div className="border-b border-border p-6 lg:col-span-2 lg:border-b-0 lg:border-r lg:p-8">
          {currentDay ? (
            <>
              <p className="text-[13px] text-muted">
                Minggu {currentDay.week.number}, {currentDay.week.title}
              </p>
              <p className="mt-3 text-5xl font-semibold leading-none tracking-tight text-foreground">
                Hari {currentDay.dayNumber}
              </p>
              <h2 className="mt-3 text-lg font-medium text-foreground">{currentDay.title}</h2>

              <p className="mt-3 text-[13px] leading-relaxed text-muted">
                {currentDay.objective || "Belum ada objektif. Tulis apa yang ingin kamu pahami hari ini di halaman detail."}
              </p>

              {currentDay.topics.length > 0 && (
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {currentDay.topics.slice(0, 5).map((topic: Topic) => (
                    <li key={topic.id} className="rounded-full border border-border px-2.5 py-1 text-[11px] text-muted">
                      {topic.name}
                    </li>
                  ))}
                  {currentDay.topics.length > 5 && (
                    <li className="px-1 py-1 text-[11px] text-muted-dim">+{currentDay.topics.length - 5} lagi</li>
                  )}
                </ul>
              )}

              <p className="mt-5 text-[12px] text-muted-dim">
                {tasksTotal === 0
                  ? "Belum ada task. Tambahkan langkah kecil pertamamu."
                  : `${tasksDone} dari ${tasksTotal} task selesai`}
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <Button href={`/roadmap/day/${currentDay.dayNumber}`} className="px-5 py-2.5 text-[14px]">
                  Lanjutkan belajar
                </Button>
                <Link href="/roadmap" className="text-[13px] text-muted transition-colors hover:text-foreground">
                  Lihat roadmap
                </Link>
              </div>
            </>
          ) : (
            <>
              <p className="text-5xl font-semibold leading-none tracking-tight text-foreground">
                {allDone ? "Selesai" : "Mulai"}
              </p>
              <p className="mt-3 text-[13px] text-muted">
                {allDone
                  ? "Semua 90 hari sudah kamu selesaikan. Rapikan portofoliomu dan bagikan."
                  : "Belum ada hari yang aktif. Buka roadmap untuk memulai."}
              </p>
              <div className="mt-5">
                <Button href="/roadmap" className="px-5 py-2.5 text-[14px]">
                  Buka roadmap
                </Button>
              </div>
            </>
          )}
        </div>

        <div className="p-6 lg:col-span-3 lg:p-8">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <p className="text-5xl font-semibold leading-none tracking-tight text-foreground">{completedDays}</p>
              <p className="mt-2 text-[13px] text-muted">dari 90 hari selesai</p>
            </div>
            <p className="max-w-[16rem] text-right text-[12px] text-muted-dim">
              Setiap kotak adalah satu hari. Klik untuk membuka catatannya.
            </p>
          </div>
          <JourneyGrid days={allDays} />
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <NextMilestoneCard milestone={nextMilestone} completedDays={completedDays} />

        <Link
          href={activeProject ? `/projects/${activeProject.id}` : "/projects"}
          className="block rounded-lg border border-border bg-surface p-5 transition-colors hover:border-border-strong"
        >
          <p className="mb-3 text-[12px] text-muted">Proyek aktif</p>
          {activeProject ? (
            <>
              <p className="text-[15px] font-medium leading-snug text-foreground">{activeProject.name}</p>
              <p className="mt-1 text-[12px] text-muted-dim">
                {activeProject.milestones.filter((m: ProjectMilestone) => m.completed).length} dari{" "}
                {activeProject.milestones.length} milestone selesai
              </p>
            </>
          ) : (
            <>
              <p className="text-[15px] font-medium text-foreground">Belum ada proyek</p>
              <p className="mt-1 text-[12px] text-muted-dim">Mulai dari yang kecil. Proyek pertama jadi bukti pertama.</p>
            </>
          )}
        </Link>

        <Link
          href="/content"
          className="block rounded-lg border border-border bg-surface p-5 transition-colors hover:border-border-strong"
        >
          <p className="mb-3 text-[12px] text-muted">Konten berikutnya</p>
          {nextContent ? (
            <>
              <p className="text-[15px] font-medium leading-snug text-foreground">{nextContent.title}</p>
              <p className="mt-1 text-[12px] text-muted-dim">Status: {STATUS_LABEL[nextContent.status]}</p>
            </>
          ) : (
            <>
              <p className="text-[15px] font-medium text-foreground">Belum ada ide konten</p>
              <p className="mt-1 text-[12px] text-muted-dim">Catat satu hal yang kamu pelajari hari ini sebagai ide.</p>
            </>
          )}
        </Link>
      </section>
    </div>
  );
}
