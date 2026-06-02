"use client";

import React from "react";
import { motion } from "framer-motion";
import { Mail, Share2, Send, Heart, ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Collections",
      links: [
        { label: "Stealth Edition", href: "#portfolio" },
        { label: "Aurum Collection", href: "#portfolio" },
        { label: "Horizon Series", href: "#portfolio" },
        { label: "Limited Releases", href: "#portfolio" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About ONYX", href: "#about" },
        { label: "Our Craftsmanship", href: "#features" },
        { label: "Pricing", href: "#pricing" },
        { label: "Careers", href: "#contact" },
      ],
    },
    {
      title: "Support",
      links: [
        { label: "FAQ", href: "#faq" },
        { label: "Contact Us", href: "#contact" },
        { label: "Warranty", href: "#faq" },
        { label: "Service Centers", href: "#contact" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Service", href: "/terms" },
        { label: "Cookie Settings", href: "#" },
        { label: "Sitemap", href: "/sitemap.xml" },
      ],
    },
  ];

  const socialLinks = [
    {
      icon: Send,
      href: "https://twitter.com/OnyxWatches",
      label: "Follow ONYX on Twitter",
      ariaLabel: "Visit our Twitter profile",
    },
    {
      icon: Heart,
      href: "https://onyx-watches.com",
      label: "ONYX Official Website",
      ariaLabel: "Visit ONYX website",
    },
    {
      icon: Share2,
      href: "https://linkedin.com/company/onyx-watches",
      label: "ONYX on LinkedIn",
      ariaLabel: "Visit our LinkedIn profile",
    },
    {
      icon: Mail,
      href: "mailto:support@onyx-watches.com",
      label: "Email ONYX",
      ariaLabel: "Send us an email",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <footer className="relative bg-brand-dark border-t border-white/5 overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 right-1/3 w-96 h-96 bg-brand-gold/5 blur-[150px] rounded-full pointer-events-none opacity-30" aria-hidden="true" />

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12 mb-16 lg:mb-24">
            {/* Brand Section */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="col-span-2 md:col-span-1"
            >
              <h3 className="text-2xl font-light gold-gradient-text mb-4">ONYX</h3>
              <p className="text-white/50 text-sm leading-relaxed mb-6">
                Crafting precision timepieces that transcend generations. Horological mastery, delivered.
              </p>
              {/* Social Links */}
              <nav className="flex gap-4" aria-label="Social media links">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.2, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-10 h-10 rounded-full border border-brand-gold/20 flex items-center justify-center text-white/60 hover:text-brand-gold hover:border-brand-gold/50 transition-all duration-300 hover:bg-brand-gold/5"
                      aria-label={social.ariaLabel}
                      title={social.label}
                    >
                      <Icon className="w-5 h-5" aria-hidden="true" />
                    </motion.a>
                  );
                })}
              </nav>
            </motion.div>

            {/* Footer Navigation Columns */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="col-span-2 md:col-span-3 lg:col-span-4 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
              role="navigation"
              aria-label="Footer navigation"
            >
              {footerSections.map((section, idx) => (
                <motion.div key={idx} variants={itemVariants}>
                  <h4 className="text-sm uppercase tracking-wider text-brand-gold font-semibold mb-4">
                    {section.title}
                  </h4>
                  <ul className="space-y-3">
                    {section.links.map((link, linkIdx) => (
                      <li key={linkIdx}>
                        <a
                          href={link.href}
                          className="text-sm text-white/60 hover:text-white transition-colors duration-200 inline-block relative group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-gold rounded px-1 py-0.5"
                        >
                          {link.label}
                          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-gold group-hover:w-full transition-all duration-300" aria-hidden="true" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Divider */}
          <div className="border-t border-white/5" aria-hidden="true" />

          {/* Bottom Footer */}
          <div className="py-8 lg:py-12">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8">
              {/* Copyright */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-sm text-white/50 text-center md:text-left"
              >
                <p>© {currentYear} ONYX HOROLOGY. All rights reserved.</p>
                <p className="text-xs mt-1">Crafted for those who appreciate true craftsmanship.</p>
              </motion.div>

              {/* Scroll to Top Button */}
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToTop}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-brand-gold/30 text-brand-gold text-sm font-medium hover:border-brand-gold/60 hover:bg-brand-gold/5 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
                aria-label="Scroll to top of page"
              >
                Back to Top
                <ArrowUp className="w-4 h-4" aria-hidden="true" />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Top Border Accent */}
        <div className="h-px bg-gradient-to-r from-transparent via-brand-gold/20 to-transparent" aria-hidden="true" />
      </div>
    </footer>
  );
}
