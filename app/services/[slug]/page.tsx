"use client";

import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { Button } from "@/components/ui/button";
import { services } from "@/lib/data";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, Check } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { use } from "react";

export default function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  const Icon = service.icon;

  return (
    <>
      <PageHero title={service.title} subtitle={service.description} />

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
              <div className="mb-8 flex h-16 w-16 items-center justify-center bg-accent text-gray-950">
                <Icon size={32} />
              </div>

              <h2 className="text-3xl font-bold text-gray-950">Overview</h2>
              <p className="mt-6 text-base leading-relaxed text-gray-600">
                {service.longDescription}
              </p>

              <h3 className="mt-12 text-2xl font-bold text-gray-950">
                What&apos;s Included
              </h3>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {service.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center bg-accent">
                      <Check size={12} className="text-gray-950" />
                    </div>
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="mt-12">
                <Link href="/contact">
                  <Button size="lg">
                    Get Started
                    <ArrowRight size={16} />
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Sidebar — other services */}
            <motion.aside
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-lg font-bold uppercase tracking-wider text-gray-950">
                Other Services
              </h3>
              <div className="mt-6 space-y-0 border-t border-gray-200">
                {services
                  .filter((s) => s.slug !== slug)
                  .map((s) => {
                    const SIcon = s.icon;
                    return (
                      <Link
                        key={s.slug}
                        href={`/services/${s.slug}`}
                        className="group flex items-center gap-4 border-b border-gray-200 py-5 transition-colors hover:bg-gray-50"
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-gray-100 text-gray-600 transition-colors group-hover:bg-accent group-hover:text-gray-950">
                          <SIcon size={18} />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-950">
                            {s.title}
                          </p>
                          <p className="mt-0.5 text-xs text-gray-500">
                            {s.number}
                          </p>
                        </div>
                      </Link>
                    );
                  })}
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
              href="/services"
              className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-gray-600 transition-colors hover:text-accent"
            >
              <ArrowLeft size={14} />
              Back to All Services
            </Link>
          </motion.div>
        </Container>
      </section>
    </>
  );
}
