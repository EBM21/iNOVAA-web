"use client";

import { useState, type ComponentType, type CSSProperties } from "react";
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

type LogoProps = { className?: string; style?: CSSProperties };
type Connector = { name: string; Icon: IconType | ComponentType<LogoProps>; color: string };

// Simple Icons (react-icons/si) dropped the Slack, Salesforce, and Twilio marks at those brands'
// request, so these three are drawn inline in their brand colors.
function SlackLogo({ className }: LogoProps) {
  return (
    <svg viewBox="0 0 122.8 122.8" className={className} aria-hidden>
      <path fill="#E01E5A" d="M25.8 77.6c0 7.1-5.8 12.9-12.9 12.9S0 84.7 0 77.6s5.8-12.9 12.9-12.9h12.9v12.9zm6.5 0c0-7.1 5.8-12.9 12.9-12.9s12.9 5.8 12.9 12.9v32.3c0 7.1-5.8 12.9-12.9 12.9s-12.9-5.8-12.9-12.9V77.6z" />
      <path fill="#36C5F0" d="M45.2 25.8c-7.1 0-12.9-5.8-12.9-12.9S38.1 0 45.2 0s12.9 5.8 12.9 12.9v12.9H45.2zm0 6.5c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9H12.9C5.8 58.1 0 52.3 0 45.2s5.8-12.9 12.9-12.9h32.3z" />
      <path fill="#2EB67D" d="M97 45.2c0-7.1 5.8-12.9 12.9-12.9s12.9 5.8 12.9 12.9-5.8 12.9-12.9 12.9H97V45.2zm-6.5 0c0 7.1-5.8 12.9-12.9 12.9s-12.9-5.8-12.9-12.9V12.9C64.7 5.8 70.5 0 77.6 0s12.9 5.8 12.9 12.9v32.3z" />
      <path fill="#ECB22E" d="M77.6 97c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9-12.9-5.8-12.9-12.9V97h12.9zm0-6.5c-7.1 0-12.9-5.8-12.9-12.9s5.8-12.9 12.9-12.9h32.3c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9H77.6z" />
    </svg>
  );
}

function SalesforceLogo({ className, style }: LogoProps) {
  return (
    <svg viewBox="0 0 48 34" className={className} style={style} fill="currentColor" aria-hidden>
      <circle cx="13" cy="19" r="9" />
      <circle cx="23" cy="12" r="10" />
      <circle cx="34" cy="13" r="8" />
      <circle cx="39" cy="21" r="8" />
      <circle cx="26" cy="23" r="9" />
    </svg>
  );
}

function TwilioLogo({ className, style }: LogoProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} style={style} fill="currentColor" aria-hidden>
      <circle cx="16" cy="16" r="13.75" fill="none" stroke="currentColor" strokeWidth="3.5" />
      <circle cx="11.5" cy="11.5" r="3.2" />
      <circle cx="20.5" cy="11.5" r="3.2" />
      <circle cx="11.5" cy="20.5" r="3.2" />
      <circle cx="20.5" cy="20.5" r="3.2" />
    </svg>
  );
}

const rowOne: Connector[] = [
  { name: "Gmail", Icon: SiGmail, color: "#EA4335" },
  { name: "Calendar", Icon: SiGooglecalendar, color: "#4285F4" },
  { name: "Sheets", Icon: SiGooglesheets, color: "#0F9D58" },
  { name: "Drive", Icon: SiGoogledrive, color: "#34A853" },
  { name: "QuickBooks", Icon: SiQuickbooks, color: "#2CA01C" },
  { name: "Slack", Icon: SlackLogo, color: "#4A154B" },
];

const rowTwo: Connector[] = [
  { name: "HubSpot", Icon: SiHubspot, color: "#FF7A59" },
  { name: "Salesforce", Icon: SalesforceLogo, color: "#00A1E0" },
  { name: "Zapier", Icon: SiZapier, color: "#FF4A00" },
  { name: "Maps", Icon: SiGooglemaps, color: "#EA4335" },
  { name: "Twilio", Icon: TwilioLogo, color: "#F22F46" },
  { name: "Firebase", Icon: SiFirebase, color: "#F5820D" },
];

function Tile({ c }: { c: Connector }) {
  return (
    <div
      title={c.name}
      className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-border bg-background shadow-[0_2px_8px_-2px_rgba(21,18,16,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-brand-orange/40 hover:shadow-[0_12px_24px_-8px_rgba(249,115,22,0.2)]"
    >
      <c.Icon className="h-7 w-7" style={{ color: c.color }} />
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
          description="Calendars, payments, comms, and CRM — job data flows in and out without anyone re-typing it. Hover or tap to pause."
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
