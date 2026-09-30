"use client";

import SplitHero from "./ui/SplitHero";
import HeroSlider from "./HeroSlider";

const stats = [
  { label: "Tracker Battery", value: "7 Days" },
  { label: "Tracker Rating", value: "IP65" },
  { label: "Portal Sync", value: "Live" },
];

export default function Hero() {
  return (
    <SplitHero
      eyebrow="Workforce Efficiency Platform · iNOVAA Tracker + iNOVAA Portal"
      title={
        <>AI-Powered Field Workforce <span className="gradient-text">Wearables.</span>
        </>
      }
      subhead="iNOVAA is a workforce efficiency platform — a software dashboard connected to a wearable Tracker that automatically measures how field teams spend their time."
      secondaryLabel="See the Portal"
      secondaryHref="#portal"
      stats={stats}
      dark
      visual={
        <div className="relative h-full w-full">
          <HeroSlider />
        </div>
      }
    />
  );
}
