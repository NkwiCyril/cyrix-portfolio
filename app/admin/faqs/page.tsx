import Link from "next/link";
import { adminClient } from "@/utils/supabase/admin";
import { Plus, Pencil, HelpCircle } from "lucide-react";
import { DeleteButton } from "@/components/admin/delete-button";

export const revalidate = 0;

export default async function AdminFaqsPage() {
  const { data: faqs, error } = await adminClient
    .from("faqs")
    .select("*")
    .order("display_order", { ascending: true });

  if (error) {
    return (
      <div className="rounded-lg border border-red-800 bg-red-950/20 p-6">
        <h2 className="text-lg font-bold text-red-400">Error loading FAQs</h2>
        <p className="mt-2 text-sm text-red-300">{error.message}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">FAQs</h1>
          <p className="mt-1 text-sm text-gray-400">
            Frequently asked questions shown on the homepage
          </p>
        </div>
        <Link
          href="/admin/faqs/new"
          className="flex items-center gap-2 rounded-lg bg-accent px-4 py-2 font-medium text-[#0a0a0a] transition-opacity hover:opacity-90"
        >
          <Plus size={20} />
          New FAQ
        </Link>
      </div>

      {faqs && faqs.length > 0 ? (
        <div className="space-y-3">
          {faqs.map((faq) => (
            <article
              key={faq.id}
              className="rounded-lg border border-gray-800 bg-[#0f0f0f] p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-gray-500">
                      #{faq.display_order}
                    </span>
                    {!faq.is_published && (
                      <span className="rounded-full bg-gray-800 px-2 py-0.5 text-xs text-gray-400">
                        Draft
                      </span>
                    )}
                  </div>
                  <h2 className="mt-2 font-semibold text-white">
                    {faq.question}
                  </h2>
                  <p className="mt-2 line-clamp-2 text-sm text-gray-400">
                    {faq.answer}
                  </p>
                </div>
                <div className="flex shrink-0 gap-2">
                  <Link
                    href={`/admin/faqs/${faq.id}`}
                    className="rounded p-2 text-gray-400 transition-colors hover:bg-gray-800 hover:text-white"
                    title="Edit"
                  >
                    <Pencil size={16} />
                  </Link>
                  <DeleteButton
                    id={faq.id}
                    endpoint="/api/faqs"
                    itemName={`FAQ: ${faq.question}`}
                  />
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-gray-800 bg-[#0f0f0f] p-12 text-center">
          <HelpCircle size={32} className="mx-auto text-gray-600" />
          <p className="mt-3 text-gray-400">No FAQs yet.</p>
          <Link
            href="/admin/faqs/new"
            className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-accent hover:underline"
          >
            <Plus size={16} />
            Add your first FAQ
          </Link>
        </div>
      )}
    </div>
  );
}
