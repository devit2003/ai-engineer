import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { Card } from "@/components/ui/Card";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { TaskChecklist } from "@/components/roadmap/TaskChecklist";
import { CompleteDayButton } from "@/components/roadmap/CompleteDayButton";
import { EditableDayFields } from "@/components/roadmap/EditableDayFields";
import { AddDayEvidenceForm } from "@/components/roadmap/AddDayEvidenceForm";
import { getDayByNumber } from "@/repositories/learningDay.repo";

type DayDetail = NonNullable<Awaited<ReturnType<typeof getDayByNumber>>>;
type Topic = DayDetail["topics"][number];
type Resource = DayDetail["resources"][number];
type Evidence = DayDetail["evidence"][number];

const STATUS_LABEL: Record<string, string> = {
  LOCKED: "Terkunci",
  UPCOMING: "Akan datang",
  CURRENT: "Sedang berjalan",
  COMPLETED: "Selesai",
};

const STATUS_VARIANT: Record<string, "neutral" | "info" | "success"> = {
  LOCKED: "neutral",
  UPCOMING: "neutral",
  CURRENT: "info",
  COMPLETED: "success",
};

export default async function RoadmapDayPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const dayNumber = Number(id);

  if (Number.isNaN(dayNumber)) notFound();

  const day = await getDayByNumber(dayNumber);

  if (!day) notFound();

  return (
    <div className="space-y-5">
      <Link
        href="/roadmap"
        className="inline-flex items-center gap-1.5 text-[13px] text-muted-dim transition-colors hover:text-foreground"
      >
        <ArrowLeft size={14} />
        Kembali ke Roadmap
      </Link>

      <PageHeader
        title={`Hari ${day.dayNumber}: ${day.title}`}
        description={`${day.week.month.title}, Minggu ${day.week.number} (${day.week.title})`}
        action={<CompleteDayButton dayNumber={day.dayNumber} status={day.status} />}
      />

      <div className="flex items-center gap-2">
        <StatusBadge status={STATUS_VARIANT[day.status]}>{STATUS_LABEL[day.status]}</StatusBadge>
      </div>

      <EditableDayFields
        dayId={day.id}
        dayNumber={day.dayNumber}
        objective={day.objective}
        whyItMatters={day.whyItMatters}
      />

      {day.topics.length > 0 && (
        <Card className="p-5">
          <p className="mb-3 text-[12px] font-medium text-muted">Topik</p>
          <ul className="flex flex-wrap gap-2">
            {day.topics.map((topic: Topic) => (
              <li key={topic.id} className="rounded-full border border-border px-3 py-1 text-[12px] text-muted">
                {topic.name}
              </li>
            ))}
          </ul>
        </Card>
      )}

      <Card className="p-5">
        <p className="mb-3 text-[12px] font-medium text-muted">Tugas</p>
        <TaskChecklist tasks={day.tasks} dayId={day.id} dayNumber={day.dayNumber} />
      </Card>

      {day.resources.length > 0 && (
        <Card className="p-5">
          <p className="mb-3 text-[12px] font-medium text-muted">Resource</p>
          <ul className="space-y-1.5">
            {day.resources.map((resource: Resource) => (
              <li key={resource.id} className="text-[13px]">
                {resource.url ? (
                  <a href={resource.url} target="_blank" rel="noreferrer" className="text-accent hover:underline">
                    {resource.title}
                  </a>
                ) : (
                  <span className="text-muted">{resource.title}</span>
                )}
              </li>
            ))}
          </ul>
        </Card>
      )}

      <Card className="p-5">
        <p className="mb-3 text-[12px] font-medium text-muted">Bukti skill</p>
        {day.evidence.length > 0 && (
          <ul className="mb-4 space-y-1.5">
            {day.evidence.map((ev: Evidence) => (
              <li key={ev.id} className="text-[13px] text-muted">
                <span className="text-muted-dim">[{ev.type}]</span>{" "}
                {ev.url ? (
                  <a href={ev.url} target="_blank" rel="noreferrer" className="text-accent hover:underline">
                    {ev.description || ev.url}
                  </a>
                ) : (
                  ev.description
                )}
              </li>
            ))}
          </ul>
        )}
        <AddDayEvidenceForm dayId={day.id} dayNumber={day.dayNumber} />
      </Card>
    </div>
  );
}
