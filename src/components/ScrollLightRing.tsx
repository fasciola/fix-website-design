import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

const ScrollLightRing: React.FC = () => {
  const { scrollYProgress } = useScroll();

  const y = useTransform(scrollYProgress, [0, 1], ['8vh', '88vh']);
  const x = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], ['12vw', '18vw', '75vw', '82vw']);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.65, 0.9, 0.75]);
  const opacity = useTransform(scrollYProgress, [0, 0.08, 0.85, 1], [0, 0.7, 0.55, 0.2]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 220]);

  return (
    <motion.div
      style={{ x, y, scale, opacity, rotate }}
      className="fixed top-0 left-0 z-[60] pointer-events-none"
    >
      <div className="relative w-20 h-20 md:w-24 md:h-24">
        {/* outer glow */}
        <div className="absolute inset-0 rounded-full blur-2xl bg-orange-500/20" />

        {/* warm ring */}
        <div className="absolute inset-0 rounded-full border-[3px] border-amber-300/80 shadow-[0_0_30px_rgba(255,180,80,0.45),0_0_60px_rgba(255,120,40,0.22)]" />

        {/* inner cool ring */}
        <div className="absolute inset-[10px] rounded-full border border-violet-200/70 shadow-[0_0_20px_rgba(170,150,255,0.35)]" />

        {/* small orbit dots */}
        <div className="absolute left-1/2 top-0 w-2 h-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-400 shadow-[0_0_12px_rgba(255,120,40,0.8)]" />
        <div className="absolute right-2 top-1/2 w-1.5 h-1.5 -translate-y-1/2 rounded-full bg-amber-200 shadow-[0_0_10px_rgba(255,220,160,0.8)]" />
        <div className="absolute left-2 bottom-3 w-1.5 h-1.5 rounded-full bg-red-400 shadow-[0_0_10px_rgba(255,100,60,0.8)]" />

        {/* center glow */}
        <div className="absolute inset-[28%] rounded-full bg-yellow-300/85 blur-[6px] shadow-[0_0_24px_rgba(255,210,90,0.75)]" />
      </div>
    </motion.div>
  );
};

export default ScrollLightRing;
