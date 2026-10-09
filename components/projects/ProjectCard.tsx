import Link from "next/link";
import { StatusBadge } from "@/components/ui/StatusBadge";

const STATUS_LABEL: Record<string, string> = {
  PLANNED: "Direncanakan",
  IN_PROGRESS: "Berjalan",
  TESTING: "Pengujian",
  SHIPPED: "Rilis",
};

const STATUS_VARIANT: Record<string, "neutral" | "info" | "warning" | "success"> = {
  PLANNED: "neutral",
  IN_PROGRESS: "info",
  TESTING: "warning",
  SHIPPED: "success",
};

type ProjectCardProps = {
  project: {
    id: string;
    name: string;
    description: string;
    status: string;
    techStack: string[];
    milestones: { completed: boolean }[];
  };
};

export function ProjectCard({ project }: ProjectCardProps) {
  const completedMilestones = project.milestones.filter((m) => m.completed).length;

  return (
    <Link
      href={`/projects/${project.id}`}
      className="block rounded-lg border border-border bg-surface p-4 transition-colors hover:border-border-strong"
    >
      <div className="mb-2 flex items-start justify-between gap-2">
        <p className="text-[13px] font-medium text-foreground">{project.name}</p>
        <StatusBadge status={STATUS_VARIANT[project.status]}>{STATUS_LABEL[project.status]}</StatusBadge>
      </div>
      {project.description && <p className="mb-2 line-clamp-2 text-[12px] text-muted-dim">{project.description}</p>}
      <div className="flex flex-wrap gap-1.5">
        {project.techStack.slice(0, 4).map((tech) => (
          <span key={tech} className="rounded-full border border-border px-2 py-0.5 text-[10px] text-muted">
            {tech}
          </span>
        ))}
      </div>
      {project.milestones.length > 0 && (
        <p className="mt-2 text-[11px] text-muted-dim">
          {completedMilestones} / {project.milestones.length} milestone selesai
        </p>
      )}
    </Link>
  );
}
