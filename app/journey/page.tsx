import { PageHeader } from "@/components/shared/PageHeader";
import { EmptyState } from "@/components/shared/EmptyState";
import { Card } from "@/components/ui/Card";
import { getRecentActivity } from "@/repositories/activity.repo";

type Activity = Awaited<ReturnType<typeof getRecentActivity>>[number];

const TYPE_LABEL: Record<string, string> = {
  task_completed: "Hari Selesai",
  evidence_added: "Bukti Ditambahkan",
  content_published: "Konten Terbit",
  milestone_unlocked: "Milestone Terbuka",
};

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export default async function JourneyPage() {
  const activities = await getRecentActivity();

  return (
    <div>
      <PageHeader title="Perjalanan" description="Linimasa 90 hari dan aktivitas terbaru" />

      {activities.length === 0 ? (
        <EmptyState
          title="Belum ada aktivitas"
          description="Linimasa akan terisi begitu kamu menandai hari selesai, menambah bukti, atau menerbitkan konten."
        />
      ) : (
        <Card className="p-5">
          <ul className="space-y-4">
            {activities.map((activity: Activity) => (
              <li key={activity.id} className="flex gap-3 border-l-2 border-border pl-4">
                <div className="-ml-[21px] mt-1 h-2.5 w-2.5 flex-shrink-0 rounded-full bg-accent" />
                <div>
                  <p className="text-[11px] font-medium text-accent">{TYPE_LABEL[activity.type] ?? activity.type}</p>
                  <p className="text-[13px] text-foreground">{activity.message}</p>
                  <p className="text-[11px] text-muted-dim">{formatDate(activity.createdAt)}</p>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      )}
    </div>
  );
}
