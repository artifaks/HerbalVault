import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Lock } from 'lucide-react';
import { SearchBar } from '../ui/SearchBar';
import { useAuthStore } from '../../lib/store/auth';

export function Header() {
  const { isAuthenticated } = useAuthStore();

  const handleSearch = (query: string) => {
    // TODO: Implement search functionality
    console.log('Search query:', query);
  };

  return (
    <header className="border-b bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Leaf className="h-8 w-8 text-accent-500" />
            <span className="text-xl font-bold text-primary-600">Herbal Wisdom</span>
          </Link>
          <div className="flex-1 px-8">
            <SearchBar onSearch={handleSearch} />
          </div>
          <nav className="flex items-center space-x-6">
            <Link to="/herbs" className="text-gray-600 hover:text-accent-500">
              Browse Herbs
            </Link>
            <Link to="/guides" className="text-gray-600 hover:text-accent-500">
              Growing Guides
            </Link>
            <Link to="/blog" className="text-gray-600 hover:text-accent-500">
              Blog
            </Link>
            <Link to="/products" className="text-gray-600 hover:text-accent-500">
              Products
            </Link>
            <Link 
              to="/admin" 
              className="flex items-center space-x-1 rounded-full bg-primary-500 px-4 py-2 text-white transition-colors hover:bg-primary-600"
            >
              <Lock className="h-4 w-4" />
              <span>{isAuthenticated ? 'Admin Panel' : 'Login'}</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}