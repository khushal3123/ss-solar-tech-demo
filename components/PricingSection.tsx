import React from 'react';
import Link from 'next/link';
import { Check, MessageCircle, ArrowRight } from 'lucide-react';
import { PRICING_PACKAGES } from '@/lib/config';
import { buildWhatsAppUrl, formatPackageWhatsAppMessage } from '@/lib/whatsapp';
import { Reveal } from './Reveal';
import { cn } from '@/lib/utils';

interface PricingSectionProps {
  showAllLink?: boolean;
}

export function PricingSection({ showAllLink = true }: PricingSectionProps) {
  return (
    <section className="relative py-20 md:py-28 bg-[#0D2320] text-white border-y border-white/12 overflow-hidden">
      {/* Subtle ambient glow behind pricing glass cards */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 w-[560px] h-[360px] rounded-full bg-[#F4B942]/10 blur-[130px]"
      />

      <div className="relative z-10 max-w-[1280px] mx-auto px-5 sm:px-8">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold tracking-wider uppercase text-[#F4B942] mb-3">
                Indicative Packages
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white text-balance mb-3">
                Find the Right Solar Solution for Your Property.
              </h2>
              <p className="text-sm sm:text-base text-white/75">
                All package specifications below are indicative demo examples. Final system capacity and pricing depend on site assessment, inverter selection, and roof structure.
              </p>
            </div>
            {showAllLink && (
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#F4B942] hover:text-amber-300 transition-colors whitespace-nowrap shrink-0"
              >
                <span>Compare packages</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            )}
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-7 items-stretch">
          {PRICING_PACKAGES.map((pkg, index) => {
            const waUrl = buildWhatsAppUrl(
              formatPackageWhatsAppMessage(pkg.name, pkg.exampleCapacity)
            );
            return (
              <Reveal key={pkg.id} delay={index * 0.08} className="flex">
                <div
                  className={cn(
                    'w-full flex flex-col justify-between rounded-2xl p-7 sm:p-8 backdrop-blur-lg transition-all duration-300',
                    pkg.highlighted
                      ? 'bg-white/[0.09] text-white border border-[#F4B942]/45 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.22),0_20px_48px_rgba(0,0,0,0.35)]'
                      : 'bg-white/5 text-white border border-white/15 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)]'
                  )}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 text-xs mb-4">
                      <span
                        className={cn(
                          'inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide uppercase whitespace-nowrap shrink-0 bg-white/5 backdrop-blur-lg border border-white/15 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)]',
                          pkg.highlighted ? 'text-[#F4B942] border-[#F4B942]/35' : 'text-amber-300/90'
                        )}
                      >
                        {pkg.badgeLabel}
                      </span>
                      <span className="tabular-nums text-white/70 whitespace-nowrap text-right">
                        {pkg.exampleCapacity}
                      </span>
                    </div>

                    <h3 className="font-display text-2xl font-bold text-white mb-2">
                      {pkg.name}
                    </h3>
                    <p className="text-xs font-medium text-white/75 mb-4">
                      Suitable for: {pkg.suitableFor} · {pkg.indicativeBillRange}
                    </p>

                    <div className="py-4 my-5 border-y border-white/15">
                      <p className="font-display text-2xl font-bold text-[#F4B942]">
                        {pkg.priceLabel}
                      </p>
                      <p className="text-xs mt-1 text-white/65">
                        Tailored quotation prepared after site evaluation
                      </p>
                    </div>

                    <p className="text-sm leading-relaxed text-white/80 mb-6">
                      {pkg.description}
                    </p>

                    <ul className="space-y-3 mb-8">
                      {pkg.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2.5 text-sm">
                          <Check
                            className="w-4 h-4 shrink-0 mt-0.5 text-[#F4B942]"
                            aria-hidden="true"
                          />
                          <span className="text-white/90">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      'w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold rounded-lg transition-all duration-200 whitespace-nowrap',
                      pkg.highlighted
                        ? 'bg-[#F4B942] text-[#102D26] hover:bg-[#eab035] shadow-[0_4px_16px_rgba(244,185,66,0.28)]'
                        : 'bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-[#F4B942] hover:text-[#102D26] hover:border-[#F4B942]'
                    )}
                  >
                    <MessageCircle className="w-4 h-4" aria-hidden="true" />
                    <span>Request a Quote</span>
                  </a>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
