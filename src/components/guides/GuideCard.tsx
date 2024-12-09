import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Thermometer, Sun, Droplet } from 'lucide-react';
import type { GrowingGuide } from '../../types/guide';

interface GuideCardProps {
  guide: GrowingGuide;
}

export function GuideCard({ guide }: GuideCardProps) {
  return (
    <Link
      to={`/guides/${guide.id}`}
      className="group overflow-hidden rounded-lg bg-white shadow-md transition-transform hover:scale-[1.02]"
    >
      <div className="relative h-48">
        <img
          src={guide.image}
          alt={guide.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <span className="inline-block rounded-full bg-white/20 px-3 py-1 text-sm text-white backdrop-blur-sm">
            {guide.difficulty}
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="mb-2 text-lg font-semibold text-gray-900">{guide.title}</h3>
        <p className="mb-4 text-sm text-gray-600 line-clamp-2">{guide.description}</p>
        
        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
          <div className="flex items-center">
            <Clock className="mr-2 h-4 w-4" />
            {guide.duration}
          </div>
          <div className="flex items-center">
            <Sun className="mr-2 h-4 w-4" />
            {guide.requirements.light}
          </div>
          <div className="flex items-center">
            <Droplet className="mr-2 h-4 w-4" />
            {guide.requirements.water}
          </div>
          <div className="flex items-center">
            <Thermometer className="mr-2 h-4 w-4" />
            {guide.requirements.temperature}
          </div>
        </div>
      </div>
    </Link>
  );
}