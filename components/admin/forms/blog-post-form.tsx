"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, Loader2, Plus, X } from "lucide-react";
import type { BlogPost } from "@/types/database";
import { Editor } from "@tinymce/tinymce-react";

interface BlogPostFormProps {
  post?: BlogPost;
}

export function BlogPostForm({ post }: BlogPostFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const tinyMceApiKey = process.env.NEXT_PUBLIC_TINYMCE_API_KEY ?? "";

  const [formData, setFormData] = useState({
    title: post?.title || "",
    slug: post?.slug || "",
    content: post?.content || "",
    excerpt: post?.excerpt || "",
    featured_image_url: post?.featured_image_url || "",
    author: post?.author || "Cyrix",
    category: post?.category || "",
    published_date: post?.published_date ? post.published_date.split("T")[0] : "",
    is_published: post?.is_published || false,
  });

  const [tags, setTags] = useState<string[]>(post?.tags || []);
  const [newTag, setNewTag] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const plainContent = formData.content
        .replace(/<[^>]*>/g, " ")
        .replace(/\s+/g, " ")
        .trim();

      if (!plainContent) {
        setError("Content is required");
        setLoading(false);
        return;
      }

      const payload = {
        ...formData,
        tags,
        published_date: formData.published_date ? new Date(formData.published_date).toISOString() : null,
      };

      const url = post ? `/api/blog-posts/${post.id}` : "/api/blog-posts";
      const method = post ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to save blog post");
      }

      router.push("/admin/blog-posts");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  const removeTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="rounded-lg border border-gray-800 bg-[#0f0f0f] p-6">
        <h2 className="mb-4 text-lg font-semibold text-white">Basic Information</h2>
        
        <div className="grid gap-6 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-300">Title *</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="mt-2 w-full rounded-lg border border-gray-700 bg-[#0a0a0a] px-4 py-2 text-white focus:border-accent focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300">Slug *</label>
            <input
              type="text"
              required
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/\s+/g, "-") })}
              className="mt-2 w-full rounded-lg border border-gray-700 bg-[#0a0a0a] px-4 py-2 text-white focus:border-accent focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300">Author</label>
            <input
              type="text"
              value={formData.author}
              onChange={(e) => setFormData({ ...formData, author: e.target.value })}
              className="mt-2 w-full rounded-lg border border-gray-700 bg-[#0a0a0a] px-4 py-2 text-white focus:border-accent focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300">Category</label>
            <input
              type="text"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="mt-2 w-full rounded-lg border border-gray-700 bg-[#0a0a0a] px-4 py-2 text-white focus:border-accent focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300">Published Date</label>
            <input
              type="date"
              value={formData.published_date}
              onChange={(e) => setFormData({ ...formData, published_date: e.target.value })}
              className="mt-2 w-full rounded-lg border border-gray-700 bg-[#0a0a0a] px-4 py-2 text-white focus:border-accent focus:outline-none"
            />
          </div>
        </div>

        <div className="mt-6">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.is_published}
              onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
              className="h-4 w-4 rounded border-gray-700 bg-[#0a0a0a] text-accent focus:ring-accent"
            />
            <span className="text-sm font-medium text-gray-300">Published</span>
          </label>
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-300">Featured Image URL</label>
          <input
            type="url"
            value={formData.featured_image_url}
            onChange={(e) => setFormData({ ...formData, featured_image_url: e.target.value })}
            className="mt-2 w-full rounded-lg border border-gray-700 bg-[#0a0a0a] px-4 py-2 text-white focus:border-accent focus:outline-none"
          />
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-300">Excerpt</label>
          <textarea
            value={formData.excerpt}
            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
            rows={3}
            className="mt-2 w-full rounded-lg border border-gray-700 bg-[#0a0a0a] px-4 py-2 text-white focus:border-accent focus:outline-none"
          />
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-300">Content *</label>
          <div className="mt-2 overflow-hidden rounded-lg border border-gray-700 bg-[#0a0a0a]">
            <Editor
              apiKey={tinyMceApiKey}
              value={formData.content}
              onEditorChange={(content) =>
                setFormData((prev) => ({ ...prev, content }))
              }
              init={{
                height: 420,
                menubar: false,
                // skin: "oxide-dark",
                // content_css: "dark",
                plugins:
                  "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount",
                toolbar:
                  "undo redo | blocks | bold italic underline strikethrough | link image media table | alignleft aligncenter alignright | bullist numlist | codesample | removeformat",
              }}
            />
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-gray-800 bg-[#0f0f0f] p-6">
        <h2 className="mb-4 text-lg font-semibold text-white">Tags</h2>
        
        <div className="flex gap-2">
          <input
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
            className="flex-1 rounded-lg border border-gray-700 bg-[#0a0a0a] px-4 py-2 text-white focus:border-accent focus:outline-none"
            placeholder="Add a tag"
          />
          <button
            type="button"
            onClick={addTag}
            className="rounded-lg bg-gray-700 px-4 py-2 text-white hover:bg-gray-600"
          >
            <Plus size={20} />
          </button>
        </div>
        {tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {tags.map((tag, idx) => (
              <div key={idx} className="flex items-center gap-2 rounded-full bg-gray-800 px-3 py-1">
                <span className="text-sm text-gray-300">{tag}</span>
                <button
                  type="button"
                  onClick={() => removeTag(idx)}
                  className="text-gray-400 hover:text-red-400"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {error && (
        <div className="rounded-lg border border-red-800 bg-red-950/20 p-4 text-sm text-red-400">
          {error}
        </div>
      )}

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 rounded-lg bg-accent px-6 py-3 font-medium text-[#0a0a0a] transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 size={20} className="animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save size={20} />
              {post ? "Update Post" : "Create Post"}
            </>
          )}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-lg border border-gray-700 px-6 py-3 font-medium text-white transition-colors hover:bg-gray-800"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
