import { AnnouncementForm } from "@/components/admin/forms/announcement-form";

export default function NewAnnouncementPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">New Announcement</h1>
        <p className="mt-1 text-sm text-gray-400">Create a new announcement</p>
      </div>

      <AnnouncementForm />
    </div>
  );
}
