import { prisma } from "@/lib/prisma";
import { logActivity } from "./activity.repo";

export async function getAllMilestones() {
  return prisma.milestone.findMany({
    orderBy: { unlockDayThreshold: "asc" },
  });
}

/** Dipanggil setiap kali sebuah hari ditandai selesai — buka milestone yang ambang harinya sudah tercapai. */
export async function checkAndUnlockMilestones(completedDayNumber: number) {
  const candidates = await prisma.milestone.findMany({
    where: {
      unlocked: false,
      unlockDayThreshold: { lte: completedDayNumber },
    },
  });

  for (const milestone of candidates) {
    await prisma.milestone.update({
      where: { id: milestone.id },
      data: { unlocked: true, unlockedAt: new Date() },
    });
    await logActivity("milestone_unlocked", `Milestone terbuka: ${milestone.title}`);
  }
}
