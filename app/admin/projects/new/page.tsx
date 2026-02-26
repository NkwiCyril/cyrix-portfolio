import { ProjectForm } from "@/components/admin/forms/project-form";

export default function NewProjectPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">New Project</h1>
        <p className="mt-1 text-sm text-gray-400">
          Add a new project to your portfolio
        </p>
      </div>

      <ProjectForm />
    </div>
  );
}
