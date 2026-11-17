import { CALCULATOR_CONFIG, type CalculatorConfig } from './config';

export type PropertyType = 'Residential' | 'Commercial';
export type EmiTenureMonths = 6 | 36 | 60;

export interface SolarCalculatorInput {
  monthlyBillInr: number;
  tariffPerUnitInr: number;
  monthlyUnitsOverride?: number | null;
  propertyType: PropertyType;
  availableRooftopSqFt?: number | null;
  unitsPerKwPerMonth?: number;
  applySubsidy?: boolean;
  emiTenureMonths?: EmiTenureMonths;
}

export interface EmiBreakdown {
  tenureMonths: EmiTenureMonths;
  downPaymentInr: number;
  loanAmountInr: number;
  monthlyEmiInr: number;
  annualInterestRatePercent: number;
}

export interface SolarCalculatorResult {
  hasValidInput: boolean;
  propertyType: PropertyType;
  effectiveMonthlyUnits: number;
  effectiveMonthlyBillInr: number;
  unitsPerKwPerMonth: number;
  recommendedCapacityKw: number;
  estimatedMonthlyGenerationKwh: number;
  estimatedMonthlySavingsInr: number;
  estimatedAnnualSavingsInr: number;
  estimatedCostPerKwInr: number | null;
  estimatedSystemCostInr: number | null;
  indicativeSubsidyInr: number;
  netEstimatedSystemCostInr: number | null;
  indicativePaybackYears: number | null;
  estimatedRequiredAreaSqFt: number;
  rooftopSqFtPerKw: number;
  maxCapacityByAreaKw: number | null;
  isAreaConstrained: boolean;
  emi: EmiBreakdown | null;
}

export function roundToStep(value: number, step: number): number {
  if (!Number.isFinite(value) || value <= 0 || step <= 0) {
    return 0;
  }
  return Math.round(value / step) * step;
}

export function roundUpToStep(value: number, step: number): number {
  if (!Number.isFinite(value) || value <= 0 || step <= 0) {
    return 0;
  }
  return Math.ceil(Number((value / step).toFixed(6))) * step;
}

/**
 * Calculates indicative PM Surya Ghar residential rooftop subsidy in INR:
 * - Up to 2 kW: ₹30,000 per kW (e.g., 1 kW = ₹30,000, 2 kW = ₹60,000)
 * - Additional capacity up to 3 kW: ₹18,000 for the 3rd kW (3 kW = ₹78,000)
 * - Above 3 kW: Capped at ₹78,000
 * - Commercial properties: ₹0
 */
export function calculateIndicativeSubsidyInr(
  capacityKw: number,
  propertyType: PropertyType,
  applySubsidy: boolean = true
): number {
  if (!applySubsidy || propertyType !== 'Residential' || !Number.isFinite(capacityKw) || capacityKw <= 0) {
    return 0;
  }
  if (capacityKw <= 2) {
    return Math.round(capacityKw * 30000);
  }
  if (capacityKw < 3) {
    return Math.round(60000 + (capacityKw - 2) * 18000);
  }
  return 78000;
}

/**
 * Computes indicative monthly EMI for a given net system cost and tenure (6, 36, or 60 months).
 * Assumes 20% down payment and 80% financed amount:
 * - 6 months: 0% promotional short-term tenure
 * - 36 or 60 months: 9.5% p.a. reducing-balance indicative solar loan rate
 */
export function calculateEmiBreakdown(
  netSystemCostInr: number | null,
  tenureMonths: EmiTenureMonths = 36
): EmiBreakdown | null {
  if (netSystemCostInr === null || !Number.isFinite(netSystemCostInr) || netSystemCostInr <= 0) {
    return null;
  }

  const downPaymentInr = Math.round(netSystemCostInr * 0.2);
  const loanAmountInr = Math.max(0, netSystemCostInr - downPaymentInr);

  if (tenureMonths === 6) {
    return {
      tenureMonths: 6,
      downPaymentInr,
      loanAmountInr,
      monthlyEmiInr: Math.round(loanAmountInr / 6),
      annualInterestRatePercent: 0,
    };
  }

  const annualRate = 9.5;
  const monthlyRate = annualRate / 12 / 100;
  const factor = Math.pow(1 + monthlyRate, tenureMonths);
  const emi = (loanAmountInr * monthlyRate * factor) / (factor - 1);

  return {
    tenureMonths,
    downPaymentInr,
    loanAmountInr,
    monthlyEmiInr: Math.round(emi),
    annualInterestRatePercent: annualRate,
  };
}

export function calculateSolarEstimate(
  input: SolarCalculatorInput,
  config: CalculatorConfig = CALCULATOR_CONFIG
): SolarCalculatorResult {
  const propertyType: PropertyType =
    input.propertyType === 'Commercial' ? 'Commercial' : 'Residential';
  const preset = config.presets?.[propertyType];

  const tariff =
    Number.isFinite(input.tariffPerUnitInr) && input.tariffPerUnitInr > 0
      ? input.tariffPerUnitInr
      : 0;

  const bill =
    Number.isFinite(input.monthlyBillInr) && input.monthlyBillInr > 0
      ? input.monthlyBillInr
      : 0;

  const overrideUnits =
    input.monthlyUnitsOverride !== undefined &&
    input.monthlyUnitsOverride !== null &&
    Number.isFinite(input.monthlyUnitsOverride) &&
    input.monthlyUnitsOverride > 0
      ? input.monthlyUnitsOverride
      : null;

  const defaultFactor = preset?.defaultUnitsPerKwPerMonth ?? config.defaultUnitsPerKwPerMonth;
  const generationFactor =
    input.unitsPerKwPerMonth !== undefined &&
    Number.isFinite(input.unitsPerKwPerMonth) &&
    input.unitsPerKwPerMonth > 0
      ? input.unitsPerKwPerMonth
      : defaultFactor;

  const roofSqFtPerKw = preset?.rooftopSqFtPerKw ?? config.rooftopSqFtPerKw;

  const rawCostPerKw =
    config.estimatedCostPerKwInr === null || config.estimatedCostPerKwInr === 0
      ? null
      : preset?.estimatedCostPerKwInr ?? config.estimatedCostPerKwInr;

  const costPerKw =
    rawCostPerKw !== null && Number.isFinite(rawCostPerKw) && rawCostPerKw > 0
      ? rawCostPerKw
      : null;

  const applySubsidy =
    input.applySubsidy !== undefined ? input.applySubsidy : propertyType === 'Residential';
  const emiTenureMonths: EmiTenureMonths = input.emiTenureMonths ?? 36;

  let effectiveMonthlyUnits = 0;
  let effectiveMonthlyBillInr = 0;

  if (overrideUnits !== null) {
    effectiveMonthlyUnits = Math.round(overrideUnits);
    effectiveMonthlyBillInr = tariff > 0 ? Math.round(overrideUnits * tariff) : Math.round(bill);
  } else if (bill > 0 && tariff > 0) {
    effectiveMonthlyUnits = Math.round(bill / tariff);
    effectiveMonthlyBillInr = Math.round(bill);
  }

  if (effectiveMonthlyUnits <= 0 || tariff <= 0) {
    return {
      hasValidInput: false,
      propertyType,
      effectiveMonthlyUnits: 0,
      effectiveMonthlyBillInr: 0,
      unitsPerKwPerMonth: generationFactor,
      recommendedCapacityKw: 0,
      estimatedMonthlyGenerationKwh: 0,
      estimatedMonthlySavingsInr: 0,
      estimatedAnnualSavingsInr: 0,
      estimatedCostPerKwInr: costPerKw,
      estimatedSystemCostInr: null,
      indicativeSubsidyInr: 0,
      netEstimatedSystemCostInr: null,
      indicativePaybackYears: null,
      estimatedRequiredAreaSqFt: 0,
      rooftopSqFtPerKw: roofSqFtPerKw,
      maxCapacityByAreaKw: null,
      isAreaConstrained: false,
      emi: null,
    };
  }

  const rawCapacityKw = effectiveMonthlyUnits / generationFactor;
  const steppedCapacity = Math.max(
    config.minCapacityKw,
    Math.min(config.maxCapacityKw, roundUpToStep(rawCapacityKw, config.capacityStepKw))
  );
  const recommendedCapacityKw = Number(steppedCapacity.toFixed(1));

  const estimatedMonthlyGenerationKwh = Math.round(recommendedCapacityKw * generationFactor);

  // Cap monthly savings at the entered/effective monthly electricity bill amount
  const rawGenerationValueInr = Math.round(estimatedMonthlyGenerationKwh * tariff);
  const estimatedMonthlySavingsInr = Math.min(effectiveMonthlyBillInr, rawGenerationValueInr);
  const estimatedAnnualSavingsInr = estimatedMonthlySavingsInr * 12;

  const estimatedSystemCostInr =
    costPerKw !== null ? Math.round(recommendedCapacityKw * costPerKw) : null;

  const indicativeSubsidyInr =
    estimatedSystemCostInr !== null
      ? Math.min(
          estimatedSystemCostInr,
          calculateIndicativeSubsidyInr(recommendedCapacityKw, propertyType, applySubsidy)
        )
      : 0;

  const netEstimatedSystemCostInr =
    estimatedSystemCostInr !== null
      ? Math.max(0, estimatedSystemCostInr - indicativeSubsidyInr)
      : null;

  const indicativePaybackYears =
    netEstimatedSystemCostInr !== null && estimatedAnnualSavingsInr > 0
      ? Number((netEstimatedSystemCostInr / estimatedAnnualSavingsInr).toFixed(1))
      : null;

  const estimatedRequiredAreaSqFt = Math.round(recommendedCapacityKw * roofSqFtPerKw);

  const validArea =
    input.availableRooftopSqFt !== undefined &&
    input.availableRooftopSqFt !== null &&
    Number.isFinite(input.availableRooftopSqFt) &&
    input.availableRooftopSqFt > 0
      ? input.availableRooftopSqFt
      : null;

  const maxCapacityByAreaKw =
    validArea !== null
      ? Number(
          Math.max(0, Math.floor((validArea / roofSqFtPerKw) * 2) / 2).toFixed(1)
        )
      : null;

  const isAreaConstrained =
    maxCapacityByAreaKw !== null && recommendedCapacityKw > maxCapacityByAreaKw;

  const emi = calculateEmiBreakdown(netEstimatedSystemCostInr, emiTenureMonths);

  return {
    hasValidInput: true,
    propertyType,
    effectiveMonthlyUnits,
    effectiveMonthlyBillInr,
    unitsPerKwPerMonth: generationFactor,
    recommendedCapacityKw,
    estimatedMonthlyGenerationKwh,
    estimatedMonthlySavingsInr,
    estimatedAnnualSavingsInr,
    estimatedCostPerKwInr: costPerKw,
    estimatedSystemCostInr,
    indicativeSubsidyInr,
    netEstimatedSystemCostInr,
    indicativePaybackYears,
    estimatedRequiredAreaSqFt,
    rooftopSqFtPerKw: roofSqFtPerKw,
    maxCapacityByAreaKw,
    isAreaConstrained,
    emi,
  };
}

export function formatInr(value: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(Math.round(value));
}
