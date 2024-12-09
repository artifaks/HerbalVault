export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  type: 'ebook' | 'course' | 'affiliate';
  link: string;
  featured: boolean;
}