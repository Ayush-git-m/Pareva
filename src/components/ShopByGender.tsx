import { Link } from 'react-router-dom';

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
          {/* For Him */}
          <Link 
            to="/gender/him"
            className="group relative overflow-hidden rounded-2xl luxury-shadow aspect-[3/4] sm:aspect-[4/3] md:aspect-[3/2] cursor-pointer block"
          >
            <img 
              src="/images/Forhm.png" 
              alt="Shop For Him" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 flex flex-col justify-end items-center pb-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Link to="/gender/him" className="inline-flex items-center justify-center bg-primary text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-on-secondary-container transition-colors shadow-lg">
                Explore Collection
              </Link>
            </div>
          </Link>

          {/* For Her */}
          <Link 
            to="/gender/her"
            className="group relative overflow-hidden rounded-2xl luxury-shadow aspect-[3/4] sm:aspect-[4/3] md:aspect-[3/2] cursor-pointer block"
          >
            <img 
              src="/images/Forher.png" 
              alt="Shop For Her" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 flex flex-col justify-end items-center pb-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Link to="/gender/her" className="inline-flex items-center justify-center bg-primary text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-on-secondary-container transition-colors shadow-lg">
                Explore Collection
              </Link>
            </div>
          </Link>
        </div>

      </div>
    </section>
  );
}