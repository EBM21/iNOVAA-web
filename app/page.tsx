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
    <section className="py-16 sm:py-20" aria-labelledby="brand-intro-heading">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <h2 id="brand-intro-heading" className="text-3xl font-bold tracking-tight sm:text-4xl">
          iNOVAA — formerly NOVAA — is the field workforce tracker that proves the work
        </h2>
        <div className="mt-6 space-y-4 text-base leading-relaxed text-muted">
          <p>
            Field teams do their best work where nobody can see it. iNOVAA pairs an IoT wearable tracker with field
            service management software so managers, dispatchers, and customers see verified progress instead of
            chasing updates. The{" "}
            <Link href="/platform/inovaa-tracker" className="font-medium text-foreground underline underline-offset-4">
              iNOVAA Tracker
            </Link>{" "}
            is a wrist-worn activity tracker for technicians: it recognizes work from hand motion, logs it offline, and
            turns every shift into automatic proof of work.
          </p>
          <p>
            That record flows into the{" "}
            <Link href="/platform" className="font-medium text-foreground underline underline-offset-4">
              iNOVAA Portal
            </Link>
            , where a live dashboard doubles as a worker efficiency tracker and a customer portal shows clients exactly
            what happened on site. Crews in{" "}
            <Link href="/industries" className="font-medium text-foreground underline underline-offset-4">
              solar, HVAC, logistics, hospitality, and landscaping
            </Link>{" "}
            already run on it. If you knew us as NOVAA, you&apos;re in the right place — same team, same product,
            new name.
          </p>
        </div>
      </div>
    </section>
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
