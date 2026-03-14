"use client";

import { Container } from "@/components/ui/container";
import { motion } from "framer-motion";
import Image from "next/image";
import type { TechStack } from "@/types/database";

interface TrustBarProps {
  techStack: TechStack[];
}

export function TrustBar({ techStack }: TrustBarProps) {
  return (
    <section className="border-t border-gray-800 bg-gray-950 py-16">
      <Container>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-15 text-center font-sans text-5xl font-bold lg:text-7xl"
        >
          Technologies We Use
        </motion.h2>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid grid-cols-2 bg-gray-800 gap-px sm:grid-cols-4">
            {techStack.map((tech) => (
              <div 
                key={tech.id}
                className="group flex flex-col items-center justify-center bg-gray-950 py-10 transition-colors hover:bg-gray-900"
              >
                {tech.icon_url && (
                  <div className="flex items-center justify-center px-8 py-4">
                    <Image
                      src={tech.icon_url}
                      alt={tech.name}
                      width={200}
                      height={50}
                      className="h-8 w-auto opacity-70 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0"
                      unoptimized
                    />
                  </div>
                )}
                <span className="text-sm font-medium text-gray-400">{tech.name}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
