import IndustryDetail from "@/components/IndustryDetail";
import { industryGroups } from "@/lib/data";

const group = industryGroups.find((g) => g.slug === "landscaping")!;

export default function LandscapingPage() {
  return <IndustryDetail slug={group.slug} name={group.name} blurb={group.blurb} sub={group.sub} />;
}
