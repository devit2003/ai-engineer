import { PageHeader } from "@/components/shared/PageHeader";
import { EmptyState } from "@/components/shared/EmptyState";

export default function SkillMapPage() {
  return (
    <div>
      <PageHeader title="Peta Pengetahuan" description="Visualisasi hubungan antar skill" />
      <EmptyState title="Peta belum tersedia" description="Peta interaktif akan dibangun pada tahap polish setelah data Skill lengkap." />
    </div>
  );
}
