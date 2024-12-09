import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SearchBar } from '../components/ui/SearchBar';
import { FeaturedHerb } from '../components/herbs/FeaturedHerb';
import { RecommendedHerbs } from '../components/herbs/RecommendedHerbs';
import { AlertTriangle, Filter } from 'lucide-react';
import { FEATURED_HERBS } from '../lib/constants/herbs';
import { useUserStore } from '../lib/store/user';

type FilterOption = 'all' | 'immune' | 'sleep' | 'digestive' | 'anxiety';

export function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterOption>('all');
  const addSearchTerm = useUserStore((state) => state.addSearchTerm);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query) addSearchTerm(query);
  };

  const filterHerbs = (herbs: typeof FEATURED_HERBS) => {
    return herbs.filter((herb) => {
      const matchesSearch =
        !searchQuery ||
        herb.commonName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        herb.scientificName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        herb.traditionalUses.some((use) =>
          use.toLowerCase().includes(searchQuery.toLowerCase())
        );

      const matchesFilter =
        activeFilter === 'all' ||
        herb.traditionalUses.some((use) =>
          use.toLowerCase().includes(activeFilter.toLowerCase())
        );

      return matchesSearch && matchesFilter;
    });
  };

  const filteredHerbs = filterHerbs(FEATURED_HERBS);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 text-center"
      >
        <h1 className="mb-4 text-4xl font-bold text-gray-900">
          Discover the Healing Power of Herbs
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600">
          Explore our comprehensive database of medicinal herbs, traditional remedies, and
          scientific research.
        </p>
        <div className="mx-auto max-w-2xl">
          <SearchBar
            onSearch={handleSearch}
            placeholder="Search by herb name, ailment, or benefit..."
          />
        </div>
      </motion.section>

      <RecommendedHerbs />

      <section className="mb-12">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-2xl font-bold text-gray-900">Featured Herbs</h2>
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <div className="flex space-x-2">
              {[
                { value: 'all', label: 'All' },
                { value: 'immune', label: 'Immune Support' },
                { value: 'sleep', label: 'Sleep Aid' },
                { value: 'digestive', label: 'Digestive' },
                { value: 'anxiety', label: 'Anxiety Relief' },
              ].map((filter) => (
                <motion.button
                  key={filter.value}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveFilter(filter.value as FilterOption)}
                  className={`rounded-full px-4 py-2 text-sm transition-colors ${
                    activeFilter === filter.value
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {filter.label}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
        {filteredHerbs.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredHerbs.map((herb) => (
              <FeaturedHerb key={herb.id} herb={herb} />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex min-h-[200px] items-center justify-center rounded-lg border-2 border-dashed border-gray-200"
          >
            <p className="text-gray-500">No herbs found matching your criteria</p>
          </motion.div>
        )}
      </section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-lg bg-yellow-50 p-6"
      >
        <div className="flex items-start space-x-4">
          <AlertTriangle className="h-6 w-6 flex-shrink-0 text-yellow-600" />
          <div>
            <h3 className="mb-2 text-lg font-semibold text-yellow-800">
              Important Medical Disclaimer
            </h3>
            <p className="text-yellow-700">
              The information provided on this website is for educational purposes only and is not
              intended as medical advice. Always consult with a qualified healthcare provider
              before using any herbs or natural remedies, especially if you are pregnant,
              nursing, or taking medications.
            </p>
          </div>
        </div>
      </motion.section>
    </div>
  );
}