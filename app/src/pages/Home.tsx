import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import SocialServicesHome from '@/components/SocialServicesHome';
import MarketingServicesHome from '@/components/MarketingServicesHome';
import Categories from '@/components/Categories';
import FeaturedProducts from '@/components/FeaturedProducts';
import Footer from '@/components/Footer';
import CouponPopup from '@/components/CouponPopup';
import { useLanguage } from '@/hooks/useLanguage';

export default function Home() {
  const { lang } = useLanguage();
  return (
    <>
      <Navbar />
      <Hero />
      <Stats />
      <SocialServicesHome lang={lang as 'ar' | 'en'} />
      <MarketingServicesHome lang={lang as 'ar' | 'en'} />
      <Stats />
      <Categories />
      <FeaturedProducts />
      <Footer />
      <CouponPopup />
    </>
  );
}
