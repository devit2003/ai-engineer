import { Trophy } from "lucide-react";
import { ProgressBar } from "@/components/ui/ProgressBar";

type NextMilestoneCardProps = {
  milestone: { title: string; unlockDayThreshold: number | null } | null;
  completedDays: number;
};

export function NextMilestoneCard({ milestone, completedDays }: NextMilestoneCardProps) {
  if (!milestone || !milestone.unlockDayThreshold) {
    return (
      <div className="rounded-lg border border-border bg-surface p-5">
        <p className="mb-3 flex items-center gap-2 text-[12px] text-muted">
          <Trophy size={14} className="text-warning" />
          Milestone berikutnya
        </p>
        <p className="text-[15px] font-medium text-foreground">Semua milestone sudah terbuka</p>
        <p className="mt-1 text-[12px] text-muted-dim">Kamu menyelesaikan semuanya. Waktunya membagikan hasilnya.</p>
      </div>
    );
  }

  const threshold = milestone.unlockDayThreshold;
  const remaining = Math.max(threshold - completedDays, 0);
  const percent = Math.min(Math.round((completedDays / threshold) * 100), 100);

  return (
    <div className="rounded-lg border border-border bg-surface p-5">
      <p className="mb-3 flex items-center gap-2 text-[12px] text-muted">
        <Trophy size={14} className="text-warning" />
        Milestone berikutnya
      </p>
      <p className="text-[15px] font-medium leading-snug text-foreground">{milestone.title}</p>
      <p className="mt-1 text-[12px] text-muted-dim">
        {remaining === 0 ? "Selesaikan hari ini untuk membukanya" : `${remaining} hari lagi (hari ke-${threshold})`}
      </p>
      <ProgressBar value={percent} className="mt-4" />
    </div>
  );
}
