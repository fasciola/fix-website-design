import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  Menu, X, ArrowRight, ExternalLink, Mail, Phone, MapPin, 
  Instagram, Linkedin, Twitter, Sparkles, Quote, ChevronDown,
  Layout, Shield, Zap, Gem, Car, Home, Palette, Microscope
} from 'lucide-react';

// --- Types & Constants ---

interface Project {
  title: string;
  tagline: string;
  url: string;
  image: string;
  category: string;
}

const projects: Project[] = [
    {
        title: "AURUM BLISS",
        tagline: "Cosmetic Sourcing & Mastery",
        category: "Luxury Beauty",
        url: "https://four-pillars-cosmetics.netlify.app/",
        image: "/project-four-pillars.jpg"
    },
    {
        title: "LUMIÈRE NOIRE",
        tagline: "Scented Rituals & Elegance",
        category: "Retail / Lifestyle",
        url: "https://boisterous-sable-18bb0c.netlify.app/",
        image: "/project-olivara.jpg"
    },
    {
        title: "NOIR ATLAS",
        tagline: "Cinematic Digital Depth",
        category: "Brand Concept",
        url: "https://moonlit-maamoul-cfcdd5.netlify.app/",
        image: "/project-noir-atlas.jpg"
    },
    {
        title: "AURUM AUTOMOTIVE",
        tagline: "Premier Showroom Experience",
        category: "Automotive",
        url: "https://car-care-hub.netlify.app/",
        image: "/project-carcare.jpg"
    },
    {
        title: "THE VERTICAL",
        tagline: "Premium Elevator Systems",
        category: "Industrial / Luxury",
        url: "https://wonderful-nasturtium-105135.netlify.app/",
        image: "/project-elevators.jpg"
    },
    {
        title: "ELITE ESTATES",
        tagline: "High-End Dubai Penthouses",
        category: "Real Estate",
        url: "https://deft-sundae-510258.netlify.app/",
        image: "/project-elite-estates.jpg"
    },
    {
        title: "AURUM GEMS",
        tagline: "Timeless Fine Jewelry",
        category: "Retail / Luxury",
        url: "https://papaya-vacherin-fee6b2.netlify.app/",
        image: "/project-eclat.jpg"
    },
    {
        title: "AURUM ENERGY",
        tagline: "Intelligent Power Analytics",
        category: "Tech / Infrastructure",
        url: "https://admirable-custard-0ec2e2.netlify.app/",
        image: "/project-energylink.jpg"
    }
];

const services = [
  { icon: Palette, title: "Cinematic Web Design", description: "Bespoke digital architecture crafted with the precision of a high-end luxury brand." },
  { icon: Layout, title: "Experience Strategy", description: "Mapping every click to a conversion using behavioral data and psychological triggers." },
  { icon: Zap, title: "Next-Gen Performance", description: "Blazing-fast loading speeds optimized for Dubai's ultra-competitive digital landscape." },
  { icon: Shield, title: "Brand Guardianship", description: "Ensuring your digital presence maintains the prestige and exclusivity of your physical assets." },
  { icon: Gem, title: "E-Commerce Luxury", description: "Seamless shopping experiences for high-value items, from fine jewelry to exotic cars." },
  { icon: Microscope, title: "Conversion Optimization", description: "Rigorous A/B testing and analysis to squeeze maximum ROI from every visitor." }
];

const testimonials = [
  { quote: "Fix Website Design transformed our showroom presence. The site feels as premium as the Ferraris we sell.", name: "Ahmed Al-Maktoum", role: "Director, Aurum Automotive" },
  { quote: "Finally, a studio in Dubai that understands the nuance of luxury. Our conversions rose by 40% in two months.", name: "Sarah Jenkins", role: "Founder, Aurum Bliss" },
  { quote: "The cinematic approach they take is unmatched. Our penthouse portfolio has never looked more desirable.", name: "Marcus Vane", role: "CEO, Elite Estates" }
];

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${scrolled ? 'glass py-4 shadow-2xl' : 'bg-transparent py-8 md:py-12'}`}>
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center text-luxury-beige">
        <a href="#home" className="group flex flex-col">
          <span className="text-lg md:text-xl font-serif italic text-luxury-gold uppercase tracking-[0.2em] leading-none">Fix Website Design</span>
          <span className="text-[10px] uppercase tracking-[0.3em] font-light opacity-50 ml-1">Boutique Studio</span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-12">
          {['Expertise', 'Gallery', 'Atelier', 'Contact'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`} 
              className="text-[10px] uppercase tracking-[0.3em] font-medium opacity-60 hover:opacity-100 hover:text-luxury-gold transition-all duration-300"
            >
              {item}
            </a>
          ))}
          <a 
            href="#contact" 
            className="px-6 py-2 border border-luxury-gold/30 rounded-full text-[10px] uppercase tracking-[0.2em] hover:bg-luxury-gold hover:text-luxury-black transition-all duration-500"
          >
            Get a Quote
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            exit={{ opacity: 0, scaleY: 0 }}
            className="md:hidden glass origin-top overflow-hidden"
          >
            <div className="flex flex-col space-y-8 px-10 py-16 text-luxury-beige">
              {['Expertise', 'Gallery', 'Atelier', 'Contact'].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setIsOpen(false)} className="text-2xl font-serif italic hover:text-luxury-gold transition-colors">{item}</a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default function App() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  return (
    <div className="bg-luxury-black text-luxury-beige min-h-screen">
      <div className="noise-overlay fixed inset-0 pointer-events-none z-50 opacity-[0.03]" />
      
      {/* Floating Action Button */}
      <div className="fixed bottom-10 right-10 z-[100] hidden md:block">
        <motion.a 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          href="#contact"
          className="w-16 h-16 bg-luxury-gold rounded-full flex items-center justify-center text-luxury-black shadow-2xl"
        >
          <Mail size={24} />
        </motion.a>
      </div>

      <Navbar />

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center overflow-hidden border-b border-luxury-gold/10 pt-28 md:pt-36">
  <motion.div style={{ opacity, scale }} className="absolute inset-0 z-0">
    <img 
      src="/hero-bg.jpg" 
      className="w-full h-full object-cover opacity-40 grayscale contrast-125" 
      alt="Cinematic Backdrop"
    />
    <div className="absolute inset-0 cinematic-bg blend-overlay" />
    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-luxury-black to-transparent" />
  </motion.div>

  <div className="container mx-auto px-6 md:px-12 relative z-20">
    <div className="max-w-5xl space-y-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="text-luxury-gold font-mono text-[10px] uppercase tracking-[0.5em] mb-6 block">
          Dubai / Premium Digital Concierge
        </span>

        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[9rem] font-serif leading-[0.9] tracking-tight text-white uppercase max-w-[12ch]">
          We Fix <br />
          <span className="italic relative inline-block">
            Digital Artifacts.
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1, duration: 1.5 }}
              className="absolute -bottom-2 left-0 w-full h-[1px] bg-luxury-gold/40 origin-left"
            />
          </span>
        </h1>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="flex flex-col md:flex-row gap-8 items-start"
      >
        <p className="max-w-md text-base md:text-lg text-luxury-beige/60 font-light leading-relaxed">
          Ordinary websites won't suffice for extraordinary brands. We craft high-converting, cinematic digital experiences tailored for Dubai’s elite market.
        </p>

        <div className="flex gap-6">
          <a href="#gallery" className="group flex items-center gap-4 text-[11px] uppercase tracking-[0.3em] font-bold text-luxury-gold">
            <span>View Our Work</span>
            <div className="w-8 h-[1px] bg-luxury-gold group-hover:w-16 transition-all duration-500" />
          </a>
        </div>
      </motion.div>
    </div>
  </div>

  <motion.div 
    animate={{ y: [0, 10, 0] }}
    transition={{ repeat: Infinity, duration: 2 }}
    className="absolute bottom-10 left-1/2 -translate-x-1/2 text-luxury-gold opacity-30"
  >
    <ChevronDown size={24} />
  </motion.div>
</section>

      {/* Expertise Section */}
      <section id="expertise" className="py-24 md:py-48 bg-luxury-dark border-b border-luxury-gold/10">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-3 gap-24">
            <div className="lg:col-span-1 space-y-10">
              <span className="text-luxury-gold font-mono text-[10px] uppercase tracking-[0.4em]">Expertise</span>
              <h2 className="text-5xl md:text-7xl font-serif text-white leading-none">Solving <br /><span className="italic">Complexity</span> With Style.</h2>
              <p className="text-luxury-beige/50 font-light leading-relaxed">
                From luxury automotive showfloors to private energy analytics platforms, we build tools that empower and impress.
              </p>
            </div>
            
            <div className="lg:col-span-2 grid md:grid-cols-2 gap-x-16 gap-y-20">
              {services.map((s, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="space-y-6 group"
                >
                  <s.icon size={32} className="text-luxury-gold opacity-50 group-hover:opacity-100 transition-opacity" />
                  <h3 className="text-xl font-serif text-white">{s.title}</h3>
                  <p className="text-sm text-luxury-beige/40 leading-relaxed font-light">{s.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-24 md:py-48 bg-luxury-black">
        <div className="container mx-auto px-6 md:px-12 flex flex-col items-center">
          <div className="text-center mb-32 space-y-6">
            <span className="text-luxury-gold font-mono text-[10px] uppercase tracking-[0.5em] block">The Gallery</span>
            <h2 className="text-6xl md:text-9xl font-serif text-white">Digital <span className="italic">Sculptures.</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            {projects.map((p, i) => (
              <motion.a
                key={i}
                href={p.url}
                target="_blank"
                rel="noopener"
                whileHover={{ y: -10 }}
                className="group relative h-[600px] bg-luxury-dark overflow-hidden border border-luxury-gold/10"
              >
                <img 
                  src={p.image} 
                  alt={p.title} 
                  className="w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-x-0 bottom-0 p-10 bg-gradient-to-t from-luxury-black via-luxury-black/60 to-transparent z-10 translate-y-10 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="text-luxury-gold text-[10px] uppercase tracking-[0.3em] font-bold block mb-2">{p.category}</span>
                  <h4 className="text-2xl font-serif text-white mb-4">{p.title}</h4>
                  <p className="text-xs text-luxury-beige/40 font-light mb-8 opacity-0 group-hover:opacity-100 transition-opacity duration-700">{p.tagline}</p>
                  <div className="flex items-center gap-3 text-white text-[9px] uppercase tracking-widest font-bold">
                    <span>Explore Case</span>
                    <ExternalLink size={12} />
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Atelier Section */}
      <section id="atelier" className="py-24 md:py-48 bg-luxury-dark relative overflow-hidden">
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[4/5] overflow-hidden border border-luxury-gold/30 p-4 bg-luxury-black rotate-2 shadow-2xl">
                <img 
                  src="about-office.jpg" 
                  alt="Creative Studio" 
                  className="w-full h-full object-cover grayscale brightness-75"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 glass p-8 border border-luxury-gold/20 hidden xl:block">
                <Quote className="text-luxury-gold/20 mb-4" size={32} />
                <p className="text-sm italic text-luxury-beige/70 max-w-[200px]">"We don't build websites. We build the future of luxury commerce."</p>
                <span className="block mt-4 text-[9px] uppercase tracking-widest text-luxury-gold">— Foundational Vision</span>
              </div>
            </motion.div>

            <div className="space-y-12">
              <span className="text-luxury-gold font-mono text-[10px] uppercase tracking-[0.4em]">The Atelier</span>
              <h2 className="text-5xl md:text-7xl font-serif text-white">Precision. <br /><span className="italic">Exclusivity.</span> Mastery.</h2>
              <p className="text-xl font-serif italic text-luxury-beige/80 leading-relaxed">
                Fix Website Design is a boutique agency in Dubai focusing on high-end results for high-end clients. We operate at the intersection of cinematic art and technical engineering.
              </p>
              <div className="grid grid-cols-2 gap-12 pt-12 border-t border-white/5">
                <div>
                  <h5 className="text-3xl font-serif text-white">08/10</h5>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-luxury-gold mt-4">Top luxury brands in UAE</p>
                </div>
                <div>
                  <h5 className="text-3xl font-serif text-white">4.9s → 0.8s</h5>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-luxury-gold mt-4">Average load speed optimization</p>
                </div>
              </div>
              <button className="px-12 py-5 bg-luxury-beige text-luxury-black font-bold uppercase tracking-[0.3em] text-[10px] hover:bg-luxury-gold transition-colors">
                Our Detailed Story
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 md:py-48 bg-luxury-black">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row gap-20 items-end mb-32">
            <h2 className="text-5xl md:text-8xl font-serif text-white flex-1 leading-none uppercase tracking-tighter">Voices Of <br /><span className="italic text-luxury-gold text-right">Prestige.</span></h2>
            <p className="max-w-xs text-luxury-beige/40 text-sm font-light uppercase tracking-widest leading-loose">The words of our partners matter more than any award we could win.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-16">
            {testimonials.map((t, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0 }} 
                whileInView={{ opacity: 1 }} 
                className="space-y-8"
              >
                <div className="flex gap-1">
                  {[...Array(5)].map((_, j) => <Sparkles key={j} size={12} className="text-luxury-gold" />)}
                </div>
                <p className="text-xl md:text-2xl font-serif italic leading-relaxed text-white">"{t.quote}"</p>
                <div className="space-y-1">
                  <h6 className="text-[11px] uppercase tracking-[0.3em] font-bold text-luxury-gold">{t.name}</h6>
                  <p className="text-[9px] uppercase tracking-[0.2em] opacity-40">{t.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section id="contact" className="py-32 md:py-64 bg-luxury-dark relative flex flex-col items-center justify-center overflow-hidden border-t border-luxury-gold/10">
        <div className="absolute inset-0 z-0">
           <img src="input_file_1.png" className="w-full h-full object-cover grayscale opacity-[0.05] invert" alt="" />
        </div>
        <div className="container mx-auto px-6 relative z-10 text-center space-y-16">
          <h2 className="text-6xl md:text-[12rem] font-serif text-white tracking-tighter leading-[0.8] uppercase italic">
            Fix it <br /><span className="text-luxury-gold not-italic">Forever.</span>
          </h2>
          <div className="flex flex-col items-center gap-10">
            <p className="text-xl md:text-2xl text-luxury-beige/50 font-light max-w-2xl">
              Currently accepting 2 new projects for Q4. Secure your consultation with Dubai’s leading digital artisans.
            </p>
            <button className="px-20 py-8 border-2 border-luxury-gold text-luxury-gold font-bold uppercase tracking-[0.5em] text-[12px] hover:bg-luxury-gold hover:text-luxury-black transition-all duration-700 shadow-[0_0_50px_rgba(197,160,89,0.1)]">
              Schedule A Strategy Call
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 md:py-32 bg-luxury-black border-t border-white/5">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-4 gap-24 items-start">
            <div className="lg:col-span-1 space-y-10">
              <span className="text-xl font-serif italic text-luxury-gold uppercase tracking-[0.2em] block">Fix Website Design</span>
              <p className="text-[11px] uppercase tracking-[0.3em] leading-loose text-luxury-beige/30">
                Dubai’s Premium Digital Studio. <br />
                Crafting Excellence Since 2018.
              </p>
            </div>
            
            <div className="space-y-8">
              <h5 className="text-[10px] uppercase tracking-[0.4em] font-bold">Menu</h5>
              <div className="flex flex-col gap-4 text-xs font-light tracking-[0.2em] text-white/40">
                {['Gallery', 'Expertise', 'Atelier', 'Inquiry', 'Legal'].map(m => (
                  <a key={m} href="#" className="hover:text-luxury-gold transition-colors">{m}</a>
                ))}
              </div>
            </div>

            <div className="space-y-8">
              <h5 className="text-[10px] uppercase tracking-[0.4em] font-bold">Studio</h5>
              <div className="flex flex-col gap-6 text-xs text-white/40 leading-relaxed tracking-[0.1em]">
                <div className="flex items-start gap-4">
                  <MapPin size={16} className="text-luxury-gold shrink-0" />
                  <span>DIFC, Level 15, <br />The Gate Building, Dubai, UAE</span>
                </div>
                <div className="flex items-center gap-4">
                  <Phone size={16} className="text-luxury-gold shrink-0" />
                  <span>+971 4 582 9900</span>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <h5 className="text-[10px] uppercase tracking-[0.4em] font-bold">Social</h5>
              <div className="flex gap-8 opacity-40">
                <Instagram size={24} className="hover:text-luxury-gold cursor-pointer transition-colors" />
                <Linkedin size={24} className="hover:text-luxury-gold cursor-pointer transition-colors" />
                <Twitter size={24} className="hover:text-luxury-gold cursor-pointer transition-colors" />
              </div>
            </div>
          </div>
          
          <div className="mt-32 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <span className="text-[10px] tracking-[0.5em] text-white/20">© 2026 FIX WEBSITE DESIGN DUBAI</span>
            <div className="flex gap-10 text-[9px] tracking-[0.3em] font-bold opacity-30">
               <span>PRIVACY</span>
               <span>TERMS</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
