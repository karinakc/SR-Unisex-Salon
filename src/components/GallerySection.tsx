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
];

const filters = ['All', 'Hair', 'Makeup', 'Bridal', 'Nails'];

const shapeLayouts = [
  'sm:col-span-3 lg:col-span-3 sm:row-span-4 rounded-[2.5rem_0.75rem_2.5rem_0.75rem]',
  'sm:col-span-3 lg:col-span-6 sm:row-span-2 rounded-[0.75rem_2.5rem_0.75rem_2.5rem]',
  'sm:col-span-3 lg:col-span-3 sm:row-span-2 rounded-[2rem_2rem_0.75rem_0.75rem]',
  'sm:col-span-3 lg:col-span-3 sm:row-span-3 rounded-[0.75rem_2rem_2rem_0.75rem]',
  'sm:col-span-3 lg:col-span-3 sm:row-span-3 rounded-[2.25rem_0.75rem_0.75rem_2.25rem]',
  'sm:col-span-3 lg:col-span-3 sm:row-span-2 rounded-[0.75rem_0.75rem_2rem_2rem]',
  'sm:col-span-6 lg:col-span-6 sm:row-span-2 rounded-[2.75rem_0.75rem_2.75rem_0.75rem]',
  'sm:col-span-6 lg:col-span-3 sm:row-span-2 rounded-[0.75rem_2.25rem_0.75rem_2.25rem]',
];

const GallerySection = () => {
  const [filter, setFilter] = useState('All');
  const [lightbox, setLightbox] = useState<string | null>(null);
  const { ref, isVisible } = useScrollAnimation();

  const filtered = filter === 'All' ? images : images.filter((img) => img.category === filter.toLowerCase());

  return (
    <section id="gallery" className="relative py-24 md:py-32 overflow-hidden bg-[linear-gradient(180deg,#f8f3e7_0%,#f4ecdc_40%,#fbf8f1_100%)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_8%_20%,rgba(204,168,98,0.16),transparent_28%),radial-gradient(circle_at_86%_14%,rgba(132,88,40,0.09),transparent_30%)]" />
      <div className="container mx-auto px-4 md:px-8">
        <div ref={ref} className={`relative z-10 text-center mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="font-display text-4xl md:text-5xl text-foreground mb-4">Our Work Speaks</h2>
          <div className={`h-px bg-primary mx-auto transition-all duration-1000 ${isVisible ? 'w-20' : 'w-0'}`} style={{ transitionDelay: '300ms' }} />
        </div>

        {/* Filters */}
        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`font-body text-sm tracking-widest uppercase px-5 py-2 transition-all duration-300 cursor-pointer ${
                filter === f
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-primary border border-primary/25 bg-white/60'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Mosaic Grid */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-6 lg:grid-cols-12 auto-rows-[110px] sm:auto-rows-[110px] md:auto-rows-[130px] gap-3 md:gap-4">
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
          className="fixed inset-0 z-50 bg-background/90 backdrop-blur-xl flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setLightbox(null)}
        >
          <img src={lightbox} alt="Gallery" className="max-w-full max-h-[85vh] object-contain" />
          <button className="absolute top-6 right-6 text-foreground font-display text-2xl cursor-pointer">✕</button>
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
      className={`group relative overflow-hidden cursor-pointer min-h-[220px] sm:min-h-0 sm:h-auto ${shapeClass} ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } transition-all duration-700`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="relative h-full w-full overflow-hidden border border-primary/20 bg-white/50 backdrop-blur-[1px] [border-radius:inherit]">
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(25,20,12,0.12),rgba(20,15,10,0.42))] group-hover:bg-[linear-gradient(180deg,rgba(20,15,10,0.08),rgba(20,15,10,0.32))] transition-all duration-500" />
        <div className="absolute inset-0 flex items-center justify-center px-4 text-center">
          <span className="font-display text-xl md:text-2xl tracking-[0.22em] text-primary/90">{title}</span>
        </div>
        <div className="absolute inset-0 flex items-end justify-center pb-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="font-body text-xs tracking-[0.2em] uppercase text-white/90">Open</span>
        </div>
      </div>
    </div>
  );
};

export default GallerySection;
