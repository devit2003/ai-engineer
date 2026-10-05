"use client";

import { useTransition } from "react";
import { CheckCircle2 } from "lucide-react";
import { completeDayAction } from "@/app/roadmap/day/actions";

export function CompleteDayButton({
  dayNumber,
  status,
}: {
  dayNumber: number;
  status: string;
}) {
  const [isPending, startTransition] = useTransition();

  if (status === "COMPLETED") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-md bg-success-soft px-3.5 py-2 text-[13px] font-medium text-success">
        <CheckCircle2 size={14} />
        Selesai
      </span>
    );
  }

  if (status === "LOCKED") return null;

  return (
    <button
      disabled={isPending}
      onClick={() => startTransition(() => completeDayAction(dayNumber))}
      className="inline-flex items-center gap-1.5 rounded-md bg-accent px-3.5 py-2 text-[13px] font-medium text-white transition-colors hover:bg-accent-hover disabled:opacity-60"
    >
      <CheckCircle2 size={14} />
      Tandai Hari Selesai
    </button>
  );
}
