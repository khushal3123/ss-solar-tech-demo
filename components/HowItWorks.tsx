'use client';

import React from 'react';
import Link from 'next/link';
import { Compass, FileCheck, Wrench, Zap, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

const STEPS = [
  {
    step: '01',
    icon: Compass,
    title: 'Free Rooftop Survey & Shadow Analysis',
    description:
      'Our Indore engineering team inspects your terrace, evaluates shadow-free area, and shares a 3D layout with an exact savings & EMI quote.',
  },
  {
    step: '02',
    icon: FileCheck,
    title: 'Subsidy & MPPKVVCL Feasibility Filing',
    description:
      'We prepare and submit your PM Surya Ghar application, load-sanction check, and net-metering paperwork with MPPKVVCL.',
  },
  {
    step: '03',
    icon: Wrench,
    title: 'Safe Installation with Cyclone-Ready Mounting',
    description:
      'Certified technicians install galvanized mounting structures, Tier-1 solar panels, inverter, and AC/DC safety protection with zero roof leakage.',
  },
  {
    step: '04',
    icon: Zap,
    title: 'Net-Meter Commissioning & App Handover',
    description:
      'Once bi-directional metering is active, your system begins exporting surplus solar units and you track daily generation on your phone.',
  },
];

export default function HowItWorks() {
  return (
    <section
      id="process"
      className="py-16 sm:py-24 bg-[#F4F7FB] border-b border-[#E2E8F0] scroll-mt-16"
    >
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <p className="text-xs font-mono uppercase tracking-widest font-semibold text-[#0052CC] mb-2">
              Simple 4-Step Turnkey Execution
            </p>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#0A2540] tracking-tight">
              We Handle Everything, You Just Save
            </h2>
            <p className="text-[#475569] text-base sm:text-lg mt-2">
              We manage the complete journey from initial rooftop inspection in Indore to final net-meter activation.
            </p>
          </div>

          <Link
            href="#consultation-form"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold text-white bg-[#0052CC] hover:bg-[#003E99] transition-colors self-start lg:self-auto"
          >
            <span>Schedule Step 1: Free Site Survey</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.35, delay: idx * 0.06 }}
                className="bg-white rounded-2xl p-6 border border-[#E2E8F0] shadow-2xs relative flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-mono font-bold text-2xl text-[#0052CC] tabular-nums">
                      {item.step}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-[#F4F7FB] border border-[#E2E8F0] flex items-center justify-center text-[#0A2540]">
                      <Icon className="w-5 h-5 text-[#0052CC]" />
                    </div>
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
