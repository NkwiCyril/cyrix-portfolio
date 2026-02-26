import { adminClient } from "@/utils/supabase/admin";
import { FeedbackForm } from "@/components/admin/forms/feedback-form";
import { notFound } from "next/navigation";

export default async function EditFeedbackPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: feedback, error } = await adminClient
    .from("feedbacks")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !feedback) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Edit Feedback</h1>
        <p className="mt-1 text-sm text-gray-400">Update feedback from {feedback.client_name}</p>
      </div>

      <FeedbackForm feedback={feedback} />
    </div>
  );
}
