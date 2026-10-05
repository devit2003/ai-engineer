import { prisma } from "@/lib/prisma";

const DEMO_USER_NAME = "Devit";

export async function getOrCreateDemoUser() {
  const existing = await prisma.user.findFirst({ where: { name: DEMO_USER_NAME } });
  if (existing) return existing;
  return prisma.user.create({ data: { name: DEMO_USER_NAME } });
}

export async function getAllProjects() {
  return prisma.project.findMany({
    orderBy: { name: "asc" },
    include: { milestones: true, skills: { include: { skill: true } } },
  });
}

export async function getProjectById(id: string) {
  return prisma.project.findUnique({
    where: { id },
    include: {
      milestones: { orderBy: { order: "asc" }, include: { tasks: true } },
      skills: { include: { skill: true } },
      evidence: true,
      content: true,
    },
  });
}

export async function createProject(data: {
  name: string;
  description: string;
  businessProblem: string;
  solution: string;
  techStack: string[];
}) {
  const user = await getOrCreateDemoUser();
  return prisma.project.create({
    data: { ...data, userId: user.id },
  });
}

export async function updateProjectStatus(id: string, status: string) {
  return prisma.project.update({ where: { id }, data: { status: status as never } });
}

export async function addMilestone(projectId: string, title: string, order: number) {
  return prisma.projectMilestone.create({ data: { projectId, title, order, completed: false } });
}

export async function toggleMilestone(id: string, completed: boolean) {
  return prisma.projectMilestone.update({ where: { id }, data: { completed } });
}

export async function addMilestoneTask(milestoneId: string, label: string) {
  return prisma.task.create({ data: { milestoneId, label, completed: false } });
}

export async function toggleMilestoneTask(taskId: string, completed: boolean) {
  return prisma.task.update({ where: { id: taskId }, data: { completed } });
}
