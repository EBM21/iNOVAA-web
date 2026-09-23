import SplitHero from "@/components/ui/SplitHero";
import TrackerHeroVideo from "@/components/TrackerHeroVideo";
import DeviceAnnotation from "@/components/ui/DeviceAnnotation";
import CapabilityList from "@/components/CapabilityList";
import RoleViews from "@/components/RoleViews";
import CTASection from "@/components/CTASection";
import { Eye, ImageIcon, FileSignature, Clock } from "lucide-react";

const items = [
  { icon: <Eye className="h-4.5 w-4.5" strokeWidth={2} />, title: "Live job status", text: "Clients see the same stage timeline dispatch and crews see — no phone calls to check in." },
  { icon: <Clock className="h-4.5 w-4.5" strokeWidth={2} />, title: "Technician ETA", text: "Real-time ETA updates the moment a crew's route or schedule changes." },
  { icon: <ImageIcon className="h-4.5 w-4.5" strokeWidth={2} />, title: "Before/after photos", text: "Every job closes with visual proof, viewable the moment it's uploaded." },
  { icon: <FileSignature className="h-4.5 w-4.5" strokeWidth={2} />, title: "Digital reports & sign-off history", text: "Every signed FSR and report lives in one place, searchable by site." },
];

const heroStats = [
  { label: "Battery Life", value: "7 Days" },
  { label: "Dust / Water", value: "IP65" },
  { label: "Connectivity", value: "BLE 5.3" },
];

export default function CustomerPortalPage() {
  return (
    <>
      <SplitHero
        eyebrow="Platform · Customer Portal"
        title="Clients see their jobs, in real time"
        subhead="No more calling to ask what happened on site."
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
      <RoleViews />
      <CTASection />
    </>
  );
}
