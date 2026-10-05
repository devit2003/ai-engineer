"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { RoadmapWeek } from "./RoadmapWeek";
import { getMonthDayStats, calculateMonthProgress } from "@/services/progress.service";

type RoadmapMonthProps = {
  month: {
    id: string;
    number: number;
    title: string;
    weeks: {
      id: string;
      number: number;
      title: string;
      days: {
        id: string;
        dayNumber: number;
        title: string;
        status: string;
        tasks: { completed: boolean }[];
      }[];
    }[];
  };
  defaultOpen?: boolean;
};

export function RoadmapMonth({ month, defaultOpen = false }: RoadmapMonthProps) {
  const [open, setOpen] = useState(defaultOpen);
  const stats = getMonthDayStats(month);
  const progress = calculateMonthProgress(month);
  const hasCurrentWeek = month.weeks.some((w) => w.days.some((d) => d.status === "CURRENT"));

  const positionLabel = stats.isComplete
    ? `${stats.totalDays} dari ${stats.totalDays} hari · Selesai`
    : stats.hasStarted
      ? `Hari ${stats.position} dari ${stats.totalDays}`
      : `Belum dimulai · ${stats.totalDays} hari`;

  return (
    <div className="overflow-hidden rounded-lg border border-border bg-surface">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-5 py-4 text-left"
      >
        <div className="flex items-center gap-3">
          <ChevronDown
            size={16}
            className={`text-muted-dim transition-transform ${open ? "rotate-0" : "-rotate-90"}`}
          />
          <div>
            <p className="text-[15px] font-semibold text-foreground">
              Bulan {month.number} — {month.title}
            </p>
            <p className={`text-[11px] ${hasCurrentWeek ? "text-accent" : "text-muted-dim"}`}>
              {positionLabel}
            </p>
          </div>
        </div>
        {stats.hasStarted && (
          <span className="text-[12px] font-medium text-muted-dim">{progress}%</span>
        )}
      </button>

      {open && (
        <div className="border-t border-border">
          {month.weeks.map((week) => (
            <RoadmapWeek
              key={week.id}
              week={week}
              defaultOpen={hasCurrentWeek && week.days.some((d) => d.status === "CURRENT")}
            />
          ))}
        </div>
      )}
    </div>
  );
}
