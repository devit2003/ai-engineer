"use client";

import { useState, useTransition } from "react";
import { Plus } from "lucide-react";
import { createProjectAction } from "@/app/projects/actions";

export function AddProjectForm() {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [form, setForm] = useState({
    name: "",
    description: "",
    businessProblem: "",
    solution: "",
    techStack: "",
  });

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-1.5 rounded-md bg-surface-hover px-3.5 py-2 text-[13px] font-medium text-foreground transition-colors hover:bg-border"
      >
        <Plus size={14} />
        Tambah Proyek
      </button>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!form.name.trim()) return;
        startTransition(() => createProjectAction(form));
        setForm({ name: "", description: "", businessProblem: "", solution: "", techStack: "" });
        setOpen(false);
      }}
      className="mb-4 space-y-2 rounded-lg border border-border bg-surface p-4"
    >
      <input
        autoFocus
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        placeholder="Nama proyek"
        className="w-full rounded-md border border-border bg-background px-3 py-2 text-[13px] text-foreground placeholder:text-muted-dim focus:border-accent"
      />
      <textarea
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        placeholder="Deskripsi singkat"
        rows={2}
        className="w-full rounded-md border border-border bg-background px-3 py-2 text-[13px] text-foreground placeholder:text-muted-dim focus:border-accent"
      />
      <textarea
        value={form.businessProblem}
        onChange={(e) => setForm({ ...form, businessProblem: e.target.value })}
        placeholder="Masalah yang diselesaikan"
        rows={2}
        className="w-full rounded-md border border-border bg-background px-3 py-2 text-[13px] text-foreground placeholder:text-muted-dim focus:border-accent"
      />
      <textarea
        value={form.solution}
        onChange={(e) => setForm({ ...form, solution: e.target.value })}
        placeholder="Solusi"
        rows={2}
        className="w-full rounded-md border border-border bg-background px-3 py-2 text-[13px] text-foreground placeholder:text-muted-dim focus:border-accent"
      />
      <input
        value={form.techStack}
        onChange={(e) => setForm({ ...form, techStack: e.target.value })}
        placeholder="Tech stack, pisahkan dengan koma (Python, FastAPI, ...)"
        className="w-full rounded-md border border-border bg-background px-3 py-2 text-[13px] text-foreground placeholder:text-muted-dim focus:border-accent"
      />
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={isPending || !form.name.trim()}
          className="rounded-md bg-accent px-3.5 py-2 text-[13px] font-medium text-white transition-colors hover:bg-accent-hover disabled:opacity-60"
        >
          Simpan Proyek
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="text-[13px] text-muted-dim hover:text-foreground"
        >
          Batal
        </button>
      </div>
    </form>
  );
}
