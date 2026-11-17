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
    <section className="py-20 md:py-28 bg-white border-y border-[#E4E9E1]">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold tracking-wider uppercase text-[#246B50] mb-3">
                Indicative Packages
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#102D26] text-balance mb-3">
                Find the Right Solar Solution for Your Property.
              </h2>
              <p className="text-sm sm:text-base text-[#4F5E57]">
                All package specifications below are indicative demo examples. Final system capacity and pricing depend on site assessment, inverter selection, and roof structure.
              </p>
            </div>
            {showAllLink && (
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#102D26] hover:text-[#246B50] transition-colors whitespace-nowrap shrink-0"
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
                    'w-full flex flex-col justify-between rounded-lg border p-7 sm:p-8',
                    pkg.highlighted
                      ? 'bg-[#102D26] text-white border-[#102D26]'
                      : 'bg-[#F4F6EF] text-[#17251F] border-[#E4E9E1]'
                  )}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 text-xs mb-4">
                      <span
                        className={cn(
                          'font-semibold tracking-wide uppercase',
                          pkg.highlighted ? 'text-[#F4B942]' : 'text-[#246B50]'
                        )}
                      >
                        {pkg.badgeLabel}
                      </span>
                      <span
                        className={cn(
                          'tabular-nums',
                          pkg.highlighted ? 'text-white/70' : 'text-[#64736C]'
                        )}
                      >
                        {pkg.exampleCapacity}
                      </span>
                    </div>

                    <h3
                      className={cn(
                        'font-display text-2xl font-bold mb-2',
                        pkg.highlighted ? 'text-white' : 'text-[#102D26]'
                      )}
                    >
                      {pkg.name}
                    </h3>
                    <p
                      className={cn(
                        'text-xs font-medium mb-4',
                        pkg.highlighted ? 'text-white/80' : 'text-[#4F5E57]'
                      )}
                    >
                      Suitable for: {pkg.suitableFor} · {pkg.indicativeBillRange}
                    </p>

                    <div
                      className={cn(
                        'py-4 my-5 border-y',
                        pkg.highlighted ? 'border-white/15' : 'border-[#E4E9E1]'
                      )}
                    >
                      <p
                        className={cn(
                          'font-display text-2xl font-bold',
                          pkg.highlighted ? 'text-[#F4B942]' : 'text-[#102D26]'
                        )}
                      >
                        {pkg.priceLabel}
                      </p>
                      <p
                        className={cn(
                          'text-xs mt-1',
                          pkg.highlighted ? 'text-white/65' : 'text-[#64736C]'
                        )}
                      >
                        Tailored quotation prepared after site evaluation
                      </p>
                    </div>

                    <p
                      className={cn(
                        'text-sm leading-relaxed mb-6',
                        pkg.highlighted ? 'text-white/80' : 'text-[#4F5E57]'
                      )}
                    >
                      {pkg.description}
                    </p>

                    <ul className="space-y-3 mb-8">
                      {pkg.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2.5 text-sm">
                          <Check
                            className={cn(
                              'w-4 h-4 shrink-0 mt-0.5',
                              pkg.highlighted ? 'text-[#F4B942]' : 'text-[#246B50]'
                            )}
                            aria-hidden="true"
                          />
                          <span className={pkg.highlighted ? 'text-white/85' : 'text-[#17251F]'}>
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
                      'w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold rounded-md transition-colors whitespace-nowrap',
                      pkg.highlighted
                        ? 'bg-[#F4B942] text-[#102D26] hover:bg-[#eab035]'
                        : 'bg-[#102D26] text-white hover:bg-[#246B50]'
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
