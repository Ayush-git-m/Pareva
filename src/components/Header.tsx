import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-primary p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
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
          <Link
            className="text-label-lg text-on-surface-variant hover:text-primary transition-colors duration-300"
            to="/#gold-rate"
          >
            Gold Rate
          </Link>
          <Link
            className="text-label-lg text-on-surface-variant hover:text-primary transition-colors duration-300"
            to="/#contact"
          >
            About Us
          </Link>
          <Link
            className="text-label-lg text-on-surface-variant hover:text-primary transition-colors duration-300"
            to="/#contact"
          >
            Contact
          </Link>
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
            <Link
              className="text-label-lg text-on-surface-variant"
              to="/#gold-rate"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Gold Rate
            </Link>
            <Link
              className="text-label-lg text-on-surface-variant"
              to="/#contact"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About Us
            </Link>
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
