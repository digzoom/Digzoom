import { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'https://digzoom-production.up.railway.app';

export interface Product {
  id: number;
  slug: string;
  titleAr: string;
  titleEn: string;
  descriptionAr: string | null;
  descriptionEn: string | null;
  price: string;
  originalPrice: string | null;
  discount: number;
  image: string | null;
  categoryId: number | null;
  fileType: string | null;
  fileSize: string | null;
  features: any;
  rating: string | null;
  reviewCount: number;
  salesCount: number;
  isFeatured: boolean;
  inStock: boolean;
}

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${API_URL}/api/trpc/products.list`)
      .then(r => r.json())
      .then(d => {
        const items = d?.result?.data?.json?.items || [];
        setProducts(items);
        setLoading(false);
      })
      .catch(e => {
        console.error('Products error:', e);
        setError('Failed to load products');
        setLoading(false);
      });

    fetch(`${API_URL}/api/trpc/categories.list`)
      .then(r => r.json())
      .then(d => {
        const items = d?.result?.data?.json || [];
        setCategories(items);
      })
      .catch(console.error);
  }, []);

  const featured = products.filter(p => p.isFeatured);

  return { products, categories, loading, error, featured };
}
