"use client";

import { motion } from "framer-motion";

const phrases = [
  "App Development",
  "Web Development",
  "Creative Digital Solutions",
  "AI-Powered Experiences",
];

export function Marquee() {
  return (
    <section className="overflow-hidden bg-accent py-5">
      <div className="relative flex whitespace-nowrap">
        <motion.div
          animate={{ x: [0, -2000] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 20,
              ease: "linear",
            },
          }}
          className="flex shrink-0 items-center gap-8"
        >
          {[...phrases, ...phrases, ...phrases, ...phrases].map((phrase, i) => (
            <span key={i} className="flex items-center gap-8">
              <span className="text-sm font-bold uppercase tracking-wider text-gray-950">
                {phrase}
              </span>
              <span className="text-accent-dark text-lg">✦</span>
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
