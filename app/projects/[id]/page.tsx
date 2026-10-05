import { notFound } from "next/navigation";
import { PageHeader } from "@/components/shared/PageHeader";
import { Card } from "@/components/ui/Card";
import { MilestoneList } from "@/components/projects/MilestoneList";
import { ProjectStatusSelector } from "@/components/projects/ProjectStatusSelector";
import { getProjectById } from "@/repositories/project.repo";

type ProjectDetail = NonNullable<Awaited<ReturnType<typeof getProjectById>>>;

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await getProjectById(id);

  if (!project) notFound();

  return (
    <div className="space-y-5">
      <PageHeader
        title={project.name}
        description={project.description}
        action={<ProjectStatusSelector projectId={project.id} currentStatus={project.status} />}
      />

      {project.techStack.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {project.techStack.map((tech: ProjectDetail['techStack'][number]) => (
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
            <p className="text-[13px] text-muted-dim">{project.businessProblem || "—"}</p>
          </Card>
          <Card className="p-5">
            <p className="mb-2 text-[12px] font-medium text-muted">Solusi</p>
            <p className="text-[13px] text-muted-dim">{project.solution || "—"}</p>
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
