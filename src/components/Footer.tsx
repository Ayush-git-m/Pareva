import { Smile, Camera, AtSign } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-white pt-20 pb-10">
      <div className="max-w-container-max mx-auto px-gutter relative">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-y-16 lg:gap-x-8">
          
          {/* Column 1 */}
          <div className="col-span-1 flex flex-col items-center md:items-start text-center md:text-left pr-0 md:pr-4">
            <Link to="/#home" className="mb-8 block">
              <img
                alt="Shree Pareva Jewellers"
                className="h-28 object-contain mix-blend-multiply mx-auto md:mx-0"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBGsVbbz4I9eCUbSQ5c-rtCZwzgzJYZMl_uaeIErVgSKL9hWuFxF2QaEZS2r22Wfs2a9iRZzj6VjkWSvmzHEwcFR7vwxhwzOc2R9Z-RduwVDc-qSa9UAUHzdVhGIBH6Wc1alemPW2ZZsR5rq5dXfLpa1nTe2aU2ET9rdiirEtezvPembjmmmzFZPmSA-6LmUDD29OTn4oHeK-juvT1t9x2vh4ADl295j5xzR4oUFEzMQWqMRO3KZwv2cl-b0PsqIcsp_VPhCFDz1v8"
              />
            </Link>
            <p className="text-on-surface mb-8 text-sm leading-relaxed max-w-sm">
              Redefining luxury since generations with unparalleled craftsmanship
              and purity you can trust.
            </p>
            <div className="flex gap-4 justify-center md:justify-start">
              <a
                className="w-12 h-12 rounded-full border border-luxury-gold/60 text-luxury-gold flex items-center justify-center hover:bg-luxury-gold hover:text-white transition-all duration-300 hover:shadow-lg"
                href="#"
              >
                <Smile className="w-5 h-5" />
              </a>
              <a
                className="w-12 h-12 rounded-full border border-luxury-gold/60 text-luxury-gold flex items-center justify-center hover:bg-luxury-gold hover:text-white transition-all duration-300 hover:shadow-lg"
                href="#"
              >
                <Camera className="w-5 h-5" />
              </a>
              <a
                className="w-12 h-12 rounded-full border border-luxury-gold/60 text-luxury-gold flex items-center justify-center hover:bg-luxury-gold hover:text-white transition-all duration-300 hover:shadow-lg"
                href="#"
              >
                <AtSign className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Desktop Dividers */}
          <div className="hidden md:block absolute left-1/4 top-0 bottom-32 w-px bg-luxury-gold/20"></div>
          <div className="hidden md:block absolute left-2/4 top-0 bottom-32 w-px bg-luxury-gold/20"></div>
          <div className="hidden md:block absolute left-3/4 top-0 bottom-32 w-px bg-luxury-gold/20"></div>

          {/* Column 2 */}
          <div className="col-span-1 flex flex-col items-center md:items-start text-center md:text-left md:pl-10">
            <h4 className="text-2xl text-primary font-display-lg mb-3 tracking-wide">
              Quick Links
            </h4>
            <div className="flex items-center justify-center md:justify-start gap-2 mb-8 w-full max-w-[140px]">
              <div className="flex-1 h-[1px] bg-luxury-gold/50"></div>
              <div className="w-1.5 h-1.5 rotate-45 bg-luxury-gold"></div>
              <div className="flex-1 h-[1px] bg-luxury-gold/50"></div>
            </div>
            <ul className="space-y-5 text-on-surface text-sm">
              <li>
                <Link className="hover:text-luxury-gold transition-colors" to="/#home">Home</Link>
              </li>
              <li>
                <Link className="hover:text-luxury-gold transition-colors" to="/#collections">Collections</Link>
              </li>
              <li>
                <Link className="hover:text-luxury-gold transition-colors" to="/#gold-rate">Gold Rate</Link>
              </li>
              <li>
                <Link className="hover:text-luxury-gold transition-colors" to="/#contact">Contact</Link>
              </li>
              <li>
                <Link className="hover:text-luxury-gold transition-colors" to="/#gallery">Gallery</Link>
              </li>
            </ul>
          </div>

          {/* Column 3 */}
          <div className="col-span-1 flex flex-col items-center md:items-start text-center md:text-left md:pl-10">
            <h4 className="text-2xl text-primary font-display-lg mb-3 tracking-wide">
              Collections
            </h4>
            <div className="flex items-center justify-center md:justify-start gap-2 mb-8 w-full max-w-[140px]">
              <div className="flex-1 h-[1px] bg-luxury-gold/50"></div>
              <div className="w-1.5 h-1.5 rotate-45 bg-luxury-gold"></div>
              <div className="flex-1 h-[1px] bg-luxury-gold/50"></div>
            </div>
            <ul className="space-y-5 text-on-surface text-sm">
              <li>
                <span className="hover:text-luxury-gold transition-colors cursor-default">Gold jewelry</span>
              </li>
              <li>
                <span className="hover:text-luxury-gold transition-colors cursor-default">Silver jewelry</span>
              </li>
              <li>
                <span className="hover:text-luxury-gold transition-colors cursor-default">Men's luxury</span>
              </li>
              <li>
                <span className="hover:text-luxury-gold transition-colors cursor-default">Daily wear</span>
              </li>
            </ul>
          </div>

          {/* Column 4 */}
          <div className="col-span-1 flex flex-col items-center md:items-start text-center md:text-left md:pl-10">
            <h4 className="text-2xl text-primary font-display-lg mb-3 tracking-wide">
              Our Services
            </h4>
            <div className="flex items-center justify-center md:justify-start gap-2 mb-8 w-full max-w-[140px]">
              <div className="flex-1 h-[1px] bg-luxury-gold/50"></div>
              <div className="w-1.5 h-1.5 rotate-45 bg-luxury-gold"></div>
              <div className="flex-1 h-[1px] bg-luxury-gold/50"></div>
            </div>
            <ul className="space-y-5 text-on-surface text-sm">
              <li>
                <span className="hover:text-luxury-gold transition-colors cursor-default">Custom Jewellery</span>
              </li>
              <li>
                <span className="hover:text-luxury-gold transition-colors cursor-default">Repair & Polish</span>
              </li>
              <li>
                <span className="hover:text-luxury-gold transition-colors cursor-default">Investment Plans</span>
              </li>
              <li>
                <span className="hover:text-luxury-gold transition-colors cursor-default">Corporate Gifting</span>
              </li>
              <li>
                <span className="hover:text-luxury-gold transition-colors cursor-default">Hallmark Testing</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="max-w-container-max mx-auto px-gutter uppercase">
        {/* Global Horizontal Divider */}
        <div className="w-full flex items-center justify-center relative mt-16 mb-8">
          <div className="absolute w-full h-[1px] bg-luxury-gold/30"></div>
          <div className="bg-white z-10 px-4 flex gap-1.5 items-center">
            <div className="w-1.5 h-1.5 rotate-45 bg-luxury-gold"></div>
            <div className="w-2.5 h-2.5 rotate-45 border border-luxury-gold flex items-center justify-center">
              <div className="w-1 h-1 bg-luxury-gold rotate-45"></div>
            </div>
            <div className="w-1.5 h-1.5 rotate-45 bg-luxury-gold"></div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-on-surface normal-case pb-4">
          <p className="text-center md:text-left">
            © 2024 Shree Pareva Jewellers. All Rights Reserved.
          </p>
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
            <a className="hover:text-luxury-gold transition-colors" href="#">Privacy Policy</a>
            <div className="hidden md:block w-[1px] h-4 bg-outline-variant/60"></div>
            <a className="hover:text-luxury-gold transition-colors" href="#">Terms & Conditions</a>
            <div className="hidden md:block w-[1px] h-4 bg-outline-variant/60"></div>
            <Link className="hover:text-primary font-medium transition-colors" to="/admin">Admin Login</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
