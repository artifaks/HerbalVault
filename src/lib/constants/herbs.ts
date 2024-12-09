import type { Herb } from '../../types/herb';

export const FEATURED_HERBS: Herb[] = [
  {
    id: 'echinacea',
    scientificName: 'Echinacea purpurea',
    commonName: 'Purple Coneflower',
    images: {
      fresh: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651',
      dried: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0',
      growing: 'https://images.unsplash.com/photo-1531517765038-ee4843469fd2',
    },
    description: 'Known as the immune system warrior, Echinacea has been a cornerstone of traditional medicine for centuries. This beautiful purple flower not only adds grace to your garden but packs a powerful punch in supporting overall wellness.',
    history: 'Echinacea has been used for centuries by Native American tribes to treat various ailments. It was widely used by the Plains Indians for wound healing and fighting infections.',
    traditionalUses: ['Immune Support', 'Cold & Flu Relief', 'Wound Healing'],
    modernUses: [
      'Immune system enhancement',
      'Upper respiratory support',
      'Inflammation reduction',
    ],
    preparations: [
      {
        type: 'tea',
        instructions: 'Steep 1-2 teaspoons of dried herb in hot water for 10-15 minutes',
        duration: '10-15 minutes',
        materials: ['Dried Echinacea', 'Hot water'],
      },
      {
        type: 'tincture',
        instructions: 'Take 1-2 ml of tincture 2-3 times daily',
        duration: 'Ongoing',
        materials: ['Echinacea tincture'],
      },
    ],
    dosage: 'Tea: 1-2 cups daily; Tincture: 1-2 ml, 2-3 times daily',
    safetyPrecautions: [
      'May cause allergic reactions in some individuals',
      'Not recommended for people with autoimmune conditions',
      'Consult healthcare provider if pregnant or nursing',
    ],
    research: [
      {
        title: 'Echinacea for preventing and treating the common cold',
        authors: ['Karsch-Völk M', 'Barrett B', 'Linde K'],
        year: 2014,
        journal: 'Cochrane Database of Systematic Reviews',
        summary: 'Review of clinical trials showing modest benefit in preventing and treating colds',
        link: 'https://pubmed.ncbi.nlm.nih.gov/24554461/',
      },
    ],
    interactions: [
      {
        drug: 'Immunosuppressants',
        severity: 'moderate',
        description: 'May interfere with immunosuppressive drugs',
      },
    ],
    seasonalInfo: {
      plantingTime: 'Spring',
      harvestTime: 'Late Summer',
      growingZones: ['3-8'],
      careInstructions: 'Full sun, well-draining soil',
    },
  },
  {
    id: 'chamomile',
    scientificName: 'Matricaria chamomilla',
    commonName: 'German Chamomile',
    images: {
      fresh: 'https://images.unsplash.com/photo-1587593810167-a84920ea0781',
      dried: 'https://images.unsplash.com/photo-1573725342230-178c824a10f2',
      growing: 'https://images.unsplash.com/photo-1589087394593-e1f9a35d6c19',
    },
    description: 'Gentle yet powerful, chamomile is renowned for its calming properties and delicate apple-like fragrance. This versatile herb has been used for thousands of years as a natural remedy for sleep, digestion, and anxiety.',
    history: 'Ancient Egyptians dedicated chamomile to their sun god Ra and used it as a cure for fevers. Throughout history, it has been one of the most widely used medicinal herbs across cultures.',
    traditionalUses: ['Sleep Aid', 'Digestive Support', 'Anxiety Relief'],
    modernUses: [
      'Sleep improvement',
      'Digestive health',
      'Stress management',
      'Skin care',
    ],
    preparations: [
      {
        type: 'tea',
        instructions: 'Steep 1 teaspoon of dried flowers in hot water for 5-10 minutes',
        duration: '5-10 minutes',
        materials: ['Dried chamomile flowers', 'Hot water'],
      },
      {
        type: 'poultice',
        instructions: 'Apply cooled chamomile tea bags or wrapped fresh flowers to affected areas',
        duration: '15-20 minutes',
        materials: ['Chamomile tea bags or fresh flowers', 'Clean cloth'],
      },
    ],
    dosage: 'Tea: 1-3 cups daily; External use: As needed',
    safetyPrecautions: [
      'May cause allergic reactions in those sensitive to daisies',
      'Avoid during pregnancy without medical supervision',
      'May increase drowsiness when combined with sedatives',
    ],
    research: [
      {
        title: 'Chamomile: A herbal medicine of the past with bright future',
        authors: ['Srivastava JK', 'Shankar E', 'Gupta S'],
        year: 2010,
        journal: 'Molecular Medicine Reports',
        summary: 'Comprehensive review of chamomile\'s therapeutic properties and potential',
        link: 'https://pubmed.ncbi.nlm.nih.gov/21132119/',
      },
    ],
    interactions: [
      {
        drug: 'Blood thinners',
        severity: 'moderate',
        description: 'May increase risk of bleeding',
      },
    ],
    seasonalInfo: {
      plantingTime: 'Spring or Fall',
      harvestTime: 'Summer',
      growingZones: ['4-9'],
      careInstructions: 'Full sun to partial shade, average soil',
    },
  },
];