import { TechStackForm } from "@/components/admin/forms/tech-stack-form";

export default function NewTechStackPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Add Technology</h1>
        <p className="mt-1 text-sm text-gray-400">Add a new technology to your stack</p>
      </div>

      <TechStackForm />
    </div>
  );
}
