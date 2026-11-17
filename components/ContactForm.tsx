'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle2, ExternalLink, MessageCircle, AlertCircle } from 'lucide-react';
import { contactFormSchema, type ContactFormValues } from '@/lib/validation';
import { buildWhatsAppUrl, formatContactWhatsAppMessage } from '@/lib/whatsapp';
import { cn } from '@/lib/utils';

export function ContactForm() {
  const [submittedPayload, setSubmittedPayload] = useState<{
    whatsappUrl: string;
    previewMessage: string;
  } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      fullName: '',
      phone: '',
      email: '',
      cityArea: 'Indore',
      propertyType: 'Residential',
      monthlyBill: '',
      message: '',
    },
  });

  const onSubmit = (data: ContactFormValues) => {
    const formattedMessage = formatContactWhatsAppMessage(data);
    const whatsappUrl = buildWhatsAppUrl(formattedMessage);
    setSubmittedPayload({
      whatsappUrl,
      previewMessage: formattedMessage,
    });
  };

  return (
    <div className="bg-white/5 backdrop-blur-lg border border-white/15 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)] rounded-2xl p-6 sm:p-9 text-white">
      <div className="mb-7 pb-5 border-b border-white/15">
        <h2 className="font-display text-2xl font-bold text-white mb-1.5">
          Request a Solar Consultation
        </h2>
        <p className="text-sm text-white/75">
          Fill in your details below to prepare a formatted WhatsApp enquiry for the SS Solar team.
        </p>
      </div>

      {submittedPayload ? (
        <div
          role="status"
          aria-live="polite"
          className="space-y-5 bg-white/5 backdrop-blur-md border border-[#F4B942]/35 rounded-xl p-6"
        >
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-6 h-6 text-[#F4B942] shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <h3 className="font-display text-lg font-bold text-white">
                Your WhatsApp Enquiry Message is Ready
              </h3>
              <p className="text-sm text-white/80 mt-1 leading-relaxed">
                This demo website does not submit messages automatically in the background. Click the button below to open WhatsApp with your details pre-filled, then press <strong>Send</strong> inside WhatsApp to complete your enquiry.
              </p>
            </div>
          </div>

          <div className="bg-[#0B1F1C]/80 border border-white/15 rounded-lg p-4">
            <p className="text-xs font-semibold text-[#F4B942] mb-2">
              Prepared WhatsApp Message Preview
            </p>
            <pre className="whitespace-pre-wrap font-sans text-xs sm:text-sm text-white/90 leading-relaxed">
              {submittedPayload.previewMessage}
            </pre>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <a
              href={submittedPayload.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold bg-[#F4B942] text-[#102D26] hover:bg-[#eab035] rounded-lg transition-colors whitespace-nowrap"
            >
              <MessageCircle className="w-4 h-4" aria-hidden="true" />
              <span>Open WhatsApp &amp; Press Send</span>
              <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
            <button
              type="button"
              onClick={() => {
                setSubmittedPayload(null);
                reset();
              }}
              className="inline-flex items-center justify-center px-5 py-3 text-sm font-medium border border-white/20 bg-white/10 text-white hover:bg-white/15 rounded-lg transition-colors"
            >
              Edit or Submit Another Enquiry
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Full Name */}
            <div>
              <label
                htmlFor="contact-fullName"
                className="block text-sm font-semibold text-white mb-1.5"
              >
                Full Name <span className="text-[#F4B942]">*</span>
              </label>
              <input
                id="contact-fullName"
                type="text"
                autoComplete="name"
                aria-invalid={Boolean(errors.fullName)}
                {...register('fullName')}
                placeholder="e.g. Rajesh Verma"
                className={cn(
                  'w-full px-3.5 py-2.5 text-sm text-white placeholder:text-white/50 bg-white/10 backdrop-blur-md border rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-400/50 transition-colors',
                  errors.fullName ? 'border-red-400' : 'border-white/20 focus:border-amber-400'
                )}
              />
              {errors.fullName && (
                <p role="alert" className="mt-1.5 flex items-center gap-1.5 text-xs text-red-300">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  <span>{errors.fullName.message}</span>
                </p>
              )}
            </div>

            {/* Phone Number */}
            <div>
              <label
                htmlFor="contact-phone"
                className="block text-sm font-semibold text-white mb-1.5"
              >
                Phone Number (India) <span className="text-[#F4B942]">*</span>
              </label>
              <input
                id="contact-phone"
                type="tel"
                autoComplete="tel"
                inputMode="tel"
                aria-invalid={Boolean(errors.phone)}
                {...register('phone')}
                placeholder="e.g. 9876543210"
                className={cn(
                  'w-full px-3.5 py-2.5 text-sm text-white placeholder:text-white/50 bg-white/10 backdrop-blur-md border rounded-lg tabular-nums focus:outline-none focus:ring-1 focus:ring-amber-400/50 transition-colors',
                  errors.phone ? 'border-red-400' : 'border-white/20 focus:border-amber-400'
                )}
              />
              {errors.phone && (
                <p role="alert" className="mt-1.5 flex items-center gap-1.5 text-xs text-red-300">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  <span>{errors.phone.message}</span>
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Email Address (Optional) */}
            <div>
              <label
                htmlFor="contact-email"
                className="block text-sm font-semibold text-white mb-1.5"
              >
                Email Address
                <span className="ml-1.5 text-xs font-normal text-white/60">Optional</span>
              </label>
              <input
                id="contact-email"
                type="email"
                autoComplete="email"
                aria-invalid={Boolean(errors.email)}
                {...register('email')}
                placeholder="you@example.com"
                className={cn(
                  'w-full px-3.5 py-2.5 text-sm text-white placeholder:text-white/50 bg-white/10 backdrop-blur-md border rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-400/50 transition-colors',
                  errors.email ? 'border-red-400' : 'border-white/20 focus:border-amber-400'
                )}
              />
              {errors.email && (
                <p role="alert" className="mt-1.5 flex items-center gap-1.5 text-xs text-red-300">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  <span>{errors.email.message}</span>
                </p>
              )}
            </div>

            {/* City / Area */}
            <div>
              <label
                htmlFor="contact-cityArea"
                className="block text-sm font-semibold text-white mb-1.5"
              >
                City / Area <span className="text-[#F4B942]">*</span>
              </label>
              <input
                id="contact-cityArea"
                type="text"
                aria-invalid={Boolean(errors.cityArea)}
                {...register('cityArea')}
                placeholder="e.g. Vijay Nagar, Indore"
                className={cn(
                  'w-full px-3.5 py-2.5 text-sm text-white placeholder:text-white/50 bg-white/10 backdrop-blur-md border rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-400/50 transition-colors',
                  errors.cityArea ? 'border-red-400' : 'border-white/20 focus:border-amber-400'
                )}
              />
              {errors.cityArea && (
                <p role="alert" className="mt-1.5 flex items-center gap-1.5 text-xs text-red-300">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  <span>{errors.cityArea.message}</span>
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Property Type */}
            <div>
              <label
                htmlFor="contact-propertyType"
                className="block text-sm font-semibold text-white mb-1.5"
              >
                Property Type <span className="text-[#F4B942]">*</span>
              </label>
              <select
                id="contact-propertyType"
                aria-invalid={Boolean(errors.propertyType)}
                {...register('propertyType')}
                className="w-full px-3.5 py-2.5 text-sm text-white bg-white/10 backdrop-blur-md border border-white/20 rounded-lg focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50 transition-colors"
              >
                <option value="Residential" className="bg-[#0F2626] text-white">
                  Residential
                </option>
                <option value="Commercial" className="bg-[#0F2626] text-white">
                  Commercial
                </option>
                <option value="Industrial" className="bg-[#0F2626] text-white">
                  Industrial
                </option>
              </select>
            </div>

            {/* Monthly Electricity Bill */}
            <div>
              <label
                htmlFor="contact-monthlyBill"
                className="block text-sm font-semibold text-white mb-1.5"
              >
                Monthly Electricity Bill (₹) <span className="text-[#F4B942]">*</span>
              </label>
              <input
                id="contact-monthlyBill"
                type="text"
                inputMode="numeric"
                aria-invalid={Boolean(errors.monthlyBill)}
                {...register('monthlyBill')}
                placeholder="e.g. 4500"
                className={cn(
                  'w-full px-3.5 py-2.5 text-sm text-white placeholder:text-white/50 bg-white/10 backdrop-blur-md border rounded-lg tabular-nums focus:outline-none focus:ring-1 focus:ring-amber-400/50 transition-colors',
                  errors.monthlyBill ? 'border-red-400' : 'border-white/20 focus:border-amber-400'
                )}
              />
              {errors.monthlyBill && (
                <p role="alert" className="mt-1.5 flex items-center gap-1.5 text-xs text-red-300">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  <span>{errors.monthlyBill.message}</span>
                </p>
              )}
            </div>
          </div>

          {/* Message */}
          <div>
            <label
              htmlFor="contact-message"
              className="block text-sm font-semibold text-white mb-1.5"
            >
              Message / Rooftop Notes
            </label>
            <textarea
              id="contact-message"
              rows={4}
              {...register('message')}
              placeholder="Share any details about your roof type, preferred timing for a site visit, or questions..."
              className="w-full px-3.5 py-2.5 text-sm text-white placeholder:text-white/50 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50 transition-colors resize-y"
            />
          </div>

          <div className="pt-2 space-y-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm sm:text-base font-semibold text-[#102D26] bg-[#F4B942] hover:bg-[#eab035] rounded-lg shadow-[0_4px_20px_rgba(244,185,66,0.28)] transition-all duration-200 disabled:opacity-60"
            >
              <MessageCircle className="w-4 h-4" aria-hidden="true" />
              <span>Prepare WhatsApp Enquiry</span>
            </button>
            <p className="text-xs text-white/65 leading-relaxed">
              Submitting prepares your formatted enquiry for WhatsApp. You will be asked to press Send inside WhatsApp to transmit your message.
            </p>
          </div>
        </form>
      )}
    </div>
  );
}
