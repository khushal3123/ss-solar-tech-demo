import { z } from 'zod';

/**
 * Strips whitespace, hyphens, parentheses, and optional +91 / 91 / 0 country prefix.
 */
export function normalizeIndianPhone(raw: string): string {
  const digitsOnly = raw.replace(/[\s\-().+]/g, '');
  if (digitsOnly.startsWith('91') && digitsOnly.length === 12) {
    return digitsOnly.slice(2);
  }
  if (digitsOnly.startsWith('0') && digitsOnly.length === 11) {
    return digitsOnly.slice(1);
  }
  return digitsOnly;
}

/**
 * Validates Indian 10-digit mobile numbers (starting with 6, 7, 8, or 9).
 */
export function isValidIndianPhone(raw: string): boolean {
  const normalized = normalizeIndianPhone(raw);
  return /^[6-9]\d{9}$/.test(normalized);
}

export const contactFormSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, 'Please enter your full name (at least 2 characters).')
    .max(100, 'Name must be under 100 characters.'),
  phone: z
    .string()
    .trim()
    .min(1, 'Please enter your phone number.')
    .refine(isValidIndianPhone, {
      message: 'Please enter a valid 10-digit Indian mobile number (e.g. 9876543210 or +91 9876543210).',
    }),
  email: z
    .string()
    .trim()
    .refine(
      (val) => val === '' || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
      'Please enter a valid email address or leave this field blank.'
    ),
  cityArea: z
    .string()
    .trim()
    .min(2, 'Please enter your city or locality in Indore / MP.')
    .max(120, 'Location must be under 120 characters.'),
  propertyType: z.enum(['Residential', 'Commercial', 'Industrial'], {
    error: 'Please select a property type.',
  }),
  monthlyBill: z
    .string()
    .trim()
    .min(1, 'Please share your approximate monthly electricity bill (₹).')
    .refine(
      (val) => {
        const numeric = Number(val.replace(/[₹,\s]/g, ''));
        return Number.isFinite(numeric) && numeric > 0;
      },
      'Please enter a valid monthly electricity bill amount in ₹.'
    ),
  message: z
    .string()
    .trim()
    .max(1000, 'Message must be under 1000 characters.'),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
