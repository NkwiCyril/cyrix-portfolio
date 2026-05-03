# Cyrix Portfolio — Project Context for Claude

## What This Is

A full-stack **developer portfolio + CMS** for a software engineer named Cyrix. It showcases work, services, and blog content, and includes a full admin panel for content management. Built with Next.js App Router.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 |
| Animation | Framer Motion 11 |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth + SSR |
| Rich Text | TinyMCE React |
| Icons | Lucide React |
| Utilities | clsx, tailwind-merge |

---

## Project Structure

```
cyrix-portfolio/
├── app/
│   ├── page.tsx                  # Homepage (Hero, Services preview, Portfolio, Blog, Testimonials)
│   ├── layout.tsx                # Root layout
│   ├── globals.css               # Global styles + custom fonts
│   ├── blog/                     # Blog listing + [slug] detail
│   ├── portfolio/                # Project listing + [slug] detail
│   ├── services/                 # Services listing + [slug] detail
│   ├── admin/                    # Admin panel (auth-protected)
│   │   ├── login/
│   │   ├── projects/
│   │   ├── services/
│   │   ├── blog-posts/
│   │   ├── announcements/
│   │   ├── courses/
│   │   ├── tech-stack/
│   │   └── feedbacks/
│   └── api/                      # API routes
│       ├── auth/                 # login, logout, verify-admin
│       ├── projects/
│       ├── blog-posts/
│       ├── services/
│       ├── feedbacks/
│       ├── tech-stack/
│       ├── courses/
│       ├── announcements/
│       ├── contact/
│       └── upload/
│
├── components/
│   ├── sections/                 # Homepage section components
│   │   ├── hero.tsx
│   │   ├── marquee.tsx
│   │   ├── services.tsx
│   │   ├── portfolio-preview.tsx
│   │   ├── blog.tsx
│   │   ├── testimonials.tsx
│   │   ├── trust-bar.tsx
│   │   └── cta.tsx
│   ├── admin/
│   │   ├── admin-sidebar.tsx
│   │   ├── admin-header.tsx
│   │   ├── delete-button.tsx
│   │   ├── image-upload.tsx
│   │   └── forms/               # One form component per content type
│   └── layout/
│       └── conditional-layout.tsx
│
├── utils/supabase/
│   ├── client.ts                 # Browser-side Supabase client
│   ├── server.ts                 # Server-side Supabase client
│   ├── admin.ts                  # Service-role client (admin ops)
│   ├── queries.ts                # Reusable DB query functions
│   └── middleware.ts             # Auth middleware helper
│
├── lib/
│   ├── utils.ts                  # General utilities (cn, etc.)
│   └── data.ts                   # Sample data + TypeScript interfaces
│
├── types/
│   └── database.ts               # TypeScript interfaces for all DB tables
│
├── middleware.ts                 # Next.js middleware — protects /admin/*
└── public/fonts/                 # Custom fonts: Helvena (body), Puertos (logo)
```

---

## Database Schema (Supabase / PostgreSQL)

All tables have RLS enabled. Public users can read published/active content; only admins can write.

| Table | Key Columns |
|---|---|
| `profiles` | id, email, name, role (admin/user) |
| `tech_stack` | id, name, icon_url, proficiency, category |
| `services` | id, title, slug, description, long_description, icon, features (JSONB), pricing_model, base_price, is_featured, display_order |
| `projects` | id, title, slug, description, long_description, category, year, client, live_url, repo_url, featured_image_url, images (JSONB), technologies (JSONB), features (JSONB), bg_color |
| `feedbacks` | id, client_name, feedback_text, rating (1–5), project_id (FK), image_url |
| `blog_posts` | id, title, slug, content, excerpt, featured_image_url, author, category, tags (JSONB), published_date, is_published, view_count |
| `announcements` | id, title, content, type, start_date, end_date, is_active |
| `courses` | id, title, slug, description, price, enrollment_link, modules (JSONB), is_published |

---

## Environment Variables

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY
SUPABASE_SERVICE_ROLE_KEY
```

---

## Key Architectural Patterns

- **Server Components by default** — listing/detail pages fetch data server-side with async components
- **Client Components** — used for forms, interactivity, and admin pages (`"use client"`)
- **ISR** — pages use `export const revalidate = 60` for fresh but cached data
- **Slug-based routing** — all content (projects, services, blog) uses slug dynamic routes
- **JSONB storage** — arrays (features, technologies, tags) stored as JSONB in PostgreSQL
- **Conditional Layout** — root layout renders admin-specific layout for `/admin/*` routes via `conditional-layout.tsx`
- **Service-role client** — admin API routes use `admin.ts` (service-role key) to bypass RLS

---

## Design System

**Colors:**
- Background: `#0a0a0a` / `#0f0f0f`
- Primary accent (public site): `#f76b34` (neon orange)
- Primary accent (admin): `#c8ff00` (neon lime/green)
- Text: white

**Fonts:**
- Body: Helvena (custom, weights 200–900)
- Logo: Puertos (custom)

**Animation:** Framer Motion for transitions and entrance effects.

---

## Admin Panel

Located at `/admin`. Protected by middleware — unauthenticated users are redirected to `/admin/login`.

The admin panel provides full CRUD for:
- Projects
- Services
- Blog Posts
- Announcements
- Courses
- Tech Stack
- Feedbacks/Testimonials

Authentication uses Supabase Auth with role-based access (`role = 'admin'` in `profiles` table).

---

## API Routes Summary

All routes under `/api/`:

| Route | Methods | Purpose |
|---|---|---|
| `/api/auth/login` | POST | Admin login |
| `/api/auth/logout` | GET | Logout |
| `/api/auth/verify-admin` | GET | Check admin role |
| `/api/projects` | GET, POST | List / create projects |
| `/api/projects/[id]` | GET, PUT, DELETE | Single project |
| `/api/blog-posts` | GET, POST | List / create posts |
| `/api/blog-posts/[id]` | GET, PUT, DELETE | Single post |
| `/api/services` | GET, POST | List / create services |
| `/api/services/[id]` | GET, PUT, DELETE | Single service |
| `/api/feedbacks` | GET, POST | List / create testimonials |
| `/api/tech-stack` | GET, POST | Tech stack management |
| `/api/announcements` | GET, POST | Announcements |
| `/api/courses` | GET, POST | Courses management |
| `/api/contact` | POST | Contact form submission |
| `/api/upload` | POST | File upload |

---

## Docs in Repo

- `SUPABASE_SETUP.md` — Full SQL schema and database setup guide
- `ADMIN_PANEL_GUIDE.md` — Admin panel feature overview and usage instructions
- `CONTACT_SETUP.md` — Contact form setup (placeholder, incomplete)
