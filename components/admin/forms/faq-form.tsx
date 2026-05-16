"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, Loader2 } from "lucide-react";
import type { FAQ } from "@/types/database";

interface FaqFormProps {
  faq?: FAQ;
}

export function FaqForm({ faq }: FaqFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    question: faq?.question || "",
    answer: faq?.answer || "",
    display_order: faq?.display_order ?? 0,
    is_published: faq?.is_published ?? true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const url = faq ? `/api/faqs/${faq.id}` : "/api/faqs";
      const method = faq ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to save FAQ");
      }

      router.push("/admin/faqs");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="rounded-lg border border-gray-800 bg-[#0f0f0f] p-6">
        <div>
          <label className="block text-sm font-medium text-gray-300">
            Question *
          </label>
          <input
            type="text"
            required
            value={formData.question}
            onChange={(e) =>
              setFormData({ ...formData, question: e.target.value })
            }
            className="mt-2 w-full rounded-lg border border-gray-700 bg-[#0a0a0a] px-4 py-2 text-white focus:border-accent focus:outline-none"
            placeholder="How long does it take to develop a website?"
          />
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-300">
            Answer *
          </label>
          <textarea
            required
            value={formData.answer}
            onChange={(e) =>
              setFormData({ ...formData, answer: e.target.value })
            }
            rows={6}
            className="mt-2 w-full rounded-lg border border-gray-700 bg-[#0a0a0a] px-4 py-2 text-white focus:border-accent focus:outline-none"
            placeholder="Most projects take 2 to 6 weeks depending on scope..."
          />
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-300">
              Display Order
            </label>
            <input
              type="number"
              value={formData.display_order}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  display_order: parseInt(e.target.value) || 0,
                })
              }
              className="mt-2 w-full rounded-lg border border-gray-700 bg-[#0a0a0a] px-4 py-2 text-white focus:border-accent focus:outline-none"
            />
            <p className="mt-1 text-xs text-gray-500">
              Lower numbers appear first.
            </p>
          </div>

          <div className="flex items-end">
            <label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-gray-300">
              <input
                type="checkbox"
                checked={formData.is_published}
                onChange={(e) =>
                  setFormData({ ...formData, is_published: e.target.checked })
                }
                className="h-4 w-4 accent-accent"
              />
              Published (visible on homepage)
            </label>
          </div>
        </div>
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
              {faq ? "Update FAQ" : "Create FAQ"}
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
