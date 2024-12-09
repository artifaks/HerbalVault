import React, { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { FEATURED_HERBS } from '../../lib/constants/herbs';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export function SearchBar({ onSearch, placeholder = 'Search herbs...' }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const commonSearches = [
    'immune support',
    'sleep aid',
    'digestive health',
    'anxiety relief',
    'inflammation',
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getSuggestions = (input: string) => {
    const inputLower = input.toLowerCase();
    
    // Combine herb names, uses, and common searches
    const allSuggestions = [
      ...FEATURED_HERBS.map((herb) => herb.commonName),
      ...FEATURED_HERBS.flatMap((herb) => herb.traditionalUses),
      ...commonSearches,
    ];

    return allSuggestions
      .filter((item) => item.toLowerCase().includes(inputLower))
      .slice(0, 5);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setSuggestions(value ? getSuggestions(value) : []);
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    onSearch(suggestion);
    setShowSuggestions(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
    setShowSuggestions(false);
  };

  const clearSearch = () => {
    setQuery('');
    setSuggestions([]);
    onSearch('');
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-2xl">
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={() => setShowSuggestions(true)}
          placeholder={placeholder}
          className="w-full rounded-lg border border-gray-200 px-4 py-2 pl-10 pr-10 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
        />
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        {query && (
          <button
            type="button"
            onClick={clearSearch}
            className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </form>

      {/* Search Suggestions */}
      {showSuggestions && (suggestions.length > 0 || !query) && (
        <div className="absolute z-10 mt-1 w-full rounded-lg border border-gray-200 bg-white py-2 shadow-lg">
          {!query && (
            <div className="px-4 py-2">
              <p className="mb-2 text-xs font-semibold text-gray-500">Popular Searches</p>
              <div className="flex flex-wrap gap-2">
                {commonSearches.map((search) => (
                  <button
                    key={search}
                    onClick={() => handleSuggestionClick(search)}
                    className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700 hover:bg-gray-200"
                  >
                    {search}
                  </button>
                ))}
              </div>
            </div>
          )}
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}