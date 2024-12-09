import React from 'react';
import type { Herb } from '../../types/herb';

interface HerbInfoProps {
  herb: Herb;
}

export function HerbInfo({ herb }: HerbInfoProps) {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="mb-4 text-2xl font-bold">Description</h2>
        <p className="text-gray-700">{herb.description}</p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold">Historical Background</h2>
        <p className="text-gray-700">{herb.history}</p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold">Uses</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h3 className="mb-2 text-lg font-semibold">Traditional Uses</h3>
            <ul className="list-inside list-disc space-y-1 text-gray-700">
              {herb.traditionalUses.map((use, index) => (
                <li key={index}>{use}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-2 text-lg font-semibold">Modern Uses</h3>
            <ul className="list-inside list-disc space-y-1 text-gray-700">
              {herb.modernUses.map((use, index) => (
                <li key={index}>{use}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}