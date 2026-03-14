import { getBlogPosts } from "@/utils/supabase/queries";
import { BlogPageClient } from "./blog-page-client";

export const revalidate = 60;

export default async function BlogPage() {
  const { data: posts } = await getBlogPosts(50, 0, true);
  return <BlogPageClient posts={posts ?? []} />;
}
