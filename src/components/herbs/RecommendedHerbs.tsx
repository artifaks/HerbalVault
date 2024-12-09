import React from 'react';
import { motion } from 'framer-motion';
import { useUserStore } from '../../lib/store/user';
import { FEATURED_HERBS } from '../../lib/constants/herbs';
import { FeaturedHerb } from './FeaturedHerb';

export function RecommendedHerbs() {
  const { preferences } = useUserStore();
  const { favoriteHerbs, searchHistory } = preferences;

  const getRecommendedHerbs = () => {
    // Get herbs similar to user's favorites and search history
    const relevantTerms = [
      ...favoriteHerbs,
      ...searchHistory.flatMap((term) =>
        term.split(' ').filter((word) => word.length > 3)
      ),
    ];

    return FEATURED_HERBS.filter((herb) => {
      if (favoriteHerbs.includes(herb.id)) return false;

      const relevanceScore = relevantTerms.reduce((score, term) => {
        const termLower = term.toLowerCase();
        if (
          herb.traditionalUses.some((use) =>
            use.toLowerCase().includes(termLower)
          ) ||
          herb.commonName.toLowerCase().includes(termLower) ||
          herb.description.toLowerCase().includes(termLower)
        ) {
          return score + 1;
        }
        return score;
      }, 0);

      return relevanceScore > 0;
    }).slice(0, 3);
  };

  const recommendedHerbs = getRecommendedHerbs();

  if (recommendedHerbs.length === 0) return null;

  return (
    <section className="mb-12">
      <h2 className="mb-6 text-2xl font-bold text-gray-900">Recommended for You</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {recommendedHerbs.map((herb, index) => (
          <motion.div
            key={herb.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <FeaturedHerb herb={herb} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}