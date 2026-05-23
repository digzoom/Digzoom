import { useMemo, useCallback } from 'react';
import { useLanguage } from './useLanguage';
import { products, categories, coupons, subscriptions, getProductById, getProductsByCategory, getFeaturedProducts, getTrendingProducts, getNewArrivals, getRelatedProducts } from '@/data/products';
// import type { Product } from '@/types';

export type Lang = 'ar' | 'en';

export function useProducts() {
  const { lang } = useLanguage();

  const translatedProducts = useMemo(() => {
    // In real app, translate based on lang
    return products;
  }, [lang]);

  const featured = useMemo(() => getFeaturedProducts(8), []);
  const trending = useMemo(() => getTrendingProducts(8), []);
  const newArrivals = useMemo(() => getNewArrivals(8), []);

  const getById = useCallback((id: number) => getProductById(id), []);
  const getByCategory = useCallback((cat: string) => getProductsByCategory(cat), []);
  const getRelated = useCallback((id: number) => getRelatedProducts(id, 4), []);

  const applyCoupon = useCallback((code: string, subtotal: number): number => {
    const c = coupons[code.toUpperCase()];
    if (!c) return subtotal;
    if (c.type === 'percent') return subtotal * (1 - c.discount / 100);
    return Math.max(0, subtotal - c.discount);
  }, []);

  return {
    products: translatedProducts,
    categories,
    subscriptions,
    coupons,
    featured,
    trending,
    newArrivals,
    getById,
    getByCategory,
    getRelated,
    applyCoupon,
  };
}

export { products, categories, coupons, subscriptions };
