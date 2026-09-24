import Hero from "@/components/Hero";
import TrackerSpotlight from "@/components/TrackerSpotlight";
import PartsBreakdown from "@/components/PartsBreakdown";
import FourSystemsFlow from "@/components/FourSystemsFlow";
import PortalPreview from "@/components/PortalPreview";
import ConnectorsWall from "@/components/ConnectorsWall";
import CTASection from "@/components/CTASection";
import IconChipRow from "@/components/ui/IconChipRow";
import FaqSection from "@/components/FaqSection";
import JsonLd from "@/components/JsonLd";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { organizationSchema, websiteSchema } from "@/lib/schema";
import { homeFaqs } from "@/lib/content";
import {
  Sun,
  Thermometer,
  Truck,
  Sparkles,
  Trees,
  SprayCan,
  HardHat,
  ShoppingBag,
  ChefHat,
  Stethoscope,
  Tag,
  Wrench,
} from "lucide-react";
import { div } from "framer-motion/client";

const fields = [
  { icon: <Sun className="h-6 w-6" strokeWidth={1.75} />, label: "Solar Maintenance", href: "/industries/solar" },
  { icon: <Thermometer className="h-6 w-6" strokeWidth={1.75} />, label: "HVAC", href: "/industries/hvac" },
  { icon: <Truck className="h-6 w-6" strokeWidth={1.75} />, label: "Delivery & Logistics", href: "/industries/logistics" },
  { icon: <Sparkles className="h-6 w-6" strokeWidth={1.75} />, label: "Hospitality Cleaning", href: "/industries/hospitality" },
  { icon: <Trees className="h-6 w-6" strokeWidth={1.75} />, label: "Landscaping", href: "/industries/landscaping" },
  { icon: <SprayCan className="h-6 w-6" strokeWidth={1.75} />, label: "Janitorial Services" },
  { icon: <HardHat className="h-6 w-6" strokeWidth={1.75} />, label: "Construction" },
  { icon: <ShoppingBag className="h-6 w-6" strokeWidth={1.75} />, label: "Shop Sales Professionals" },
  { icon: <ChefHat className="h-6 w-6" strokeWidth={1.75} />, label: "Chefs & Cooks" },
  { icon: <Stethoscope className="h-6 w-6" strokeWidth={1.75} />, label: "Nursing Professionals" },
  { icon: <Tag className="h-6 w-6" strokeWidth={1.75} />, label: "Merchandise Labeling & Tagging" },
  { icon: <Wrench className="h-6 w-6" strokeWidth={1.75} />, label: "Engineering Works" },
];

export const metadata = pageMetadata("/");

function BrandIntro() {
  return (
<div>
  
</div>
  );
}

export default function Home() {
  return (
    <>
      <JsonLd data={[organizationSchema, websiteSchema]} />
      <Hero />
      <BrandIntro />
      <TrackerSpotlight />
      <PartsBreakdown />
      <FourSystemsFlow />
      <PortalPreview />
      <ConnectorsWall />
      <IconChipRow eyebrow="Industries" title="Built for" accent="every field" subtitle="One live record, every playbook." items={fields} beige />
      <FaqSection title="IoT wearable tracker questions, answered" faqs={homeFaqs} />
      <CTASection />
    </>
  );
}
