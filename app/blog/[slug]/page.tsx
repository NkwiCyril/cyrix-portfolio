"use client";

import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { blogPosts } from "@/lib/data";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowLeft, User, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { notFound } from "next/navigation";
import { use, useState } from "react";

interface Comment {
  name: string;
  message: string;
  date: string;
}

export default function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const post = blogPosts.find((p) => p.slug === slug);

  const [comments, setComments] = useState<Comment[]>([
    {
      name: "Alex Turner",
      message: "Great article! Really helped me understand the concepts better.",
      date: "Feb 22, 2026",
    },
    {
      name: "Sarah Chen",
      message:
        "Would love to see a follow-up post diving deeper into the implementation details.",
      date: "Feb 21, 2026",
    },
  ]);
  const [commentName, setCommentName] = useState("");
  const [commentMessage, setCommentMessage] = useState("");

  if (!post) {
    notFound();
  }

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentName.trim() || !commentMessage.trim()) return;

    const newComment: Comment = {
      name: commentName,
      message: commentMessage,
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
    };

    setComments([newComment, ...comments]);
    setCommentName("");
    setCommentMessage("");
  };

  // Render markdown-like content with basic formatting
  const renderContent = (content: string) => {
    return content.split("\n\n").map((block, i) => {
      if (block.startsWith("## ")) {
        return (
          <h2
            key={i}
            className="mt-10 mb-4 text-2xl font-bold text-gray-950"
          >
            {block.replace("## ", "")}
          </h2>
        );
      }
      if (block.startsWith("- ")) {
        const items = block.split("\n").filter((l) => l.startsWith("- "));
        return (
          <ul key={i} className="my-4 space-y-2 pl-6">
            {items.map((item, j) => (
              <li key={j} className="list-disc text-base leading-relaxed text-gray-600">
                {item.replace("- ", "")}
              </li>
            ))}
          </ul>
        );
      }
      return (
        <p key={i} className="my-4 text-base leading-relaxed text-gray-600">
          {block}
        </p>
      );
    });
  };

  // Related posts
  const relatedPosts = blogPosts
    .filter((p) => p.slug !== slug)
    .slice(0, 3);

  return (
    <>
      <PageHero title={post.title} />

      <section className="bg-white py-24 lg:py-36">
        <Container>
          <div className="grid gap-16 lg:grid-cols-3">
            {/* Main content */}
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-2"
            >
              {/* Meta bar */}
              <div className="mb-8 flex flex-wrap items-center gap-4 border-b border-gray-200 pb-6">
                <span className="bg-accent px-3 py-1 text-xs font-bold uppercase tracking-wider text-gray-950">
                  {post.category}
                </span>
                <span className="flex items-center gap-1 text-sm text-gray-500">
                  <Calendar size={14} />
                  {post.date}
                </span>
                <span className="flex items-center gap-1 text-sm text-gray-500">
                  <Clock size={14} />
                  {post.readTime}
                </span>
                <span className="flex items-center gap-1 text-sm text-gray-500">
                  <User size={14} />
                  {post.author}
                </span>
              </div>

              {/* Article body */}
              <div className="prose-custom">
                {renderContent(post.content)}
              </div>

              {/* Comments section */}
              <div className="mt-16 border-t border-gray-200 pt-12">
                <h3 className="flex items-center gap-2 text-2xl font-bold text-gray-950">
                  <MessageSquare size={24} />
                  Comments ({comments.length})
                </h3>

                {/* Comment form */}
                <form
                  onSubmit={handleSubmitComment}
                  className="mt-8 space-y-4"
                >
                  <div>
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={commentName}
                      onChange={(e) => setCommentName(e.target.value)}
                      className="w-full border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-950 placeholder-gray-400 outline-none transition-colors focus:border-accent"
                    />
                  </div>
                  <div>
                    <textarea
                      placeholder="Write a comment..."
                      value={commentMessage}
                      onChange={(e) => setCommentMessage(e.target.value)}
                      rows={4}
                      className="w-full resize-none border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-950 placeholder-gray-400 outline-none transition-colors focus:border-accent"
                    />
                  </div>
                  <Button type="submit" size="md">
                    Post Comment
                  </Button>
                </form>

                {/* Comment list */}
                <div className="mt-10 space-y-6">
                  {comments.map((comment, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.05 }}
                      className="border-b border-gray-100 pb-6"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center bg-gray-200 text-sm font-bold text-gray-700">
                          {comment.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-950">
                            {comment.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {comment.date}
                          </p>
                        </div>
                      </div>
                      <p className="mt-3 text-sm leading-relaxed text-gray-600">
                        {comment.message}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.article>

            {/* Sidebar */}
            <motion.aside
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-lg font-bold uppercase tracking-wider text-gray-950">
                Related Articles
              </h3>
              <div className="mt-6 space-y-6">
                {relatedPosts.map((rp) => (
                  <Link
                    key={rp.slug}
                    href={`/blog/${rp.slug}`}
                    className="group block"
                  >
                    <div className="aspect-video bg-linear-to-br from-gray-200 to-gray-100">
                      <div className="flex h-full items-center justify-center">
                        <span className="text-xs text-gray-400">
                          Article image
                        </span>
                      </div>
                    </div>
                    <span className="mt-3 block text-xs font-bold uppercase tracking-wider text-accent">
                      {rp.category}
                    </span>
                    <p className="mt-1 text-sm font-bold text-gray-950 transition-colors group-hover:text-accent">
                      {rp.title}
                    </p>
                    <p className="mt-1 text-xs text-gray-500">{rp.date}</p>
                  </Link>
                ))}
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
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-gray-600 transition-colors hover:text-accent"
            >
              <ArrowLeft size={14} />
              Back to All Articles
            </Link>
          </motion.div>
        </Container>
      </section>
    </>
  );
}
