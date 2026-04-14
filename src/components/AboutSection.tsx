import { useScrollAnimation, useCountUp } from '@/hooks/useScrollAnimation';
import { useEffect } from 'react';

const badges = [
  { label: '10+ Years Experience', value: 10 },
  { label: '500+ Happy Clients', value: 500 },
  { label: 'Premium Products', value: 0 },
];

const CountBadge = ({ label, value, delay = 0 }: { label: string; value: number; delay?: number }) => {
  const { ref, isVisible } = useScrollAnimation(0.25);
  const { count, start } = useCountUp(value, 1500);

  useEffect(() => {
    if (isVisible) start();
  }, [isVisible, start]);

  return (
    <div
      ref={ref}
      className={`rounded-xl border border-primary/20 bg-card/80 backdrop-blur-sm px-4 py-5 text-center transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="font-display text-3xl md:text-4xl text-primary mb-1">
        {value > 0 ? `${count}+` : '✦'}
      </div>
      <div className="font-body text-sm tracking-widest uppercase text-muted-foreground">{label}</div>
    </div>
  );
};

const AboutSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="about" className="relative py-24 md:py-32 overflow-hidden">
      <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-gold-light/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />

      <div className="container mx-auto px-4 md:px-8">
        <div
          ref={ref}
          className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Image */}
          <div
            className={`relative transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-x-0 rotate-0' : 'opacity-0 -translate-x-10 rotate-1'
            }`}
            style={{ transitionDelay: '120ms' }}
          >
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-gold-light/20 via-transparent to-primary/20 blur-2xl" />
            <div className="relative overflow-hidden rounded-3xl border border-primary/30 bg-card p-3 shadow-[0_24px_70px_rgba(120,88,30,0.16)]">
              <img
                src="/party%20makeup.jpg"
                alt="Sangeeta Rai"
                className="w-full h-[430px] sm:h-[500px] object-cover rounded-2xl"
                loading="lazy"
                width={800}
                height={1000}
              />
              <div className="absolute inset-0 rounded-2xl border border-white/20 m-6 pointer-events-none" />
            </div>

            <div className="absolute -bottom-6 -right-4 sm:right-0 rounded-xl border border-primary/25 bg-background/95 px-5 py-4 shadow-lg backdrop-blur-sm">
              <p className="font-body text-xs tracking-[0.2em] uppercase text-muted-foreground mb-1">Signature Approach</p>
              <p className="font-display text-2xl text-primary">Luxury, Detail, Care</p>
            </div>
          </div>

          {/* Text */}
          <div
            className={`transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}
            style={{ transitionDelay: '220ms' }}
          >
            <p className="font-body text-xs tracking-[0.28em] uppercase text-primary mb-3">About The Studio</p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground leading-[0.95] mb-3">Our Story</h2>
            <p className="font-display text-lg italic text-muted-foreground mb-6">Crafting timeless beauty experiences in every appointment.</p>
            <div
              className={`h-px bg-gradient-to-r from-primary via-gold-light to-transparent mb-8 transition-all duration-1500 ease-out ${
                isVisible ? 'w-32' : 'w-0'
              }`}
              style={{ transitionDelay: '500ms' }}
            />

            <p className="font-body text-muted-foreground leading-relaxed mb-6">
              Founded by Sangeeta Rai, SR Unisex Beauty Salon & Makeup Studio is a sanctuary of elegance and transformation. With over a decade of expertise in the art of beauty, Sangeeta has cultivated a space where every client receives a personalized, luxurious experience.
            </p>
            <p className="font-body text-muted-foreground leading-relaxed mb-10">
              We believe beauty is an art form. Using only premium products and cutting-edge techniques, our certified artists craft looks that enhance your natural radiance from stunning bridal transformations to everyday elegance.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
              {badges.map((b, index) => (
                <CountBadge key={b.label} {...b} delay={index * 120 + 300} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
