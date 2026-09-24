import Link from "next/link";
import { ArrowRight } from "lucide-react";

export type RelatedLink = { href: string; label: string; text: string };

// Contextual internal links with descriptive anchor text — helps crawlers map the site
// and gives readers an obvious next page.
export default function RelatedLinks({ title = "Keep exploring", links }: { title?: string; links: readonly RelatedLink[] }) {
  return (
    <nav aria-label={title} className="pb-8 pt-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{title}</h2>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="group flex h-full flex-col rounded-2xl border border-border bg-surface p-6 transition-all hover:-translate-y-0.5 hover:border-accent-blue hover:shadow-md"
              >
                <span className="flex items-center gap-2 font-semibold text-foreground">
                  {l.label}
                  <ArrowRight className="h-4 w-4 text-accent-blue transition-transform group-hover:translate-x-0.5" />
                </span>
                <span className="mt-2 text-sm leading-relaxed text-muted">{l.text}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
