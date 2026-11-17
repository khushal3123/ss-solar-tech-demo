import { SITE_CONFIG } from './config';
import { formatInr, type SolarCalculatorInput, type SolarCalculatorResult } from './calculator';
import type { ContactFormValues } from './validation';
import { normalizeIndianPhone } from './validation';

export function buildWhatsAppUrl(
  message: string,
  phoneNumber: string = SITE_CONFIG.whatsappNumber
): string {
  const cleanNumber = phoneNumber.replace(/[^\d]/g, '');
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
}

export function formatGeneralWhatsAppMessage(): string {
  return [
    'Hello SS Solar Team,',
    'I would like to enquire about rooftop solar installation in Indore.',
    'Please share details for a consultation.',
  ].join('\n');
}

export function formatCalculatorWhatsAppMessage(
  input: SolarCalculatorInput,
  result: SolarCalculatorResult
): string {
  const lines = [
    'Hello SS Solar Team, I used your Solar Savings Calculator and would like a personalized quote:',
    '',
    `• Property Type: ${input.propertyType}`,
    `• Monthly Electricity Bill: ${formatInr(result.effectiveMonthlyBillInr)}`,
    `• Electricity Tariff: ₹${input.tariffPerUnitInr}/unit`,
    `• Est. Monthly Usage: ${result.effectiveMonthlyUnits} units`,
  ];

  if (input.availableRooftopSqFt && input.availableRooftopSqFt > 0) {
    lines.push(`• Available Rooftop Area: ${input.availableRooftopSqFt} sq. ft.`);
  }

  lines.push(
    `• Recommended Indicative Capacity: ${result.recommendedCapacityKw} kW`,
    `• Est. Monthly Generation: ~${result.estimatedMonthlyGenerationKwh} units`,
    `• Est. Monthly Savings: ~${formatInr(result.estimatedMonthlySavingsInr)}`,
    `• Est. Annual Savings: ~${formatInr(result.estimatedAnnualSavingsInr)}`
  );

  if (result.indicativePaybackYears !== null) {
    lines.push(`• Indicative Payback Estimate: ~${result.indicativePaybackYears} years`);
  }

  lines.push('', 'Please contact me to discuss a site assessment in Indore.');
  return lines.join('\n');
}

export function formatPackageWhatsAppMessage(
  packageName: string,
  exampleCapacity: string
): string {
  return [
    'Hello SS Solar Team,',
    `I am interested in the "${packageName}" (${exampleCapacity}) indicative solar package.`,
    'Could you share a customized quotation and arrange a consultation?',
  ].join('\n');
}

export function formatContactWhatsAppMessage(data: ContactFormValues): string {
  const cleanPhone = normalizeIndianPhone(data.phone);
  const lines = [
    'Hello SS Solar Team, here are my solar enquiry details:',
    '',
    `• Full Name: ${data.fullName}`,
    `• Phone: +91 ${cleanPhone}`,
  ];

  if (data.email.trim()) {
    lines.push(`• Email: ${data.email.trim()}`);
  }

  lines.push(
    `• City / Area: ${data.cityArea}`,
    `• Property Type: ${data.propertyType}`,
    `• Monthly Electricity Bill: ₹${data.monthlyBill.replace(/[₹,\s]/g, '')}`
  );

  if (data.message.trim()) {
    lines.push(`• Message: ${data.message.trim()}`);
  }

  lines.push('', 'Looking forward to hearing from you.');
  return lines.join('\n');
}
