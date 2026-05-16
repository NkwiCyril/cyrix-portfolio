import { getUsdToXafRate } from "@/utils/supabase/queries";
import { CurrencyRateForm } from "@/components/admin/forms/currency-rate-form";

export const revalidate = 0;

export default async function AdminSettingsPage() {
  const usdToXafRate = await getUsdToXafRate();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="mt-1 text-sm text-gray-400">Manage site-wide configuration</p>
      </div>

      <div className="rounded-lg border border-gray-800 bg-[#0f0f0f] p-6">
        <h2 className="text-lg font-semibold text-white">Currency Conversion</h2>
        <p className="mt-1 text-sm text-gray-400">
          Used to convert XAF prices to USD on service pricing cards.
        </p>
        <CurrencyRateForm initialRate={usdToXafRate} />
      </div>

      <div className="rounded-lg border border-gray-800 bg-[#0f0f0f] p-6">
        <h2 className="text-lg font-semibold text-white">Quick Links</h2>
        <div className="mt-4 space-y-2">
          <a
            href="https://supabase.com"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-sm text-accent hover:underline"
          >
            → Supabase Dashboard
          </a>
          <a href="/admin" className="block text-sm text-accent hover:underline">
            → Admin Dashboard
          </a>
        </div>
      </div>
    </div>
  );
}
