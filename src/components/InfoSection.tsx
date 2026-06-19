import { TrendingUp, CheckCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { api } from '../lib/api';

export default function Sections() {
  const [goldRate22k, setGoldRate22k] = useState('');
  const [goldRate24k, setGoldRate24k] = useState('');
  const [silverRate, setSilverRate] = useState('');

  useEffect(() => {
    async function fetchSettings() {
      try {
        const settings = await api.getSettings();
        if (settings.goldRate22k) setGoldRate22k(settings.goldRate22k);
        if (settings.goldRate24k) setGoldRate24k(settings.goldRate24k);
        if (settings.silverRate) setSilverRate(settings.silverRate);
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
          
          {/* Left Side: Gold & Silver Rates */}
          <div className="flex flex-col h-full justify-center">
            <div className="bg-white rounded-[24px] luxury-shadow border border-[#E5D38A]/20 p-8 md:p-12 relative overflow-hidden group min-h-[400px] flex flex-col justify-center">
               <div className="absolute top-0 right-0 w-64 h-64 bg-[#E5D38A]/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3"></div>
               <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#E5D38A]/5 rounded-full blur-[60px] translate-y-1/3 -translate-x-1/3"></div>
               
               <div className="relative z-10 flex flex-col items-center text-center">
                 <div className="w-14 h-14 bg-[#1a0508] rounded-full flex items-center justify-center mb-6 shadow-lg shadow-black/10 ring-4 ring-[#E5D38A]/20">
                   <TrendingUp className="w-6 h-6 text-[#E5D38A]" />
                 </div>
                 
                 <h3 className="text-3xl md:text-4xl font-headline-md text-[#1a0508] mb-3 font-serif tracking-tight">
                   Live Market Rates
                 </h3>
                 <p className="text-on-surface-variant text-sm md:text-base mb-10 max-w-[320px]">
                   Updated daily to ensure complete transparency & assured purity.
                 </p>
                 
                 <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-2 w-full">
                   {/* 22K Gold */}
                   <div className="bg-[#faf9f6] px-2 py-6 rounded-xl border border-[#E5D38A]/40 text-center transition-all duration-500 hover:-translate-y-1 hover:border-[#E5D38A] hover:bg-white hover:shadow-xl group/card relative">
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-[2px] bg-[#E5D38A]"></div>
                      <div className="flex items-center justify-center gap-2 mb-3">
                         <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                         <h4 className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#1a0508]/70 font-semibold">22K Gold</h4>
                      </div>
                      <p className="text-2xl sm:text-2xl md:text-3xl font-mono font-medium text-[#1a0508] tracking-tighter">{goldRate22k || '---'}</p>
                      <p className="text-on-surface-variant/50 text-[9px] sm:text-[10px] mt-3 md:mt-4 uppercase tracking-widest">Per 10 Grams</p>
                   </div>
                   
                   {/* 24K Gold */}
                   <div className="bg-[#faf9f6] px-2 py-6 rounded-xl border border-[#E5D38A]/40 text-center transition-all duration-500 hover:-translate-y-1 hover:border-[#E5D38A] hover:bg-white hover:shadow-xl group/card relative">
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-[2px] bg-[#E5D38A]"></div>
                      <div className="flex items-center justify-center gap-2 mb-3">
                         <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                         <h4 className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#1a0508]/70 font-semibold">24K Gold</h4>
                      </div>
                      <p className="text-2xl sm:text-2xl md:text-3xl font-mono font-medium text-[#1a0508] tracking-tighter">{goldRate24k || '---'}</p>
                      <p className="text-on-surface-variant/50 text-[9px] sm:text-[10px] mt-3 md:mt-4 uppercase tracking-widest">Per 10 Grams</p>
                   </div>

                   {/* Silver */}
                   <div className="bg-[#faf9f6] px-2 py-6 rounded-xl border border-gray-300 text-center transition-all duration-500 hover:-translate-y-1 hover:border-gray-400 hover:bg-white hover:shadow-xl group/card relative">
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-[2px] bg-gray-400"></div>
                      <div className="flex items-center justify-center gap-2 mb-3">
                         <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                         <h4 className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#1a0508]/70 font-semibold">Silver</h4>
                      </div>
                      <p className="text-2xl sm:text-2xl md:text-3xl font-mono font-medium text-[#1a0508] tracking-tighter">{silverRate || '---'}</p>
                      <p className="text-on-surface-variant/50 text-[9px] sm:text-[10px] mt-3 md:mt-4 uppercase tracking-widest">Per 1 KG</p>
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
