"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  Inbox,
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
  { name: "Messages", href: "/admin/messages", icon: Inbox },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r border-gray-800 bg-[#0f0f0f]">
      <div className="flex h-16 items-center gap-3 border-b border-gray-800 px-6">
        <Link href="/" aria-label="Cyrix — Home" className="flex items-center gap-3">
          <Image
            src="/assets/images/logos/cyrix-final-logo.webp"
            alt="Cyrix"
            width={120}
            height={120}
            className="h-9 w-auto"
          />
          <span className="text-sm font-bold uppercase tracking-wider text-accent">
            CMS
          </span>
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
