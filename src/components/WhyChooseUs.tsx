import { useScrollAnimation, useCountUp } from '@/hooks/useScrollAnimation';
import { useEffect } from 'react';
import { Users, Trophy, Sparkles, Brush } from 'lucide-react';

const stats = [
  { icon: Users, value: 500, label: 'Happy Clients', suffix: '+' },
  { icon: Trophy, value: 10, label: 'Years of Excellence', suffix: '+' },
  { icon: Brush, value: 50, label: 'Premium Products', suffix: '+' },
  { icon: Sparkles, value: 15, label: 'Expert Artists', suffix: '+' },
];

const StatItem = ({ icon: Icon, value, label, suffix, index }: { icon: typeof Users; value: number; label: string; suffix: string; index: number }) => {
  const { ref, isVisible } = useScrollAnimation(0.2);
  const { count, start } = useCountUp(value, 2000);

  useEffect(() => {
    if (isVisible) start();
  }, [isVisible, start]);

  return (
    <div
      ref={ref}
      className={`group relative rounded-3xl overflow-visible p-8 md:p-10 text-center transition-all duration-700 mt-10 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.06] to-white/[0.01] group-hover:from-white/[0.1] group-hover:to-white/[0.03] transition-all duration-500 rounded-3xl" />
      
      {/* Enhanced border with glow */}
      <div className="absolute inset-0 rounded-3xl border-2 border-primary/25 group-hover:border-primary/50 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] group-hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_12px_40px_rgba(204,168,98,0.2)] transition-all duration-500" />

      {/* Icon container - positioned on border */}
      <div className="absolute -top-8 left-1/2 -translate-x-1/2 flex h-16 w-16 items-center justify-center rounded-xl border-2 border-primary/60 bg-primary/60 group-hover:bg-primary/70 shadow-lg group-hover:shadow-[0_12px_32px_rgba(204,168,98,0.3)] transition-all duration-500 transform group-hover:scale-110 group-hover:-translate-y-1 z-20">
        <Icon className="h-7 w-7 text-white transition-transform duration-500 group-hover:scale-120" />
      </div>

      {/* Accent dot */}
      <div className="absolute top-8 right-6 w-3 h-3 rounded-full bg-gradient-to-br from-primary/60 to-primary/30 shadow-lg group-hover:shadow-[0_0_16px_rgba(204,168,98,0.5)] transition-all duration-500 group-hover:scale-125" />

      <div className="relative z-10 pt-4">
        {/* Stats value - larger and more prominent */}
        <div className="font-body text-4xl md:text-5xl font-normal text-slate-50 mb-4 group-hover:text-white transition-colors duration-500 tracking-tight">
          {count}{suffix}
        </div>

        {/* Label with enhanced styling */}
        <div className="font-body text-xs md:text-sm tracking-[0.2em] uppercase text-slate-300 group-hover:text-slate-100 transition-colors duration-500 font-semibold letter-spacing">
          {label}
        </div>

        {/* Accent bar below label */}
        <div className="w-0 group-hover:w-16 h-1 bg-primary mx-auto mt-5 transition-all duration-500 rounded-full" />
      </div>

      {/* Hover background glow effect */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-primary/0 to-primary/0 group-hover:from-primary/3 group-hover:to-transparent transition-all duration-500 pointer-events-none" />
    </div>
  );
};

const WhyChooseUs = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="relative overflow-hidden py-24 md:py-32 bg-[linear-gradient(170deg,#17181c_0%,#22252b_46%,#1a1d23_100%)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(99,102,241,0.22),transparent_35%),radial-gradient(circle_at_90%_15%,rgba(45,212,191,0.18),transparent_32%)]" />

      {/* Grain texture */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      }} />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div ref={ref} className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="font-body text-xs md:text-sm tracking-[0.26em] uppercase text-primary mb-3">What Sets Us Apart</p>
          <h2 className="font-display text-4xl md:text-5xl text-white mb-4">Why Choose Us</h2>
          <p className="font-body text-slate-300/90 max-w-2xl mx-auto leading-relaxed">
            We blend artistry, hygiene-first standards, and personalized consultations to deliver a premium studio experience every time.
          </p>
          <div className={`h-px bg-primary/70 mx-auto transition-all duration-1000 mt-6 ${isVisible ? 'w-24' : 'w-0'}`} style={{ transitionDelay: '300ms' }} />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((s, i) => (
            <StatItem key={s.label} {...s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
