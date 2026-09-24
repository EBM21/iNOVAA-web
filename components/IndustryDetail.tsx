import SplitHero from "./ui/SplitHero";
import TrackerHeroVideo from "./TrackerHeroVideo";
import DeviceAnnotation from "./ui/DeviceAnnotation";
import IndustryPortalDashboard from "./IndustryPortalDashboard";
import Reveal from "./ui/Reveal";
import TrustBadgeRow from "./ui/TrustBadgeRow";
import CTASection from "./CTASection";
import FaqSection from "./FaqSection";
import RelatedLinks from "./RelatedLinks";
import SectionHeading from "./ui/SectionHeading";
import { industryContent, links } from "@/lib/content";
import { Building2, RefreshCw, WifiOff } from "lucide-react";

const trustBadges = [
  { icon: <Building2 className="h-4 w-4 text-white" strokeWidth={2} />, label: "Multi-Tenant" },
  { icon: <RefreshCw className="h-4 w-4 text-white" strokeWidth={2} />, label: "Real-Time Sync" },
  { icon: <WifiOff className="h-4 w-4 text-white" strokeWidth={2} />, label: "Offline-First" },
];

const heroStats = [
  { label: "Battery Life", value: "7 Days" },
  { label: "Dust / Water", value: "IP65" },
  { label: "Connectivity", value: "BLE 5.3" },
];

export default function IndustryDetail({
  slug,
  name,
  blurb,
  sub,
}: {
  slug: string;
  name: string;
  blurb: string;
  sub: readonly string[];
}) {
  const content = industryContent[slug];
  // Link to the other industries too, so every industry page is reachable from its siblings.
  const siblings = (["solar", "hvac", "logistics", "hospitality", "landscaping"] as const)
    .filter((s) => s !== slug)
    .map((s) => links[s]);

  return (
    <>
      <SplitHero
        eyebrow={`Industries · ${name}`}
        title={content.h1}
        subhead={blurb}
        secondaryLabel="See how it works"
        secondaryHref="/how-it-works"
        stats={heroStats}
        dark
        visual={
          <div className="relative h-full w-full">
            <TrackerHeroVideo />
            <DeviceAnnotation x="4%" y="18%" dir="left" title="Dual-sensor IMU" text="Motion + orientation" delay={0.8} />
            <DeviceAnnotation x="80%" y="62%" dir="left" title="Side action button" text="Manual event tag" delay={1} />
          </div>
        }
      />

      <section className="pb-8 pt-8">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <TrustBadgeRow badges={trustBadges} />
        </div>
      </section>

      <section className="pb-4">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <Reveal className="flex flex-wrap gap-2">
            {sub.map((s) => (
              <span key={s} className="rounded-full border border-border-strong bg-surface px-4 py-2 text-sm font-medium text-muted">
                {s}
              </span>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <SectionHeading eyebrow={name} title={content.sectionTitle} />
          <div className="mt-6 space-y-4 text-base leading-relaxed text-muted">
            {content.intro.map((p) => (
              <p key={p.slice(0, 32)}>{p}</p>
            ))}
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {content.useCases.map((u) => (
              <article key={u.title} className="surface-card rounded-2xl p-6">
                <h3 className="font-semibold text-foreground">{u.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{u.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <IndustryPortalDashboard slug={slug} />

      <FaqSection title={`${name} questions, answered`} faqs={content.faqs} />
      <RelatedLinks title={`Recommended for ${name} teams`} links={content.related} />
      <RelatedLinks title="Other industries on iNOVAA" links={siblings} />

      <CTASection />
    </>
  );
}
