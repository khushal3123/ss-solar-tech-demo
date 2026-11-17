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
    <div className="bg-white border border-[#E4E9E1] rounded-lg p-6 sm:p-9">
      <div className="mb-7 pb-5 border-b border-[#E4E9E1]">
        <h2 className="font-display text-2xl font-bold text-[#102D26] mb-1.5">
          Request a Solar Consultation
        </h2>
        <p className="text-sm text-[#4F5E57]">
          Fill in your details below to prepare a formatted WhatsApp enquiry for the SS Solar team.
        </p>
      </div>

      {submittedPayload ? (
        <div
          role="status"
          aria-live="polite"
          className="space-y-5 bg-[#F4F6EF] border border-[#246B50]/30 rounded-lg p-6"
        >
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-6 h-6 text-[#246B50] shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <h3 className="font-display text-lg font-bold text-[#102D26]">
                Your WhatsApp Enquiry Message is Ready
              </h3>
              <p className="text-sm text-[#4F5E57] mt-1 leading-relaxed">
                This demo website does not submit messages automatically in the background. Click the button below to open WhatsApp with your details pre-filled, then press <strong>Send</strong> inside WhatsApp to complete your enquiry.
              </p>
            </div>
          </div>

          <div className="bg-white border border-[#E4E9E1] rounded-md p-4">
            <p className="text-xs font-semibold text-[#246B50] mb-2">
              Prepared WhatsApp Message Preview
            </p>
            <pre className="whitespace-pre-wrap font-sans text-xs sm:text-sm text-[#17251F] leading-relaxed">
              {submittedPayload.previewMessage}
            </pre>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <a
              href={submittedPayload.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold bg-[#25D366] text-[#102D26] hover:bg-[#20bd5b] rounded-md transition-colors whitespace-nowrap"
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
              className="inline-flex items-center justify-center px-5 py-3 text-sm font-medium border border-[#E4E9E1] bg-white text-[#102D26] hover:bg-[#F4F6EF] rounded-md transition-colors"
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
                className="block text-sm font-semibold text-[#102D26] mb-1.5"
              >
                Full Name <span className="text-[#246B50]">*</span>
              </label>
              <input
                id="contact-fullName"
                type="text"
                autoComplete="name"
                aria-invalid={Boolean(errors.fullName)}
                {...register('fullName')}
                placeholder="e.g. Rajesh Verma"
                className={cn(
                  'w-full px-3.5 py-2.5 text-sm text-[#102D26] bg-[#F4F6EF]/60 border rounded-md focus:outline-none focus:bg-white transition-colors',
                  errors.fullName ? 'border-red-600' : 'border-[#E4E9E1] focus:border-[#246B50]'
                )}
              />
              {errors.fullName && (
                <p role="alert" className="mt-1.5 flex items-center gap-1.5 text-xs text-red-700">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  <span>{errors.fullName.message}</span>
                </p>
              )}
            </div>

            {/* Phone Number */}
            <div>
              <label
                htmlFor="contact-phone"
                className="block text-sm font-semibold text-[#102D26] mb-1.5"
              >
                Phone Number (India) <span className="text-[#246B50]">*</span>
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
                  'w-full px-3.5 py-2.5 text-sm text-[#102D26] bg-[#F4F6EF]/60 border rounded-md tabular-nums focus:outline-none focus:bg-white transition-colors',
                  errors.phone ? 'border-red-600' : 'border-[#E4E9E1] focus:border-[#246B50]'
                )}
              />
              {errors.phone && (
                <p role="alert" className="mt-1.5 flex items-center gap-1.5 text-xs text-red-700">
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
                className="block text-sm font-semibold text-[#102D26] mb-1.5"
              >
                Email Address
                <span className="ml-1.5 text-xs font-normal text-[#64736C]">Optional</span>
              </label>
              <input
                id="contact-email"
                type="email"
                autoComplete="email"
                aria-invalid={Boolean(errors.email)}
                {...register('email')}
                placeholder="you@example.com"
                className={cn(
                  'w-full px-3.5 py-2.5 text-sm text-[#102D26] bg-[#F4F6EF]/60 border rounded-md focus:outline-none focus:bg-white transition-colors',
                  errors.email ? 'border-red-600' : 'border-[#E4E9E1] focus:border-[#246B50]'
                )}
              />
              {errors.email && (
                <p role="alert" className="mt-1.5 flex items-center gap-1.5 text-xs text-red-700">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  <span>{errors.email.message}</span>
                </p>
              )}
            </div>

            {/* City / Area */}
            <div>
              <label
                htmlFor="contact-cityArea"
                className="block text-sm font-semibold text-[#102D26] mb-1.5"
              >
                City / Area <span className="text-[#246B50]">*</span>
              </label>
              <input
                id="contact-cityArea"
                type="text"
                aria-invalid={Boolean(errors.cityArea)}
                {...register('cityArea')}
                placeholder="e.g. Vijay Nagar, Indore"
                className={cn(
                  'w-full px-3.5 py-2.5 text-sm text-[#102D26] bg-[#F4F6EF]/60 border rounded-md focus:outline-none focus:bg-white transition-colors',
                  errors.cityArea ? 'border-red-600' : 'border-[#E4E9E1] focus:border-[#246B50]'
                )}
              />
              {errors.cityArea && (
                <p role="alert" className="mt-1.5 flex items-center gap-1.5 text-xs text-red-700">
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
                className="block text-sm font-semibold text-[#102D26] mb-1.5"
              >
                Property Type <span className="text-[#246B50]">*</span>
              </label>
              <select
                id="contact-propertyType"
                aria-invalid={Boolean(errors.propertyType)}
                {...register('propertyType')}
                className="w-full px-3.5 py-2.5 text-sm text-[#102D26] bg-[#F4F6EF]/60 border border-[#E4E9E1] rounded-md focus:outline-none focus:border-[#246B50] focus:bg-white transition-colors"
              >
                <option value="Residential">Residential</option>
                <option value="Commercial">Commercial</option>
                <option value="Industrial">Industrial</option>
              </select>
            </div>

            {/* Monthly Electricity Bill */}
            <div>
              <label
                htmlFor="contact-monthlyBill"
                className="block text-sm font-semibold text-[#102D26] mb-1.5"
              >
                Monthly Electricity Bill (₹) <span className="text-[#246B50]">*</span>
              </label>
              <input
                id="contact-monthlyBill"
                type="text"
                inputMode="numeric"
                aria-invalid={Boolean(errors.monthlyBill)}
                {...register('monthlyBill')}
                placeholder="e.g. 4500"
                className={cn(
                  'w-full px-3.5 py-2.5 text-sm text-[#102D26] bg-[#F4F6EF]/60 border rounded-md tabular-nums focus:outline-none focus:bg-white transition-colors',
                  errors.monthlyBill ? 'border-red-600' : 'border-[#E4E9E1] focus:border-[#246B50]'
                )}
              />
              {errors.monthlyBill && (
                <p role="alert" className="mt-1.5 flex items-center gap-1.5 text-xs text-red-700">
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
              className="block text-sm font-semibold text-[#102D26] mb-1.5"
            >
              Message / Rooftop Notes
            </label>
            <textarea
              id="contact-message"
              rows={4}
              {...register('message')}
              placeholder="Share any details about your roof type, preferred timing for a site visit, or questions..."
              className="w-full px-3.5 py-2.5 text-sm text-[#102D26] bg-[#F4F6EF]/60 border border-[#E4E9E1] rounded-md focus:outline-none focus:border-[#246B50] focus:bg-white transition-colors resize-y"
            />
          </div>

          <div className="pt-2 space-y-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm sm:text-base font-semibold text-[#102D26] bg-[#F4B942] hover:bg-[#eab035] rounded-md transition-colors disabled:opacity-60"
            >
              <MessageCircle className="w-4 h-4" aria-hidden="true" />
              <span>Prepare WhatsApp Enquiry</span>
            </button>
            <p className="text-xs text-[#64736C] leading-relaxed">
              Submitting prepares your formatted enquiry for WhatsApp. You will be asked to press Send inside WhatsApp to transmit your message.
            </p>
          </div>
        </form>
      )}
    </div>
  );
}
