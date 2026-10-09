"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { RoadmapDay } from "./RoadmapDay";
import { getWeekDayStats } from "@/services/progress.service";

type RoadmapWeekProps = {
  week: {
    id: string;
    number: number;
    title: string;
    days: { id: string; dayNumber: number; title: string; status: string; tasks: { completed: boolean }[] }[];
  };
  defaultOpen?: boolean;
};

export function RoadmapWeek({ week, defaultOpen = false }: RoadmapWeekProps) {
  const [open, setOpen] = useState(defaultOpen);
  const { completed, total } = getWeekDayStats(week);

  return (
    <div className="border-b border-border last:border-b-0">
      <button onClick={() => setOpen(!open)} className="flex w-full items-center justify-between px-4 py-3 text-left">
        <div className="flex items-center gap-2.5">
          <ChevronDown size={14} className={`text-muted-dim transition-transform ${open ? "rotate-0" : "-rotate-90"}`} />
          <span className="text-[13px] font-medium text-foreground">
            Minggu {week.number} — {week.title}
          </span>
        </div>
        <span className="text-[11px] text-muted-dim">
          {completed} / {total} hari selesai
        </span>
      </button>

      {open && (
        <div className="space-y-0.5 px-4 pb-3 pl-9">
          {week.days.map((day) => (
            <RoadmapDay key={day.id} day={day} />
          ))}
        </div>
      )}
    </div>
  );
}
