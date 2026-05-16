import { FaqForm } from "@/components/admin/forms/faq-form";

export default function NewFaqPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">New FAQ</h1>
        <p className="mt-1 text-sm text-gray-400">Add a question to the FAQ section</p>
      </div>
      <FaqForm />
    </div>
  );
}
