"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Preloader from "@/components/Preloader";
import ScrollCanvas from "@/components/ScrollCanvas";
import ScrollCanvas2 from "@/components/ScrollCanvas2";
import Features from "@/components/sections/Features";
import About from "@/components/sections/About";
import Portfolio from "@/components/sections/Portfolio";
import Testimonials from "@/components/sections/Testimonials";
import Pricing from "@/components/sections/Pricing";
import FAQ from "@/components/sections/FAQ";
import Contact from "@/components/sections/Contact";
import Newsletter from "@/components/sections/Newsletter";
import Footer from "@/components/sections/Footer";
import styles from "./page.module.css";

export default function Home() {
  const [preloadProgress, setPreloadProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={styles.page}>
      {/* Skip to main content link for accessibility */}
      <a href="#main-content" className="skip-to-main">
        Skip to main content
      </a>

      {/* Loading Screen */}
      <Preloader progress={preloadProgress} isLoading={!isLoaded} />

      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main id="main-content" className={styles.main} role="main">
        {/* Hero Section with Canvas Animation */}
        <section id="hero" className="relative">
          <ScrollCanvas 
            onProgress={setPreloadProgress} 
            onLoaded={() => setIsLoaded(true)} 
            isLoaded={isLoaded}
            aria-label="Hero section with watch animation"
          />
        </section>

        {/* Engineering Features Section */}
        <section id="features">
          <Features />
        </section>

        {/* About Section */}
        <section id="about">
          <About />
        </section>

        {/* Portfolio / Collections Section */}
        <section id="portfolio">
          <Portfolio />
        </section>

        {/* Testimonials Section */}
        <section id="testimonials">
          <Testimonials />
        </section>

        {/* Pricing Section */}
        <section id="pricing">
          <Pricing />
        </section>

        {/* Second Canvas Animation */}
        <section id="showcase" className="relative">
          <ScrollCanvas2 
            onProgress={setPreloadProgress} 
            onLoaded={() => setIsLoaded(true)} 
            isLoaded={isLoaded}
            aria-label="Secondary watch showcase animation"
          />
        </section>

        {/* FAQ Section */}
        <section id="faq">
          <FAQ />
        </section>

        {/* Contact Section */}
        <section id="contact">
          <Contact />
        </section>

        {/* Newsletter Section */}
        <section id="newsletter">
          <Newsletter />
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
