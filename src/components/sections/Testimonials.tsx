"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { ArrowLeft, ArrowRight, Quote, Star } from "lucide-react";

const reviews = [
  {
    quote: "The zero-g telemetry dials are highly accurate. It's the only mechanical caliber I trust during high-altitude rocket stage launches. Absolutely flawless performance.",
    name: "Dr. Marcus Thorne",
    role: "Lead Propulsion Engineer",
    company: "SpaceX",
    rating: 5,
    initials: "MT",
  },
  {
    quote: "Onyx Horizon has accompanied me across the Atlantic twice. The scratch-resistant ceramic case is completely impervious to salt corrosion and severe physical impacts.",
    name: "Elena Rostova",
    role: "Yacht Master & Navigator",
    company: "Rostova Sailing",
    rating: 5,
    initials: "ER",
  },
  {
    quote: "A masterpiece of modern micro-engineering. The meteorite dial Nebula variant is the crown jewel of my collection. The LERP rotation feels smooth and alive.",
    name: "Christian Sterling",
    role: "Fine Watch Collector",
    company: "Sterling Horology",
    rating: 5,
    initials: "CS",
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextSlide = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slideVariants: Variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 },
      },
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 100 : -100,
      opacity: 0,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 },
      },
    }),
  };




  return (
    <section id="reviews" className="relative bg-brand-dark py-20 lg:py-32 overflow-hidden border-t border-white/5">
      {/* Sophisticated multi-layer background */}
      {/* Primary side glow */}
      <div className="absolute left-10 top-1/3 w-96 h-96 bg-brand-gold/2 blur-[150px] rounded-full pointer-events-none" />
      
      {/* Animated corner accent */}
      <motion.div
        animate={{
          opacity: [0.2, 0.4, 0.2],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-1/4 right-10 w-80 h-80 bg-amber-500/10 blur-[130px] rounded-full pointer-events-none"
      />
      
      {/* Decorative line pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="testimonials-lines" width="80" height="80" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="80" y2="80" stroke="white" strokeWidth="1" opacity="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#testimonials-lines)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 lg:mb-24 text-left">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-xs uppercase tracking-[0.3em] text-brand-gold mb-3 font-semibold font-sans"
          >
            Testimonials
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-wider uppercase mb-4 sm:mb-6 font-sans gold-gradient-text"
          >
            FIELD VERIFIED
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-sm sm:text-base lg:text-base text-white/50 font-sans font-light leading-relaxed"
          >
            Hear from the specialists, pilots, and collectors who wear Onyx calibers in their active disciplines.
          </motion.p>
        </div>

        {/* Carousel Content */}
        <div className="relative max-w-4xl mx-auto min-h-[320px] sm:min-h-[350px] flex items-center justify-center">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              key={index}
              className="glass-panel w-full p-6 sm:p-8 md:p-12 rounded-3xl relative flex flex-col justify-between"
            >
              {/* Quote Mark Icon background */}
              <Quote className="absolute right-8 top-8 w-24 h-24 text-white/[0.02] pointer-events-none z-0" />

              <div className="relative z-10 text-left">
                {/* Rating stars */}
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: reviews[index].rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-brand-gold text-brand-gold" />
                  ))}
                </div>

                {/* Quote copy */}
                <p className="text-lg sm:text-xl md:text-2xl font-light leading-relaxed italic text-white/95 mb-6 sm:mb-8 font-sans">
                  &quot;{reviews[index].quote}&quot;
                </p>
              </div>

              {/* Author profile row */}
              <div className="relative z-10 flex items-center gap-4 pt-6 border-t border-white/5">
                {/* Avatar Placeholder */}
                <div className="w-12 h-12 rounded-full bg-brand-gold/10 border border-brand-gold/30 flex items-center justify-center text-brand-gold font-mono font-bold text-sm">
                  {reviews[index].initials}
                </div>

                <div className="text-left">
                  <h4 className="text-base font-bold uppercase tracking-wider text-white">
                    {reviews[index].name}
                  </h4>
                  <p className="text-xs text-white/50 tracking-wider font-light mt-0.5">
                    {reviews[index].role} — <span className="text-brand-gold/80 font-semibold">{reviews[index].company}</span>
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Buttons Row */}
        <div className="flex justify-center gap-3 sm:gap-4 mt-6 sm:mt-8">
          <button
            onClick={prevSlide}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/5 hover:bg-white/10 text-white border border-white/10 flex items-center justify-center transition-colors duration-300 hover:border-brand-gold/40"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <button
            onClick={nextSlide}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/5 hover:bg-white/10 text-white border border-white/10 flex items-center justify-center transition-colors duration-300 hover:border-brand-gold/40"
          >
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
