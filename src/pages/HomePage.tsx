import { useState } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Collections from '../components/Collections';
import BridalHighlight from '../components/BridalHighlight';
import ShopByGender from '../components/ShopByGender';
import InfoSection from '../components/InfoSection';
import Reviews from '../components/Reviews';
import StoreInfo from '../components/StoreInfo';
import Footer from '../components/Footer';

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState<'gold' | 'silver'>('gold');

  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Features />
      <Collections />
      <ShopByGender />
      <BridalHighlight />
      <InfoSection />
      <Reviews />
      <StoreInfo />
      <Footer />
    </div>
  );
}
