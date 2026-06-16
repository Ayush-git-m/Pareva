import { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { api } from '../lib/api';

export default function BridalHighlight() {
  const [videoUrl, setVideoUrl] = useState("https://assets.mixkit.co/videos/preview/mixkit-woman-putting-on-a-diamond-necklace-334-large.mp4");
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    async function fetchSettings() {
      try {
        const settings = await api.getSettings();
        if (settings.bridalVideoUrl) {
          setVideoUrl(settings.bridalVideoUrl);
        }
      } catch (err) {
        console.error("Error fetching settings:", err);
      }
    }
    fetchSettings();
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section className="relative h-[60vh] min-h-[500px] gap-8 overflow-hidden flex items-center justify-center group cursor-pointer" onClick={toggleMute}>
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          key={videoUrl}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          autoPlay
          loop
          muted={isMuted}
          playsInline
          poster="https://lh3.googleusercontent.com/pw/AP1GczOswQ2trHLbyTPqK78QjuBWqVwgTR7LLFUzAwUChdc--11dNyug0eWlCVvI6Az5qPb7gXdUczV9WBsARZKy1hkJNqAEi7qKKZ1e-K3X9sO18fgqsRc=s0"
          src={videoUrl}
        ></video>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20"></div>
      </div>
      
      <div className="relative z-10 max-w-container-max mx-auto px-gutter w-full pb-10 flex flex-col items-center justify-end h-full text-center">
        <div className="max-w-2xl text-white mx-auto">
          <span className="text-sm md:text-label-lg tracking-[0.3em] text-luxury-gold uppercase block mb-4 animate-fade-in-up">
            Premium Selection
          </span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl mb-6 leading-tight font-headline-lg drop-shadow-lg animate-fade-in-up" style={{animationDelay: '100ms'}}>
            Bridal Collection
          </h2>
          <p className="text-base md:text-lg mb-10 text-white/90 font-body-lg drop-shadow-md pb-6 animate-fade-in-up max-w-xl mx-auto" style={{animationDelay: '200ms'}}>
            For your most precious moments, choose jewellery that tells your
            story with grace and grandeur.
          </p>
          
          <button 
            onClick={(e) => {
              e.stopPropagation();
              toggleMute();
            }}
            className="w-14 h-14 rounded-full border border-white/30 bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:bg-luxury-gold hover:border-luxury-gold hover:text-black transition-all duration-300 animate-fade-in-up shadow-lg"
            style={{animationDelay: '300ms'}}
            aria-label={isMuted ? "Unmute video" : "Mute video"}
          >
            {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
          </button>
        </div>
      </div>
    </section>
  );
}
