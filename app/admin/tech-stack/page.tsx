import Link from "next/link";
import { adminClient } from "@/utils/supabase/admin";
import { Plus, Pencil } from "lucide-react";
import { DeleteButton } from "@/components/admin/delete-button";

export default async function AdminTechStackPage() {
  const { data: techStack, error } = await adminClient
    .from("tech_stack")
    .select("*")
    .order("name", { ascending: true });

  if (error) {
    return (
      <div className="rounded-lg border border-red-800 bg-red-950/20 p-6">
        <h2 className="text-lg font-bold text-red-400">Error loading tech stack</h2>
        <p className="mt-2 text-sm text-red-300">{error.message}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Tech Stack</h1>
          <p className="mt-1 text-sm text-gray-400">Manage technologies and skills</p>
        </div>
        <Link
          href="/admin/tech-stack/new"
          className="flex items-center gap-2 rounded-lg bg-accent px-4 py-2 font-medium text-[#0a0a0a] transition-opacity hover:opacity-90"
        >
          <Plus size={20} />
          Add Technology
        </Link>
      </div>

      {techStack && techStack.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {techStack.map((tech) => (
            <div
              key={tech.id}
              className="rounded-lg border border-gray-800 bg-[#0f0f0f] p-6 transition-colors hover:border-gray-700"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-white">{tech.name}</h3>
                  <p className="mt-1 text-sm text-gray-400">{tech.category || "Uncategorized"}</p>
                  <div className="mt-2">
                    <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                      tech.proficiency === "expert" ? "bg-green-900/30 text-green-400" :
                      tech.proficiency === "intermediate" ? "bg-blue-900/30 text-blue-400" :
                      "bg-gray-800 text-gray-400"
                    }`}>
                      {tech.proficiency}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Link
                    href={`/admin/tech-stack/${tech.id}`}
                    className="rounded p-2 text-gray-400 transition-colors hover:bg-gray-800 hover:text-white"
                    title="Edit"
                  >
                    <Pencil size={16} />
                  </Link>
                  <DeleteButton
                    id={tech.id}
                    endpoint="/api/tech-stack"
                    itemName={tech.name}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-gray-800 bg-[#0f0f0f] p-12 text-center">
          <p className="text-gray-400">No technologies found.</p>
          <Link
            href="/admin/tech-stack/new"
            className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-accent hover:underline"
          >
            <Plus size={16} />
            Add your first technology
          </Link>
        </div>
      )}
    </div>
  );
}
