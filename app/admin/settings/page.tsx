export default function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="mt-1 text-sm text-gray-400">Manage admin panel settings</p>
      </div>

      <div className="rounded-lg border border-gray-800 bg-[#0f0f0f] p-6">
        <h2 className="text-lg font-semibold text-white">Account Information</h2>
        <p className="mt-2 text-sm text-gray-400">
          Settings page coming soon. For now, manage your account in Supabase dashboard.
        </p>
      </div>

      <div className="rounded-lg border border-gray-800 bg-[#0f0f0f] p-6">
        <h2 className="text-lg font-semibold text-white">Quick Links</h2>
        <div className="mt-4 space-y-2">
          <a
            href="https://supabase.com"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-sm text-accent hover:underline"
          >
            → Supabase Dashboard
          </a>
          <a
            href="/admin"
            className="block text-sm text-accent hover:underline"
          >
            → Admin Dashboard
          </a>
        </div>
      </div>
    </div>
  );
}
