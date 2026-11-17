'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ShieldCheck,
  CheckCircle2,
  Calculator,
  ArrowRight,
  Copy,
  Check,
  Building2,
  Home,
} from 'lucide-react';
import { SOLAR_IMAGES, BRAND_CONFIG } from '@/lib/config';
import { validateLeadForm } from '@/lib/validation';
import { buildContactWhatsAppMessage, getWhatsAppAction } from '@/lib/whatsapp';
import { motion } from 'motion/react';

const BILL_BRACKETS = [
  { label: '< ₹2,000', value: 'Under ₹2,000/month' },
  { label: '₹2,000 - ₹4,000', value: '₹2,000 - ₹4,000/month' },
  { label: '₹4,000 - ₹8,000', value: '₹4,000 - ₹8,000/month' },
  { label: '₹8,000+', value: 'Above ₹8,000/month' },
];

export default function Hero() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [cityArea, setCityArea] = useState('Vijay Nagar, Indore');
  const [propertyType, setPropertyType] = useState<'Residential' | 'Commercial'>('Residential');
  const [billRange, setBillRange] = useState(BILL_BRACKETS[2].value);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submittedMessage, setSubmittedMessage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleConsultationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateLeadForm({
      name,
      phone,
      cityArea,
      propertyType,
      monthlyBillRange: billRange,
    });

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    const msg = buildContactWhatsAppMessage({
      name: name.trim(),
      phone: phone.trim(),
      cityArea: cityArea.trim(),
      propertyType,
      monthlyBillRange: billRange,
      message: 'Requested Free Rooftop Solar Consultation from Hero Banner.',
    });

    const action = getWhatsAppAction(msg);
    if (action.isConfigured && action.href) {
      window.open(action.href, '_blank', 'noopener,noreferrer');
    } else {
      setSubmittedMessage(msg);
    }
  };

  const handleCopyMessage = async () => {
    if (!submittedMessage) return;
    try {
      await navigator.clipboard.writeText(submittedMessage);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Ignore clipboard failures
    }
  };

  return (
    <section className="relative bg-[#0A2540] text-white overflow-hidden border-b border-white/10">
      {/* Architectural Solar Background + Crisp Deep Navy Gradient */}
      <div className="absolute inset-0 z-0">
        <Image
          src={SOLAR_IMAGES.hero}
          alt="Engineered rooftop solar installation in Indore"
          fill
          priority
          className="object-cover object-center opacity-20"
          referrerPolicy="no-referrer"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(110deg, rgba(10,37,64,0.97) 0%, rgba(10,37,64,0.91) 55%, rgba(0,82,204,0.75) 100%)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column (7 cols): Value Proposition & Engineering Proof */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="lg:col-span-7 space-y-6"
          >
            {/* Unboxed Architectural Kicker */}
            <div className="border-l-2 border-[#FFB800] pl-3.5">
              <p className="font-mono text-xs sm:text-sm uppercase tracking-widest text-[#FFB800] font-semibold">
                Indore Rooftop Solar EPC · PM Surya Ghar Subsidy Up to ₹78,000*
              </p>
            </div>

            {/* Headline */}
            <h1 className="font-display font-bold text-3xl sm:text-5xl lg:text-[54px] tracking-tight leading-[1.08] text-white">
              Switch to Smarter{' '}
              <span className="text-[#FFB800]">Rooftop Solar</span> in Indore.
            </h1>

            {/* Subtitle */}
            <p className="text-slate-200 text-base sm:text-lg leading-relaxed max-w-2xl">
              Cut your monthly MPPKVVCL electricity bills by up to 90% with cyclone-tested solar mounting, transparent 6/36/60-month EMI plans, and complete net-metering assistance across Indore.
            </p>

            {/* Architectural Proof Strip (Hairline Grid with Tabular Numerals) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 border-y border-white/15 divide-y sm:divide-y-0 sm:divide-x divide-white/15 py-4">
              <div className="py-2 sm:py-0 sm:pr-5">
                <div className="font-display font-bold text-2xl sm:text-3xl text-[#FFB800] tabular-nums">
                  Up to ₹78,000*
                </div>
                <p className="text-xs text-slate-300 mt-1">
                  Direct PM Surya Ghar residential central subsidy
                </p>
              </div>

              <div className="py-2 sm:py-0 sm:px-5">
                <div className="font-display font-bold text-2xl sm:text-3xl text-white tabular-nums">
                  6 / 36 / 60 Mo
                </div>
                <p className="text-xs text-slate-300 mt-1">
                  Flexible EMI plans offset by monthly bill savings
                </p>
              </div>

              <div className="py-2 sm:py-0 sm:pl-5">
                <div className="font-display font-bold text-2xl sm:text-3xl text-white tabular-nums">
                  25-Year
                </div>
                <p className="text-xs text-slate-300 mt-1">
                  Module performance warranty & galvanized structure
                </p>
              </div>
            </div>

            {/* Secondary Action Link to Calculator */}
            <div className="pt-1 flex flex-wrap items-center gap-5">
              <Link
                href="#calculator"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl text-sm font-bold text-[#0A2540] bg-[#FFB800] hover:bg-[#E6A600] transition-all shadow-md"
              >
                <Calculator className="w-4 h-4" />
                <span>Calculate Your Savings & EMI</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <ShieldCheck className="w-4 h-4 text-[#FFB800] shrink-0" />
                <span>Free shadow-analysis & engineering visit across Indore</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column (5 cols): Embedded Consultation Form Banner */}
          <motion.div
            id="consultation-form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-5"
          >
            <div className="bg-white text-[#0A2540] rounded-2xl shadow-2xl border border-[#E2E8F0] p-6 sm:p-7">
              <div className="pb-4 mb-5 border-b border-[#E2E8F0]">
                <p className="text-[11px] font-mono uppercase tracking-widest font-semibold text-[#0052CC] mb-1">
                  Free Engineering Site Visit · Indore
                </p>
                <h2 className="font-display font-bold text-xl sm:text-2xl text-[#0A2540]">
                  Book a Free Solar Consultation
                </h2>
              </div>

              {submittedMessage ? (
                <div className="space-y-4 py-2" data-testid="hero-form-success">
                  <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div className="text-xs text-emerald-900">
                      <p className="font-bold text-sm">Consultation Summary Ready!</p>
                      <p className="mt-0.5">
                        Your inquiry details have been formatted for our Indore solar engineering desk.
                      </p>
                    </div>
                  </div>

                  <div className="bg-[#F4F7FB] p-3.5 rounded-xl border border-[#E2E8F0] text-xs font-mono text-[#0A2540] whitespace-pre-wrap">
                    {submittedMessage}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2.5">
                    <button
                      type="button"
                      onClick={handleCopyMessage}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-[#0052CC] hover:bg-[#003E99] transition-colors cursor-pointer"
                    >
                      {copied ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Copied Inquiry Text</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span>Copy Inquiry Details</span>
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => setSubmittedMessage(null)}
                      className="px-4 py-2.5 rounded-xl text-xs font-semibold text-[#475569] bg-[#F4F7FB] hover:bg-[#E2E8F0]/60 transition-colors cursor-pointer"
                    >
                      Edit Details
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleConsultationSubmit} className="space-y-4" noValidate>
                  {/* Property Type Switch */}
                  <div>
                    <label className="block text-xs font-semibold text-[#475569] mb-1.5">
                      Select Property Type
                    </label>
                    <div className="grid grid-cols-2 gap-2 p-1 bg-[#F4F7FB] rounded-xl border border-[#E2E8F0]">
                      <button
                        type="button"
                        onClick={() => setPropertyType('Residential')}
                        className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          propertyType === 'Residential'
                            ? 'bg-[#0052CC] text-white shadow-xs'
                            : 'text-[#475569] hover:text-[#0A2540]'
                        }`}
                      >
                        <Home className="w-3.5 h-3.5" />
                        <span>Home / Society</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setPropertyType('Commercial')}
                        className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          propertyType === 'Commercial'
                            ? 'bg-[#0052CC] text-white shadow-xs'
                            : 'text-[#475569] hover:text-[#0A2540]'
                        }`}
                      >
                        <Building2 className="w-3.5 h-3.5" />
                        <span>Commercial</span>
                      </button>
                    </div>
                  </div>

                  {/* Full Name & Phone Number */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label
                        htmlFor="hero-name"
                        className="block text-xs font-semibold text-[#0A2540] mb-1"
                      >
                        Full Name *
                      </label>
                      <input
                        id="hero-name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g., Rajesh Sharma"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#F4F7FB] border border-[#E2E8F0] text-sm text-[#0A2540] focus:outline-none focus:border-[#0052CC] focus:bg-white transition-colors"
                      />
                      {errors.name && (
                        <p className="text-[11px] text-red-600 mt-1">{errors.name}</p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="hero-phone"
                        className="block text-xs font-semibold text-[#0A2540] mb-1"
                      >
                        WhatsApp / Mobile *
                      </label>
                      <input
                        id="hero-phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="10-digit mobile"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#F4F7FB] border border-[#E2E8F0] text-sm text-[#0A2540] focus:outline-none focus:border-[#0052CC] focus:bg-white transition-colors"
                      />
                      {errors.phone && (
                        <p className="text-[11px] text-red-600 mt-1">{errors.phone}</p>
                      )}
                    </div>
                  </div>

                  {/* Locality / Pin Code in Indore */}
                  <div>
                    <label
                      htmlFor="hero-area"
                      className="block text-xs font-semibold text-[#0A2540] mb-1"
                    >
                      Locality / Pin Code in Indore *
                    </label>
                    <input
                      id="hero-area"
                      type="text"
                      value={cityArea}
                      onChange={(e) => setCityArea(e.target.value)}
                      placeholder="e.g., Vijay Nagar, Rau, Nipania (452010)"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#F4F7FB] border border-[#E2E8F0] text-sm text-[#0A2540] focus:outline-none focus:border-[#0052CC] focus:bg-white transition-colors"
                    />
                    {errors.cityArea && (
                      <p className="text-[11px] text-red-600 mt-1">{errors.cityArea}</p>
                    )}
                  </div>

                  {/* Monthly Electricity Bill Chips */}
                  <div>
                    <label className="block text-xs font-semibold text-[#0A2540] mb-1.5">
                      Average Monthly Electricity Bill *
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {BILL_BRACKETS.map((bracket) => {
                        const active = billRange === bracket.value;
                        return (
                          <button
                            key={bracket.label}
                            type="button"
                            onClick={() => setBillRange(bracket.value)}
                            className={`py-2 px-3 rounded-xl text-xs font-semibold border text-left transition-all flex items-center justify-between cursor-pointer ${
                              active
                                ? 'bg-[#0052CC]/10 border-[#0052CC] text-[#0052CC] font-bold'
                                : 'bg-[#F4F7FB] border-[#E2E8F0] text-[#475569] hover:border-slate-300'
                            }`}
                          >
                            <span>{bracket.label}</span>
                            {active && <CheckCircle2 className="w-3.5 h-3.5 text-[#0052CC] shrink-0" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <button
                    type="submit"
                    data-testid="hero-consultation-submit"
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-sm font-bold text-white bg-[#0052CC] hover:bg-[#003E99] transition-all shadow-md hover:shadow-lg cursor-pointer"
                  >
                    <span>Get Free Quote & Subsidy Check</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <p className="text-[11px] text-[#475569] text-center leading-normal">
                    *Subsidy subject to MNRE PM Surya Ghar portal norms & residential net-metering eligibility.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
