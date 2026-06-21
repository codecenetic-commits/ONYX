"use client";

import React, { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormError {
  [key: string]: string;
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormError>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormError = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setSubmitSuccess(true);
    setFormData({ name: "", email: "", subject: "", message: "" });

    setTimeout(() => {
      setSubmitSuccess(false);
    }, 5000);

    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "hello@onyxhorology.com",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+1 (555) 123-4567",
    },
    {
      icon: MapPin,
      label: "Address",
      value: "1847 Luxury Lane, Geneva, Switzerland",
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section
      id="contact"
      className="relative bg-brand-dark py-20 lg:py-32 overflow-hidden border-t border-white/5"
    >
      {/* Sophisticated multi-layer background */}
      {/* Central glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-gold/2 blur-[150px] rounded-full pointer-events-none opacity-50" />
      
      {/* Animated corner accents */}
      <motion.div
        animate={{
          opacity: [0.25, 0.45, 0.25],
          scale: [0.9, 1.1, 0.9],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-20 right-20 w-80 h-80 bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none"
      />
      
      <motion.div
        animate={{
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute bottom-20 left-1/4 w-80 h-80 bg-brand-gold/15 blur-[110px] rounded-full pointer-events-none"
      />
      
      {/* Radial gradient mesh */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.05]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="contact-radial" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(212,175,55,1)" />
              <stop offset="100%" stopColor="rgba(0,0,0,0)" />
            </radialGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#contact-radial)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 lg:mb-16"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-brand-gold mb-3 font-semibold">
            Get In Touch
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-3 sm:mb-4 gold-gradient-text">
            Contact Our Concierge
          </h2>
          <p className="text-sm sm:text-base text-white/60 max-w-2xl mx-auto px-2">
            Reach out to our luxury sales and support team. We&apos;re available for bespoke consultations and exclusive previews.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Contact Info */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-6 sm:space-y-8"
          >
            {contactInfo.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div key={index} variants={itemVariants} className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-brand-gold" />
                  </div>
                  <div>
                    <p className="text-sm uppercase tracking-widest text-brand-gold mb-1">
                      {item.label}
                    </p>
                    <p className="text-lg text-white">{item.value}</p>
                  </div>
                </motion.div>
              );
            })}

            {/* Business Hours */}
            <motion.div
              variants={itemVariants}
              className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-white/5"
            >
              <p className="text-xs sm:text-sm uppercase tracking-widest text-brand-gold mb-3 sm:mb-4">
                Business Hours
              </p>
              <div className="space-y-2 text-white/70 text-sm">
                <p>Monday – Friday: 9:00 AM – 6:00 PM CET</p>
                <p>Saturday: 10:00 AM – 4:00 PM CET</p>
                <p>Sunday: Closed (emergency line available)</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass-panel p-6 sm:p-8 md:p-10 rounded-xl"
          >
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              {/* Name Field */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-white/80 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className={`w-full bg-white/5 border rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold/50 transition-all ${
                    errors.name ? "border-red-500/50" : "border-white/10"
                  }`}
                  placeholder="Your name"
                  disabled={isSubmitting}
                />
                {errors.name && (
                  <p className="text-red-400 text-xs sm:text-sm mt-1">{errors.name}</p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-white/80 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className={`w-full bg-white/5 border rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold/50 transition-all ${
                    errors.email ? "border-red-500/50" : "border-white/10"
                  }`}
                  placeholder="your@email.com"
                  disabled={isSubmitting}
                />
                {errors.email && (
                  <p className="text-red-400 text-xs sm:text-sm mt-1">{errors.email}</p>
                )}
              </div>

              {/* Subject Field */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-white/80 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  className={`w-full bg-white/5 border rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold/50 transition-all ${
                    errors.subject ? "border-red-500/50" : "border-white/10"
                  }`}
                  placeholder="What's this about?"
                  disabled={isSubmitting}
                />
                {errors.subject && (
                  <p className="text-red-400 text-xs sm:text-sm mt-1">{errors.subject}</p>
                )}
              </div>

              {/* Message Field */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-white/80 mb-2">
                  Message
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  rows={5}
                  className={`w-full bg-white/5 border rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold/50 transition-all resize-none ${
                    errors.message ? "border-red-500/50" : "border-white/10"
                  }`}
                  placeholder="Tell us how we can help..."
                  disabled={isSubmitting}
                />
                {errors.message && (
                  <p className="text-red-400 text-xs sm:text-sm mt-1">{errors.message}</p>
                )}
              </div>

              {/* Success Message */}
              {submitSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="p-3 sm:p-4 bg-emerald-950/30 border border-emerald-500/50 rounded-lg text-emerald-300 text-xs sm:text-sm"
                >
                  ✓ Thank you! We&apos;ll be in touch within 24 hours.
                </motion.div>
              )}

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-brand-gold to-brand-gold-hover text-black font-semibold py-2.5 sm:py-3 rounded-lg flex items-center justify-center gap-2 text-sm sm:text-base hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                {isSubmitting ? "Sending..." : "Send Message"}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
