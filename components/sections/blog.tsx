"use client";

import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import Link from "next/link";

const blogPosts = [
  {
    title: "Building Scalable Web Applications with Next.js 16",
    excerpt:
      "Learn how to leverage the latest features in Next.js 16 to build performant and scalable web applications.",
    category: "Web Development",
    date: "Feb 20, 2026",
    readTime: "8 min read",
    slug: "building-scalable-web-apps-nextjs-16",
  },
  {
    title: "The Future of AI in Software Development",
    excerpt:
      "Exploring how artificial intelligence is transforming the way we write code and build software products.",
    category: "AI & Tech",
    date: "Feb 15, 2026",
    readTime: "6 min read",
    slug: "future-ai-software-development",
  },
  {
    title: "Mastering TypeScript: Advanced Patterns",
    excerpt:
      "Deep dive into advanced TypeScript patterns that will make your code more maintainable and type-safe.",
    category: "Programming",
    date: "Feb 10, 2026",
    readTime: "10 min read",
    slug: "mastering-typescript-advanced-patterns",
  },
];

export function Blog() {
  return (
    <section className="bg-white py-24 lg:py-36">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h2 className="font-sans text-5xl font-bold text-gray-950 lg:text-7xl">
            Latest Articles
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-600">
            Thoughts on technology, software development, and the future of
            digital experiences.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post, i) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group"
            >
              <Link href={`/blog/${post.slug}`}>
                <div className="overflow-hidden border border-gray-200 bg-gray-50 transition-all duration-100 hover:shadow-lg">
                  {/* Image placeholder */}
                  <div className="aspect-video bg-linear-to-br from-gray-200 to-gray-100">
                    <div className="flex h-full items-center justify-center">
                      <span className="text-sm text-gray-400">
                        Article image
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <span className="text-xs font-bold uppercase tracking-wider text-accent">
                      {post.category}
                    </span>
                    <h3 className="mt-3 text-xl font-bold text-gray-950 transition-colors group-hover:text-accent">
                      {post.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-gray-600">
                      {post.excerpt}
                    </p>

                    {/* Meta */}
                    <div className="mt-6 flex items-center gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={14} />
                        {post.readTime}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-10 text-center"
        >
          <Button size="lg">
            View All Articles
            <ArrowRight size={16} />
          </Button>
        </motion.div>
      </Container>
    </section>
  );
}
