"use client";

import { Container } from "@/components/ui/container";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import type { FAQ } from "@/types/database";

interface FaqProps {
  faqs: FAQ[];
}

export function Faq({ faqs }: FaqProps) {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id ?? null);

  if (faqs.length === 0) return null;

  return (
    <section className="bg-white py-24 lg:py-36">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <p className="text-xs font-bold uppercase tracking-widest text-accent">
            FAQ
          </p>
          <h2 className="mt-3 font-sans text-5xl font-bold text-gray-950 lg:text-7xl">
            Frequently Asked
            <br />
            Questions
          </h2>
        </motion.div>

        <div className="mx-auto max-w-3xl space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openId === faq.id;
            return (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: Math.min(i, 6) * 0.05 }}
                className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md"
              >
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                  className="flex w-full items-center justify-between gap-4 p-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-bold text-gray-950">
                    {faq.question}
                  </span>
                  <span className="shrink-0 text-accent">
                    {isOpen ? <Minus size={20} /> : <Plus size={20} />}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="border-t border-gray-100 px-5 py-5 text-sm leading-relaxed text-gray-600">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
