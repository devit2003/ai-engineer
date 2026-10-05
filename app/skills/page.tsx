import { PageHeader } from "@/components/shared/PageHeader";
import { EmptyState } from "@/components/shared/EmptyState";
import { SkillCard } from "@/components/skills/SkillCard";
import { AddSkillForm } from "@/components/skills/AddSkillForm";
import { getAllSkills } from "@/repositories/skill.repo";

type SkillItem = Awaited<ReturnType<typeof getAllSkills>>[number];

export default async function SkillsPage() {
  const skills = await getAllSkills();

  return (
    <div>
      <PageHeader
        title="Skill"
        description="Level skill berbasis bukti — bukan sekadar checklist"
        action={<AddSkillForm />}
      />

      {skills.length === 0 ? (
        <EmptyState
          title="Belum ada skill tercatat"
          description="Tambahkan skill pertamamu lewat tombol di atas."
        />
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((skill: SkillItem) => (
            <SkillCard key={skill.id} skill={skill} />
          ))}
        </div>
      )}
    </div>
  );
}
