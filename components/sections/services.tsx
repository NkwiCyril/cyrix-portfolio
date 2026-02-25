"use client";

import { Container } from "@/components/ui/container";
import { motion } from "framer-motion";
import Image from "next/image";

const skills = [
  { name: "Client Satisfaction", percentage: 98 },
  { name: "Timely Delivery", percentage: 95 },
  { name: "Problem Solving", percentage: 97 },
  { name: "Attention to Detail", percentage: 96 },
];

const services = [
  {
    number: "01",
    title: "Web Development",
    description:
      "Full-stack web applications built with Laravel, Next.js — optimized for performance and scalability.",
  },
  {
    number: "02",
    title: "UI/UX Design",
    description:
      "Clean, intuitive interfaces designed with user experience at the core. From wireframes to pixel-perfect implementations.",
  },
  {
    number: "03",
    title: "Mobile Development",
    description:
      "Cross-platform mobile applications using Ionic/Capacitor & React Native that deliver native-like experiences on iOS and Android.",
  },
  {
    number: "04",
    title: "AI Integration",
    description:
      "AI-powered features — from chatbots and content generation to intelligent automation and machine learning.",
  },
  {
    number: "05",
    title: "API & Backend",
    description:
      "Robust backend systems, RESTful APIs, and database architectures using Laravel, and PostgreSQL.",
  },
  {
    number: "06",
    title: "Content Creation",
    description:
      "Tech-focused content — tutorials, reviews, and insights on software development, tools, and AI.",
  },
];

export function Services() {
  return (
    <section className="bg-white py-24 lg:py-36">
      <Container>
        {/* Top — split layout with image + skill bars (inspired by Image 3) */}
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Left — image placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative aspect-square overflow-hidden"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <Image
                src="/cyrix-professional.png"
                alt="Team"
                width={400}
                height={400}
                className="object-cover"
              />
            </div>
          </motion.div>

          {/* Right — heading + skill bars */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="font-sans text-5xl font-bold text-gray-950 lg:text-6xl">
              Service Quality
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-gray-600">
              A quick snapshot of the standards I work with on every project —
              from communication to execution.
            </p>

            {/* Skill bars */}
            <div className="mt-10 space-y-6">
              {skills.map((skill) => (
                <div key={skill.name}>
                  <div className="flex items-center justify-between text-sm font-bold uppercase tracking-wider text-gray-950">
                    <span>{skill.name}</span>
                    <span>{skill.percentage}%</span>
                  </div>
                  <div className="mt-2 h-1 w-full bg-gray-200">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.percentage}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.3 }}
                      className="h-full bg-accent"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom — "What We Can Do" service grid */}
        <div className="mt-32">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center font-sans text-5xl font-bold text-gray-950 lg:text-7xl"
          >
            Services Offered
          </motion.h2>

          <div className="mt-16 grid gap-0 border-t border-gray-200 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
              <motion.div
                key={service.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="group border-b border-r border-gray-200 p-10 transition-colors hover:bg-gray-950 hover:text-white"
              >
                <span className="text-sm font-bold text-gray-400 transition-colors group-hover:text-accent">
                  {service.number}
                </span>
                <h3 className="mt-4 text-2xl font-bold text-gray-950 transition-colors group-hover:text-white">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-500 transition-colors group-hover:text-gray-400">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
