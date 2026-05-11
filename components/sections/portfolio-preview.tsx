"use client";

import { Container } from "@/components/ui/container";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/types/database";

interface PortfolioPreviewProps {
  projects: Project[];
}

export function PortfolioPreview({ projects }: PortfolioPreviewProps) {
  return (
    <section className="bg-gray-100 py-24 lg:py-36">
      <Container>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-15 text-center font-sans text-5xl font-bold text-black lg:text-7xl"
        >
          Featured Projects
        </motion.h2>
      </Container>

      {/* Compact image grid */}
      <Container>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:gap-8">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: Math.min(i, 6) * 0.05 }}
            >
              <Link
                href={`/portfolio/${project.slug}`}
                className="group relative block aspect-square overflow-hidden bg-gray-900"
              >
                {project.featured_image_url && (
                  <Image
                    src={project.featured_image_url}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    unoptimized
                  />
                )}

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-95" />

                {/* Content at bottom */}
                <div className="absolute inset-x-0 bottom-0 p-6 translate-y-2 transition-transform duration-300 group-hover:translate-y-0">
                  <p className="text-xs font-bold uppercase tracking-wider text-accent">
                    {project.category}
                  </p>
                  <h3 className="mt-2 text-xl font-bold leading-tight text-white lg:text-2xl">
                    {project.title}
                  </h3>
                </div>

                {/* Hover arrow */}
                <div className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-accent text-gray-950 opacity-0 transition-all duration-300 group-hover:opacity-100">
                  <ArrowUpRight size={16} />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>

      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-16 text-center"
        >
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 border-b-2 border-accent pb-1 text-sm font-bold uppercase tracking-wider text-black transition-colors hover:text-accent"
          >
            View All Projects
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}
