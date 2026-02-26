# Admin Panel Guide

Complete guide for the Cyrix Portfolio custom admin panel built with Next.js 16 and Supabase.

## 🚀 Features

- **Authentication**: Secure login with Supabase Auth
- **Dashboard**: Overview statistics for all content types
- **Full CRUD Operations** for:
  - Projects
  - Services
  - Blog Posts
  - Announcements
  - Courses
  - Tech Stack
  - Feedbacks

## 📁 Structure

```
app/admin/
├── layout.tsx                 # Admin layout with auth protection
├── login/page.tsx            # Login page
├── page.tsx                  # Dashboard
├── projects/                 # Projects CRUD
├── services/                 # Services CRUD
├── blog-posts/              # Blog Posts CRUD
├── announcements/           # Announcements CRUD
├── courses/                 # Courses CRUD
├── tech-stack/              # Tech Stack CRUD
└── feedbacks/               # Feedbacks CRUD

components/admin/
├── admin-sidebar.tsx        # Navigation sidebar
├── admin-header.tsx         # Header with user info
├── delete-button.tsx        # Reusable delete component
└── forms/                   # Form components for each model
    ├── project-form.tsx
    ├── service-form.tsx
    ├── blog-post-form.tsx
    └── ...

app/api/auth/
├── login/route.ts           # Login API
└── logout/route.ts          # Logout API
```

## 🔐 Access Control

The admin panel is protected at multiple levels:

1. **Layout Level**: Checks if user is authenticated and has admin role
2. **API Level**: All API routes verify admin permissions
3. **Database Level**: Row Level Security policies in Supabase

## 🎨 Design

- Dark theme with neon lime accent (`#c8ff00`)
- Consistent with main website design
- Responsive layout
- Clean, modern UI

## 📝 Usage

### 1. Login

Navigate to `/admin/login` and sign in with your admin credentials.

### 2. Dashboard

View overview statistics and quick actions for all content types.

### 3. Managing Content

Each section (Projects, Services, etc.) has:
- **List View**: Table with all items
- **Create**: Form to add new items
- **Edit**: Form to update existing items
- **Delete**: Confirmation dialog before deletion

### 4. Form Features

- **Auto-slug generation**: Automatically creates URL-friendly slugs
- **Array fields**: Add/remove items for arrays (tags, features, etc.)
- **Rich text**: Large text areas for content
- **Validation**: Required fields and proper data types
- **Error handling**: Clear error messages

## 🔧 Customization

### Adding New Fields

1. Update the database schema in Supabase
2. Update TypeScript types in `types/database.ts`
3. Update the form component
4. Update API routes if needed

### Styling

All components use Tailwind CSS classes. Main colors:
- Background: `#0a0a0a`, `#0f0f0f`
- Accent: `#c8ff00` (lime green)
- Text: White, gray shades

## 🚨 Important Notes

- Always test changes in development before deploying
- Keep environment variables secure
- Regular backups of Supabase database
- Monitor API usage and performance

## 📚 Next Steps

1. Set up your Supabase project (see `SUPABASE_SETUP.md`)
2. Create admin user in Supabase
3. Configure environment variables
4. Test all CRUD operations
5. Deploy to production
