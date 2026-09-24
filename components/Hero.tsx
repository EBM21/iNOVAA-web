"use client";

import SplitHero from "./ui/SplitHero";
import TrackerHeroVideo from "./TrackerHeroVideo";
import DeviceAnnotation from "./ui/DeviceAnnotation";

const stats = [
  { label: "Battery Life", value: "7 Days" },
  { label: "Dust / Water", value: "IP65" },
  { label: "Connectivity", value: "BLE 5.3" },
];

export default function Hero() {
  return (
    <SplitHero
      eyebrow="iNOVAA Tracker — The IoT Wearable Built To Work With Zero Signal On Site."
      title={
        <>
          AI-Powered Field Workforce <span className="gradient-text">Wearables.</span>
        </>
      }
      subhead="Automatic proof of work for every employee - Convert hand-motions into visibility"
      secondaryLabel="See how it works"
      secondaryHref="/how-it-works"
      stats={stats}
      dark
      visual={
        <div className="relative h-full w-full">
          <TrackerHeroVideo />
        </div>
      }
    />
  );
}
