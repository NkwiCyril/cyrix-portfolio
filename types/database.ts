export interface Profile {
  id: string;
  email: string;
  name: string;
  role: "admin" | "user";
  created_at: string;
  updated_at: string;
}

export interface TechStack {
  id: string;
  name: string;
  icon_url: string | null;
  proficiency: "beginner" | "intermediate" | "expert";
  category: string | null;
  created_at: string;
  updated_at: string;
}

export interface Service {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  long_description: string | null;
  icon: string | null;
  features: string[];
  pricing_model: string | null;
  base_price: number | null;
  is_featured: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  long_description: string | null;
  category: string | null;
  year: number | null;
  client: string | null;
  live_url: string | null;
  repo_url: string | null;
  featured_image_url: string | null;
  images: string[];
  technologies: string[];
  features: string[];
  bg_color: string;
  created_at: string;
  updated_at: string;
}

export interface Feedback {
  id: string;
  client_name: string;
  feedback_text: string;
  rating: number;
  project_id: string | null;
  image_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  featured_image_url: string | null;
  author: string;
  category: string | null;
  tags: string[];
  published_date: string | null;
  is_published: boolean;
  view_count: number;
  created_at: string;
  updated_at: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  type: "mentorship" | "general" | "update";
  start_date: string | null;
  end_date: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CourseModule {
  title: string;
  videoUrl?: string;
  notesUrl?: string;
  quizJson?: Record<string, unknown>;
}

export interface Course {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  price: number | null;
  enrollment_link: string | null;
  modules: CourseModule[];
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export type Database = {
  public: {
    Tables: {
      profiles: { Row: Profile; Insert: Omit<Profile, "id" | "created_at" | "updated_at">; Update: Partial<Omit<Profile, "id">> };
      tech_stack: { Row: TechStack; Insert: Omit<TechStack, "id" | "created_at" | "updated_at">; Update: Partial<Omit<TechStack, "id">> };
      services: { Row: Service; Insert: Omit<Service, "id" | "created_at" | "updated_at">; Update: Partial<Omit<Service, "id">> };
      projects: { Row: Project; Insert: Omit<Project, "id" | "created_at" | "updated_at">; Update: Partial<Omit<Project, "id">> };
      feedbacks: { Row: Feedback; Insert: Omit<Feedback, "id" | "created_at" | "updated_at">; Update: Partial<Omit<Feedback, "id">> };
      blog_posts: { Row: BlogPost; Insert: Omit<BlogPost, "id" | "created_at" | "updated_at">; Update: Partial<Omit<BlogPost, "id">> };
      announcements: { Row: Announcement; Insert: Omit<Announcement, "id" | "created_at" | "updated_at">; Update: Partial<Omit<Announcement, "id">> };
      courses: { Row: Course; Insert: Omit<Course, "id" | "created_at" | "updated_at">; Update: Partial<Omit<Course, "id">> };
    };
  };
};
