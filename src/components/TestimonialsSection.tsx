import { useEffect, useRef } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { ExternalLink } from 'lucide-react';

const testimonials = [
  { name: 'Priya Sharma', text: 'Sangeeta transformed my bridal look beyond my dreams. Every guest was mesmerized. Truly an artist!', rating: 5 },
  { name: 'Anita Mehta', text: 'The attention to detail at SR Salon is unmatched. My hair has never looked better. I won\'t go anywhere else!', rating: 5 },
  { name: 'Rahul Verma', text: 'Best grooming experience I\'ve ever had. Professional, clean, and the result is always perfect.', rating: 5 },
  { name: 'Neha Gupta', text: 'The facial treatments here are luxurious. My skin glows for weeks after each visit. Highly recommend!', rating: 5 },
  { name: 'Kavita Singh', text: 'Amazing nail art! They can recreate any design and the quality lasts. Worth every penny.', rating: 5 },
  { name: 'Deepak Joshi', text: 'Finally found a salon that understands men\'s styling. Clean cuts, great beard work, premium experience.', rating: 5 },
];

const TestimonialsSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const scrollRef = useRef<HTMLDivElement>(null);
  const isPausedRef = useRef(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    return () => {};
  }, []);

  return (
    <section
      id="testimonials"
      className="relative py-20 md:py-28 overflow-hidden bg-[linear-gradient(170deg,#17181c_0%,#22252b_46%,#1a1d23_100%)]"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_22%,rgba(255,255,255,0.05),transparent_30%),radial-gradient(circle_at_84%_20%,rgba(255,215,140,0.09),transparent_30%)]" />

      <div className="container relative z-10 mx-auto px-4 md:px-8">
        <div ref={ref} className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="font-display text-4xl md:text-5xl italic text-white mb-4">What Our Clients Say</h2>
          <div className={`h-px bg-primary mx-auto transition-all duration-1000 ${isVisible ? 'w-20' : 'w-0'}`} style={{ transitionDelay: '300ms' }} />
        </div>
      </div>

      <div className="relative z-10 px-4 md:px-12">
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide"
          style={{ scrollBehavior: 'smooth' }}
          onMouseEnter={() => {
            isPausedRef.current = true;
          }}
          onMouseLeave={() => {
            isPausedRef.current = false;
          }}
        >
          {[...testimonials, ...testimonials].map((t, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-[350px] md:w-[400px] rounded-2xl border border-white/14 bg-slate-900/45 backdrop-blur-md p-8 shadow-[0_16px_40px_rgba(12,14,18,0.4)]"
            >
              <div className="font-display text-5xl text-primary/30 mb-4">"</div>
              <p className="font-body text-slate-300 leading-relaxed mb-6">{t.text}</p>
              <div className="flex gap-1 mb-3">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <span key={j} className="text-primary text-sm">★</span>
                ))}
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/15 flex items-center justify-center">
                  <span className="font-display text-sm text-primary">{t.name[0]}</span>
                </div>
                <span className="font-body text-sm text-slate-100">{t.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-8 mt-12 text-center">
        <a
          href="https://www.google.com/maps/place/SR+Unisex+Beauty+Salon+and+Make-up+Studio/@27.6654702,85.4246603,17z/data=!3m1!4b1!4m6!3m5!1s0x39eb1b50bfb5e69d:0xf5e2747dc83352fc!8m2!3d27.6654702!4d85.4246603!16s%2Fg%2F11m5_fght9!18m1!1e1?entry=ttu&g_ep=EgoyMDI2MDQxMi4wIKXMDSoASAFQAw%3D%3D"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 font-body text-xs tracking-[0.22em] uppercase text-primary hover:text-gold-light transition-colors group"
        >
          View All Reviews
          <ExternalLink className="h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
        </a>
      </div>
    </section>
  );
};

export default TestimonialsSection;
