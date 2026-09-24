import PageHeader from "@/components/PageHeader";
import JsonLd from "@/components/JsonLd";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";

// Placeholder page: marked noindex in lib/seo.ts until the full policy text is published.
export const metadata = pageMetadata("/legal/terms");

export default function TermsPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema("/legal/terms")} />
      <PageHeader
        eyebrow="Legal"
        title="Terms of Service"
        description="The terms governing use of the iNOVAA platform, portal, and iNOVAA Tracker hardware."
      />
    </>
  );
}
