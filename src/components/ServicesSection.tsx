import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const services = [
  { name: 'Hair Styling & Coloring', desc: 'Precision cuts, vibrant coloring, and bespoke styling tailored to your personality.', image: '/hair%20color.jpg', price: '₹599+' },
  { name: 'Bridal Makeup', desc: 'Show-stopping bridal looks crafted to make your special day truly unforgettable.', image: '/bridal.jpg', price: '₹2,999+' },
  { name: 'Skincare & Facials', desc: 'Rejuvenating facial treatments using premium products for radiant, glowing skin.', image: '/facial.png', price: '₹699+' },
  { name: 'Nail Art & Extensions', desc: 'Exquisite nail designs and extensions for a flawless finish at your fingertips.', image: '/nail%20art.jpg', price: '₹399+' },
  { name: 'Threading & Waxing', desc: 'Precise grooming services for perfectly shaped brows and silky-smooth skin.', image: '/threading.png', price: '₹199+' },
  { name: 'Hair Spa & Treatment', desc: 'Deep conditioning and repair treatments to restore your hair\'s natural brilliance.', image: '/hairspa.png', price: '₹799+' },
  { name: 'Mehendi / Henna', desc: 'Intricate traditional and contemporary henna designs for all occasions.', image: '/mehendi.png', price: '₹1,499+' },
  { name: 'Men\'s Grooming', desc: 'Expert grooming services including haircuts, beard styling, and skincare for men.', image: '/hero-salon.jpg', price: '₹349+' },
];

const ServiceCard = ({ name, desc, image, price, index }: { name: string; desc: string; image: string; price: string; index: number }) => {
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <div
      ref={ref}
      className={`group relative overflow-hidden rounded-xl transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'}`}
      style={{ transitionDelay: `${index * 90}ms` }}
    >
      {/* Card background */}
      <div className="absolute inset-0 bg-white rounded-xl shadow-lg group-hover:shadow-2xl transition-shadow duration-700" />
      
      {/* Content wrapper */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Image top section */}
        <div className="relative overflow-hidden h-40 md:h-48 bg-[#f0ede8]">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          {/* Service number */}
          <div className="absolute top-3 right-3 bg-white/95 px-3 py-1 rounded-full shadow-md">
            <span className="font-display text-sm font-semibold text-[#8a6a3a]">{String(index + 1).padStart(2, '0')}</span>
          </div>
        </div>
        
        {/* Text content */}
        <div className="flex-1 flex flex-col p-5 md:p-6">
          <h3 className="font-display text-lg md:text-xl text-[#2e2518] mb-2 leading-tight group-hover:text-[#8a6a3a] transition-colors duration-500">{name}</h3>
          <p className="font-body text-sm text-[#6b5a43] leading-relaxed mb-4 flex-1 line-clamp-2">{desc}</p>
          
          {/* Divider line */}
          <div className="h-px bg-[#bfa57c]/30 mb-4 group-hover:bg-[#d4af37]/60 transition-colors duration-500" />
          
          {/* Price section */}
          <div className="flex items-end justify-between">
            <span className="font-body text-xs text-[#8a6a3a] uppercase tracking-wide">Starting from</span>
            <span className="font-body text-base text-[#2e2518] group-hover:text-[#8a6a3a] transition-colors duration-500">{price}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const ServicesSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      id="services"
      className="relative py-24 md:py-32 overflow-hidden bg-[linear-gradient(180deg,#f7f4ef_0%,#efe9df_45%,#f8f5ef_100%)]"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_12%,rgba(197,156,96,0.16),transparent_30%),radial-gradient(circle_at_86%_14%,rgba(128,104,69,0.11),transparent_32%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-25 [background-size:34px_34px] [background-image:linear-gradient(to_right,rgba(116,90,53,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(116,90,53,0.07)_1px,transparent_1px)]" />

      <div className="container relative z-10 mx-auto px-4 md:px-8">
        <div ref={ref} className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="font-body text-xs md:text-sm tracking-[0.28em] uppercase text-[#8a6a3a] mb-3">Luxury Care Menu</p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-4">Our Services</h2>
          <p className="font-body text-[#6b5a43] max-w-2xl mx-auto leading-relaxed">
            Bespoke beauty rituals designed to elevate your everyday look and your most special moments.
          </p>
          <div className={`h-px bg-primary mx-auto transition-all duration-1000 mt-6 ${isVisible ? 'w-28' : 'w-0'}`} style={{ transitionDelay: '300ms' }} />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-7">
          {services.map((s, i) => (
            <ServiceCard key={s.name} {...s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
