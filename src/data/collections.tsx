import { Gem, Sparkles, Star, Heart, User, ShoppingBag } from 'lucide-react';
import React from 'react';

export const collectionsData = [
  {
    id: 'gold-jewellery',
    title: 'Gold Jewellery',
    icon: <Gem className="w-8 h-8 text-luxury-gold mb-2 mx-auto" />,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuATnuCfOINZpw-2PvKGOeuNy2w-2tud7kJPMLr-CVJ0Q3PPBxtEVmBnOvrdSUUxiceR2E2t0PjWdduIFbMdJldKu5xfcOykr_c_OokhTL0uBfb7e7xzojpvNlB0Fsn8mrdrsrg1kZV8kp6E5laToElH7YzO0Q80Gakh7JTgaOvCELbzWZrIEEhGgo0LkCSk3Dw-b5p0NoqyRi2tSD6myO0sYFFjRJKubXMxlNy6gY-97je0HYYXe4zARwcGHXcfP6AaLttgtjSMPfY',
    description: 'Discover the pure radiance of masterfully crafted gold jewellery. Perfect for every occasion from daily wear to grand celebrations.',
  },
  {
    id: 'diamond-jewellery',
    title: 'Diamond Jewellery',
    icon: <Sparkles className="w-8 h-8 text-luxury-gold mb-2 mx-auto" />,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCRpe0h4H9W7Mi2-YS7xk6LZ-Qpjs-QH1clvStlEYAZo9IrDLkSyc9NYxUCi4-Vu5QnF03mkXJm9ezy2KUEqjNv8IPRydAZHMbQthxhFkX0G3bravZgKfUu6dxU_gbgpYI-4OsaitSq-svUqVM-2RzFZj0_PHBDq7rxXO-HxyZAmh1rw2Nv_PMs0l3JHLySXV8SSUadMq5b_FpmzgeKNJz9JMuY-I9qI9ZiyCW-cruTHM6XG-MYyqvF6IzJyu4cRdRHgXdAO9c-olQ',
    description: 'Brilliant cut diamonds set in exquisite designs. Let our diamond collection add a sparkle to your life\'s most precious moments.',
  },
  {
    id: 'silver-jewellery',
    title: 'Silver Jewellery',
    icon: <Star className="w-8 h-8 text-luxury-gold mb-2 mx-auto" />,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAg0VItmbW2aaThIdv8IS3nw1az53xMS8BRWvkTIeFqYAiQCBITduBeyQp-DlcmVUJeiWO6rIm6Ep42F2RSRks3jZzbmy2y_xa4Fz9EmypkHFLRraHasY_jTklIQk2Cm1rJ2gmhXsBOyyFZSzW-vkzFCcpoW4ZHHfA7EFfdbkB9hBGSCemUZrbaigIDahW6ZIHxoDqNM4qipqVuUqvmFgJ3kBSBPTRKnUWI1P_oHESePApVeXqD9ngj0bXTcnubMVWh-3ALNfMMcPE',
    description: 'Elegant silver artefacts and lightweight jewellery. Crafted with precision for a touch of timeless charm.',
  },
  {
    id: 'bridal-collection',
    title: 'Bridal Collection',
    icon: <Heart className="w-8 h-8 text-luxury-gold mb-2 mx-auto" />,
    image:
      'https://lh3.googleusercontent.com/pw/AP1GczOswQ2trHLbyTPqK78QjuBWqVwgTR7LLFUzAwUChdc--11dNyug0eWlCVvI6Az5qPb7gXdUczV9WBsARZKy1hkJNqAEi7qKKZ1e-K3X9sO18fgqsRc=s0',
    description: 'For your most precious moments, choose jewellery that tells your story with grace and grandeur. Our bridal pieces are designed to make you shine on your special day.',
  },
  {
    id: 'mens-collection',
    title: "Men's Collection",
    icon: <User className="w-8 h-8 text-luxury-gold mb-2 mx-auto" />,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC6VyDnpd7gqSVHQPngBYLjmmat-nP_ANEd8kaniQFUq7gbsdaZO9Sux4vmU8EQfzHMKttAMPYrVVMI9Z8eJpxHIB-1h_nvImUvDKJsp5p-K9F0IKKhuWxnar3GGva-8FOswfq7SXFHUR_w-3kH_mxfO07IDkaO4H-RrnRwHb3_L_RU6cqQuWH4LhiHsjQO3wcNVnNSX2gEtESxieHyATO98YAwFIA2LC4w_eSOSCFGG7_7vqnJKotkO_KtOySScFjOCagiN_oF-GM',
    description: 'Bold designs crafted exclusively for men. From classic rings to heavy chains, explore our premium collection.',
  },
  {
    id: 'daily-wear',
    title: 'Daily Wear',
    icon: <ShoppingBag className="w-8 h-8 text-luxury-gold mb-2 mx-auto" />,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD2KN-9FCmnv_wseZFDG7m4yiptzM2YWSk7cql9glLqqrbPvysQYZKANIgzVu6Igsa5xbnU1Ga7PUynHYLC8XtzcEfCWvagsKEzr7KeVyiTRYWtC9EF-FnvtjsV0hArG0pRPBeLIsphb3O2i0z3Ad_49g7xP0PtLkC_JLq0WkZL3lu8vvuevFuY0y95t2RajNy7wmifb71djZrlv7EopIqZsEqSQIZL8NUPU2XXtftERBD0xIs8pKT-dDDi8PceMxPmvL46xCLsKE0',
    description: 'Lightweight, modern, and versatile designs meant for everyday elegance. Stay stylish everywhere you go.',
  },
];
