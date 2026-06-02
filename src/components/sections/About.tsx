"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface StatItemProps {
  value: number;
  suffix: string;
  label: string;
}

function StatCounter({ value, suffix, label }: StatItemProps) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      if (start === end) return;

      const duration = 1.5; // seconds
      const stepTime = Math.abs(Math.floor((duration * 1000) / end));

      const timer = setInterval(() => {
        start += 1;
        setCount(start);
        if (start === end) {
          clearInterval(timer);
        }
      }, Math.max(stepTime, 16));

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <div ref={ref} className="text-center md:text-left">
      <div className="text-4xl lg:text-5xl font-black text-brand-gold font-mono mb-2">
        {count}
        {suffix}
      </div>
      <p className="text-xs uppercase tracking-widest text-white/40">{label}</p>
    </div>
  );
}

const timeline = [
  { year: "2019", title: "Concept Born", desc: "Astronautical watch designs sketched for micro-gravity testing." },
  { year: "2021", title: "Caliber 12 Calibrated", desc: "Dual-barrel movement approved for zero-g precision chronometry." },
  { year: "2024", title: "Obsidian Case Perfected", desc: "Milled ceramic composite case registers maximum shock absorption ratings." },
  { year: "2026", title: "Onyx Collection Launched", desc: "Limited edition titanium & obsidian calibers released." },
];

export default function About() {
  return (
    <section id="caliber" className="relative bg-brand-dark py-24 lg:py-32 overflow-hidden border-t border-white/5">
      {/* Sophisticated multi-layer background */}
      {/* Primary side glow */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-gold/2.5 blur-[150px] rounded-full pointer-events-none" />
      
      {/* Animated accent glow */}
      <motion.div
        animate={{
          opacity: [0.3, 0.55, 0.3],
          x: [0, 30, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/12 blur-[120px] rounded-full pointer-events-none"
      />
      
      {/* Wavy gradient pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="about-waves" width="120" height="40" patternUnits="userSpaceOnUse">
              <path d="M0,20 Q30,0 60,20 T120,20" fill="none" stroke="currentColor" strokeWidth="2" className="text-brand-gold" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#about-waves)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Split Section Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center mb-24">
          {/* Left Column: Premium Visual Panel with Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative group cursor-pointer"
          >
            {/* Ambient gold glow card wrapper */}
            <div className="absolute inset-0 bg-brand-gold/5 blur-2xl group-hover:bg-brand-gold/10 transition-all duration-500 rounded-3xl" />
            
            <div className="relative glass-panel rounded-3xl p-4 sm:p-6 lg:p-12 overflow-hidden">
              <div className="aspect-[4/5] bg-gradient-to-tr from-zinc-900 to-black rounded-2xl flex flex-col justify-center items-center p-6 sm:p-8 border border-white/5 relative overflow-hidden group">
                {/* Background layout decor */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.08)_0%,rgba(0,0,0,0)_70%)]" />
                <div className="absolute inset-0 border border-white/10 rounded-2xl pointer-events-none group-hover:scale-98 transition-transform duration-500" />
                
                {/* Product Image Container */}
                <div className="relative z-10 w-full h-full flex flex-col justify-center items-center">
                  <motion.div 
                    className="relative w-full h-64 sm:h-80 md:h-96 flex items-center justify-center"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                  >
                    {/* Watch Visual - Premium Product Representation */}
                    <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-full border-4 border-brand-gold/40 flex items-center justify-center relative shadow-2xl bg-gradient-to-br from-white/5 to-transparent">
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-brand-gold/5 to-transparent" />
                      {/* Watch Face */}
                      <div className="text-center">
                        <div className="text-7xl sm:text-8xl font-bold text-brand-gold mb-3" style={{ textShadow: '0 0 30px rgba(212,175,55,0.3)' }}>⌚</div>
                        <p className="text-xs sm:text-sm tracking-widest font-mono text-brand-gold/80">CALIBER 12</p>
                        <p className="text-[10px] text-white/40 mt-2 tracking-widest">MECHANICAL</p>
                      </div>
                    </div>
                  </motion.div>
                </div>

                <div className="relative z-10 text-center mt-6 pt-6 border-t border-white/10">
                  <span className="text-[10px] uppercase tracking-[0.4em] text-brand-gold font-semibold mb-2 block">Mechanical Integrity</span>
                  <h3 className="text-2xl font-bold uppercase tracking-wider text-white mb-2">CALIBER 12</h3>
                  <p className="text-xs sm:text-sm text-white/50 font-light leading-relaxed">
                    Designed to function reliably inside zero-pressure high-orbit spaceflights, absorbing kinetic force impacts through carbon chassis mount buffers.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Narrative Copy */}
          <div className="flex flex-col justify-center">
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-xs uppercase tracking-[0.3em] text-brand-gold mb-3 font-semibold font-sans text-left"
            >
              Our Heritage & Story
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-wider uppercase mb-6 sm:mb-8 font-sans text-left gold-gradient-text"
            >
              ENGINEERED FOR EXTREMES
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-4 sm:space-y-6 text-white/60 font-sans font-light text-left text-sm sm:text-base leading-relaxed"
            >
              <p>
                Onyx was established with a singular mission: to construct mechanical calibers capable of withstanding the gravitational thresholds of modern rocket launch launches and zero-gravity orbits.
              </p>
              <p>
                We collaborate with material scientists, aerospace pilots, and master swiss watchmakers to forge a product line that balances classical watch mechanics with composite molecular science.
              </p>
            </motion.div>

            {/* Achievement Statistics Grid */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-white/5">
              <StatCounter value={46} suffix="+" label="Caliber parts" />
              <StatCounter value={72} suffix="H" label="Power Reserve" />
              <StatCounter value={100} suffix="m" label="Water rating" />
            </div>
          </div>
        </div>

        {/* Timeline Journey Section */}
        <div className="mt-16 sm:mt-24">
          <motion.h3
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center text-xs uppercase tracking-[0.35em] text-white/40 mb-12 sm:mb-16 font-semibold"
          >
            Chronological Journey
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 sm:gap-8 relative">
            {/* Horizontal connection line on desktop */}
            <div className="hidden md:block absolute top-[18px] left-[10%] right-[10%] h-[1px] bg-white/10 z-0 pointer-events-none" />

            {timeline.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: idx * 0.15 }}
                className="relative z-10 flex flex-col items-center md:items-start text-center md:text-left group cursor-pointer"
              >
                {/* Connector Node */}
                <div className="w-9 h-9 rounded-full bg-brand-dark border-2 border-white/10 flex items-center justify-center mb-6 group-hover:border-brand-gold transition-colors duration-300">
                  <div className="w-2.5 h-2.5 rounded-full bg-brand-gold scale-0 group-hover:scale-100 transition-transform duration-300" />
                </div>

                <span className="text-xl font-bold font-mono text-brand-gold mb-2 block">{item.year}</span>
                <h4 className="text-sm font-bold uppercase tracking-wider mb-2 text-white">{item.title}</h4>
                <p className="text-xs text-white/50 font-sans leading-relaxed font-light">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
