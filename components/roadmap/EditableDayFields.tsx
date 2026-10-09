"use client";

import { useState, useTransition } from "react";
import { Pencil, Check } from "lucide-react";
import { updateDayDetailsAction } from "@/app/roadmap/day/actions";

type EditableDayFieldsProps = {
  dayId: string;
  dayNumber: number;
  objective: string;
  whyItMatters: string;
};

export function EditableDayFields({ dayId, dayNumber, objective, whyItMatters }: EditableDayFieldsProps) {
  const [editing, setEditing] = useState(false);
  const [objectiveValue, setObjectiveValue] = useState(objective);
  const [whyValue, setWhyValue] = useState(whyItMatters);
  const [isPending, startTransition] = useTransition();

  if (!editing) {
    return (
      <div className="space-y-5">
        <div className="rounded-lg border border-border bg-surface p-5">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-[12px] font-medium text-muted">Objektif</p>
            <button onClick={() => setEditing(true)} className="flex items-center gap-1 text-[11px] text-muted-dim hover:text-accent">
              <Pencil size={11} />
              Edit
            </button>
          </div>
          <p className="text-[13px] text-muted-dim">{objective || "Belum diisi. Klik Edit untuk menuliskannya."}</p>
        </div>

        <div className="rounded-lg border border-border bg-surface p-5">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-[12px] font-medium text-muted">Mengapa ini penting</p>
            <button onClick={() => setEditing(true)} className="flex items-center gap-1 text-[11px] text-muted-dim hover:text-accent">
              <Pencil size={11} />
              Edit
            </button>
          </div>
          <p className="text-[13px] text-muted-dim">{whyItMatters || "Belum diisi."}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-accent/40 bg-surface p-5">
      <div className="space-y-4">
        <div>
          <label className="mb-1.5 block text-[12px] font-medium text-muted">Objektif</label>
          <textarea
            value={objectiveValue}
            onChange={(e) => setObjectiveValue(e.target.value)}
            rows={2}
            placeholder="Apa yang harus dipahami setelah menyelesaikan hari ini?"
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-[13px] text-foreground placeholder:text-muted-dim focus:border-accent"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-[12px] font-medium text-muted">Mengapa ini penting</label>
          <textarea
            value={whyValue}
            onChange={(e) => setWhyValue(e.target.value)}
            rows={2}
            placeholder="Mengapa konsep ini penting bagi seorang AI Engineer?"
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-[13px] text-foreground placeholder:text-muted-dim focus:border-accent"
          />
        </div>
        <div className="flex gap-2">
          <button
            disabled={isPending}
            onClick={() =>
              startTransition(async () => {
                await updateDayDetailsAction(dayId, objectiveValue, whyValue, dayNumber);
                setEditing(false);
              })
            }
            className="flex items-center gap-1.5 rounded-md bg-accent px-3.5 py-2 text-[13px] font-medium text-white transition-colors hover:bg-accent-hover disabled:opacity-60"
          >
            <Check size={14} />
            Simpan
          </button>
          <button
            type="button"
            onClick={() => {
              setObjectiveValue(objective);
              setWhyValue(whyItMatters);
              setEditing(false);
            }}
            className="text-[13px] text-muted-dim hover:text-foreground"
          >
            Batal
          </button>
        </div>
      </div>
    </div>
  );
}
