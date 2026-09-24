import PageHeader from "@/components/PageHeader";
import JsonLd from "@/components/JsonLd";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";

// Placeholder page: marked noindex in lib/seo.ts until the full policy text is published.
export const metadata = pageMetadata("/legal/privacy");

export default function PrivacyPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema("/legal/privacy")} />
      <PageHeader
        eyebrow="Legal"
        title="Privacy Policy"
        description="How iNOVAA collects, stores, and protects job, crew, and customer data across every tenant on the platform."
      />
    </>
  );
}
