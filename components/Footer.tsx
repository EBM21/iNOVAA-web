import Link from "next/link";
import { Briefcase, AtSign, Camera, Sparkles, Bot, Gem, ArrowUpRight } from "lucide-react";
import { industryGroups } from "@/lib/data";

const platformLinks = [
  { label: "iNOVAA Tracker (IoT)", href: "/platform/inovaa-tracker" },
  { label: "Field Ops Dashboard", href: "/platform/field-ops-dashboard" },
  { label: "Customer Portal", href: "/platform/customer-portal" },
  { label: "Multi-Tenant & Custom Branding", href: "/platform/multi-tenant" },
  { label: "Connectors", href: "/connectors" },
  { label: "How it works", href: "/how-it-works" },
];

const companyLinks = [
  { label: "About", href: "/company" },
  { label: "Contact", href: "/contact" },
  { label: "Book a call", href: "/contact" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/legal/privacy" },
  { label: "Terms of Service", href: "/legal/terms" },
  { label: "Data Processing", href: "/legal/data-processing" },
];

const aiSummaryButtons = [
  { label: "Claude", icon: Sparkles },
  { label: "ChatGPT", icon: Bot },
  { label: "Gemini", icon: Gem },
];

export default function Footer() {
  return (
    <footer className="border-t border-footer-border bg-footer-bg text-footer-fg">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 border-b border-footer-border py-10 sm:flex-row sm:items-center">
          <div>
            <p className="text-xl font-bold tracking-tight">Ready when you are.</p>
            <p className="mt-1 text-sm text-footer-muted">One record, every crew, every industry.</p>
          </div>
          <Link
            href="/contact"
            className="btn-primary group inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold"
          >
            Book a call
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        <div className="grid gap-10 py-14 lg:grid-cols-[1.2fr_1fr_1.4fr_1fr_1fr] lg:gap-0">
          <div className="lg:pr-8">
            <Link href="/" className="flex items-center">
              <span className="gradient-text-logo font-heading text-2xl font-extrabold tracking-tight">iNOVAA</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-footer-muted">
              The operating layer for field service teams — born inside a solar maintenance
              company, now running solar, HVAC, logistics, hospitality, and landscaping crews.
            </p>
            <div className="mt-5 flex gap-2">
              {[Briefcase, AtSign, Camera].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-footer-border text-footer-muted transition-all hover:-translate-y-0.5 hover:border-accent-blue hover:text-accent-blue hover:shadow-md"
                  aria-label="Social link"
                >
                  <Icon className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:border-l lg:border-footer-border lg:px-8">
            <p className="text-xs font-semibold uppercase tracking-wider text-footer-muted-2">Platform</p>
            <ul className="mt-4 space-y-3">
              {platformLinks.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-sm text-footer-muted transition-colors hover:text-footer-fg">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:border-l lg:border-footer-border lg:px-8">
            <p className="text-xs font-semibold uppercase tracking-wider text-footer-muted-2">Industries</p>
            <ul className="mt-4 space-y-4">
              {industryGroups.map((g) => (
                <li key={g.slug}>
                  <Link
                    href={`/industries/${g.slug}`}
                    className="text-sm font-medium text-footer-fg/90 transition-colors hover:text-accent-blue"
                  >
                    {g.name}
                  </Link>
                  <ul className="mt-1.5 space-y-1">
                    {g.sub.map((s) => (
                      <li key={s} className="text-xs text-footer-muted-2">
                        {s}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:border-l lg:border-footer-border lg:px-8">
            <p className="text-xs font-semibold uppercase tracking-wider text-footer-muted-2">Company</p>
            <ul className="mt-4 space-y-3">
              {companyLinks.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-sm text-footer-muted transition-colors hover:text-footer-fg">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:border-l lg:border-footer-border lg:px-8">
            <p className="text-xs font-semibold uppercase tracking-wider text-footer-muted-2">Legal</p>
            <ul className="mt-4 space-y-3">
              {legalLinks.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-sm text-footer-muted transition-colors hover:text-footer-fg">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-6 border-t border-footer-border py-8 sm:flex-row sm:items-center">
          <div className="flex flex-wrap gap-2">
            {aiSummaryButtons.map((b) => (
              <button
                key={b.label}
                className="inline-flex items-center gap-1.5 rounded-full border border-footer-border px-3 py-1.5 text-xs font-medium text-footer-muted transition-all hover:-translate-y-0.5 hover:border-accent-blue hover:text-footer-fg hover:shadow-sm"
              >
                <b.icon className="h-3 w-3" />
                {b.label}
              </button>
            ))}
          </div>
          <div className="flex flex-col gap-1 text-xs text-footer-muted-2 sm:flex-row sm:gap-6">
            <p>© {new Date().getFullYear()} iNOVAA, Inc. All rights reserved.</p>
            <p>Built inside a solar maintenance company</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
