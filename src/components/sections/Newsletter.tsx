"use client";

import React, { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { Mail, CheckCircle2 } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Please enter your email");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email");
      return;
    }

    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1200));

    setIsSuccess(true);
    setEmail("");
    setIsSubmitting(false);

    // Reset success message after 5 seconds
    setTimeout(() => {
      setIsSuccess(false);
    }, 5000);
  };

  return (
    <section className="relative bg-brand-dark py-20 lg:py-32 overflow-hidden border-t border-white/5">
      {/* Pulsing ambient background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Central glow pulse */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-gold/30 blur-[100px] rounded-full"
        />

        {/* Side accent glows */}
        <motion.div
          animate={{
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute top-20 right-20 w-80 h-80 bg-brand-gold/20 blur-[120px] rounded-full pointer-events-none"
        />
        <motion.div
          animate={{
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute bottom-20 left-20 w-72 h-72 bg-brand-gold/25 blur-[100px] rounded-full pointer-events-none"
        />
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-brand-gold mb-4 font-semibold">
            Stay Informed
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-4 sm:mb-6 gold-gradient-text">
            Exclusive Watch Updates
          </h2>
          <p className="text-white/60 text-sm sm:text-base md:text-lg mb-8 sm:mb-10 max-w-xl mx-auto px-2">
            Subscribe to receive limited edition announcements, behind-the-scenes horology insights, and exclusive pre-order access.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="relative mb-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-2 sm:gap-3 backdrop-blur-xl"
            >
              {/* Email Input */}
              <div className="flex-1 relative group">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                  disabled={isSubmitting || isSuccess}
                  placeholder="Enter your email"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 sm:px-5 py-3 sm:py-4 text-sm sm:text-base text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold/30 transition-all group-hover:border-white/15 disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <Mail className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-brand-gold/40 group-focus-within:text-brand-gold transition-colors" />
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: isSubmitting || isSuccess ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting || isSuccess ? 1 : 0.98 }}
                type="submit"
                disabled={isSubmitting || isSuccess}
                className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-brand-gold to-brand-gold-hover text-black font-semibold text-sm sm:text-base rounded-lg hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] disabled:opacity-50 disabled:cursor-not-allowed transition-all whitespace-nowrap"
              >
                {isSuccess ? "Subscribed!" : isSubmitting ? "Subscribing..." : "Subscribe"}
              </motion.button>
            </motion.div>

            {/* Error Message */}
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400 text-xs sm:text-sm mt-3"
              >
                {error}
              </motion.p>
            )}

            {/* Success Message */}
            {isSuccess && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="mt-4 flex items-center justify-center gap-2 text-emerald-400"
              >
                <CheckCircle2 className="w-5 h-5" />
                <span>Thank you for subscribing!</span>
              </motion.div>
            )}
          </form>

          {/* Privacy Notice */}
          <p className="text-white/40 text-sm">
            We respect your privacy. Unsubscribe at any time.
          </p>

          {/* Divider and CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 pt-12 border-t border-white/10"
          >
            <p className="text-white/70 mb-6">
              Ready to own a piece of horological mastery?
            </p>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#pricing"
              className="inline-block px-10 py-3 border-2 border-brand-gold text-brand-gold hover:bg-brand-gold/10 rounded-lg font-semibold transition-all duration-300 hover:shadow-[0_0_25px_rgba(212,175,55,0.3)]"
            >
              Explore Collections
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
