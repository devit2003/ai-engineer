import { prisma } from "@/lib/prisma";

export async function getAllContent() {
  return prisma.content.findMany({ orderBy: { id: "desc" } });
}

export async function createContent(data: { title: string; platform: string }) {
  return prisma.content.create({
    data: { title: data.title, platform: data.platform as never, status: "IDEA" },
  });
}

const STATUS_FLOW = ["IDEA", "DRAFT", "READY", "PUBLISHED"] as const;

export function nextStatus(current: string): string {
  const index = STATUS_FLOW.indexOf(current as (typeof STATUS_FLOW)[number]);
  if (index === -1 || index === STATUS_FLOW.length - 1) return current;
  return STATUS_FLOW[index + 1];
}

export async function advanceContentStatus(id: string, currentStatus: string) {
  const status = nextStatus(currentStatus);
  return prisma.content.update({
    where: { id },
    data: { status: status as never, publishedAt: status === "PUBLISHED" ? new Date() : undefined },
  });
}
