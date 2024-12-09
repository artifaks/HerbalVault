import type { BlogPost } from '../../types/blog';
import { FEATURED_HERBS } from './herbs';

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'The Ancient Art of Herbal Tea Blending',
    slug: 'ancient-art-herbal-tea-blending',
    author: 'Sarah Green',
    date: '2024-03-15',
    content: `Learn the art of creating your own herbal tea blends...`,
    excerpt: 'Discover how to create personalized herbal tea blends using traditional wisdom and modern techniques.',
    image: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12',
    tags: ['tea', 'recipes', 'wellness'],
    relatedHerbs: [FEATURED_HERBS[0], FEATURED_HERBS[1]],
  },
  // Add more blog posts as needed
];