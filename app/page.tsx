import { Hero } from "@/components/sections/hero";
import { Marquee } from "@/components/sections/marquee";
import { Services } from "@/components/sections/services";
import { PortfolioPreview } from "@/components/sections/portfolio-preview";
import { Testimonials } from "@/components/sections/testimonials";
import { Blog } from "@/components/sections/blog";
import { CTA } from "@/components/sections/cta";
import { TrustBar } from "@/components/sections/trust-bar";
import {
  getServices,
  getProjects,
  getFeedbacks,
  getBlogPosts,
  getTechStack,
} from "@/utils/supabase/queries";

export const revalidate = 60;

export default async function Home() {
  const [servicesRes, projectsRes, feedbacksRes, blogRes, techRes] =
    await Promise.all([
      getServices(50, 0),
      getProjects(50, 0),
      getFeedbacks(50, 0),
      getBlogPosts(6, 0, true),
      getTechStack(),
    ]);

  const services = servicesRes.data ?? [];
  const projects = projectsRes.data ?? [];
  const feedbacks = feedbacksRes.data ?? [];
  const blogPosts = blogRes.data ?? [];
  // const techStack = techRes.data ?? [];

  return (
    <>
      <Hero />
      <Marquee />
      <Services services={services} />
      <PortfolioPreview projects={projects} />
      <Testimonials feedbacks={feedbacks} />
      <Blog posts={blogPosts} />
      {/* <TrustBar techStack={techStack} /> */}
      <CTA />
    </>
  );
}
