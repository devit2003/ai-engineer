"use client";

import { useTransition } from "react";
import { updateProjectStatusAction } from "@/app/projects/actions";

const STATUSES = [
  { value: "PLANNED", label: "Direncanakan" },
  { value: "IN_PROGRESS", label: "Berjalan" },
  { value: "TESTING", label: "Pengujian" },
  { value: "SHIPPED", label: "Rilis" },
];

export function ProjectStatusSelector({ projectId, currentStatus }: { projectId: string; currentStatus: string }) {
  const [isPending, startTransition] = useTransition();

  return (
    <select
      defaultValue={currentStatus}
      disabled={isPending}
      onChange={(e) => startTransition(() => updateProjectStatusAction(projectId, e.target.value))}
      className="rounded-md border border-border bg-background px-3 py-1.5 text-[13px] text-foreground focus:border-accent disabled:opacity-60"
    >
      {STATUSES.map((s) => (
        <option key={s.value} value={s.value}>
          {s.label}
        </option>
      ))}
    </select>
  );
}
