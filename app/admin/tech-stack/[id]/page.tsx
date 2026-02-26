import { adminClient } from "@/utils/supabase/admin";
import { TechStackForm } from "@/components/admin/forms/tech-stack-form";
import { notFound } from "next/navigation";

export default async function EditTechStackPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: tech, error } = await adminClient
    .from("tech_stack")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !tech) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Edit Technology</h1>
        <p className="mt-1 text-sm text-gray-400">Update technology: {tech.name}</p>
      </div>

      <TechStackForm tech={tech} />
    </div>
  );
}
