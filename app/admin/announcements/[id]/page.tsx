import { adminClient } from "@/utils/supabase/admin";
import { AnnouncementForm } from "@/components/admin/forms/announcement-form";
import { notFound } from "next/navigation";

export default async function EditAnnouncementPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: announcement, error } = await adminClient
    .from("announcements")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !announcement) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Edit Announcement</h1>
        <p className="mt-1 text-sm text-gray-400">Update announcement: {announcement.title}</p>
      </div>

      <AnnouncementForm announcement={announcement} />
    </div>
  );
}
