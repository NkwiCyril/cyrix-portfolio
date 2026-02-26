import {
  Globe,
  Palette,
  Smartphone,
  Brain,
  Server,
  Video,
  type LucideIcon,
} from "lucide-react";

// ── Services ──────────────────────────────────────────────────────────────────

export interface Service {
  number: string;
  title: string;
  slug: string;
  description: string;
  icon: LucideIcon;
  longDescription: string;
  features: string[];
}

export const services: Service[] = [
  {
    number: "01",
    title: "Web Development",
    slug: "web-development",
    description:
      "Full-stack web applications built with Laravel, Next.js — optimized for performance and scalability.",
    icon: Globe,
    longDescription:
      "I build robust, high-performance web applications from the ground up. Whether it's a marketing site, a SaaS platform, or an e-commerce store, I leverage modern frameworks like Next.js and Laravel to deliver fast, scalable, and SEO-friendly solutions. Every project is built with clean architecture, responsive design, and best practices baked in from day one.",
    features: [
      "Custom full-stack web applications",
      "Server-side rendering & static generation with Next.js",
      "Laravel backend with REST APIs",
      "Database design & optimization",
      "Performance audits & optimization",
      "SEO-friendly architecture",
    ],
  },
  {
    number: "02",
    title: "UI/UX Design",
    slug: "ui-ux-design",
    description:
      "Clean, intuitive interfaces designed with user experience at the core. From wireframes to pixel-perfect implementations.",
    icon: Palette,
    longDescription:
      "Great software starts with great design. I create user interfaces that are not just beautiful, but intuitive and functional. From initial research and wireframing through high-fidelity prototypes, every design decision is informed by user needs and business goals. I deliver pixel-perfect implementations that look stunning on every device.",
    features: [
      "User research & persona development",
      "Wireframing & prototyping in Figma",
      "High-fidelity UI design",
      "Design system creation",
      "Responsive & adaptive layouts",
      "Accessibility-first approach",
    ],
  },
  {
    number: "03",
    title: "Mobile Development",
    slug: "mobile-development",
    description:
      "Cross-platform mobile applications using Ionic/Capacitor & React Native that deliver native-like experiences on iOS and Android.",
    icon: Smartphone,
    longDescription:
      "I build cross-platform mobile applications that feel native on both iOS and Android. Using Ionic/Capacitor and React Native, I deliver performant apps with smooth animations, offline support, and seamless platform integration — all from a single codebase to maximise efficiency and reduce time to market.",
    features: [
      "Cross-platform iOS & Android apps",
      "Ionic/Capacitor development",
      "React Native development",
      "Push notifications & deep linking",
      "Offline-first architecture",
      "App Store & Play Store deployment",
    ],
  },
  {
    number: "04",
    title: "AI Integration",
    slug: "ai-integration",
    description:
      "AI-powered features — from chatbots and content generation to intelligent automation and machine learning.",
    icon: Brain,
    longDescription:
      "I help businesses harness the power of artificial intelligence. From integrating LLMs and building intelligent chatbots to creating automated workflows and recommendation engines, I bring AI capabilities into your existing products or build new AI-first solutions that give you a competitive edge.",
    features: [
      "LLM integration (OpenAI, Claude, etc.)",
      "Custom chatbot development",
      "AI-powered content generation",
      "Intelligent automation workflows",
      "Data analysis & insights",
      "Machine learning model integration",
    ],
  },
  {
    number: "05",
    title: "API & Backend",
    slug: "api-backend",
    description:
      "Robust backend systems, RESTful APIs, and database architectures using Laravel, and PostgreSQL.",
    icon: Server,
    longDescription:
      "The backbone of every great application is a solid backend. I design and build scalable API architectures, efficient database schemas, and secure authentication systems. Whether you need a new backend from scratch or want to refactor an existing one, I deliver clean, well-documented, and maintainable server-side solutions.",
    features: [
      "RESTful & GraphQL API design",
      "Laravel backend development",
      "Database architecture (PostgreSQL, MySQL)",
      "Authentication & authorization systems",
      "Third-party API integrations",
      "Server deployment & DevOps",
    ],
  },
  {
    number: "06",
    title: "Content Creation",
    slug: "content-creation",
    description:
      "Tech-focused content — tutorials, reviews, and insights on software development, tools, and AI.",
    icon: Video,
    longDescription:
      "Beyond code, I create engaging tech content that educates and inspires. From in-depth tutorials and tool reviews to insights on emerging technologies and AI, I produce content that resonates with developers and tech enthusiasts. Whether it's written articles, video content, or social media, I help brands build authority in the tech space.",
    features: [
      "Technical blog writing",
      "Video tutorials & walkthroughs",
      "Software & tool reviews",
      "Social media content strategy",
      "Developer documentation",
      "Tech newsletter curation",
    ],
  },
];

// ── Blog Posts ─────────────────────────────────────────────────────────────────

export interface BlogPost {
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  content: string;
  author: string;
}

export const blogPosts: BlogPost[] = [
  {
    title: "Building Scalable Web Applications with Next.js 16",
    slug: "building-scalable-web-apps-nextjs-16",
    excerpt:
      "Learn how to leverage the latest features in Next.js 16 to build performant and scalable web applications.",
    category: "Web Development",
    date: "Feb 20, 2026",
    readTime: "8 min read",
    author: "Cyrix",
    content: `Next.js 16 introduces a host of powerful features that make building scalable web applications easier than ever. In this article, we'll explore the key improvements and how to leverage them in your projects.

## The New App Router

The App Router has been refined with better caching strategies, improved error handling, and more intuitive data fetching patterns. Server Components are now the default, which means better performance out of the box.

## Improved Performance

With React 19 under the hood, Next.js 16 delivers significant performance improvements. The new compiler optimizes your bundle size automatically, and streaming SSR ensures users see content faster.

## Key Takeaways

- Server Components reduce client-side JavaScript by up to 40%
- The new caching layer provides fine-grained control over data freshness
- Middleware has been optimized for edge deployment
- Image optimization now supports AVIF format natively

Building for scale isn't just about the framework — it's about architecture decisions, database design, and deployment strategy. But having a solid foundation like Next.js 16 makes the journey significantly smoother.`,
  },
  {
    title: "The Future of AI in Software Development",
    slug: "future-ai-software-development",
    excerpt:
      "Exploring how artificial intelligence is transforming the way we write code and build software products.",
    category: "AI & Tech",
    date: "Feb 15, 2026",
    readTime: "6 min read",
    author: "Cyrix",
    content: `Artificial intelligence is no longer a futuristic concept — it's actively reshaping how we build software today. From code completion to entire application generation, AI is becoming an indispensable tool in the developer's toolkit.

## AI-Powered Development Tools

Tools like GitHub Copilot, Cursor, and Claude have fundamentally changed the coding experience. They don't just autocomplete code — they understand context, suggest architectural patterns, and help debug complex issues.

## The Shift in Developer Roles

As AI handles more of the routine coding tasks, developers are shifting toward higher-level thinking: system design, user experience, and business logic. The most valuable skill is no longer typing speed — it's the ability to articulate what needs to be built.

## What This Means for the Industry

- Junior developers can be productive faster with AI assistance
- Code review becomes more important as AI-generated code needs human oversight
- Testing and validation are more critical than ever
- The demand for developers who can integrate AI into products is skyrocketing

The future isn't about AI replacing developers — it's about developers who use AI replacing those who don't.`,
  },
  {
    title: "Mastering TypeScript: Advanced Patterns",
    slug: "mastering-typescript-advanced-patterns",
    excerpt:
      "Deep dive into advanced TypeScript patterns that will make your code more maintainable and type-safe.",
    category: "Programming",
    date: "Feb 10, 2026",
    readTime: "10 min read",
    author: "Cyrix",
    content: `TypeScript has become the standard for building large-scale JavaScript applications. But beyond basic types and interfaces, there are powerful patterns that can transform how you write code.

## Discriminated Unions

One of TypeScript's most powerful features is discriminated unions. They allow you to model complex state machines with compile-time safety.

## Template Literal Types

Template literal types let you create string types that follow specific patterns. This is incredibly useful for API route definitions, CSS class names, and event handlers.

## Conditional Types

Conditional types enable you to create types that adapt based on their inputs. Combined with generics, they allow you to build flexible and type-safe utility functions.

## Key Patterns to Master

- Use branded types for domain primitives (UserId, Email, etc.)
- Leverage satisfies operator for type-safe configuration objects
- Apply the builder pattern with method chaining for complex object construction
- Use type predicates for runtime type narrowing

TypeScript isn't just about catching bugs — it's about encoding your domain knowledge into the type system so the compiler can help you maintain consistency across your entire codebase.`,
  },
  {
    title: "Designing for Dark Mode: Best Practices",
    slug: "designing-for-dark-mode",
    excerpt:
      "A comprehensive guide to implementing dark mode that's both beautiful and accessible.",
    category: "Design",
    date: "Feb 5, 2026",
    readTime: "7 min read",
    author: "Cyrix",
    content: `Dark mode has evolved from a trendy feature to an expected standard. But implementing it well requires more thought than simply inverting colors. Here's how to do it right.

## Color Theory for Dark Mode

Pure black backgrounds (#000) can cause eye strain. Instead, use dark grays (#0a0a0a to #1a1a1a) that are easier on the eyes. For accent colors, slightly desaturate them to reduce visual vibration against dark backgrounds.

## Typography Considerations

White text on dark backgrounds appears bolder than black text on white. Consider using a slightly lighter font weight or reducing opacity to maintain the same visual weight.

## Contrast and Accessibility

WCAG guidelines require a minimum contrast ratio of 4.5:1 for normal text. In dark mode, it's tempting to use bright white text, but this can cause halation. Aim for an off-white (#e0e0e0 to #f0f0f0) for body text.

## Implementation Strategy

- Use CSS custom properties for theme tokens
- Support system preference with prefers-color-scheme
- Allow manual override with localStorage persistence
- Test with real users in different lighting conditions

Good dark mode design is invisible — users should feel comfortable without thinking about the theme.`,
  },
  {
    title: "Laravel + Next.js: The Perfect Full-Stack Combo",
    slug: "laravel-nextjs-fullstack",
    excerpt:
      "How to combine Laravel's backend power with Next.js frontend capabilities for production applications.",
    category: "Web Development",
    date: "Jan 28, 2026",
    readTime: "9 min read",
    author: "Cyrix",
    content: `Laravel and Next.js might seem like an unusual pairing, but together they form one of the most productive full-stack combinations available. Here's how to make them work together seamlessly.

## Why This Stack?

Laravel provides an incredibly mature backend with Eloquent ORM, robust authentication, queue systems, and a rich ecosystem. Next.js brings server-side rendering, static generation, and a fantastic developer experience. Together, they cover every aspect of modern web development.

## Architecture Patterns

The most common approach is using Laravel as a headless API backend with Next.js consuming it on the frontend. Laravel Sanctum handles authentication, while Next.js middleware manages route protection on the client side.

## Deployment Considerations

- Deploy Laravel on a VPS or Laravel Forge
- Deploy Next.js on Vercel or a Node.js server
- Use a shared database accessible from both
- Implement proper CORS configuration

## Key Benefits

- Type-safe API contracts with shared TypeScript types
- Laravel's powerful ORM for complex data relationships
- Next.js ISR for content that rarely changes
- Separate scaling for frontend and backend

This stack gives you the best of both worlds: PHP's battle-tested backend ecosystem and React's cutting-edge frontend capabilities.`,
  },
  {
    title: "Building Your Personal Brand as a Developer",
    slug: "building-personal-brand-developer",
    excerpt:
      "Strategies for establishing a strong personal brand that opens doors to opportunities in tech.",
    category: "Career",
    date: "Jan 20, 2026",
    readTime: "5 min read",
    author: "Cyrix",
    content: `In today's competitive tech landscape, your skills alone aren't enough. A strong personal brand can be the difference between being overlooked and being sought after. Here's how to build one.

## Start with Content

The most effective way to build a brand is to share what you know. Start a blog, create tutorials, or share insights on social media. Consistency matters more than perfection — publish regularly and improve over time.

## Choose Your Platform

You don't need to be everywhere. Pick one or two platforms where your target audience hangs out and go deep. For developers, Twitter/X, LinkedIn, and YouTube are the most effective.

## Build in Public

Share your journey — the wins and the struggles. People connect with authenticity. Document your projects, share your learning process, and be transparent about challenges you face.

## Key Strategies

- Define your niche (don't try to be everything to everyone)
- Create a personal website that showcases your work
- Engage with your community by commenting and collaborating
- Speak at meetups or conferences
- Contribute to open source projects

Your personal brand is your professional reputation at scale. Invest in it consistently, and it will pay dividends throughout your career.`,
  },
];

export const blogCategories = [
  { name: "All", count: blogPosts.length },
  {
    name: "Web Development",
    count: blogPosts.filter((p) => p.category === "Web Development").length,
  },
  {
    name: "AI & Tech",
    count: blogPosts.filter((p) => p.category === "AI & Tech").length,
  },
  {
    name: "Programming",
    count: blogPosts.filter((p) => p.category === "Programming").length,
  },
  {
    name: "Design",
    count: blogPosts.filter((p) => p.category === "Design").length,
  },
  {
    name: "Career",
    count: blogPosts.filter((p) => p.category === "Career").length,
  },
];

// ── Projects ──────────────────────────────────────────────────────────────────

export interface Project {
  title: string;
  slug: string;
  category: string;
  bg: string;
  description: string;
  longDescription: string;
  technologies: string[];
  features: string[];
  year: string;
  client: string;
}

export const projects: Project[] = [
  {
    title: "E-Commerce Platform",
    slug: "e-commerce-platform",
    category: "Branding",
    bg: "bg-gray-900",
    description:
      "A full-featured e-commerce platform with real-time inventory, payment processing, and an admin dashboard.",
    longDescription:
      "Built a comprehensive e-commerce solution from the ground up, featuring a modern storefront with advanced filtering, real-time inventory management, Stripe payment integration, and a powerful admin dashboard for managing products, orders, and customers. The platform handles thousands of daily transactions with 99.9% uptime.",
    technologies: ["Next.js", "Laravel", "PostgreSQL", "Stripe", "Tailwind CSS", "Redis"],
    features: [
      "Real-time inventory management",
      "Stripe payment integration",
      "Admin dashboard with analytics",
      "Advanced product filtering & search",
      "Order tracking & notifications",
      "Multi-currency support",
    ],
    year: "2025",
    client: "RetailFlow Inc.",
  },
  {
    title: "SaaS Dashboard",
    slug: "saas-dashboard",
    category: "Web Application",
    bg: "bg-gray-800",
    description:
      "An analytics dashboard for a SaaS product with real-time data visualization and team collaboration features.",
    longDescription:
      "Designed and developed a comprehensive analytics dashboard for a growing SaaS company. The platform features real-time data visualization with interactive charts, team collaboration tools, automated reporting, and a role-based access control system. Built for performance with efficient data querying and optimistic UI updates.",
    technologies: ["React", "TypeScript", "Node.js", "PostgreSQL", "D3.js", "Tailwind CSS"],
    features: [
      "Real-time data visualization",
      "Interactive charts & graphs",
      "Team collaboration workspace",
      "Automated report generation",
      "Role-based access control",
      "Custom dashboard builder",
    ],
    year: "2025",
    client: "DataSync Co.",
  },
  {
    title: "Mobile Fitness App",
    slug: "mobile-fitness-app",
    category: "Mobile App",
    bg: "bg-gray-700",
    description:
      "A cross-platform fitness app with workout tracking, meal planning, and social features.",
    longDescription:
      "Created a cross-platform fitness application that helps users track workouts, plan meals, and connect with a community of fitness enthusiasts. The app features AI-powered workout recommendations, progress tracking with detailed analytics, and social features including challenges and leaderboards. Available on both iOS and Android from a single codebase.",
    technologies: ["React Native", "TypeScript", "Node.js", "MongoDB", "Firebase"],
    features: [
      "AI-powered workout recommendations",
      "Detailed progress analytics",
      "Meal planning & nutrition tracking",
      "Social features & challenges",
      "Offline workout support",
      "Integration with wearable devices",
    ],
    year: "2024",
    client: "FitLife Labs",
  },
  {
    title: "AI Content Platform",
    slug: "ai-content-platform",
    category: "AI / SaaS",
    bg: "bg-gray-900",
    description:
      "An AI-powered content generation platform for marketing teams with brand voice customization.",
    longDescription:
      "Built an AI-powered content platform that helps marketing teams generate on-brand content at scale. The platform integrates multiple LLMs, allows teams to define and maintain brand voice guidelines, and includes a collaborative editor with approval workflows. Features include blog post generation, social media content, email campaigns, and SEO optimization.",
    technologies: ["Next.js", "OpenAI API", "Laravel", "PostgreSQL", "Redis", "Tailwind CSS"],
    features: [
      "Multi-LLM content generation",
      "Brand voice customization",
      "Collaborative editor with approvals",
      "SEO optimization suggestions",
      "Content calendar & scheduling",
      "Analytics & performance tracking",
    ],
    year: "2025",
    client: "ContentAI Corp.",
  },
  {
    title: "Healthcare Portal",
    slug: "healthcare-portal",
    category: "Web Application",
    bg: "bg-gray-800",
    description:
      "A patient management portal with appointment scheduling, telemedicine, and medical records.",
    longDescription:
      "Developed a secure healthcare portal for a medical practice, featuring online appointment scheduling, telemedicine video consultations, and electronic medical records management. The platform is HIPAA-compliant with end-to-end encryption, role-based access for doctors, nurses, and patients, and integration with existing medical systems.",
    technologies: ["Next.js", "Laravel", "PostgreSQL", "WebRTC", "Tailwind CSS"],
    features: [
      "Online appointment scheduling",
      "Telemedicine video consultations",
      "Electronic medical records",
      "Prescription management",
      "Patient communication portal",
      "Insurance verification",
    ],
    year: "2024",
    client: "MediCare Solutions",
  },
  {
    title: "Real Estate Marketplace",
    slug: "real-estate-marketplace",
    category: "Marketplace",
    bg: "bg-gray-700",
    description:
      "A property listing marketplace with virtual tours, mortgage calculators, and agent matching.",
    longDescription:
      "Created a modern real estate marketplace that connects buyers, sellers, and agents. The platform features property listings with virtual 3D tours, an AI-powered property matching algorithm, integrated mortgage calculators, and a messaging system for direct agent communication. Built to handle thousands of listings with fast search and filtering.",
    technologies: ["Next.js", "TypeScript", "Laravel", "MySQL", "Mapbox", "Tailwind CSS"],
    features: [
      "Virtual 3D property tours",
      "AI-powered property matching",
      "Mortgage calculator & pre-approval",
      "Agent matching & messaging",
      "Advanced search with map view",
      "Market analytics & trends",
    ],
    year: "2024",
    client: "PropFind Ltd.",
  },
];
