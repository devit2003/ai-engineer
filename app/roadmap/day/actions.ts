"use server";

import { revalidatePath } from "next/cache";
import {
  toggleTask,
  addTask,
  deleteTask,
  completeDayAndAdvance,
  updateDayDetails,
  addEvidenceToDay,
} from "@/repositories/learningDay.repo";

function refresh(dayNumber: number) {
  revalidatePath(`/roadmap/day/${dayNumber}`);
  revalidatePath("/roadmap");
  revalidatePath("/");
}

export async function toggleTaskAction(taskId: string, completed: boolean, dayNumber: number) {
  await toggleTask(taskId, completed);
  refresh(dayNumber);
}

export async function addTaskAction(dayId: string, label: string, dayNumber: number) {
  const trimmed = label.trim();
  if (!trimmed) return;
  await addTask(dayId, trimmed);
  refresh(dayNumber);
}

export async function deleteTaskAction(taskId: string, dayNumber: number) {
  await deleteTask(taskId);
  refresh(dayNumber);
}

export async function completeDayAction(dayNumber: number) {
  await completeDayAndAdvance(dayNumber);
  refresh(dayNumber);
  refresh(dayNumber + 1);
}

export async function updateDayDetailsAction(
  dayId: string,
  objective: string,
  whyItMatters: string,
  dayNumber: number
) {
  await updateDayDetails(dayId, objective.trim(), whyItMatters.trim());
  refresh(dayNumber);
}

export async function addDayEvidenceAction(
  dayId: string,
  type: string,
  description: string,
  url: string,
  dayNumber: number
) {
  if (!description.trim() && !url.trim()) return;
  await addEvidenceToDay(dayId, type, description.trim(), url.trim() || undefined);
  refresh(dayNumber);
}
