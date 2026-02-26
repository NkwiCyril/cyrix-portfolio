import Link from "next/link";
import { adminClient } from "@/utils/supabase/admin";
import { Plus, Pencil } from "lucide-react";
import { DeleteButton } from "@/components/admin/delete-button";

export default async function AdminServicesPage() {
  const { data: services, error } = await adminClient
    .from("services")
    .select("*")
    .order("display_order", { ascending: true });

  if (error) {
    return (
      <div className="rounded-lg border border-red-800 bg-red-950/20 p-6">
        <h2 className="text-lg font-bold text-red-400">Error loading services</h2>
        <p className="mt-2 text-sm text-red-300">{error.message}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Services</h1>
          <p className="mt-1 text-sm text-gray-400">
            Manage your service offerings
          </p>
        </div>
        <Link
          href="/admin/services/new"
          className="flex items-center gap-2 rounded-lg bg-accent px-4 py-2 font-medium text-[#0a0a0a] transition-opacity hover:opacity-90"
        >
          <Plus size={20} />
          New Service
        </Link>
      </div>

      {services && services.length > 0 ? (
        <div className="overflow-hidden rounded-lg border border-gray-800 bg-[#0f0f0f]">
          <table className="w-full">
            <thead className="border-b border-gray-800 bg-[#0a0a0a]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                  Pricing
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                  Order
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                  Featured
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-400">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {services.map((service) => (
                <tr key={service.id} className="transition-colors hover:bg-gray-900/50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium text-white">{service.title}</div>
                      <div className="text-xs text-gray-500">{service.slug}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-400">
                    {service.base_price ? `$${service.base_price}` : service.pricing_model || "—"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-400">
                    {service.display_order}
                  </td>
                  <td className="px-6 py-4">
                    {service.is_featured ? (
                      <span className="inline-flex rounded-full bg-accent/20 px-2 py-1 text-xs font-medium text-accent">
                        Featured
                      </span>
                    ) : (
                      <span className="text-sm text-gray-500">—</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/services/${service.id}`}
                        className="rounded p-2 text-gray-400 transition-colors hover:bg-gray-800 hover:text-white"
                        title="Edit"
                      >
                        <Pencil size={16} />
                      </Link>
                      <DeleteButton
                        id={service.id}
                        endpoint="/api/services"
                        itemName={service.title}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="rounded-lg border border-gray-800 bg-[#0f0f0f] p-12 text-center">
          <p className="text-gray-400">No services found.</p>
          <Link
            href="/admin/services/new"
            className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-accent hover:underline"
          >
            <Plus size={16} />
            Create your first service
          </Link>
        </div>
      )}
    </div>
  );
}
