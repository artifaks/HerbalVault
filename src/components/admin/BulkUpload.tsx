import React, { useRef, useState } from 'react';
import { Upload, Loader2, AlertTriangle } from 'lucide-react';
import { toast } from 'react-hot-toast';
import type { Herb } from '../../types/herb';
import { createHerb } from '../../lib/api/herbs';

interface BulkUploadProps {
  onSuccess: () => void;
}

export function BulkUpload({ onSuccess }: BulkUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setError(null);

    try {
      const content = await file.text();
      const herbs: Omit<Herb, 'id'>[] = JSON.parse(content);

      let successCount = 0;
      let errorCount = 0;
      const errors: string[] = [];

      for (const herb of herbs) {
        try {
          await createHerb(herb);
          successCount++;
        } catch (err) {
          errorCount++;
          const errorMessage = err instanceof Error ? err.message : 'Unknown error';
          errors.push(`Failed to create ${herb.common_name}: ${errorMessage}`);
        }
      }

      if (successCount > 0) {
        toast.success(`Successfully imported ${successCount} herbs`);
        onSuccess();
      }

      if (errorCount > 0) {
        setError(`Failed to import ${errorCount} herbs`);
        toast.error(
          <div>
            <p>Some herbs could not be imported:</p>
            <ul className="mt-2 list-disc pl-4">
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        );
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(`Failed to parse JSON file: ${errorMessage}`);
      toast.error(`Failed to parse JSON file: ${errorMessage}`);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label
          htmlFor="file-upload"
          className={`
            flex items-center px-4 py-2 rounded-md
            ${isUploading
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-primary-500 hover:bg-primary-600 cursor-pointer'
            }
            text-white transition-colors duration-200
          `}
        >
          {isUploading ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <Upload className="w-5 h-5 mr-2" />
              Bulk Upload Herbs
            </>
          )}
          <input
            id="file-upload"
            type="file"
            accept=".json"
            className="hidden"
            onChange={handleFileChange}
            disabled={isUploading}
            ref={fileInputRef}
          />
        </label>
      </div>

      {error && (
        <div className="flex items-center text-sm text-red-600">
          <AlertTriangle className="w-4 h-4 mr-2" />
          {error}
        </div>
      )}

      <div className="text-sm text-gray-600">
        <p>Upload a JSON file containing an array of herbs. Each herb should have:</p>
        <ul className="list-disc pl-6 mt-2">
          <li>common_name (required)</li>
          <li>scientific_name (required)</li>
          <li>description</li>
          <li>traditional_uses (array)</li>
          <li>modern_uses (array)</li>
          <li>safety_precautions (array)</li>
          <li>images (object with fresh and dried URLs)</li>
        </ul>
      </div>
    </div>
  );
}
