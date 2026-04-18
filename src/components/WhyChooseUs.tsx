import { useScrollAnimation, useCountUp } from '@/hooks/useScrollAnimation';
import { useEffect } from 'react';

const stats = [
  { value: 500, label: 'Happy Clients', suffix: '+' },
  { value: 10, label: 'Years of Excellence', suffix: '+' },
  { value: 50, label: 'Premium Products', suffix: '+' },
  { value: 15, label: 'Expert Artists', suffix: '+' },
];

const StatItem = ({ value, label, suffix, index }: { value: number; label: string; suffix: string; index: number }) => {
  const { ref, isVisible } = useScrollAnimation(0.2);
  const { count, start } = useCountUp(value, 2000);

  useEffect(() => {
    if (isVisible) start();
  }, [isVisible, start]);

  return (
    <div
      ref={ref}
      className={`group relative flex flex-col transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      {/* Background card */}
      <div className="relative h-40 md:h-48 rounded-2xl overflow-hidden bg-white border border-[#d4af37]/30 group-hover:border-[#d4af37]/70 transition-all duration-500 shadow-sm group-hover:shadow-md">
        
        {/* Left accent bar */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#d4af37] via-[#d4af37]/60 to-[#d4af37]/20 group-hover:w-2 transition-all duration-500" />
        
        {/* Top accent line animated */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#d4af37]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Content container */}
        <div className="relative h-full flex flex-col justify-center px-6 md:px-8 py-8">
          
          {/* Number display */}
          <div className="mb-3">
            <div className="font-body text-4xl md:text-5xl font-semibold text-[#d4af37] leading-none">
              {count}
            </div>
            <span className="font-body text-base md:text-lg text-[#d4af37]">{suffix}</span>
          </div>
          
          {/* Label */}
          <div className="font-body text-xs md:text-sm tracking-[0.15em] uppercase text-[#1a1410] font-semibold leading-relaxed">
            {label}
          </div>
        </div>
        
        {/* Hover background shimmer */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-[#d4af37]/8 to-transparent pointer-events-none" />
      </div>
    </div>
  );
};

const WhyChooseUs = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="relative overflow-hidden py-24 md:py-32 bg-[#f9f5f0]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(212,175,55,0.04),transparent_35%),radial-gradient(circle_at_90%_15%,rgba(212,175,55,0.03),transparent_32%)]" />

      {/* Grain texture */}
      <div className="absolute inset-0 opacity-[0.015]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      }} />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div ref={ref} className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="font-body text-xs md:text-sm tracking-[0.26em] uppercase text-[#d4af37] mb-3">What Sets Us Apart</p>
          <h2 className="font-display text-4xl md:text-5xl text-[#1a1410] mb-4">Why Choose Us</h2>
          <p className="font-body text-[#1a1410] max-w-2xl mx-auto leading-relaxed" style={{ opacity: '0.8' }}>
            We blend artistry, hygiene-first standards, and personalized consultations to deliver a premium studio experience every time.
          </p>
          <div className={`h-px bg-[#d4af37]/70 mx-auto transition-all duration-1000 mt-6 ${isVisible ? 'w-24' : 'w-0'}`} style={{ transitionDelay: '300ms' }} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((s, i) => (
            <StatItem key={s.label} {...s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
