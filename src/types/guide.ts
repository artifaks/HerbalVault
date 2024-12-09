export interface GrowingGuide {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  season: 'spring' | 'summer' | 'fall' | 'winter' | 'all';
  duration: string;
  image: string;
  steps: GrowingStep[];
  tips: string[];
  requirements: {
    light: string;
    soil: string;
    water: string;
    temperature: string;
  };
}

export interface GrowingStep {
  title: string;
  description: string;
  image?: string;
  duration?: string;
  tips?: string[];
}