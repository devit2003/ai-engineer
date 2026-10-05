import { prisma } from "@/lib/prisma";

export async function getAllSkills() {
  return prisma.skill.findMany({
    orderBy: { name: "asc" },
    include: {
      days: { include: { day: true } },
      projects: { include: { project: true } },
      evidence: true,
    },
  });
}

export async function getSkillById(id: string) {
  return prisma.skill.findUnique({
    where: { id },
    include: {
      days: { include: { day: true } },
      projects: { include: { project: true } },
      evidence: true,
      content: true,
    },
  });
}

export async function createSkill(name: string, category: string) {
  return prisma.skill.create({ data: { name, category } });
}

export async function updateSkillState(id: string, state: string) {
  return prisma.skill.update({ where: { id }, data: { state: state as never } });
}

export async function addEvidenceToSkill(skillId: string, type: string, description: string, url?: string) {
  return prisma.evidence.create({ data: { skillId, type, description, url } });
}
