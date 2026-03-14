import { getServices } from "@/utils/supabase/queries";
import { ServicesPageClient } from "./services-page-client";

export const revalidate = 60;

export default async function ServicesPage() {
  const { data: services } = await getServices(50, 0);
  return <ServicesPageClient services={services ?? []} />;
}
