import { Smile, Camera, AtSign } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-inverse-surface text-surface-variant py-16">
      <div className="max-w-container-max mx-auto px-gutter grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
        <div className="col-span-1 sm:col-span-2 md:col-span-1">
          <Link to="/#home">
            <img
              alt="Shree Pareva Jewellers"
              className="h-20 md:h-28 max-w-full mb-6 brightness-0 invert object-contain"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBGsVbbz4I9eCUbSQ5c-rtCZwzgzJYZMl_uaeIErVgSKL9hWuFxF2QaEZS2r22Wfs2a9iRZzj6VjkWSvmzHEwcFR7vwxhwzOc2R9Z-RduwVDc-qSa9UAUHzdVhGIBH6Wc1alemPW2ZZsR5rq5dXfLpa1nTe2aU2ET9rdiirEtezvPembjmmmzFZPmSA-6LmUDD29OTn4oHeK-juvT1t9x2vh4ADl295j5xzR4oUFEzMQWqMRO3KZwv2cl-b0PsqIcsp_VPhCFDz1v8"
            />
          </Link>
          <p className="text-body-md text-on-surface-variant mb-6 font-body-md">
            Redefining luxury since generations with unparalleled craftsmanship
            and purity you can trust.
          </p>
          <div className="flex gap-4">
            <a
              className="w-10 h-10 rounded-full border border-outline/30 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300"
              href="#"
            >
              <Smile className="w-5 h-5" />
            </a>
            <a
              className="w-10 h-10 rounded-full border border-outline/30 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300"
              href="#"
            >
              <Camera className="w-5 h-5" />
            </a>
            <a
              className="w-10 h-10 rounded-full border border-outline/30 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300"
              href="#"
            >
              <AtSign className="w-5 h-5" />
            </a>
          </div>
        </div>
        <div>
          <h4 className="text-headline-md text-primary-fixed mb-6 font-headline-md">
            Quick Links
          </h4>
          <ul className="space-y-4 text-label-lg">
            <li>
              <Link className="hover:text-primary-fixed transition-colors" to="/#home">
                Home
              </Link>
            </li>
            <li>
              <Link className="hover:text-primary-fixed transition-colors" to="/#collections">
                Collections
              </Link>
            </li>
            <li>
              <Link className="hover:text-primary-fixed transition-colors" to="/#gold-rate">
                Gold Rate
              </Link>
            </li>
            <li>
              <Link className="hover:text-primary-fixed transition-colors" to="/#contact">
                About Us
              </Link>
            </li>
            <li>
              <Link className="hover:text-primary-fixed transition-colors" to="/#collections">
                Gallery
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-headline-md text-primary-fixed mb-6 font-headline-md">
            Collections
          </h4>
          <ul className="space-y-4 text-label-lg">
            <li>
              <Link className="hover:text-primary-fixed transition-colors" to="/collection/gold-jewellery">
                Gold Jewellery
              </Link>
            </li>
            <li>
              <Link className="hover:text-primary-fixed transition-colors" to="/collection/diamond-jewellery">
                Diamond Collection
              </Link>
            </li>
            <li>
              <Link className="hover:text-primary-fixed transition-colors" to="/collection/bridal-collection">
                Bridal Special
              </Link>
            </li>
            <li>
              <Link className="hover:text-primary-fixed transition-colors" to="/collection/silver-jewellery">
                Silver Artifacts
              </Link>
            </li>
            <li>
              <Link className="hover:text-primary-fixed transition-colors" to="/collection/mens-collection">
                Men's Luxury
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-headline-md text-primary-fixed mb-6 font-headline-md">
            Our Services
          </h4>
          <ul className="space-y-4 text-label-lg">
            <li>
              <Link className="hover:text-primary-fixed transition-colors" to="/#contact">
                Custom Jewellery
              </Link>
            </li>
            <li>
              <Link className="hover:text-primary-fixed transition-colors" to="/#contact">
                Repair & Polish
              </Link>
            </li>
            <li>
              <Link className="hover:text-primary-fixed transition-colors" to="/#contact">
                Investment Plans
              </Link>
            </li>
            <li>
              <Link className="hover:text-primary-fixed transition-colors" to="/#contact">
                Corporate Gifting
              </Link>
            </li>
            <li>
              <Link className="hover:text-primary-fixed transition-colors" to="/#contact">
                Hallmark Testing
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-container-max mx-auto px-gutter mt-16 pt-8 border-t border-outline/20 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-label-lg opacity-60">
        <p>© 2024 Shree Pareva Jewellers. All Rights Reserved.</p>
        <div className="flex gap-6">
          <a className="hover:text-primary-fixed" href="#">
            Privacy Policy
          </a>
          <a className="hover:text-primary-fixed" href="#">
            Terms & Conditions
          </a>
          <Link className="hover:text-primary-fixed" to="/admin">
            Admin Login
          </Link>
        </div>
      </div>
    </footer>
  );
}
