import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateSolarEstimate,
  calculateIndicativeSubsidyInr,
  calculateEmiBreakdown,
  roundToStep,
} from './calculator';
import { CALCULATOR_CONFIG } from './config';
import { isValidIndianPhone, normalizeIndianPhone, contactFormSchema } from './validation';
import {
  buildWhatsAppUrl,
  formatCalculatorWhatsAppMessage,
  formatContactWhatsAppMessage,
  formatPackageWhatsAppMessage,
} from './whatsapp';

test('roundToStep rounds accurately to 0.5 kW increments', () => {
  assert.equal(roundToStep(4.68, 0.5), 4.5);
  assert.equal(roundToStep(4.76, 0.5), 5);
  assert.equal(roundToStep(0, 0.5), 0);
});

test('calculateIndicativeSubsidyInr computes PM Surya Ghar tiers for Residential only', () => {
  assert.equal(calculateIndicativeSubsidyInr(1, 'Residential', true), 30000);
  assert.equal(calculateIndicativeSubsidyInr(2, 'Residential', true), 60000);
  assert.equal(calculateIndicativeSubsidyInr(3, 'Residential', true), 78000);
  assert.equal(calculateIndicativeSubsidyInr(5, 'Residential', true), 78000);
  assert.equal(calculateIndicativeSubsidyInr(5, 'Residential', false), 0);
  assert.equal(calculateIndicativeSubsidyInr(10, 'Commercial', true), 0);
});

test('calculateEmiBreakdown computes 6, 36, and 60 month EMI plans', () => {
  const emi6 = calculateEmiBreakdown(200000, 6);
  assert.ok(emi6);
  assert.equal(emi6.downPaymentInr, 40000);
  assert.equal(emi6.loanAmountInr, 160000);
  assert.equal(emi6.monthlyEmiInr, 26667);

  const emi36 = calculateEmiBreakdown(200000, 36);
  assert.ok(emi36);
  assert.equal(emi36.tenureMonths, 36);
  assert.ok(emi36.monthlyEmiInr > 5000 && emi36.monthlyEmiInr < 5300);

  const emi60 = calculateEmiBreakdown(200000, 60);
  assert.ok(emi60);
  assert.equal(emi60.tenureMonths, 60);
  assert.ok(emi60.monthlyEmiInr > 3300 && emi60.monthlyEmiInr < 3500);
});

test('calculateSolarEstimate computes expected Residential and Commercial presets with bill-capped savings and EMI', () => {
  const resDefault = calculateSolarEstimate({
    monthlyBillInr: 4500,
    tariffPerUnitInr: 8,
    propertyType: 'Residential',
    applySubsidy: true,
    emiTenureMonths: 36,
  });

  assert.equal(resDefault.hasValidInput, true);
  assert.equal(resDefault.effectiveMonthlyUnits, 563);
  assert.equal(resDefault.recommendedCapacityKw, 5);
  assert.equal(resDefault.estimatedMonthlyGenerationKwh, 600);
  // Monthly savings capped at entered ₹4,500 bill
  assert.equal(resDefault.estimatedMonthlySavingsInr, 4500);
  assert.equal(resDefault.estimatedAnnualSavingsInr, 54000);
  assert.equal(resDefault.estimatedSystemCostInr, 275000);
  assert.equal(resDefault.indicativeSubsidyInr, 78000);
  assert.equal(resDefault.netEstimatedSystemCostInr, 197000);
  assert.equal(resDefault.indicativePaybackYears, 3.6);
  assert.ok(resDefault.emi !== null);
  assert.equal(resDefault.emi.tenureMonths, 36);

  const comDefault = calculateSolarEstimate({
    monthlyBillInr: 25000,
    tariffPerUnitInr: 10,
    propertyType: 'Commercial',
    emiTenureMonths: 60,
  });

  assert.equal(comDefault.hasValidInput, true);
  assert.equal(comDefault.effectiveMonthlyUnits, 2500);
  assert.equal(comDefault.recommendedCapacityKw, 20);
  assert.equal(comDefault.estimatedMonthlyGenerationKwh, 2500);
  assert.equal(comDefault.estimatedMonthlySavingsInr, 25000);
  assert.equal(comDefault.estimatedAnnualSavingsInr, 300000);
  assert.equal(comDefault.estimatedSystemCostInr, 1000000);
  assert.equal(comDefault.indicativeSubsidyInr, 0);
  assert.equal(comDefault.indicativePaybackYears, 3.3);
  assert.equal(comDefault.emi?.tenureMonths, 60);
});

test('calculateSolarEstimate omits payback when installation cost is null', () => {
  const result = calculateSolarEstimate(
    {
      monthlyBillInr: 3600,
      tariffPerUnitInr: 8,
      propertyType: 'Residential',
    },
    {
      ...CALCULATOR_CONFIG,
      estimatedCostPerKwInr: null,
    }
  );

  assert.equal(result.hasValidInput, true);
  assert.equal(result.estimatedSystemCostInr, null);
  assert.equal(result.indicativePaybackYears, null);
  assert.equal(result.emi, null);
});

test('calculateSolarEstimate flags rooftop area constraint when area is tight', () => {
  const result = calculateSolarEstimate({
    monthlyBillInr: 8000,
    tariffPerUnitInr: 8,
    propertyType: 'Commercial',
    availableRooftopSqFt: 300,
  });

  assert.equal(result.recommendedCapacityKw, 8);
  assert.equal(result.maxCapacityByAreaKw, 3.5);
  assert.equal(result.isAreaConstrained, true);
});

test('calculateSolarEstimate supports editable generation factor and direct unit override', () => {
  const result = calculateSolarEstimate({
    monthlyBillInr: 0,
    tariffPerUnitInr: 9,
    monthlyUnitsOverride: 450,
    propertyType: 'Residential',
    unitsPerKwPerMonth: 150,
  });

  assert.equal(result.hasValidInput, true);
  assert.equal(result.recommendedCapacityKw, 3);
  assert.equal(result.estimatedMonthlyGenerationKwh, 450);
  assert.equal(result.effectiveMonthlyBillInr, 4050);
  assert.equal(result.estimatedMonthlySavingsInr, 4050);
});

test('Indian phone validation accepts valid formats and rejects invalid numbers', () => {
  assert.equal(isValidIndianPhone('9876543210'), true);
  assert.equal(isValidIndianPhone('+91 98765-43210'), true);
  assert.equal(isValidIndianPhone('09876543210'), true);
  assert.equal(normalizeIndianPhone('+91 98765 43210'), '9876543210');

  assert.equal(isValidIndianPhone('12345'), false);
  assert.equal(isValidIndianPhone('5876543210'), false);
  assert.equal(isValidIndianPhone('98765432101'), false);
});

test('contactFormSchema validates required fields and optional email', () => {
  const valid = contactFormSchema.safeParse({
    fullName: 'Aarav Sharma',
    phone: '+91 98260 12345',
    email: '',
    cityArea: 'Vijay Nagar, Indore',
    propertyType: 'Residential',
    monthlyBill: '4500',
    message: 'Interested in 4 kW rooftop solar.',
  });
  assert.equal(valid.success, true);

  const invalid = contactFormSchema.safeParse({
    fullName: 'A',
    phone: '1234',
    email: 'not-an-email',
    cityArea: '',
    propertyType: 'Residential',
    monthlyBill: '',
    message: '',
  });
  assert.equal(invalid.success, false);
});

test('WhatsApp URL builders encode calculator, package, and contact details properly', () => {
  const calcResult = calculateSolarEstimate({
    monthlyBillInr: 4800,
    tariffPerUnitInr: 8,
    propertyType: 'Residential',
  });
  const calcUrl = buildWhatsAppUrl(
    formatCalculatorWhatsAppMessage(
      { monthlyBillInr: 4800, tariffPerUnitInr: 8, propertyType: 'Residential' },
      calcResult
    ),
    '919999999999'
  );
  assert.match(calcUrl, /^https:\/\/wa\.me\/919999999999\?text=/);
  assert.ok(decodeURIComponent(calcUrl).includes('5 kW'));

  const pkgUrl = buildWhatsAppUrl(
    formatPackageWhatsAppMessage('Residential Plus', '5 kW (Example Size)'),
    '919999999999'
  );
  assert.ok(decodeURIComponent(pkgUrl).includes('Residential Plus'));

  const contactUrl = buildWhatsAppUrl(
    formatContactWhatsAppMessage({
      fullName: 'Priya Verma',
      phone: '9826012345',
      email: 'priya@example.com',
      cityArea: 'Palasia, Indore',
      propertyType: 'Commercial',
      monthlyBill: '12000',
      message: 'Need site survey',
    }),
    '919999999999'
  );
  assert.ok(decodeURIComponent(contactUrl).includes('Palasia, Indore'));
  assert.ok(decodeURIComponent(contactUrl).includes('+91 9826012345'));
});

test('normalizeNextCliArgs translates --host and --port flags into Next.js CLI flags', async () => {
  const { normalizeNextCliArgs } = await import('./launcher-args');

  assert.deepEqual(
    normalizeNextCliArgs(['dev', '--host', '0.0.0.0', '--port', '3000']).nextCliArgs,
    ['dev', '-p', '3000', '-H', '0.0.0.0']
  );

  assert.deepEqual(
    normalizeNextCliArgs(['dev', '--port=3000', '--host=0.0.0.0']).nextCliArgs,
    ['dev', '-p', '3000', '-H', '0.0.0.0']
  );

  assert.deepEqual(
    normalizeNextCliArgs(['start', '--host']).nextCliArgs,
    ['start', '-p', '3000', '-H', '0.0.0.0']
  );
});
