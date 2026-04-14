import { useEffect, useState, useRef } from 'react';
import heroImage from '@/assets/hero-salon.jpg';

const remoteHeroImage =
  'https://imgs.search.brave.com/26nBj-Gmjqv28-hxXpWJqTBQwa5ceMPoXAm_sE782bA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wMjcv/ODE5LzUxNi9zbWFs/bC9iZWF1dHktc2Fs/b24taW50ZXJpb3It/ZnJlZS1waG90by5q/cGc';

const HeroSection = () => {
  const [loaded, setLoaded] = useState(false);
  const [heroSrc, setHeroSrc] = useState(remoteHeroImage);
  const words = ['Redefine', 'Your', 'Beauty'];
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    setTimeout(() => setLoaded(true), 200);
  }, []);

  // Gold particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles: { x: number; y: number; vx: number; vy: number; size: number; opacity: number }[] = [];
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -Math.random() * 0.5 - 0.1,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.1,
      });
    }

    let raf: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -10) { p.y = canvas.height + 10; p.x = Math.random() * canvas.width; }
        if (p.x < -10 || p.x > canvas.width + 10) p.x = Math.random() * canvas.width;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(43, 60%, 65%, ${p.opacity})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(animate);
    };
    animate();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);

  return (
    <section id="home" className="relative min-h-[100svh] flex items-center justify-center overflow-hidden pt-16 md:pt-20">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={heroSrc}
          alt="Luxury salon interior"
          className="w-full h-full object-cover"
          width={1920}
          height={1080}
          onError={() => setHeroSrc(heroImage)}
        />
        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/40 to-black/50" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_18%,rgba(0,0,0,0.28)_100%)]" />
      </div>

      {/* Particles */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 w-full max-w-4xl">
        <div className="mx-auto w-full max-w-[92vw] md:max-w-4xl rounded-2xl border border-white/15 bg-black/28 backdrop-blur-[2px] px-4 py-7 sm:px-5 sm:py-8 md:px-8 md:py-10 shadow-[0_18px_50px_rgba(0,0,0,0.35)]">
        <div className="overflow-hidden mb-6">
          <div className="flex flex-col md:flex-row justify-center items-center gap-1 md:gap-6 flex-wrap">
            {words.map((word, i) => (
              <span
                key={word}
                className={`block font-display text-[2.85rem] leading-[1.05] sm:text-6xl md:text-8xl font-semibold gold-text transition-all duration-700 ${
                  loaded ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
                }`}
                style={{
                  transitionDelay: `${i * 200 + 400}ms`,
                  textShadow: '0 8px 28px rgba(0, 0, 0, 0.6)',
                  backgroundSize: '200% 100%',
                  animation: `shimmer 4s ease-in-out ${i * 0.25}s infinite`,
                }}
              >
                {word}
              </span>
            ))}
          </div>
        </div>

        <p
          className={`font-body text-base sm:text-lg md:text-xl text-ivory tracking-[0.14em] sm:tracking-[0.2em] uppercase mb-8 md:mb-10 transition-all duration-700 ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{ transitionDelay: '1200ms', textShadow: '0 4px 14px rgba(0, 0, 0, 0.45)' }}
        >
          Unisex Beauty Salon & Makeup Studio by Sangeeta Rai
        </p>

        <div
          className={`flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center transition-all duration-700 ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{ transitionDelay: '1500ms' }}
        >
          <button
            onClick={() => document.getElementById('book-now')?.scrollIntoView({ behavior: 'smooth' })}
            className="w-full sm:w-auto px-8 sm:px-10 py-3.5 sm:py-4 bg-primary text-primary-foreground font-body text-sm tracking-widest uppercase hover:bg-primary/90 transition-all duration-300 cursor-pointer shadow-[0_8px_24px_rgba(204,168,98,0.6)] hover:shadow-[0_12px_32px_rgba(204,168,98,0.8)]"
          >
            Book Now
          </button>
          <button
            onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
            className="w-full sm:w-auto px-8 sm:px-10 py-3.5 sm:py-4 border-2 border-primary text-primary font-body text-sm tracking-widest uppercase bg-white/10 hover:bg-primary hover:text-primary-foreground transition-all duration-300 cursor-pointer shadow-[0_4px_16px_rgba(204,168,98,0.4)] hover:shadow-[0_8px_24px_rgba(204,168,98,0.6)]"
          >
            Explore Services
          </button>
        </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
