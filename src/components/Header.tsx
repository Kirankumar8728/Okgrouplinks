'use client';

import React from 'react';
import Link from 'next/link';
import { Share2, PlusCircle, Compass, Grid, Sparkles } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-40 bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-cyan-400 flex items-center justify-center text-white shadow-lg shadow-emerald-950/60 group-hover:scale-105 transition-transform">
            <Share2 className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-lg text-white tracking-tight leading-none group-hover:text-emerald-400 transition-colors">
                Group Links
              </span>
              <span className="text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-1.5 py-0.5 rounded">
                PRO
              </span>
            </div>
            <span className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold mt-1">
              Social Community Directory
            </span>
          </div>
        </Link>

        <nav className="flex items-center gap-2 sm:gap-4">
          <Link
            href="/"
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-900 rounded-xl transition"
          >
            <Compass className="w-4 h-4 text-emerald-400" />
            <span className="hidden sm:inline">Explore</span>
          </Link>
          <Link
            href="/categories"
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-900 rounded-xl transition"
          >
            <Grid className="w-4 h-4 text-teal-400" />
            <span className="hidden sm:inline">Categories</span>
          </Link>
          <Link
            href="/submit"
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 rounded-xl shadow-lg shadow-emerald-950/50 transition active:scale-95"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Submit Link</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
