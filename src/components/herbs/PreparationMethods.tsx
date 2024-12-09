import React from 'react';
import type { Preparation } from '../../types/herb';
import { Beaker, Clock, List } from 'lucide-react';

interface PreparationMethodsProps {
  preparations: Preparation[];
}

export function PreparationMethods({ preparations }: PreparationMethodsProps) {
  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold">Preparation Methods</h2>
      <div className="grid gap-6 md:grid-cols-2">
        {preparations.map((prep, index) => (
          <div
            key={index}
            className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
          >
            <div className="mb-4 flex items-center">
              <Beaker className="mr-2 h-5 w-5 text-green-600" />
              <h3 className="text-lg font-semibold capitalize">{prep.type}</h3>
            </div>
            <div className="space-y-4">
              <div>
                <div className="mb-1 flex items-center text-sm text-gray-600">
                  <Clock className="mr-1 h-4 w-4" />
                  Duration: {prep.duration}
                </div>
                <p className="text-gray-700">{prep.instructions}</p>
              </div>
              <div>
                <div className="mb-1 flex items-center text-sm text-gray-600">
                  <List className="mr-1 h-4 w-4" />
                  Materials needed:
                </div>
                <ul className="list-inside list-disc space-y-1 text-gray-700">
                  {prep.materials.map((material, idx) => (
                    <li key={idx}>{material}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}