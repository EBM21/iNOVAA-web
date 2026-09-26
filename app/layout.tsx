import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SITE_URL, site } from "@/lib/site";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import CursorGlow from "@/components/CursorGlow";

// Self-hosted (Latin subset, from Google Fonts) so builds never depend on reaching fonts.gstatic.com —
// with next/font/google, a failed download breaks the Turbopack build.
const outfit = localFont({
  variable: "--font-outfit",
  src: "./fonts/outfit-latin-var.woff2",
  weight: "400 900",
  display: "swap",
});

const dmSans = localFont({
  variable: "--font-dm-sans",
  src: "./fonts/dm-sans-latin-var.woff2",
  weight: "400 700",
  display: "swap",
});

const dmMono = localFont({
  variable: "--font-dm-mono",
  src: [
    { path: "./fonts/dm-mono-latin-400.woff2", weight: "400" },
    { path: "./fonts/dm-mono-latin-500.woff2", weight: "500" },
  ],
  display: "swap",
});

const caveat = localFont({
  variable: "--font-caveat",
  src: "./fonts/caveat-latin-var.woff2",
  weight: "500 700",
  display: "swap",
});

// Site-wide defaults. Every page overrides title/description/canonical/OG via pageMetadata() in lib/seo.ts.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `${site.name} — ${site.tagline}`, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: SITE_URL }],
  creator: site.name,
  publisher: site.legalName,
  category: "technology",
  formatDetection: { telephone: false, address: false, email: false },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_US",
    images: [{ url: site.ogImage, width: 1200, height: 630, alt: `${site.name} — ${site.tagline}` }],
  },
  twitter: { card: "summary_large_image", images: [site.ogImage] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
};

export const viewport: Viewport = {
  themeColor: "#f97316",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${dmSans.variable} ${dmMono.variable} ${caveat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <CursorGlow />
        <Navbar />
        <ScrollProgress />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
