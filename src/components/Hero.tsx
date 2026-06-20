import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../lib/api';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import { optimizeImage } from '../lib/image-utils';

export default function Hero() {
  const [banners, setBanners] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBanners() {
      try {
        const querySnapshot = await api.getBanners();
        const fetchedBanners = querySnapshot
          .filter((b: any) => b.enabled !== false); // default to true if undefined
        
        fetchedBanners.sort((a: any, b: any) => (a.order || 0) - (b.order || 0));
        setBanners(fetchedBanners);
      } catch (err) {
        console.error("Error fetching hero banners", err);
      } finally {
        setLoading(false);
      }
    }
    fetchBanners();
  }, []);

  const defaultBanners = [
    {
      id: "default-1",
      title: "Timeless Elegance.<br /><span class=\"text-luxury-gold\">Trusted For Generations.</span>",
      subtitle: "Exquisite Gold, Diamond & Silver Jewellery crafted with purity and perfection. Discover heritage designs reimagined for the modern connoisseur.",
      imageUrl: "https://lh3.googleusercontent.com/pw/AP1GczNjX7O8foS_Gi1UxotYlcH5AzEiV67e4VWroY2Vf680xwERXPqXh-5HHhD4FR9O76yE3tvcBFEywkPs08MeqUXysBXUTD2ejwWHDJ3aSaf2-TdZ7Io=s0",
    }
  ];

  const displayBanners = banners.length > 0 ? banners : defaultBanners;

  return (
    <header id="home" className="relative w-full bg-[#1a0508]">
      {loading ? (
         <div className="flex items-center justify-center py-20">
           <div className="w-12 h-12 border-4 border-luxury-gold border-t-transparent rounded-full animate-spin"></div>
         </div>
      ) : (
        <Swiper
          modules={[Autoplay, EffectFade, Pagination]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop={true}
          autoHeight={true}
          className="w-full"
        >
          {displayBanners.map((banner) => (
            <SwiperSlide key={banner.id}>
              <div className="w-full flex-col bg-[#1a0508]">
                {/* Image Section - Responsive height */}
                <div className="w-full relative flex justify-center items-center overflow-hidden">
                  <img
                    className="w-full h-auto block"
                    alt={banner.title || "Luxury Jewellery"}
                    src={optimizeImage(banner.imageUrl, 1600)}
                    fetchPriority="high"
                  />
                </div>

                {/* Content Section - Always below to prevent overlapping baked-in text */}
                {(banner.title || banner.subtitle || banner.buttonText) && (
                  <div className="w-full py-8 md:py-12 px-gutter text-white text-center">
                    <div className="max-w-3xl mx-auto">
                      {banner.title && (
                        <h1 
                          className="text-2xl sm:text-3xl md:text-5xl mb-4 md:mb-6 leading-tight font-display-lg title-gradient-gold"
                          dangerouslySetInnerHTML={{ __html: banner.title }}
                        />
                      )}
                      {banner.subtitle && (
                        <p className="text-sm sm:text-base md:text-lg text-white/90 mb-6 md:mb-8 leading-relaxed font-body-lg">
                          {banner.subtitle}
                        </p>
                      )}
                      {banner.buttonText && banner.buttonLink && (
                        <div className="flex justify-center">
                           <Link to={banner.buttonLink} className="bg-primary hover:bg-on-secondary-container text-white px-8 md:px-12 py-3 md:py-4 rounded-full text-sm md:text-base transition-all duration-300 shadow-lg hover:shadow-primary/40 inline-block">
                             {banner.buttonText}
                           </Link>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </header>
  );
}

