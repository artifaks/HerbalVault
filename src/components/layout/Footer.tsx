import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Mail, Instagram, Twitter } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <Link to="/" className="flex items-center space-x-2">
              <Leaf className="h-6 w-6 text-green-600" />
              <span className="text-lg font-bold text-gray-900">Herbal Wisdom</span>
            </Link>
            <p className="mt-4 text-sm text-gray-600">
              Exploring the healing power of nature through traditional and modern herbal medicine.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/herbs" className="text-sm text-gray-600 hover:text-green-600">
                  Herb Directory
                </Link>
              </li>
              <li>
                <Link to="/guides" className="text-sm text-gray-600 hover:text-green-600">
                  Growing Guides
                </Link>
              </li>
              <li>
                <Link to="/research" className="text-sm text-gray-600 hover:text-green-600">
                  Research Database
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900">Legal</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/disclaimer" className="text-sm text-gray-600 hover:text-green-600">
                  Medical Disclaimer
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-sm text-gray-600 hover:text-green-600">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-gray-600 hover:text-green-600">
                  Terms of Use
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900">Connect</h3>
            <div className="mt-4 flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-green-600">
                <Mail className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-green-600">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-green-600">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
            <div className="mt-4">
              <form className="flex space-x-2">
                <input
                  type="email"
                  placeholder="Subscribe to newsletter"
                  className="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <button
                  type="submit"
                  className="rounded-lg bg-green-600 px-4 py-2 text-sm text-white hover:bg-green-700"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
        
        <div className="mt-8 border-t pt-8">
          <p className="text-center text-sm text-gray-600">
            © {new Date().getFullYear()} Herbal Wisdom. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}