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
    'I would like to book a FREE rooftop solar consultation in Indore.',
    'Please share details for a site visit and savings estimate.',
  ].join('\n');
}

export function formatCalculatorWhatsAppMessage(
  input: SolarCalculatorInput,
  result: SolarCalculatorResult
): string {
  const lines = [
    'Hello SS Solar Team, I used your Solar Savings & EMI Calculator and would like a personalized quote:',
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
    `• Recommended Capacity: ${result.recommendedCapacityKw} kW`,
    `• Est. Monthly Generation: ~${result.estimatedMonthlyGenerationKwh} units`,
    `• Est. Monthly Savings: ~${formatInr(result.estimatedMonthlySavingsInr)}/mo`,
    `• Est. Annual Savings: ~${formatInr(result.estimatedAnnualSavingsInr)}/yr`
  );

  if (result.indicativeSubsidyInr > 0) {
    lines.push(`• Indicative Subsidy Considered: ${formatInr(result.indicativeSubsidyInr)}`);
  }

  if (result.emi) {
    lines.push(
      `• Preferred EMI Tenure: ${result.emi.tenureMonths} Months (~${formatInr(result.emi.monthlyEmiInr)}/mo)`
    );
  }

  if (result.indicativePaybackYears !== null) {
    lines.push(`• Indicative Payback Estimate: ~${result.indicativePaybackYears} years`);
  }

  lines.push('', 'Please contact me to schedule a free site visit in Indore.');
  return lines.join('\n');
}

export function formatPackageWhatsAppMessage(
  packageName: string,
  exampleCapacity: string
): string {
  return [
    'Hello SS Solar Team,',
    `I am interested in the "${packageName}" (${exampleCapacity}) indicative solar package.`,
    'Could you share a customized quotation and arrange a free consultation?',
  ].join('\n');
}

export function formatContactWhatsAppMessage(data: ContactFormValues): string {
  const cleanPhone = normalizeIndianPhone(data.phone);
  const lines = [
    'Hello SS Solar Team, I would like to schedule a FREE solar consultation:',
    '',
    `• Full Name: ${data.fullName}`,
    `• Phone: +91 ${cleanPhone}`,
  ];

  if (data.email.trim()) {
    lines.push(`• Email: ${data.email.trim()}`);
  }

  lines.push(
    `• City / Area / Pin Code: ${data.cityArea}`,
    `• Property Type: ${data.propertyType}`,
    `• Monthly Electricity Bill: ${data.monthlyBill}`
  );

  if (data.message.trim()) {
    lines.push(`• Notes: ${data.message.trim()}`);
  }

  lines.push('', 'Looking forward to speaking with your Indore team.');
  return lines.join('\n');
}

export const buildGeneralWhatsAppMessage = formatGeneralWhatsAppMessage;

export function buildContactWhatsAppMessage(input: {
  name: string;
  phone: string;
  email?: string;
  cityArea: string;
  propertyType: string;
  monthlyBillRange: string;
  message?: string;
}): string {
  const cleanPhone = normalizeIndianPhone(input.phone);
  const lines = [
    'Hello SS Solar Team, I would like to schedule a FREE solar consultation:',
    '',
    `• Full Name: ${input.name}`,
    `• Phone: +91 ${cleanPhone}`,
  ];
  if (input.email) {
    lines.push(`• Email: ${input.email}`);
  }
  lines.push(
    `• Locality / Pin Code: ${input.cityArea}`,
    `• Property Type: ${input.propertyType}`,
    `• Monthly Electricity Bill: ${input.monthlyBillRange}`
  );
  if (input.message) {
    lines.push(`• Notes: ${input.message}`);
  }
  lines.push('', 'Looking forward to speaking with your Indore solar team.');
  return lines.join('\n');
}

export function buildCalculatorWhatsAppMessage(input: {
  monthlyBillInr: number;
  tariffPerUnitInr: number;
  propertyType: string;
  recommendedCapacityKw: number;
  estimatedMonthlySavingsInr: number;
  estimatedAnnualSavingsInr: number;
  indicativeSubsidyInr: number;
  netEstimatedSystemCostInr: number | null;
  preferredEmiTenureMonths: number;
  preferredMonthlyEmiInr: number;
}): string {
  const lines = [
    'Hello SS Solar Team, I used your Solar Savings & EMI Calculator and would like a personalized quote:',
    '',
    `• Property Type: ${input.propertyType}`,
    `• Monthly Electricity Bill: ${formatInr(input.monthlyBillInr)}`,
    `• Electricity Tariff: ₹${input.tariffPerUnitInr}/unit`,
    `• Recommended Capacity: ${input.recommendedCapacityKw} kW`,
    `• Est. Monthly Savings: ~${formatInr(input.estimatedMonthlySavingsInr)}/mo`,
    `• Est. Annual Savings: ~${formatInr(input.estimatedAnnualSavingsInr)}/yr`,
  ];

  if (input.indicativeSubsidyInr > 0) {
    lines.push(`• Indicative Subsidy Considered: ${formatInr(input.indicativeSubsidyInr)}`);
  }

  if (input.netEstimatedSystemCostInr !== null) {
    lines.push(`• Effective Net System Cost: ~${formatInr(input.netEstimatedSystemCostInr)}`);
  }

  if (input.preferredMonthlyEmiInr > 0) {
    lines.push(
      `• Preferred EMI Plan: ${input.preferredEmiTenureMonths} Months (~${formatInr(input.preferredMonthlyEmiInr)}/mo)`
    );
  }

  lines.push('', 'Please contact me to schedule a free rooftop survey in Indore.');
  return lines.join('\n');
}

export function getWhatsAppAction(message: string): {
  isConfigured: boolean;
  href: string | null;
} {
  const raw: string = SITE_CONFIG.contactPlaceholders.whatsapp;
  const isPlaceholder = raw.includes('PLACEHOLDER') || raw === '919999999999';
  if (isPlaceholder) {
    return {
      isConfigured: false,
      href: null,
    };
  }
  return {
    isConfigured: true,
    href: buildWhatsAppUrl(message, raw),
  };
}

