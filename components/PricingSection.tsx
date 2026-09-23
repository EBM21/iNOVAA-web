"use client";

import { Check } from "lucide-react";
import Reveal from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";
import { pricingTiers } from "@/lib/data";
import { cn } from "@/lib/utils";

export default function PricingSection() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading eyebrow="Pricing" index="§08" align="center" title="Plans that scale with your crews" />

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {pricingTiers.map((tier, i) => (
            <Reveal
              key={tier.name}
              delay={i * 0.08}
              className={cn(
                "surface-card surface-card-hover relative rounded-2xl p-8",
                tier.featured && "border-brand-magenta/30 shadow-[0_24px_50px_-20px_rgba(236,72,153,0.3)]"
              )}
            >
              {tier.featured && (
                <span className="absolute -top-3 left-8 rounded-full bg-gradient-to-r from-brand-purple via-brand-magenta to-brand-orange px-3 py-1 text-[10px] font-semibold text-white shadow-md">
                  Most popular
                </span>
              )}
              <h3 className="text-lg font-semibold text-foreground">{tier.name}</h3>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="font-mono-data text-3xl font-bold tracking-tight text-foreground">{tier.price}</span>
                <span className="text-sm text-muted-2">{tier.period}</span>
              </div>
              <p className="mt-3 text-sm text-muted">{tier.description}</p>
              <ul className="mt-6 space-y-3">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-muted">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-blue" strokeWidth={2.5} />
                    {f}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
