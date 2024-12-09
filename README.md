# Herbal Wisdom Website - Content Management Guide

This guide explains how to modify and update the website's content and styling.

## Admin Access

The admin panel is accessible at `/admin` with the following credentials:
- Password: `admin123`

## Modifying Content

### 1. Herbs Database

You can manage herbs through the admin panel:
1. Log in to the admin panel
2. Use the "Upload Herb Images" section to add new herb images
3. Use the "Bulk Upload Herbs" section to add or update herb data in JSON format

Example herb JSON format:
```json
{
  "scientificName": "Matricaria chamomilla",
  "commonName": "German Chamomile",
  "description": "Gentle yet powerful herb...",
  "history": "Ancient Egyptians dedicated chamomile...",
  "traditionalUses": ["Sleep Aid", "Digestive Support"],
  "modernUses": ["Sleep improvement", "Digestive health"],
  "dosage": "1-3 cups daily",
  "safetyPrecautions": ["May cause allergic reactions"]
}
```

### 2. Blog Posts

Blog posts are managed through the `src/lib/constants/blog.ts` file. Add new posts by following this format:

```typescript
{
  id: 'unique-id',
  title: 'Your Blog Title',
  slug: 'url-friendly-title',
  author: 'Author Name',
  date: '2024-03-15',
  content: 'Full blog post content...',
  excerpt: 'Brief description for preview',
  image: 'https://image-url.com/your-image.jpg',
  tags: ['tag1', 'tag2'],
  relatedHerbs: [/* reference to herbs */]
}
```

### 3. Products

Products are managed in `src/lib/constants/products.ts`. Add new products using this format:

```typescript
{
  id: 'product-id',
  title: 'Product Title',
  description: 'Product description',
  price: 24.99,
  image: 'https://image-url.com/product-image.jpg',
  type: 'ebook' | 'course' | 'affiliate',
  link: 'https://purchase-link.com',
  featured: true | false
}
```

## Styling Modifications

### 1. Colors

The color scheme is defined in `tailwind.config.js`. The main colors are:

- Primary (Gold):
  ```js
  primary: {
    500: '#dcbf30', // Main gold color
    600: '#b39926', // Darker gold
    // ... other shades
  }
  ```

- Accent (Green):
  ```js
  accent: {
    500: '#3dc586', // Main green color
    600: '#319e6b', // Darker green
    // ... other shades
  }
  ```

To modify colors, update the corresponding values in the `tailwind.config.js` file.

### 2. Typography

Text styles are applied using Tailwind CSS classes:
- Headings: `text-4xl`, `text-2xl`, etc.
- Body text: `text-base`, `text-sm`, etc.
- Font weights: `font-bold`, `font-medium`, etc.

### 3. Layout

The site uses a responsive grid layout:
- Main content width: `max-w-7xl`
- Grid columns: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- Spacing: `px-4`, `py-8`, etc.

## Footer Links

Update footer links in `src/components/layout/Footer.tsx`:
1. Quick Links section
2. Legal Links section
3. Social media links
4. Newsletter subscription form

## Banner Customization

Modify the banner in `src/components/layout/Banner.tsx`:
1. Main heading text
2. Tagline text
3. Background gradient
4. Animations and effects

## Images

When adding new images:
1. Use high-quality, optimized images
2. Ensure proper licensing/attribution
3. Use Unsplash or similar free stock photo services
4. Maintain consistent aspect ratios
5. Consider mobile responsiveness

## Security Notes

1. Always keep the admin password secure
2. Regularly backup your content
3. Validate user inputs
4. Follow security best practices when deploying

## Support

For technical support or questions about content management, please contact the development team.