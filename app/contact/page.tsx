"use client";

import { useMemo, useState } from "react";
import SplitHero from "@/components/ui/SplitHero";
import TrackerHeroVideo from "@/components/TrackerHeroVideo";
import DeviceAnnotation from "@/components/ui/DeviceAnnotation";
import Reveal from "@/components/ui/Reveal";
import { Calendar, Mail, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const slots = ["9:00 AM", "10:30 AM", "1:00 PM", "2:30 PM", "4:00 PM"];

const heroStats = [
  { label: "Battery Life", value: "7 Days" },
  { label: "Dust / Water", value: "IP65" },
  { label: "Connectivity", value: "BLE 5.3" },
];

function nextBusinessDays(count: number) {
  const days: Date[] = [];
  const cursor = new Date();
  while (days.length < count) {
    const day = cursor.getDay();
    if (day !== 0 && day !== 6) days.push(new Date(cursor));
    cursor.setDate(cursor.getDate() + 1);
  }
  return days;
}

const formatDateShort = (d: Date) => d.toLocaleDateString("en-US", { weekday: "short", day: "numeric" });
const formatDateFull = (d: Date) => d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });

export default function ContactPage() {
  const dates = useMemo(() => nextBusinessDays(5), []);
  const [dateIndex, setDateIndex] = useState(0);
  const [slotIndex, setSlotIndex] = useState(1);
  const [confirmed, setConfirmed] = useState(false);

  const selectedDate = dates[dateIndex];
  const selectedSlot = slots[slotIndex];

  return (
    <>
      <SplitHero
        eyebrow="Contact"
        title="Book a call with the iNOVAA team"
        subhead="20 minutes, on a job that looks like yours."
        ctaLabel="Email us instead"
        ctaHref="mailto:hello@inovaa.ai"
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

      <section className="pb-24 pt-16">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <Reveal>
            <div className="surface-card overflow-hidden rounded-2xl">
              <div className="flex items-center gap-2 border-b border-border bg-surface-2 px-6 py-4">
                <Calendar className="h-4 w-4 text-accent-blue" />
                <span className="font-mono-data text-xs text-muted-2">cal.inovaa.ai/intro-call</span>
              </div>

              {!confirmed ? (
                <div className="p-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-2">Pick a date</p>
                  <div className="mt-3 grid grid-cols-5 gap-2">
                    {dates.map((d, i) => (
                      <button
                        key={d.toISOString()}
                        onClick={() => setDateIndex(i)}
                        className={cn(
                          "rounded-xl border px-2 py-2.5 text-center text-xs font-medium transition-all",
                          i === dateIndex
                            ? "btn-primary border-transparent"
                            : "border-border-strong text-muted hover:-translate-y-0.5 hover:border-accent-blue hover:text-foreground hover:shadow-sm"
                        )}
                      >
                        {formatDateShort(d)}
                      </button>
                    ))}
                  </div>

                  <p className="mt-6 text-sm font-semibold text-foreground">{formatDateFull(selectedDate)}</p>
                  <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-5">
                    {slots.map((slot, i) => (
                      <button
                        key={slot}
                        onClick={() => setSlotIndex(i)}
                        className={cn(
                          "rounded-full border px-3 py-2.5 text-sm font-medium transition-all",
                          i === slotIndex
                            ? "btn-primary border-transparent"
                            : "border-border-strong text-muted hover:-translate-y-0.5 hover:border-accent-blue hover:text-foreground hover:shadow-sm"
                        )}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => setConfirmed(true)}
                    className="btn-primary mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold"
                  >
                    Confirm {selectedSlot} call
                    <ArrowUpRight className="h-4 w-4" />
                  </button>
                  <p className="mt-3 text-center text-xs text-muted-2">This is a placeholder scheduler — connect your Calendly link here to go live.</p>
                </div>
              ) : (
                <div className="flex flex-col items-center px-6 py-10 text-center">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-status-green/10 text-status-green">
                    <CheckCircle2 className="h-6 w-6" />
                  </span>
                  <p className="mt-4 text-base font-semibold text-foreground">You&apos;re booked for {formatDateFull(selectedDate)}</p>
                  <p className="mt-1 text-sm text-muted">{selectedSlot} · 20 minutes with the iNOVAA team</p>
                  <button
                    onClick={() => setConfirmed(false)}
                    className="btn-secondary mt-6 rounded-full px-5 py-2.5 text-sm font-semibold"
                  >
                    Pick a different time
                  </button>
                </div>
              )}
            </div>
          </Reveal>

          <Reveal delay={0.1} className="mt-8 flex items-center justify-center gap-2 text-sm text-muted">
            <Mail className="h-4 w-4 text-accent-blue" />
            Prefer email? Reach us at <a href="mailto:hello@inovaa.ai" className="text-foreground underline">hello@inovaa.ai</a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
