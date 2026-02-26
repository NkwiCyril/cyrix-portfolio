import { adminClient } from "@/utils/supabase/admin";
import { ServiceForm } from "@/components/admin/forms/service-form";
import { notFound } from "next/navigation";

export default async function EditServicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: service, error } = await adminClient
    .from("services")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !service) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Edit Service</h1>
        <p className="mt-1 text-sm text-gray-400">
          Update service: {service.title}
        </p>
      </div>

      <ServiceForm service={service} />
    </div>
  );
}
