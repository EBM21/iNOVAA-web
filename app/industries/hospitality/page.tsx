import IndustryDetail from "@/components/IndustryDetail";
import { industryGroups } from "@/lib/data";

const group = industryGroups.find((g) => g.slug === "hospitality")!;

export default function HospitalityPage() {
  return <IndustryDetail slug={group.slug} name={group.name} blurb={group.blurb} sub={group.sub} />;
}
