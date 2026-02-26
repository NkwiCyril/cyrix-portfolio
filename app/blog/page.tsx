"use client";

import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { blogPosts, blogCategories } from "@/lib/data";
import { motion } from "framer-motion";
import { Calendar, Clock, Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory =
      activeCategory === "All" || post.category === activeCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <PageHero
        title="Blog"
        subtitle="Thoughts on technology, software development, and the future of digital experiences."
      />

      <section className="bg-white py-24 lg:py-36">
        <Container>
          <div className="grid gap-16 lg:grid-cols-3">
            {/* Main — blog posts */}
            <div className="lg:col-span-2">
              <div className="grid gap-10">
                {filteredPosts.map((post, i) => (
                  <motion.article
                    key={post.slug}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    className="group"
                  >
                    <Link href={`/blog/${post.slug}`}>
                      <div className="grid gap-6 sm:grid-cols-5">
                        {/* Image placeholder */}
                        <div className="sm:col-span-2">
                          <div className="aspect-video bg-linear-to-br from-gray-200 to-gray-100 sm:aspect-square">
                            <div className="flex h-full items-center justify-center">
                              <span className="text-xs text-gray-400">
                                Article image
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="sm:col-span-3">
                          <span className="text-xs font-bold uppercase tracking-wider text-accent">
                            {post.category}
                          </span>
                          <h2 className="mt-2 text-2xl font-bold text-gray-950 transition-colors group-hover:text-accent">
                            {post.title}
                          </h2>
                          <p className="mt-3 text-sm leading-relaxed text-gray-600">
                            {post.excerpt}
                          </p>
                          <div className="mt-4 flex items-center gap-4 text-xs text-gray-500">
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

                {filteredPosts.length === 0 && (
                  <p className="py-12 text-center text-gray-500">
                    No articles found matching your criteria.
                  </p>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <motion.aside
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {/* Search */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search ..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full border-b-2 border-gray-300 bg-transparent py-3 pr-10 text-sm text-gray-950 placeholder-gray-400 outline-none transition-colors focus:border-accent"
                />
                <Search
                  size={16}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400"
                />
              </div>

              {/* Categories */}
              <div className="mt-10">
                <h3 className="text-lg font-bold text-gray-950">Categories</h3>
                <div className="mt-4 space-y-2">
                  {blogCategories.map((cat) => (
                    <button
                      key={cat.name}
                      onClick={() => setActiveCategory(cat.name)}
                      className={`block w-full py-2 text-left text-sm transition-colors ${
                        activeCategory === cat.name
                          ? "font-bold text-accent"
                          : "text-gray-600 hover:text-gray-950"
                      }`}
                    >
                      {cat.name}{" "}
                      <span className="text-gray-400">({cat.count})</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Recent posts */}
              <div className="mt-10">
                <h3 className="text-lg font-bold text-gray-950">
                  Recent Posts
                </h3>
                <div className="mt-4 space-y-4">
                  {blogPosts.slice(0, 3).map((post) => (
                    <Link
                      key={post.slug}
                      href={`/blog/${post.slug}`}
                      className="group block"
                    >
                      <p className="text-sm font-bold text-gray-950 transition-colors group-hover:text-accent">
                        {post.title}
                      </p>
                      <p className="mt-1 text-xs text-gray-500">{post.date}</p>
                    </Link>
                  ))}
                </div>
              </div>
            </motion.aside>
          </div>
        </Container>
      </section>
    </>
  );
}
