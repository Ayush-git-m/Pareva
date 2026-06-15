import { ShieldCheck, Award, IndianRupee, Users } from 'lucide-react';

export default function Features() {
  return (
    <section className="py-12 bg-white border-b border-outline-variant/20">
      <div className="max-w-container-max mx-auto px-gutter">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="flex flex-col items-center text-center group">
            <div className="mb-4 text-luxury-gold transition-transform duration-500 group-hover:-translate-y-1">
              <ShieldCheck className="w-10 h-10 stroke-1" />
            </div>
            <h3 className="text-label-lg text-on-surface">
              BIS Hallmarked Jewellery
            </h3>
          </div>
          <div className="flex flex-col items-center text-center group">
            <div className="mb-4 text-luxury-gold transition-transform duration-500 group-hover:-translate-y-1">
              <Award className="w-10 h-10 stroke-1" />
            </div>
            <h3 className="text-label-lg text-on-surface">
              Certified Authenticity
            </h3>
          </div>
          <div className="flex flex-col items-center text-center group">
            <div className="mb-4 text-luxury-gold transition-transform duration-500 group-hover:-translate-y-1">
              <IndianRupee className="w-10 h-10 stroke-1" />
            </div>
            <h3 className="text-label-lg text-on-surface">
              Transparent Pricing
            </h3>
          </div>
          <div className="flex flex-col items-center text-center group">
            <div className="mb-4 text-luxury-gold transition-transform duration-500 group-hover:-translate-y-1">
              <Users className="w-10 h-10 stroke-1" />
            </div>
            <h3 className="text-label-lg text-on-surface">
              Trusted by Thousands
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
}
