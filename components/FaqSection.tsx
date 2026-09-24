import { ChevronDown } from "lucide-react";
import JsonLd from "./JsonLd";
import SectionHeading from "./ui/SectionHeading";
import { faqSchema, type Faq } from "@/lib/schema";

// Native <details> so answers are in the server HTML (crawlable, no JS needed) and the
// FAQPage JSON-LD always matches exactly what's visible on the page.
export default function FaqSection({
  title,
  eyebrow = "FAQ",
  faqs,
}: {
  title: string;
  eyebrow?: string;
  faqs: readonly Faq[];
}) {
  return (
    <section className="py-20 sm:py-24" aria-labelledby="faq-heading">
      <JsonLd data={faqSchema(faqs)} />
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <SectionHeading eyebrow={eyebrow} title={<span id="faq-heading">{title}</span>} />
        <div className="mt-10 divide-y divide-border rounded-2xl border border-border bg-surface">
          {faqs.map((f) => (
            <details key={f.q} className="group px-6 py-5 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4">
                <h3 className="text-base font-semibold text-foreground">{f.q}</h3>
                <ChevronDown className="mt-0.5 h-5 w-5 shrink-0 text-muted-2 transition-transform group-open:rotate-180" />
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
