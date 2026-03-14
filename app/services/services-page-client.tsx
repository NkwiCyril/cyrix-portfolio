"use client";

import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import type { Service } from "@/types/database";

interface ServicesPageClientProps {
  services: Service[];
}

export function ServicesPageClient({ services }: ServicesPageClientProps) {
  return (
    <>
      <PageHero
        title="Services"
        subtitle="From concept to deployment, I deliver end-to-end solutions that help businesses succeed in the digital space."
      />

      <section className="bg-white py-24 lg:py-36">
        <Container>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <Link
                  href={`/services/${service.slug}`}
                  className="group block h-full border border-gray-200 bg-gray-50 p-10 transition-all duration-300 hover:border-accent hover:shadow-lg"
                >
                  {service.icon ? (
                    <div className="relative mb-6 h-14 w-14 overflow-hidden">
                      <Image
                        src={service.icon}
                        alt={service.title}
                        fill
                        className="object-contain"
                        unoptimized
                      />
                    </div>
                  ) : (
                    <div className="mb-6 flex h-14 w-14 items-center justify-center bg-gray-950 text-white transition-colors group-hover:bg-accent group-hover:text-gray-950">
                      <span className="text-lg font-bold">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                  )}
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
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
