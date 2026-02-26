import { adminClient } from "@/utils/supabase/admin";
import { BlogPostForm } from "@/components/admin/forms/blog-post-form";
import { notFound } from "next/navigation";

export default async function EditBlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: post, error } = await adminClient
    .from("blog_posts")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !post) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Edit Blog Post</h1>
        <p className="mt-1 text-sm text-gray-400">Update post: {post.title}</p>
      </div>

      <BlogPostForm post={post} />
    </div>
  );
}
