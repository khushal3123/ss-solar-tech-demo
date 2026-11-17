'use client';

import React, { useState } from 'react';
import { X, Check, Copy, ArrowRight } from 'lucide-react';
import { buildGeneralWhatsAppMessage, getWhatsAppAction } from '@/lib/whatsapp';
import { BRAND_CONFIG } from '@/lib/config';
import { motion, AnimatePresence } from 'motion/react';

/**
 * Authentic WhatsApp Logo SVG (handset inside speech bubble).
 */
export function WhatsAppSvgIcon({ className = 'w-7 h-7' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M16.004 3.2c-7.068 0-12.8 5.732-12.8 12.8 0 2.258.59 4.462 1.71 6.404L3.2 28.8l6.562-1.722a12.74 12.74 0 0 0 6.242 1.626h.006c7.066 0 12.796-5.732 12.796-12.8 0-3.42-1.332-6.636-3.75-9.054A12.716 12.716 0 0 0 16.004 3.2Zm0 23.344h-.004a10.6 10.6 0 0 1-5.404-1.48l-.388-.23-4.022 1.055 1.074-3.92-.252-.402a10.575 10.575 0 0 1-1.624-5.643c0-5.854 4.764-10.618 10.622-10.618 2.836 0 5.502 1.106 7.508 3.112a10.55 10.55 0 0 1 3.11 7.51c0 5.856-4.766 10.616-10.62 10.616Zm5.826-7.952c-.318-.16-1.888-.932-2.18-1.038-.292-.106-.504-.16-.716.16-.212.318-.824 1.038-1.01 1.25-.186.212-.372.238-.69.08-.318-.16-1.346-.496-2.564-1.582-.948-.846-1.588-1.89-1.774-2.208-.186-.318-.02-.49.14-.648.144-.142.318-.372.478-.558.16-.186.212-.318.318-.53.106-.212.053-.398-.026-.558-.08-.16-.716-1.726-.982-2.364-.258-.62-.522-.536-.716-.546-.186-.008-.398-.01-.61-.01-.212 0-.558.08-.85.398-.292.318-1.116 1.09-1.116 2.658 0 1.568 1.142 3.084 1.302 3.296.16.212 2.248 3.434 5.446 4.814.76.328 1.354.524 1.816.672.764.242 1.46.208 2.01.126.612-.092 1.888-.772 2.154-1.516.266-.744.266-1.382.186-1.514-.08-.132-.292-.212-.61-.372Z" />
    </svg>
  );
}

export default function WhatsAppButton() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const message = buildGeneralWhatsAppMessage();
  const action = getWhatsAppAction(message);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback ignored if clipboard blocked
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end">
      <AnimatePresence>
        {drawerOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="mb-4 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-[#E2E8F0] overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[#0A2540] text-white p-4 flex items-center justify-between border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#25D366] flex items-center justify-center text-white shadow-xs">
                  <WhatsAppSvgIcon className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-display font-bold text-sm block leading-tight">
                    SS Solar WhatsApp Desk
                  </span>
                  <span className="text-[11px] text-emerald-300 block mt-0.5">
                    Indore Rooftop Solar Support
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                className="text-slate-300 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
                aria-label="Close WhatsApp helper"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="p-4 space-y-3.5 bg-[#F4F7FB]">
              <p className="text-xs text-[#475569] leading-relaxed">
                Get an instant rooftop solar estimate, subsidy eligibility check, or free site survey in Indore:
              </p>
              <div className="bg-white p-3 rounded-xl border border-[#E2E8F0] text-xs font-mono text-[#0A2540] whitespace-pre-wrap shadow-2xs">
                {message}
              </div>

              {action.isConfigured && action.href ? (
                <a
                  href={action.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-[#25D366] hover:bg-[#20BD5A] transition-colors shadow-xs"
                >
                  <WhatsAppSvgIcon className="w-4 h-4" />
                  <span>Start Chat on WhatsApp</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              ) : (
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between text-[11px] text-[#475569] bg-white px-3 py-2 rounded-lg border border-[#E2E8F0]">
                    <span>Consultation Desk:</span>
                    <span className="font-mono font-semibold text-[#0A2540]">
                      {BRAND_CONFIG.whatsapp.startsWith('[PLACEHOLDER')
                        ? 'Indore EPC Support'
                        : BRAND_CONFIG.whatsapp}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={handleCopy}
                      className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-semibold text-[#0A2540] bg-white hover:bg-slate-50 border border-[#E2E8F0] transition-colors cursor-pointer"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Message</span>
                        </>
                      )}
                    </button>
                    <a
                      href="/#consultation-form"
                      onClick={() => setDrawerOpen(false)}
                      className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-semibold text-white bg-[#0052CC] hover:bg-[#003E99] transition-colors"
                    >
                      <span>Book Free Visit</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Animated WhatsApp Trigger Button */}
      <div className="relative flex items-center group">
        {/* Hover Tooltip */}
        <span className="hidden sm:inline-flex items-center mr-3 px-3.5 py-2 rounded-lg bg-[#0A2540] text-white text-xs font-semibold shadow-lg opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 pointer-events-none whitespace-nowrap">
          Chat on WhatsApp
        </span>

        {action.isConfigured && action.href ? (
          <a
            href={action.href}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="whatsapp-floating-btn"
            className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/35 hover:bg-[#20BD5A] focus:outline-none transition-transform hover:scale-105"
            aria-label="Chat with SS Solar on WhatsApp"
          >
            {/* Pulsing Concentric Ripple Rings */}
            <motion.span
              className="absolute inset-0 rounded-full bg-[#25D366] pointer-events-none"
              animate={{ scale: [1, 1.55], opacity: [0.55, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
            />
            <motion.span
              className="absolute inset-0 rounded-full bg-[#25D366] pointer-events-none"
              animate={{ scale: [1, 1.35], opacity: [0.4, 0] }}
              transition={{ duration: 2.2, delay: 0.7, repeat: Infinity, ease: 'easeOut' }}
            />
            {/* Periodic Gentle Attention Wave on Authentic WhatsApp Icon */}
            <motion.span
              className="relative z-10 flex items-center justify-center"
              animate={{ rotate: [0, -10, 10, -8, 8, 0], scale: [1, 1.08, 1] }}
              transition={{ duration: 1.4, repeat: Infinity, repeatDelay: 3.2, ease: 'easeInOut' }}
            >
              <WhatsAppSvgIcon className="w-7 h-7" />
            </motion.span>
          </a>
        ) : (
          <button
            type="button"
            onClick={() => setDrawerOpen(!drawerOpen)}
            data-testid="whatsapp-floating-btn"
            className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/35 hover:bg-[#20BD5A] focus:outline-none transition-transform hover:scale-105 cursor-pointer"
            aria-label="Open WhatsApp Solar Inquiry"
            aria-expanded={drawerOpen}
          >
            {/* Pulsing Concentric Ripple Rings */}
            <motion.span
              className="absolute inset-0 rounded-full bg-[#25D366] pointer-events-none"
              animate={{ scale: [1, 1.55], opacity: [0.55, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
            />
            <motion.span
              className="absolute inset-0 rounded-full bg-[#25D366] pointer-events-none"
              animate={{ scale: [1, 1.35], opacity: [0.4, 0] }}
              transition={{ duration: 2.2, delay: 0.7, repeat: Infinity, ease: 'easeOut' }}
            />
            {/* Periodic Gentle Attention Wave on Authentic WhatsApp Icon */}
            <motion.span
              className="relative z-10 flex items-center justify-center"
              animate={{ rotate: [0, -10, 10, -8, 8, 0], scale: [1, 1.08, 1] }}
              transition={{ duration: 1.4, repeat: Infinity, repeatDelay: 3.2, ease: 'easeInOut' }}
            >
              <WhatsAppSvgIcon className="w-7 h-7" />
            </motion.span>
          </button>
        )}
      </div>
    </div>
  );
}
