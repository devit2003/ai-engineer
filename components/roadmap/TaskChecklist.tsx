"use client";

import { useState, useTransition } from "react";
import { X, Plus } from "lucide-react";
import { toggleTaskAction, addTaskAction, deleteTaskAction } from "@/app/roadmap/day/actions";

type Task = { id: string; label: string; completed: boolean };

export function TaskChecklist({ tasks, dayId, dayNumber }: { tasks: Task[]; dayId: string; dayNumber: number }) {
  const [isPending, startTransition] = useTransition();
  const [newTask, setNewTask] = useState("");

  return (
    <div>
      {tasks.length === 0 ? (
        <p className="mb-3 text-[13px] text-muted-dim">Belum ada task untuk hari ini. Tambahkan di bawah.</p>
      ) : (
        <ul className="mb-3 space-y-1">
          {tasks.map((task) => (
            <li key={task.id} className="group flex items-center gap-2.5 rounded-md px-2 py-1.5 hover:bg-surface-hover">
              <button
                disabled={isPending}
                onClick={() => startTransition(() => toggleTaskAction(task.id, !task.completed, dayNumber))}
                className="flex h-4 w-4 flex-shrink-0 items-center justify-center rounded border border-border-strong transition-colors disabled:opacity-60"
                style={task.completed ? { backgroundColor: "var(--accent)", borderColor: "var(--accent)" } : undefined}
                aria-label={task.completed ? "Tandai belum selesai" : "Tandai selesai"}
              >
                {task.completed && (
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M1.5 5L4 7.5L8.5 2" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </button>
              <span
                onClick={() => startTransition(() => toggleTaskAction(task.id, !task.completed, dayNumber))}
                className={`flex-1 cursor-pointer text-[13px] ${task.completed ? "text-muted-dim line-through" : "text-foreground"}`}
              >
                {task.label}
              </span>
              <button
                disabled={isPending}
                onClick={() => startTransition(() => deleteTaskAction(task.id, dayNumber))}
                className="text-muted-dim opacity-0 transition-opacity hover:text-error group-hover:opacity-100 focus-visible:opacity-100"
                aria-label="Hapus task"
              >
                <X size={14} />
              </button>
            </li>
          ))}
        </ul>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!newTask.trim()) return;
          startTransition(() => addTaskAction(dayId, newTask, dayNumber));
          setNewTask("");
        }}
        className="flex items-center gap-2"
      >
        <input
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Tambah task baru..."
          className="flex-1 rounded-md border border-border bg-background px-3 py-1.5 text-[13px] text-foreground placeholder:text-muted-dim focus:border-accent"
        />
        <button
          type="submit"
          disabled={isPending || !newTask.trim()}
          className="flex items-center gap-1 rounded-md bg-surface-hover px-2.5 py-1.5 text-[12px] text-muted transition-colors hover:text-foreground disabled:opacity-50"
        >
          <Plus size={14} />
          Tambah
        </button>
      </form>
    </div>
  );
}
