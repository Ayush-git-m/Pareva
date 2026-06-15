import { useState, useEffect } from 'react';
import { collectionsData } from '../data/collections';
import { Link } from 'react-router-dom';
import { db } from '../firebase';
import { collection, query, getDocs, orderBy } from 'firebase/firestore';
import { Sparkles } from 'lucide-react';

export default function Collections() {
  const [categories, setCategories] = useState<any[]>(collectionsData);

  useEffect(() => {
    async function fetchCollections() {
      try {
        const q = query(collection(db, 'collections'));
        const snapshot = await getDocs(q);
        const fetched = snapshot.docs.map(doc => ({
          id: doc.id,
          title: doc.data().title,
          description: doc.data().description,
          image: doc.data().imageUrl,
          createdAt: doc.data().createdAt,
          icon: <Sparkles className="w-8 h-8 text-luxury-gold mx-auto mb-4" />
        }));
        
        // Sort in memory
        fetched.sort((a, b) => {
          const tA = a.createdAt?.toMillis?.() || 0;
          const tB = b.createdAt?.toMillis?.() || 0;
          return tB - tA;
        });

        // Merge fetched categories with local ones (we can append to local ones)
        setCategories([...fetched, ...collectionsData]);
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
              key={item.id + idx}
              to={`/collection/${item.id}`}
              id={item.id === 'bridal-collection' ? 'bridal-collection' : undefined}
              className="group relative overflow-hidden rounded-2xl luxury-shadow bg-white aspect-[4/5] cursor-pointer scroll-mt-24 block"
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
