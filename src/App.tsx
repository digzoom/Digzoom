import { useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import { CartProvider } from '@/hooks/useCart';
import { LanguageProvider } from '@/hooks/useLanguage';
import { AuthProvider, useAuth } from '@/hooks/useAuth';
import { initGA, trackPageView } from '@/hooks/useAnalytics';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ChatBot from '@/components/ChatBot';
import CouponPopup from '@/components/CouponPopup';
import Home from '@/pages/Home';
import Shop from '@/pages/Shop';
import ProductDetail from '@/pages/ProductDetail';
import Cart from '@/pages/Cart';
import Checkout from '@/pages/Checkout';
import ThankYou from '@/pages/ThankYou';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import Login from '@/pages/Login';
import AdminDashboard from '@/pages/AdminDashboard';
import Subscriptions from '@/pages/Subscriptions';
import SocialServices from '@/pages/SocialServices';
import PlatformServices from '@/pages/PlatformServices';
import SocialServiceOrder from '@/pages/SocialServiceOrder';
import MarketingServices from '@/pages/MarketingServices';

// Track page views
function AnalyticsTracker() {
  const location = useLocation();
  useEffect(() => {
    trackPageView(location.pathname);
  }, [location]);
  return null;
}

// Protected route for admin
function AdminGuard({ children }: { children: React.ReactNode }) {
  const { user, isAdmin, isLoading } = useAuth();
  if (isLoading) return null;
  if (!user) return <Navigate to="/login" />;
  if (!isAdmin) return <Navigate to="/" />;
  return <>{children}</>;
}

// Layout without footer
function AuthLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

// Main layout with navbar + footer
function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}

function App() {
  useEffect(() => {
    initGA();
  }, []);

  return (
    <LanguageProvider>
      <AuthProvider>
        <CartProvider>
          <HashRouter>
            <div className="min-h-screen bg-[#0a0a0f] text-white antialiased">
              <AnalyticsTracker />
              <Routes>
                {/* Auth routes (no navbar/footer) */}
                <Route path="/login" element={<AuthLayout><Login /></AuthLayout>} />

                {/* Admin route (custom layout) */}
                <Route path="/admin" element={<AdminGuard><AdminDashboard /></AdminGuard>} />

                {/* Main routes */}
                <Route path="/" element={<MainLayout><Home /></MainLayout>} />
                <Route path="/shop" element={<MainLayout><Shop /></MainLayout>} />
                <Route path="/product/:id" element={<MainLayout><ProductDetail /></MainLayout>} />
                <Route path="/cart" element={<MainLayout><Cart /></MainLayout>} />
                <Route path="/checkout" element={<MainLayout><Checkout /></MainLayout>} />
                <Route path="/thank-you" element={<MainLayout><ThankYou /></MainLayout>} />
                <Route path="/about" element={<MainLayout><About /></MainLayout>} />
                <Route path="/contact" element={<MainLayout><Contact /></MainLayout>} />
                <Route path="/subscriptions" element={<MainLayout><Subscriptions /></MainLayout>} />
                <Route path="/social" element={<MainLayout><SocialServices /></MainLayout>} />
                <Route path="/social/:platformId" element={<MainLayout><PlatformServices /></MainLayout>} />
                <Route path="/social/:platformId/:serviceId" element={<MainLayout><SocialServiceOrder /></MainLayout>} />
                <Route path="/marketing" element={<MainLayout><MarketingServices /></MainLayout>} />
              </Routes>
              {/* AI Chat Support - always visible */}
              <ChatBot />
              
              {/* Smart Coupon Popup - time-based */}
              <CouponPopup />

              <Toaster
                position="top-left"
                toastOptions={{
                  style: {
                    background: '#151520',
                    color: '#fff',
                    border: '1px solid rgba(255,255,255,0.08)',
                    fontFamily: 'inherit',
                  },
                }}
              />
            </div>
          </HashRouter>
        </CartProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
