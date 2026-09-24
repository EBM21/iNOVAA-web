"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import SectionHeading from "./ui/SectionHeading";

const details = [
  { src: "/tracker-detail-sensors.png", w: 1434, h: 1097, title: "Precision Sensors", text: "Accurate tracking, every time.", alt: "Sensor window and USB-C port on the underside of the orange iNOVAA Tracker" },
  { src: "/tracker-detail-strap.png", w: 456, h: 378, title: "Secure Strap", text: "Stays put, no matter the job.", alt: "Close-up of the iNOVAA Tracker strap buckle that keeps the band secure on the job" },
  { src: "/tracker-detail-button.png", w: 421, h: 378, title: "Water Resistant", text: "Rain, sweat, and dust-ready.", alt: "Sealed IP65 water-resistant housing and side button of the iNOVAA Tracker" },
  { src: "/tracker-detail-profile.png", w: 456, h: 378, title: "Sleek & Modern", text: "Slim profile, built for the field.", alt: "Slim side profile of the orange iNOVAA Tracker wristband" },
  { src: "/tracker-detail-wrist.png", w: 395, h: 596, title: "Worn All Day", text: "Comfortable for a full shift.", alt: "Field technician wearing the iNOVAA Tracker on their wrist outdoors" },
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
                <Image
                  src={d.src}
                  width={d.w}
                  height={d.h}
                  sizes="(min-width: 1024px) 240px, (min-width: 640px) 33vw, 50vw"
                  alt={d.alt}
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
