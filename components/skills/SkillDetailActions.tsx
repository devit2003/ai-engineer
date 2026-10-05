"use client";

import { useState, useTransition } from "react";
import { Plus } from "lucide-react";
import { addEvidenceAction, updateSkillStateAction } from "@/app/skills/actions";

const STATES = [
  { value: "NOT_STARTED", label: "Belum Mulai" },
  { value: "LEARNING", label: "Belajar" },
  { value: "PRACTICED", label: "Dipraktikkan" },
  { value: "BUILT", label: "Dibangun" },
  { value: "EVALUATED", label: "Dievaluasi" },
  { value: "MASTERED", label: "Dikuasai" },
];

const EVIDENCE_TYPES = [
  { value: "github", label: "GitHub" },
  { value: "demo", label: "Demo" },
  { value: "article", label: "Artikel" },
  { value: "video", label: "Video" },
  { value: "deployment", label: "Deployment" },
  { value: "evaluation", label: "Evaluasi" },
];

export function SkillStateSelector({ skillId, currentState }: { skillId: string; currentState: string }) {
  const [isPending, startTransition] = useTransition();

  return (
    <select
      defaultValue={currentState}
      disabled={isPending}
      onChange={(e) => startTransition(() => updateSkillStateAction(skillId, e.target.value))}
      className="rounded-md border border-border bg-background px-3 py-1.5 text-[13px] text-foreground focus:border-accent disabled:opacity-60"
    >
      {STATES.map((s) => (
        <option key={s.value} value={s.value}>
          {s.label}
        </option>
      ))}
    </select>
  );
}

export function AddEvidenceForm({ skillId }: { skillId: string }) {
  const [isPending, startTransition] = useTransition();
  const [type, setType] = useState(EVIDENCE_TYPES[0].value);
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        startTransition(() => addEvidenceAction(skillId, type, description, url));
        setDescription("");
        setUrl("");
      }}
      className="space-y-2"
    >
      <div className="flex flex-wrap gap-2">
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="rounded-md border border-border bg-background px-3 py-2 text-[13px] text-foreground focus:border-accent"
        >
          {EVIDENCE_TYPES.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Deskripsi singkat"
          className="min-w-[180px] flex-1 rounded-md border border-border bg-background px-3 py-2 text-[13px] text-foreground placeholder:text-muted-dim focus:border-accent"
        />
      </div>
      <div className="flex flex-wrap gap-2">
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="URL (opsional)"
          className="min-w-[180px] flex-1 rounded-md border border-border bg-background px-3 py-2 text-[13px] text-foreground placeholder:text-muted-dim focus:border-accent"
        />
        <button
          type="submit"
          disabled={isPending || (!description.trim() && !url.trim())}
          className="flex items-center gap-1.5 rounded-md bg-accent px-3.5 py-2 text-[13px] font-medium text-white transition-colors hover:bg-accent-hover disabled:opacity-60"
        >
          <Plus size={14} />
          Tambah Bukti
        </button>
      </div>
    </form>
  );
}
