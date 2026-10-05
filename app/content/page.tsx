import { PageHeader } from "@/components/shared/PageHeader";
import { ContentKanban } from "@/components/content/ContentKanban";
import { getAllContent } from "@/repositories/content.repo";

export default async function ContentPage() {
  const items = await getAllContent();

  return (
    <div>
      <PageHeader
        title="Konten"
        description="Perencanaan Build-in-Public — Ide → Draf → Siap → Terbit"
      />
      <ContentKanban items={items} />
    </div>
  );
}
