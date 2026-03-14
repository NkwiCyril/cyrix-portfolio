import { getServiceBySlug, getServices } from "@/utils/supabase/queries";
import { ServiceDetailClient } from "./service-detail-client";
import { notFound } from "next/navigation";
import type { Service } from "@/types/database";

export const revalidate = 60;

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { data: service } = await getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const { data: allServices } = await getServices(50, 0);
  const otherServices = (allServices ?? []).filter((s: Service) => s.slug !== slug);

  return <ServiceDetailClient service={service} otherServices={otherServices} />;
}
