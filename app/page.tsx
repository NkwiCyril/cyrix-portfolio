import { Hero } from "@/components/sections/hero";
import { Marquee } from "@/components/sections/marquee";
import { Services } from "@/components/sections/services";
import { PortfolioPreview } from "@/components/sections/portfolio-preview";
import { Testimonials } from "@/components/sections/testimonials";
import { Blog } from "@/components/sections/blog";
import { CTA } from "@/components/sections/cta";
import { TrustBar } from "@/components/sections/trust-bar";
import { Faq } from "@/components/sections/faq";
import {
  getServices,
  getProjects,
  getFeedbacks,
  getBlogPosts,
  getTechStack,
  getFaqs,
} from "@/utils/supabase/queries";

export const revalidate = 60;

export default async function Home() {
  const [
    servicesRes,
    projectsRes,
    feedbacksRes,
    blogRes,
    techRes,
    faqsRes,
  ] = await Promise.all([
    getServices(50, 0),
    getProjects(50, 0),
    getFeedbacks(50, 0),
    getBlogPosts(6, 0, true),
    getTechStack(),
    getFaqs(true),
  ]);

  const services = servicesRes.data ?? [];
  const projects = projectsRes.data ?? [];
  const feedbacks = feedbacksRes.data ?? [];
  const blogPosts = blogRes.data ?? [];
  const techStack = techRes.data ?? [];
  const faqs = faqsRes.data ?? [];

  return (
    <>
      <Hero />
      <Marquee />
      <Services services={services} />
      <PortfolioPreview projects={projects} />
      <Testimonials feedbacks={feedbacks} />
      <Blog posts={blogPosts} />
      <Faq faqs={faqs} />
      <TrustBar techStack={techStack} />
      <CTA />
    </>
  );
}
