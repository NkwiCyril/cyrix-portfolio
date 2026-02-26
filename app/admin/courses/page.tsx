import Link from "next/link";
import { adminClient } from "@/utils/supabase/admin";
import { Plus, Pencil } from "lucide-react";
import { DeleteButton } from "@/components/admin/delete-button";

export default async function AdminCoursesPage() {
  const { data: courses, error } = await adminClient
    .from("courses")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <div className="rounded-lg border border-red-800 bg-red-950/20 p-6">
        <h2 className="text-lg font-bold text-red-400">Error loading courses</h2>
        <p className="mt-2 text-sm text-red-300">{error.message}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Courses</h1>
          <p className="mt-1 text-sm text-gray-400">Manage educational courses</p>
        </div>
        <Link
          href="/admin/courses/new"
          className="flex items-center gap-2 rounded-lg bg-accent px-4 py-2 font-medium text-[#0a0a0a] transition-opacity hover:opacity-90"
        >
          <Plus size={20} />
          New Course
        </Link>
      </div>

      {courses && courses.length > 0 ? (
        <div className="overflow-hidden rounded-lg border border-gray-800 bg-[#0f0f0f]">
          <table className="w-full">
            <thead className="border-b border-gray-800 bg-[#0a0a0a]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                  Modules
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-400">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {courses.map((course) => (
                <tr key={course.id} className="transition-colors hover:bg-gray-900/50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium text-white">{course.title}</div>
                      <div className="text-xs text-gray-500">{course.slug}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-400">
                    {course.price ? `$${course.price}` : "Free"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-400">
                    {course.modules?.length || 0} modules
                  </td>
                  <td className="px-6 py-4">
                    {course.is_published ? (
                      <span className="inline-flex rounded-full bg-green-900/30 px-2 py-1 text-xs font-medium text-green-400">
                        Published
                      </span>
                    ) : (
                      <span className="inline-flex rounded-full bg-yellow-900/30 px-2 py-1 text-xs font-medium text-yellow-400">
                        Draft
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/courses/${course.id}`}
                        className="rounded p-2 text-gray-400 transition-colors hover:bg-gray-800 hover:text-white"
                        title="Edit"
                      >
                        <Pencil size={16} />
                      </Link>
                      <DeleteButton
                        id={course.id}
                        endpoint="/api/courses"
                        itemName={course.title}
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
          <p className="text-gray-400">No courses found.</p>
          <Link
            href="/admin/courses/new"
            className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-accent hover:underline"
          >
            <Plus size={16} />
            Create your first course
          </Link>
        </div>
      )}
    </div>
  );
}
