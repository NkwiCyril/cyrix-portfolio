"use client";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { motion } from "framer-motion";

export function CTA() {
  return (
    <section id="contact" className="bg-accent py-28 lg:py-40">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-4xl text-center"
        >
          <h2 className="font-sans text-6xl font-bold text-gray-950 sm:text-7xl lg:text-8xl">
            Let&apos;s Create
            <br />
            Something Great
          </h2>

          <p className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-gray-950/70">
            We shift you from today&apos;s reality to tomorrow&apos;s potential,
            ensuring your digital presence stands out in the modern landscape.
          </p>

          <div className="mt-12 gap-3 flex flex-col sm:flex-row items-center justify-center">
            <a
              href={`mailto:akinimbomnkwi@gmail.com?subject=${encodeURIComponent(
                "Project Inquiry — Let's Work Together"
              )}&body=${encodeURIComponent(
                "Hi Cyrix,\n\nI came across your portfolio and I'd love to discuss a project with you.\n\nHere's a quick overview of what I have in mind:\n- Project type:\n- Timeline:\n- Budget range:\n\nLooking forward to hearing from you.\n\nThanks,\n"
              )}`}
            >
              <Button
                size="lg"
                className="bg-gray-950 text-white hover:bg-gray-800"
              >
                Email
              </Button>
            </a>
            <a
              href={`https://wa.me/237651085550?text=${encodeURIComponent(
                "Hi Cyrix! I just visited your portfolio and I'm interested in working with you. Could we chat about a project?"
              )}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                className="bg-green-500 text-white hover:bg-green-600"
              >
                WhatsApp
              </Button>
            </a>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
