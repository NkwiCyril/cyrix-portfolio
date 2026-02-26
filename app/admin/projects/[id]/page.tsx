import { adminClient } from "@/utils/supabase/admin";
import { ProjectForm } from "@/components/admin/forms/project-form";
import { notFound } from "next/navigation";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: project, error } = await adminClient
    .from("projects")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !project) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Edit Project</h1>
        <p className="mt-1 text-sm text-gray-400">
          Update project: {project.title}
        </p>
      </div>

      <ProjectForm project={project} />
    </div>
  );
}
