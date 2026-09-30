import IndustryDetail from "@/components/IndustryDetail";
import JsonLd from "@/components/JsonLd";
import { industryGroups } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";

const group = industryGroups.find((g) => g.slug === "facility-services")!;

export const metadata = pageMetadata("/industries/facility-services");

export default function FacilityServicesPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema("/industries/facility-services")} />
      <IndustryDetail slug={group.slug} name={group.name} blurb={group.blurb} sub={group.sub} />
    </>
  );
}
