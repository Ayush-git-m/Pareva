import { TrendingUp, CheckCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { api } from '../lib/api';

export default function Sections() {
  const [goldRate22k, setGoldRate22k] = useState('');
  const [goldRate24k, setGoldRate24k] = useState('');

  useEffect(() => {
    async function fetchSettings() {
      try {
        const settings = await api.getSettings();
        if (settings.goldRate22k) setGoldRate22k(settings.goldRate22k);
        if (settings.goldRate24k) setGoldRate24k(settings.goldRate24k);
      } catch (err) {
        console.error("Error fetching settings:", err);
      }
    }
    fetchSettings();
  }, []);

  return (
    <section id="heritage" className="py-16 md:py-24 bg-surface-container-low relative">
      <div className="max-w-container-max mx-auto px-gutter">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Side: Gold Rate */}
          <div className="flex flex-col h-full justify-center">
            <div className="bg-white rounded-[32px] luxury-shadow border border-[#E5D38A]/40 p-10 md:p-14 relative overflow-hidden group min-h-[400px] flex flex-col justify-center">
               <div className="absolute top-0 right-0 w-64 h-64 bg-[#E5D38A]/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3"></div>
               <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#E5D38A]/5 rounded-full blur-[60px] translate-y-1/3 -translate-x-1/3"></div>
               
               <div className="relative z-10 flex flex-col items-center text-center">
                 <div className="w-16 h-16 bg-[#111111] rounded-full flex items-center justify-center mb-8 shadow-lg shadow-black/5">
                   <TrendingUp className="w-8 h-8 text-[#E5D38A]" />
                 </div>
                 
                 <h3 className="text-3xl md:text-4xl font-headline-md text-[#111111] mb-2">
                   Live Market Rates
                 </h3>
                 <p className="text-on-surface-variant text-base md:text-lg mb-10 max-w-[280px]">
                   Updated daily. Assured purity and transparency.
                 </p>
                 
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
                   <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/60 text-center transition-all duration-500 hover:-translate-y-1 hover:border-[#E5D38A]/60 hover:shadow-lg group/card">
                      <div className="flex items-center justify-center gap-2 mb-3">
                         <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                         <h4 className="text-label-lg uppercase tracking-widest text-[#111111] font-medium">22K Gold</h4>
                      </div>
                      <p className="text-4xl md:text-5xl font-mono font-medium text-[#111111]">{goldRate22k || '---'}</p>
                      <p className="text-on-surface-variant/70 text-xs mt-3 uppercase tracking-wider">Per 10 Grams</p>
                   </div>
                   
                   <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/60 text-center transition-all duration-500 hover:-translate-y-1 hover:border-[#E5D38A]/60 hover:shadow-lg group/card">
                      <div className="flex items-center justify-center gap-2 mb-3">
                         <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                         <h4 className="text-label-lg uppercase tracking-widest text-[#111111] font-medium">24K Gold</h4>
                      </div>
                      <p className="text-4xl md:text-5xl font-mono font-medium text-[#111111]">{goldRate24k || '---'}</p>
                      <p className="text-on-surface-variant/70 text-xs mt-3 uppercase tracking-wider">Per 10 Grams</p>
                   </div>
                 </div>
               </div>
            </div>
          </div>

          {/* Why Choose Us */}
          <div className="relative p-6 md:p-10">
            <img
              alt="Watermark Logo"
              className="absolute inset-0 w-full h-full object-contain opacity-5 pointer-events-none"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBGsVbbz4I9eCUbSQ5c-rtCZwzgzJYZMl_uaeIErVgSKL9hWuFxF2QaEZS2r22Wfs2a9iRZzj6VjkWSvmzHEwcFR7vwxhwzOc2R9Z-RduwVDc-qSa9UAUHzdVhGIBH6Wc1alemPW2ZZsR5rq5dXfLpa1nTe2aU2ET9rdiirEtezvPembjmmmzFZPmSA-6LmUDD29OTn4oHeK-juvT1t9x2vh4ADl295j5xzR4oUFEzMQWqMRO3KZwv2cl-b0PsqIcsp_VPhCFDz1v8"
            />
            <h2 className="text-3xl md:text-headline-lg text-primary mb-8 font-headline-lg">
              Why Choose Shree Pareva?
            </h2>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-luxury-gold mt-1 shrink-0" />
                <div>
                  <h4 className="text-base md:text-label-lg text-on-surface mb-1 font-semibold">
                    100% Hallmarked Jewellery
                  </h4>
                  <p className="text-sm md:text-body-md text-on-surface-variant">
                    Every piece is verified for purity and carries the official
                    BIS Hallmark.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-luxury-gold mt-1 shrink-0" />
                <div>
                  <h4 className="text-base md:text-label-lg text-on-surface mb-1 font-semibold">
                    Lifetime Buyback & Exchange
                  </h4>
                  <p className="text-sm md:text-body-md text-on-surface-variant">
                    We offer fair and transparent valuation for your old
                    jewellery at any time.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-luxury-gold mt-1 shrink-0" />
                <div>
                  <h4 className="text-base md:text-label-lg text-on-surface mb-1 font-semibold">
                    Customized Design Studio
                  </h4>
                  <p className="text-sm md:text-body-md text-on-surface-variant">
                    Bring your vision to life with our expert artisans and
                    designers.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-luxury-gold mt-1 shrink-0" />
                <div>
                  <h4 className="text-base md:text-label-lg text-on-surface mb-1 font-semibold">
                    Exquisite Packaging
                  </h4>
                  <p className="text-sm md:text-body-md text-on-surface-variant">
                    Premium unboxing experience tailored for gifting and safe
                    keeping.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
