# Improvement Proposals — Cyrix Portfolio

> Audit date: 2026-03-14
> Status: Pre-production review

This document outlines concrete improvements identified across security, performance, code quality, UX, SEO, and architecture. Issues are grouped by priority.

---

## Priority Levels

| Symbol | Meaning |
|---|---|
| 🔴 | Critical — address before any deployment |
| 🟠 | High — address this sprint |
| 🟡 | Medium — address next sprint |
| 🟢 | Low — backlog |

---

## 1. Security

### 🔴 Unprotected Write API Routes

**Files:** `app/api/projects/route.ts`, `app/api/blog-posts/route.ts`, `app/api/services/route.ts`, `app/api/feedbacks/route.ts`, and all corresponding `[id]/route.ts` files.

All `POST`, `PUT`, and `DELETE` routes use the `adminClient` (service-role key) without verifying the caller is an authenticated admin. Any unauthenticated user can modify or delete any content.

**Fix:** Add an auth check at the top of every write route before touching the database:

```typescript
const supabase = await createClient();
const { data: { user } } = await supabase.auth.getUser();
if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

const { data: profile } = await supabase
  .from("profiles").select("role").eq("id", user.id).single();
if (profile?.role !== "admin") return NextResponse.json({ error: "Forbidden" }, { status: 403 });
```

Extract this into a reusable `requireAdmin(request)` utility in `utils/supabase/auth.ts` to avoid repeating the same logic in every route.

---

### 🔴 Upload Endpoint Has No File Validation

**File:** `app/api/upload/route.ts`

- File type is inferred only from the filename extension — a client can rename `malware.exe` to `image.jpg` and upload it.
- No file size limit — a multi-gigabyte file would be accepted.
- No auth check — anyone can upload files to your Supabase storage bucket.

**Fix:**
- Whitelist accepted MIME types: `image/jpeg`, `image/png`, `image/webp`, `image/gif`.
- Enforce a max file size (e.g. 10 MB) before processing.
- Add the admin auth check described above.

---

### 🔴 Broken Middleware Logic for `/admin/login`

**File:** `middleware.ts`

The intent is to allow `/admin/login` without auth, but the early `return NextResponse.next()` for the login path is overridden by later logic that still calls `getUser()` and redirects unauthenticated users. The login page itself requires authentication to reach, creating a deadlock.

**Fix:**

```typescript
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Let the login page through unconditionally
  if (pathname === "/admin/login") return NextResponse.next();

  // Now check auth for all other /admin/* routes
  const supabase = await createMiddlewareClient(request);
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.redirect(new URL("/admin/login", request.url));

  return NextResponse.next();
}
```

---

### 🟠 No Rate Limiting on Public Endpoints

**Files:** `app/api/contact/route.ts`, `app/api/auth/login/route.ts`, `app/api/upload/route.ts`

There are no request rate limits. The contact form and login route are open to brute-force and spam.

**Fix:** Use an in-memory or Redis-based rate limiter (e.g. `@upstash/ratelimit` with Vercel KV) on at minimum the login and contact routes.

---

### 🟡 Unvalidated Pagination Parameters

**Files:** `app/api/blog-posts/route.ts`, `app/api/projects/route.ts` (lines 7–8)

`limit` and `offset` are parsed from query params with no bounds checking:

```typescript
const limit = parseInt(searchParams.get("limit") || "10");
const offset = parseInt(searchParams.get("offset") || "0");
```

Passing `limit=-1` or `offset=999999999` produces unexpected Supabase range queries.

**Fix:**

```typescript
const limit = Math.min(Math.max(parseInt(searchParams.get("limit") || "10"), 1), 100);
const offset = Math.max(parseInt(searchParams.get("offset") || "0"), 0);
```

---

### 🟡 Email HTML Template Allows XSS

**File:** `app/api/contact/route.ts` (commented email template section)

The commented template injects `message` directly into HTML with only a newline replacement. If wired up as-is, any HTML/JS in the message would be included raw.

**Fix:** HTML-escape all user-supplied values before interpolating into an HTML email template.

---

## 2. Performance

### 🟠 No Pagination on List Pages

**Files:** `app/blog/blog-page-client.tsx`, `app/portfolio/portfolio-page-client.tsx`

Blog and portfolio pages currently request up to 50 items in a single query and render all of them at once. As content grows this will cause slow page loads and high memory use.

**Fix:** Implement server-side pagination with `limit`/`offset` and add next/previous navigation controls, or implement infinite scroll with `IntersectionObserver`.

---

### 🟠 Images Not Optimized

**Files:** `components/sections/blog.tsx`, `components/sections/testimonials.tsx`, `app/portfolio/portfolio-page-client.tsx`

Several `<Image>` usages include `unoptimized` or are missing explicit `width`/`height`, causing layout shift (CLS) and disabling Next.js image optimization (auto WebP, responsive sizes).

**Fix:** Remove `unoptimized` prop. Provide explicit `width` and `height` for all images, or use `fill` with a positioned parent and the `sizes` prop set appropriately.

---

### 🟠 `next.config.ts` Is Empty

**File:** `next.config.ts`

The config has no settings at all. Key production-ready options are missing.

**Fix:**

```typescript
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "your-supabase-project.supabase.co" },
    ],
  },
  compress: true,
};
```

Also add `images.remotePatterns` to restrict which domains can serve images through the Next.js optimizer — this is also a security control.

---

### 🟡 Admin Dashboard Re-fetches All Counts on Every Load

**File:** `app/admin/page.tsx`

The dashboard runs 7 parallel count queries on every visit with no caching. Add `export const revalidate = 30` or cache the responses to reduce database round-trips.

---

## 3. SEO

### 🔴 No Dynamic Metadata on Detail Pages

**Files:** `app/blog/[slug]/page.tsx`, `app/portfolio/[slug]/page.tsx`, `app/services/[slug]/page.tsx`

None of the detail pages export a `generateMetadata` function. Every blog post, project, and service page inherits the generic root metadata title and description. Search engines and social sharing previews show no meaningful information about the specific content.

**Fix:** Add `generateMetadata` to each detail page:

```typescript
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} | Cyrix`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.featured_image_url ? [post.featured_image_url] : [],
    },
  };
}
```

---

### 🔴 No Sitemap

**Missing:** `app/sitemap.ts`

Without a sitemap, search engines have to discover `/blog/[slug]`, `/portfolio/[slug]`, and `/services/[slug]` pages through crawling alone, which can be slow and incomplete.

**Fix:** Create `app/sitemap.ts` that fetches all published slugs and returns them as a `MetadataRoute.Sitemap` array.

---

### 🟠 No `robots.txt`

**Missing:** `app/robots.ts`

Without this, search engines will crawl `/admin/*` pages. These should be explicitly disallowed.

**Fix:** Create `app/robots.ts`:

```typescript
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", disallow: "/admin" }],
    sitemap: "https://your-domain.com/sitemap.xml",
  };
}
```

---

### 🟠 Missing Open Graph Tags in Root Metadata

**File:** `app/layout.tsx`

Root metadata has no `openGraph` or `twitter` fields. Link previews on social platforms show minimal information and no image.

**Fix:** Add to the root `metadata` export:

```typescript
openGraph: {
  type: "website",
  url: "https://your-domain.com",
  siteName: "Cyrix",
  images: [{ url: "https://your-domain.com/og-image.jpg", width: 1200, height: 630 }],
},
twitter: {
  card: "summary_large_image",
  creator: "@yourhandle",
},
```

---

## 4. User Experience

### 🟠 Contact Form Is Non-Functional

**File:** `app/api/contact/route.ts`

The contact form accepts submissions, logs them to the server console, and returns a success response — but no email is ever sent. Users are told their message was sent when it was not.

**Fix:** Integrate an email service. Resend (`resend.com`) is the simplest option for Next.js and already commented in the file. Wire it up before the site goes live, or display a clear message on the form that submissions are currently disabled.

---

### 🟠 No Custom 404 Page

**Missing:** `app/not-found.tsx`

When a user navigates to a non-existent blog post or project URL, they see the generic Next.js 404 page with no site branding.

**Fix:** Create `app/not-found.tsx` with the site's design, a message, and a link back to the homepage.

---

### 🟡 No Empty States on Filtered Lists

**Files:** `app/blog/blog-page-client.tsx`, `app/portfolio/portfolio-page-client.tsx`

When a category filter returns no results, the page renders an empty grid with no message. Users may think the page is broken or still loading.

**Fix:** Render an explicit "No results found" message with a prompt to try a different filter when `filteredItems.length === 0`.

---

### 🟡 No Error Boundaries

**Files:** `app/blog/[slug]/page.tsx`, `app/portfolio/[slug]/page.tsx`, `app/services/[slug]/page.tsx`

These pages call `notFound()` for missing content but have no `error.tsx` sibling. If a database call fails at runtime (network error, Supabase downtime), the entire page crashes with an unbranded error screen.

**Fix:** Create `app/error.tsx` (and optionally `app/blog/error.tsx`, etc.) as error boundary components:

```typescript
"use client";
export default function Error({ reset }: { reset: () => void }) {
  return (
    <div>
      <h2>Something went wrong</h2>
      <button onClick={reset}>Try again</button>
    </div>
  );
}
```

---

### 🟡 Upload Has No Progress or Cancel

**File:** `components/admin/image-upload.tsx`

The upload component shows a generic "uploading..." indicator with no percentage or time estimate. For large images on slow connections, users have no way to know if the upload is progressing or frozen.

**Fix:** Use the `XMLHttpRequest` `progress` event or Supabase Storage's upload progress callback to display a percentage indicator.

---

## 5. Code Quality

### 🟡 Duplicated Admin Authentication Logic

**Files:** `app/api/auth/login/route.ts`, `app/api/auth/verify-admin/route.ts`, `app/admin/layout.tsx`

The same admin role-verification logic (fetch user, check `profiles.role`) appears in at least three places. Any change to the auth pattern must be made in all three.

**Fix:** Extract into `utils/supabase/auth.ts`:

```typescript
export async function requireAdmin(request?: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  const { data } = await supabase.from("profiles").select("role").eq("id", user.id).single();
  return data?.role === "admin" ? user : null;
}
```

---

### 🟡 Duplicated Form Boilerplate in Admin Forms

**Files:** All files in `components/admin/forms/`

Every form component repeats the same pattern: `useRouter`, `useState` for loading/error, a `handleSubmit` that decides between POST and PUT, and error rendering. This is copy-pasted across 6+ form files.

**Fix:** Extract a `useAdminForm` hook that accepts a config object (endpoint, method, onSuccess) and returns `{ loading, error, handleSubmit }`.

---

### 🟡 Inconsistent HTTP Status Codes in API Routes

**Files:** Multiple files in `app/api/`

Errors return `status: 400` regardless of the actual cause. A "not found" record returns 400 instead of 404. A server-side database error returns 400 instead of 500.

**Fix:** Map error codes to appropriate HTTP statuses:

```typescript
if (error.code === "PGRST116") return NextResponse.json({ error: "Not found" }, { status: 404 });
if (error.code?.startsWith("23")) return NextResponse.json({ error: "Conflict" }, { status: 409 });
return NextResponse.json({ error: error.message }, { status: 500 });
```

---

### 🟡 `catch (err: any)` in Form Components

**Files:** `components/admin/forms/blog-post-form.tsx`, others

Using `any` type on caught errors bypasses TypeScript's type safety and accessing `.message` on an unknown error type can throw at runtime.

**Fix:**

```typescript
catch (err) {
  const message = err instanceof Error ? err.message : "An unexpected error occurred";
  setError(message);
}
```

---

## 6. Architecture

### 🟡 No Transaction Handling for Upload + Insert

**Files:** `app/api/upload/route.ts` combined with any form submission

If a user uploads an image successfully but the subsequent database insert fails, the uploaded file remains in Supabase Storage with no reference — wasting storage and accumulating orphaned files over time.

**Fix:** Either:
- Upload the file only after the database record is created (store URL after confirming insert).
- Run a periodic cleanup job that removes unreferenced storage objects.

---

### 🟡 Courses Feature Is Built But Unexposed

**Affected:** `app/api/courses/route.ts`, database `courses` table, `components/admin/forms/` (course form)

The backend and admin form for courses exist but there is no public-facing `/courses` page. The feature is effectively dead code from a user perspective.

**Fix:** Either build the public courses page to complete the feature, or remove the backend and admin components until the feature is ready to ship.

---

### 🟢 Announcements Have No Frontend Display

The `announcements` table has `is_active`, `start_date`, and `end_date` fields suggesting a banner or notification system, but no frontend component displays announcements anywhere on the site.

**Fix:** Add an announcement banner component to the root layout that fetches and renders the currently active announcement (if any).

---

### 🟢 No Soft Deletes or Audit Trail

All deletions are permanent with no recovery path. If content is accidentally deleted, it is unrecoverable.

**Fix:** Add a `deleted_at TIMESTAMPTZ` column to key tables (`projects`, `blog_posts`, `services`). Filter `WHERE deleted_at IS NULL` in read queries. Provide a restore option in the admin panel.

---

### 🟢 No Database Indexes on Slug Columns

Queries like `WHERE slug = $1` on `blog_posts`, `projects`, and `services` run without an index. With small data this is unnoticeable, but it will degrade as content grows.

**Fix:** Add indexes in your Supabase SQL editor:

```sql
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_projects_slug ON projects(slug);
CREATE INDEX idx_services_slug ON services(slug);
```

---

## Summary Table

| # | Issue | Priority | Category |
|---|---|---|---|
| 1 | Write API routes have no auth check | 🔴 | Security |
| 2 | Upload route has no file validation or auth | 🔴 | Security |
| 3 | Middleware deadlocks `/admin/login` | 🔴 | Security |
| 4 | No dynamic metadata on detail pages | 🔴 | SEO |
| 5 | No sitemap | 🔴 | SEO |
| 6 | Contact form doesn't send emails | 🟠 | UX |
| 7 | No custom 404 page | 🟠 | UX |
| 8 | No pagination on blog/portfolio lists | 🟠 | Performance |
| 9 | Images not optimized (unoptimized prop) | 🟠 | Performance |
| 10 | `next.config.ts` is empty | 🟠 | Performance |
| 11 | No `robots.txt` | 🟠 | SEO |
| 12 | Missing Open Graph tags in root metadata | 🟠 | SEO |
| 13 | No rate limiting on public endpoints | 🟠 | Security |
| 14 | No empty states on filtered lists | 🟡 | UX |
| 15 | No error boundaries on detail pages | 🟡 | UX |
| 16 | Duplicated admin auth logic | 🟡 | Code Quality |
| 17 | Duplicated form boilerplate | 🟡 | Code Quality |
| 18 | Inconsistent HTTP status codes | 🟡 | Code Quality |
| 19 | `catch (err: any)` pattern | 🟡 | Code Quality |
| 20 | No upload progress indicator | 🟡 | UX |
| 21 | Unvalidated pagination params | 🟡 | Security |
| 22 | No transaction on upload + DB insert | 🟡 | Architecture |
| 23 | Courses feature is orphaned | 🟡 | Architecture |
| 24 | Announcements have no display | 🟢 | Architecture |
| 25 | No soft deletes | 🟢 | Architecture |
| 26 | No indexes on slug columns | 🟢 | Performance |
