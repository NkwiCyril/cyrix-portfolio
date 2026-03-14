"use client";

import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/types/database";

interface PortfolioPageClientProps {
  projects: Project[];
}

export function PortfolioPageClient({ projects }: PortfolioPageClientProps) {
  return (
    <>
      <PageHero
        title="Portfolio"
        subtitle="A collection of projects I've worked on — from e-commerce platforms to AI-powered tools."
      />

      <section className="bg-gray-950 py-24 lg:py-36">
        <Container>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link
                  href={`/portfolio/${project.slug}`}
                  className="group relative block aspect-4/3 overflow-hidden bg-gray-900"
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
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-90" />

                  {/* Content at bottom */}
                  <div className="absolute inset-x-0 bottom-0 p-8 translate-y-4 transition-transform duration-300 group-hover:translate-y-0">
                    <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                      {project.category}
                    </p>
                    <h3 className="mt-2 text-2xl font-bold text-white lg:text-3xl">
                      {project.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-gray-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      {project.description}
                    </p>
                  </div>

                  {/* Hover arrow */}
                  <div className="absolute top-6 right-6 flex h-10 w-10 items-center justify-center bg-accent text-gray-950 opacity-0 transition-all duration-300 group-hover:opacity-100">
                    <ArrowUpRight size={18} />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
