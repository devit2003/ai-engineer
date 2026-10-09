/**
 * progress.service.ts
 *
 * Progres TIDAK PERNAH disimpan sebagai angka statis. Semua persentase dihitung di sini
 * dari status Task/LearningDay yang sebenarnya — satu sumber kebenaran untuk seluruh aplikasi.
 */

type TaskLike = { completed: boolean };
type DayLike = { tasks: TaskLike[]; status: string; dayNumber: number };
type WeekLike = { days: DayLike[] };
type MonthLike = { weeks: WeekLike[] };

export function calculateDayProgress(day: DayLike): number {
  if (day.tasks.length === 0) return 0;
  const completed = day.tasks.filter((t) => t.completed).length;
  return Math.round((completed / day.tasks.length) * 100);
}

export function calculateWeekProgress(week: WeekLike): number {
  if (week.days.length === 0) return 0;
  const completedDays = week.days.filter((d) => d.status === "COMPLETED").length;
  return Math.round((completedDays / week.days.length) * 100);
}

export function calculateMonthProgress(month: MonthLike): number {
  if (month.weeks.length === 0) return 0;
  const completedWeeks = month.weeks.filter(
    (w) => w.days.length > 0 && w.days.every((d) => d.status === "COMPLETED")
  ).length;
  return Math.round((completedWeeks / month.weeks.length) * 100);
}

export function countCompletedDays(months: MonthLike[]): number {
  return months.flatMap((m) => m.weeks.flatMap((w) => w.days)).filter((d) => d.status === "COMPLETED").length;
}

export function calculateOverallProgress(months: MonthLike[]): number {
  const allDays = months.flatMap((m) => m.weeks.flatMap((w) => w.days));
  if (allDays.length === 0) return 0;
  return Math.round((countCompletedDays(months) / 90) * 100);
}

export function findCurrentDay(months: MonthLike[]): DayLike | undefined {
  return months.flatMap((m) => m.weeks.flatMap((w) => w.days)).find((d) => d.status === "CURRENT");
}

export function getMonthDayStats(month: MonthLike): {
  totalDays: number;
  position: number;
  isComplete: boolean;
  hasStarted: boolean;
} {
  const days = month.weeks.flatMap((w) => w.days).sort((a, b) => a.dayNumber - b.dayNumber);
  const totalDays = days.length;
  const completedCount = days.filter((d) => d.status === "COMPLETED").length;
  const currentIndex = days.findIndex((d) => d.status === "CURRENT");

  if (currentIndex !== -1) {
    return { totalDays, position: currentIndex + 1, isComplete: false, hasStarted: true };
  }
  if (completedCount === totalDays && totalDays > 0) {
    return { totalDays, position: totalDays, isComplete: true, hasStarted: true };
  }
  return { totalDays, position: completedCount, isComplete: false, hasStarted: completedCount > 0 };
}

export function getWeekDayStats(week: WeekLike): { completed: number; total: number } {
  const total = week.days.length;
  const completed = week.days.filter((d) => d.status === "COMPLETED").length;
  return { completed, total };
}
