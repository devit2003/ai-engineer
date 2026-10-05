"use client";

import { useState, useTransition } from "react";
import { Plus } from "lucide-react";
import { createSkillAction } from "@/app/skills/actions";

const CATEGORIES = ["Software Engineering", "AI Systems", "Production"];

export function AddSkillForm() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [isPending, startTransition] = useTransition();

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-1.5 rounded-md bg-surface-hover px-3.5 py-2 text-[13px] font-medium text-foreground transition-colors hover:bg-border"
      >
        <Plus size={14} />
        Tambah Skill
      </button>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!name.trim()) return;
        startTransition(() => {
          createSkillAction(name, category);
        });
        setName("");
        setOpen(false);
      }}
      className="flex flex-wrap items-center gap-2"
    >
      <input
        autoFocus
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nama skill (mis. LangGraph)"
        className="rounded-md border border-border bg-background px-3 py-2 text-[13px] text-foreground placeholder:text-muted-dim focus:border-accent"
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="rounded-md border border-border bg-background px-3 py-2 text-[13px] text-foreground focus:border-accent"
      >
        {CATEGORIES.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
      <button
        type="submit"
        disabled={isPending || !name.trim()}
        className="rounded-md bg-accent px-3.5 py-2 text-[13px] font-medium text-white transition-colors hover:bg-accent-hover disabled:opacity-60"
      >
        Simpan
      </button>
      <button
        type="button"
        onClick={() => setOpen(false)}
        className="text-[13px] text-muted-dim hover:text-foreground"
      >
        Batal
      </button>
    </form>
  );
}
