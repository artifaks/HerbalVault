import React, { useState } from 'react';
import { SearchBar } from '../components/ui/SearchBar';
import { BLOG_POSTS } from '../lib/constants/blog';
import { BookOpen, Calendar, User, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';

export function BlogPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = BLOG_POSTS.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold text-gray-900">Herbal Wisdom Blog</h1>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600">
          Explore our latest articles on herbal medicine, wellness tips, and traditional
          remedies.
        </p>
        <div className="mx-auto max-w-xl">
          <SearchBar
            onSearch={setSearchQuery}
            placeholder="Search articles..."
          />
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filteredPosts.map((post) => (
          <article
            key={post.id}
            className="overflow-hidden rounded-lg bg-white shadow-md transition-transform hover:scale-[1.02]"
          >
            <Link to={`/blog/${post.slug}`}>
              <img
                src={post.image}
                alt={post.title}
                className="h-48 w-full object-cover"
              />
              <div className="p-6">
                <div className="mb-4 flex items-center space-x-4 text-sm text-gray-500">
                  <span className="flex items-center">
                    <User className="mr-1 h-4 w-4" />
                    {post.author}
                  </span>
                  <span className="flex items-center">
                    <Calendar className="mr-1 h-4 w-4" />
                    {new Date(post.date).toLocaleDateString()}
                  </span>
                </div>
                <h2 className="mb-2 text-xl font-bold text-gray-900">{post.title}</h2>
                <p className="mb-4 text-gray-600 line-clamp-3">{post.excerpt}</p>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="flex items-center rounded-full bg-primary-50 px-3 py-1 text-sm text-primary-700"
                    >
                      <Tag className="mr-1 h-3 w-3" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}