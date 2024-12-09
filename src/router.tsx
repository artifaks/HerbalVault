import { createBrowserRouter } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { BlogPage } from './pages/BlogPage';
import { GuidesPage } from './pages/GuidesPage';
import { ProductsPage } from './pages/ProductsPage';
import { AdminPage } from './pages/AdminPage';
import { HerbPage } from './pages/HerbPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/about',
    element: <AboutPage />,
  },
  {
    path: '/blog',
    element: <BlogPage />,
  },
  {
    path: '/guides',
    element: <GuidesPage />,
  },
  {
    path: '/products',
    element: <ProductsPage />,
  },
  {
    path: '/admin',
    element: <AdminPage />,
  },
  {
    path: '/herbs/:id',
    element: <HerbPage />,
  },
  {
    path: '/herbs',
    element: <ProductsPage />, // Assuming this is where you want to show all herbs
  },
]);
