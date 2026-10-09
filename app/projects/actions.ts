"use server";

import { revalidatePath } from "next/cache";
import {
  createProject,
  addMilestone,
  toggleMilestone,
  addMilestoneTask,
  toggleMilestoneTask,
  updateProjectStatus,
} from "@/repositories/project.repo";

function refresh(projectId: string) {
  revalidatePath(`/projects/${projectId}`);
  revalidatePath("/projects");
}

export async function createProjectAction(data: {
  name: string;
  description: string;
  businessProblem: string;
  solution: string;
  techStack: string;
}) {
  if (!data.name.trim()) return;
  await createProject({
    name: data.name.trim(),
    description: data.description.trim(),
    businessProblem: data.businessProblem.trim(),
    solution: data.solution.trim(),
    techStack: data.techStack.split(",").map((s) => s.trim()).filter(Boolean),
  });
  revalidatePath("/projects");
}

export async function addMilestoneAction(projectId: string, title: string, order: number) {
  if (!title.trim()) return;
  await addMilestone(projectId, title.trim(), order);
  refresh(projectId);
}

export async function toggleMilestoneAction(projectId: string, milestoneId: string, completed: boolean) {
  await toggleMilestone(milestoneId, completed);
  refresh(projectId);
}

export async function addMilestoneTaskAction(projectId: string, milestoneId: string, label: string) {
  if (!label.trim()) return;
  await addMilestoneTask(milestoneId, label.trim());
  refresh(projectId);
}

export async function toggleMilestoneTaskAction(projectId: string, taskId: string, completed: boolean) {
  await toggleMilestoneTask(taskId, completed);
  refresh(projectId);
}

export async function updateProjectStatusAction(projectId: string, status: string) {
  await updateProjectStatus(projectId, status);
  refresh(projectId);
}
