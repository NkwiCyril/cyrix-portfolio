import { getProjectBySlug, getProjects } from "@/utils/supabase/queries";
import { ProjectDetailClient } from "./project-detail-client";
import { notFound } from "next/navigation";
import type { Project } from "@/types/database";

export const revalidate = 60;

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { data: project } = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const { data: allProjects } = await getProjects(50, 0);
  const otherProjects = (allProjects ?? []).filter((p: Project) => p.slug !== slug).slice(0, 3);

  return <ProjectDetailClient project={project} otherProjects={otherProjects} />;
}
