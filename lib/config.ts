export const SITE_CONFIG = {
  brandName: 'SS Solar',
  tagline: 'Power Your Home. Save Your Future.',
  altTagline: 'Smarter Energy. Brighter Tomorrow.',
  city: 'Indore',
  state: 'Madhya Pradesh',
  country: 'India',
  locationLabel: 'Indore, Madhya Pradesh, India',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || process.env.APP_URL || 'https://ss-solar-indore.example.com',
  // Replace with verified business WhatsApp number in international format (no + or spaces)
  whatsappNumber: '919999999999',
  contactPlaceholders: {
    phone: '[PLACEHOLDER_PHONE]',
    email: '[PLACEHOLDER_EMAIL]',
    whatsapp: '[PLACEHOLDER_WHATSAPP]',
    address: 'Indore, Madhya Pradesh, India (Business address placeholder)',
  },
} as const;

export const BRAND_CONFIG = {
  name: SITE_CONFIG.brandName,
  tagline: SITE_CONFIG.tagline,
  city: SITE_CONFIG.city,
  state: SITE_CONFIG.state,
  country: SITE_CONFIG.country,
  serviceArea: 'Indore, Ujjain, Dewas, Pithampur & Surrounding MP Districts',
  siteUrl: SITE_CONFIG.siteUrl,
  phone: SITE_CONFIG.contactPlaceholders.phone,
  email: SITE_CONFIG.contactPlaceholders.email,
  whatsapp: SITE_CONFIG.contactPlaceholders.whatsapp,
  workingHours: 'Mon – Sat: 9:30 AM – 7:00 PM IST',
} as const;

export const SOLAR_IMAGES = {
  hero: '/images/hero-indore-home.jpg',
  residential: '/images/residential-rooftop-solar.jpg',
  commercial: '/images/commercial-building-solar.jpg',
  industrial: '/images/industrial-factory-solar.jpg',
  closeup: '/images/solar-panel-closeup.jpg',
  sustainable: '/images/sustainable-solar-architecture.jpg',
  sunsetCta: '/images/sunset-solar-home.jpg',
} as const;

export interface PropertyCalculatorPreset {
  defaultMonthlyBillInr: number;
  defaultTariffPerUnitInr: number;
  defaultUnitsPerKwPerMonth: number;
  estimatedCostPerKwInr: number | null;
  rooftopSqFtPerKw: number;
}

export interface CalculatorConfig {
  defaultMonthlyBillInr: number;
  defaultTariffPerUnitInr: number;
  defaultUnitsPerKwPerMonth: number;
  estimatedCostPerKwInr: number | null;
  rooftopSqFtPerKw: number;
  minCapacityKw: number;
  maxCapacityKw: number;
  capacityStepKw: number;
  presets: {
    Residential: PropertyCalculatorPreset;
    Commercial: PropertyCalculatorPreset;
  };
}

export const CALCULATOR_CONFIG: CalculatorConfig = {
  defaultMonthlyBillInr: 4500,
  defaultTariffPerUnitInr: 8,
  // Editable average monthly generation factor (units per kW per month)
  defaultUnitsPerKwPerMonth: 120,
  // Central configurable demo system installation cost per kW in INR.
  // Set to null or 0 to disable indicative payback period calculation.
  estimatedCostPerKwInr: 55000,
  rooftopSqFtPerKw: 90,
  minCapacityKw: 1,
  maxCapacityKw: 250,
  capacityStepKw: 0.5,
  presets: {
    Residential: {
      defaultMonthlyBillInr: 4500,
      defaultTariffPerUnitInr: 8,
      defaultUnitsPerKwPerMonth: 120,
      estimatedCostPerKwInr: 55000,
      rooftopSqFtPerKw: 90,
    },
    Commercial: {
      defaultMonthlyBillInr: 25000,
      defaultTariffPerUnitInr: 10,
      defaultUnitsPerKwPerMonth: 125,
      estimatedCostPerKwInr: 50000,
      rooftopSqFtPerKw: 85,
    },
  },
};

export interface PricingPackage {
  id: string;
  name: string;
  badgeLabel: string;
  suitableFor: string;
  exampleCapacity: string;
  indicativeBillRange: string;
  priceLabel: string;
  description: string;
  features: string[];
  highlighted?: boolean;
}

export const PRICING_PACKAGES: PricingPackage[] = [
  {
    id: 'residential-essential',
    name: 'Residential Essential',
    badgeLabel: 'Indicative Demo Package',
    suitableFor: '2–3 BHK Independent Homes',
    exampleCapacity: '3 kW (Example Size)',
    indicativeBillRange: 'Typical usage ~300–360 units / month',
    priceLabel: 'Request a Quote',
    description:
      'Designed as an entry-level rooftop solar configuration for compact urban households in Indore seeking steady daytime energy offset.',
    features: [
      'On-grid rooftop photovoltaic system layout',
      'Standard galvanized mounting structure for flat RCC roofs',
      'Site shadow & orientation check prior to final design',
      'Guidance on net-metering documentation steps',
      'Indicative example specification only — sized after site visit',
    ],
  },
  {
    id: 'residential-plus',
    name: 'Residential Plus',
    badgeLabel: 'Indicative Demo Package',
    suitableFor: 'Larger Homes, Villas & Bungalows',
    exampleCapacity: '5 kW (Example Size)',
    indicativeBillRange: 'Typical usage ~500–650 units / month',
    priceLabel: 'Request a Quote',
    description:
      'Tailored for multi-storey homes and families with higher cooling or appliance loads who want broader monthly bill reduction.',
    features: [
      'High-efficiency monocrystalline module configuration',
      'Elevated or flush-mount structure tailored to roof layout',
      'Detailed load assessment and generation estimate',
      'Dedicated installation coordination & handover briefing',
      'Indicative example specification only — sized after site visit',
    ],
    highlighted: true,
  },
  {
    id: 'commercial-custom',
    name: 'Commercial Custom',
    badgeLabel: 'Indicative Demo Package',
    suitableFor: 'Offices, Clinics, Retail & Institutions',
    exampleCapacity: '10 kW+ (Custom Sized)',
    indicativeBillRange: 'Scaled to daytime commercial demand',
    priceLabel: 'Request a Quote',
    description:
      'Engineered around daytime business operations where peak solar generation aligns directly with commercial operating hours.',
    features: [
      'Custom capacity planning from 10 kW to industrial scale',
      'Roof structural & electrical single-line planning',
      'Commercial tariff & daytime load matching review',
      'Planned commissioning schedule minimizing business disruption',
      'Indicative example specification only — final quote upon assessment',
    ],
  },
];

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'how-solar-works',
    question: 'How does rooftop solar work?',
    answer:
      'Rooftop solar panels capture sunlight and convert it into direct current (DC) electricity. An inverter then converts this into alternating current (AC) power for your home or business appliances. With an on-grid setup and applicable net metering, surplus daytime power can be exported to the utility grid while grid electricity seamlessly supports nighttime usage.',
  },
  {
    id: 'how-much-save',
    question: 'How much can I save with solar panels?',
    answer:
      'Your savings depend on your monthly electricity consumption, current utility tariff, available unshaded roof area, and chosen system capacity. You can use our interactive Solar Savings Calculator to explore an indicative estimate based on your monthly bill, keeping in mind that final generation varies with weather, roof orientation, and DISCOM billing rules.',
  },
  {
    id: 'suitable-for-home',
    question: 'Is solar suitable for my home?',
    answer:
      'Most independent houses, duplexes, and residential bungalows in Indore with a structurally sound, relatively shade-free roof receive strong annual sunlight and are well suited for rooftop solar. During a site assessment, we inspect roof condition, shading from nearby buildings or trees, and your electrical connection before recommending a configuration.',
  },
  {
    id: 'rooftop-space',
    question: 'How much rooftop space is required?',
    answer:
      'As a general planning thumb rule, 1 kW of rooftop solar typically requires roughly 80 to 100 square feet of shadow-free roof area, depending on module wattage and mounting tilt. Elevated structures can also be planned where terrace usability needs to be preserved.',
  },
  {
    id: 'installation-time',
    question: 'How long does solar installation take?',
    answer:
      'Physical on-site mounting and electrical installation for a standard residential rooftop system generally takes a few days once materials are finalized. Overall project timelines also depend on site readiness, custom structural fabrication if needed, and utility net-metering inspection schedules.',
  },
  {
    id: 'maintenance-required',
    question: 'What maintenance is required?',
    answer:
      'Rooftop solar systems have no moving parts and require minimal routine upkeep. Periodic cleaning of the solar panel glass with clean water to remove dust—especially during dry summer months—and occasional visual checks of wiring and inverter performance help sustain optimal output.',
  },
  {
    id: 'government-subsidies',
    question: 'Are government subsidies available?',
    answer:
      'Residential rooftop solar incentives and subsidy programs may be offered under central or state renewable energy schemes. Eligibility, applicable capacity limits, and disbursement depend entirely on current government policies, consumer category, and official DISCOM procedures at the time of application.',
  },
  {
    id: 'personalized-quotation',
    question: 'How can I get a personalized solar quotation?',
    answer:
      'You can request a personalized quote by sharing your recent electricity bill and property location through our Contact page, the Solar Savings Calculator, or directly via WhatsApp. We will arrange an initial consultation and site evaluation before preparing a tailored proposal.',
  },
];

export interface ServiceDetail {
  id: string;
  number: string;
  title: string;
  shortTitle: string;
  summary: string;
  description: string;
  idealFor: string;
  benefits: string[];
  imageKey: 'residential' | 'commercial' | 'industrial' | 'closeup' | 'sustainable';
}

export const SERVICES_DATA: ServiceDetail[] = [
  {
    id: 'residential',
    number: '01',
    title: 'Residential Solar Installation',
    shortTitle: 'Residential Solar',
    summary: 'Rooftop solar systems for homes, designed around household electricity requirements.',
    description:
      'Tailored rooftop solar systems for independent homes, villas, and residential properties across Indore. Every installation begins with understanding your household energy usage and terrace layout.',
    idealFor: 'Independent homes, duplexes, bungalows, and residential properties with dedicated roof access.',
    benefits: [
      'System capacity matched to monthly household consumption',
      'Clean mounting geometry respecting terrace space and aesthetics',
      'Guidance through site review, design, and handover stages',
      'Built for Indore’s bright seasonal solar irradiance',
    ],
    imageKey: 'residential',
  },
  {
    id: 'commercial',
    number: '02',
    title: 'Commercial Solar Installation',
    shortTitle: 'Commercial Solar',
    summary: 'Solar solutions for offices, shops, and commercial properties.',
    description:
      'Commercial rooftops in Indore experience peak energy demand during daytime operating hours—making solar an ideal match for offices, retail showrooms, clinics, and educational campuses.',
    idealFor: 'Offices, retail stores, clinics, coaching centers, hotels, and commercial complexes.',
    benefits: [
      'Aligns daytime generation with peak commercial electricity tariffs',
      'Scalable system planning around three-phase building loads',
      'Structured installation schedule to avoid disrupting daily operations',
      'Long-term operational cost predictability',
    ],
    imageKey: 'commercial',
  },
  {
    id: 'industrial',
    number: '03',
    title: 'Industrial Solar Solutions',
    shortTitle: 'Industrial Solar',
    summary: 'Solar solutions for factories and industrial facilities.',
    description:
      'Large-span industrial roofs and warehouses offer expansive surface area for high-capacity solar generation, supporting manufacturing units and logistics facilities in and around Indore.',
    idealFor: 'Factories, manufacturing plants, cold storages, workshops, and warehouse facilities.',
    benefits: [
      'Engineered mounting for metal-shed and large-span RCC roofs',
      'Custom capacity planning matched to facility load profiles',
      'Focus on safety, neat cable routing, and structural integrity',
      'Practical pathway toward lowering daytime facility power costs',
    ],
    imageKey: 'industrial',
  },
  {
    id: 'consultation',
    number: '04',
    title: 'Solar Consultation',
    shortTitle: 'Solar Consultation',
    summary: 'Clear, transparent advisory on system sizing, feasibility, and expected returns.',
    description:
      'Choosing solar should feel straightforward rather than overwhelming. We review your electricity bills, tariff structure, and energy goals to outline practical system options before any commitment.',
    idealFor: 'Property owners evaluating solar feasibility for the first time.',
    benefits: [
      'Electricity bill and tariff pattern analysis',
      'Realistic explanation of generation vs. seasonal variations',
      'Overview of on-grid workflow and net-metering considerations',
      'No-obligation guidance tailored to your property type',
    ],
    imageKey: 'closeup',
  },
  {
    id: 'site-assessment',
    number: '05',
    title: 'Site Assessment',
    shortTitle: 'Site Assessment',
    summary: 'On-site roof geometry, shading, and electrical readiness inspection.',
    description:
      'Accurate solar performance starts on the roof. Our site assessment evaluates usable shadow-free space, roof orientation, structural suitability, and electrical distribution box proximity.',
    idealFor: 'Homeowners and businesses ready to move from estimation to a tailored proposal.',
    benefits: [
      'Shadow path check across adjacent structures and trees',
      'Measurement of usable rooftop dimensions and parapet clearances',
      'Assessment of inverter placement and earthing/routing paths',
      'Foundation for an accurate, property-specific solar quotation',
    ],
    imageKey: 'sustainable',
  },
];

export const SOLAR_PACKAGES = [
  {
    id: '2kw-home',
    capacity: '2 kW System',
    name: 'Compact Home Starter',
    idealFor: 'Ideal for 2 BHK homes in Indore with ₹2,000–₹3,200 monthly bill',
    indicativePriceRange: '₹1,15,000 – ₹1,30,000*',
    approxMonthlyUnits: '~240 Units / Month',
    approxRoofArea: '~180 sq. ft.',
    popular: false,
    features: [
      'Eligible for ₹60,000* PM Surya Ghar Central Subsidy',
      'High-efficiency Mono PERC / Bifacial Solar Modules',
      'Cyclone-tested hot-dip galvanized mounting structure',
      'Smart Wi-Fi String Inverter with mobile app tracking',
      'Complete MPPKVVCL net-metering & subsidy paperwork',
    ],
  },
  {
    id: '3kw-home',
    capacity: '3 kW System',
    name: 'Indore Family Bestseller',
    idealFor: 'Ideal for 3 BHK homes & duplexes with ₹3,500–₹5,500 monthly bill',
    indicativePriceRange: '₹1,65,000 – ₹1,85,000*',
    approxMonthlyUnits: '~360 Units / Month',
    approxRoofArea: '~270 sq. ft.',
    popular: true,
    features: [
      'Eligible for Max ₹78,000* PM Surya Ghar Central Subsidy',
      'Effective net investment ~₹87,000–₹1,07,000* after subsidy',
      'Elevated or standard cyclone-resistant galvanized structure',
      'ACDB/DCDB surge protection + dedicated multi-rod earthing',
      'End-to-end MPPKVVCL bi-directional meter coordination',
    ],
  },
  {
    id: '5kw-villa',
    capacity: '5 kW System',
    name: 'Villa & Multi-AC Power',
    idealFor: 'Ideal for bungalows & large homes with ₹6,000–₹9,500 monthly bill',
    indicativePriceRange: '₹2,65,000 – ₹2,95,000*',
    approxMonthlyUnits: '~600 Units / Month',
    approxRoofArea: '~450 sq. ft.',
    popular: false,
    features: [
      'Eligible for ₹78,000* PM Surya Ghar Central Subsidy',
      'Three-phase high-efficiency smart string inverter',
      'Custom elevated structure keeping terrace space usable',
      'Complete AC/DC lightning & surge protection kit',
      'Priority site engineering & generation monitoring setup',
    ],
  },
  {
    id: '10kw-commercial',
    capacity: '10 kW+ System',
    name: 'Commercial & Institutional',
    idealFor: 'Ideal for offices, clinics, showrooms & factories in Indore',
    indicativePriceRange: 'Custom Engineered Quote',
    approxMonthlyUnits: '~1,250+ Units / Month',
    approxRoofArea: '~850+ sq. ft.',
    popular: false,
    features: [
      'Accelerated Depreciation tax benefit for commercial entities',
      'Custom RCC or Industrial Metal-Shed mounting geometry',
      'Peak daytime commercial tariff offset & ROI modeling',
      'Three-phase grid synchronization & DISCOM compliance',
      'Scheduled preventive maintenance & cleaning options',
    ],
  },
];

export const SOLAR_SERVICES = SERVICES_DATA.map((item) => ({
  id: item.id,
  tag: `Step ${item.number} • ${item.shortTitle}`,
  title: item.title,
  shortDesc: item.description,
  highlights: item.benefits,
}));

