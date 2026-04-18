'use client';
import { useEffect, useState, useRef } from 'react';

interface Slide {
  id: number;
  tag: string;
  headline: string;
  headlineEmphasis: string;
  subtitle: string;
  image: string;
}

const slides: Slide[] = [
  {
    id: 1,
    tag: 'Hair & Style',
    headline: 'Redefine Your Beauty',
    headlineEmphasis: 'Beauty',
    subtitle: 'Unisex Beauty Salon & Makeup Studio by Sangeeta Rai',
    image: '/hero-salon.jpg',
  },
  {
    id: 2,
    tag: 'Colour & Gloss',
    headline: 'Colour that Speaks First',
    headlineEmphasis: 'Speaks',
    subtitle: 'Balayage · Highlights · Full Colour · Keratin',
    image: '/hair%20color.jpg',
  },
  {
    id: 3,
    tag: 'Bridal Studio',
    headline: 'Your Most Radiant Day',
    headlineEmphasis: 'Radiant',
    subtitle: 'Bridal Makeup · Draping · Updo Styling · Trial Packages',
    image: '/bridal.jpg',
  },
  {
    id: 4,
    tag: 'Makeup Studio',
    headline: 'Art on Every Face',
    headlineEmphasis: 'Art',
    subtitle: 'Party Makeup · HD Airbrush · Photoshoot · Editorial',
    image: '/party%20makeup.jpg',
  },
];

// Inject animation styles
const injectStyles = () => {
  if (typeof document === 'undefined') return;
  const styleId = 'hero-section-styles';
  if (document.getElementById(styleId)) return;

  const style = document.createElement('style');
  style.id = styleId;
  style.textContent = `
    @keyframes twinkle {
      0%, 100% { opacity: 0.2; transform: scale(1); }
      50% { opacity: 0.7; transform: scale(1.2); }
    }
    
    @keyframes slideUpOut {
      from { opacity: 1; transform: translateY(0); }
      to { opacity: 0; transform: translateY(-12px); }
    }
    
    @keyframes slideUpIn {
      from { opacity: 0; transform: translateY(12px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    .twinkle-dot {
      animation: twinkle 3s ease-in-out infinite;
    }
    
    .headline-exit {
      animation: slideUpOut 0.6s ease forwards;
    }
    
    .headline-enter {
      animation: slideUpIn 0.6s ease forwards;
    }
  `;
  document.head.appendChild(style);
};

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [imageSrc, setImageSrc] = useState(slides[0].image);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const autoplayIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const SLIDE_DURATION = 4800;

  useEffect(() => {
    injectStyles();
  }, []);

  // Gold particles animation
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
    for (let i = 0; i < 20; i++) {
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

  // Auto-advance slides
  useEffect(() => {
    autoplayIntervalRef.current = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        const nextSlide = (currentSlide + 1) % slides.length;
        setCurrentSlide(nextSlide);
        setImageSrc(slides[nextSlide].image);
        setProgress(0);
        setIsTransitioning(false);
      }, 600);
    }, SLIDE_DURATION);

    return () => {
      if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
    };
  }, [currentSlide]);

  // Progress bar animation
  useEffect(() => {
    setProgress(0);
    progressIntervalRef.current = setInterval(() => {
      setProgress((prev) => Math.min(prev + 100 / (SLIDE_DURATION / 16), 100));
    }, 16);

    return () => {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [currentSlide]);

  const goToSlide = (index: number) => {
    if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide(index);
      setImageSrc(slides[index].image);
      setProgress(0);
      setIsTransitioning(false);
      // Restart autoplay after manual slide navigation
      autoplayIntervalRef.current = setInterval(() => {
        setIsTransitioning(true);
        setTimeout(() => {
          const nextSlide = (index + 1) % slides.length;
          setCurrentSlide(nextSlide);
          setImageSrc(slides[nextSlide].image);
          setProgress(0);
          setIsTransitioning(false);
        }, 600);
      }, SLIDE_DURATION);
    }, 600);
  };

  const slide = slides[currentSlide];
  const headlineParts = slide.headline.split(slide.headlineEmphasis);

  // Ambient sparkle positions (right half of hero)
  const sparkles = [
    { top: '15%', right: '12%', delay: '0s' },
    { top: '35%', right: '8%', delay: '0.5s' },
    { top: '60%', right: '15%', delay: '1s' },
    { top: '75%', right: '10%', delay: '1.5s' },
    { top: '20%', right: '22%', delay: '0.8s' },
    { top: '45%', right: '18%', delay: '1.2s' },
    { top: '70%', right: '25%', delay: '0.3s' },
    { top: '85%', right: '5%', delay: '1.8s' },
    { top: '28%', right: '28%', delay: '1.1s' },
    { top: '55%', right: '30%', delay: '0.6s' },
  ];

  return (
    <section id="home" className="relative w-full h-screen overflow-hidden bg-[#0a0806]">
      {/* Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 5 }}
      />

      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={imageSrc}
          alt={slide.tag}
          className={`w-full h-full object-cover transition-opacity duration-1000 ease-out ${
            isTransitioning ? 'opacity-50' : 'opacity-100'
          }`}
          style={{ filter: 'brightness(0.42)' }}
        />

        {/* Solid Dark Veil */}
        <div className="absolute inset-0 bg-[rgba(5,3,2,0.3)]" />

        {/* Left-to-Right Gradient Fade */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to right, rgba(5,3,2,0.4) 0%, rgba(5,3,2,0.2) 45%, rgba(5,3,2,0.05) 100%)',
          }}
        />
      </div>

      {/* Ambient Sparkle Dots */}
      {sparkles.map((sparkle, i) => (
        <div
          key={i}
          className="twinkle-dot absolute w-1 h-1 rounded-full"
          style={{
            backgroundColor: '#d4af37',
            top: sparkle.top,
            right: sparkle.right,
            animationDelay: sparkle.delay,
            width: `${Math.random() * 3 + 2}px`,
            height: `${Math.random() * 3 + 2}px`,
          }}
        />
      ))}

      {/* Main Content */}
      <div className="relative z-10 h-full w-full flex flex-col justify-between px-8 sm:px-12 py-12 sm:py-16">
        {/* Top Section */}
        <div className="flex items-start">
          <div className={`transition-all duration-500 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
            <div className="flex items-center gap-3 mb-2">
              <div
                className="h-px"
                style={{
                  width: '26px',
                  backgroundColor: '#d4af37',
                }}
              />
              <span
                className="font-sans text-[10px] font-medium uppercase"
                style={{
                  letterSpacing: '0.2em',
                  color: 'rgba(255,255,255,0.55)',
                }}
              >
                {slide.tag}
              </span>
            </div>
          </div>
        </div>

        {/* Middle Content */}
        <div className="max-w-3xl">
          {/* Headline */}
          <div className="min-h-32 sm:min-h-40 overflow-hidden mb-6">
            <h1
              className={`font-display font-bold leading-snug transition-all duration-600 block ${
                isTransitioning ? 'headline-exit' : 'headline-enter'
              }`}
              style={{
                fontSize: 'clamp(40px, 7.5vw, 72px)',
                color: '#f5e6c0',
                maxWidth: '480px',
                wordBreak: 'break-word',
                whiteSpace: 'normal',
                fontWeight: 700,
              }}
            >
              {headlineParts[0]}
              <em style={{ color: '#d4af37', fontStyle: 'italic' }}>{slide.headlineEmphasis}</em>
              {headlineParts[1]}
            </h1>
          </div>

          {/* Subtitle */}
          <div
            className={`transition-opacity duration-500 mb-8 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}
          >
            <p
              className="font-sans text-xs sm:text-sm uppercase"
              style={{
                letterSpacing: '0.15em',
                color: 'rgba(255,255,255,0.55)',
              }}
            >
              {slide.subtitle}
            </p>
          </div>

          {/* CTAs */}
          <div
            className={`flex flex-col sm:flex-row gap-4 transition-all duration-500 ${
              isTransitioning ? 'opacity-0' : 'opacity-100'
            }`}
          >
            <button
              onClick={() => document.getElementById('book-now')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3 font-bold text-xs uppercase transition-all duration-300"
              style={{
                backgroundColor: '#d4af37',
                color: '#0a0806',
                fontSize: '13px',
                fontWeight: 700,
                letterSpacing: '0.1em',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.9')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
            >
              Book Now
            </button>
            <button
              onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3 font-medium text-xs uppercase transition-all duration-300"
              style={{
                backgroundColor: 'transparent',
                color: '#ffffff',
                border: '1px solid rgba(212,175,55,0.3)',
                fontSize: '13px',
                letterSpacing: '0.1em',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#d4af37';
                e.currentTarget.style.color = '#d4af37';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(212,175,55,0.3)';
                e.currentTarget.style.color = '#ffffff';
              }}
            >
              Explore Services
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex items-center justify-between">
          {/* Slide Counter */}
          <div
            className={`text-xs font-medium transition-all duration-500 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}
            style={{
              color: 'rgba(212,175,55,0.6)',
              letterSpacing: '0.1em',
            }}
          >
            {String(currentSlide + 1).padStart(2, '0')} — {String(slides.length).padStart(2, '0')}
          </div>

          {/* Dash-style Navigation Dots */}
          <div className="flex items-center gap-3">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-1 transition-all duration-300 cursor-pointer ${
                  index === currentSlide ? 'w-8' : 'w-6 hover:w-7'
                }`}
                style={{
                  backgroundColor: index === currentSlide ? '#d4af37' : 'rgba(212,175,55,0.2)',
                }}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div
        className="absolute bottom-0 left-0 h-0.5"
        style={{
          width: `${progress}%`,
          backgroundColor: '#d4af37',
          transition: 'width 16ms linear',
        }}
      />
    </section>
  );
};

export default HeroSection;
