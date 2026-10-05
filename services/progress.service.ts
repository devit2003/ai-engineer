/**
 * progress.service.ts
 *
 * Progres TIDAK PERNAH disimpan sebagai angka statis (lihat Bagian 26 spek).
 * Semua persentase dihitung di sini dari status Task/LearningDay yang sebenarnya,
 * sehingga hanya ada satu sumber kebenaran untuk seluruh aplikasi.
 */

type TaskLike = { completed: boolean };
type DayLike = { tasks: TaskLike[]; status: string; dayNumber: number };
type WeekLike = { days: DayLike[] };
type MonthLike = { weeks: WeekLike[] };

/** Progres satu hari = jumlah task selesai / total task hari itu. */
export function calculateDayProgress(day: DayLike): number {
  if (day.tasks.length === 0) return 0;
  const completed = day.tasks.filter((t) => t.completed).length;
  return Math.round((completed / day.tasks.length) * 100);
}

/** Progres satu minggu = jumlah hari yang statusnya COMPLETED / total hari minggu itu. */
export function calculateWeekProgress(week: WeekLike): number {
  if (week.days.length === 0) return 0;
  const completedDays = week.days.filter((d) => d.status === "COMPLETED").length;
  return Math.round((completedDays / week.days.length) * 100);
}

/** Progres satu bulan = jumlah minggu yang seluruh harinya selesai / total minggu bulan itu. */
export function calculateMonthProgress(month: MonthLike): number {
  if (month.weeks.length === 0) return 0;
  const completedWeeks = month.weeks.filter(
    (w) => w.days.length > 0 && w.days.every((d) => d.status === "COMPLETED")
  ).length;
  return Math.round((completedWeeks / month.weeks.length) * 100);
}

/** Progres keseluruhan 90 hari = jumlah hari COMPLETED / 90. */
export function calculateOverallProgress(months: MonthLike[]): number {
  const allDays = months.flatMap((m) => m.weeks.flatMap((w) => w.days));
  if (allDays.length === 0) return 0;
  const completedDays = allDays.filter((d) => d.status === "COMPLETED").length;
  return Math.round((completedDays / 90) * 100);
}

/** Cari hari dengan status CURRENT di seluruh kurikulum. */
export function findCurrentDay(months: MonthLike[]): DayLike | undefined {
  return months.flatMap((m) => m.weeks.flatMap((w) => w.days)).find((d) => d.status === "CURRENT");
}

/**
 * Posisi belajar dalam satu bulan, mis. "Hari 5 dari 30".
 * Diurutkan berdasar dayNumber; posisi = hari CURRENT, atau jika tidak ada,
 * jumlah hari yang sudah COMPLETED (dan "selesai" bila semua tuntas).
 */
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

/** Jumlah hari selesai vs total hari dalam satu minggu, mis. "2 / 7 hari selesai". */
export function getWeekDayStats(week: WeekLike): { completed: number; total: number } {
  const total = week.days.length;
  const completed = week.days.filter((d) => d.status === "COMPLETED").length;
  return { completed, total };
}
