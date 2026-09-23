"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "./ui/Reveal";

export default function CTASection() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal className="bg-studio relative overflow-hidden rounded-[2.5rem] px-8 py-20 text-center sm:px-16">
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-orange/25 blur-[100px]" />
          <div className="relative">
            <p className="label-mono text-xs text-white/50">Book a call</p>
            <h2 className="mx-auto mt-4 max-w-xl text-3xl font-black tracking-tight text-white sm:text-4xl">
              Ready to see your crews on one live record?
            </h2>
            <p className="mx-auto mt-4 max-w-sm text-sm text-white/60">20 minutes, on a job that looks like yours.</p>
            <Link
              href="/contact"
              className="btn-primary-dark group mt-8 inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold"
            >
              Book a call
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
