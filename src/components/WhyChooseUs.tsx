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
      className={`rounded-2xl border border-white/15 bg-white/[0.04] backdrop-blur-sm p-6 md:p-7 text-center transition-all duration-700 hover:-translate-y-1 hover:bg-white/[0.08] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-primary/35 bg-primary/10">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <div className="font-display text-4xl md:text-5xl text-slate-100 mb-2">
        {count}{suffix}
      </div>
      <div className="font-body text-sm tracking-[0.16em] uppercase text-slate-300">{label}</div>
    </div>
  );
};

const WhyChooseUs = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="relative overflow-hidden py-24 md:py-32 bg-[linear-gradient(160deg,#0b0f1c_0%,#111a2b_45%,#0f1724_100%)]">
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
