import React, { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import imageCompression from 'browser-image-compression';

interface ImageUploadProps {
  onImageSelect: (file: File, preview: string) => void;
  initialPreview?: string;
}

export function ImageUpload({ onImageSelect, initialPreview }: ImageUploadProps) {
  const [preview, setPreview] = useState<string>(initialPreview || '');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = async (file: File) => {
    try {
      // Compress image before upload
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      };
      
      const compressedFile = await imageCompression(file, options);
      const reader = new FileReader();
      
      reader.onloadend = () => {
        const previewUrl = reader.result as string;
        setPreview(previewUrl);
        onImageSelect(compressedFile, previewUrl);
      };
      
      reader.readAsDataURL(compressedFile);
    } catch (error) {
      console.error('Error processing image:', error);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      await handleImageSelect(file);
    }
  };

  const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await handleImageSelect(file);
    }
  };

  const clearImage = () => {
    setPreview('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-4">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileInput}
        accept="image/*"
        className="hidden"
      />
      
      {preview ? (
        <div className="relative">
          <img
            src={preview}
            alt="Preview"
            className="rounded-lg object-cover"
            style={{ maxHeight: '300px' }}
          />
          <button
            onClick={clearImage}
            className="absolute right-2 top-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 transition-colors ${
            isDragging
              ? 'border-primary-500 bg-primary-50'
              : 'border-gray-300 hover:border-primary-500 hover:bg-gray-50'
          }`}
        >
          <ImageIcon className="mb-4 h-12 w-12 text-gray-400" />
          <p className="mb-2 text-sm font-medium text-gray-600">
            Drag and drop an image, or click to select
          </p>
          <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
        </div>
      )}
    </div>
  );
}