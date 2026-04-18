'use client';
import { useEffect } from 'react';

const ServicesMarquee = () => {
  const services = [
    'Hair Cut',
    'Balayage',
    'Bridal Makeup',
    'Hair Colour',
    'Keratin',
    'Nail Art',
    'HD Makeup',
    'Facial',
    'Updo Styling',
    'Airbrush',
    'Waxing',
    'Mehendi',
  ];

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes scrollMarquee {
        0% {
          transform: translateX(0);
        }
        100% {
          transform: translateX(-50%);
        }
      }

      .marquee-track {
        animation: scrollMarquee 30s linear infinite;
      }

      .marquee-track:hover {
        animation-play-state: paused;
      }

      .marquee-item {
        display: inline-flex;
        align-items: center;
        gap: 24px;
        white-space: nowrap;
        font-family: Georgia, serif;
        font-size: clamp(18px, 3vw, 28px);
        font-weight: 600;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        color: #f5e6c0;
        transition: color 0.3s ease;
      }

      .marquee-item:hover {
        color: #ffffff;
      }

      .divider {
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #d4af37;
        margin: 0 12px;
      }
    `;
    document.head.appendChild(style);
  }, []);

  return (
    <section 
      className="relative w-full overflow-hidden"
      style={{
        background: '#d4af37',
        padding: '20px 0',
      }}
    >
      {/* Left fade overlay */}
      <div
        className="absolute left-0 top-0 h-full z-20 pointer-events-none"
        style={{
          width: '60px',
          background: 'linear-gradient(90deg, #d4af37 0%, transparent 100%)',
        }}
      />

      {/* Marquee container */}
      <div
        className="marquee-track flex"
        style={{
          width: '200%',
        }}
      >
        {/* First run of services */}
        <div className="flex items-center" style={{ width: '50%' }}>
          {services.map((service, index) => (
            <div key={`first-${index}`} className="marquee-item">
              {service}
              {index < services.length - 1 && <div className="divider" />}
            </div>
          ))}
        </div>

        {/* Duplicate for seamless loop */}
        <div className="flex items-center" style={{ width: '50%' }}>
          {services.map((service, index) => (
            <div key={`second-${index}`} className="marquee-item">
              {service}
              {index < services.length - 1 && <div className="divider" />}
            </div>
          ))}
        </div>
      </div>

      {/* Right fade overlay */}
      <div
        className="absolute right-0 top-0 h-full z-20 pointer-events-none"
        style={{
          width: '60px',
          background: 'linear-gradient(270deg, #d4af37 0%, transparent 100%)',
        }}
      />
    </section>
  );
};

export default ServicesMarquee;
