"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Compass, Eye } from "lucide-react";
import OptimizedImage from "@/components/OptimizedImage";

const categories = ["All", "Titanium", "Gold", "Ceramic"];

const editions = [
  {
    id: 1,
    name: "Onyx Stealth",
    category: "Titanium",
    specs: "Grade 5 Titanium / Matte DLC Casing",
    description: "Built for covert tactical operations. Highly lightweight, matte black finish with military caliber balance.",
    gradient: "from-zinc-800 to-black",
    price: "$8,500",
    badge: "Limited (500 units)",
    image: "/Products/images.jpg",
    imageAlt: "Onyx Stealth Titanium Edition Watch",
  },
  {
    id: 2,
    name: "Onyx Aurum",
    category: "Gold",
    specs: "18K Champagne Gold / Skeleton Core",
    description: "The height of luxury horology. Skeletonized movement plate layered in hand-polished champagne gold panels.",
    gradient: "from-amber-950 via-zinc-950 to-black",
    price: "$14,900",
    badge: "Ultra Rare (100 units)",
    image: "/Products/images (1).jpg",
    imageAlt: "Onyx Aurum Gold Edition Watch",
  },
  {
    id: 3,
    name: "Onyx Horizon",
    category: "Ceramic",
    specs: "Micro-blast White Ceramic / Rubber Strap",
    description: "Designed for sport maritime travel. High pressure ocean rating featuring telemetry depth subscales.",
    gradient: "from-slate-900 to-black",
    price: "$9,200",
    badge: "Available",
    image: "/Products/images (2).jpg",
    imageAlt: "Onyx Horizon Ceramic Edition Watch",
  },
  {
    id: 4,
    name: "Onyx Nebula",
    category: "Titanium",
    specs: "Meteorite Dial Plate / Zero-G Cage",
    description: "An astronomical masterstroke. Contains authentic Gibeon meteorite dial inserts and blue titanium alloy hardware.",
    gradient: "from-indigo-950 via-zinc-950 to-black",
    price: "$21,000",
    badge: "Collectors (50 units)",
    image: "/Products/images (3).jpg",
    imageAlt: "Onyx Nebula Meteorite Edition Watch",
  },
];

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredEditions = editions.filter(
    (item) => activeFilter === "All" || item.category === activeFilter
  );

  return (
    <section id="specs" className="relative bg-brand-dark py-20 lg:py-32 overflow-hidden border-t border-white/5">
      {/* Sophisticated multi-layer background */}
      {/* Primary accent glow */}
      <div className="absolute top-10 left-1/3 w-80 h-80 bg-brand-gold/2.5 blur-[120px] rounded-full pointer-events-none" />
      
      {/* Secondary animated glow */}
      <motion.div
        animate={{
          opacity: [0.2, 0.5, 0.2],
          x: [0, 20, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-20 right-1/4 w-96 h-96 bg-brand-gold/15 blur-[100px] rounded-full pointer-events-none"
      />
      
      {/* Decorative gradient mesh */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="portfolio-mesh1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(212,175,55,1)" />
              <stop offset="100%" stopColor="rgba(0,0,0,0)" />
            </linearGradient>
          </defs>
          <circle cx="30%" cy="60%" r="300" fill="url(#portfolio-mesh1)" opacity="0.3" />
          <circle cx="70%" cy="40%" r="250" fill="url(#portfolio-mesh1)" opacity="0.2" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 lg:mb-16 gap-6 sm:gap-8">
          <div className="max-w-2xl text-left">
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-xs uppercase tracking-[0.3em] text-brand-gold mb-3 font-semibold font-sans"
            >
              The Collection
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-wider uppercase mb-4 sm:mb-6 font-sans gold-gradient-text"
            >
              LIMITED EDITIONS
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xs sm:text-sm lg:text-base text-white/50 font-sans font-light leading-relaxed"
            >
              Explore our masterwork editions, configured with custom materials and specialized complication dials.
            </motion.p>
          </div>

          {/* Filter Navigation */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs font-semibold uppercase tracking-widest transition-all duration-300 ${
                  activeFilter === cat
                    ? "bg-brand-gold text-brand-dark shadow-[0_4px_20px_rgba(212,175,55,0.25)]"
                    : "bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/5"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Project/Editions Showcase Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredEditions.map((item) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                key={item.id}
                className="glass-panel group relative rounded-3xl p-6 flex flex-col justify-between overflow-hidden cursor-pointer hover:border-brand-gold/25 transition-all duration-300"
              >
                {/* Immersive backdrop gradient based on watch flavor */}
                <div className={`absolute inset-0 bg-gradient-to-tr ${item.gradient} opacity-20 group-hover:opacity-30 transition-opacity duration-500 z-0`} />

                {/* Card Top Block */}
                <div className="relative z-10 flex justify-between items-start mb-8 sm:mb-12">
                  <div className="flex-1">
                    <span className="text-[10px] uppercase tracking-widest bg-brand-gold/10 border border-brand-gold/20 text-brand-gold px-3 py-1 rounded-full font-semibold inline-block">
                      {item.badge}
                    </span>
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold uppercase tracking-wider text-white mt-3 sm:mt-4 font-sans group-hover:text-brand-gold transition-colors duration-300">
                      {item.name}
                    </h3>
                    <p className="text-[10px] sm:text-xs text-brand-gold/80 font-mono tracking-widest mt-1 uppercase">
                      {item.specs}
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-brand-gold group-hover:border-brand-gold transition-all duration-300 flex-shrink-0 ml-4">
                    <Eye className="w-4 h-4 text-white group-hover:text-brand-dark transition-colors duration-300" />
                  </div>
                </div>

                {/* Card Middle: Product Image */}
                <div className="relative z-10 my-6 sm:my-8 aspect-[2/1] bg-black/40 rounded-2xl border border-white/5 flex items-center justify-center overflow-hidden group-hover:border-brand-gold/20 transition-colors duration-300">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,rgba(0,0,0,0)_80%)]" />
                  <motion.div 
                    className="relative w-full h-full flex items-center justify-center"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.5 }}
                  >
                    {/* Watch product image */}
                    {item.image ? (
                      <OptimizedImage
                        src={item.image}
                        alt={item.imageAlt}
                        fill
                        className="object-contain p-4"
                        priority={false}
                        showBlur={true}
                        animateOnLoad={true}
                      />
                    ) : (
                      // Fallback icon if image missing
                      <div className="w-32 h-32 rounded-full border border-white/5 relative flex items-center justify-center scale-90 group-hover:scale-100 transition-transform duration-500">
                        <div className="w-24 h-24 rounded-full border border-brand-gold/10 flex items-center justify-center">
                          <Compass className="w-8 h-8 text-brand-gold/25 group-hover:text-brand-gold/60 group-hover:rotate-45 transition-all duration-700" />
                        </div>
                      </div>
                    )}
                  </motion.div>
                  {/* Overlay tags */}
                  <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 flex gap-2 z-20">
                    <span className="text-[9px] uppercase tracking-widest font-mono bg-white/5 text-white/40 px-2.5 py-1 rounded-md border border-white/5">
                      46mm Case
                    </span>
                    <span className="text-[9px] uppercase tracking-widest font-mono bg-white/5 text-white/40 px-2.5 py-1 rounded-md border border-white/5">
                      DLC Coated
                    </span>
                  </div>
                </div>

                {/* Card Bottom Block */}
                <div className="relative z-10 pt-4 sm:pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 sm:gap-6">
                  <p className="text-xs text-white/50 leading-relaxed font-light max-w-sm text-left">
                    {item.description}
                  </p>
                  <div className="flex flex-col items-start sm:items-end flex-shrink-0">
                    <span className="text-xs uppercase tracking-widest text-white/40">MSRP</span>
                    <span className="text-lg sm:text-xl font-bold font-mono text-white mt-1 group-hover:text-brand-gold transition-colors duration-300">
                      {item.price}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
