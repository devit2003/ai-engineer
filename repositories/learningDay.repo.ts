import { prisma } from "@/lib/prisma";
import { checkAndUnlockMilestones } from "./milestone.repo";

export async function getAllMonthsWithProgress() {
  return prisma.month.findMany({
    orderBy: { number: "asc" },
    include: {
      weeks: {
        orderBy: { number: "asc" },
        include: {
          days: {
            orderBy: { dayNumber: "asc" },
            include: { tasks: true },
          },
        },
      },
    },
  });
}

export async function getDayByNumber(dayNumber: number) {
  return prisma.learningDay.findUnique({
    where: { dayNumber },
    include: {
      topics: true,
      tasks: true,
      resources: true,
      skills: { include: { skill: true } },
      content: true,
      evidence: true,
      week: { include: { month: true } },
    },
  });
}

export async function getCurrentDay() {
  return prisma.learningDay.findFirst({
    where: { status: "CURRENT" },
    orderBy: { dayNumber: "asc" },
    include: { tasks: true },
  });
}

export async function toggleTask(taskId: string, completed: boolean) {
  return prisma.task.update({
    where: { id: taskId },
    data: { completed },
  });
}

export async function addTask(dayId: string, label: string) {
  return prisma.task.create({
    data: { dayId, label, completed: false },
  });
}

export async function deleteTask(taskId: string) {
  return prisma.task.delete({ where: { id: taskId } });
}

export async function completeDayAndAdvance(dayNumber: number) {
  await prisma.learningDay.update({
    where: { dayNumber },
    data: { status: "COMPLETED" },
  });

  const nextDay = await prisma.learningDay.findUnique({
    where: { dayNumber: dayNumber + 1 },
  });

  if (nextDay && nextDay.status === "LOCKED") {
    await prisma.learningDay.update({
      where: { dayNumber: dayNumber + 1 },
      data: { status: "CURRENT" },
    });
  }

  await prisma.activity.create({
    data: {
      type: "task_completed",
      message: `Hari ${dayNumber} ditandai selesai`,
    },
  });

  await checkAndUnlockMilestones(dayNumber);
}

export async function updateDayDetails(dayId: string, objective: string, whyItMatters: string) {
  return prisma.learningDay.update({
    where: { id: dayId },
    data: { objective, whyItMatters },
  });
}

export async function addEvidenceToDay(dayId: string, type: string, description: string, url?: string) {
  return prisma.evidence.create({ data: { dayId, type, description, url } });
}
