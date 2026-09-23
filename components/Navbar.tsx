"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

const platformItems = [
  { label: "iNOVAA Tracker (IoT)", href: "/platform/inovaa-tracker" },
  { label: "Field Ops Dashboard", href: "/platform/field-ops-dashboard" },
  { label: "Customer Portal", href: "/platform/customer-portal" },
  { label: "Multi-Tenant & Custom Branding", href: "/platform/multi-tenant" },
];

const industryItems = [
  { label: "Solar & Renewable Maintenance", href: "/industries/solar" },
  { label: "HVAC", href: "/industries/hvac" },
  { label: "Delivery & Logistics", href: "/industries/logistics" },
  { label: "Hospitality Cleaning", href: "/industries/hospitality" },
  { label: "Landscaping", href: "/industries/landscaping" },
];

const navLinks = [
  { label: "Platform", href: "/platform", items: platformItems },
  { label: "Industries", href: "/industries", items: industryItems },
  { label: "How it works", href: "/how-it-works" },
  { label: "Connectors", href: "/connectors" },
  { label: "Company", href: "/company" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 px-3 pt-4 sm:px-5 sm:pt-6">
      <div className="relative mx-auto max-w-[1280px]">
        <nav
          className={cn(
            "relative flex items-center justify-between gap-3 rounded-full px-3 py-1 sm:px-4 transition-all duration-300",
            isScrolled
              ? "border-border bg-background shadow-[0_20px_50px_-24px_rgba(21,18,16,0.25)]"
              : "border-transparent bg-transparent shadow-none"
          )}
        >
          <Link href="/" className="flex shrink-0 items-center">
            <span className="gradient-text-logo font-heading text-2xl font-extrabold tracking-tight sm:text-[2.2rem]">
              iNOVAA
            </span>
          </Link>

          <div
            className={cn(
              "hidden items-center gap-1 rounded-full p-1.5 lg:flex transition-all duration-300",
              isScrolled ? "bg-surface-2" : "bg-transparent"
            )}
            onMouseLeave={() => setHovered(null)}
          >
            {navLinks.map((link) => (
              <div key={link.href} className="relative" onMouseEnter={() => setHovered(link.href)}>
                <Link
                  href={link.href}
                  className={cn(
                    "relative flex items-center gap-1 rounded-full px-4 py-2 text-sm transition-colors",
                    // Agar top per hai to white & bold, warna normal theme color
                    !isScrolled
                      ? "text-white font-bold"
                      : "text-muted font-medium hover:text-foreground",
                    // Hover state for both views
                    hovered === link.href
                      ? (isScrolled 
                          ? "bg-background text-foreground shadow-sm" 
                          : "bg-white/20 text-white shadow-sm")
                      : ""
                  )}
                >
                  {link.label}
                  {link.items && <ChevronDown className="h-3.5 w-3.5" strokeWidth={2.25} />}
                </Link>

                <AnimatePresence>
                  {link.items && hovered === link.href && (
                    <motion.div
                      initial={{ opacity: 0, y: 6, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.98 }}
                      transition={{ duration: 0.15 }}
                      className="absolute left-0 top-full mt-3 w-72 rounded-2xl border border-border bg-background p-2 shadow-[0_20px_48px_-14px_rgba(21,18,16,0.22)]"
                    >
                      {link.items.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="block rounded-xl px-3.5 py-2.5 text-sm text-muted transition-colors hover:bg-surface-2 hover:text-foreground"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          <Link
            href="/contact"
            className="btn-primary hidden shrink-0 items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-semibold lg:inline-flex"
          >
            Book a call
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>

          <button
            className="text-foreground lg:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-x-0 top-full mt-2 overflow-hidden rounded-3xl border border-border bg-background shadow-[0_20px_48px_-14px_rgba(21,18,16,0.22)] lg:hidden"
            >
              <div className="flex flex-col gap-1 px-4 py-4">
                {navLinks.map((link) => (
                  <div key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-lg px-3 py-2.5 text-sm font-medium text-muted hover:bg-surface-2 hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                    {link.items && (
                      <div className="ml-3 flex flex-col gap-0.5 border-l border-border pl-3">
                        {link.items.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setOpen(false)}
                            className="rounded-lg px-3 py-2 text-xs text-muted-2 hover:bg-surface-2 hover:text-foreground"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="btn-primary mt-2 rounded-full px-5 py-2.5 text-center text-sm font-semibold"
                >
                  Book a call
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}