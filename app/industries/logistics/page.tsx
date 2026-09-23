import IndustryDetail from "@/components/IndustryDetail";
import { industryGroups } from "@/lib/data";

const group = industryGroups.find((g) => g.slug === "logistics")!;

export default function LogisticsPage() {
  return <IndustryDetail slug={group.slug} name={group.name} blurb={group.blurb} sub={group.sub} />;
}
