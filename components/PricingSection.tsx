import React from 'react';
import Link from 'next/link';
import { Check, ArrowRight, Sparkles } from 'lucide-react';
import { SOLAR_PACKAGES } from '@/lib/config';

export default function PricingSection() {
  return (
    <section className="py-16 sm:py-24 bg-[#F4F7FB]">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <p className="text-xs font-mono uppercase tracking-widest font-semibold text-[#0052CC] mb-2">
            Indicative Rooftop System Packages
          </p>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#0A2540] tracking-tight">
            Transparent Solar System Configurations
          </h2>
          <p className="text-[#475569] text-base mt-3">
            Compare typical rooftop solar capacities for Indore homes and businesses. Final pricing is tailored after an on-site structural and shadow assessment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SOLAR_PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              className={`rounded-2xl p-6 flex flex-col justify-between border transition-all ${
                pkg.popular
                  ? 'bg-[#0A2540] text-white border-[#0052CC] shadow-xl'
                  : 'bg-white text-[#0A2540] border-[#E2E8F0] shadow-xs'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span
                    className={`font-mono text-xs font-bold px-2.5 py-1 rounded-md ${
                      pkg.popular
                        ? 'bg-[#FFB800] text-[#0A2540]'
                        : 'bg-[#F4F7FB] text-[#0052CC]'
                    }`}
                  >
                    {pkg.capacity}
                  </span>
                  {pkg.popular && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-mono text-[#FFB800]">
                      <Sparkles className="w-3.5 h-3.5" />
                      Most Popular
                    </span>
                  )}
                </div>

                <h3 className="font-display font-bold text-xl mb-1">{pkg.name}</h3>
                <p
                  className={`text-xs mb-4 ${
                    pkg.popular ? 'text-slate-300' : 'text-[#475569]'
                  }`}
                >
                  {pkg.idealFor}
                </p>

                <div
                  className={`p-3.5 rounded-xl mb-5 border ${
                    pkg.popular
                      ? 'bg-white/5 border-white/10'
                      : 'bg-[#F4F7FB] border-[#E2E8F0]'
                  }`}
                >
                  <span
                    className={`text-[11px] font-mono uppercase block ${
                      pkg.popular ? 'text-slate-300' : 'text-[#475569]'
                    }`}
                  >
                    Indicative Price Range
                  </span>
                  <div
                    className={`font-display font-bold text-lg mt-0.5 ${
                      pkg.popular ? 'text-[#FFB800]' : 'text-[#0A2540]'
                    }`}
                  >
                    {pkg.indicativePriceRange}
                  </div>
                </div>

                <div className="space-y-2 text-xs mb-6">
                  <div className="flex justify-between py-1 border-b border-current/10">
                    <span className={pkg.popular ? 'text-slate-300' : 'text-[#475569]'}>
                      Est. Generation:
                    </span>
                    <span className="font-mono font-semibold">{pkg.approxMonthlyUnits}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-current/10">
                    <span className={pkg.popular ? 'text-slate-300' : 'text-[#475569]'}>
                      Roof Area Required:
                    </span>
                    <span className="font-mono font-semibold">{pkg.approxRoofArea}</span>
                  </div>
                </div>

                <ul className="space-y-2.5 text-xs mb-6">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <Check
                        className={`w-4 h-4 shrink-0 mt-0.5 ${
                          pkg.popular ? 'text-[#FFB800]' : 'text-[#0052CC]'
                        }`}
                      />
                      <span className={pkg.popular ? 'text-slate-200' : 'text-[#475569]'}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href="/contact"
                className={`w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs font-bold transition-colors ${
                  pkg.popular
                    ? 'bg-[#FFB800] text-[#0A2540] hover:bg-[#E6A600]'
                    : 'bg-[#0052CC] text-white hover:bg-[#003E99]'
                }`}
              >
                <span>Request Custom Quote</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
