"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Map,
  Layers,
  Folder,
  Megaphone,
  Clock,
  Trophy,
  type LucideIcon,
} from "lucide-react";
import { NAV_ITEMS } from "@/lib/nav";

const ICONS: Record<string, LucideIcon> = {
  home: Home,
  map: Map,
  layers: Layers,
  folder: Folder,
  megaphone: Megaphone,
  clock: Clock,
  trophy: Trophy,
};

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex md:w-60 md:flex-col md:border-r md:border-border md:bg-surface/50">
      <div className="flex h-16 items-center gap-2 px-5">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-accent text-[13px] font-semibold text-white">
          D
        </div>
        <div className="leading-tight">
          <p className="text-[13px] font-semibold text-foreground">Devit</p>
          <p className="text-[11px] text-muted-dim">AI Engineer OS</p>
        </div>
      </div>

      <nav className="flex-1 space-y-0.5 px-3 py-2">
        {NAV_ITEMS.map((item) => {
          const Icon = ICONS[item.icon];
          const isActive =
            item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2.5 rounded-md px-3 py-2 text-[13px] transition-colors ${
                isActive
                  ? "bg-accent-soft text-accent"
                  : "text-muted hover:bg-surface-hover hover:text-foreground"
              }`}
            >
              <Icon size={16} strokeWidth={2} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-border px-5 py-4">
        <p className="text-[11px] text-muted-dim">Hari ke-90 · Perjalanan AI Engineer</p>
      </div>
    </aside>
  );
}
