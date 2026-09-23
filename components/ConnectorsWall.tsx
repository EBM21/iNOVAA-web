"use client";

import { useState } from "react";
import type { IconType } from "react-icons";
import {
  SiGmail,
  SiGooglecalendar,
  SiGooglesheets,
  SiGoogledrive,
  SiQuickbooks,
  SiHubspot,
  SiZapier,
  SiGooglemaps,
  SiFirebase,
} from "react-icons/si";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";

type Connector = { name: string; Icon?: IconType; color: string; letter?: string };

const rowOne: Connector[] = [
  { name: "Gmail", Icon: SiGmail, color: "#EA4335" },
  { name: "Calendar", Icon: SiGooglecalendar, color: "#4285F4" },
  { name: "Sheets", Icon: SiGooglesheets, color: "#0F9D58" },
  { name: "Drive", Icon: SiGoogledrive, color: "#34A853" },
  { name: "QuickBooks", Icon: SiQuickbooks, color: "#2CA01C" },
  { name: "Slack", color: "#4A154B", letter: "S" },
];

const rowTwo: Connector[] = [
  { name: "HubSpot", Icon: SiHubspot, color: "#FF7A59" },
  { name: "Salesforce", color: "#00A1E0", letter: "SF" },
  { name: "Zapier", Icon: SiZapier, color: "#FF4A00" },
  { name: "Maps", Icon: SiGooglemaps, color: "#EA4335" },
  { name: "Twilio", color: "#F22F46", letter: "T" },
  { name: "Firebase", Icon: SiFirebase, color: "#F5820D" },
];

function Tile({ c }: { c: Connector }) {
  return (
    <div
      title={c.name}
      className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-border bg-background shadow-[0_2px_8px_-2px_rgba(21,18,16,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-brand-orange/40 hover:shadow-[0_12px_24px_-8px_rgba(249,115,22,0.2)]"
    >
      {c.Icon ? (
        <c.Icon className="h-7 w-7" style={{ color: c.color }} />
      ) : (
        <span className="text-sm font-extrabold" style={{ color: c.color }}>
          {c.letter}
        </span>
      )}
    </div>
  );
}

function Row({ items, reverse }: { items: Connector[]; reverse?: boolean }) {
  const [paused, setPaused] = useState(false);
  // Repeated (not just doubled) so the track is always comfortably wider than
  // the viewport — otherwise the translate(-50%) loop only covers a fraction
  // of the row's width and the marquee visibly stalls partway across.
  const repeated = [...items, ...items, ...items, ...items];

  return (
    <div
      className="overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setPaused(false)}
    >
      <div
        className={`flex w-max gap-4 ${reverse ? "marquee-track-reverse" : "marquee-track"}`}
        style={paused ? { animationPlayState: "paused" } : undefined}
      >
        {repeated.map((c, i) => (
          <Tile key={c.name + i} c={c} />
        ))}
      </div>
    </div>
  );
}

export default function ConnectorsWall() {
  return (
    <section className="relative overflow-hidden bg-surface-2 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="Connectors"
          index="§05"
          align="center"
          title="The Tracker's data reaches your tools"
          description="Calendars, payments, comms, and CRM — job data flows in and out without anyone re-typing it twice. Hover or tap to pause."
        />
      </div>

      <Reveal delay={0.1} className="relative mt-14">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-surface-2 to-transparent sm:w-32" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-surface-2 to-transparent sm:w-32" />
        <div className="space-y-4">
          <Row items={rowOne} />
          <Row items={rowTwo} reverse />
        </div>
      </Reveal>
    </section>
  );
}
