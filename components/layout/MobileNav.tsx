"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Map, Layers, Folder, Megaphone, type LucideIcon } from "lucide-react";
import { NAV_ITEMS } from "@/lib/nav";

const ICONS: Record<string, LucideIcon> = { home: Home, map: Map, layers: Layers, folder: Folder, megaphone: Megaphone };

const MOBILE_ITEMS = NAV_ITEMS.slice(0, 5);

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 flex border-t border-border bg-surface/95 backdrop-blur md:hidden">
      {MOBILE_ITEMS.map((item) => {
        const Icon = ICONS[item.icon];
        const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-1 flex-col items-center gap-1 py-2.5 text-[10px] ${
              isActive ? "text-accent" : "text-muted-dim"
            }`}
          >
            <Icon size={18} strokeWidth={2} />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
