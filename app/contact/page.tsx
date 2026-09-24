import { Building2, CalendarClock, Mail } from "lucide-react";
import SplitHero from "@/components/ui/SplitHero";
import TrackerHeroVideo from "@/components/TrackerHeroVideo";
import DeviceAnnotation from "@/components/ui/DeviceAnnotation";
import ContactScheduler from "@/components/ContactScheduler";
import RelatedLinks from "@/components/RelatedLinks";
import JsonLd from "@/components/JsonLd";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbSchema, organizationSchema } from "@/lib/schema";
import { links } from "@/lib/content";
import { absoluteUrl, site } from "@/lib/site";

export const metadata = pageMetadata("/contact");

const heroStats = [
  { label: "Battery Life", value: "7 Days" },
  { label: "Dust / Water", value: "IP65" },
  { label: "Connectivity", value: "BLE 5.3" },
];

const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact iNOVAA",
  url: absoluteUrl("/contact"),
  about: { "@id": organizationSchema["@id"] },
  mainEntity: organizationSchema,
};

export default function ContactPage() {
  return (
    <>
      <JsonLd data={[contactPageSchema, breadcrumbSchema("/contact")]} />
      <SplitHero
        eyebrow="Contact"
        title="Contact iNOVAA and book a wearable tracker demo"
        subhead="20 minutes, on a job that looks like yours."
        ctaLabel="Email us instead"
        ctaHref={`mailto:${site.email}`}
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

      <section className="pt-16" aria-labelledby="contact-details">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <h2 id="contact-details" className="text-2xl font-bold tracking-tight sm:text-3xl">
            Contact details
          </h2>
          <address className="mt-6 grid gap-4 not-italic sm:grid-cols-3">
            <div className="surface-card rounded-2xl p-5">
              <Building2 className="h-5 w-5 text-accent-blue" />
              <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-muted-2">Company</p>
              <p className="mt-1 font-semibold text-foreground">{site.legalName}</p>
              
            </div>
            <div className="surface-card rounded-2xl p-5">
              <Mail className="h-5 w-5 text-accent-blue" />
              <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-muted-2">Email</p>
              <a href={`mailto:${site.email}`} className="mt-1 block font-semibold text-foreground underline underline-offset-4">
                {site.email}
              </a>
              <p className="text-sm text-muted">Sales, demos &amp; support</p>
            </div>
            <div className="surface-card rounded-2xl p-5">
              <CalendarClock className="h-5 w-5 text-accent-blue" />
              <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-muted-2">Demo calls</p>
              <p className="mt-1 font-semibold text-foreground">20 minutes</p>
              <p className="text-sm text-muted">Monday–Friday</p>
            </div>
          </address>
        </div>
      </section>

      <ContactScheduler />

      <RelatedLinks title="Before your call" links={[links.tracker, links.platform, links.industries]} />
    </>
  );
}
