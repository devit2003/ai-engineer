export type NavItem = {
  label: string;
  href: string;
  icon: "home" | "map" | "layers" | "folder" | "megaphone" | "clock" | "trophy";
};

export const NAV_ITEMS: NavItem[] = [
  { label: "Dasbor", href: "/", icon: "home" },
  { label: "Roadmap", href: "/roadmap", icon: "map" },
  { label: "Skill", href: "/skills", icon: "layers" },
  { label: "Proyek", href: "/projects", icon: "folder" },
  { label: "Konten", href: "/content", icon: "megaphone" },
  { label: "Perjalanan", href: "/journey", icon: "clock" },
  { label: "Milestone", href: "/milestones", icon: "trophy" },
];
