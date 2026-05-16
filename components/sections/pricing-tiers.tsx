"use client";

import { useState } from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { motion } from "framer-motion";
import type { PricingTier } from "@/types/database";

interface PricingTiersProps {
  tiers: PricingTier[];
  /** 1 USD = N XAF. Used to compute USD prices client-side. */
  usdToXafRate: number;
}

type Currency = "XAF" | "USD";

function formatPrice(priceXaf: number | null, currency: Currency, rate: number) {
  if (priceXaf === null) return "—";

  if (currency === "XAF") {
    return new Intl.NumberFormat("fr-CM", {
      maximumFractionDigits: 0,
    }).format(priceXaf);
  }
  const usd = priceXaf / rate;
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0,
  }).format(Math.round(usd));
}

export function PricingTiers({ tiers, usdToXafRate }: PricingTiersProps) {
  const [currency, setCurrency] = useState<Currency>("XAF");

  if (tiers.length === 0) return null;

  return (
    <section className="bg-gray-50 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-accent">
            Pricing
          </p>
          <h2 className="mt-3 text-4xl font-bold text-gray-950 lg:text-5xl">
            Choose Your Package
          </h2>
        </div>

        {/* Currency toggle */}
        <div className="mt-10 flex justify-center">
          <div className="inline-flex overflow-hidden rounded-md border-2 border-accent">
            {(["XAF", "USD"] as const).map((c) => (
              <button
                key={c}
                onClick={() => setCurrency(c)}
                className={`px-5 py-2 text-sm font-bold transition-colors ${
                  currency === c
                    ? "bg-accent text-white"
                    : "bg-white text-gray-900 hover:bg-gray-100"
                }`}
              >
                {c === "XAF" ? "XAF (FCFA)" : "USD ($)"}
              </button>
            ))}
          </div>
        </div>

        {/* Tier cards */}
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tiers.map((tier, i) => {
            const isPopular = tier.is_popular;
            return (
              <motion.div
                key={tier.name + i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className={`relative flex flex-col overflow-hidden rounded-lg border-2 ${
                  isPopular ? "border-accent shadow-xl" : "border-gray-200"
                } bg-white`}
              >
                {/* Header */}
                <div
                  className={`relative p-8 ${
                    isPopular ? "bg-accent text-white" : "bg-gray-950 text-white"
                  }`}
                >
                  {isPopular && (
                    <span className="absolute right-4 top-4 rounded-sm bg-yellow-400 px-3 py-1 text-xs font-bold uppercase tracking-wider text-gray-950">
                      Popular
                    </span>
                  )}
                  <h3 className="text-sm font-bold uppercase tracking-widest">
                    {tier.name}
                  </h3>
                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="text-2xl font-bold">
                      {currency === "XAF" ? "₣" : "$"}
                    </span>
                    <span className="text-4xl font-bold lg:text-5xl">
                      {formatPrice(tier.price_xaf, currency, usdToXafRate)}
                    </span>
                  </div>
                  {tier.price_xaf === null && (
                    <p className="mt-2 text-xs uppercase tracking-wider opacity-80">
                      Custom quote
                    </p>
                  )}
                </div>

                {/* Features */}
                <ul className="flex-1 space-y-3 p-8">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent text-white">
                        <Check size={12} strokeWidth={3} />
                      </span>
                      <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <div className="p-8 pt-0">
                  <Link
                    href={tier.cta_link || "/contact"}
                    className={`block w-full rounded-md py-4 text-center text-sm font-bold transition-colors ${
                      isPopular
                        ? "bg-accent text-white hover:bg-accent-dark"
                        : "bg-gray-950 text-white hover:bg-gray-800"
                    }`}
                  >
                    {tier.cta_label || "Order Now"}
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        <p className="mt-8 text-center text-xs text-gray-500">
          Conversion rate: 1 USD ≈ {usdToXafRate.toLocaleString()} XAF
        </p>
      </div>
    </section>
  );
}
