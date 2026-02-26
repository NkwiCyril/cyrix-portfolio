import { ServiceForm } from "@/components/admin/forms/service-form";

export default function NewServicePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">New Service</h1>
        <p className="mt-1 text-sm text-gray-400">
          Add a new service offering
        </p>
      </div>

      <ServiceForm />
    </div>
  );
}
