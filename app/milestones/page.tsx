import { PageHeader } from "@/components/shared/PageHeader";
import { EmptyState } from "@/components/shared/EmptyState";
import { Card } from "@/components/ui/Card";
import { Trophy, Lock } from "lucide-react";
import { getAllMilestones } from "@/repositories/milestone.repo";

type MilestoneItem = Awaited<ReturnType<typeof getAllMilestones>>[number];

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Jakarta" }).format(date);
}

export default async function MilestonesPage() {
  const milestones = await getAllMilestones();

  return (
    <div>
      <PageHeader title="Milestone" description="Terbuka otomatis saat hari terkait kamu selesaikan" />

      {milestones.length === 0 ? (
        <EmptyState title="Belum ada milestone" description="Jalankan `npm run db:seed` untuk memuat milestone." />
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {milestones.map((m: MilestoneItem) => (
            <Card key={m.id} className={`flex items-start gap-3 p-4 ${m.unlocked ? "" : "opacity-60"}`}>
              <span
                className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full ${
                  m.unlocked ? "bg-warning-soft text-warning" : "bg-surface-hover text-muted-dim"
                }`}
              >
                {m.unlocked ? <Trophy size={16} /> : <Lock size={14} />}
              </span>
              <div>
                <p className="text-[13px] font-medium text-foreground">{m.title}</p>
                {m.unlocked && m.unlockedAt ? (
                  <p className="text-[11px] text-muted-dim">Terbuka {formatDate(m.unlockedAt)}</p>
                ) : (
                  <p className="text-[11px] text-muted-dim">Terbuka di hari ke-{m.unlockDayThreshold}</p>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
