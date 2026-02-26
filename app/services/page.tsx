"use client";

import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { services } from "@/lib/data";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function ServicesPage() {
  return (
    <>
      <PageHero
        title="Services"
        subtitle="From concept to deployment, I deliver end-to-end solutions that help businesses succeed in the digital space."
      />

      <section className="bg-white py-24 lg:py-36">
        <Container>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  <Link
                    href={`/services/${service.slug}`}
                    className="group block h-full border border-gray-200 bg-gray-50 p-10 transition-all duration-300 hover:border-accent hover:shadow-lg"
                  >
                    <div className="mb-6 flex h-14 w-14 items-center justify-center bg-gray-950 text-white transition-colors group-hover:bg-accent group-hover:text-gray-950">
                      <Icon size={28} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-950">
                      {service.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-gray-600">
                      {service.description}
                    </p>
                    <div className="mt-6 inline-flex items-center gap-1 text-sm font-bold uppercase tracking-wider text-gray-950 transition-colors group-hover:text-accent">
                      View Details
                      <ArrowUpRight size={14} />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>
    </>
  );
}
