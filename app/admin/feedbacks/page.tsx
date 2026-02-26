import Link from "next/link";
import { adminClient } from "@/utils/supabase/admin";
import { Plus, Pencil, Star } from "lucide-react";
import { DeleteButton } from "@/components/admin/delete-button";

export default async function AdminFeedbacksPage() {
  const { data: feedbacks, error } = await adminClient
    .from("feedbacks")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <div className="rounded-lg border border-red-800 bg-red-950/20 p-6">
        <h2 className="text-lg font-bold text-red-400">Error loading feedbacks</h2>
        <p className="mt-2 text-sm text-red-300">{error.message}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Feedbacks</h1>
          <p className="mt-1 text-sm text-gray-400">Manage client testimonials</p>
        </div>
        <Link
          href="/admin/feedbacks/new"
          className="flex items-center gap-2 rounded-lg bg-accent px-4 py-2 font-medium text-[#0a0a0a] transition-opacity hover:opacity-90"
        >
          <Plus size={20} />
          Add Feedback
        </Link>
      </div>

      {feedbacks && feedbacks.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2">
          {feedbacks.map((feedback) => (
            <div
              key={feedback.id}
              className="rounded-lg border border-gray-800 bg-[#0f0f0f] p-6"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-white">{feedback.client_name}</h3>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: feedback.rating }).map((_, i) => (
                        <Star key={i} size={14} className="fill-accent text-accent" />
                      ))}
                    </div>
                  </div>
                  <p className="mt-2 line-clamp-3 text-sm text-gray-400">
                    {feedback.feedback_text}
                  </p>
                  <p className="mt-2 text-xs text-gray-500">
                    {new Date(feedback.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="ml-4 flex gap-2">
                  <Link
                    href={`/admin/feedbacks/${feedback.id}`}
                    className="rounded p-2 text-gray-400 transition-colors hover:bg-gray-800 hover:text-white"
                    title="Edit"
                  >
                    <Pencil size={16} />
                  </Link>
                  <DeleteButton
                    id={feedback.id}
                    endpoint="/api/feedbacks"
                    itemName={`Feedback from ${feedback.client_name}`}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-gray-800 bg-[#0f0f0f] p-12 text-center">
          <p className="text-gray-400">No feedbacks found.</p>
          <Link
            href="/admin/feedbacks/new"
            className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-accent hover:underline"
          >
            <Plus size={16} />
            Add your first feedback
          </Link>
        </div>
      )}
    </div>
  );
}
