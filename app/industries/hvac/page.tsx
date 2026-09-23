import IndustryDetail from "@/components/IndustryDetail";
import { industryGroups } from "@/lib/data";

const group = industryGroups.find((g) => g.slug === "hvac")!;

export default function HvacPage() {
  return <IndustryDetail slug={group.slug} name={group.name} blurb={group.blurb} sub={group.sub} />;
}
