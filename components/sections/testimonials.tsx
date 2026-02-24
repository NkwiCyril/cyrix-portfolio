"use client";

import { Container } from "@/components/ui/container";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "CEO, TechStart Inc.",
    content:
      "Working with Cyrix was an incredible experience. The attention to detail and technical expertise resulted in a product that exceeded our expectations. Our platform's performance improved by 300%.",
  },
  {
    name: "Michael Chen",
    role: "Product Manager, InnovateCo",
    content:
      "The web application delivered was not only visually stunning but also incredibly performant. Cyrix's understanding of modern tech stacks and best practices is truly impressive.",
  },
  {
    name: "Emily Rodriguez",
    role: "Founder, DesignLab",
    content:
      "From concept to deployment, the entire process was seamless. The communication was excellent, deadlines were met, and the final product was exactly what we envisioned — and more.",
  },
  {
    name: "John Doe",
    role: "CEO, TechStart Inc.",
    content:
      "From concept to deployment, the entire process was seamless. The communication was excellent, deadlines were met, and the final product was exactly what we envisioned — and more.",
  }
];

export function Testimonials() {
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
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="bg-gray-950 p-10 lg:p-12"
            >
              <Quote size={28} className="text-accent" />

              <p className="mt-6 text-base leading-relaxed text-gray-300">
                &ldquo;{testimonial.content}&rdquo;
              </p>

              <div className="mt-8 flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center bg-accent text-sm font-bold text-gray-950">
                  {testimonial.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <p className="text-sm font-bold text-white">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
