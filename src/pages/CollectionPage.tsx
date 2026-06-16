import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { api } from '../lib/api';

export default function CollectionPage() {
  const { id } = useParams();
  const [collectionData, setCollectionData] = useState<any>(null);
  const [jewelries, setJewelries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      if (!id) return;
      setLoading(true);
      try {
        const allJewelries = await api.getJewelries();
        const data = allJewelries.filter((j: any) => j.collectionId === id || j.collectionId === Number(id) || String(j.collectionId) === String(id));
        setJewelries(data);

        if (!collectionData) {
           const allCategories = await api.getCollections();
           const cat = allCategories.find((c: any) => String(c.id) === String(id));
           if (cat) {
             setCollectionData({
               id: String(cat.id),
               title: cat.title,
               description: cat.description,
               image: cat.imageUrl,
               icon: null
             });
           }
        }
      } catch (err) {
        console.error("Error fetching data", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex flex-col items-center justify-center p-8">
          <Loader2 className="w-8 h-8 animate-spin text-primary mb-4" />
          <p className="text-body-lg text-on-surface-variant">Loading collection details...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!collectionData) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex flex-col items-center justify-center p-8">
          <h1 className="text-display-sm text-primary mb-4 font-display-sm">Collection Not Found</h1>
          <Link to="/" className="text-luxury-gold hover:text-primary transition-colors flex items-center gap-2">
            <ArrowLeft className="w-5 h-5" /> Back to Home
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[300px] overflow-hidden flex items-center bg-deep-burgundy">
        <div className="absolute inset-0 z-0">
          <img
            className="w-full h-full object-cover opacity-60 mix-blend-overlay"
            alt={collectionData.title}
            src={collectionData.image}
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        <div className="relative z-10 max-w-container-max mx-auto px-gutter w-full">
          <div className="max-w-2xl text-white">
            <Link to="/#collections" className="inline-flex items-center gap-2 text-luxury-gold hover:text-white transition-colors mb-6 text-sm font-medium uppercase tracking-widest">
              <ArrowLeft className="w-4 h-4" /> Back to Collections
            </Link>
            <h1 className="text-4xl md:text-display-sm mb-4 leading-tight font-display-sm">
              {collectionData.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Details Section */}
      <section className="py-16 md:py-24 bg-surface">
        <div className="max-w-container-max mx-auto px-gutter">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="rounded-2xl overflow-hidden luxury-shadow bg-[#1a0508]">
              <img
                src={collectionData.image}
                alt={collectionData.title}
                className="w-full h-full sm:h-auto object-contain sm:object-cover aspect-[4/5]"
              />
            </div>
            <div>
              <div className="mb-8 p-4 bg-surface-container-low rounded-full inline-block">
                {collectionData.icon}
              </div>
              <h2 className="text-headline-md text-primary mb-6 font-headline-md">About the Collection</h2>
              <p className="text-body-lg text-on-surface-variant mb-8 leading-relaxed">
                {collectionData.description}
              </p>
              
              <div className="space-y-6">
                 <h3 className="text-title-lg text-on-surface">Explore this collection in-store</h3>
                 <p className="text-body-md text-on-surface-variant">
                   Visit our showroom to experience the complete range of designs, craftsmanship, and exclusive pieces from our {collectionData.title}.
                 </p>
                 <a href="/#contact" className="bg-primary hover:bg-on-secondary-container text-white px-8 py-3 rounded-full text-label-lg transition-all duration-300 inline-block shadow-md hover:shadow-lg">
                   Visit Store
                 </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Pieces */}
      <section className="py-16 md:py-24 bg-surface-container-low flex-1">
        <div className="max-w-container-max mx-auto px-gutter">
          <div className="text-center mb-16">
            <h2 className="text-headline-lg text-primary mb-4 font-headline-lg">Exclusive Pieces</h2>
            <div className="filigree-divider"></div>
          </div>

          {loading ? (
            <div className="flex justify-center p-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : jewelries.length === 0 ? (
            <div className="text-center p-12 bg-white rounded-2xl luxury-shadow max-w-2xl mx-auto">
              <p className="text-on-surface-variant text-body-lg">
                We are constantly updating our digital catalog. More exquisite pieces from this collection will be showcased soon. In the meantime, please visit our store to explore the complete range.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {jewelries.map((item) => (
                <div key={item.id} className="bg-white rounded-2xl luxury-shadow overflow-hidden group">
                  <div className="relative aspect-square overflow-hidden bg-surface-container border-b border-outline-variant/30 flex items-center justify-center p-4">
                    <img 
                      src={item.imageUrl} 
                      alt={item.title} 
                      className="w-full h-full object-contain mix-blend-multiply transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-title-lg text-primary mb-2 line-clamp-1">{item.title}</h3>
                    <p className="text-body-md text-on-surface-variant line-clamp-2 mb-4 h-11">
                      {item.description}
                    </p>
                    <div className="text-label-lg text-luxury-gold font-medium">
                      {item.price ? `₹${item.price.toLocaleString()}` : 'Price on request'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
