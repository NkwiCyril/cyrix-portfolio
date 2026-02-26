"use client";

import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { Button } from "@/components/ui/button";
import { projects } from "@/lib/data";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { use } from "react";

export default function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const otherProjects = projects.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <>
      <PageHero title={project.title} subtitle={project.description} />

      <section className="bg-white py-24 lg:py-36">
        <Container>
          <div className="grid gap-16 lg:grid-cols-3">
            {/* Main content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-2"
            >
              {/* Project image placeholder */}
              <div className={`aspect-video ${project.bg} mb-10`}>
                <div className="flex h-full items-center justify-center">
                  <span className="text-sm text-gray-500">
                    Project screenshot
                  </span>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-gray-950">
                About This Project
              </h2>
              <p className="mt-6 text-base leading-relaxed text-gray-600">
                {project.longDescription}
              </p>

              <h3 className="mt-12 text-2xl font-bold text-gray-950">
                Key Features
              </h3>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {project.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center bg-accent">
                      <Check size={12} className="text-gray-950" />
                    </div>
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              <h3 className="mt-12 text-2xl font-bold text-gray-950">
                Technologies Used
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="border border-gray-200 bg-gray-50 px-4 py-2 text-xs font-bold uppercase tracking-wider text-gray-700"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="mt-12">
                <Link href="/contact">
                  <Button size="lg">
                    Start a Project Like This
                    <ArrowRight size={16} />
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Sidebar */}
            <motion.aside
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {/* Project info */}
              <div className="border border-gray-200 bg-gray-50 p-8">
                <h3 className="text-lg font-bold uppercase tracking-wider text-gray-950">
                  Project Info
                </h3>
                <div className="mt-6 space-y-4">
                  <div className="border-b border-gray-200 pb-4">
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
                      Category
                    </p>
                    <p className="mt-1 text-sm font-bold text-gray-950">
                      {project.category}
                    </p>
                  </div>
                  <div className="border-b border-gray-200 pb-4">
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
                      Year
                    </p>
                    <p className="mt-1 text-sm font-bold text-gray-950">
                      {project.year}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
                      Client
                    </p>
                    <p className="mt-1 text-sm font-bold text-gray-950">
                      {project.client}
                    </p>
                  </div>
                </div>
              </div>

              {/* Other projects */}
              <div className="mt-10">
                <h3 className="text-lg font-bold uppercase tracking-wider text-gray-950">
                  Other Projects
                </h3>
                <div className="mt-6 space-y-0 border-t border-gray-200">
                  {otherProjects.map((op) => (
                    <Link
                      key={op.slug}
                      href={`/portfolio/${op.slug}`}
                      className="group flex items-center justify-between border-b border-gray-200 py-5 transition-colors hover:bg-gray-50"
                    >
                      <div>
                        <p className="text-sm font-bold text-gray-950 transition-colors group-hover:text-accent">
                          {op.title}
                        </p>
                        <p className="mt-0.5 text-xs text-gray-500">
                          {op.category}
                        </p>
                      </div>
                      <ArrowUpRight
                        size={14}
                        className="text-gray-400 transition-colors group-hover:text-accent"
                      />
                    </Link>
                  ))}
                </div>
              </div>
            </motion.aside>
          </div>

          {/* Back link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="mt-16 border-t border-gray-200 pt-8"
          >
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-gray-600 transition-colors hover:text-accent"
            >
              <ArrowLeft size={14} />
              Back to All Projects
            </Link>
          </motion.div>
        </Container>
      </section>
    </>
  );
}
