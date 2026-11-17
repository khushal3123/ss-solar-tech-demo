import React from 'react';
import { Reveal } from './Reveal';

const STEPS = [
  {
    number: '01',
    title: 'Initial Consultation',
    description:
      'Share your monthly electricity bills, property type, and energy goals. We walk you through practical rooftop solar options for Indore conditions.',
  },
  {
    number: '02',
    title: 'Site Assessment',
    description:
      'We inspect your roof dimensions, orientation, shading obstructions, and electrical panel setup to determine usable capacity.',
  },
  {
    number: '03',
    title: 'Customized Solar Proposal',
    description:
      'Receive a tailored system layout, component specification overview, indicative generation projection, and clear project quotation.',
  },
  {
    number: '04',
    title: 'Installation & Handover',
    description:
      'Structured rooftop mounting, neat wiring, testing, and guidance through net-metering coordination and system walkthrough.',
  },
];

export function HowItWorks() {
  return (
    <section className="relative py-20 md:py-28 bg-[#0D2320] text-white border-y border-white/12 overflow-hidden">
      <div className="relative z-10 max-w-[1280px] mx-auto px-5 sm:px-8">
        <Reveal>
          <div className="max-w-2xl mb-14">
            <p className="text-xs font-semibold tracking-wider uppercase text-[#F4B942] mb-3">
              Process
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white text-balance">
              Your Journey to Solar, Made Simple.
            </h2>
          </div>
        </Reveal>

        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((step, index) => (
            <Reveal key={step.number} delay={index * 0.08} className="flex">
              <div className="w-full p-7 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/15 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)] flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center justify-center w-10 h-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl font-display text-sm font-bold text-[#F4B942] mb-5">
                    {step.number}
                  </div>
                  <h3 className="font-display text-lg font-bold text-white mb-2.5">
                    {step.title}
                  </h3>
                  <p className="text-sm text-white/75 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
