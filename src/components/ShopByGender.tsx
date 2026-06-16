export default function ShopByGender() {
  return (
    <section className="py-16 md:py-24 bg-surface relative overflow-hidden">
      <div className="max-w-container-max mx-auto px-gutter relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-headline-lg text-primary mb-2 font-headline-lg">
            Shop By Collection
          </h2>
          <div className="filigree-divider"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Shop For Him Card */}
          <div className="group relative overflow-hidden rounded-2xl luxury-shadow bg-[#1a0508] aspect-[3/4] sm:aspect-[4/3] md:aspect-[3/2] cursor-pointer">
            {/* Image placeholder with maroon overlay */}
            <div className="absolute inset-0 bg-[#3a0a12]">
              <img 
                src="/for-him.png" 
                alt="Shop For Him" 
                className="w-full h-full object-contain sm:object-cover opacity-60 mix-blend-overlay transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
            </div>
            
            {/* Content matching the user's uploaded image text */}
            <div className="absolute inset-0 p-8 md:p-12 pl-8 md:pl-16 flex flex-col justify-end items-start bg-gradient-to-r from-black/80 via-black/40 to-transparent">
              <div className="border border-luxury-gold/50 rounded-xl p-6 backdrop-blur-sm bg-[#1a0508]/60 transition-colors duration-300 group-hover:bg-[#2a080d]/80">
                <h3 className="text-5xl md:text-6xl text-luxury-gold font-headline-lg mb-4 drop-shadow-md">
                  For Him
                </h3>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-[1px] bg-luxury-gold/50"></div>
                  <div className="w-1.5 h-1.5 rotate-45 border border-luxury-gold/50"></div>
                  <div className="w-8 h-[1px] bg-luxury-gold/50"></div>
                </div>
                <p className="text-white/90 font-body-lg text-lg tracking-wide mt-4">
                  Bold. Refined. Timeless.
                </p>
              </div>
            </div>
          </div>

          {/* Shop For Her Card */}
          <div className="group relative overflow-hidden rounded-2xl luxury-shadow bg-[#1a0508] aspect-[3/4] sm:aspect-[4/3] md:aspect-[3/2] cursor-pointer">
            {/* Image placeholder with maroon overlay */}
            <div className="absolute inset-0 bg-[#4a0e17]">
              <img 
                src="/for-her.png" 
                alt="Shop For Her" 
                className="w-full h-full object-contain sm:object-cover opacity-80 mix-blend-overlay transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
            </div>
            
            {/* Content matching the user's uploaded image text */}
            <div className="absolute inset-0 p-8 md:p-12 pl-8 md:pl-16 flex flex-col justify-end items-start bg-gradient-to-r from-black/80 via-black/40 to-transparent">
               <div className="border border-luxury-gold/50 rounded-xl p-6 backdrop-blur-sm bg-[#2a080d]/60 transition-colors duration-300 group-hover:bg-[#4a0e17]/80">
                <h3 className="text-5xl md:text-6xl text-luxury-gold font-headline-lg mb-4 drop-shadow-md">
                  For Her
                </h3>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-[1px] bg-luxury-gold/50"></div>
                  <div className="w-1.5 h-1.5 rotate-45 border border-luxury-gold/50"></div>
                  <div className="w-8 h-[1px] bg-luxury-gold/50"></div>
                </div>
                <p className="text-white/90 font-body-lg text-lg tracking-wide mt-4">
                  Elegance. Beauty. Timeless.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
