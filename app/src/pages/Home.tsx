import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import Categories from '@/components/Categories';
import SocialServicesHome from '@/components/SocialServicesHome';
import CTASection from '@/components/CTASection';
import WhyDigzoom from '@/components/WhyDigzoom';
import Footer from '@/components/Footer';
import CouponPopup from '@/components/CouponPopup';

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Stats />
      <Categories />
      <SocialServicesHome />
      <CTASection />
      <WhyDigzoom />
      <Footer />
      <CouponPopup />
    </>
  );
}
