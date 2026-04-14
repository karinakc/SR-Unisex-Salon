import { useState, useEffect } from 'react';
import { Phone } from 'lucide-react';

const navLinks = ['Home', 'Services', 'About', 'Gallery', 'Testimonials'];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    const el = document.getElementById(id.toLowerCase().replace(' ', '-'));
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-background/92 backdrop-blur-xl border-b border-border shadow-sm' : 'bg-black/28 backdrop-blur-md'
        }`}
      >
        <div className="relative mx-auto w-full max-w-[1400px] h-16 md:h-20 pl-4 pr-[max(1rem,env(safe-area-inset-right))] md:px-8 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-3 cursor-pointer"
            aria-label="Scroll to top"
          >
            <img
              src="/logosr.png"
              alt="SR Beauty Studio"
              className="h-12 w-12 md:h-16 md:w-16 rounded-full border border-primary/45 gold-border-glow object-cover bg-card shadow-lg"
            />
          </button>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-5 xl:gap-8">
            {navLinks.map((link) => (
              <button
                key={link}
                onClick={() => scrollTo(link)}
                className={`font-body text-xs xl:text-sm tracking-[0.18em] uppercase transition-colors duration-300 cursor-pointer ${
                  scrolled ? 'text-muted-foreground hover:text-primary' : 'text-ivory/95 hover:text-gold-light'
                }`}
              >
                {link}
              </button>
            ))}
            <button
              onClick={() => scrollTo('Book Now')}
              className={`ml-3 xl:ml-4 px-4 xl:px-6 py-2.5 font-body text-xs xl:text-sm tracking-[0.16em] uppercase transition-all duration-300 cursor-pointer ${
                scrolled
                  ? 'border border-primary text-primary hover:bg-primary hover:text-primary-foreground'
                  : 'border border-gold-light/90 text-ivory bg-black/20 hover:bg-gold-light hover:text-[#3d2a14]'
              }`}
            >
              Book Appointment
            </button>
            <button
              onClick={() => {
                window.location.href = 'tel:+9779862937648';
              }}
              aria-label="Call SR Unisex Beauty Salon"
              className="flex items-center gap-2 px-4 py-2.5 font-body text-xs xl:text-sm tracking-[0.16em] uppercase transition-all duration-300 cursor-pointer bg-primary text-primary-foreground hover:bg-gold-light hover:text-[#3d2a14]"
            >
              <Phone className="h-4 w-4" />
              Call Now
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`lg:hidden absolute right-[max(0.75rem,env(safe-area-inset-right))] top-1/2 -translate-y-1/2 flex flex-col gap-1.5 cursor-pointer z-50 p-2 rounded-md transition-colors ${
              mobileOpen ? 'bg-background/85 border border-border' : ''
            }`}
            aria-label="Toggle menu"
          >
            <span className={`w-6 h-0.5 ${mobileOpen || scrolled ? 'bg-primary' : 'bg-ivory'} transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`w-6 h-0.5 ${mobileOpen || scrolled ? 'bg-primary' : 'bg-ivory'} transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
            <span className={`w-6 h-0.5 ${mobileOpen || scrolled ? 'bg-primary' : 'bg-ivory'} transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed left-0 right-0 top-16 bottom-0 z-40 bg-background/95 backdrop-blur-xl flex flex-col items-center justify-start gap-7 pt-10 animate-fade-in-up lg:hidden">
          {navLinks.map((link) => (
            <button
              key={link}
              onClick={() => scrollTo(link)}
              className="font-display text-2xl sm:text-3xl text-foreground hover:text-primary transition-colors cursor-pointer"
            >
              {link}
            </button>
          ))}
        </div>
      )}
    </>
  );
};

export default Navbar;
