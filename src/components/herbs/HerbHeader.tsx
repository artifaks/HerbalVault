import React from 'react';
import type { Herb } from '../../types/herb';

interface HerbHeaderProps {
  herb: Herb;
}

export function HerbHeader({ herb }: HerbHeaderProps) {
  return (
    <div className="relative mb-8">
      <div className="h-64 overflow-hidden">
        <img
          src={herb.images.fresh}
          alt={herb.commonName}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <h1 className="text-3xl font-bold">{herb.commonName}</h1>
        <p className="mt-2 text-lg italic">{herb.scientificName}</p>
      </div>
    </div>
  );
}