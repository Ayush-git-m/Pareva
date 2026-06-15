import { Star } from 'lucide-react';

const reviews = [
  {
    stars: 5,
    text: '"Nice good service and awesome design collection"',
    author: '— Piyush Rathore',
  },
  {
    stars: 5,
    text: '"Amazing quality, low rates and high quality , best experience"',
    author: '— Paryank Pandya',
  },
  {
    stars: 5,
    text: '"Love their silver collection. Very modern and perfect for daily office wear. Will definitely visit again."',
    author: '— Anjali Verma',
  },
];

export default function Reviews() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-container-max mx-auto px-gutter">
        <div className="text-center mb-16">
          <h2 className="text-headline-lg text-primary mb-2 font-headline-lg">
            Customer Love
          </h2>
          <div className="filigree-divider"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, idx) => (
            <div
              key={idx}
              className="p-8 rounded-2xl bg-surface-container-low border border-outline-variant/30 flex flex-col items-center text-center"
            >
              <div className="flex gap-1 text-luxury-gold mb-4">
                {[...Array(review.stars)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-luxury-gold" />
                ))}
              </div>
              <p className="text-body-md text-on-surface italic mb-6">
                {review.text}
              </p>
              <h5 className="text-label-lg text-primary">{review.author}</h5>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <a 
            href="https://maps.app.goo.gl/HeAaoJDKBxhFMkH6A" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-primary text-label-lg hover:underline transition-all inline-block"
          >
            VIEW ALL REVIEWS
          </a>
        </div>
      </div>
    </section>
  );
}
