"use client";

import React from "react";
import { motion } from "framer-motion";
import { Shield, Cpu, Zap, Activity } from "lucide-react";

interface Feature {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  cta: string;
  iconLabel: string;
}

const features: Feature[] = [
  {
    icon: Shield,
    title: "Ceramic Case",
    description: "Forged from micro-milled obsidian ceramic. Virtually scratch-resistant, designed for high-stress tactical environments.",
    cta: "Explore Materials",
    iconLabel: "Ceramic case icon",
  },
  {
    icon: Cpu,
    title: "Caliber 12 movement",
    description: "Self-winding mechanical engine featuring a dual-barrel mainspring system with 72 hours of uninterrupted reserve.",
    cta: "View Mechanics",
    iconLabel: "Mechanical movement icon",
  },
  {
    icon: Zap,
    title: "Zero-Gravity Balance",
    description: "Tourbillon regulator cage engineered to counteract atmospheric gravity drift in outer space environments.",
    cta: "Study Alignment",
    iconLabel: "Zero-gravity balance icon",
  },
  {
    icon: Activity,
    title: "Telemetry Sensors",
    description: "Analog dial sub-indicators for barometric pressure and zero-g force monitoring, active in real time.",
    cta: "Check Telemetry",
    iconLabel: "Telemetry sensor icon",
  },
];

export default function Features() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section id="features" className="relative bg-brand-dark py-20 lg:py-32 overflow-hidden border-t border-white/5">
      {/* Decorative Background Elements */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-gold/5 blur-[120px] rounded-full pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-brand-gold/5 blur-[120px] rounded-full pointer-events-none" aria-hidden="true" />
      
      <motion.div
        animate={{
          opacity: [0.3, 0.6, 0.3],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-0 right-1/3 w-80 h-80 bg-indigo-500/10 blur-[140px] rounded-full pointer-events-none"
        aria-hidden="true"
      />
      
      <div className="absolute inset-0 pointer-events-none opacity-5" aria-hidden="true">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="features-grid" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M 100 0 L 0 0 0 100" fill="none" stroke="currentColor" strokeWidth="1" className="text-brand-gold" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#features-grid)" />
        </svg>
      </div>
      
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-black/20 pointer-events-none" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 lg:mb-24">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-xs uppercase tracking-[0.3em] text-brand-gold mb-3 font-semibold font-sans"
          >
            Engineering Features
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-extrabold tracking-wider uppercase mb-4 sm:mb-6 font-sans gold-gradient-text"
          >
            Engineering Features
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xs sm:text-sm lg:text-base text-white/50 font-sans font-light leading-relaxed max-w-xl"
          >
            Advanced mechanical engineering meets aerospace-grade materials in every caliber.
          </motion.p>
        </div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
          role="region"
          aria-label="Watch engineering features"
        >
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.article
                key={idx}
                variants={cardVariants}
                whileHover={{
                  y: -8,
                  rotateX: 2,
                  rotateY: -2,
                  transition: { duration: 0.3 },
                }}
                className="glass-panel group relative p-6 sm:p-7 lg:p-8 rounded-2xl flex flex-col justify-between h-auto sm:h-80 cursor-pointer overflow-hidden transition-all duration-300 hover:border-brand-gold/30 hover:shadow-[0_20px_40px_rgba(212,175,55,0.05)]"
              >
                {/* Hover shine effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/0 via-brand-gold/0 to-brand-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" aria-hidden="true" />

                <div>
                  {/* Icon container */}
                  <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-6 border border-white/10 group-hover:border-brand-gold/30 group-hover:bg-brand-gold/5 transition-all duration-300">
                    <Icon className="w-6 h-6 text-white group-hover:text-brand-gold transition-colors duration-300" aria-label={item.iconLabel} />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg sm:text-xl font-bold uppercase tracking-wider mb-3 font-sans text-white group-hover:text-brand-gold transition-colors duration-300 line-clamp-2">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm leading-relaxed text-white/50 font-light font-sans line-clamp-3">
                    {item.description}
                  </p>
                </div>

                {/* Link */}
                <a href="#" className="text-xs uppercase tracking-[0.2em] font-semibold text-brand-gold mt-6 inline-flex items-center gap-2 group-hover:translate-x-1 transition-transform duration-300 flex-shrink-0" aria-label={`${item.cta} - ${item.title}`}>
                  {item.cta} &rarr;
                </a>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
