"use client";

import SplitHero from "./ui/SplitHero";
import TrackerHeroVideo from "./TrackerHeroVideo";
import DeviceAnnotation from "./ui/DeviceAnnotation";

const stats = [
  { label: "Battery Life", value: "7 Days" },
  { label: "Dust / Water", value: "IP65" },
  { label: "Connectivity", value: "BLE 5.3" },
];

export default function TrackerPageHero() {
  return (
    <SplitHero
      eyebrow="Platform — iNOVAA Tracker"
      title="Proof of work that doesn't need a check-in"
      subhead="A wearable that detects and classifies field activity automatically."
      secondaryLabel="See specs"
      secondaryHref="#hardware-spec"
      stats={stats}
      dark
      visual={
        <div className="relative h-full w-full">
          <TrackerHeroVideo />
          <DeviceAnnotation x="4%" y="18%" dir="left" title="Dual-sensor IMU" text="Motion + orientation" delay={0.8} />
          <DeviceAnnotation x="80%" y="62%" dir="left" title="Side action button" text="Manual event tag" delay={1} />
        </div>
      }
    />
  );
}
