import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { Card } from "@/components/ui/Card";
import { MilestoneList } from "@/components/projects/MilestoneList";
import { ProjectStatusSelector } from "@/components/projects/ProjectStatusSelector";
import { getProjectById } from "@/repositories/project.repo";

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await getProjectById(id);

  if (!project) notFound();

  return (
    <div className="space-y-5">
      <Link
        href="/projects"
        className="inline-flex items-center gap-1.5 text-[13px] text-muted-dim transition-colors hover:text-foreground"
      >
        <ArrowLeft size={14} />
        Kembali ke Proyek
      </Link>

      <PageHeader
        title={project.name}
        description={project.description}
        action={<ProjectStatusSelector projectId={project.id} currentStatus={project.status} />}
      />

      {project.techStack.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {project.techStack.map((tech: string) => (
            <span key={tech} className="rounded-full border border-border px-2.5 py-1 text-[11px] text-muted">
              {tech}
            </span>
          ))}
        </div>
      )}

      {(project.businessProblem || project.solution) && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Card className="p-5">
            <p className="mb-2 text-[12px] font-medium text-muted">Masalah</p>
            <p className="text-[13px] text-muted-dim">{project.businessProblem || "Belum diisi"}</p>
          </Card>
          <Card className="p-5">
            <p className="mb-2 text-[12px] font-medium text-muted">Solusi</p>
            <p className="text-[13px] text-muted-dim">{project.solution || "Belum diisi"}</p>
          </Card>
        </div>
      )}

      <Card className="p-5">
        <p className="mb-3 text-[12px] font-medium text-muted">Milestone</p>
        <MilestoneList projectId={project.id} milestones={project.milestones} />
      </Card>
    </div>
  );
}
