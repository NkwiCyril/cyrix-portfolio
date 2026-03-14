import { getBlogPostBySlug, getBlogPosts } from "@/utils/supabase/queries";
import { BlogDetailClient } from "./blog-detail-client";
import { notFound } from "next/navigation";
import type { BlogPost } from "@/types/database";

export const revalidate = 60;

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { data: post } = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const { data: allPosts } = await getBlogPosts(4, 0, true);
  const relatedPosts = (allPosts ?? []).filter((p: BlogPost) => p.slug !== slug).slice(0, 3);

  return <BlogDetailClient post={post} relatedPosts={relatedPosts} />;
}
