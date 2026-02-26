import { FeedbackForm } from "@/components/admin/forms/feedback-form";

export default function NewFeedbackPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Add Feedback</h1>
        <p className="mt-1 text-sm text-gray-400">Add a client testimonial</p>
      </div>

      <FeedbackForm />
    </div>
  );
}
