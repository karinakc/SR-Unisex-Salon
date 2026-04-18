import { useState } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const images = [
  { src: '/hair.jpg', category: 'hair', alt: 'Hair Styling' },
  { src: '/bridal.jpg', category: 'bridal', alt: 'Bridal Makeup' },
  { src: '/nail%20art.jpg', category: 'nails', alt: 'Nail Art' },
  { src: '/makeup.jpg', category: 'makeup', alt: 'Makeup' },
  { src: '/hair%20color.jpg', category: 'hair', alt: 'Hair Coloring' },
  { src: '/bridal%20look.jpg', category: 'bridal', alt: 'Bridal Look' },
  { src: '/party%20makeup.jpg', category: 'makeup', alt: 'Party Makeup' },
  { src: '/nail.jpg', category: 'nails', alt: 'Nail Extensions' },
  { src: '/facial.png', category: 'skincare', alt: 'Skincare' },
  { src: '/hero-salon.jpg', category: 'grooming', alt: 'Men\'s Grooming' },
];

const filters = ['All', 'Hair', 'Makeup', 'Bridal', 'Nails', 'Skincare', 'Grooming'];

const shapeLayouts = [
  'sm:col-span-3 lg:col-span-3 sm:row-span-4 rounded-[2.5rem_0.75rem_2.5rem_0.75rem]',
  'sm:col-span-3 lg:col-span-6 sm:row-span-2 rounded-[0.75rem_2.5rem_0.75rem_2.5rem]',
  'sm:col-span-3 lg:col-span-3 sm:row-span-2 rounded-[2rem_2rem_0.75rem_0.75rem]',
  'sm:col-span-3 lg:col-span-3 sm:row-span-3 rounded-[0.75rem_2rem_2rem_0.75rem]',
  'sm:col-span-3 lg:col-span-3 sm:row-span-3 rounded-[2.25rem_0.75rem_0.75rem_2.25rem]',
  'sm:col-span-6 lg:col-span-3 sm:row-span-2 rounded-[0.75rem_0.75rem_2rem_2rem]',
  'sm:col-span-6 lg:col-span-3 sm:row-span-3 rounded-[2.75rem_0.75rem_2.75rem_0.75rem]',
  'sm:col-span-6 lg:col-span-3 sm:row-span-2 rounded-[0.75rem_2.25rem_0.75rem_2.25rem]',
  'sm:col-span-3 lg:col-span-3 sm:row-span-3 rounded-[2rem_0.75rem_2rem_0.75rem]',
  'sm:col-span-3 lg:col-span-3 sm:row-span-3 rounded-[0.75rem_2.25rem_2.25rem_0.75rem]',
];

const GallerySection = () => {
  const [filter, setFilter] = useState('All');
  const [lightbox, setLightbox] = useState<string | null>(null);
  const { ref, isVisible } = useScrollAnimation();

  const filtered = filter === 'All' ? images : images.filter((img) => img.category === filter.toLowerCase());

  return (
    <section id="gallery" className="relative py-16 md:py-24 overflow-hidden bg-[#0a0806]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_8%_20%,rgba(212,175,55,0.08),transparent_28%),radial-gradient(circle_at_86%_14%,rgba(212,175,55,0.05),transparent_30%)]" />
      <div className="container mx-auto px-3 md:px-4">
        <div ref={ref} className={`relative z-10 text-center mb-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="font-display text-4xl md:text-5xl text-[#f5e6c0] mb-4">Our Work Speaks</h2>
          <div className={`h-px bg-[#d4af37] mx-auto transition-all duration-1000 ${isVisible ? 'w-20' : 'w-0'}`} style={{ transitionDelay: '300ms' }} />
        </div>

        {/* Filters */}
        <div className="mb-8 flex justify-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-1 rounded-full border border-[#d4af37]/30 bg-[#1a1410]/60 p-1 shadow-[0_10px_28px_rgba(0,0,0,0.3)] backdrop-blur-sm">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              aria-pressed={filter === f}
              className={`group relative min-w-[80px] rounded-full px-4 py-1.5 font-body text-xs tracking-[0.14em] uppercase transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0806] ${
                filter === f
                  ? 'bg-[#d4af37] text-[#0a0806] shadow-[0_8px_18px_rgba(212,175,55,0.35)]'
                  : 'border border-transparent bg-transparent text-[#f5e6c0]/70 hover:border-[#d4af37]/25 hover:bg-[#1a1410]/80 hover:text-[#f5e6c0]'
              }`}
            >
              <span className="relative z-10">{f}</span>
            </button>
          ))}
          </div>
        </div>

        {/* Mosaic Grid */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-6 lg:grid-cols-12 sm:auto-rows-[100px] md:auto-rows-[115px] gap-1 md:gap-2">
          {filtered.map((img, i) => (
            <GalleryImage
              key={`${img.alt}-${i}`}
              {...img}
              index={i}
              shapeClass={shapeLayouts[i % shapeLayouts.length]}
              onClick={() => setLightbox(img.src)}
            />
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-[#0a0806]/95 backdrop-blur-xl flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setLightbox(null)}
        >
          <img src={lightbox} alt="Gallery" className="max-w-full max-h-[85vh] object-contain" />
          <button className="absolute top-6 right-6 text-[#f5e6c0] font-display text-2xl cursor-pointer">✕</button>
        </div>
      )}
    </section>
  );
};

const GalleryImage = ({
  src,
  alt,
  index,
  shapeClass,
  onClick,
}: {
  src: string;
  alt: string;
  index: number;
  shapeClass: string;
  onClick: () => void;
}) => {
  const { ref, isVisible } = useScrollAnimation(0.05);
  const title = alt.toUpperCase();

  return (
    <div
      ref={ref}
      onClick={onClick}
      className={`group relative overflow-hidden cursor-pointer aspect-[4/5] sm:aspect-auto rounded-3xl sm:rounded-none ${shapeClass} ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } transition-all duration-700`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="relative h-full w-full overflow-hidden border border-[#d4af37]/20 bg-[#1a1410]/50 backdrop-blur-[1px] [border-radius:inherit]">
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(25,20,12,0.1),rgba(20,15,10,0.25))] group-hover:bg-[linear-gradient(180deg,rgba(20,15,10,0.08),rgba(20,15,10,0.2))] transition-all duration-500" />
        <div className="absolute inset-0 flex items-center justify-center px-4 text-center">
          <span className="font-display text-lg sm:text-xl md:text-2xl tracking-[0.16em] sm:tracking-[0.22em] text-[#f5e6c0]/95 drop-shadow-[0_3px_8px_rgba(0,0,0,0.65)]">{title}</span>
        </div>
        <div className="absolute inset-0 flex items-end justify-center pb-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="font-body text-xs tracking-[0.2em] uppercase text-[#f5e6c0]/90">Open</span>
        </div>
      </div>
    </div>
  );
};

export default GallerySection;
