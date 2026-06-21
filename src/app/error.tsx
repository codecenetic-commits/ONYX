"use client";

import React, { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-brand-dark flex flex-col items-center justify-center p-4 text-center">
      <div className="glass-panel p-8 md:p-12 rounded-2xl max-w-lg w-full relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-red-500/20 blur-[60px] rounded-full pointer-events-none" />
        
        <h2 className="text-3xl font-bold text-white mb-4 uppercase tracking-wider relative z-10">
          System Error
        </h2>
        <p className="text-white/60 mb-8 relative z-10">
          An unexpected anomaly occurred within the application core. Our telemetry has logged the event.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
          <button
            onClick={() => reset()}
            className="px-6 py-3 bg-brand-gold text-brand-dark font-semibold rounded-lg hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all uppercase tracking-widest text-sm"
          >
            Attempt Recovery
          </button>
          <Link
            href="/"
            className="px-6 py-3 bg-white/5 border border-white/10 text-white rounded-lg hover:bg-white/10 transition-all uppercase tracking-widest text-sm inline-block"
          >
            Return to Base
          </Link>
        </div>
      </div>
    </div>
  );
}
