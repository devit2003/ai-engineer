import { notFound } from "next/navigation";
import Link from "next/link";
import { PageHeader } from "@/components/shared/PageHeader";
import { Card } from "@/components/ui/Card";
import { SkillStateSelector, AddEvidenceForm } from "@/components/skills/SkillDetailActions";
import { getSkillById } from "@/repositories/skill.repo";

type SkillDetail = NonNullable<Awaited<ReturnType<typeof getSkillById>>>;
type SkillDay = SkillDetail["days"][number];
type SkillProject = SkillDetail["projects"][number];
type SkillEvidence = SkillDetail["evidence"][number];

export default async function SkillDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const skill = await getSkillById(id);

  if (!skill) notFound();

  return (
    <div className="space-y-5">
      <PageHeader
        title={skill.name}
        description={skill.category}
        action={<SkillStateSelector skillId={skill.id} currentState={skill.state} />}
      />

      <Card className="p-5">
        <p className="mb-3 text-[12px] font-medium text-muted">Hari Terkait</p>
        {skill.days.length === 0 ? (
          <p className="text-[13px] text-muted-dim">Belum ada hari belajar yang dikaitkan dengan skill ini.</p>
        ) : (
          <ul className="space-y-1.5">
            {skill.days.map((sd: SkillDay) => (
              <li key={sd.dayId}>
                <Link href={`/roadmap/day/${sd.day.dayNumber}`} className="text-[13px] text-accent hover:underline">
                  Hari {sd.day.dayNumber} — {sd.day.title}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Card>

      <Card className="p-5">
        <p className="mb-3 text-[12px] font-medium text-muted">Proyek Terkait</p>
        {skill.projects.length === 0 ? (
          <p className="text-[13px] text-muted-dim">Belum ada proyek yang dikaitkan dengan skill ini.</p>
        ) : (
          <ul className="space-y-1.5">
            {skill.projects.map((sp: SkillProject) => (
              <li key={sp.projectId}>
                <Link href={`/projects/${sp.project.id}`} className="text-[13px] text-accent hover:underline">
                  {sp.project.name}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Card>

      <Card className="p-5">
        <p className="mb-3 text-[12px] font-medium text-muted">Bukti Skill</p>
        {skill.evidence.length > 0 && (
          <ul className="mb-4 space-y-1.5">
            {skill.evidence.map((ev: SkillEvidence) => (
              <li key={ev.id} className="text-[13px] text-muted">
                <span className="text-muted-dim">[{ev.type}]</span>{" "}
                {ev.url ? (
                  <a href={ev.url} target="_blank" rel="noreferrer" className="text-accent hover:underline">
                    {ev.description || ev.url}
                  </a>
                ) : (
                  ev.description
                )}
              </li>
            ))}
          </ul>
        )}
        <AddEvidenceForm skillId={skill.id} />
      </Card>
    </div>
  );
}
