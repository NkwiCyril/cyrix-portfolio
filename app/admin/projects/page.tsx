import Link from "next/link";
import { adminClient } from "@/utils/supabase/admin";
import { Plus, Pencil, Trash2, ExternalLink } from "lucide-react";
import { DeleteButton } from "@/components/admin/delete-button";

export default async function AdminProjectsPage() {
  const { data: projects, error } = await adminClient
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <div className="rounded-lg border border-red-800 bg-red-950/20 p-6">
        <h2 className="text-lg font-bold text-red-400">Error loading projects</h2>
        <p className="mt-2 text-sm text-red-300">{error.message}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Projects</h1>
          <p className="mt-1 text-sm text-gray-400">
            Manage your portfolio projects
          </p>
        </div>
        <Link
          href="/admin/projects/new"
          className="flex items-center gap-2 rounded-lg bg-accent px-4 py-2 font-medium text-[#0a0a0a] transition-opacity hover:opacity-90"
        >
          <Plus size={20} />
          New Project
        </Link>
      </div>

      {projects && projects.length > 0 ? (
        <div className="overflow-hidden rounded-lg border border-gray-800 bg-[#0f0f0f]">
          <table className="w-full">
            <thead className="border-b border-gray-800 bg-[#0a0a0a]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                  Year
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                  Client
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-400">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {projects.map((project) => (
                <tr key={project.id} className="transition-colors hover:bg-gray-900/50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div>
                        <div className="font-medium text-white">{project.title}</div>
                        <div className="text-xs text-gray-500">{project.slug}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex rounded-full bg-gray-800 px-2 py-1 text-xs font-medium text-gray-300">
                      {project.category || "Uncategorized"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-400">
                    {project.year || "—"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-400">
                    {project.client || "—"}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      {project.live_url && (
                        <a
                          href={project.live_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded p-2 text-gray-400 transition-colors hover:bg-gray-800 hover:text-white"
                          title="View live"
                        >
                          <ExternalLink size={16} />
                        </a>
                      )}
                      <Link
                        href={`/admin/projects/${project.id}`}
                        className="rounded p-2 text-gray-400 transition-colors hover:bg-gray-800 hover:text-white"
                        title="Edit"
                      >
                        <Pencil size={16} />
                      </Link>
                      <DeleteButton
                        id={project.id}
                        endpoint="/api/projects"
                        itemName={project.title}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="rounded-lg border border-gray-800 bg-[#0f0f0f] p-12 text-center">
          <p className="text-gray-400">No projects found.</p>
          <Link
            href="/admin/projects/new"
            className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-accent hover:underline"
          >
            <Plus size={16} />
            Create your first project
          </Link>
        </div>
      )}
    </div>
  );
}
