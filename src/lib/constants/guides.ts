import type { GrowingGuide } from '../../types/guide';

export const GROWING_GUIDES: GrowingGuide[] = [
  {
    id: 'starting-herb-garden',
    title: 'Starting Your First Herb Garden',
    description: 'A comprehensive guide for beginners on how to start a medicinal herb garden from scratch.',
    difficulty: 'beginner',
    season: 'spring',
    duration: '2-3 months',
    image: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735',
    steps: [
      {
        title: 'Planning Your Garden',
        description: 'Choose a location that receives 6-8 hours of sunlight daily. Consider the mature size of plants and space requirements.',
        tips: ['Draw a garden layout', 'Research local growing zones', 'Group herbs with similar water needs'],
      },
      {
        title: 'Preparing the Soil',
        description: 'Most medicinal herbs prefer well-draining, moderately rich soil. Add organic matter and ensure proper pH (6.0-7.0).',
        duration: '1-2 days',
      },
      {
        title: 'Planting Your Herbs',
        description: 'Plant seedlings or seeds according to package instructions. Space plants properly to allow for growth.',
        image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae',
      },
    ],
    tips: [
      'Start with easy-to-grow herbs like echinacea, chamomile, and mint',
      'Label your plants clearly',
      'Keep a garden journal to track progress',
      'Consider companion planting for optimal growth',
    ],
    requirements: {
      light: 'Full sun to partial shade',
      soil: 'Well-draining, organic-rich soil',
      water: 'Moderate, consistent moisture',
      temperature: '60-70°F (15-21°C)',
    },
  },
];