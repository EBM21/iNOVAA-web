"use client";

import { motion } from "framer-motion";
import SectionHeading from "./ui/SectionHeading";

const parts = [
  { src: "/tracker-part-sensor.png", title: "Heart Rate Sensor", text: "Optical sensor for accurate tracking." },
  { src: "/tracker-part-pcb.png", title: "Main PCB", text: "Advanced processor for smooth performance." },
  { src: "/tracker-part-battery.png", title: "Li-Po Battery", text: "Efficient & long-lasting power supply." },
  { src: "/tracker-part-button.png", title: "Side Button", text: "Durable, responsive & easy to use." },
  { src: "/tracker-part-strap.png", title: "Silicone Strap", text: "Flexible, skin-friendly & durable." },
  { src: "/tracker-part-contacts.png", title: "Charging Contacts", text: "Fast & secure charging." },
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
        <img
          src="/tracker-parts-diagram.png"
          alt="Inside the iNOVAA Tracker — exploded parts diagram"
          className="block w-full"
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
                <img
                  src={p.src}
                  alt={p.title}
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
