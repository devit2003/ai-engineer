import Link from "next/link";

const STAGES = ["Belajar", "Praktik", "Bangun", "Bukti"];

type TodayFocusProps = {
  day: { dayNumber: number; title: string; objective: string } | null;
  weekTitle?: string;
};

export function TodayFocus({ day, weekTitle }: TodayFocusProps) {
  if (!day) return null;

  return (
    <div className="overflow-hidden rounded-lg border border-accent/30 bg-surface">
      <div className="flex items-center justify-between border-b border-border px-5 py-3">
        <p className="text-[12px] font-medium text-accent">Fokus hari ini</p>
        <Link href={`/roadmap/day/${day.dayNumber}`} className="text-[12px] text-muted transition-colors hover:text-foreground">
          Buka detail
        </Link>
      </div>

      <div className="p-5">
        <p className="text-[12px] text-muted-dim">
          Hari {day.dayNumber}
          {weekTitle ? `, ${weekTitle}` : ""}
        </p>
        <h2 className="mt-1 text-lg font-semibold text-foreground">{day.title}</h2>

        <div className="mt-4 rounded-md border border-border bg-background p-4">
          <p className="mb-1.5 text-[11px] font-medium text-muted">Objektif</p>
          <p className="text-[13px] text-muted-dim">
            {day.objective || "Belum diisi. Buka detail hari untuk menuliskannya."}
          </p>

          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 border-t border-border pt-4">
            {STAGES.map((stage) => (
              <span key={stage} className="flex items-center gap-1.5 text-[12px] text-muted">
                <span className="h-1.5 w-1.5 rounded-full border border-muted-dim" />
                {stage}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
