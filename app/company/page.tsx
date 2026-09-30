import SplitHero from "@/components/ui/SplitHero";
import TrackerHeroVideo from "@/components/TrackerHeroVideo";
import DeviceAnnotation from "@/components/ui/DeviceAnnotation";
import PortalSyncCallout from "@/components/PortalSyncCallout";
import CTASection from "@/components/CTASection";
import RelatedLinks from "@/components/RelatedLinks";
import JsonLd from "@/components/JsonLd";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import { links } from "@/lib/content";
import Reveal from "@/components/ui/Reveal";
import TrustBadgeRow from "@/components/ui/TrustBadgeRow";
import { Sparkles, Wrench, Building2, Globe } from "lucide-react";
import { companyStats } from "@/lib/data";

const trustBadges = [
  { icon: <Wrench className="h-4 w-4 text-white" strokeWidth={2} />, label: "Field-Tested" },
  { icon: <Building2 className="h-4 w-4 text-white" strokeWidth={2} />, label: "Multi-Tenant" },
  { icon: <Globe className="h-4 w-4 text-white" strokeWidth={2} />, label: "5 Industries" },
];

const heroStats = [
  { label: "Battery Life", value: "7 Days" },
  { label: "Dust / Water", value: "IP65" },
  { label: "Connectivity", value: "BLE 5.3" },
];

export const metadata = pageMetadata("/company");

export default function CompanyPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema("/company")} />
      <SplitHero
        eyebrow="Company"
        title="About iNOVAA: built by people who ran the crews"
        subhead="We build a workforce efficiency platform: the iNOVAA Portal, a software dashboard fed by a wearable Tracker that measures how field teams spend their time."
        secondaryLabel="See how it works"
        secondaryHref="/how-it-works"
        stats={heroStats}
        dark
        visual={
          <div className="relative h-full w-full">
            <TrackerHeroVideo />
            <DeviceAnnotation x="4%" y="18%" dir="left" title="Dual-sensor IMU" text="Motion + orientation" delay={0.8} />
            <PortalSyncCallout href="/platform" />
          </div>
        }
      />

      <div className="mx-auto max-w-4xl px-6 pt-8 lg:px-8">
        <TrustBadgeRow badges={trustBadges} />
      </div>

      <section className="pb-24 pt-8">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <Reveal>
            <div className="surface-card rounded-2xl p-8">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-accent-blue to-accent-teal shadow-[0_8px_16px_-6px_rgba(59,130,246,0.35)]">
                  <Sparkles className="h-5 w-5 text-white" strokeWidth={2} />
                </span>
                <div>
                  <h2 className="font-semibold text-foreground">Our origin</h2>
                  <p className="text-sm text-muted-2">From the field to the platform</p>
                </div>
              </div>
              <p className="mt-6 text-sm leading-relaxed text-muted">
                iNOVAA (formerly NOVAA) began as an internal tool built inside a solar maintenance company to keep
                solar arrays running at full output across Arizona. Running that crew exposed every
                gap in field service software firsthand — jobs tracked on paper, proof of work that
                lived in someone&apos;s camera roll, and customers who had to call to find out what
                happened on site. iNOVAA was built to close those gaps, first for that crew and now
                as a multi-tenant platform for field teams across solar, HVAC, logistics,
                hospitality, and landscaping.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                Today iNOVAA is a workforce efficiency platform with two parts. The iNOVAA Tracker is
                the wearable that collects the data — it recognizes hands-on work from wrist motion,
                even with no signal. The iNOVAA Portal is the software that makes that data useful:
                a dashboard where managers see live job status, team efficiency, schedules, and
                attendance, and where clients see verified proof of every visit.
              </p>
            </div>
          </Reveal>

          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {companyStats.map((s, i) => (
              <Reveal key={s.label} delay={0.1 + i * 0.06} className="surface-card surface-card-hover rounded-xl p-5 text-center">
                <p className="font-mono-data text-xl font-bold text-foreground">{s.value}</p>
                <p className="mt-1 text-xs font-medium uppercase tracking-wider text-muted-2">{s.label}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <RelatedLinks title="Learn more about iNOVAA" links={[links.platform, links.tracker, links.contact]} />
      <CTASection />
    </>
  );
}
