'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'motion/react';
import { MessageCircle, X } from 'lucide-react';
import { buildWhatsAppUrl, formatGeneralWhatsAppMessage } from '@/lib/whatsapp';

const POPUP_DISMISSED_KEY = 'ss_solar_wa_popup_dismissed';

export function WhatsAppButton() {
  const [showPopup, setShowPopup] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Only show optional gentle prompt after 12s dwell if user hasn't dismissed it
    try {
      if (window.sessionStorage.getItem(POPUP_DISMISSED_KEY) === '1') {
        return;
      }
    } catch {
      // Ignore storage restrictions
    }

    const timer = window.setTimeout(() => {
      setShowPopup(true);
    }, 12000);

    return () => window.clearTimeout(timer);
  }, []);

  const dismissPopup = () => {
    setShowPopup(false);
    try {
      window.sessionStorage.setItem(POPUP_DISMISSED_KEY, '1');
    } catch {
      // Ignore storage restrictions
    }
  };

  const whatsappUrl = buildWhatsAppUrl(formatGeneralWhatsAppMessage());

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3">
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.96 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            role="dialog"
            aria-label="Solar quick assistance"
            className="w-[268px] bg-white border border-[#E4E9E1] rounded-lg shadow-lg p-4 text-[#17251F]"
          >
            <div className="flex items-start justify-between gap-2 mb-2.5">
              <p className="font-display text-sm font-semibold text-[#102D26]">
                Hi! Looking for a solar solution?
              </p>
              <button
                type="button"
                onClick={dismissPopup}
                aria-label="Dismiss solar prompt"
                className="p-1 -m-1 text-[#64736C] hover:text-[#102D26] rounded transition-colors"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
            <p className="text-xs text-[#4F5E57] leading-relaxed mb-3.5">
              Explore your estimated rooftop savings or request a site consultation in Indore.
            </p>
            <div className="flex items-center gap-2">
              <Link
                href="/contact"
                onClick={dismissPopup}
                className="flex-1 inline-flex items-center justify-center px-3 py-2 text-xs font-semibold bg-[#F4B942] text-[#102D26] hover:bg-[#eab035] rounded-md transition-colors whitespace-nowrap"
              >
                Get a Quote
              </Link>
              <Link
                href="/#calculator"
                onClick={dismissPopup}
                className="flex-1 inline-flex items-center justify-center px-3 py-2 text-xs font-medium border border-[#E4E9E1] text-[#102D26] hover:bg-[#F4F6EF] rounded-md transition-colors whitespace-nowrap"
              >
                Calculate Savings
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div
        className="relative flex items-center"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <AnimatePresence>
          {isHovered && !showPopup && (
            <motion.span
              initial={{ opacity: 0, x: 6 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 6 }}
              transition={{ duration: 0.16 }}
              className="hidden sm:inline-block mr-3 px-3 py-1.5 text-xs font-medium text-white bg-[#102D26] rounded-md shadow-md whitespace-nowrap pointer-events-none"
            >
              Chat with us
            </motion.span>
          )}
        </AnimatePresence>

        <motion.a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with SS Solar on WhatsApp"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          className="inline-flex items-center justify-center w-13 h-13 rounded-full bg-[#25D366] text-white shadow-lg hover:bg-[#20bd5b] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#102D26]"
        >
          <MessageCircle className="w-6 h-6" aria-hidden="true" />
        </motion.a>
      </div>
    </div>
  );
}
