'use client';

import React, { useState } from 'react';
import {
  Send,
  CheckCircle2,
  Copy,
  Check,
  MapPin,
  Phone,
  Mail,
  Clock,
} from 'lucide-react';
import { BRAND_CONFIG } from '@/lib/config';
import { validateLeadForm } from '@/lib/validation';
import { buildContactWhatsAppMessage, getWhatsAppAction } from '@/lib/whatsapp';

const BILL_RANGES = [
  'Under ₹2,000/month',
  '₹2,000 - ₹4,000/month',
  '₹4,000 - ₹8,000/month',
  '₹8,000 - ₹20,000/month',
  'Above ₹20,000/month',
];

export default function ContactForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [cityArea, setCityArea] = useState('Indore');
  const [propertyType, setPropertyType] = useState<'Residential' | 'Commercial'>('Residential');
  const [monthlyBillRange, setMonthlyBillRange] = useState(BILL_RANGES[2]);
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [preparedMessage, setPreparedMessage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateLeadForm({
      name,
      phone,
      email,
      cityArea,
      propertyType,
      monthlyBillRange,
      message,
    });

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    const formatted = buildContactWhatsAppMessage({
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim() || undefined,
      cityArea: cityArea.trim(),
      propertyType,
      monthlyBillRange,
      message: message.trim() || undefined,
    });

    const action = getWhatsAppAction(formatted);
    if (action.isConfigured && action.href) {
      window.open(action.href, '_blank', 'noopener,noreferrer');
    } else {
      setPreparedMessage(formatted);
    }
  };

  const handleCopy = async () => {
    if (!preparedMessage) return;
    try {
      await navigator.clipboard.writeText(preparedMessage);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Ignore clipboard failures
    }
  };

  return (
    <section className="py-16 sm:py-24 bg-[#F4F7FB]">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column (5 cols): Contact Information */}
          <div className="lg:col-span-5 bg-[#0A2540] text-white rounded-2xl p-7 sm:p-9 space-y-6 flex flex-col justify-between">
            <div className="space-y-5">
              <p className="text-xs font-mono uppercase tracking-widest text-[#FFB800] font-semibold">
                Indore Consultation Desk
              </p>
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-white">
                Speak with a Solar Engineer
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                Share your locality and approximate monthly electricity bill. We will prepare a custom rooftop capacity, subsidy, and EMI estimate before visiting your site.
              </p>

              <div className="space-y-4 pt-4 border-t border-white/10 text-sm">
                <div className="flex items-start gap-3.5">
                  <MapPin className="w-5 h-5 text-[#FFB800] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-mono uppercase text-slate-400 block">
                      Service Coverage
                    </span>
                    <span className="font-semibold text-white">
                      {BRAND_CONFIG.serviceArea}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Phone className="w-5 h-5 text-[#FFB800] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-mono uppercase text-slate-400 block">
                      Phone / WhatsApp Consultation
                    </span>
                    <span className="font-semibold text-white">
                      {BRAND_CONFIG.phone.startsWith('[PLACEHOLDER')
                        ? 'Direct Engineer Callback via Form'
                        : BRAND_CONFIG.phone}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Mail className="w-5 h-5 text-[#FFB800] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-mono uppercase text-slate-400 block">
                      Project Desk
                    </span>
                    <span className="font-semibold text-white">
                      {BRAND_CONFIG.email.startsWith('[PLACEHOLDER')
                        ? 'Indore Residential & Commercial EPC Desk'
                        : BRAND_CONFIG.email}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Clock className="w-5 h-5 text-[#FFB800] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-mono uppercase text-slate-400 block">
                      Working Hours
                    </span>
                    <span className="text-white">{BRAND_CONFIG.workingHours}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (7 cols): Form */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-[#E2E8F0] shadow-xs p-7 sm:p-9">
            <h3 className="font-display font-bold text-2xl text-[#0A2540] mb-6">
              Request Your Free Rooftop Survey
            </h3>

            {preparedMessage ? (
              <div className="space-y-5">
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div className="text-sm text-emerald-900">
                    <p className="font-bold">Consultation Request Ready</p>
                    <p className="text-xs mt-1">
                      Copy your formatted inquiry below to share with our Indore solar engineering team on WhatsApp or email.
                    </p>
                  </div>
                </div>

                <div className="bg-[#F4F7FB] p-4 rounded-xl border border-[#E2E8F0] font-mono text-xs text-[#0A2540] whitespace-pre-wrap">
                  {preparedMessage}
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#0052CC] hover:bg-[#003E99] transition-colors"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copy Inquiry Text</span>
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreparedMessage(null)}
                    className="px-4 py-2.5 rounded-xl text-xs font-semibold text-[#475569] bg-[#F4F7FB] hover:bg-[#E2E8F0]/60 transition-colors"
                  >
                    Modify Details
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-semibold text-[#0A2540] mb-1.5"
                    >
                      Full Name *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your full name"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#F4F7FB] border border-[#E2E8F0] text-sm text-[#0A2540] focus:outline-none focus:border-[#0052CC]"
                    />
                    {errors.name && (
                      <p className="text-xs text-red-600 mt-1">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="contact-phone"
                      className="block text-xs font-semibold text-[#0A2540] mb-1.5"
                    >
                      Phone / WhatsApp Number *
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="10-digit mobile number"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#F4F7FB] border border-[#E2E8F0] text-sm text-[#0A2540] focus:outline-none focus:border-[#0052CC]"
                    />
                    {errors.phone && (
                      <p className="text-xs text-red-600 mt-1">{errors.phone}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-semibold text-[#0A2540] mb-1.5"
                    >
                      Email Address (Optional)
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#F4F7FB] border border-[#E2E8F0] text-sm text-[#0A2540] focus:outline-none focus:border-[#0052CC]"
                    />
                    {errors.email && (
                      <p className="text-xs text-red-600 mt-1">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="contact-area"
                      className="block text-xs font-semibold text-[#0A2540] mb-1.5"
                    >
                      City / Locality in Indore *
                    </label>
                    <input
                      id="contact-area"
                      type="text"
                      value={cityArea}
                      onChange={(e) => setCityArea(e.target.value)}
                      placeholder="e.g., Vijay Nagar, Rau, Saket"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#F4F7FB] border border-[#E2E8F0] text-sm text-[#0A2540] focus:outline-none focus:border-[#0052CC]"
                    />
                    {errors.cityArea && (
                      <p className="text-xs text-red-600 mt-1">{errors.cityArea}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="contact-property-type"
                      className="block text-xs font-semibold text-[#0A2540] mb-1.5"
                    >
                      Property Type *
                    </label>
                    <select
                      id="contact-property-type"
                      value={propertyType}
                      onChange={(e) =>
                        setPropertyType(e.target.value as 'Residential' | 'Commercial')
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-[#F4F7FB] border border-[#E2E8F0] text-sm text-[#0A2540] focus:outline-none focus:border-[#0052CC]"
                    >
                      <option value="Residential">Residential (Home / Society)</option>
                      <option value="Commercial">Commercial / Industrial</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-bill-range"
                      className="block text-xs font-semibold text-[#0A2540] mb-1.5"
                    >
                      Average Monthly Electricity Bill *
                    </label>
                    <select
                      id="contact-bill-range"
                      value={monthlyBillRange}
                      onChange={(e) => setMonthlyBillRange(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#F4F7FB] border border-[#E2E8F0] text-sm text-[#0A2540] focus:outline-none focus:border-[#0052CC]"
                    >
                      {BILL_RANGES.map((range) => (
                        <option key={range} value={range}>
                          {range}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-semibold text-[#0A2540] mb-1.5"
                  >
                    Additional Roof or Sanctioned Load Details (Optional)
                  </label>
                  <textarea
                    id="contact-message"
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Mention roof type, sanctioned load (kW), or preferred time for site survey..."
                    className="w-full px-4 py-2.5 rounded-xl bg-[#F4F7FB] border border-[#E2E8F0] text-sm text-[#0A2540] focus:outline-none focus:border-[#0052CC]"
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold text-white bg-[#0052CC] hover:bg-[#003E99] transition-colors shadow-sm cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Solar Consultation Request</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
