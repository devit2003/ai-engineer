"use client";

import { useState, useTransition } from "react";
import { Check, Plus, X } from "lucide-react";
import {
  addMilestoneAction,
  toggleMilestoneAction,
  addMilestoneTaskAction,
  toggleMilestoneTaskAction,
} from "@/app/projects/actions";

type MTask = { id: string; label: string; completed: boolean };
type Milestone = { id: string; order: number; title: string; completed: boolean; tasks: MTask[] };

export function MilestoneList({ projectId, milestones }: { projectId: string; milestones: Milestone[] }) {
  const [isPending, startTransition] = useTransition();
  const [newTitle, setNewTitle] = useState("");
  const [openTaskInput, setOpenTaskInput] = useState<string | null>(null);
  const [taskLabel, setTaskLabel] = useState("");

  return (
    <div className="space-y-3">
      {milestones.map((m) => (
        <div key={m.id} className="rounded-md border border-border p-3">
          <div className="flex items-center gap-2.5">
            <button
              disabled={isPending}
              onClick={() =>
                startTransition(() => toggleMilestoneAction(projectId, m.id, !m.completed))
              }
              className={`flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full border ${
                m.completed ? "border-success bg-success" : "border-border-strong"
              }`}
            >
              {m.completed && <Check size={11} className="text-white" strokeWidth={3} />}
            </button>
            <span className={`text-[13px] ${m.completed ? "text-muted-dim line-through" : "text-foreground"}`}>
              {m.order.toString().padStart(2, "0")} — {m.title}
            </span>
          </div>

          {m.tasks.length > 0 && (
            <ul className="ml-6 mt-2 space-y-1">
              {m.tasks.map((task) => (
                <li key={task.id} className="flex items-center gap-2 text-[12px]">
                  <button
                    disabled={isPending}
                    onClick={() =>
                      startTransition(() => toggleMilestoneTaskAction(projectId, task.id, !task.completed))
                    }
                    className={`flex h-3.5 w-3.5 flex-shrink-0 items-center justify-center rounded border ${
                      task.completed ? "border-accent bg-accent" : "border-border-strong"
                    }`}
                  >
                    {task.completed && <Check size={9} className="text-white" strokeWidth={3} />}
                  </button>
                  <span className={task.completed ? "text-muted-dim line-through" : "text-muted"}>
                    {task.label}
                  </span>
                </li>
              ))}
            </ul>
          )}

          {openTaskInput === m.id ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                startTransition(() => addMilestoneTaskAction(projectId, m.id, taskLabel));
                setTaskLabel("");
                setOpenTaskInput(null);
              }}
              className="ml-6 mt-2 flex items-center gap-1.5"
            >
              <input
                autoFocus
                value={taskLabel}
                onChange={(e) => setTaskLabel(e.target.value)}
                placeholder="Task baru..."
                className="flex-1 rounded-md border border-border bg-background px-2 py-1 text-[12px] text-foreground placeholder:text-muted-dim focus:border-accent"
              />
              <button type="submit" className="text-accent">
                <Plus size={14} />
              </button>
              <button type="button" onClick={() => setOpenTaskInput(null)} className="text-muted-dim">
                <X size={14} />
              </button>
            </form>
          ) : (
            <button
              onClick={() => setOpenTaskInput(m.id)}
              className="ml-6 mt-2 text-[11px] text-muted-dim hover:text-accent"
            >
              + tambah task
            </button>
          )}
        </div>
      ))}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          startTransition(() => addMilestoneAction(projectId, newTitle, milestones.length + 1));
          setNewTitle("");
        }}
        className="flex items-center gap-2"
      >
        <input
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Tambah milestone baru..."
          className="flex-1 rounded-md border border-border bg-background px-3 py-1.5 text-[13px] text-foreground placeholder:text-muted-dim focus:border-accent"
        />
        <button
          type="submit"
          disabled={isPending || !newTitle.trim()}
          className="flex items-center gap-1 rounded-md bg-surface-hover px-2.5 py-1.5 text-[12px] text-muted transition-colors hover:text-foreground disabled:opacity-50"
        >
          <Plus size={14} />
          Tambah
        </button>
      </form>
    </div>
  );
}
