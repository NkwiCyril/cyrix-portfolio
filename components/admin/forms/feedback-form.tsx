"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, Loader2 } from "lucide-react";
import type { Feedback } from "@/types/database";

interface FeedbackFormProps {
  feedback?: Feedback;
}

export function FeedbackForm({ feedback }: FeedbackFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    client_name: feedback?.client_name || "",
    feedback_text: feedback?.feedback_text || "",
    rating: feedback?.rating || 5,
    project_id: feedback?.project_id || "",
    image_url: feedback?.image_url || "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const payload = {
        ...formData,
        project_id: formData.project_id || null,
      };

      const url = feedback ? `/api/feedbacks/${feedback.id}` : "/api/feedbacks";
      const method = feedback ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to save feedback");
      }

      router.push("/admin/feedbacks");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="rounded-lg border border-gray-800 bg-[#0f0f0f] p-6">
        <h2 className="mb-4 text-lg font-semibold text-white">Feedback Details</h2>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300">Client Name *</label>
            <input
              type="text"
              required
              value={formData.client_name}
              onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
              className="mt-2 w-full rounded-lg border border-gray-700 bg-[#0a0a0a] px-4 py-2 text-white focus:border-accent focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300">Rating *</label>
            <select
              required
              value={formData.rating}
              onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
              className="mt-2 w-full rounded-lg border border-gray-700 bg-[#0a0a0a] px-4 py-2 text-white focus:border-accent focus:outline-none"
            >
              <option value={5}>5 Stars</option>
              <option value={4}>4 Stars</option>
              <option value={3}>3 Stars</option>
              <option value={2}>2 Stars</option>
              <option value={1}>1 Star</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300">Client Image URL</label>
            <input
              type="url"
              value={formData.image_url}
              onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
              className="mt-2 w-full rounded-lg border border-gray-700 bg-[#0a0a0a] px-4 py-2 text-white focus:border-accent focus:outline-none"
              placeholder="https://..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300">Feedback Text *</label>
            <textarea
              required
              value={formData.feedback_text}
              onChange={(e) => setFormData({ ...formData, feedback_text: e.target.value })}
              rows={6}
              className="mt-2 w-full rounded-lg border border-gray-700 bg-[#0a0a0a] px-4 py-2 text-white focus:border-accent focus:outline-none"
            />
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
              {feedback ? "Update Feedback" : "Add Feedback"}
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
