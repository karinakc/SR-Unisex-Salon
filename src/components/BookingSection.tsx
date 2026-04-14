import { useState } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Clock3, Facebook, Instagram, MapPin, MessageCircle, Phone } from 'lucide-react';

const serviceOptions = [
  'Hair Styling & Coloring',
  'Bridal Makeup',
  'Skincare & Facials',
  'Nail Art & Extensions',
  'Threading & Waxing',
  'Hair Spa & Treatment',
  'Mehendi / Henna',
  "Men's Grooming",
];

const socialLinks = [
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

const BookingSection = () => {
  const { ref: headingRef, isVisible: headingVisible } = useScrollAnimation();
  const { ref: formRef, isVisible: formVisible } = useScrollAnimation(0.2);
  const { ref: infoRef, isVisible: infoVisible } = useScrollAnimation(0.2);
  const [formData, setFormData] = useState({
    name: '', phone: '', email: '', service: '', date: '', message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you! We will contact you shortly to confirm your appointment.');
    setFormData({ name: '', phone: '', email: '', service: '', date: '', message: '' });
  };

  return (
    <section id="book-now" className="relative py-24 md:py-32 overflow-hidden bg-[linear-gradient(180deg,#fbf8f1_0%,#f3ead9_42%,#f8f3e8_100%)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_18%,rgba(205,169,97,0.17),transparent_30%),radial-gradient(circle_at_84%_12%,rgba(167,118,58,0.1),transparent_30%)]" />

      <div className="container relative z-10 mx-auto px-4 md:px-8">
        <div ref={headingRef} className={`text-center mb-16 transition-all duration-700 ${headingVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="font-body text-xs md:text-sm tracking-[0.24em] uppercase text-primary mb-3">Reserve Your Slot</p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-4">Book Your Appointment</h2>
          <p className="font-body text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Share your preferred service and schedule. We will confirm your appointment shortly with personalized assistance.
          </p>
          <div className={`h-px bg-primary mx-auto transition-all duration-1000 mt-6 ${headingVisible ? 'w-24' : 'w-0'}`} style={{ transitionDelay: '300ms' }} />
        </div>

        <div className="grid lg:grid-cols-[1.12fr_0.88fr] gap-8 md:gap-10 lg:gap-12 items-stretch">
          {/* Form */}
          <div ref={formRef} className={`h-full rounded-3xl border border-primary/20 bg-white/75 backdrop-blur-md p-5 sm:p-7 md:p-8 shadow-[0_18px_50px_rgba(136,102,44,0.14)] transition-all duration-700 ${formVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <form onSubmit={handleSubmit} className="h-full flex flex-col gap-5">
              <div className={`transition-all duration-700 ${formVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ transitionDelay: '80ms' }}>
                <h3 className="font-display text-3xl text-foreground mb-2">Appointment Details</h3>
                <p className="font-body text-sm text-muted-foreground">Fill in your information and we will reach out to confirm your slot.</p>
              </div>

              <input
                type="text" placeholder="Your Name" required
                value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={`w-full rounded-xl border border-primary/20 bg-white/80 px-4 py-3.5 font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/35 transition-all duration-700 ${formVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                style={{ transitionDelay: '130ms' }}
              />
              <input
                type="tel" placeholder="Phone Number" required
                value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className={`w-full rounded-xl border border-primary/20 bg-white/80 px-4 py-3.5 font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/35 transition-all duration-700 ${formVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                style={{ transitionDelay: '180ms' }}
              />
              <input
                type="email" placeholder="Email Address"
                value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={`w-full rounded-xl border border-primary/20 bg-white/80 px-4 py-3.5 font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/35 transition-all duration-700 ${formVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                style={{ transitionDelay: '230ms' }}
              />
              <select
                value={formData.service} onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                className={`w-full rounded-xl border border-primary/20 bg-white/80 px-4 py-3.5 font-body text-foreground appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/35 transition-all duration-700 ${formVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                style={{ transitionDelay: '280ms' }}
                required
              >
                <option value="">Select Service</option>
                {serviceOptions.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              <input
                type="date"
                value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className={`w-full rounded-xl border border-primary/20 bg-white/80 px-4 py-3.5 font-body text-foreground cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/35 transition-all duration-700 ${formVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                style={{ transitionDelay: '330ms' }}
              />
              <textarea
                placeholder="Any special requests..." rows={4}
                value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className={`w-full rounded-xl border border-primary/20 bg-white/80 px-4 py-3.5 font-body text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/35 transition-all duration-700 ${formVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                style={{ transitionDelay: '380ms' }}
              />
              <button
                type="submit"
                className={`w-full mt-auto py-4 rounded-xl bg-primary text-primary-foreground font-body text-sm tracking-widest uppercase hover:bg-gold-light transition-all duration-700 cursor-pointer ${formVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                style={{ transitionDelay: '430ms' }}
              >
                Book Appointment
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div ref={infoRef} className={`h-full rounded-3xl border border-white/20 bg-[linear-gradient(160deg,#12151c_0%,#191f2b_46%,#131824_100%)] p-6 sm:p-7 md:p-8 text-slate-100 shadow-[0_20px_55px_rgba(11,13,18,0.35)] transition-all duration-700 ${infoVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '140ms' }}>
            <h3 className="font-display text-3xl text-white mb-6">Visit & Connect</h3>

            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-1" />
                <p className="font-body text-slate-300 leading-relaxed">
                  SR Unisex Beauty Salon and Make-up Studio<br />
                  Near NMB Bank, Bhaktapur 44800
                </p>
              </div>

              <div className="flex items-start gap-3">
                <Clock3 className="h-5 w-5 text-primary mt-1" />
                <div className="font-body text-slate-300 space-y-1">
                  <p>Sunday - Saturday: 9:00 AM - 7:00 PM</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-primary mt-1" />
                <p className="font-body text-slate-300">+977 986-2937648</p>
              </div>
            </div>

            <div className="flex gap-3 mt-8 flex-wrap">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2.5 rounded-lg border border-white/20 text-slate-200 font-body text-xs tracking-widest uppercase hover:border-primary hover:text-primary transition-all duration-300"
                >
                  <span className="inline-flex items-center gap-2">
                    <Icon className="h-3.5 w-3.5" />
                    {social.name}
                  </span>
                </a>
              );})}
            </div>

            <div className="mt-8 rounded-2xl border border-white/20 overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.8215819265703!2d85.4246603!3d27.6654702!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb1b50bfb5e69d%3A0xf5e2747dc83352fc!2sSR%20Unisex%20Beauty%20Salon%20and%20Make-up%20Studio!5e0!3m2!1sen!2snp!4v1712973600000"
                width="100%"
                height="240"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="SR Unisex Beauty Salon and Make-up Studio Location"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingSection;
