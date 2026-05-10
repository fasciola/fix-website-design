import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import {
  Menu,
  X,
  Mail,
  Phone,
  MapPin,
  Instagram,
  Linkedin,
  Twitter,
  Sparkles,
  Quote,
  ChevronDown,
  Layout,
  Shield,
  Zap,
  Gem,
  Palette,
  Microscope
} from 'lucide-react';
import Portfolio3D from './components/Portfolio3D';
import LightPillar from './components/LightPillar';
import Hyperspeed from './components/Hyperspeed';

const WHATSAPP_BASE = 'https://wa.me/971567074922';

const services = [
  {
    icon: Palette,
    title: 'Cinematic Web Design',
    description:
      'Bespoke digital architecture crafted with the precision of a high-end luxury brand.'
  },
  {
    icon: Layout,
    title: 'Experience Strategy',
    description:
      'Mapping every click to a conversion using behavioral data and psychological triggers.'
  },
  {
    icon: Zap,
    title: 'Next-Gen Performance',
    description:
      "Blazing-fast loading speeds optimized for Dubai's ultra-competitive digital landscape."
  },
  {
    icon: Shield,
    title: 'Brand Guardianship',
    description:
      'Ensuring your digital presence maintains the prestige and exclusivity of your physical assets.'
  },
  {
    icon: Gem,
    title: 'E-Commerce Luxury',
    description:
      'Seamless shopping experiences for high-value items, from fine jewelry to exotic cars.'
  },
  {
    icon: Microscope,
    title: 'Conversion Optimization',
    description:
      'Rigorous A/B testing and analysis to squeeze maximum ROI from every visitor.'
  }
];

const testimonials = [
  
  
];
const ScrollLightRing = () => {
  const { scrollYProgress } = useScroll();

  const baseY = useTransform(scrollYProgress, [0, 1], ['12vh', '82vh']);
  const baseX = useTransform(
    scrollYProgress,
    [0, 0.2, 0.45, 0.7, 1],
    ['76vw', '82vw', '79vw', '85vw', '81vw']
  );

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.72, 0.9, 0.78]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 180]);

  return (
    <motion.div
      style={{ x: baseX, y: baseY, scale, rotate }}
      className="fixed top-0 left-0 z-[60] pointer-events-none"
    >
      <motion.div
        animate={{
          x: [0, 10, -8, 12, -6, 0],
          y: [0, -8, 6, -10, 4, 0],
          rotate: [0, 8, -6, 10, -4, 0]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className="relative"
      >
        <div className="relative w-12 h-12 md:w-14 md:h-14 opacity-70">
          <div className="absolute inset-0 rounded-full blur-2xl bg-orange-400/20" />
          <div className="absolute inset-0 rounded-full border-[2px] border-amber-200/75 shadow-[0_0_18px_rgba(255,190,100,0.35),0_0_36px_rgba(255,120,40,0.15)]" />
          <div className="absolute inset-[7px] rounded-full border border-violet-200/50 shadow-[0_0_12px_rgba(170,150,255,0.18)]" />

          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0"
          >
            <div className="absolute left-1/2 top-0 w-1.5 h-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-300 shadow-[0_0_8px_rgba(255,140,60,0.7)]" />
            <div className="absolute right-1 top-1/2 w-1 h-1 -translate-y-1/2 rounded-full bg-amber-100 shadow-[0_0_6px_rgba(255,220,160,0.6)]" />
            <div className="absolute left-1 bottom-2 w-1 h-1 rounded-full bg-red-300 shadow-[0_0_6px_rgba(255,110,70,0.6)]" />
          </motion.div>

          <div className="absolute inset-[31%] rounded-full bg-yellow-200/70 blur-[4px] shadow-[0_0_14px_rgba(255,210,90,0.45)]" />
        </div>
      </motion.div>
    </motion.div>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${
        scrolled ? 'glass py-4 shadow-2xl' : 'bg-transparent py-8 md:py-12'
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center text-luxury-beige">
        <a href="#home" className="group flex flex-col">
          <span className="text-lg md:text-xl font-serif italic text-luxury-gold uppercase tracking-[0.2em] leading-none">
            Fix Website Design
          </span>
          <span className="text-[10px] uppercase tracking-[0.3em] font-light opacity-50 ml-1">
            Boutique Studio
          </span>
        </a>

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
            href={`${WHATSAPP_BASE}?text=${encodeURIComponent(
              'Hi, I want a quote for my website project.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 border border-luxury-gold/30 rounded-full text-[10px] uppercase tracking-[0.2em] hover:bg-luxury-gold hover:text-luxury-black transition-all duration-500"
          >
            Get a Quote
          </a>
        </div>

        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
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
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setIsOpen(false)}
                  className="text-2xl font-serif italic hover:text-luxury-gold transition-colors"
                >
                  {item}
                </a>
              ))}
              <a
                href={`${WHATSAPP_BASE}?text=${encodeURIComponent(
                  'Hi, I want a quote for my website project.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="text-2xl font-serif italic text-luxury-gold transition-colors"
              >
                Get a Quote
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default function App() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  const hyperspeedOptions = useMemo(
    () => ({
      distortion: 'turbulentDistortion',
      length: 400,
      roadWidth: 9,
      islandWidth: 2,
      lanesPerRoad: 3,
      fov: 82,
      fovSpeedUp: 120,
      speedUp: 1.2,
      carLightsFade: 0.5,
      totalSideLightSticks: 14,
      lightPairsPerRoadWay: 28,
      shoulderLinesWidthPercentage: 0.04,
      brokenLinesWidthPercentage: 0.08,
      brokenLinesLengthPercentage: 0.45,
      lightStickWidth: [0.08, 0.22] as [number, number],
      lightStickHeight: [0.8, 1.2] as [number, number],
      movingAwaySpeed: [42, 58] as [number, number],
      movingCloserSpeed: [-90, -120] as [number, number],
      carLightsLength: [18, 56] as [number, number],
      carLightsRadius: [0.04, 0.1] as [number, number],
      carWidthPercentage: [0.28, 0.42] as [number, number],
      carShiftX: [-0.5, 0.5] as [number, number],
      carFloorSeparation: [0, 3] as [number, number],
      colors: {
        roadColor: 0x050505,
        islandColor: 0x090909,
        background: 0x000000,
        shoulderLines: 0x121218,
        brokenLines: 0x121218,
        leftCars: [0xd6a14f, 0xc68cff, 0xb95cff],
        rightCars: [0x03b3c3, 0x0d7cb8, 0x6fd6ff],
        sticks: 0x03b3c3
      }
    }),
    []
  );

  return (
    <div className="bg-luxury-black text-luxury-beige min-h-screen">
      <div className="noise-overlay fixed inset-0 pointer-events-none z-50 opacity-[0.03]" />

      <ScrollLightRing />

      <a
        href={`${WHATSAPP_BASE}?text=${encodeURIComponent(
          'Hi, I would like to discuss a website project.'
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-28 right-10 z-[95] w-14 h-14 bg-[#25D366] hover:bg-[#20ba5a] rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 group"
        aria-label="Chat on WhatsApp"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          fill="white"
          viewBox="0 0 24 24"
          className="group-hover:rotate-12 transition-transform duration-300"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.198.297-.767.966-.94 1.164-.173.198-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.485-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
          <path d="M12 21.75c-5.385 0-9.75-4.365-9.75-9.75S6.615 2.25 12 2.25 21.75 6.615 21.75 12 17.385 21.75 12 21.75zm0-18c-4.687 0-8.5 3.813-8.5 8.5 0 4.687 3.813 8.5 8.5 8.5 4.687 0 8.5-3.813 8.5-8.5 0-4.687-3.813-8.5-8.5-8.5z" />
        </svg>
      </a>

      <div className="fixed bottom-10 right-10 z-[100] hidden md:block">
        <motion.a
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          href={`${WHATSAPP_BASE}?text=${encodeURIComponent(
            'Hi, I want to start a conversation about my website project.'
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-16 h-16 bg-luxury-gold rounded-full flex items-center justify-center text-luxury-black shadow-2xl"
        >
          <Mail size={24} />
        </motion.a>
      </div>

      <Navbar />

      <section
        id="home"
        className="relative min-h-screen flex items-center overflow-hidden border-b border-luxury-gold/10 pt-20 md:pt-28 lg:pt-36 pb-12 md:pb-0"
      >
        <motion.div style={{ opacity, scale }} className="absolute inset-0 z-0">
          <img
            src="/hero-bg.jpg"
            className="w-full h-full object-cover opacity-35 grayscale contrast-125"
            alt="Cinematic Backdrop"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-luxury-black via-luxury-black/55 to-luxury-black/20" />
          <div className="absolute inset-0 cinematic-bg blend-overlay" />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-luxury-black to-transparent" />
        </motion.div>

        <div className="container mx-auto px-6 md:px-12 relative z-20">
          <div className="max-w-5xl space-y-8 md:space-y-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="text-luxury-gold font-mono text-[10px] uppercase tracking-[0.5em] mb-6 block">
                Dubai / Premium Digital Concierge
              </span>

              <h1 className="text-[2.75rem] sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[7rem] 2xl:text-[9rem] font-serif leading-[0.88] tracking-[-0.04em] text-white uppercase">
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
                Ordinary websites won&apos;t suffice for extraordinary brands. We craft
                high-converting, cinematic digital experiences tailored for Dubai’s elite market.
              </p>
              <div className="flex gap-6">
                <a
                  href={`${WHATSAPP_BASE}?text=${encodeURIComponent(
                    'Hi, I saw your work and I want to discuss my project.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 text-[11px] uppercase tracking-[0.3em] font-bold text-luxury-gold"
                >
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
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-luxury-gold opacity-30 z-20"
        >
          <ChevronDown size={24} />
        </motion.div>
      </section>

      <section
        id="expertise"
        className="relative py-24 md:py-48 bg-[#07030f] border-b border-luxury-gold/10 overflow-hidden"
      >
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute inset-[-8%] opacity-[0.9]">
            <LightPillar
              topColor="#f3c98b"
              bottomColor="#6d2dff"
              intensity={0.95}
              rotationSpeed={0.68}
              glowAmount={0.008}
              pillarWidth={1.32}
              pillarHeight={0.46}
              noiseIntensity={0.08}
              pillarRotation={50}
              interactive={false}
              mixBlendMode="screen"
              quality="medium"
            />
          </div>

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_42%,rgba(95,45,255,0.32),transparent_28%),radial-gradient(circle_at_58%_55%,rgba(196,110,255,0.16),transparent_22%),radial-gradient(circle_at_25%_78%,rgba(243,201,139,0.08),transparent_18%)]" />

          <div className="absolute inset-0">
            <div className="absolute inset-0 backdrop-blur-[70px] bg-white/[0.035]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(255,255,255,0.10),transparent_20%),radial-gradient(circle_at_75%_60%,rgba(255,255,255,0.07),transparent_26%),radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.04),transparent_35%)]" />
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.07] via-transparent to-transparent" />
          </div>

          <div className="absolute inset-0 bg-gradient-to-r from-[#05030a]/78 via-transparent to-[#05030a]/45" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#040208]/72 via-transparent to-[#040208]/60" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_52%_54%,rgba(255,255,255,0.08),transparent_14%)]" />
        </div>

        <div className="container mx-auto px-6 md:px-12 relative z-20">
          <div className="grid lg:grid-cols-3 gap-16 xl:gap-24 items-start">
            <div className="lg:col-span-1 space-y-10">
              <span className="text-luxury-gold font-mono text-[10px] uppercase tracking-[0.4em]">
                Expertise
              </span>

              <h2 className="text-5xl md:text-7xl font-serif text-white leading-none">
                Solving <br />
                <span className="italic">Complexity</span> With Style.
              </h2>

              <p className="text-white/58 font-light leading-relaxed max-w-[420px]">
                From luxury automotive showfloors to private energy analytics platforms, we build
                tools that empower and impress.
              </p>
            </div>

            <div className="lg:col-span-2 grid md:grid-cols-2 gap-x-10 gap-y-10 xl:gap-x-14 xl:gap-y-14">
              {services.map((service, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.7 }}
                  className="group relative overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-2xl p-6 md:p-7 shadow-[0_8px_32px_rgba(0,0,0,0.20)] hover:bg-white/[0.06] hover:border-white/[0.14] hover:shadow-[0_0_45px_rgba(124,92,255,0.18)] transition-all duration-500"
                >
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.10] via-transparent to-transparent opacity-80" />
                  <div className="pointer-events-none absolute -inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-70" />
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(255,255,255,0.12),transparent_22%),radial-gradient(circle_at_80%_100%,rgba(109,45,255,0.10),transparent_28%)]" />

                  <div className="relative z-10 space-y-6">
                    <service.icon
                      size={30}
                      className="text-luxury-gold opacity-70 group-hover:opacity-100 transition-opacity"
                    />

                    <h3 className="text-xl font-serif text-white">{service.title}</h3>

                    <p className="text-sm text-white/50 leading-relaxed font-light">
                      {service.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Portfolio3D />

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
                  src="/about-office.jpg"
                  alt="Creative Studio"
                  className="w-full h-full object-cover grayscale brightness-75"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 glass p-8 border border-luxury-gold/20 hidden xl:block">
                <Quote className="text-luxury-gold/20 mb-4" size={32} />
                <p className="text-sm italic text-luxury-beige/70 max-w-[200px]">
                  &quot;We don&apos;t build websites. We build the future of luxury commerce.&quot;
                </p>
                <span className="block mt-4 text-[9px] uppercase tracking-widest text-luxury-gold">
                  — Foundational Vision
                </span>
              </div>
            </motion.div>

            <div className="space-y-12">
              <span className="text-luxury-gold font-mono text-[10px] uppercase tracking-[0.4em]">
                The Atelier
              </span>
              <h2 className="text-5xl md:text-7xl font-serif text-white">
                Precision. <br />
                <span className="italic">Exclusivity.</span> Mastery.
              </h2>
              <p className="text-xl font-serif italic text-luxury-beige/80 leading-relaxed">
                Fix Website Design is a boutique agency in Dubai focusing on high-end results for
                high-end clients. We operate at the intersection of cinematic art and technical
                engineering.
              </p>
              <div className="grid grid-cols-2 gap-12 pt-12 border-t border-white/5">
                <div>
                  <h5 className="text-3xl font-serif text-white">08/10</h5>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-luxury-gold mt-4">
                    Top luxury brands in UAE
                  </p>
                </div>
                <div>
                  <h5 className="text-3xl font-serif text-white">4.9s → 0.8s</h5>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-luxury-gold mt-4">
                    Average load speed optimization
                  </p>
                </div>
              </div>
              <a
                href={`${WHATSAPP_BASE}?text=${encodeURIComponent(
                  'Hi, I want to know more about your studio and services.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-12 py-5 bg-luxury-beige text-luxury-black font-bold uppercase tracking-[0.3em] text-[10px] hover:bg-luxury-gold transition-colors"
              >
                Our Detailed Story
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-48 bg-luxury-black">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row gap-20 items-end mb-32">
            <h2 className="text-5xl md:text-8xl font-serif text-white flex-1 leading-none uppercase tracking-tighter">
              Voices Of <br />
              <span className="italic text-luxury-gold text-right">Prestige.</span>
            </h2>
            <p className="max-w-xs text-luxury-beige/40 text-sm font-light uppercase tracking-widest leading-loose">
              The words of our partners matter more than any award we could win.
            </p>
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
                  {[...Array(5)].map((_, j) => (
                    <Sparkles key={j} size={12} className="text-luxury-gold" />
                  ))}
                </div>
                <p className="text-xl md:text-2xl font-serif italic leading-relaxed text-white">
                  &quot;{t.quote}&quot;
                </p>
                <div className="space-y-1">
                  <h6 className="text-[11px] uppercase tracking-[0.3em] font-bold text-luxury-gold">
                    {t.name}
                  </h6>
                  <p className="text-[9px] uppercase tracking-[0.2em] opacity-40">{t.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="contact"
        className="relative py-32 md:py-64 flex flex-col items-center justify-center overflow-hidden border-t border-luxury-gold/10 bg-black"
      >
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 opacity-[0.95]">
            <Hyperspeed effectOptions={hyperspeedOptions} />
          </div>

          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/75" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(197,160,89,0.10),transparent_20%),radial-gradient(circle_at_50%_70%,rgba(216,86,191,0.10),transparent_25%)]" />
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center space-y-16">
          <h2 className="text-6xl md:text-[12rem] font-serif text-white tracking-tighter leading-[0.8] uppercase italic">
            Fix it <br />
            <span className="text-luxury-gold not-italic">Forever.</span>
          </h2>
          <div className="flex flex-col items-center gap-10">
            <p className="text-xl md:text-2xl text-luxury-beige/60 font-light max-w-2xl">
              Currently accepting 2 new projects for Q4. Secure your consultation with Dubai’s
              leading digital artisans.
            </p>
            <a
              href={`${WHATSAPP_BASE}?text=${encodeURIComponent(
                'Hi, I want to schedule a strategy call.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-20 py-8 border-2 border-luxury-gold text-luxury-gold font-bold uppercase tracking-[0.5em] text-[12px] hover:bg-luxury-gold hover:text-luxury-black transition-all duration-700 shadow-[0_0_50px_rgba(197,160,89,0.12)] backdrop-blur-sm"
            >
              Schedule A Strategy Call
            </a>
          </div>
        </div>
      </section>

      <footer className="py-20 md:py-32 bg-luxury-black border-t border-white/5">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-4 gap-24 items-start">
            <div className="lg:col-span-1 space-y-10">
              <span className="text-xl font-serif italic text-luxury-gold uppercase tracking-[0.2em] block">
                Fix Website Design
              </span>
              <p className="text-[11px] uppercase tracking-[0.3em] leading-loose text-luxury-beige/30">
                Dubai’s Premium Digital Studio. <br />
                Crafting Excellence Since 2018.
              </p>
            </div>

            <div className="space-y-8">
              <h5 className="text-[10px] uppercase tracking-[0.4em] font-bold">Menu</h5>
              <div className="flex flex-col gap-4 text-xs font-light tracking-[0.2em] text-white/40">
                {['Gallery', 'Expertise', 'Atelier', 'Inquiry', 'Legal'].map((m) => (
                  <a key={m} href="#" className="hover:text-luxury-gold transition-colors">
                    {m}
                  </a>
                ))}
              </div>
            </div>

            <div className="space-y-8">
              <h5 className="text-[10px] uppercase tracking-[0.4em] font-bold">Studio</h5>
              <div className="flex flex-col gap-6 text-xs text-white/40 leading-relaxed tracking-[0.1em]">
                <div className="flex items-start gap-4">
                  <MapPin size={16} className="text-luxury-gold shrink-0" />
                  <span>
                    Silicon Oasis, <br />
                    Axis 1 Building, Dubai, UAE
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <Phone size={16} className="text-luxury-gold shrink-0" />
                  <span>+971503855279</span>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <h5 className="text-[10px] uppercase tracking-[0.4em] font-bold">Social</h5>
              <div className="flex gap-8 opacity-40">
                <Instagram
                  size={24}
                  className="hover:text-luxury-gold cursor-pointer transition-colors"
                />
                <Linkedin
                  size={24}
                  className="hover:text-luxury-gold cursor-pointer transition-colors"
                />
                <Twitter
                  size={24}
                  className="hover:text-luxury-gold cursor-pointer transition-colors"
                />
              </div>
            </div>
          </div>

          <div className="mt-32 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <span className="text-[10px] tracking-[0.5em] text-white/20">
              © 2026 FIX WEBSITE DESIGN DUBAI
            </span>
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
