import React from 'react';
import { ExternalLink, BookOpen, Video, ShoppingBag } from 'lucide-react';
import type { Product } from '../../types/product';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const TypeIcon = {
    ebook: BookOpen,
    course: Video,
    affiliate: ShoppingBag,
  }[product.type];

  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-lg">
      <div className="relative">
        <img
          src={product.image}
          alt={product.title}
          className="h-48 w-full object-cover"
        />
        {product.featured && (
          <span className="absolute left-4 top-4 rounded-full bg-primary-500 px-3 py-1 text-sm font-medium text-white">
            Featured
          </span>
        )}
      </div>
      <div className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <span className="flex items-center text-gray-500">
            <TypeIcon className="mr-2 h-5 w-5" />
            <span className="text-sm capitalize">{product.type}</span>
          </span>
          <span className="text-lg font-bold text-primary-600">
            ${product.price.toFixed(2)}
          </span>
        </div>
        <h3 className="mb-2 text-xl font-bold text-gray-900">{product.title}</h3>
        <p className="mb-4 text-gray-600">{product.description}</p>
        <a
          href={product.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center rounded-lg bg-primary-500 px-4 py-2 text-white transition-colors hover:bg-primary-600"
        >
          Learn More
          <ExternalLink className="ml-2 h-4 w-4" />
        </a>
      </div>
    </div>
  );
}