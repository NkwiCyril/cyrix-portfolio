import Link from "next/link";
import { adminClient } from "@/utils/supabase/admin";
import { Plus, Pencil } from "lucide-react";
import { DeleteButton } from "@/components/admin/delete-button";

export default async function AdminAnnouncementsPage() {
  const { data: announcements, error } = await adminClient
    .from("announcements")
    .select("*")
    .order("start_date", { ascending: false });

  if (error) {
    return (
      <div className="rounded-lg border border-red-800 bg-red-950/20 p-6">
        <h2 className="text-lg font-bold text-red-400">Error loading announcements</h2>
        <p className="mt-2 text-sm text-red-300">{error.message}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Announcements</h1>
          <p className="mt-1 text-sm text-gray-400">Manage site announcements</p>
        </div>
        <Link
          href="/admin/announcements/new"
          className="flex items-center gap-2 rounded-lg bg-accent px-4 py-2 font-medium text-[#0a0a0a] transition-opacity hover:opacity-90"
        >
          <Plus size={20} />
          New Announcement
        </Link>
      </div>

      {announcements && announcements.length > 0 ? (
        <div className="overflow-hidden rounded-lg border border-gray-800 bg-[#0f0f0f]">
          <table className="w-full">
            <thead className="border-b border-gray-800 bg-[#0a0a0a]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                  Start Date
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-400">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {announcements.map((announcement) => (
                <tr key={announcement.id} className="transition-colors hover:bg-gray-900/50">
                  <td className="px-6 py-4">
                    <div className="font-medium text-white">{announcement.title}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex rounded-full bg-gray-800 px-2 py-1 text-xs font-medium capitalize text-gray-300">
                      {announcement.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {announcement.is_active ? (
                      <span className="inline-flex rounded-full bg-green-900/30 px-2 py-1 text-xs font-medium text-green-400">
                        Active
                      </span>
                    ) : (
                      <span className="inline-flex rounded-full bg-gray-800 px-2 py-1 text-xs font-medium text-gray-400">
                        Inactive
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-400">
                    {announcement.start_date ? new Date(announcement.start_date).toLocaleDateString() : "—"}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/announcements/${announcement.id}`}
                        className="rounded p-2 text-gray-400 transition-colors hover:bg-gray-800 hover:text-white"
                        title="Edit"
                      >
                        <Pencil size={16} />
                      </Link>
                      <DeleteButton
                        id={announcement.id}
                        endpoint="/api/announcements"
                        itemName={announcement.title}
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
          <p className="text-gray-400">No announcements found.</p>
          <Link
            href="/admin/announcements/new"
            className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-accent hover:underline"
          >
            <Plus size={16} />
            Create your first announcement
          </Link>
        </div>
      )}
    </div>
  );
}
