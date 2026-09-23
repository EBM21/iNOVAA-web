"use client";

import { motion } from "framer-motion";
import SectionHeading from "./ui/SectionHeading";

const details = [
  { src: "/tracker-detail-sensors.png", title: "Precision Sensors", text: "Accurate tracking, every time." },
  { src: "/tracker-detail-strap.png", title: "Secure Strap", text: "Stays put, no matter the job." },
  { src: "/tracker-detail-button.png", title: "Water Resistant", text: "Rain, sweat, and dust-ready." },
  { src: "/tracker-detail-profile.png", title: "Sleek & Modern", text: "Slim profile, built for the field." },
  { src: "/tracker-detail-wrist.png", title: "Worn All Day", text: "Comfortable for a full shift." },
];

export default function TrackerDetailStrip() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading eyebrow="Detail" index="§09" title="Every detail, built for the field" />

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {details.map((d, i) => (
            <motion.div
              key={d.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6 }}
              className="group"
            >
              <div className="overflow-hidden rounded-xl shadow-[0_16px_32px_-16px_rgba(26,26,31,0.3)]">
                <img
                  src={d.src}
                  alt={d.title}
                  className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                />
              </div>
              <p className="mt-3 text-sm font-semibold text-foreground">{d.title}</p>
              <p className="mt-0.5 text-xs leading-relaxed text-muted">{d.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
