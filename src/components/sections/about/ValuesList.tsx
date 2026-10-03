"use client";

import { motion } from "motion/react";

/** Big editorial list of values; each row reveals a gold sweep on hover. */
export function ValuesList({ values }: { values: readonly string[] }) {
  return (
    <ul className="border-t border-line">
      {values.map((v, i) => (
        <motion.li
          key={v}
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          transition={{ duration: 0.9, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
          className="group relative overflow-hidden border-b border-line"
        >
          <span aria-hidden className="absolute inset-0 origin-bottom scale-y-0 bg-gold transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100" />
          <div className="relative flex items-baseline gap-6 py-6 md:gap-12 md:py-8">
            <span className="font-mono text-xs text-stone transition-colors group-hover:text-onyx">0{i + 1}</span>
            <span className="font-serif text-4xl text-champagne transition-colors duration-300 group-hover:text-onyx md:text-6xl lg:text-7xl">{v}</span>
          </div>
        </motion.li>
      ))}
    </ul>
  );
}
