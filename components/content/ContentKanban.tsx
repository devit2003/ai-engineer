"use client";

import { useState, useTransition } from "react";
import { ArrowRight, Plus } from "lucide-react";
import { createContentAction, advanceContentStatusAction } from "@/app/content/actions";

const COLUMNS = [
  { status: "IDEA", label: "Ide" },
  { status: "DRAFT", label: "Draf" },
  { status: "READY", label: "Siap" },
  { status: "PUBLISHED", label: "Terbit" },
];

const PLATFORMS = ["TIKTOK", "INSTAGRAM", "LINKEDIN", "YOUTUBE"];
const PLATFORM_LABEL: Record<string, string> = {
  TIKTOK: "TikTok",
  INSTAGRAM: "Instagram",
  LINKEDIN: "LinkedIn",
  YOUTUBE: "YouTube",
};

type ContentItem = { id: string; title: string; platform: string; status: string };

export function ContentKanban({ items }: { items: ContentItem[] }) {
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [platform, setPlatform] = useState(PLATFORMS[0]);

  return (
    <div>
      <div className="mb-4">
        {open ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!title.trim()) return;
              startTransition(() => createContentAction(title, platform));
              setTitle("");
              setOpen(false);
            }}
            className="flex flex-wrap items-center gap-2 rounded-lg border border-border bg-surface p-3"
          >
            <input
              autoFocus
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Judul ide konten"
              className="min-w-[200px] flex-1 rounded-md border border-border bg-background px-3 py-2 text-[13px] text-foreground placeholder:text-muted-dim focus:border-accent"
            />
            <select
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              className="rounded-md border border-border bg-background px-3 py-2 text-[13px] text-foreground focus:border-accent"
            >
              {PLATFORMS.map((p) => (
                <option key={p} value={p}>
                  {PLATFORM_LABEL[p]}
                </option>
              ))}
            </select>
            <button
              type="submit"
              disabled={isPending || !title.trim()}
              className="rounded-md bg-accent px-3.5 py-2 text-[13px] font-medium text-white hover:bg-accent-hover disabled:opacity-60"
            >
              Simpan
            </button>
            <button type="button" onClick={() => setOpen(false)} className="text-[13px] text-muted-dim">
              Batal
            </button>
          </form>
        ) : (
          <button
            onClick={() => setOpen(true)}
            className="flex items-center gap-1.5 rounded-md bg-surface-hover px-3.5 py-2 text-[13px] font-medium text-foreground transition-colors hover:bg-border"
          >
            <Plus size={14} />
            Tambah Ide
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
        {COLUMNS.map((col) => {
          const colItems = items.filter((i) => i.status === col.status);
          return (
            <div key={col.status} className="rounded-lg border border-border bg-surface p-3">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-[12px] font-medium text-muted">{col.label}</p>
                <span className="text-[11px] text-muted-dim">{colItems.length}</span>
              </div>
              <div className="space-y-2">
                {colItems.map((item) => (
                  <div key={item.id} className="rounded-md border border-border bg-background p-2.5">
                    <p className="text-[12px] text-foreground">{item.title}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-[10px] text-muted-dim">{PLATFORM_LABEL[item.platform]}</span>
                      {item.status !== "PUBLISHED" && (
                        <button
                          disabled={isPending}
                          onClick={() => startTransition(() => advanceContentStatusAction(item.id, item.status))}
                          className="flex items-center gap-1 text-[10px] text-accent hover:underline disabled:opacity-50"
                        >
                          Lanjut
                          <ArrowRight size={10} />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
                {colItems.length === 0 && <p className="text-[11px] text-muted-dim">Kosong</p>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
