"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, Loader2, Plus, Star, X } from "lucide-react";
import type { Service, PricingTier } from "@/types/database";
import { ImageUpload } from "@/components/admin/image-upload";

interface ServiceFormProps {
  service?: Service;
}

export function ServiceForm({ service }: ServiceFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    title: service?.title || "",
    slug: service?.slug || "",
    description: service?.description || "",
    long_description: service?.long_description || "",
    icon: service?.icon || "",
    pricing_model: service?.pricing_model || "",
    base_price: service?.base_price || 0,
    is_featured: service?.is_featured || false,
    display_order: service?.display_order || 0,
  });

  const [features, setFeatures] = useState<string[]>(service?.features || []);
  const [newFeature, setNewFeature] = useState("");

  const [pricingTiers, setPricingTiers] = useState<PricingTier[]>(
    service?.pricing_tiers || []
  );

  const addPricingTier = () => {
    setPricingTiers([
      ...pricingTiers,
      {
        name: "",
        price_xaf: null,
        is_popular: false,
        features: [],
        cta_label: "Order Now",
        cta_link: null,
      },
    ]);
  };

  const updatePricingTier = (index: number, patch: Partial<PricingTier>) => {
    setPricingTiers(
      pricingTiers.map((t, i) => (i === index ? { ...t, ...patch } : t))
    );
  };

  const removePricingTier = (index: number) => {
    setPricingTiers(pricingTiers.filter((_, i) => i !== index));
  };

  const addTierFeature = (tierIndex: number, feature: string) => {
    if (!feature.trim()) return;
    updatePricingTier(tierIndex, {
      features: [...pricingTiers[tierIndex].features, feature.trim()],
    });
  };

  const removeTierFeature = (tierIndex: number, featureIndex: number) => {
    updatePricingTier(tierIndex, {
      features: pricingTiers[tierIndex].features.filter(
        (_, i) => i !== featureIndex
      ),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const payload = {
        ...formData,
        features,
        pricing_tiers: pricingTiers,
      };

      const url = service ? `/api/services/${service.id}` : "/api/services";
      const method = service ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to save service");
      }

      router.push("/admin/services");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  const addFeature = () => {
    if (newFeature.trim()) {
      setFeatures([...features, newFeature.trim()]);
      setNewFeature("");
    }
  };

  const removeFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="rounded-lg border border-gray-800 bg-[#0f0f0f] p-6">
        <h2 className="mb-4 text-lg font-semibold text-white">Basic Information</h2>
        
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-300">Title *</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="mt-2 w-full rounded-lg border border-gray-700 bg-[#0a0a0a] px-4 py-2 text-white focus:border-accent focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300">Slug *</label>
            <input
              type="text"
              required
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/\s+/g, "-") })}
              className="mt-2 w-full rounded-lg border border-gray-700 bg-[#0a0a0a] px-4 py-2 text-white focus:border-accent focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300">Icon</label>
            <ImageUpload
              value={formData.icon}
              onChange={(url) => setFormData({ ...formData, icon: url })}
              folder="services"
              label="Upload Icon"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300">Display Order</label>
            <input
              type="number"
              value={formData.display_order}
              onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) })}
              className="mt-2 w-full rounded-lg border border-gray-700 bg-[#0a0a0a] px-4 py-2 text-white focus:border-accent focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300">Pricing Model</label>
            <input
              type="text"
              value={formData.pricing_model}
              onChange={(e) => setFormData({ ...formData, pricing_model: e.target.value })}
              className="mt-2 w-full rounded-lg border border-gray-700 bg-[#0a0a0a] px-4 py-2 text-white focus:border-accent focus:outline-none"
              placeholder="e.g., Fixed, Hourly, Custom"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300">Base Price</label>
            <input
              type="number"
              step="0.01"
              value={formData.base_price}
              onChange={(e) => setFormData({ ...formData, base_price: parseFloat(e.target.value) })}
              className="mt-2 w-full rounded-lg border border-gray-700 bg-[#0a0a0a] px-4 py-2 text-white focus:border-accent focus:outline-none"
            />
          </div>
        </div>

        <div className="mt-6">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.is_featured}
              onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
              className="h-4 w-4 rounded border-gray-700 bg-[#0a0a0a] text-accent focus:ring-accent"
            />
            <span className="text-sm font-medium text-gray-300">Featured Service</span>
          </label>
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-300">Short Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={3}
            className="mt-2 w-full rounded-lg border border-gray-700 bg-[#0a0a0a] px-4 py-2 text-white focus:border-accent focus:outline-none"
          />
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-300">Long Description</label>
          <textarea
            value={formData.long_description}
            onChange={(e) => setFormData({ ...formData, long_description: e.target.value })}
            rows={6}
            className="mt-2 w-full rounded-lg border border-gray-700 bg-[#0a0a0a] px-4 py-2 text-white focus:border-accent focus:outline-none"
          />
        </div>
      </div>

      <div className="rounded-lg border border-gray-800 bg-[#0f0f0f] p-6">
        <h2 className="mb-4 text-lg font-semibold text-white">Features</h2>
        
        <div className="flex gap-2">
          <input
            type="text"
            value={newFeature}
            onChange={(e) => setNewFeature(e.target.value)}
            className="flex-1 rounded-lg border border-gray-700 bg-[#0a0a0a] px-4 py-2 text-white focus:border-accent focus:outline-none"
            placeholder="e.g., 24/7 Support"
          />
          <button
            type="button"
            onClick={addFeature}
            className="rounded-lg bg-gray-700 px-4 py-2 text-white hover:bg-gray-600"
          >
            <Plus size={20} />
          </button>
        </div>
        {features.length > 0 && (
          <div className="mt-3 space-y-2">
            {features.map((feature, idx) => (
              <div key={idx} className="flex items-center gap-2 rounded bg-gray-800 px-3 py-2">
                <span className="flex-1 text-sm text-gray-300">{feature}</span>
                <button
                  type="button"
                  onClick={() => removeFeature(idx)}
                  className="text-gray-400 hover:text-red-400"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Pricing Tiers */}
      <div className="rounded-lg border border-gray-800 bg-[#0f0f0f] p-6">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-white">Pricing Tiers</h2>
            <p className="mt-1 text-xs text-gray-500">
              Public pricing cards shown on the service detail page. Prices in XAF.
            </p>
          </div>
          <button
            type="button"
            onClick={addPricingTier}
            className="flex items-center gap-2 rounded-lg bg-gray-700 px-3 py-2 text-sm font-medium text-white hover:bg-gray-600"
          >
            <Plus size={16} />
            Add Tier
          </button>
        </div>

        {pricingTiers.length === 0 && (
          <p className="rounded border border-dashed border-gray-700 p-6 text-center text-sm text-gray-500">
            No pricing tiers yet. Click "Add Tier" to create one.
          </p>
        )}

        <div className="space-y-4">
          {pricingTiers.map((tier, tierIndex) => (
            <PricingTierEditor
              key={tierIndex}
              tier={tier}
              onChange={(patch) => updatePricingTier(tierIndex, patch)}
              onRemove={() => removePricingTier(tierIndex)}
              onAddFeature={(feature) => addTierFeature(tierIndex, feature)}
              onRemoveFeature={(featureIndex) =>
                removeTierFeature(tierIndex, featureIndex)
              }
            />
          ))}
        </div>
      </div>

      {error && (
        <div className="rounded-lg border border-red-800 bg-red-950/20 p-4 text-sm text-red-400">
          {error}
        </div>
      )}

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 rounded-lg bg-accent px-6 py-3 font-medium text-[#0a0a0a] transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 size={20} className="animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save size={20} />
              {service ? "Update Service" : "Create Service"}
            </>
          )}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-lg border border-gray-700 px-6 py-3 font-medium text-white transition-colors hover:bg-gray-800"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

interface PricingTierEditorProps {
  tier: PricingTier;
  onChange: (patch: Partial<PricingTier>) => void;
  onRemove: () => void;
  onAddFeature: (feature: string) => void;
  onRemoveFeature: (index: number) => void;
}

function PricingTierEditor({
  tier,
  onChange,
  onRemove,
  onAddFeature,
  onRemoveFeature,
}: PricingTierEditorProps) {
  const [newFeature, setNewFeature] = useState("");

  return (
    <div className="rounded-lg border border-gray-700 bg-[#0a0a0a] p-5">
      <div className="flex items-start justify-between gap-3">
        <input
          type="text"
          value={tier.name}
          onChange={(e) => onChange({ name: e.target.value })}
          placeholder="Tier name (e.g., Corporate, E-Commerce)"
          className="flex-1 rounded-lg border border-gray-700 bg-[#0f0f0f] px-3 py-2 text-sm font-semibold text-white focus:border-accent focus:outline-none"
        />
        <button
          type="button"
          onClick={onRemove}
          className="rounded p-2 text-gray-400 transition-colors hover:bg-red-950/30 hover:text-red-400"
          title="Remove tier"
        >
          <X size={18} />
        </button>
      </div>

      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <div>
          <label className="block text-xs font-medium uppercase tracking-wider text-gray-500">
            Price (XAF)
          </label>
          <input
            type="number"
            value={tier.price_xaf ?? ""}
            onChange={(e) =>
              onChange({
                price_xaf: e.target.value === "" ? null : parseInt(e.target.value),
              })
            }
            placeholder="Leave blank for custom quote"
            className="mt-1 w-full rounded-lg border border-gray-700 bg-[#0f0f0f] px-3 py-2 text-sm text-white focus:border-accent focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-medium uppercase tracking-wider text-gray-500">
            CTA Label
          </label>
          <input
            type="text"
            value={tier.cta_label ?? ""}
            onChange={(e) => onChange({ cta_label: e.target.value })}
            placeholder="Order Now"
            className="mt-1 w-full rounded-lg border border-gray-700 bg-[#0f0f0f] px-3 py-2 text-sm text-white focus:border-accent focus:outline-none"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-xs font-medium uppercase tracking-wider text-gray-500">
            CTA Link <span className="text-gray-600">(optional — defaults to /contact)</span>
          </label>
          <input
            type="text"
            value={tier.cta_link ?? ""}
            onChange={(e) =>
              onChange({ cta_link: e.target.value === "" ? null : e.target.value })
            }
            placeholder="/contact or https://..."
            className="mt-1 w-full rounded-lg border border-gray-700 bg-[#0f0f0f] px-3 py-2 text-sm text-white focus:border-accent focus:outline-none"
          />
        </div>
      </div>

      <label className="mt-3 flex cursor-pointer items-center gap-2 text-sm text-gray-300">
        <input
          type="checkbox"
          checked={tier.is_popular}
          onChange={(e) => onChange({ is_popular: e.target.checked })}
          className="h-4 w-4 accent-accent"
        />
        <Star size={14} className="text-yellow-400" />
        Mark as popular
      </label>

      <div className="mt-4">
        <label className="block text-xs font-medium uppercase tracking-wider text-gray-500">
          Features
        </label>
        <div className="mt-2 flex gap-2">
          <input
            type="text"
            value={newFeature}
            onChange={(e) => setNewFeature(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                onAddFeature(newFeature);
                setNewFeature("");
              }
            }}
            placeholder="Domain & Hosting (1 Year)"
            className="flex-1 rounded-lg border border-gray-700 bg-[#0f0f0f] px-3 py-2 text-sm text-white focus:border-accent focus:outline-none"
          />
          <button
            type="button"
            onClick={() => {
              onAddFeature(newFeature);
              setNewFeature("");
            }}
            className="rounded-lg bg-gray-700 px-3 py-2 text-white hover:bg-gray-600"
          >
            <Plus size={16} />
          </button>
        </div>
        {tier.features.length > 0 && (
          <ul className="mt-2 space-y-1">
            {tier.features.map((feature, idx) => (
              <li
                key={idx}
                className="flex items-center gap-2 rounded bg-gray-800 px-3 py-1.5 text-sm text-gray-300"
              >
                <span className="flex-1">{feature}</span>
                <button
                  type="button"
                  onClick={() => onRemoveFeature(idx)}
                  className="text-gray-400 hover:text-red-400"
                >
                  <X size={14} />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
