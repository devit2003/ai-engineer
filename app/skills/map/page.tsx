import { PageHeader } from "@/components/shared/PageHeader";
import { EmptyState } from "@/components/shared/EmptyState";

export default function SkillMapPage() {
  return (
    <div>
      <PageHeader title="Peta Pengetahuan" description="Visualisasi hubungan antar skill" />
      <EmptyState title="Peta belum tersedia" description="Peta interaktif akan dibangun setelah data skill cukup lengkap." />
    </div>
  );
}
