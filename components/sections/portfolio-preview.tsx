"use client";

import { Container } from "@/components/ui/container";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/data";
import Link from "next/link";

export function PortfolioPreview() {
  return (
    <section className="bg-gray-950 py-24 lg:py-36">
      <Container>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-15 text-center font-sans text-5xl font-bold text-white lg:text-7xl"
        >
          Featured Projects 
        </motion.h2>
      </Container>

      {/* Full-width image grid — inspired by Image 4 */}
      <div className="grid grid-cols-1 md:grid-cols-3">
        {projects.slice(0, 3).map((project, i) => (
          <motion.div
            key={project.slug}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
          >
            <Link
              href={`/portfolio/${project.slug}`}
              className={`group relative block aspect-3/4 overflow-hidden ${project.bg}`}
            >
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-80" />

              {/* Content at bottom */}
              <div className="absolute inset-x-0 bottom-0 p-8 translate-y-4 transition-transform duration-300 group-hover:translate-y-0">
                <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                  {project.category}
                </p>
                <h3 className="mt-2 text-2xl font-bold text-white lg:text-3xl">
                  {project.title}
                </h3>
              </div>

              {/* Hover arrow */}
              <div className="absolute top-6 right-6 flex h-10 w-10 items-center justify-center rounded-full bg-accent text-gray-950 opacity-0 transition-all duration-300 group-hover:opacity-100">
                <ArrowUpRight size={18} />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
