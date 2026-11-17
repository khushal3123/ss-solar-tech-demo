export interface SolarImageAsset {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export const SOLAR_IMAGES: Record<
  'hero' | 'residential' | 'commercial' | 'industrial' | 'closeup' | 'sustainable' | 'sunsetCta',
  SolarImageAsset
> = {
  hero: {
    src: '/images/hero-indore-home.jpg',
    alt: 'Contemporary independent Indian home in Indore featuring neatly mounted rooftop solar panels in warm morning sunlight',
    width: 1408,
    height: 768,
  },
  residential: {
    src: '/images/residential-rooftop-solar.jpg',
    alt: 'Modern Indian house terrace with elevated monocrystalline rooftop solar panels under clear daylight',
    width: 1200,
    height: 900,
  },
  commercial: {
    src: '/images/commercial-building-solar.jpg',
    alt: 'Modern Indian commercial office building equipped with a structured rooftop solar panel array',
    width: 1200,
    height: 900,
  },
  industrial: {
    src: '/images/industrial-factory-solar.jpg',
    alt: 'Expansive industrial facility and warehouse rooftop fitted with large-scale solar panel arrays',
    width: 1200,
    height: 900,
  },
  closeup: {
    src: '/images/solar-panel-closeup.jpg',
    alt: 'Detailed view of dark monocrystalline photovoltaic solar panels angled toward warm morning sun',
    width: 1200,
    height: 900,
  },
  sustainable: {
    src: '/images/sustainable-solar-architecture.jpg',
    alt: 'Sustainable modern Indian architectural home surrounded by greenery with integrated rooftop solar panels',
    width: 1408,
    height: 768,
  },
  sunsetCta: {
    src: '/images/sunset-solar-home.jpg',
    alt: 'Golden sunset over a modern Indian residential rooftop equipped with solar panels',
    width: 1408,
    height: 768,
  },
} as const;
