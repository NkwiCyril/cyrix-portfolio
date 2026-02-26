"use client";

import { Container } from "@/components/ui/container";
import { motion } from "framer-motion";

interface PageHeroProps {
  title: string;
  subtitle?: string;
}

export function PageHero({ title, subtitle }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-gray-950 pt-32 pb-20">
      {/* Background image */}
      <div
        className="pointer-events-none absolute inset-0 bg-center bg-cover grayscale"
        style={{
          backgroundImage:
            "url('/assets/images/business-people-working-together.jpg')",
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-gray-950/80" />
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-gray-950/60 via-gray-950/40 to-gray-950" />

      <Container>
        <div className="relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-sans text-6xl font-bold text-white lg:text-8xl"
          >
            {title}
          </motion.h1>
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-400"
            >
              {subtitle}
            </motion.p>
          )}
        </div>
      </Container>
    </section>
  );
}
