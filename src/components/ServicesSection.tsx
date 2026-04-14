import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Scissors, Sparkles, Heart, Palette, Star, Leaf, Hand, User } from 'lucide-react';

const services = [
  { icon: Scissors, name: 'Hair Styling & Coloring', desc: 'Precision cuts, vibrant coloring, and bespoke styling tailored to your personality.' },
  { icon: Sparkles, name: 'Bridal Makeup', desc: 'Show-stopping bridal looks crafted to make your special day truly unforgettable.' },
  { icon: Heart, name: 'Skincare & Facials', desc: 'Rejuvenating facial treatments using premium products for radiant, glowing skin.' },
  { icon: Palette, name: 'Nail Art & Extensions', desc: 'Exquisite nail designs and extensions for a flawless finish at your fingertips.' },
  { icon: Star, name: 'Threading & Waxing', desc: 'Precise grooming services for perfectly shaped brows and silky-smooth skin.' },
  { icon: Leaf, name: 'Hair Spa & Treatment', desc: 'Deep conditioning and repair treatments to restore your hair\'s natural brilliance.' },
  { icon: Hand, name: 'Mehendi / Henna', desc: 'Intricate traditional and contemporary henna designs for all occasions.' },
  { icon: User, name: 'Men\'s Grooming', desc: 'Expert grooming services including haircuts, beard styling, and skincare for men.' },
];

const ServiceCard = ({ icon: Icon, name, desc, index }: { icon: typeof Scissors; name: string; desc: string; index: number }) => {
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <div
      ref={ref}
      className={`group relative overflow-hidden rounded-2xl border border-[#bfa57c]/25 bg-white/85 p-7 md:p-8 transition-all duration-700 hover:-translate-y-2 hover:border-primary/45 hover:shadow-[0_22px_45px_rgba(82,64,36,0.18)] ${
        ''
      } ${
        isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'
      }`}
      style={{ transitionDelay: `${index * 90}ms` }}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/45 to-transparent" />
      <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-primary/10 blur-2xl transition-opacity duration-700 group-hover:opacity-100 opacity-40" />

      <div className="relative z-10 w-12 h-12 rounded-full border border-primary/30 bg-[linear-gradient(135deg,rgba(246,236,218,0.9),rgba(255,255,255,0.9))] flex items-center justify-center mb-6 transition-all duration-500 group-hover:border-primary group-hover:scale-110">
        <Icon className="w-5 h-5 text-primary" />
      </div>
      <h3 className="relative z-10 font-display text-2xl text-[#2e2518] mb-3 leading-tight">{name}</h3>
      <p className="relative z-10 font-body text-sm text-[#6b5a43] leading-relaxed">{desc}</p>

      <div className="relative z-10 mt-6 h-px w-0 bg-gradient-to-r from-primary to-transparent transition-all duration-500 group-hover:w-24" />
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
