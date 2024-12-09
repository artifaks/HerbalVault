import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Leaf, Star, Beaker, Clock } from 'lucide-react';
import { FavoriteButton } from '../ui/FavoriteButton';
import type { Herb } from '../../types/herb';

interface FeaturedHerbProps {
  herb: Herb;
}

export function FeaturedHerb({ herb }: FeaturedHerbProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div
        className="group relative overflow-hidden rounded-lg bg-white shadow-lg transition-all duration-300 hover:shadow-xl"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative h-48">
          <img
            src={herb.images.fresh}
            alt={herb.commonName}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-white">{herb.commonName}</h3>
                <p className="text-sm italic text-gray-200">{herb.scientificName}</p>
              </div>
              <FavoriteButton herbId={herb.id} />
            </div>
          </div>
        </div>
        
        <Link to={`/herbs/${herb.id}`} className="block p-4">
          <div className="mb-4">
            <div className="flex items-start space-x-2">
              <Leaf className="mt-1 h-5 w-5 flex-shrink-0 text-accent-500" />
              <p className="text-sm text-gray-600 line-clamp-2">{herb.description}</p>
            </div>
          </div>
          
          <div className="mb-4">
            <h4 className="mb-2 flex items-center text-sm font-semibold text-gray-700">
              <Star className="mr-1 h-4 w-4 text-primary-500" />
              Did you know?
            </h4>
            <p className="text-sm text-gray-600 line-clamp-2">
              {herb.history.split('.')[0]}.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {herb.traditionalUses.slice(0, 3).map((use, index) => (
              <span
                key={index}
                className="rounded-full bg-accent-50 px-3 py-1 text-xs font-medium text-accent-700"
              >
                {use}
              </span>
            ))}
          </div>

          <motion.div
            initial={false}
            animate={{
              height: isHovered ? 'auto' : 0,
              opacity: isHovered ? 1 : 0,
            }}
            transition={{ duration: 0.2 }}
            className="mt-4 overflow-hidden border-t pt-4"
          >
            <h4 className="mb-2 flex items-center text-sm font-semibold text-gray-700">
              <Beaker className="mr-1 h-4 w-4 text-primary-500" />
              Preparation Methods
            </h4>
            <ul className="space-y-1 text-sm text-gray-600">
              {herb.preparations.map((prep, index) => (
                <li key={index} className="flex items-center">
                  <Clock className="mr-1 h-3 w-3" />
                  {prep.type} - {prep.duration}
                </li>
              ))}
            </ul>
          </motion.div>
        </Link>
      </div>
    </motion.div>
  );
}