import TrackerPageHero from "@/components/TrackerPageHero";
import TrackerFeatureList from "@/components/TrackerFeatureList";
import PartsBreakdown from "@/components/PartsBreakdown";
import TrackerDetailStrip from "@/components/TrackerDetailStrip";
import CTASection from "@/components/CTASection";
import Reveal from "@/components/ui/Reveal";
import TrustBadgeRow from "@/components/ui/TrustBadgeRow";
import IconChipRow from "@/components/ui/IconChipRow";
import FaqSection from "@/components/FaqSection";
import RelatedLinks from "@/components/RelatedLinks";
import JsonLd from "@/components/JsonLd";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbSchema, trackerProductSchema } from "@/lib/schema";
import { links, trackerFaqs } from "@/lib/content";
import { Cpu, BatteryFull, ShieldCheck, Feather, Droplet, WifiOff, Sun, Thermometer, Truck, Sparkles, Trees } from "lucide-react";

const trustBadges = [
  { icon: <WifiOff className="h-4 w-4 text-white" strokeWidth={2} />, label: "Offline-First" },
  { icon: <ShieldCheck className="h-4 w-4 text-white" strokeWidth={2} />, label: "Rugged Build" },
  { icon: <Feather className="h-4 w-4 text-white" strokeWidth={2} />, label: "All-Day Comfort" },
  { icon: <Droplet className="h-4 w-4 text-white" strokeWidth={2} />, label: "Water Resistant" },
];

const fields = [
  { icon: <Sun className="h-7 w-7" strokeWidth={1.75} />, label: "Solar Maintenance", href: "/industries/solar" },
  { icon: <Thermometer className="h-7 w-7" strokeWidth={1.75} />, label: "HVAC", href: "/industries/hvac" },
  { icon: <Truck className="h-7 w-7" strokeWidth={1.75} />, label: "Delivery & Logistics", href: "/industries/logistics" },
  { icon: <Sparkles className="h-7 w-7" strokeWidth={1.75} />, label: "Hospitality Cleaning", href: "/industries/hospitality" },
  { icon: <Trees className="h-7 w-7" strokeWidth={1.75} />, label: "Landscaping", href: "/industries/landscaping" },
];

const specs = [
  { label: "Microcontroller", value: "XIAO ESP32C3" },
  { label: "Motion sensing", value: "MPU6050 / MPU6500 IMU" },
  { label: "Connectivity", value: "BLE 5.3" },
  { label: "Model", value: "Hybrid TFLite + Random Forest" },
];

export const metadata = pageMetadata("/platform/inovaa-tracker");

export default function InovaaTrackerPage() {
  return (
    <>
      <JsonLd data={[trackerProductSchema, breadcrumbSchema("/platform/inovaa-tracker")]} />
      <TrackerPageHero />

      <div className="mx-auto max-w-7xl px-6 pt-8 lg:px-8">
        <TrustBadgeRow badges={trustBadges} />
      </div>

      <TrackerFeatureList />
      <PartsBreakdown />
      <TrackerDetailStrip />
      <IconChipRow
        eyebrow="Every industry"
        title="Built for"
        accent="every field"
        subtitle="Reliable. Durable. Always with the crew."
        items={fields}
        beige
      />

      <section id="hardware-spec" className="pb-24 pt-4">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <Reveal>
            <div className="surface-card overflow-hidden rounded-2xl">
              <div className="flex items-center gap-2 border-b border-border bg-surface-2 px-5 py-3.5">
                <Cpu className="h-4 w-4 text-brand-orange" />
                <span className="font-mono-data text-xs text-muted-2">inovaa-tracker · hardware spec</span>
              </div>
              <div className="grid gap-px bg-border sm:grid-cols-2">
                {specs.map((s) => (
                  <div key={s.label} className="bg-surface p-5">
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-2">{s.label}</p>
                    <p className="mt-1 font-mono-data text-sm text-foreground">{s.value}</p>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2.5 border-t border-border bg-surface-2 px-5 py-4">
                <BatteryFull className="h-4 w-4 text-status-green" />
                <p className="text-sm text-muted">Multi-day battery life, field-tested across every industry iNOVAA runs.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
      <FaqSection title="iNOVAA Tracker questions, answered" faqs={trackerFaqs} />
      <RelatedLinks
        title="See the iNOVAA Tracker at work"
        links={[links.hvac, links.solar, links.logistics, links.hospitality, links.landscaping, links.platform]}
      />
      <CTASection />
    </>
  );
}
