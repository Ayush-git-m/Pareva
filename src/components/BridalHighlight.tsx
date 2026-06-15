import { Link } from 'react-router-dom';

export default function BridalHighlight() {
  return (
    <section className="relative h-[60vh] min-h-[500px] overflow-hidden flex items-center">
      <div className="absolute inset-0 z-0">
        <img
          className="w-full h-full object-cover"
          alt="Bride adorned in traditional gold jewellery"
          src="https://lh3.googleusercontent.com/pw/AP1GczOswQ2trHLbyTPqK78QjuBWqVwgTR7LLFUzAwUChdc--11dNyug0eWlCVvI6Az5qPb7gXdUczV9WBsARZKy1hkJNqAEi7qKKZ1e-K3X9sO18fgqsRc=s0"
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      <div className="relative z-10 max-w-container-max mx-auto px-gutter w-full">
        <div className="max-w-xl text-white mx-auto text-center md:ml-auto md:mx-0 md:text-right">
          <span className="text-sm md:text-label-lg tracking-[0.3em] text-luxury-gold uppercase block mb-4">
            Premium Selection
          </span>
          <h2 className="text-3xl md:text-headline-lg mb-6 leading-tight font-headline-lg">
            Bridal Collection
          </h2>
          <p className="text-base md:text-body-lg mb-10 text-surface-variant font-body-lg">
            For your most precious moments, choose jewellery that tells your
            story with grace and grandeur.
          </p>
          <Link to="/collection/bridal-collection" className="bg-primary text-white px-8 md:px-12 py-3 md:py-4 rounded-full text-sm md:text-label-lg hover:bg-on-secondary-container transition-all duration-300 inline-block">
            Explore Bridal Collection
          </Link>
        </div>
      </div>
    </section>
  );
}
