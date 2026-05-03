"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  Megaphone,
  GraduationCap,
  Wrench,
  MessageSquare,
  Settings,
  FolderKanban,
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Projects", href: "/admin/projects", icon: FolderKanban },
  { name: "Services", href: "/admin/services", icon: Briefcase },
  { name: "Blog Posts", href: "/admin/blog-posts", icon: FileText },
  { name: "Announcements", href: "/admin/announcements", icon: Megaphone },
  { name: "Courses", href: "/admin/courses", icon: GraduationCap },
  { name: "Tech Stack", href: "/admin/tech-stack", icon: Wrench },
  { name: "Feedbacks", href: "/admin/feedbacks", icon: MessageSquare },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r border-gray-800 bg-[#0f0f0f]">
      <div className="flex h-16 items-center border-b border-gray-800 px-6">
        <Link
            href="/"
            className="font-logo text-2xl tracking-wide text-accent uppercase"
          >
            Cyrix CMS
          </Link>
      </div>
      <nav className="space-y-1 p-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-accent text-[#0a0a0a]"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <item.icon size={20} />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
