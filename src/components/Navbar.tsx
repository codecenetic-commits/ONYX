"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Navbar.module.css";

interface NavLink {
  label: string;
  href: string;
  ariaLabel?: string;
}

const navLinks: NavLink[] = [
  { label: "Overview", href: "#overview", ariaLabel: "Product Overview" },
  { label: "Caliber 12", href: "#caliber", ariaLabel: "Caliber 12 Movement" },
  { label: "Specifications", href: "#specs", ariaLabel: "Technical Specifications" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("#overview");
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstMenuItemRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
      firstMenuItemRef.current?.focus();
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const handleNavClick = (href: string) => {
    setActiveLink(href);
    setIsMobileMenuOpen(false);

    const element = document.querySelector(href);
    if (element) {
      setTimeout(() => {
        element.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  return (
    <>
      <motion.header
        className={`${styles.navbar} ${isScrolled ? styles.scrolled : ""}`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        role="banner"
      >
        <div className={styles.navbarContainer}>
          {/* Logo with proper link semantics */}
          <motion.a
            href="#top"
            className={styles.logoWrapper}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            aria-label="ONYX - Home"
          >
            <span className={styles.logo} aria-hidden="false">ONYX</span>
            <div className={styles.logoAccent} aria-hidden="true" />
          </motion.a>

          {/* Desktop Navigation */}
          <nav className={styles.navLinks} aria-label="Main navigation">
            {navLinks.map((link) => (
              <motion.a
                key={link.href}
                href={link.href}
                className={`${styles.navLink} ${
                  activeLink === link.href ? styles.active : ""
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
                aria-label={link.ariaLabel || link.label}
                aria-current={activeLink === link.href ? "page" : undefined}
              >
                <span className={styles.navLinkText}>{link.label}</span>
                <motion.div
                  className={styles.navLinkUnderline}
                  layoutId="underline"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  aria-hidden="true"
                />
              </motion.a>
            ))}
          </nav>

          {/* CTA Button */}
          <motion.button
            className={styles.ctaButton}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 25px rgba(212, 175, 55, 0.4)",
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              alert("Joined the Waitlist!");
            }}
            aria-label="Reserve your ONYX watch"
          >
            <span className={styles.ctaText}>Reserve</span>
            <motion.div className={styles.ctaGlow} layoutId="cta-glow" aria-hidden="true" />
          </motion.button>

          {/* Mobile Menu Button */}
          <motion.button
            ref={menuButtonRef}
            className={styles.mobileMenuButton}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileTap={{ scale: 0.95 }}
            animate={isMobileMenuOpen ? "open" : "closed"}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <motion.span
              className={styles.hamburgerLine}
              variants={{
                closed: { rotate: 0, y: 0 },
                open: { rotate: 45, y: 8 },
              }}
              transition={{ duration: 0.3 }}
              aria-hidden="true"
            />
            <motion.span
              className={styles.hamburgerLine}
              variants={{
                closed: { opacity: 1 },
                open: { opacity: 0 },
              }}
              transition={{ duration: 0.3 }}
              aria-hidden="true"
            />
            <motion.span
              className={styles.hamburgerLine}
              variants={{
                closed: { rotate: 0, y: 0 },
                open: { rotate: -45, y: -8 },
              }}
              transition={{ duration: 0.3 }}
              aria-hidden="true"
            />
          </motion.button>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className={styles.mobileMenuOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            className={styles.mobileMenu}
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            role="navigation"
            aria-label="Mobile navigation"
          >
            <div className={styles.mobileMenuContent}>
              {/* Mobile Nav Links */}
              <nav className={styles.mobileNavLinks} aria-label="Mobile menu items">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.href}
                    ref={index === 0 ? firstMenuItemRef : null}
                    href={link.href}
                    className={`${styles.mobileNavLink} ${
                      activeLink === link.href ? styles.active : ""
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                    aria-label={link.ariaLabel || link.label}
                    aria-current={activeLink === link.href ? "page" : undefined}
                  >
                    {link.label}
                  </motion.a>
                ))}
              </nav>

              {/* Mobile CTA Button */}
              <motion.button
                className={styles.mobileCTAButton}
                onClick={() => {
                  alert("Joined the Waitlist!");
                  setIsMobileMenuOpen(false);
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: navLinks.length * 0.1, duration: 0.3 }}
                aria-label="Reserve your ONYX watch"
              >
                Reserve Now
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
