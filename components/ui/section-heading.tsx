"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface SectionHeadingProps {
  badge?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  badge,
  title,
  description,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
      className={cn(
        "mb-16 lg:mb-20",
        align === "center" && "text-center",
        className
      )}
    >
      {badge && (
        <span className="mb-6 inline-block text-sm font-bold uppercase tracking-widest text-accent">
          {badge}
        </span>
      )}
      <h2 className="mt-2 font-sans text-5xl font-bold italic tracking-tight text-white sm:text-6xl lg:text-7xl">
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-6 text-lg text-gray-400 leading-relaxed",
            align === "center" && "mx-auto max-w-2xl"
          )}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}
