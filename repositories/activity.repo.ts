import { prisma } from "@/lib/prisma";

export async function getRecentActivity(limit = 30) {
  return prisma.activity.findMany({ orderBy: { createdAt: "desc" }, take: limit });
}

export async function logActivity(type: string, message: string) {
  return prisma.activity.create({ data: { type, message } });
}
