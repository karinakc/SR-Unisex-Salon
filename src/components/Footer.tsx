import { Facebook, Instagram, MessageCircle } from 'lucide-react';

const Footer = () => {
  const quickLinks = ['Home', 'Services', 'About', 'Gallery', 'Testimonials'];
  const services = ['Hair Styling', 'Bridal Makeup', 'Skincare', 'Nail Art', 'Hair Spa', "Men's Grooming"];
  const socials = [
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/sr_makeover527/',
      icon: Instagram,
    },
    {
      name: 'Facebook',
      href: 'https://www.facebook.com/p/SR-Unisex-Beauty-Salon-Makeup-Studio-61556292031197/',
      icon: Facebook,
    },
    {
      name: 'WhatsApp',
      href: 'https://wa.me/9779862937648',
      icon: MessageCircle,
    },
  ];

  const scrollTo = (id: string) => {
    const el = document.getElementById(id.toLowerCase().replace(' ', '-'));
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative overflow-hidden border-t border-primary/25 bg-[linear-gradient(160deg,#141317_0%,#1b1820_45%,#15131a_100%)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_16%,rgba(190,148,74,0.2),transparent_32%),radial-gradient(circle_at_88%_18%,rgba(130,96,45,0.16),transparent_30%)]" />
      <div className="container relative z-10 mx-auto px-4 md:px-8 py-12 md:py-14">
        {/* Logo & Tagline */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-full border border-primary/35 bg-white/5 flex items-center justify-center mx-auto mb-3 shadow-[0_10px_25px_rgba(190,148,74,0.22)]">
            <img src="/logosr.png" alt="SR Beauty Studio" className="h-12 w-12 rounded-full object-cover" />
          </div>
          <p className="font-display text-lg italic text-slate-300">Where Beauty Meets Elegance</p>
        </div>

        <div className="h-px w-full bg-primary/25 mb-8" />

        {/* Columns */}
        <div className="grid sm:grid-cols-3 gap-6 mb-8">
          <div>
            <h4 className="font-display text-lg text-white mb-3">Quick Links</h4>
            <div className="space-y-2">
              {quickLinks.map((l) => (
                <button key={l} onClick={() => scrollTo(l)} className="block font-body text-sm text-slate-300 hover:text-primary transition-colors cursor-pointer">
                  {l}
                </button>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-display text-lg text-white mb-3">Services</h4>
            <div className="space-y-2">
              {services.map((s) => (
                <p key={s} className="font-body text-sm text-slate-300">{s}</p>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-display text-lg text-white mb-3">Contact</h4>
            <div className="space-y-2 font-body text-sm text-slate-300">
              <p>Near NMB Bank, Bhaktapur 44800</p>
              <p>+977 986-2937648</p>
              <p>Daily: 9:00 AM - 7:00 PM</p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-primary/25 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="font-body text-xs text-slate-400">
            © {new Date().getFullYear()} SR Unisex Beauty Salon. All rights reserved.
          </p>
          <div className="flex gap-6">
            {socials.map((social) => {
              const Icon = social.icon;
              return (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 font-body text-xs text-slate-300 hover:text-primary transition-colors uppercase tracking-widest"
              >
                <Icon className="h-3.5 w-3.5" />
                {social.name}
              </a>
            );})}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
