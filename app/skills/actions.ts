"use server";

import { revalidatePath } from "next/cache";
import { createSkill, addEvidenceToSkill, updateSkillState } from "@/repositories/skill.repo";

export async function createSkillAction(name: string, category: string) {
  if (!name.trim()) return;
  await createSkill(name.trim(), category);
  revalidatePath("/skills");
}

export async function addEvidenceAction(
  skillId: string,
  type: string,
  description: string,
  url: string
) {
  if (!description.trim() && !url.trim()) return;
  await addEvidenceToSkill(skillId, type, description.trim(), url.trim() || undefined);
  revalidatePath(`/skills/${skillId}`);
  revalidatePath("/skills");
}

export async function updateSkillStateAction(skillId: string, state: string) {
  await updateSkillState(skillId, state);
  revalidatePath(`/skills/${skillId}`);
  revalidatePath("/skills");
}
