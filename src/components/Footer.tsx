'use client';

import React from 'react';
import Link from 'next/link';
import { Share2, Shield, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-800/80 bg-slate-950/60 py-10 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-600/20 text-emerald-400 flex items-center justify-center">
            <Share2 className="w-4 h-4" />
          </div>
          <div>
            <p className="font-semibold text-white">Group Links Directory</p>
            <p className="text-xs text-slate-500">Connecting social communities worldwide</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-xs text-slate-400">
          <Link href="/" className="hover:text-emerald-400 transition">Explore</Link>
          <Link href="/categories" className="hover:text-emerald-400 transition">Categories</Link>
          <Link href="/submit" className="hover:text-emerald-400 transition">Submit Link</Link>
          <span className="flex items-center gap-1 text-slate-500">
            <Shield className="w-3.5 h-3.5 text-emerald-500" /> Safe & Verified
          </span>
        </div>

        <div className="text-xs text-slate-500 flex items-center gap-1">
          <span>Built with</span>
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          <span>for communities</span>
        </div>
      </div>
    </footer>
  );
}
