import { PageHeader } from "@/components/shared/PageHeader";
import { EmptyState } from "@/components/shared/EmptyState";

export default async function ContentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <div>
      <PageHeader title={`Konten: ${id}`} description="Hook · Masalah · Solusi · Demo · CTA" />
      <EmptyState title="Detail konten belum tersedia" description="Akan dimuat setelah model Content diimplementasikan." />
    </div>
  );
}
