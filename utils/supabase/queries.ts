import { adminClient } from "./admin";
import type {
  Project,
  BlogPost,
  Announcement,
  TechStack,
  Service,
  Feedback,
  Course,
} from "@/types/database";

// Projects
export async function getProjects(limit = 10, offset = 0) {
  return adminClient
    .from("projects")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);
}

export async function getProjectBySlug(slug: string) {
  return adminClient
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .single();
}

export async function createProject(project: Omit<Project, "id" | "created_at" | "updated_at">) {
  return adminClient
    .from("projects")
    .insert([project])
    .select()
    .single();
}

export async function updateProject(id: string, updates: Partial<Project>) {
  return adminClient
    .from("projects")
    .update(updates)
    .eq("id", id)
    .select()
    .single();
}

export async function deleteProject(id: string) {
  return adminClient
    .from("projects")
    .delete()
    .eq("id", id);
}

// Blog Posts
export async function getBlogPosts(limit = 10, offset = 0, published = true) {
  let query = adminClient
    .from("blog_posts")
    .select("*", { count: "exact" })
    .order("published_date", { ascending: false });

  if (published) {
    query = query.eq("is_published", true);
  }

  return query.range(offset, offset + limit - 1);
}

export async function getBlogPostBySlug(slug: string) {
  return adminClient
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .single();
}

export async function createBlogPost(post: Omit<BlogPost, "id" | "created_at" | "updated_at">) {
  return adminClient
    .from("blog_posts")
    .insert([post])
    .select()
    .single();
}

export async function updateBlogPost(id: string, updates: Partial<BlogPost>) {
  return adminClient
    .from("blog_posts")
    .update(updates)
    .eq("id", id)
    .select()
    .single();
}

export async function deleteBlogPost(id: string) {
  return adminClient
    .from("blog_posts")
    .delete()
    .eq("id", id);
}

// Announcements
export async function getAnnouncements(limit = 10, offset = 0, activeOnly = true) {
  let query = adminClient
    .from("announcements")
    .select("*", { count: "exact" })
    .order("start_date", { ascending: false });

  if (activeOnly) {
    query = query.eq("is_active", true);
  }

  return query.range(offset, offset + limit - 1);
}

export async function createAnnouncement(announcement: Omit<Announcement, "id" | "created_at" | "updated_at">) {
  return adminClient
    .from("announcements")
    .insert([announcement])
    .select()
    .single();
}

export async function updateAnnouncement(id: string, updates: Partial<Announcement>) {
  return adminClient
    .from("announcements")
    .update(updates)
    .eq("id", id)
    .select()
    .single();
}

export async function deleteAnnouncement(id: string) {
  return adminClient
    .from("announcements")
    .delete()
    .eq("id", id);
}

// Tech Stack
export async function getTechStack() {
  return adminClient
    .from("tech_stack")
    .select("*")
    .order("name", { ascending: true });
}

export async function createTechStackItem(item: Omit<TechStack, "id" | "created_at" | "updated_at">) {
  return adminClient
    .from("tech_stack")
    .insert([item])
    .select()
    .single();
}

export async function updateTechStackItem(id: string, updates: Partial<TechStack>) {
  return adminClient
    .from("tech_stack")
    .update(updates)
    .eq("id", id)
    .select()
    .single();
}

export async function deleteTechStackItem(id: string) {
  return adminClient
    .from("tech_stack")
    .delete()
    .eq("id", id);
}

// Services
export async function getServices(limit = 10, offset = 0) {
  return adminClient
    .from("services")
    .select("*", { count: "exact" })
    .order("display_order", { ascending: true })
    .range(offset, offset + limit - 1);
}

export async function getServiceBySlug(slug: string) {
  return adminClient
    .from("services")
    .select("*")
    .eq("slug", slug)
    .single();
}

export async function createService(service: Omit<Service, "id" | "created_at" | "updated_at">) {
  return adminClient
    .from("services")
    .insert([service])
    .select()
    .single();
}

export async function updateService(id: string, updates: Partial<Service>) {
  return adminClient
    .from("services")
    .update(updates)
    .eq("id", id)
    .select()
    .single();
}

export async function deleteService(id: string) {
  return adminClient
    .from("services")
    .delete()
    .eq("id", id);
}

// Feedbacks
export async function getFeedbacks(limit = 10, offset = 0) {
  return adminClient
    .from("feedbacks")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);
}

export async function createFeedback(feedback: Omit<Feedback, "id" | "created_at" | "updated_at">) {
  return adminClient
    .from("feedbacks")
    .insert([feedback])
    .select()
    .single();
}

export async function updateFeedback(id: string, updates: Partial<Feedback>) {
  return adminClient
    .from("feedbacks")
    .update(updates)
    .eq("id", id)
    .select()
    .single();
}

export async function deleteFeedback(id: string) {
  return adminClient
    .from("feedbacks")
    .delete()
    .eq("id", id);
}

// Courses
export async function getCourses(limit = 10, offset = 0, published = true) {
  let query = adminClient
    .from("courses")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false });

  if (published) {
    query = query.eq("is_published", true);
  }

  return query.range(offset, offset + limit - 1);
}

export async function getCourseBySlug(slug: string) {
  return adminClient
    .from("courses")
    .select("*")
    .eq("slug", slug)
    .single();
}

export async function createCourse(course: Omit<Course, "id" | "created_at" | "updated_at">) {
  return adminClient
    .from("courses")
    .insert([course])
    .select()
    .single();
}

export async function updateCourse(id: string, updates: Partial<Course>) {
  return adminClient
    .from("courses")
    .update(updates)
    .eq("id", id)
    .select()
    .single();
}

export async function deleteCourse(id: string) {
  return adminClient
    .from("courses")
    .delete()
    .eq("id", id);
}
