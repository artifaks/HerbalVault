import React from 'react';
import { createBrowserRouter, RouterProvider, Route, Outlet } from 'react-router-dom';
import { Banner } from './components/layout/Banner';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { HerbPage } from './pages/HerbPage';
import { GuidesPage } from './pages/GuidesPage';
import { AboutPage } from './pages/AboutPage';
import { AdminPage } from './pages/AdminPage';
import { BlogPage } from './pages/BlogPage';
import { ProductsPage } from './pages/ProductsPage';
import { useAuthStore } from './lib/store/auth';
import { Toaster } from 'react-hot-toast';

// Layout component to wrap all routes
function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Toaster position="top-right" />
      <Banner />
      <Header />
      <main className="flex-1 bg-primary-50">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

// Define routes
const routes = [
  {
    element: <Layout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/herbs', element: <ProductsPage /> },
      { path: '/herbs/:id', element: <HerbPage /> },
      { path: '/guides', element: <GuidesPage /> },
      { path: '/about', element: <AboutPage /> },
      { path: '/admin', element: <AdminPage /> },
      { path: '/blog', element: <BlogPage /> },
      { path: '/products', element: <ProductsPage /> }
    ]
  }
];

// Create router instance
const router = createBrowserRouter(routes);

export function App() {
  return <RouterProvider router={router} />;
}

export default App;