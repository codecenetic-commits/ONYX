import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-brand-dark flex flex-col items-center justify-center p-4 text-center">
      <div className="glass-panel p-8 md:p-12 rounded-2xl max-w-lg w-full relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-brand-gold/10 blur-[60px] rounded-full pointer-events-none" />
        
        <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-brand-gold to-white mb-4">
          404
        </h1>
        <h2 className="text-2xl font-bold text-white mb-4 uppercase tracking-wider relative z-10">
          Component Missing
        </h2>
        <p className="text-white/60 mb-8 relative z-10">
          The requested coordinate or schematic cannot be found in the current assembly.
        </p>
        
        <div className="flex justify-center relative z-10">
          <Link
            href="/"
            className="px-6 py-3 bg-brand-gold text-brand-dark font-semibold rounded-lg hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all uppercase tracking-widest text-sm"
          >
            Return to Collection
          </Link>
        </div>
      </div>
    </div>
  );
}
