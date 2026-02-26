"use client";

import { User } from "@supabase/supabase-js";
import { LogOut, User as UserIcon } from "lucide-react";
import { useRouter } from "next/navigation";

interface AdminHeaderProps {
  user: User;
}

export function AdminHeader({ user }: AdminHeaderProps) {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <header className="flex h-16 items-center justify-between border-b border-gray-800 bg-[#0f0f0f] px-6">
      <div>
        <h2 className="text-lg font-semibold text-white">Content Management</h2>
        <p className="text-xs text-gray-500">Manage your portfolio content</p>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <UserIcon size={16} />
          <span>{user.email}</span>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 rounded-lg bg-gray-800 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-700"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </header>
  );
}
