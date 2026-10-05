"use server";

import { revalidatePath } from "next/cache";
import { createContent, advanceContentStatus } from "@/repositories/content.repo";

export async function createContentAction(title: string, platform: string) {
  if (!title.trim()) return;
  await createContent({ title: title.trim(), platform });
  revalidatePath("/content");
}

export async function advanceContentStatusAction(id: string, currentStatus: string) {
  await advanceContentStatus(id, currentStatus);
  revalidatePath("/content");
}
