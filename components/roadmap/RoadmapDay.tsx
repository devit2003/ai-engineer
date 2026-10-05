import Link from "next/link";
import { Lock, Check } from "lucide-react";

type RoadmapDayProps = {
  day: {
    id: string;
    dayNumber: number;
    title: string;
    status: string;
  };
};

export function RoadmapDay({ day }: RoadmapDayProps) {
  const isLocked = day.status === "LOCKED";
  const isCurrent = day.status === "CURRENT";
  const isCompleted = day.status === "COMPLETED";

  if (isLocked) {
    return (
      <div className="flex cursor-not-allowed items-center gap-2.5 rounded-md px-3 py-2 text-[13px] text-muted-dim">
        <Lock size={13} className="flex-shrink-0" />
        <span className="text-muted-dim">Hari {day.dayNumber}</span>
        <span>{day.title}</span>
      </div>
    );
  }

  return (
    <Link
      href={`/roadmap/day/${day.dayNumber}`}
      className={`flex items-start gap-2.5 rounded-md px-3 py-2 text-[13px] transition-colors ${
        isCurrent
          ? "bg-accent-soft text-foreground"
          : "text-muted hover:bg-surface-hover hover:text-foreground"
      }`}
    >
      <span
        className={`mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full border ${
          isCompleted
            ? "border-success bg-success"
            : isCurrent
              ? "border-accent"
              : "border-border-strong"
        }`}
      >
        {isCompleted && <Check size={11} className="text-white" strokeWidth={3} />}
      </span>
      <span>
        <span className="block">
          <span className="text-muted-dim">Hari {day.dayNumber}</span>{" "}
          <span className={isCompleted ? "text-muted-dim line-through" : ""}>{day.title}</span>
        </span>
        {isCurrent && (
          <span className="mt-0.5 block text-[11px] text-accent">Belajar • Praktik • Bangun</span>
        )}
      </span>
    </Link>
  );
}
