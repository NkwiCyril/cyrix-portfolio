# Supabase Setup Guide

This guide will help you set up Supabase as the PostgreSQL database for your Cyrix portfolio application.

## 📋 Prerequisites

- Supabase account (sign up at [supabase.com](https://supabase.com))
- Node.js and npm installed
- Basic understanding of SQL

## 🚀 Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click **"New Project"**
3. Fill in the details:
   - **Project Name**: `cyrix-portfolio`
   - **Database Password**: Create a strong password (save it securely!)
   - **Region**: Choose the closest to your users (e.g., `eu-west-1` for Europe, `us-east-1` for USA)
4. Click **"Create new project"**
5. Wait 5-10 minutes for the project to initialize

## 🔑 Step 2: Get Your API Keys

Once your project is ready:

1. Go to **Settings** → **API** in your Supabase dashboard
2. Copy the following values:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon public** key (starts with `eyJhbGc...`)
   - **service_role secret** key (starts with `eyJhbGc...`)

## 🔧 Step 3: Configure Environment Variables

1. Create a `.env.local` file in your project root:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=eyJhbGc...your_anon_key
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...your_service_role_key
```

2. Replace the placeholder values with your actual keys from Step 2

⚠️ **Important**: Never commit `.env.local` to version control! It's already in `.gitignore`.

## 🗄️ Step 4: Create Database Schema

Go to **SQL Editor** in your Supabase dashboard and run the following SQL queries:

### 4.1 Profiles Table

```sql
CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('admin', 'user')),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own data" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Admins can read all profiles" ON profiles
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
    )
  );
```

### 4.2 Tech Stack Table

```sql
CREATE TABLE tech_stack (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  icon_url TEXT,
  proficiency TEXT NOT NULL DEFAULT 'intermediate' CHECK (proficiency IN ('beginner', 'intermediate', 'expert')),
  category TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

ALTER TABLE tech_stack ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read tech_stack" ON tech_stack
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage tech_stack" ON tech_stack
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
    )
  );
```

### 4.3 Services Table

```sql
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  long_description TEXT,
  icon TEXT,
  features JSONB DEFAULT '[]',
  pricing_model TEXT,
  base_price DECIMAL(10, 2),
  is_featured BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

ALTER TABLE services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read services" ON services
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage services" ON services
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
    )
  );
```

### 4.4 Projects Table

```sql
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  long_description TEXT,
  category TEXT,
  year INTEGER,
  client TEXT,
  live_url TEXT,
  repo_url TEXT,
  featured_image_url TEXT,
  images JSONB DEFAULT '[]',
  technologies JSONB DEFAULT '[]',
  features JSONB DEFAULT '[]',
  bg_color TEXT DEFAULT 'bg-gray-900',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read projects" ON projects
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage projects" ON projects
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
    )
  );
```

### 4.5 Feedbacks Table

```sql
CREATE TABLE feedbacks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name TEXT NOT NULL,
  feedback_text TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
  image_url TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

ALTER TABLE feedbacks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read feedbacks" ON feedbacks
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage feedbacks" ON feedbacks
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
    )
  );
```

### 4.5 Blog Posts Table

```sql
CREATE TABLE blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  featured_image_url TEXT,
  author TEXT DEFAULT 'Cyrix',
  category TEXT,
  tags JSONB DEFAULT '[]',
  published_date TIMESTAMP,
  is_published BOOLEAN DEFAULT false,
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read published blog posts" ON blog_posts
  FOR SELECT USING (is_published = true);

CREATE POLICY "Admins can read all blog posts" ON blog_posts
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admins can manage blog posts" ON blog_posts
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
    )
  );
```

### 4.7 Announcements Table

```sql
CREATE TABLE announcements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('mentorship', 'general', 'update')),
  start_date TIMESTAMP,
  end_date TIMESTAMP,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read active announcements" ON announcements
  FOR SELECT USING (is_active = true);

CREATE POLICY "Admins can read all announcements" ON announcements
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admins can manage announcements" ON announcements
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
    )
  );
```

### 4.8 Courses Table

```sql
CREATE TABLE courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  price DECIMAL(10, 2),
  enrollment_link TEXT,
  modules JSONB DEFAULT '[]',
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

ALTER TABLE courses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read published courses" ON courses
  FOR SELECT USING (is_published = true);

CREATE POLICY "Admins can read all courses" ON courses
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admins can manage courses" ON courses
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
    )
  );
```

## 📦 Step 5: Set Up Storage Buckets (Optional)

For file uploads (images, videos, course materials):

1. Go to **Storage** in your Supabase dashboard
2. Click **"New bucket"**
3. Create these buckets:
   - **media** (Public) - for project images, blog images, etc.
   - **courses** (Private) - for course materials
   - **admin-uploads** (Private) - for admin panel uploads

## ✅ Step 6: Verify Setup

Test your connection by running this in your browser console or creating a test page:

```typescript
import { createClient } from '@/utils/supabase/client'

const supabase = createClient()

// Test connection
const { data, error } = await supabase.from('projects').select('*').limit(1)
console.log('Connection test:', { data, error })
```

If you see `data: []` and `error: null`, you're connected! 🎉

## 🔐 Step 7: Create Admin User

1. Go to **Authentication** → **Users** in Supabase dashboard
2. Click **"Add user"** → **"Create new user"**
3. Enter your email and password
4. After creating, copy the user's UUID
5. Go to **SQL Editor** and run:

```sql
INSERT INTO profiles (id, email, name, role)
VALUES ('your-user-uuid-here', 'your-email@example.com', 'Your Name', 'admin');
```

## 📚 What's Next?

Your Supabase database is now ready! You can:

1. ✅ Use the API routes in `app/api/` to interact with the database
2. ✅ Use helper functions in `utils/supabase/queries.ts` for common operations
3. ✅ Build the custom admin panel to manage content
4. ✅ Fetch data in your pages using Server Components

## 🛠️ Useful Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Run linter
npm run lint
```

## 📖 Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Next.js + Supabase Guide](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)

## 🆘 Troubleshooting

**Issue**: "Missing environment variables" error
- **Solution**: Make sure `.env.local` exists and has all required variables

**Issue**: "relation does not exist" error
- **Solution**: Run all SQL queries in Step 4 to create the tables

**Issue**: "permission denied" error
- **Solution**: Check Row Level Security policies and ensure you're authenticated as admin

---

Need help? Check the [Supabase Discord](https://discord.supabase.com) or documentation!
