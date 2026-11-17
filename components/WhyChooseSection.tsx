import React from 'react';
import {
  IndianRupee,
  SunMedium,
  SlidersHorizontal,
  ShieldCheck,
  TrendingUp,
  Headphones,
} from 'lucide-react';
import { Reveal } from './Reveal';

const BENEFITS = [
  {
    number: '01',
    title: 'Reduced Electricity Expenses',
    description:
      'Generate your own daytime electricity directly from your rooftop and reduce monthly dependence on rising utility grid tariffs.',
    Icon: IndianRupee,
  },
  {
    number: '02',
    title: 'Clean & Renewable Energy',
    description:
      'Lower your property’s carbon footprint with silent, emissions-free solar power built to harness abundant Madhya Pradesh sunlight.',
    Icon: SunMedium,
  },
  {
    number: '03',
    title: 'Customized Solar Solutions',
    description:
      'Every roof and electricity bill is different. We size and configure systems around your actual consumption and usable terrace geometry.',
    Icon: SlidersHorizontal,
  },
  {
    number: '04',
    title: 'Professional Installation Approach',
    description:
      'From structured mounting layout to neat conduit routing and safety checks, every stage is planned with engineering discipline.',
    Icon: ShieldCheck,
  },
  {
    number: '05',
    title: 'Long-Term Energy Savings',
    description:
      'Solar panels are built for multi-decade rooftop operation, turning sunlit afternoons into sustained long-term electricity bill relief.',
    Icon: TrendingUp,
  },
  {
    number: '06',
    title: 'Consultation & Customer Support',
    description:
      'Clear answers before you decide—covering site feasibility, net-metering steps, and ongoing guidance whenever you need assistance.',
    Icon: Headphones,
  },
];

export function WhyChooseSection() {
  return (
    <section className="py-20 md:py-28 bg-[#102D26] text-[#F4F6EF]">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
          {/* Left Sticky Editorial Intro */}
          <div className="lg:col-span-4 lg:sticky lg:top-28">
            <Reveal>
              <p className="text-xs font-semibold tracking-wider uppercase text-[#F4B942] mb-3">
                Why Choose SS Solar
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white text-balance leading-[1.15] mb-5">
                Why Make the Switch to Solar?
              </h2>
              <p className="text-base text-white/75 leading-relaxed mb-8">
                Moving to rooftop solar is an infrastructure decision for your home or business. We focus on straightforward consultation, careful system sizing, and reliable execution—without inflated promises.
              </p>
              <div className="pt-6 border-t border-white/15 text-xs text-white/65 leading-relaxed">
                Serving residential neighborhoods, commercial complexes, and industrial zones across Indore, Madhya Pradesh.
              </div>
            </Reveal>
          </div>

          {/* Right Editorial 2-column hairline grid */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 border-t border-l border-white/15">
              {BENEFITS.map(({ number, title, description, Icon }, index) => (
                <Reveal key={number} delay={index * 0.05}>
                  <div className="h-full p-7 sm:p-8 border-r border-b border-white/15 hover:bg-white/[0.03] transition-colors">
                    <div className="flex items-center justify-between mb-6">
                      <span className="font-display text-xs font-semibold tracking-wider text-[#F4B942]">
                        {number}
                      </span>
                      <Icon className="w-5 h-5 text-[#F4B942]" aria-hidden="true" />
                    </div>
                    <h3 className="font-display text-lg font-semibold text-white mb-2.5">
                      {title}
                    </h3>
                    <p className="text-sm text-white/75 leading-relaxed">
                      {description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
