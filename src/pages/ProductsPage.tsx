import React from 'react';
import { ProductCard } from '../components/products/ProductCard';
import { PRODUCTS } from '../lib/constants/products';
import { BookOpen, ShoppingBag } from 'lucide-react';

export function ProductsPage() {
  const featuredProducts = PRODUCTS.filter((product) => product.featured);
  const otherProducts = PRODUCTS.filter((product) => !product.featured);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold text-gray-900">Resources & Products</h1>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600">
          Discover our curated collection of herbal guides, courses, and recommended products.
        </p>
      </div>

      {featuredProducts.length > 0 && (
        <section className="mb-12">
          <h2 className="mb-6 flex items-center text-2xl font-bold text-gray-900">
            <BookOpen className="mr-2 h-6 w-6 text-primary-500" />
            Featured Resources
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      <section>
        <h2 className="mb-6 flex items-center text-2xl font-bold text-gray-900">
          <ShoppingBag className="mr-2 h-6 w-6 text-primary-500" />
          All Products
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {otherProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}