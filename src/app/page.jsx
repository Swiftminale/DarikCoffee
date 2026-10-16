import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Ticker from '../components/Ticker';
import QualitySection from '../components/QualitySection';
import MenuSection from '../components/MenuSection';
import SpecialPromo from '../components/SpecialPromo';
import GallerySection from '../components/GallerySection';
import Testimonials from '../components/Testimonials';
import HeritageBanner from '../components/HeritageBanner';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0E0704] text-[#FAF6F0] selection:bg-[#C88A36] selection:text-[#140C07]">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Animated Marquee Ribbon */}
      <Ticker variant="gold" />

      {/* Quality Highlights (3 Cards) */}
      <QualitySection />

      {/* Secondary Ticker */}
      <Ticker reverse variant="dark" />

      {/* Coffee Menu Catalog with Add-to-Bag & Filters */}
      <MenuSection />

      {/* Today's Special (50% Off Promo Banner) */}
      <SpecialPromo />

      {/* Bento Shop Gallery & Lightbox */}
      <GallerySection />

      {/* Customer Testimonials & Reviews */}
      <Testimonials />

      {/* Since 1945 Heritage Ribbon */}
      <HeritageBanner />

      {/* Proverb Quote, Newsletter & Locations */}
      <Footer />
    </main>
  );
}
