import IndustryDetail from "@/components/IndustryDetail";
import JsonLd from "@/components/JsonLd";
import { industryGroups } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";

const group = industryGroups.find((g) => g.slug === "public-sector")!;

export const metadata = pageMetadata("/industries/public-sector");

export default function PublicSectorPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema("/industries/public-sector")} />
      <IndustryDetail slug={group.slug} name={group.name} blurb={group.blurb} sub={group.sub} />
    </>
  );
}
