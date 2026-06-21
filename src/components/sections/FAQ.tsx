"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    id: 1,
    question: "What makes the Onyx Caliber 12 movement special?",
    answer: "The Caliber 12 features a dual-barrel mainspring system with a 72-hour power reserve, tourbillon regulator cage, and 46 custom-milled micro-components. Each watch is individually numbered and hand-assembled by master horologists.",
  },
  {
    id: 2,
    question: "How accurate is the mechanical movement?",
    answer: "The Caliber 12 maintains a precision rate of ±2 seconds per day under normal conditions, verified through our proprietary chronometer testing. The zero-gravity balance system ensures consistent accuracy across atmospheric pressure variations.",
  },
  {
    id: 3,
    question: "What is the warranty coverage?",
    answer: "Each Onyx timepiece includes a 5-year international warranty covering all mechanical components, case defects, and movement irregularities. Routine service and adjustments are covered under the Onyx Service Plan.",
  },
  {
    id: 4,
    question: "Can the watch be serviced after warranty expiration?",
    answer: "Absolutely. We maintain authorized service centers globally. Standard maintenance intervals are every 3-5 years. Full movement overhauls and component replacements are available through our legacy service program.",
  },
  {
    id: 5,
    question: "Is the ceramic case truly scratch-resistant?",
    answer: "Our micro-blast obsidian ceramic with diamond-like carbon (DLC) coating rates 9.5 on the Mohs hardness scale. While no material is completely immune to damage under extreme conditions, it significantly outperforms traditional steel cases.",
  },
  {
    id: 6,
    question: "What payment options are available for pre-orders?",
    answer: "We accept wire transfers, cryptocurrency, and major credit cards. A 30% deposit secures your pre-order, with the balance due upon production confirmation. Financing options are available for qualified customers.",
  },
];

interface FAQItemProps {
  item: typeof faqs[0];
  isOpen: boolean;
  onClick: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({ item, isOpen, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="border-b border-white/5 last:border-b-0"
    >
      <button
        onClick={onClick}
        className="w-full py-6 px-6 flex items-center justify-between hover:bg-white/2.5 transition-colors text-left group"
      >
        <span className="text-base md:text-lg font-medium text-white group-hover:text-brand-gold transition-colors">
          {item.question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0 ml-4"
        >
          <ChevronDown className="w-5 h-5 text-brand-gold" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 text-white/70 leading-relaxed">
              {item.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function FAQ() {
  const [openId, setOpenId] = useState<number | null>(null);

  return (
    <section className="relative bg-brand-dark py-24 lg:py-32 overflow-hidden border-t border-white/5">
      {/* Sophisticated multi-layer background */}
      {/* Primary glow */}
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-gold/2 blur-[150px] rounded-full pointer-events-none" />
      
      {/* Animated secondary glow */}
      <motion.div
        animate={{
          opacity: [0.2, 0.45, 0.2],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/4 left-1/3 w-80 h-80 bg-purple-500/10 blur-[110px] rounded-full pointer-events-none"
      />
      
      {/* Dotted pattern overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.015]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="faq-dots" width="60" height="60" patternUnits="userSpaceOnUse">
              <circle cx="30" cy="30" r="2" fill="currentColor" className="text-brand-gold" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#faq-dots)" />
        </svg>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-brand-gold mb-3 font-semibold">
            Questions & Answers
          </p>
          <h2 className="text-4xl md:text-5xl font-light mb-4 gold-gradient-text">
            Frequently Asked
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Everything you need to know about the Onyx Caliber 12 and our commitment to horological excellence.
          </p>
        </motion.div>

        {/* FAQ List */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="glass-panel rounded-lg overflow-hidden"
        >
          {faqs.map((faq) => (
            <FAQItem
              key={faq.id}
              item={faq}
              isOpen={openId === faq.id}
              onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
            />
          ))}
        </motion.div>

        {/* Support CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 text-center"
        >
          <p className="text-white/60 mb-4">
            Still have questions? Contact our concierge team.
          </p>
          <a
            href="#contact"
            className="inline-block px-8 py-3 border border-brand-gold/50 text-brand-gold hover:bg-brand-gold/10 rounded-lg transition-all duration-300 hover:border-brand-gold hover:shadow-[0_0_20px_rgba(212,175,55,0.3)]"
          >
            Get in Touch
          </a>
        </motion.div>
      </div>
    </section>
  );
}
