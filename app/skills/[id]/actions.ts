"use server";

import { revalidatePath } from "next/cache";
import { addEvidenceToSkill, updateSkillState } from "@/repositories/skill.repo";

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
