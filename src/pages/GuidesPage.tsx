import React, { useState } from 'react';
import { SearchBar } from '../components/ui/SearchBar';
import { GuideCard } from '../components/guides/GuideCard';
import { GROWING_GUIDES } from '../lib/constants/guides';
import { Leaf } from 'lucide-react';

export function GuidesPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredGuides = GROWING_GUIDES.filter((guide) =>
    guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    guide.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-12 text-center">
        <div className="mb-4 flex justify-center">
          <Leaf className="h-12 w-12 text-green-600" />
        </div>
        <h1 className="mb-4 text-4xl font-bold text-gray-900">Growing Guides</h1>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600">
          Learn how to grow and maintain your own medicinal herb garden with our comprehensive
          guides and expert tips.
        </p>
        <div className="mx-auto max-w-xl">
          <SearchBar
            onSearch={setSearchQuery}
            placeholder="Search guides by name or description..."
          />
        </div>
      </div>

      <div className="mb-8">
        <h2 className="mb-6 text-2xl font-bold text-gray-900">Featured Guides</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredGuides.map((guide) => (
            <GuideCard key={guide.id} guide={guide} />
          ))}
        </div>
      </div>

      <section className="rounded-lg bg-green-50 p-6">
        <div className="flex items-start space-x-4">
          <Leaf className="h-6 w-6 flex-shrink-0 text-green-600" />
          <div>
            <h3 className="mb-2 text-lg font-semibold text-green-800">
              Growing Tips
            </h3>
            <ul className="list-inside list-disc space-y-2 text-green-700">
              <li>Always check your local growing zone before starting</li>
              <li>Start small and expand gradually as you gain experience</li>
              <li>Keep detailed records of your planting and harvesting dates</li>
              <li>Consider using organic growing methods for medicinal herbs</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}