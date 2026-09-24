"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import SectionHeading from "./ui/SectionHeading";

const parts = [
  { src: "/tracker-part-sensor.png", w: 1360, h: 1157, title: "Heart Rate Sensor", text: "Optical sensor for accurate tracking.", alt: "Underside of the iNOVAA Tracker showing the green optical sensor array above the USB-C port" },
  { src: "/tracker-part-pcb.png", w: 248, h: 211, title: "Main PCB", text: "Advanced processor for smooth performance.", alt: "Close-up of the iNOVAA Tracker main circuit board with processor and motion sensors" },
  { src: "/tracker-part-battery.png", w: 248, h: 211, title: "Li-Po Battery", text: "Efficient & long-lasting power supply.", alt: "Rechargeable lithium-polymer battery that powers the wearable tracker for up to 7 days" },
  { src: "/tracker-part-button.png", w: 248, h: 211, title: "Side Button", text: "Durable, responsive & easy to use.", alt: "Orange side action button on the black inner casing of the iNOVAA Tracker" },
  { src: "/tracker-part-strap.png", w: 248, h: 211, title: "Silicone Strap", text: "Flexible, skin-friendly & durable.", alt: "Orange silicone wrist strap and keeper loop of the iNOVAA Tracker" },
  { src: "/tracker-part-contacts.png", w: 1360, h: 1157, title: "Charging Contacts", text: "Fast & secure charging.", alt: "Back cover of the iNOVAA Tracker with USB-C charging port" },
];

export default function PartsBreakdown() {
  return (
    <section className="py-20 sm:py-28">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="w-full"
      >
        <Image
          src="/tracker-parts-diagram.png"
          width={1195}
          height={635}
          sizes="100vw"
          alt="Exploded diagram of the iNOVAA Tracker wearable: silicone strap, main PCB, Li-Po battery, side button, casing, and back cover"
          className="block h-auto w-full"
        />
      </motion.div>

      <div className="mx-auto mt-16 max-w-7xl px-6 sm:mt-20 lg:px-8">
        <SectionHeading eyebrow="Components" title="Every part, precision built" />

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {parts.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6 }}
              className="group"
            >
              <div className="overflow-hidden rounded-xl shadow-[0_16px_32px_-16px_rgba(26,26,31,0.3)]">
                <Image
                  src={p.src}
                  width={p.w}
                  height={p.h}
                  sizes="(min-width: 1024px) 200px, (min-width: 640px) 33vw, 50vw"
                  alt={p.alt}
                  className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                />
              </div>
              <p className="mt-3 text-sm font-semibold text-foreground">{p.title}</p>
              <p className="mt-0.5 text-xs leading-relaxed text-muted">{p.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
