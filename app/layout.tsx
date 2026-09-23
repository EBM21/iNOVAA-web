import type { Metadata } from "next";
import { Outfit, DM_Sans, DM_Mono, Caveat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import CursorGlow from "@/components/CursorGlow";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["500", "700"],
});

export const metadata: Metadata = {
  title: "iNOVAA — The operating layer for field service teams",
  description:
    "iNOVAA is the AI-native field service platform for solar, HVAC, logistics, hospitality, and landscaping teams — a wearable Tracker for automatic proof of work, live job tracking, and a customer portal that never leaves anyone guessing.",
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
