import Link from "next/link";
import { StatusBadge } from "@/components/ui/StatusBadge";

const STATE_LABEL: Record<string, string> = {
  NOT_STARTED: "Belum Mulai",
  LEARNING: "Belajar",
  PRACTICED: "Dipraktikkan",
  BUILT: "Dibangun",
  EVALUATED: "Dievaluasi",
  MASTERED: "Dikuasai",
};

const STATE_VARIANT: Record<string, "neutral" | "info" | "warning" | "success"> = {
  NOT_STARTED: "neutral",
  LEARNING: "info",
  PRACTICED: "info",
  BUILT: "warning",
  EVALUATED: "warning",
  MASTERED: "success",
};

type SkillCardProps = {
  skill: {
    id: string;
    name: string;
    category: string;
    state: string;
    days: unknown[];
    evidence: unknown[];
  };
};

export function SkillCard({ skill }: SkillCardProps) {
  return (
    <Link
      href={`/skills/${skill.id}`}
      className="block rounded-lg border border-border bg-surface p-4 transition-colors hover:border-border-strong"
    >
      <div className="mb-2 flex items-start justify-between">
        <div>
          <p className="text-[13px] font-medium text-foreground">{skill.name}</p>
          <p className="text-[11px] text-muted-dim">{skill.category}</p>
        </div>
        <StatusBadge status={STATE_VARIANT[skill.state]}>{STATE_LABEL[skill.state]}</StatusBadge>
      </div>
      <p className="text-[11px] text-muted-dim">
        {skill.days.length} hari terkait · {skill.evidence.length} bukti
      </p>
    </Link>
  );
}
