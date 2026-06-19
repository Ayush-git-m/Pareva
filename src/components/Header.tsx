import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import { api } from '../lib/api';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [goldRate, setGoldRate] = useState<string | null>(null);
  const [silverRate, setSilverRate] = useState<string | null>(null);
  const [currentRateIndex, setCurrentRateIndex] = useState(0);

  useEffect(() => {
    async function fetchRate() {
      try {
        const settings = await api.getSettings();
        if (settings.goldRate22k) {
          setGoldRate(settings.goldRate22k);
        }
        if (settings.silverRate) {
          setSilverRate(settings.silverRate);
        }
      } catch (err) {
        console.error("Error fetching gold rate in header", err);
      }
    }
    fetchRate();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRateIndex((prev) => prev + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const getDisplayRate = () => {
    const activeRates = [];
    if (goldRate) activeRates.push(`22K: ${goldRate}`);
    if (silverRate) activeRates.push(`Silver: ${silverRate}`);
    
    if (activeRates.length === 0) return 'Live Market Rates';
    return activeRates[currentRateIndex % activeRates.length];
  };

  return (
    <nav className="sticky top-0 z-50 glass-nav border-b border-outline-variant/30">
      <div className="max-w-container-max mx-auto px-gutter py-4 flex justify-between items-center">
        <div className="flex items-center justify-between w-full md:w-auto md:gap-8">
          <Link
            className="transition-transform duration-300 hover:scale-105"
            to="/#home"
          >
            <img
              alt="Shree Pareva Jewellers"
              className="h-16 md:h-28 object-contain mix-blend-multiply"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBGsVbbz4I9eCUbSQ5c-rtCZwzgzJYZMl_uaeIErVgSKL9hWuFxF2QaEZS2r22Wfs2a9iRZzj6VjkWSvmzHEwcFR7vwxhwzOc2R9Z-RduwVDc-qSa9UAUHzdVhGIBH6Wc1alemPW2ZZsR5rq5dXfLpa1nTe2aU2ET9rdiirEtezvPembjmmmzFZPmSA-6LmUDD29OTn4oHeK-juvT1t9x2vh4ADl295j5xzR4oUFEzMQWqMRO3KZwv2cl-b0PsqIcsp_VPhCFDz1v8"
            />
          </Link>

          {/* Mobile Menu Actions */}
          <div className="flex items-center gap-2 md:hidden">
            <SearchBar />
            <button 
              className="text-primary p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-6 items-center">
          <Link
            className="text-label-lg text-primary border-b-2 border-primary pb-1"
            to="/#home"
          >
            Home
          </Link>
          <Link
            className="text-label-lg text-on-surface-variant hover:text-primary transition-colors duration-300"
            to="/#collections"
          >
            Collections
          </Link>
          <button
            onClick={() => {
              const el = document.getElementById('heritage');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="flex items-center gap-2 bg-[#E5D38A]/20 text-[#111111] border border-[#E5D38A]/50 px-4 py-2 rounded-full font-medium text-sm hover:bg-[#E5D38A]/30 transition-colors shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="min-w-[120px] text-center inline-block transition-opacity duration-300">
              {getDisplayRate()}
            </span>
          </button>
          <Link
            className="text-label-lg text-on-surface-variant hover:text-primary transition-colors duration-300"
            to="/#contact"
          >
            Contact
          </Link>
          <div className="ml-2">
            <SearchBar />
          </div>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-outline-variant/30 absolute w-full left-0 top-full shadow-lg">
          <div className="flex flex-col px-gutter py-4 gap-4">
            <Link
              className="text-label-lg text-primary"
              to="/#home"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              className="text-label-lg text-on-surface-variant"
              to="/#collections"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Collections
            </Link>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                const el = document.getElementById('heritage');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="flex items-center gap-2 bg-[#E5D38A]/20 text-[#111111] border border-[#E5D38A]/50 px-4 py-2 rounded-full font-medium text-sm w-fit shadow-sm hover:bg-[#E5D38A]/30 transition-colors"
            >
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="min-w-[120px] text-center inline-block transition-opacity duration-300">
                {getDisplayRate()}
              </span>
            </button>
            <Link
              className="text-label-lg text-on-surface-variant"
              to="/#contact"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

