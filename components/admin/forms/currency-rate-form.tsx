"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, Loader2 } from "lucide-react";

interface CurrencyRateFormProps {
  initialRate: number;
}

export function CurrencyRateForm({ initialRate }: CurrencyRateFormProps) {
  const router = useRouter();
  const [rate, setRate] = useState(initialRate);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "ok" | "err"; text: string } | null>(
    null
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setSaving(true);

    try {
      const response = await fetch("/api/settings/usd_to_xaf_rate", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ value: rate }),
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to save");
      }
      setMessage({ type: "ok", text: "Saved." });
      router.refresh();
    } catch (err) {
      setMessage({
        type: "err",
        text: err instanceof Error ? err.message : "Failed to save",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-300">
          1 USD = ? XAF
        </label>
        <input
          type="number"
          min="1"
          step="0.01"
          value={rate}
          onChange={(e) => setRate(parseFloat(e.target.value) || 0)}
          className="mt-2 w-full max-w-xs rounded-lg border border-gray-700 bg-[#0a0a0a] px-4 py-2 text-white focus:border-accent focus:outline-none"
        />
        <p className="mt-1 text-xs text-gray-500">
          Example: 600 means 1 USD = 600 XAF. A price of 350,000 XAF will display as ~$583.
        </p>
      </div>

      {message && (
        <div
          className={`rounded-lg border p-3 text-sm ${
            message.type === "ok"
              ? "border-green-800 bg-green-950/20 text-green-400"
              : "border-red-800 bg-red-950/20 text-red-400"
          }`}
        >
          {message.text}
        </div>
      )}

      <button
        type="submit"
        disabled={saving}
        className="flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-[#0a0a0a] hover:opacity-90 disabled:opacity-50"
      >
        {saving ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Saving...
          </>
        ) : (
          <>
            <Save size={16} />
            Save Rate
          </>
        )}
      </button>
    </form>
  );
}
