import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ArrowLeft, Loader2, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { api } from '../lib/api';
import { optimizeImage } from '../lib/image-utils';

export default function GenderPage() {
  const { type } = useParams();
  const [collections, setCollections] = useState<any[]>([]);
  const [jewelries, setJewelries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Swipe state
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const title = type === 'him' ? 'For Him' : 'For Her';

  const openImageModal = (item: any) => {
    setSelectedItem(item);
    setCurrentImageIndex(0);
    document.body.style.overflow = 'hidden';
  };

  const closeImageModal = () => {
    setSelectedItem(null);
    document.body.style.overflow = '';
  };

  const getImages = (item: any) => {
    if (!item) return [];
    return [item.imageUrl, ...(item.imageUrls || [])].filter(Boolean);
  };

  const nextImage = (e?: React.MouseEvent | React.TouchEvent) => {
    if (e) e.stopPropagation();
    if (selectedItem) {
      setCurrentImageIndex((prev) => (prev + 1) % getImages(selectedItem).length);
    }
  };

  const prevImage = (e?: React.MouseEvent | React.TouchEvent) => {
    if (e) e.stopPropagation();
    if (selectedItem) {
      setCurrentImageIndex((prev) => (prev === 0 ? getImages(selectedItem).length - 1 : prev - 1));
    }
  };

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) {
      nextImage();
    }
    if (isRightSwipe) {
      prevImage();
    }
  };

  useEffect(() => {
    async function fetchData() {
      if (!type) return;
      setLoading(true);
      try {
        const settings = await api.getSettings();
        let collectionIds: string[] = [];
        
        if (type === 'him' && settings.forHimCollectionId) {
          try {
            collectionIds = JSON.parse(settings.forHimCollectionId);
          } catch {
            collectionIds = [settings.forHimCollectionId];
          }
        } else if (type === 'her' && settings.forHerCollectionId) {
          try {
            collectionIds = JSON.parse(settings.forHerCollectionId);
          } catch {
            collectionIds = [settings.forHerCollectionId];
          }
        }

        const allCategories = await api.getCollections();
        const selectedCollections = allCategories.filter((c: any) => 
          collectionIds.includes(String(c.id))
        );
        
        // Match the order of IDs if possible
        selectedCollections.sort((a: any, b: any) => {
           return collectionIds.indexOf(String(a.id)) - collectionIds.indexOf(String(b.id));
        });

        setCollections(selectedCollections);

        const allJewelries = await api.getJewelries();
        const selectedJewelries = allJewelries.filter((j: any) => {
          const inCollection = collectionIds.includes(String(j.collectionId));
          if (!inCollection) return false;
          
          if (j.gender && j.gender !== 'none' && j.gender !== 'unisex' && j.gender !== type) {
            return false;
          }
          return true;
        });
        setJewelries(selectedJewelries);

      } catch (err) {
        console.error("Error fetching data", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [type]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex flex-col items-center justify-center p-8">
          <Loader2 className="w-8 h-8 animate-spin text-primary mb-4" />
          <p className="text-body-lg text-on-surface-variant">Loading curated collections...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[30vh] min-h-[250px] overflow-hidden flex items-center bg-deep-burgundy">
        <div className="absolute inset-0 bg-black/60 z-0"></div>
        <div className="relative z-10 max-w-container-max mx-auto px-gutter w-full">
          <div className="max-w-2xl text-white">
            <Link to="/" className="inline-flex items-center gap-2 text-luxury-gold hover:text-white transition-colors mb-4 text-sm font-medium uppercase tracking-widest">
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </Link>
            <h1 className="text-4xl md:text-display-sm mb-2 leading-tight font-display-sm text-shadow-sm">
              {title}
            </h1>
            <p className="text-white/80 font-body-lg text-lg">
              Curated elegance tailored specifically {title.toLowerCase()}.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Collections Details */}
      <section className="py-16 bg-surface">
        <div className="max-w-container-max mx-auto px-gutter">
           <div className="text-center mb-12">
            <h2 className="text-headline-md text-primary mb-4 font-headline-lg">Featured Collections</h2>
            <div className="filigree-divider"></div>
          </div>
          
          {collections.length === 0 ? (
            <div className="text-center p-12 bg-white rounded-2xl luxury-shadow max-w-2xl mx-auto">
              <p className="text-on-surface-variant text-body-lg">
                We are currently curating the perfect pieces for this section. Please check back later or visit our store.
              </p>
            </div>
          ) : (
            <div className="space-y-16 lg:space-y-24">
              {collections.map((coll, idx) => (
                <div key={coll.id} className={`flex flex-col md:flex-row gap-10 md:items-center ${idx % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                  <div className="md:w-1/2 aspect-[4/3] rounded-2xl overflow-hidden luxury-shadow bg-surface-container flex items-center justify-center p-6">
                    <img
                      src={optimizeImage(coll.imageUrl, 800)}
                      alt={coll.title}
                      className="w-full h-full object-contain mix-blend-multiply"
                      loading="lazy"
                    />
                  </div>
                  <div className="md:w-1/2">
                    <h3 className="text-headline-sm text-primary mb-4 font-headline-md">{coll.title}</h3>
                    <p className="text-body-lg text-on-surface-variant mb-6">{coll.description}</p>
                    <Link to={`/collection/${coll.id}`} className="inline-block border-b-2 border-luxury-gold pb-1 text-primary font-medium hover:text-luxury-gold transition-colors">
                      View Full Collection →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* All Selected Pieces */}
      {jewelries.length > 0 && (
        <section className="py-16 md:py-24 bg-surface-container-low flex-1">
          <div className="max-w-container-max mx-auto px-gutter">
            <div className="text-center mb-16">
              <h2 className="text-headline-md text-primary mb-4 font-headline-lg">Exquisite Pieces</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {jewelries.map((item) => (
                <div 
                  key={item.id} 
                  className="bg-white rounded-2xl luxury-shadow overflow-hidden group cursor-pointer"
                  onClick={() => openImageModal(item)}
                >
                  <div className="relative aspect-square overflow-hidden bg-surface-container border-b border-outline-variant/30 flex items-center justify-center p-4">
                    <img 
                      src={optimizeImage(item.imageUrl, 500)} 
                      alt={item.title} 
                      className="w-full h-full object-contain mix-blend-multiply transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-300 pointer-events-none"></div>
                  </div>
                  <div className="p-6">
                    <div className="text-xs uppercase tracking-wider text-luxury-gold font-semibold mb-2">
                      {collections.find(c => String(c.id) === String(item.collectionId))?.title || 'Exclusive'}
                    </div>
                    <h3 className="text-title-lg text-on-surface mb-3 line-clamp-1 group-hover:text-primary transition-colors">{item.title}</h3>
                    <p className="text-body-sm text-on-surface-variant mb-4 line-clamp-2 min-h-[2.5rem]">
                      {item.description}
                    </p>
                    {item.price && (
                      <div className="flex items-end justify-between mt-auto">
                        <span className="text-sm text-on-surface-variant font-medium">Price</span>
                        <span className="text-title-md text-primary font-semibold">{item.price}</span>
                      </div>
                    )}
                  </div>
                  <div className="h-1 w-full bg-gradient-to-r from-transparent via-luxury-gold/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />

      {/* Image Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 md:p-8" onClick={closeImageModal}>
          <button 
            className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors p-2 z-[60]"
            onClick={closeImageModal}
          >
            <X className="w-8 h-8" />
          </button>
          
          <div className="bg-white rounded-2xl overflow-hidden shadow-2xl w-full max-w-6xl max-h-full flex flex-col md:flex-row relative" onClick={(e) => e.stopPropagation()}>
            {/* Left: Image Carousel */}
            <div 
              className="relative w-full md:w-3/5 bg-surface-container aspect-square md:aspect-auto md:min-h-[600px] flex items-center justify-center group"
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              {getImages(selectedItem).length > 1 && (
                <button 
                  onClick={prevImage}
                  className="absolute left-2 sm:left-4 z-10 p-2 sm:p-3 bg-black/10 hover:bg-black/30 text-white rounded-full backdrop-blur-sm transition-all shadow-sm opacity-0 group-hover:opacity-100"
                >
                  <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
                </button>
              )}
              
              <img 
                src={optimizeImage(getImages(selectedItem)[currentImageIndex], 1200)} 
                alt={selectedItem.title}
                className="max-w-full max-h-full object-contain p-4"
              />
              
              {getImages(selectedItem).length > 1 && (
                <button 
                  onClick={nextImage}
                  className="absolute right-2 sm:right-4 z-10 p-2 sm:p-3 bg-black/10 hover:bg-black/30 text-white rounded-full backdrop-blur-sm transition-all shadow-sm opacity-0 group-hover:opacity-100"
                >
                  <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
                </button>
              )}

              {getImages(selectedItem).length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 px-3 py-2 bg-black/20 rounded-full backdrop-blur-sm">
                  {getImages(selectedItem).map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`w-2 h-2 rounded-full transition-all ${idx === currentImageIndex ? 'bg-primary scale-125' : 'bg-primary/30 hover:bg-primary/50'}`}
                    />
                  ))}
                </div>
              )}
            </div>
            
            {/* Right: Details */}
            <div className="w-full md:w-2/5 p-6 md:p-10 flex flex-col bg-white overflow-y-auto max-h-[50vh] md:max-h-none">
              <h3 className="text-primary text-headline-sm md:text-headline-md font-medium mb-4">{selectedItem.title}</h3>
              
              <div className="flex flex-wrap items-center gap-3 border-b border-outline-variant/30 pb-6 mb-6">
                {selectedItem.price ? (
                  <p className="text-luxury-gold text-title-lg font-medium">₹{selectedItem.price.toLocaleString()}</p>
                ) : (
                  <p className="text-luxury-gold text-title-lg font-medium">Price on request</p>
                )}
                {(selectedItem.weight || selectedItem.carat) && (
                  <div className="flex gap-2 text-on-surface-variant text-sm font-medium">
                    {selectedItem.weight && <span className="bg-surface-container-high px-2 py-1 rounded-md">{selectedItem.weight}</span>}
                    {selectedItem.carat && <span className="bg-surface-container-high px-2 py-1 rounded-md">{selectedItem.carat}</span>}
                  </div>
                )}
              </div>
              
              {selectedItem.description && (
                <div className="flex-1">
                  <h4 className="text-label-lg font-medium text-on-surface-variant mb-2">Description</h4>
                  <p className="text-body-lg text-on-surface leading-relaxed">{selectedItem.description}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
