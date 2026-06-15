import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <header id="home" className="relative h-[90vh] min-h-[600px] overflow-hidden flex items-center bg-deep-burgundy">
      <div className="absolute inset-0 z-0">
        <img
          className="w-full h-full object-cover"
          alt="Cinematic close-up of bridal jewellery"
          src="https://lh3.googleusercontent.com/pw/AP1GczNjX7O8foS_Gi1UxotYlcH5AzEiV67e4VWroY2Vf680xwERXPqXh-5HHhD4FR9O76yE3tvcBFEywkPs08MeqUXysBXUTD2ejwWHDJ3aSaf2-TdZ7Io=s0"
        />
        <div className="absolute inset-0 hero-gradient"></div>
      </div>
      <div className="relative z-10 max-w-container-max mx-auto px-gutter w-full">
        <div className="max-w-2xl text-white">
          <h1 className="text-4xl md:text-display-lg mb-6 leading-tight font-display-lg">
            Timeless Elegance.<br />
            <span className="text-luxury-gold">Trusted For Generations.</span>
          </h1>
          <p className="text-base md:text-body-lg text-white/90 mb-10 leading-relaxed font-body-lg">
            Exquisite Gold, Diamond & Silver Jewellery crafted with purity and
            perfection. Discover heritage designs reimagined for the modern
            connoisseur.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/#collections" className="bg-primary hover:bg-on-secondary-container text-white px-10 py-4 rounded-full text-sm md:text-label-lg transition-all duration-500 shadow-lg hover:shadow-primary/40 group flex items-center justify-center text-center">
              Explore Collections
            </Link>
            <Link to="/#contact" className="border-2 border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-deep-burgundy px-10 py-4 rounded-full text-sm md:text-label-lg transition-all duration-500 flex items-center justify-center text-center">
              Visit Our Store
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
