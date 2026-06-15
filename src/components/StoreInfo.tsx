import { MapPin, Phone, Mail, MessageCircle } from 'lucide-react';

export default function StoreInfo() {
  return (
    <section id="contact" className="py-16 md:py-24 bg-deep-burgundy text-white overflow-hidden relative">
      <div className="max-w-container-max mx-auto px-gutter relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-headline-lg text-luxury-gold mb-8 font-headline-lg">
              Visit Our Showroom
            </h2>
            <div className="space-y-6 md:space-y-8">
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-luxury-gold shrink-0 mt-1" />
                <p className="text-base md:text-body-lg font-body-lg">
                  23, Upvan Residency, Tragad Rd,<br />
                  Near Dharti Bungalows, Opp. Chandkheda Railway Station,<br />
                  Chandkheda, Ahmedabad, Gujarat 382470
                </p>
              </div>
              <div className="flex items-start gap-4">
                <Phone className="w-6 h-6 text-luxury-gold shrink-0 mt-1" />
                <p className="text-base md:text-body-lg font-body-lg">+91 96017 08123</p>
              </div>
              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 text-luxury-gold shrink-0 mt-1" />
                <p className="text-base md:text-body-lg font-body-lg">
                  info@shreeparevajewellers.com
                </p>
              </div>
            </div>
            <div className="mt-10 md:mt-12 flex flex-col sm:flex-row flex-wrap gap-4">
              <a href="tel:+919601708123" className="w-full sm:w-auto justify-center bg-primary hover:bg-on-secondary-container text-white px-8 py-3 rounded-full flex items-center gap-2 transition-all">
                <Phone className="w-5 h-5" /> Call Now
              </a>
              <a href="https://wa.me/+919601708123" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto justify-center bg-[#25D366] hover:bg-[#128C7E] text-white px-8 py-3 rounded-full flex items-center gap-2 transition-all">
                <MessageCircle className="w-5 h-5" /> WhatsApp
              </a>
              <a
                href="https://maps.app.goo.gl/HeAaoJDKBxhFMkH6A"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto text-center border border-luxury-gold text-luxury-gold px-8 py-3 rounded-full hover:bg-luxury-gold hover:text-deep-burgundy transition-all inline-block"
              >
                Get Directions
              </a>
            </div>
          </div>
          <div className="h-[300px] md:h-[400px] rounded-3xl overflow-hidden grayscale contrast-125 opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
            {/* Map Placeholder */}
            <iframe
              className="w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps?q=Shree+Pareva+Jewellers,+Tragad+Rd,+Chandkheda,+Ahmedabad&output=embed"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
