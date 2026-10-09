import Link from "next/link";

type GridDay = { dayNumber: number; title: string; status: string };

const BASE = "block aspect-square rounded-[3px]";

export function JourneyGrid({ days }: { days: GridDay[] }) {
  return (
    <div>
      <ul className="grid grid-cols-10 gap-1.5 md:grid-cols-15" aria-label="Peta 90 hari perjalanan belajar">
        {days.map((day) => {
          const label = `Hari ${day.dayNumber}: ${day.title}`;

          if (day.status === "LOCKED") {
            return (
              <li key={day.dayNumber}>
                <span title={label} aria-label={`${label}, terkunci`} className={`${BASE} bg-surface-hover`} />
              </li>
            );
          }

          const style =
            day.status === "COMPLETED"
              ? "bg-accent hover:bg-accent-hover"
              : "bg-accent-soft ring-2 ring-accent animate-pulse";

          return (
            <li key={day.dayNumber}>
              <Link
                href={`/roadmap/day/${day.dayNumber}`}
                title={label}
                aria-label={`${label}, ${day.status === "COMPLETED" ? "selesai" : "hari ini"}`}
                className={`${BASE} ${style} transition-colors`}
              />
            </li>
          );
        })}
      </ul>

      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-[11px] text-muted-dim">
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-[2px] bg-accent" />
          Selesai
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-[2px] bg-accent-soft ring-1 ring-accent" />
          Hari ini
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-[2px] bg-surface-hover" />
          Belum terbuka
        </span>
      </div>
    </div>
  );
}
