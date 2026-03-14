import { getProjects } from "@/utils/supabase/queries";
import { PortfolioPageClient } from "./portfolio-page-client";

export const revalidate = 60;

export default async function PortfolioPage() {
  const { data: projects } = await getProjects(50, 0);
  return <PortfolioPageClient projects={projects ?? []} />;
}
