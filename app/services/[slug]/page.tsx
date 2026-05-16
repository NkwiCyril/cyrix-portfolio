import {
  getServiceBySlug,
  getServices,
  getUsdToXafRate,
} from "@/utils/supabase/queries";
import { ServiceDetailClient } from "./service-detail-client";
import { PricingTiers } from "@/components/sections/pricing-tiers";
import { notFound } from "next/navigation";
import type { Service, PricingTier } from "@/types/database";

export const revalidate = 60;

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const [{ data: service }, { data: allServices }, usdToXafRate] =
    await Promise.all([
      getServiceBySlug(slug),
      getServices(50, 0),
      getUsdToXafRate(),
    ]);

  if (!service) {
    notFound();
  }

  const otherServices = (allServices ?? []).filter(
    (s: Service) => s.slug !== slug,
  );
  const tiers: PricingTier[] = Array.isArray(service.pricing_tiers)
    ? service.pricing_tiers
    : [];

  return (
    <>
      {tiers.length > 0 && (
        <PricingTiers tiers={tiers} usdToXafRate={usdToXafRate} />
      )}
      <ServiceDetailClient service={service} otherServices={otherServices} />
    </>
  );
}
