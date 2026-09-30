import IndustryDetail from "@/components/IndustryDetail";
import JsonLd from "@/components/JsonLd";
import { industryGroups } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";

const group = industryGroups.find((g) => g.slug === "retail")!;

export const metadata = pageMetadata("/industries/retail");

export default function RetailPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema("/industries/retail")} />
      <IndustryDetail slug={group.slug} name={group.name} blurb={group.blurb} sub={group.sub} />
    </>
  );
}
