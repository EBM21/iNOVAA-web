import SplitHero from "@/components/ui/SplitHero";
import TrackerHeroVideo from "@/components/TrackerHeroVideo";
import DeviceAnnotation from "@/components/ui/DeviceAnnotation";
import CapabilityList from "@/components/CapabilityList";
import TrustSection from "@/components/TrustSection";
import CTASection from "@/components/CTASection";
import { Building2, Palette, Lock, Users2 } from "lucide-react";

const items = [
  { icon: <Palette className="h-4.5 w-4.5" strokeWidth={2} />, title: "Custom branding", text: "Your logo, colors, and domain on every screen — iNOVAA runs invisibly underneath." },
  { icon: <Lock className="h-4.5 w-4.5" strokeWidth={2} />, title: "Tenant-isolated data", text: "Every client company's jobs, crews, and records are walled off, even on shared infrastructure." },
  { icon: <Users2 className="h-4.5 w-4.5" strokeWidth={2} />, title: "Role-based portals", text: "Admin, Team, Customer, and External partner each get a purpose-built view." },
  { icon: <Building2 className="h-4.5 w-4.5" strokeWidth={2} />, title: "Franchise-ready", text: "Run one parent account across dozens of franchise locations without losing isolation." },
];

const heroStats = [
  { label: "Battery Life", value: "7 Days" },
  { label: "Dust / Water", value: "IP65" },
  { label: "Connectivity", value: "BLE 5.3" },
];

export default function MultiTenantPage() {
  return (
    <>
      <SplitHero
        eyebrow="Platform · Multi-Tenant & Custom Branding"
        title="Run every client company on one platform"
        subhead="Isolated, custom-branded portals for every client, on one platform."
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
      <CapabilityList items={items} />
      <TrustSection />
      <CTASection />
    </>
  );
}
