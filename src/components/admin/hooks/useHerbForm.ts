import { useState } from 'react';
import type { Herb } from '../../../types/herb';
import * as herbService from '../../../lib/services/herbService';

interface UseHerbFormProps {
  herb?: Partial<Herb>;
  onSubmit: () => void;
}

export function useHerbForm({ herb, onSubmit }: UseHerbFormProps) {
  const [formData, setFormData] = useState({
    scientificName: herb?.scientificName || '',
    commonName: herb?.commonName || '',
    description: herb?.description || '',
    history: herb?.history || '',
    traditionalUses: herb?.traditionalUses?.join('\n') || '',
    modernUses: herb?.modernUses?.join('\n') || '',
    dosage: herb?.dosage || '',
    safetyPrecautions: herb?.safetyPrecautions?.join('\n') || '',
  });

  const [images, setImages] = useState<Record<string, File>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleImageSelect = (type: string) => (file: File) => {
    setImages(prev => ({
      ...prev,
      [type]: file
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const imageUrls: Record<string, string> = {};
      
      for (const [type, file] of Object.entries(images)) {
        const path = `${Date.now()}-${file.name}`;
        const url = await herbService.uploadHerbImage(file, path);
        imageUrls[type] = url;
      }

      const herbData = {
        ...formData,
        traditionalUses: formData.traditionalUses.split('\n').filter(Boolean),
        modernUses: formData.modernUses.split('\n').filter(Boolean),
        safetyPrecautions: formData.safetyPrecautions.split('\n').filter(Boolean),
        images: {
          ...herb?.images,
          ...imageUrls
        }
      };

      if (herb?.id) {
        await herbService.updateHerb(herb.id, herbData);
      } else {
        await herbService.createHerb(herbData as Omit<Herb, 'id'>);
      }

      onSubmit();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    loading,
    error,
    handleInputChange,
    handleImageSelect,
    handleSubmit,
  };
}