import { PageHeader } from "@/components/shared/PageHeader";
import { EmptyState } from "@/components/shared/EmptyState";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { AddProjectForm } from "@/components/projects/AddProjectForm";
import { getAllProjects } from "@/repositories/project.repo";

type ProjectItem = Awaited<ReturnType<typeof getAllProjects>>[number];

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  return (
    <div>
      <PageHeader title="Proyek" description="Proyek engineering nyata: masalah, solusi, tech stack, milestone" />

      <AddProjectForm />

      {projects.length === 0 ? (
        <EmptyState title="Belum ada proyek" description="Tambahkan proyek pertamamu lewat tombol di atas." />
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project: ProjectItem) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
