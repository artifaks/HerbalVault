import React from 'react';
import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useUserStore } from '../../lib/store/user';

interface FavoriteButtonProps {
  herbId: string;
}

export function FavoriteButton({ herbId }: FavoriteButtonProps) {
  const { preferences, addFavorite, removeFavorite } = useUserStore();
  const isFavorite = preferences.favoriteHerbs.includes(herbId);

  const handleClick = () => {
    if (isFavorite) {
      removeFavorite(herbId);
    } else {
      addFavorite(herbId);
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={handleClick}
      className={`rounded-full p-2 transition-colors ${
        isFavorite
          ? 'bg-red-100 text-red-500 hover:bg-red-200'
          : 'bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-gray-600'
      }`}
    >
      <Heart
        className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`}
      />
    </motion.button>
  );
}