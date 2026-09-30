import Hero from "@/components/Hero";
import TrackerSpotlight from "@/components/TrackerSpotlight";
import PartsToPortal from "@/components/PartsToPortal";
import HowItConnects from "@/components/HowItConnects";
import PortalShowcase from "@/components/PortalShowcase";
import ConnectorsWall from "@/components/ConnectorsWall";
import CTASection from "@/components/CTASection";
import IndustryCards from "@/components/IndustryCards";
import FaqSection from "@/components/FaqSection";
import JsonLd from "@/components/JsonLd";
import PlatformIntro from "@/components/PlatformIntro";
import { pageMetadata } from "@/lib/seo";
import { organizationSchema, websiteSchema } from "@/lib/schema";
import { homeFaqs } from "@/lib/content";
import { industries } from "@/lib/industries";

export const metadata = pageMetadata("/");

export default function Home() {
  return (
    <>
      <JsonLd data={[organizationSchema, websiteSchema]} />
      <Hero />
      <PlatformIntro />
      <PortalShowcase index="§03" />
      <HowItConnects />
      <PartsToPortal />
      <TrackerSpotlight />
      <ConnectorsWall />
      <IndustryCards eyebrow="Industries" title="Built for" accent="every field" subtitle="One live record, every playbook." items={industries} />
      <FaqSection title="iNOVAA Tracker & Portal questions, answered" faqs={homeFaqs} />
      <CTASection />
    </>
  );
}
