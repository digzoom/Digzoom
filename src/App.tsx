import { Routes, Route } from 'react-router'
import { Toaster } from '@/components/ui/sonner'
import { TRPCProvider } from '@/providers/trpc'
import Home from './pages/Home'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import About from './pages/About'
import Contact from './pages/Contact'
import Shop from './pages/Shop'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import ThankYou from './pages/ThankYou'
import SocialServices from './pages/SocialServices'
import SocialServiceOrder from './pages/SocialServiceOrder'
import PlatformServices from './pages/PlatformServices'
import MarketingServices from './pages/MarketingServices'
import Subscriptions from './pages/Subscriptions'

export default function App() {
  return (
    <TRPCProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/:category" element={<Shop />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/thank-you" element={<ThankYou />} />
        <Route path="/social" element={<SocialServices />} />
        <Route path="/social/:platform" element={<PlatformServices />} />
        <Route path="/social-order" element={<SocialServiceOrder />} />
        <Route path="/marketing" element={<MarketingServices />} />
        <Route path="/subscriptions" element={<Subscriptions />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster position="top-center" richColors />
    </TRPCProvider>
  )
}
