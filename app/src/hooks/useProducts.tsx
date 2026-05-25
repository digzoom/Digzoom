import { useState } from 'react';
import type { Product } from '@/types';

// Local products data (will be replaced with API call)
const defaultProducts: Product[] = [
  { id: 1, title: "قوالب فيديو الزفاف السينمائي", description: "مجموعة احترافية من قوالب فيديو الزفاف", longDescription: "مجموعة شاملة من قوالب فيديو الزفاف السينمائية بجودة 4K", price: 189, originalPrice: 379, image: "/images/products/wedding.jpg", category: "videos", rating: 4.9, reviews: 289, features: ["4K","50+ Templates"], fileType: "AE", fileSize: "12GB", inStock: true },
  { id: 2, title: "فيديوهات اليوجا والتأمل 4K", description: "فيديوهات احترافية لليوجا والتأمل", longDescription: "فيديوهات احترافية لليوجا والتأمل بدقة 4K", price: 169, originalPrice: 339, image: "/images/products/yoga.jpg", category: "videos", rating: 4.8, reviews: 234, features: ["4K","100+ Videos"], fileType: "MP4", fileSize: "8GB", inStock: true },
  { id: 3, title: "موسوعة التجارة الإلكترونية", description: "دليلك الشامل للتجارة الإلكترونية", longDescription: "دليلك الشامل لبناء متجر إلكتروني ناجح من الصفر", price: 99, originalPrice: 199, image: "/images/products/ecommerce.jpg", category: "ebooks", rating: 4.9, reviews: 823, features: ["500+ Pages"], fileType: "PDF", fileSize: "45MB", inStock: true },
  { id: 4, title: "دليل التسويق الرقمي 2025", description: "أحدث استراتيجيات التسويق الرقمي", longDescription: "أحدث استراتيجيات التسويق الرقمي لعام 2025", price: 79, originalPrice: 159, image: "/images/products/marketing.jpg", category: "ebooks", rating: 4.8, reviews: 567, features: ["2025 Updated"], fileType: "PDF", fileSize: "32MB", inStock: true },
  { id: 5, title: "مجموعة الخط العربي الإسلامي", description: "مجموعة فاخرة من الخطوط الإسلامية", longDescription: "مجموعة فاخرة من الخطوط العربية الإسلامية", price: 149, originalPrice: 299, image: "/images/products/calligraphy.jpg", category: "fonts", rating: 4.9, reviews: 445, features: ["50+ Fonts"], fileType: "OTF", fileSize: "250MB", inStock: true },
  { id: 6, title: "مجموعة أدوات الذكاء الاصطناعي", description: "أدوات AI للمحترفين", longDescription: "أدوات وتطبيقات الذكاء الاصطناعي للمحترفين", price: 199, originalPrice: 399, image: "/images/products/ai-tools.jpg", category: "code", rating: 4.9, reviews: 678, features: ["AI Prompts"], fileType: "Various", fileSize: "3GB", inStock: true },
];

export function useProducts() {
  const [products] = useState<Product[]>(defaultProducts);
  const [loading] = useState(false);
  const featured = products.filter((_, i) => i < 6);

  const getProductBySlug = (slug: string) => {
    return products.find(p => p.id.toString() === slug);
  };

  const getFeaturedProducts = () => {
    return featured;
  };

  return {
    products,
    loading,
    featured,
    getProductBySlug,
    getFeaturedProducts,
  };
}
