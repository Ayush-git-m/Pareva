import { TrendingUp, CheckCircle } from 'lucide-react';

export default function Sections() {
  return (
    <section id="gold-rate" className="py-16 md:py-24 bg-surface-container-low relative">
      <div className="max-w-container-max mx-auto px-gutter">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Gold Rate Card */}
          <div className="bg-white p-8 md:p-10 rounded-3xl luxury-shadow border border-luxury-gold/20 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 md:p-8 text-luxury-gold/10">
              <TrendingUp className="w-24 h-24 md:w-32 md:h-32" />
            </div>
            <div className="relative z-10">
              <div className="text-center mb-8">
                <h3 className="text-3xl md:text-headline-md text-primary font-headline-md">
                  Today's Gold Rate
                </h3>
                <p className="text-sm md:text-label-lg text-on-surface-variant">
                  Last updated: June 11, 2026
                </p>
              </div>
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 py-4 border-b border-outline-variant/30">
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-luxury-gold"></span>
                    <span className="text-base md:text-label-lg text-on-surface">
                      24K Gold (10g)
                    </span>
                  </div>
                  <span className="text-3xl md:text-headline-md text-primary font-headline-md">
                    ₹1,68,068
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 py-4 border-b border-outline-variant/30">
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-secondary"></span>
                    <span className="text-base md:text-label-lg text-on-surface">
                      22K Gold (10g)
                    </span>
                  </div>
                  <span className="text-3xl md:text-headline-md text-primary font-headline-md">
                    ₹1,54,063
                  </span>
                </div>
              </div>
              <a 
                href="https://www.goodreturns.in/gold-rates/ahmedabad.html" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full mt-10 bg-primary text-white py-4 rounded-full text-sm md:text-label-lg hover:bg-on-secondary-container transition-all block text-center"
              >
                View Live Gold Rate
              </a>
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
                    Customised Design Studio
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
