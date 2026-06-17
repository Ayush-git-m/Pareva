import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../lib/api';
import { Sparkles } from 'lucide-react';

export default function Collections() {
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    async function fetchCollections() {
      try {
        const fetched = await api.getCollections();
        const mapped = fetched.map((c: any) => ({
          ...c,
          image: c.imageUrl,
          icon: <Sparkles className="w-8 h-8 text-luxury-gold mx-auto mb-4" />
        }));
        
        setCategories(mapped);
      } catch (err) {
        console.error("Error fetching collections:", err);
      }
    }
    fetchCollections();
  }, []);

  return (
    <section id="collections" className="py-16 md:py-24 bg-surface relative overflow-hidden">
      <div className="peacock-pattern absolute inset-0"></div>
      <div className="max-w-container-max mx-auto px-gutter relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-headline-lg text-primary mb-2 font-headline-lg">
            Our Collections
          </h2>
          <div className="filigree-divider"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((item, idx) => (
            <Link
              key={item.id}
              to={`/collection/${item.id}`}
              id={item.id === 'bridal-collection' ? 'bridal-collection' : undefined}
              className="group relative overflow-hidden rounded-2xl luxury-shadow bg-black aspect-[4/5] cursor-pointer scroll-mt-24 block"
            >
              <img
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                alt={item.title}
                src={item.image}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 transition-opacity group-hover:opacity-80"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8 text-center translate-y-4 transition-transform duration-500 group-hover:translate-y-0">
                {item.icon}
                <h4 className="text-white text-headline-md font-headline-md">
                  {item.title}
                </h4>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
