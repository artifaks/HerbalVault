export interface Database {
  public: {
    Tables: {
      herbs: {
        Row: {
          id: string;
          created_at: string;
          scientific_name: string;
          common_name: string;
          description: string;
          history: string;
          traditional_uses: string[];
          modern_uses: string[];
          dosage: string;
          safety_precautions: string[];
          images: {
            fresh: string;
            dried: string;
            growing: string;
          };
        };
        Insert: {
          id?: string;
          created_at?: string;
          scientific_name: string;
          common_name: string;
          description: string;
          history: string;
          traditional_uses: string[];
          modern_uses: string[];
          dosage: string;
          safety_precautions: string[];
          images: {
            fresh: string;
            dried: string;
            growing: string;
          };
        };
        Update: {
          id?: string;
          created_at?: string;
          scientific_name?: string;
          common_name?: string;
          description?: string;
          history?: string;
          traditional_uses?: string[];
          modern_uses?: string[];
          dosage?: string;
          safety_precautions?: string[];
          images?: {
            fresh: string;
            dried: string;
            growing: string;
          };
        };
      };
    };
  };
}