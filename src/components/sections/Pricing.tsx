"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Check, Info } from "lucide-react";

const plans = [
  {
    name: "Stealth Lease",
    desc: "Experience zero-g telemetry caliber mechanics.",
    priceMonthly: 190,
    priceOutright: 2200,
    features: [
      "Stealth Titanium DLC watch casing",
      "Caliber 12 self-winding mechanism",
      "72-hour power reserve dial indicator",
      "Complimentary annual dial calibration",
      "3-year mechanical warranty protection",
    ],
    cta: "Apply for Lease",
    featured: false,
  },
  {
    name: "Chrono Membership",
    desc: "Our flagship flight package and concierge support.",
    priceMonthly: 290,
    priceOutright: 3500,
    features: [
      "Custom obsidian ceramic casing options",
      "Zero-gravity balance tourbillon movement",
      "Priority waiting list for special editions",
      "Bi-annual mechanical calibrations",
      "5-year mechanical warranty protection",
      "Access to Onyx Horology Club events",
    ],
    cta: "Join Concierge",
    featured: true,
  },
  {
    name: "Aurum Masterpiece",
    desc: "Complete outright ownership with gold-plate finishes.",
    priceMonthly: 590,
    priceOutright: 7200,
    features: [
      "18K Hand-polished Champagne Gold panels",
      "Skeletonized movement custom dial plates",
      "Authenticated Gibeon Meteorite dials",
      "Lifetime mechanical calibration coverage",
      "Lifetime mechanical warranty protection",
      "Custom backplate engraving & plaque",
    ],
    cta: "Pre-order Masterpiece",
    featured: false,
  },
];

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "outright">("monthly");

  return (
    <section id="pricing" className="relative bg-brand-dark py-20 lg:py-32 overflow-hidden border-t border-white/5">
      {/* Sophisticated multi-layer background */}
      {/* Primary side glow */}
      <div className="absolute right-10 bottom-1/4 w-96 h-96 bg-brand-gold/2 blur-[150px] rounded-full pointer-events-none" />
      
      {/* Animated accent glow */}
      <motion.div
        animate={{
          opacity: [0.3, 0.5, 0.3],
          x: [-20, 20, -20],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/3 left-1/4 w-80 h-80 bg-indigo-500/12 blur-[120px] rounded-full pointer-events-none"
      />
      
      {/* Hexagonal grid overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="pricing-hex" width="90" height="90" patternUnits="userSpaceOnUse">
              <path d="M45,10 L80,30 L80,70 L45,90 L10,70 L10,30 Z" fill="none" stroke="currentColor" strokeWidth="1" className="text-brand-gold" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#pricing-hex)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs uppercase tracking-[0.3em] text-brand-gold mb-3 font-semibold"
          >
            Ownership Options
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-wider uppercase mb-4 sm:mb-6 gold-gradient-text"
          >
            ACQUISITION SCHEMES
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm lg:text-base text-white/50 font-light leading-relaxed mb-10"
          >
            Acquire your caliber timepiece outright or apply for our luxury horology club membership and leasing options.
          </motion.p>

          {/* Toggle Button */}
          <div className="inline-flex items-center bg-white/5 border border-white/10 rounded-full p-1.5 relative z-20">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-widest transition-all duration-300 ${
                billingCycle === "monthly"
                  ? "bg-brand-gold text-brand-dark shadow-[0_2px_15px_rgba(212,175,55,0.25)]"
                  : "text-white/60 hover:text-white"
              }`}
            >
              Concierge Lease
            </button>
            <button
              onClick={() => setBillingCycle("outright")}
              className={`px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-widest transition-all duration-300 ${
                billingCycle === "outright"
                  ? "bg-brand-gold text-brand-dark shadow-[0_2px_15px_rgba(212,175,55,0.25)]"
                  : "text-white/60 hover:text-white"
              }`}
            >
              Outright Purchase
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
          {plans.map((plan, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: idx * 0.15 }}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
              className={`glass-panel rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden transition-all duration-300 ${
                plan.featured
                  ? "border-brand-gold/40 shadow-[0_20px_50px_rgba(212,175,55,0.06)] bg-white/[0.03]"
                  : "border-white/5"
              }`}
            >
              {/* Highlight ribbon for popular card */}
              {plan.featured && (
                <div className="absolute top-0 right-0 bg-brand-gold text-brand-dark text-[9px] uppercase tracking-[0.25em] font-extrabold px-6 py-1.5 rounded-bl-xl shadow-md">
                  Most Requested
                </div>
              )}

              {/* Card Head */}
              <div className="text-left mb-8">
                <h3 className="text-2xl font-bold uppercase tracking-wider text-white mb-2">
                  {plan.name}
                </h3>
                <p className="text-xs text-white/50 leading-relaxed font-light min-h-[36px]">
                  {plan.desc}
                </p>

                {/* Price tag */}
                <div className="mt-6 flex items-baseline">
                  <span className="text-4xl lg:text-5xl font-black font-mono text-white">
                    ${billingCycle === "monthly" ? plan.priceMonthly : plan.priceOutright}
                  </span>
                  <span className="text-xs uppercase tracking-widest text-white/40 ml-2 font-mono">
                    {billingCycle === "monthly" ? "/ Month" : "Total Outright"}
                  </span>
                </div>
              </div>

              {/* Card Divider */}
              <div className="h-[1px] bg-white/5 mb-8" />

              {/* Features List */}
              <ul className="space-y-4 mb-10 text-left">
                {plan.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center mt-0.5 shrink-0">
                      <Check className="w-3 h-3 text-brand-gold" />
                    </div>
                    <span className="text-sm text-white/70 font-light font-sans leading-relaxed">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Action Button */}
              <button
                className={`w-full py-4 rounded-xl text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
                  plan.featured
                    ? "bg-brand-gold text-brand-dark hover:bg-brand-gold-hover shadow-[0_4px_25px_rgba(212,175,55,0.25)] hover:scale-[1.02]"
                    : "bg-white/5 hover:bg-white/10 text-white border border-white/5 hover:border-brand-gold/25"
                }`}
              >
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Small Notice footer */}
        <div className="mt-12 flex items-center justify-center gap-2 text-white/30 text-xs">
          <Info className="w-4 h-4 text-brand-gold/50" />
          <span>Membership applications are subject to mechanical validation and waiting lists.</span>
        </div>
      </div>
    </section>
  );
}
