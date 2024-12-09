export interface Herb {
  id: string;
  common_name: string;
  scientific_name: string;
  description: string;
  traditional_uses: string[];
  modern_uses: string[];
  safety_precautions: string[];
  images: {
    fresh?: string;
    dried?: string;
  };
  created_at?: string;
  updated_at?: string;
}

export interface Preparation {
  type: 'tea' | 'tincture' | 'poultice' | 'other';
  instructions: string;
  duration: string;
  materials: string[];
}

export interface ResearchStudy {
  title: string;
  authors: string[];
  year: number;
  journal: string;
  summary: string;
  link: string;
}

export interface DrugInteraction {
  drug: string;
  severity: 'mild' | 'moderate' | 'severe';
  description: string;
}

export interface SeasonalInfo {
  plantingTime: string;
  harvestTime: string;
  growingZones: string[];
  careInstructions: string;
}