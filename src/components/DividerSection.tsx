import { useRef, useEffect, useState } from 'react';

const DividerSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Scroll parallax effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Mouse move effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (sectionRef.current?.getBoundingClientRect().top) {
        const rect = sectionRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          setMousePosition({
            x: (e.clientX - rect.left - rect.width / 2) * 0.02,
            y: (e.clientY - rect.top - rect.height / 2) * 0.02,
          });
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToBooking = () => {
    const bookingSection = document.getElementById('book-now');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      ref={sectionRef}
      style={{
        width: '100%',
        minHeight: '500px',
        backgroundColor: '#fdf6ec',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px 20px',
        perspective: '1000px',
        overflow: 'hidden',
      }}
    >
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        
        @keyframes rotate-slow {
          0%, 100% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .float-element {
          animation: float 4s ease-in-out infinite;
        }
        
        .pulse-element {
          animation: pulse-glow 3s ease-in-out infinite;
        }
      `}</style>

      {/* Decorative floating circles */}
      <div
        style={{
          position: 'absolute',
          top: '10%',
          left: '5%',
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          border: '2px solid #b8972e',
          opacity: 0.15,
          animation: 'float 6s ease-in-out infinite',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '15%',
          right: '8%',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          border: '2px solid #d4af37',
          opacity: 0.1,
          animation: 'float 5s ease-in-out infinite',
          animationDelay: '1s',
        }}
      />

      <div
        ref={contentRef}
        style={{
          maxWidth: '800px',
          textAlign: 'center',
          position: 'relative',
          zIndex: 10,
          transform: `translateX(${mousePosition.x}px) translateY(${mousePosition.y}px)`,
          transition: 'transform 0.1s ease-out',
        }}
      >
        {/* Eyebrow - Fade in animation + continuous pulse */}
        <p
          style={{
            color: '#b8972e',
            fontSize: '12px',
            fontWeight: 600,
            letterSpacing: '2px',
            textTransform: 'uppercase',
            marginBottom: '24px',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.6s ease-out 0s',
            animation: isVisible ? 'pulse-glow 3s ease-in-out infinite' : 'none',
            animationDelay: '0.6s',
          }}
        >
          Elevate Your Beauty
        </p>

        {/* Decorative rule - Scale in + rotate */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
            marginBottom: '32px',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'scaleX(1)' : 'scaleX(0)',
            transformOrigin: 'center',
            transition: 'all 0.6s ease-out 0.2s',
          }}
        >
          <div style={{ width: '24px', height: '1px', backgroundColor: '#b8972e' }} />
          <div
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#b8972e',
              animation: 'float 2s ease-in-out infinite',
            }}
          />
          <div style={{ width: '24px', height: '1px', backgroundColor: '#b8972e' }} />
        </div>

        {/* Main heading - Fade in */}
        <h2
          style={{
            color: '#1a1410',
            fontSize: '48px',
            fontWeight: 700,
            marginBottom: '24px',
            lineHeight: '1.2',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.6s ease-out 0.3s',
          }}
        >
          Luxury Expertise Reimagined
        </h2>

        {/* Description - Fade + Slide */}
        <p
          style={{
            color: '#5a4e3a',
            fontSize: '16px',
            marginBottom: '32px',
            lineHeight: '1.6',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.6s ease-out 0.4s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#b8972e';
            e.currentTarget.style.transform = 'scale(1.02)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#5a4e3a';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          Where artistry meets precision, and every detail reflects our commitment to excellence. Experience the ultimate in beauty and wellness.
        </p>

        {/* Quote - Fade + Italic bounce */}
        <p
          style={{
            color: '#b8972e',
            fontSize: '18px',
            marginBottom: '32px',
            fontStyle: 'italic',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.6s ease-out 0.5s',
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05) rotateZ(-1deg)';
            e.currentTarget.style.transition = 'all 0.3s ease';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1) rotateZ(0deg)';
          }}
        >
          "Where Beauty Meets Precision"
        </p>

        {/* Book Now Button - Fade + Scale + Glow effect */}
        <button
          onClick={scrollToBooking}
          style={{
            backgroundColor: '#1a1410',
            color: '#fdf6ec',
            padding: '14px 40px',
            borderRadius: '24px',
            fontWeight: 600,
            fontSize: '14px',
            border: 'none',
            cursor: 'pointer',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)',
            transition: 'all 0.6s ease-out 0.6s',
            position: 'relative',
            overflow: 'hidden',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#0a0806';
            e.currentTarget.style.transform = 'translateY(-3px) scale(1.08)';
            e.currentTarget.style.boxShadow = '0 20px 40px rgba(26, 20, 16, 0.4), 0 0 20px rgba(212, 175, 55, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#1a1410';
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          Book Now
        </button>
      </div>

      {/* Parallax scroll effect on background */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: '#f9f4ea',
          opacity: 0.3,
          transform: `translateY(${scrollY * 0.1}px)`,
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />
    </div>
  );
};

export default DividerSection;
