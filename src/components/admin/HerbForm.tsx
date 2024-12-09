import React, { useState } from 'react';
import { Save, X, AlertTriangle } from 'lucide-react';
import { ImageUpload } from './ImageUpload';
import type { Herb } from '../../types/herb';
import { updateHerb, createHerb } from '../../lib/api/herbs';
import { uploadImage } from '../../lib/api/storage';
import { toast } from 'react-hot-toast';

interface HerbFormProps {
  herb?: Herb;
  onSubmit: () => void;
  onCancel: () => void;
}

export function HerbForm({ herb, onSubmit, onCancel }: HerbFormProps) {
  const [formData, setFormData] = useState({
    common_name: herb?.common_name || '',
    scientific_name: herb?.scientific_name || '',
    description: herb?.description || '',
    traditional_uses: herb?.traditional_uses?.join('\n') || '',
    modern_uses: herb?.modern_uses?.join('\n') || '',
    safety_precautions: herb?.safety_precautions?.join('\n') || '',
  });

  const [freshImage, setFreshImage] = useState<{ file?: File; preview: string }>({
    preview: herb?.images?.fresh || ''
  });
  const [driedImage, setDriedImage] = useState<{ file?: File; preview: string }>({
    preview: herb?.images?.dried || ''
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleFreshImageSelect = (file: File, preview: string) => {
    setFreshImage({ file, preview });
  };

  const handleDriedImageSelect = (file: File, preview: string) => {
    setDriedImage({ file, preview });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Prepare image URLs
      const imageUrls: { fresh?: string; dried?: string } = {
        fresh: freshImage.file ? undefined : herb?.images?.fresh,
        dried: driedImage.file ? undefined : herb?.images?.dried
      };

      // Upload fresh image if changed
      if (freshImage.file) {
        const path = `herbs/${Date.now()}_fresh_${freshImage.file.name}`;
        imageUrls.fresh = await uploadImage(freshImage.file, path);
      }

      // Upload dried image if changed
      if (driedImage.file) {
        const path = `herbs/${Date.now()}_dried_${driedImage.file.name}`;
        imageUrls.dried = await uploadImage(driedImage.file, path);
      }

      // Prepare herb data
      const herbData = {
        common_name: formData.common_name,
        scientific_name: formData.scientific_name,
        description: formData.description,
        traditional_uses: formData.traditional_uses.split('\n').filter(Boolean),
        modern_uses: formData.modern_uses.split('\n').filter(Boolean),
        safety_precautions: formData.safety_precautions.split('\n').filter(Boolean),
        images: imageUrls
      };

      if (herb?.id) {
        console.log('Updating herb:', herbData);
        await updateHerb(herb.id, herbData);
        toast.success('Herb updated successfully');
      } else {
        console.log('Creating herb:', herbData);
        await createHerb(herbData);
        toast.success('Herb created successfully');
      }

      onSubmit();
    } catch (err) {
      console.error('Form error:', err);
      const message = err instanceof Error ? err.message : 'An error occurred';
      setError(message);
      toast.error(`Failed to save herb: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="rounded-md bg-red-50 p-4 text-red-800">
          <div className="flex">
            <AlertTriangle className="h-5 w-5 text-red-400" />
            <div className="ml-3">
              <h3 className="text-sm font-medium">Error</h3>
              <div className="mt-2 text-sm">{error}</div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Common Name
            <input
              type="text"
              name="common_name"
              value={formData.common_name}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500"
            />
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Scientific Name
            <input
              type="text"
              name="scientific_name"
              value={formData.scientific_name}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500"
            />
          </label>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Description
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={3}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500"
          />
        </label>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">Fresh Herb Image</label>
          <div className="mt-1">
            <ImageUpload
              onImageSelect={handleFreshImageSelect}
              initialPreview={freshImage.preview}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Dried Herb Image</label>
          <div className="mt-1">
            <ImageUpload
              onImageSelect={handleDriedImageSelect}
              initialPreview={driedImage.preview}
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Traditional Uses (one per line)
          <textarea
            name="traditional_uses"
            value={formData.traditional_uses}
            onChange={handleInputChange}
            rows={3}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500"
          />
        </label>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Modern Uses (one per line)
          <textarea
            name="modern_uses"
            value={formData.modern_uses}
            onChange={handleInputChange}
            rows={3}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500"
          />
        </label>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Safety Precautions (one per line)
          <textarea
            name="safety_precautions"
            value={formData.safety_precautions}
            onChange={handleInputChange}
            rows={3}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500"
          />
        </label>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        >
          <X className="mr-2 h-4 w-4" />
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        >
          <Save className="mr-2 h-4 w-4" />
          {loading ? 'Saving...' : 'Save Herb'}
        </button>
      </div>
    </form>
  );
}