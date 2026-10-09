import { PageHeader } from "@/components/shared/PageHeader";
import { EmptyState } from "@/components/shared/EmptyState";
import { RoadmapMonth } from "@/components/roadmap/RoadmapMonth";
import { TodayFocus } from "@/components/roadmap/TodayFocus";
import { getAllMonthsWithProgress, getCurrentDay } from "@/repositories/learningDay.repo";

type MonthWithWeeks = Awaited<ReturnType<typeof getAllMonthsWithProgress>>[number];
type WeekWithDays = MonthWithWeeks["weeks"][number];
type DayWithTasks = WeekWithDays["days"][number];

export default async function RoadmapPage() {
  const months = await getAllMonthsWithProgress();

  if (months.length === 0) {
    return (
      <div>
        <PageHeader title="Roadmap 90 Hari" description="Dari software engineering sampai AI di production" />
        <EmptyState
          title="Kurikulum belum dimuat"
          description="Jalankan `npm run db:seed` untuk mengisi 90 hari kurikulum ke database."
        />
      </div>
    );
  }

  const currentDay = await getCurrentDay();
  const currentWeek = months
    .flatMap((m: MonthWithWeeks) => m.weeks)
    .find((w: WeekWithDays) => w.days.some((d: DayWithTasks) => d.dayNumber === currentDay?.dayNumber));

  return (
    <div className="space-y-6">
      <PageHeader title="Roadmap 90 Hari" description="Dari software engineering sampai AI di production" />

      <TodayFocus
        day={currentDay ? { dayNumber: currentDay.dayNumber, title: currentDay.title, objective: currentDay.objective } : null}
        weekTitle={currentWeek ? `Minggu ${currentWeek.number}, ${currentWeek.title}` : undefined}
      />

      <div className="space-y-3">
        {months.map((month: MonthWithWeeks) => {
          const hasCurrentWeek = month.weeks.some((w: WeekWithDays) =>
            w.days.some((d: DayWithTasks) => d.status === "CURRENT")
          );
          return <RoadmapMonth key={month.id} month={month} defaultOpen={hasCurrentWeek || month.number === 1} />;
        })}
      </div>
    </div>
  );
}
