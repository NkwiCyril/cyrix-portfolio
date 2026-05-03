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

## � Services Data Reference

Use this data to populate the **Services** section via the admin panel.

---

### Service 1: Web Development

- **Title**: Web Development
- **Slug**: web-development
- **Description**: Full-stack web applications built with Laravel, Next.js — optimized for performance and scalability.
- **Long Description**: I build robust, high-performance web applications from the ground up. Whether it's a marketing site, a SaaS platform, or an e-commerce store, I leverage modern frameworks like Next.js and Laravel to deliver fast, scalable, and SEO-friendly solutions. Every project is built with clean architecture, responsive design, and best practices baked in from day one.
- **Features**:
  - Custom full-stack web applications
  - Server-side rendering & static generation with Next.js
  - Laravel backend with REST APIs
  - Database design & optimization
  - Performance audits & optimization
  - SEO-friendly architecture

---

### Service 2: UI/UX Design

- **Title**: UI/UX Design
- **Slug**: ui-ux-design
- **Description**: Clean, intuitive interfaces designed with user experience at the core. From wireframes to pixel-perfect implementations.
- **Long Description**: Great software starts with great design. I create user interfaces that are not just beautiful, but intuitive and functional. From initial research and wireframing through high-fidelity prototypes, every design decision is informed by user needs and business goals. I deliver pixel-perfect implementations that look stunning on every device.
- **Features**:
  - User research & persona development
  - Wireframing & prototyping in Figma
  - High-fidelity UI design
  - Design system creation
  - Responsive & adaptive layouts
  - Accessibility-first approach

---

### Service 3: Mobile Development

- **Title**: Mobile Development
- **Slug**: mobile-development
- **Description**: Cross-platform mobile applications using Ionic/Capacitor & React Native that deliver native-like experiences on iOS and Android.
- **Long Description**: I build cross-platform mobile applications that feel native on both iOS and Android. Using Ionic/Capacitor and React Native, I deliver performant apps with smooth animations, offline support, and seamless platform integration — all from a single codebase to maximise efficiency and reduce time to market.
- **Features**:
  - Cross-platform iOS & Android apps
  - Ionic/Capacitor development
  - React Native development
  - Push notifications & deep linking
  - Offline-first architecture
  - App Store & Play Store deployment

---

### Service 4: AI Integration

- **Title**: AI Integration
- **Slug**: ai-integration
- **Description**: AI-powered features — from chatbots and content generation to intelligent automation and machine learning.
- **Long Description**: I help businesses harness the power of artificial intelligence. From integrating LLMs and building intelligent chatbots to creating automated workflows and recommendation engines, I bring AI capabilities into your existing products or build new AI-first solutions that give you a competitive edge.
- **Features**:
  - LLM integration (OpenAI, Claude, etc.)
  - Custom chatbot development
  - AI-powered content generation
  - Intelligent automation workflows
  - Data analysis & insights
  - Machine learning model integration

---

### Service 5: API & Backend

- **Title**: API & Backend
- **Slug**: api-backend
- **Description**: Robust backend systems, RESTful APIs, and database architectures using Laravel, and PostgreSQL.
- **Long Description**: The backbone of every great application is a solid backend. I design and build scalable API architectures, efficient database schemas, and secure authentication systems. Whether you need a new backend from scratch or want to refactor an existing one, I deliver clean, well-documented, and maintainable server-side solutions.
- **Features**:
  - RESTful & GraphQL API design
  - Laravel backend development
  - Database architecture (PostgreSQL, MySQL)
  - Authentication & authorization systems
  - Third-party API integrations
  - Server deployment & DevOps

---

### Service 6: Content Creation

- **Title**: Content Creation
- **Slug**: content-creation
- **Description**: Tech-focused content — tutorials, reviews, and insights on software development, tools, and AI.
- **Long Description**: Beyond code, I create engaging tech content that educates and inspires. From in-depth tutorials and tool reviews to insights on emerging technologies and AI, I produce content that resonates with developers and tech enthusiasts. Whether it's written articles, video content, or social media, I help brands build authority in the tech space.
- **Features**:
  - Technical blog writing
  - Video tutorials & walkthroughs
  - Software & tool reviews
  - Social media content strategy
  - Developer documentation
  - Tech newsletter curation

---

## �📚 Next Steps

1. Set up your Supabase project (see `SUPABASE_SETUP.md`)
2. Create admin user in Supabase
3. Configure environment variables
4. Test all CRUD operations
5. Deploy to production
