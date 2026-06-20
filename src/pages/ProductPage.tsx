import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ArrowLeft, Loader2, ChevronLeft, ChevronRight } from 'lucide-react';
import { api } from '../lib/api';
import { optimizeImage } from '../lib/image-utils';

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [collection, setCollection] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Swipe state
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  useEffect(() => {
    async function fetchData() {
      if (!id) return;
      setLoading(true);
      try {
        const allJewelries = await api.getJewelries();
        const foundProduct = allJewelries.find((j: any) => String(j.id) === String(id));
        setProduct(foundProduct || null);

        if (foundProduct) {
          const allCollections = await api.getCollections();
          const foundCollection = allCollections.find((c: any) => String(c.id) === String(foundProduct.collectionId));
          setCollection(foundCollection || null);
        }
      } catch (err) {
        console.error("Error fetching product data", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  const getImages = (item: any) => {
    if (!item) return [];
    const images = [item.imageUrl];
    if (item.imageUrls && Array.isArray(item.imageUrls)) {
      images.push(...item.imageUrls);
    }
    return images;
  };

  const nextImage = (e?: React.MouseEvent | React.TouchEvent) => {
    if (e) e.stopPropagation();
    if (!product) return;
    const images = getImages(product);
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e?: React.MouseEvent | React.TouchEvent) => {
    if (e) e.stopPropagation();
    if (!product) return;
    const images = getImages(product);
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
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

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex flex-col items-center justify-center p-8">
          <Loader2 className="w-8 h-8 animate-spin text-primary mb-4" />
          <p className="text-body-lg text-on-surface-variant">Loading product details...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex flex-col items-center justify-center p-8 bg-surface space-y-6">
          <h1 className="text-display-sm text-primary font-display-sm">Product Not Found</h1>
          <p className="text-body-lg text-on-surface-variant max-w-sm text-center">
            We couldn't find the product you're looking for. It may have been removed or is no longer available.
          </p>
          <Link to="/" className="inline-flex flex-row items-center gap-2 px-6 py-3 rounded-full bg-primary text-white hover:bg-primary/90 transition-colors shadow-sm">
            <ArrowLeft className="w-4 h-4" /> Return to Home
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const images = getImages(product);

  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <Header />
      
      <main className="flex-1 max-w-container-max mx-auto px-gutter w-full py-8 md:py-16">
        {/* Breadcrumb / Back Navigation */}
        <div className="mb-8">
          {collection ? (
            <Link to={`/collection/${collection.id}`} className="inline-flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors text-sm font-medium">
              <ArrowLeft className="w-4 h-4" /> Back to {collection.title}
            </Link>
          ) : (
            <Link to="/" className="inline-flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors text-sm font-medium">
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </Link>
          )}
        </div>

        <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-outline-variant/30 flex flex-col md:flex-row">
          {/* Left: Image Viewer */}
          <div 
            className="relative w-full md:w-1/2 lg:w-3/5 bg-surface-container aspect-square md:aspect-auto md:min-h-[600px] flex items-center justify-center group"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            {images.length > 1 && (
              <button 
                onClick={prevImage}
                className="absolute left-2 sm:left-4 z-10 p-2 sm:p-3 bg-black/10 hover:bg-black/30 text-white rounded-full backdrop-blur-sm transition-all shadow-sm md:opacity-0 md:group-hover:opacity-100"
              >
                <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
              </button>
            )}
            
            <img 
              src={optimizeImage(images[currentImageIndex], 1200)} 
              alt={product.title}
              className="max-w-full max-h-full object-contain p-4 md:p-8 mix-blend-multiply"
            />
            
            {images.length > 1 && (
              <button 
                onClick={nextImage}
                className="absolute right-2 sm:right-4 z-10 p-2 sm:p-3 bg-black/10 hover:bg-black/30 text-white rounded-full backdrop-blur-sm transition-all shadow-sm md:opacity-0 md:group-hover:opacity-100"
              >
                <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
              </button>
            )}

            {images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 px-3 py-2 bg-black/20 rounded-full backdrop-blur-sm">
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`w-2 h-2 rounded-full transition-all ${idx === currentImageIndex ? 'bg-white scale-125' : 'bg-white/40 hover:bg-white/70'}`}
                  />
                ))}
              </div>
            )}
          </div>
          
          {/* Right: Product Information */}
          <div className="w-full md:w-1/2 lg:w-2/5 p-6 md:p-10 flex flex-col bg-white">
            <div className="mb-6">
               <span className="text-xs font-semibold tracking-wider uppercase text-luxury-gold mb-2 block">
                 {collection ? collection.title : 'Exclusive Item'}
               </span>
               <h1 className="text-headline-md md:text-display-sm text-primary font-medium mb-4 leading-tight">
                 {product.title}
               </h1>
            </div>
            
            <div className="flex flex-wrap items-center gap-4 border-b border-outline-variant/30 pb-8 mb-8">
              {product.price ? (
                <p className="text-luxury-gold text-headline-sm font-medium">₹{product.price.toLocaleString()}</p>
              ) : (
                <p className="text-luxury-gold text-headline-sm font-medium">Price on request</p>
              )}
            </div>
            
            <div className="flex-1 space-y-8">
              {product.description && (
                <div>
                  <h2 className="text-label-lg font-medium text-on-surface-variant mb-3 uppercase tracking-wider">Description</h2>
                  <p className="text-body-lg text-on-surface leading-relaxed">{product.description}</p>
                </div>
              )}

              {(product.weight || product.carat) && (
                <div>
                  <h2 className="text-label-lg font-medium text-on-surface-variant mb-3 uppercase tracking-wider">Specifications</h2>
                  <div className="bg-surface-container-low rounded-xl p-4 flex flex-wrap gap-4">
                    {product.weight && (
                      <div className="flex-1 min-w-[120px]">
                        <span className="block text-xs text-on-surface-variant mb-1">Weight</span>
                        <span className="text-body-lg font-medium text-primary">{product.weight}</span>
                      </div>
                    )}
                    {product.carat && (
                      <div className="flex-1 min-w-[120px]">
                        <span className="block text-xs text-on-surface-variant mb-1">Purity</span>
                        <span className="text-body-lg font-medium text-primary">{product.carat}</span>
                      </div>
                    )}
                    {product.metal && (
                      <div className="flex-1 min-w-[120px]">
                        <span className="block text-xs text-on-surface-variant mb-1">Metal</span>
                        <span className="text-body-lg font-medium text-primary capitalize">{product.metal}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="pt-4 pb-2">
                 <h3 className="text-title-md text-on-surface mb-2">Interested in this piece?</h3>
                 <p className="text-body-md text-on-surface-variant mb-6">
                   Visit our store to see it in person or connect with us directly to inquire about availability and secure your purchase.
                 </p>
                 <a href="/#contact" className="w-full text-center bg-primary hover:bg-on-secondary-container text-white px-8 py-4 rounded-xl text-label-lg transition-all duration-300 inline-block shadow-md hover:shadow-lg">
                   Inquire Now
                 </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
