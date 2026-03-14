"use client";

import { Container } from "@/components/ui/container";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import Image from "next/image";
import type { Feedback } from "@/types/database";

interface TestimonialsProps {
  feedbacks: Feedback[];
}

export function Testimonials({ feedbacks }: TestimonialsProps) {
  return (
    <section className="bg-gray-950 py-24 lg:py-36">
      <Container>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center font-sans text-5xl font-bold text-white lg:text-7xl"
        >
          What Our Clients Had To Say
        </motion.h2>

        <div className="grid gap-px bg-gray-800 md:grid-cols-3">
          {feedbacks.map((feedback, i) => (
            <motion.div
              key={feedback.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="bg-gray-950 p-10 lg:p-12"
            >
              <Quote size={28} className="text-accent" />

              <p className="mt-6 text-base leading-relaxed text-gray-300">
                &ldquo;{feedback.feedback_text}&rdquo;
              </p>

              <div className="mt-8 flex items-center gap-4">
                {feedback.image_url ? (
                  <div className="relative h-11 w-11 overflow-hidden rounded-full">
                    <Image
                      src={feedback.image_url}
                      alt={feedback.client_name}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                ) : (
                  <div className="flex h-11 w-11 items-center justify-center bg-accent text-sm font-bold text-gray-950">
                    {feedback.client_name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                )}
                <div>
                  <p className="text-sm font-bold text-white">
                    {feedback.client_name}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
