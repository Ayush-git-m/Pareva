import { MapPin, Phone, Mail, MessageCircle } from 'lucide-react';

export default function StoreInfo() {
  return (
    <section id="contact" className="py-20 md:py-32 bg-white text-on-surface overflow-hidden relative group">
      <div className="max-w-container-max mx-auto px-gutter relative z-10 animate-fade-in-up">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left Side: Contact Information */}
          <div className="flex flex-col space-y-10">
            <div>
              <h2 className="text-4xl md:text-5xl text-[#111111] mb-6 font-display-lg tracking-tight">
                Visit Our Showroom
              </h2>
              {/* Elegant Gold Divider */}
              <div className="flex items-center gap-3 w-48">
                <div className="flex-1 h-px bg-luxury-gold/50"></div>
                <div className="w-2 h-2 rotate-45 border border-luxury-gold flex items-center justify-center">
                   <div className="w-1 h-1 bg-luxury-gold rotate-45"></div>
                </div>
                <div className="flex-1 h-px bg-luxury-gold/50"></div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-full border border-luxury-gold flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-luxury-gold" />
                </div>
                <p className="text-base md:text-lg text-[#333333] font-body-lg leading-relaxed pt-1">
                  23, Udyan Residency, Tragad Rd,<br />
                  Near Dharti Bungalows, Opp. Chandkheda Railway Station,<br />
                  Chandkheda, Ahmedabad, Gujarat 382470
                </p>
              </div>

              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-full border border-luxury-gold flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-luxury-gold" />
                </div>
                <p className="text-base md:text-lg text-[#333333] font-body-lg pt-3">+91 96017 08123</p>
              </div>

              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-full border border-luxury-gold flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-luxury-gold" />
                </div>
                <p className="text-base md:text-lg text-[#333333] font-body-lg pt-3">
                  shreeparevajewellers@gmail.com
                </p>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row flex-wrap gap-4">
              <a href="tel:+919601708123" className="w-full sm:w-auto justify-center bg-white border border-luxury-gold text-[#111111] px-8 py-3.5 rounded-full flex items-center gap-2 transition-colors hover:bg-luxury-gold/5 font-medium">
                <Phone className="w-5 h-5 text-on-surface" /> Call Now
              </a>
              <a href="https://wa.me/+919601708123" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto justify-center bg-white border border-luxury-gold text-[#111111] px-8 py-3.5 rounded-full flex items-center gap-2 transition-colors hover:bg-luxury-gold/5 font-medium">
                <MessageCircle className="w-5 h-5 text-on-surface" /> WhatsApp
              </a>
              <a
                href="https://maps.app.goo.gl/HeAaoJDKBxhFMkH6A"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto text-center bg-[#C9A227] border border-[#C9A227] text-white px-10 py-3.5 rounded-full shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all inline-flex items-center justify-center gap-2 font-medium"
              >
                <MapPin className="w-5 h-5 text-white" /> Get Directions
              </a>
            </div>
          </div>

          {/* Right Side: Map */}
          <div className="w-full h-[450px] md:h-[500px] bg-white rounded-[24px] overflow-hidden luxury-shadow border border-outline-variant/30 p-2 relative group-hover:shadow-xl transition-shadow duration-500">
            <div className="w-full h-full rounded-[16px] overflow-hidden relative">
              <iframe
                className="absolute inset-0 w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps?q=Shree+Pareva+Jewellers,+Tragad+Rd,+Chandkheda,+Ahmedabad&output=embed"
              ></iframe>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
