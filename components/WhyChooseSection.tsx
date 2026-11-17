'use client';

import React from 'react';
import { Wind, ShieldCheck, FileCheck2, Wrench } from 'lucide-react';
import { motion } from 'motion/react';

const ADVANTAGES = [
  {
    index: '01',
    icon: Wind,
    tag: 'Engineered Safety',
    title: 'Cyclone-Resistant Elevated Mounting',
    description:
      'Hot-dip galvanized structures engineered for Indore rooftops to withstand high wind speeds while keeping your terrace usable underneath.',
  },
  {
    index: '02',
    icon: FileCheck2,
    tag: 'Paperwork Handled',
    title: 'End-to-End Subsidy & Net-Metering',
    description:
      'From PM Surya Ghar portal registration to MPPKVVCL bi-directional net-meter commissioning, our local Indore desk coordinates every step.',
  },
  {
    index: '03',
    icon: ShieldCheck,
    tag: 'Tier-1 Hardware',
    title: 'High-Efficiency Bifacial & Mono PERC',
    description:
      'ALMM-approved solar modules paired with high-efficiency string inverters, AC/DC surge protection, and dedicated earthing kits.',
  },
  {
    index: '04',
    icon: Wrench,
    tag: 'Lifecycle Care',
    title: 'Preventive Maintenance & Generation Checks',
    description:
      'Scheduled module cleaning guidance, string health inspections, and responsive local support across Indore and surrounding MP districts.',
  },
];

export default function WhyChooseSection() {
  return (
    <section id="why-us" className="py-16 sm:py-24 bg-white border-b border-[#E2E8F0] scroll-mt-16">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <p className="text-xs font-mono uppercase tracking-widest font-semibold text-[#0052CC] mb-2">
            Why Homeowners &amp; Businesses Choose SS Solar
          </p>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#0A2540] tracking-tight">
            Built for Long-Term Rooftop Performance
          </h2>
          <p className="text-[#475569] text-base sm:text-lg mt-3">
            A rooftop solar plant is a 25-year power asset. We focus on structural precision, electrical safety, and transparent financing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ADVANTAGES.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.35, delay: idx * 0.06 }}
                className="bg-[#F4F7FB] hover:bg-white rounded-2xl p-6 border border-[#E2E8F0] hover:border-[#0052CC]/40 transition-all duration-200 hover:shadow-md flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-11 h-11 rounded-xl bg-[#0052CC] text-white flex items-center justify-center shadow-xs">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-xs uppercase tracking-wider font-semibold text-[#0052CC]">
                      {item.index} · {item.tag}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-lg text-[#0A2540] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#475569] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
