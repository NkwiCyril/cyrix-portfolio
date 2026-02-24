import { Hero } from "@/components/sections/hero";
import { Marquee } from "@/components/sections/marquee";
import { Services } from "@/components/sections/services";
import { PortfolioPreview } from "@/components/sections/portfolio-preview";
import { Testimonials } from "@/components/sections/testimonials";
import { Blog } from "@/components/sections/blog";
import { CTA } from "@/components/sections/cta";
import { TrustBar } from "@/components/sections/trust-bar";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Services />
      <PortfolioPreview />
      <Testimonials />
      <Blog />
      <TrustBar />
      <CTA />
    </>
  );
}
