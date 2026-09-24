import IndustryDetail from "@/components/IndustryDetail";
import JsonLd from "@/components/JsonLd";
import { industryGroups } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";

const group = industryGroups.find((g) => g.slug === "landscaping")!;

export const metadata = pageMetadata("/industries/landscaping");

export default function LandscapingPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema("/industries/landscaping")} />
      <IndustryDetail slug={group.slug} name={group.name} blurb={group.blurb} sub={group.sub} />
    </>
  );
}
