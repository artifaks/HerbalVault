import React from 'react';
import { useParams } from 'react-router-dom';
import { FEATURED_HERBS } from '../lib/constants/herbs';
import { HerbHeader } from '../components/herbs/HerbHeader';
import { HerbInfo } from '../components/herbs/HerbInfo';
import { PreparationMethods } from '../components/herbs/PreparationMethods';
import { SafetyInfo } from '../components/herbs/SafetyInfo';

export function HerbPage() {
  const { id } = useParams<{ id: string }>();
  const herb = FEATURED_HERBS.find((h) => h.id === id);

  if (!herb) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="text-xl text-gray-600">Herb not found</p>
      </div>
    );
  }

  return (
    <div>
      <HerbHeader herb={herb} />
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid gap-12">
          <HerbInfo herb={herb} />
          <PreparationMethods preparations={herb.preparations} />
          <SafetyInfo
            precautions={herb.safetyPrecautions}
            interactions={herb.interactions}
            dosage={herb.dosage}
          />
        </div>
      </div>
    </div>
  );
}