import SplitHero from "./ui/SplitHero";
import TrackerHeroVideo from "./TrackerHeroVideo";
import DeviceAnnotation from "./ui/DeviceAnnotation";
import IndustryPortalDashboard from "./IndustryPortalDashboard";
import Reveal from "./ui/Reveal";
import TrustBadgeRow from "./ui/TrustBadgeRow";
import CTASection from "./CTASection";
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
  return (
    <>
      <SplitHero
        eyebrow="Industries"
        title={name}
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

      <IndustryPortalDashboard slug={slug} />

      <CTASection />
    </>
  );
}
