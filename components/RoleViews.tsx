"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Lightbulb } from "lucide-react";
import Reveal from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";
import StatusPill, { type Status } from "./ui/StatusPill";
import AvatarChip from "./ui/AvatarChip";
import { roleViews } from "@/lib/data";
import { cn } from "@/lib/utils";

export default function RoleViews() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const cardStep = () => {
    const track = trackRef.current;
    const card = track?.querySelector<HTMLElement>("[data-role-card]");
    return card ? card.offsetWidth + 24 : 420;
  };

  const scrollByCard = (dir: 1 | -1) => {
    trackRef.current?.scrollBy({ left: dir * cardStep(), behavior: "smooth" });
  };

  const scrollToIndex = (i: number) => {
    trackRef.current?.scrollTo({ left: i * cardStep(), behavior: "smooth" });
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => {
      const step = cardStep();
      setActive(Math.round(track.scrollLeft / step));
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="One project, many views"
            index="§06"
            title="Shaped for every role on the job"
            description="Same underlying record — leadership, dispatch, field crews, and customers each get the slice that matters to them."
          />
          <div className="hidden gap-2 sm:flex">
            <button
              onClick={() => scrollByCard(-1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border-strong text-muted transition-all hover:-translate-y-0.5 hover:border-accent-blue hover:text-accent-blue hover:shadow-md"
              aria-label="Previous"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => scrollByCard(1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border-strong text-muted transition-all hover:-translate-y-0.5 hover:border-accent-blue hover:text-accent-blue hover:shadow-md"
              aria-label="Next"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <Reveal delay={0.1} className="mt-12">
        <div
          ref={trackRef}
          className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-4 lg:px-8"
        >
          {roleViews.map((view, i) => (
            <div
              key={view.id}
              data-role-card
              className="surface-card surface-card-hover flex w-[85vw] shrink-0 snap-start flex-col rounded-2xl sm:w-[440px]"
            >
              <div className="flex items-center justify-between gap-3 border-b border-border px-6 py-4">
                <div>
                  <span className="font-mono-data text-xs text-accent-blue">0{i + 1}</span>
                  <p className="mt-0.5 text-sm font-bold text-foreground">{view.role}</p>
                </div>
                <span className="rounded-full border border-border-strong px-2.5 py-1 text-[10px] font-medium text-muted">{view.label}</span>
              </div>

              <div className="flex-1 space-y-2.5 p-5">
                {view.records.map((rec) => (
                  <div
                    key={rec.name}
                    className="flex flex-col gap-2 rounded-xl border border-border bg-surface-2 px-3.5 py-3 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <AvatarChip name={rec.owner} />
                      <div className="min-w-0">
                        <p className="truncate text-sm text-foreground">{rec.name}</p>
                        <p className="truncate text-xs text-muted-2">{rec.owner}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between gap-3 sm:justify-end">
                      <span className="font-mono-data text-xs text-muted-2">{rec.detail}</span>
                      <StatusPill status={rec.status as Status} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-start gap-2.5 rounded-b-2xl border-t border-border bg-surface-2 px-6 py-4">
                <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-brand-orange" />
                <p className="text-sm text-muted">{view.insight}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-center gap-2">
          {roleViews.map((view, i) => (
            <button
              key={view.id}
              onClick={() => scrollToIndex(i)}
              aria-label={`Go to ${view.role}`}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                active === i ? "w-6 bg-gradient-to-r from-brand-purple to-brand-orange" : "w-2 bg-border-strong hover:bg-muted-2"
              )}
            />
          ))}
        </div>
      </Reveal>
    </section>
  );
}
