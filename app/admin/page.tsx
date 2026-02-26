import { adminClient } from "@/utils/supabase/admin";
import {
  FolderKanban,
  Briefcase,
  FileText,
  Megaphone,
  GraduationCap,
  Wrench,
  MessageSquare,
  TrendingUp,
} from "lucide-react";

export default async function AdminDashboard() {
  // Fetch counts for all models
  const [
    projectsCount,
    servicesCount,
    blogPostsCount,
    announcementsCount,
    coursesCount,
    techStackCount,
    feedbacksCount,
  ] = await Promise.all([
    adminClient.from("projects").select("*", { count: "exact", head: true }),
    adminClient.from("services").select("*", { count: "exact", head: true }),
    adminClient.from("blog_posts").select("*", { count: "exact", head: true }),
    adminClient.from("announcements").select("*", { count: "exact", head: true }),
    adminClient.from("courses").select("*", { count: "exact", head: true }),
    adminClient.from("tech_stack").select("*", { count: "exact", head: true }),
    adminClient.from("feedbacks").select("*", { count: "exact", head: true }),
  ]);

  const stats = [
    {
      name: "Projects",
      count: projectsCount.count || 0,
      icon: FolderKanban,
      href: "/admin/projects",
      color: "text-blue-400",
    },
    {
      name: "Services",
      count: servicesCount.count || 0,
      icon: Briefcase,
      href: "/admin/services",
      color: "text-purple-400",
    },
    {
      name: "Blog Posts",
      count: blogPostsCount.count || 0,
      icon: FileText,
      href: "/admin/blog-posts",
      color: "text-green-400",
    },
    {
      name: "Announcements",
      count: announcementsCount.count || 0,
      icon: Megaphone,
      href: "/admin/announcements",
      color: "text-yellow-400",
    },
    {
      name: "Courses",
      count: coursesCount.count || 0,
      icon: GraduationCap,
      href: "/admin/courses",
      color: "text-red-400",
    },
    {
      name: "Tech Stack",
      count: techStackCount.count || 0,
      icon: Wrench,
      href: "/admin/tech-stack",
      color: "text-orange-400",
    },
    {
      name: "Feedbacks",
      count: feedbacksCount.count || 0,
      icon: MessageSquare,
      href: "/admin/feedbacks",
      color: "text-pink-400",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-400">
          Overview of your portfolio content
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <a
            key={stat.name}
            href={stat.href}
            className="group rounded-lg border border-gray-800 bg-[#0f0f0f] p-6 transition-all hover:border-accent hover:shadow-lg hover:shadow-accent/20"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">{stat.name}</p>
                <p className="mt-2 text-3xl font-bold text-white">{stat.count}</p>
              </div>
              <stat.icon className={`${stat.color} transition-transform group-hover:scale-110`} size={32} />
            </div>
            <div className="mt-4 flex items-center text-xs text-gray-500">
              <TrendingUp size={14} className="mr-1" />
              Manage {stat.name.toLowerCase()}
            </div>
          </a>
        ))}
      </div>

      <div className="rounded-lg border border-gray-800 bg-[#0f0f0f] p-6">
        <h2 className="text-lg font-semibold text-white">Quick Actions</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <a
            href="/admin/projects/new"
            className="rounded-lg border border-gray-700 bg-[#0a0a0a] p-4 transition-colors hover:border-accent hover:bg-gray-900"
          >
            <h3 className="font-medium text-white">New Project</h3>
            <p className="mt-1 text-xs text-gray-400">Add a new portfolio project</p>
          </a>
          <a
            href="/admin/blog-posts/new"
            className="rounded-lg border border-gray-700 bg-[#0a0a0a] p-4 transition-colors hover:border-accent hover:bg-gray-900"
          >
            <h3 className="font-medium text-white">New Blog Post</h3>
            <p className="mt-1 text-xs text-gray-400">Write a new article</p>
          </a>
          <a
            href="/admin/services/new"
            className="rounded-lg border border-gray-700 bg-[#0a0a0a] p-4 transition-colors hover:border-accent hover:bg-gray-900"
          >
            <h3 className="font-medium text-white">New Service</h3>
            <p className="mt-1 text-xs text-gray-400">Add a service offering</p>
          </a>
        </div>
      </div>
    </div>
  );
}
