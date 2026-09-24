import PageHeader from "@/components/PageHeader";
import JsonLd from "@/components/JsonLd";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";

// Placeholder page: marked noindex in lib/seo.ts until the full policy text is published.
export const metadata = pageMetadata("/legal/data-processing");

export default function DataProcessingPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema("/legal/data-processing")} />
      <PageHeader
        eyebrow="Legal"
        title="Data Processing"
        description="How tenant data is isolated, processed, and retained across the iNOVAA multi-tenant platform."
      />
    </>
  );
}
