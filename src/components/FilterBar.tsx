'use client';

import React from 'react';
import { Search, Filter } from 'lucide-react';

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedPlatform: string;
  onPlatformChange: (p: string) => void;
  selectedCategory: string;
  onCategoryChange: (c: string) => void;
}

export function FilterBar({
  searchQuery,
  onSearchChange,
  selectedPlatform,
  onPlatformChange,
  selectedCategory,
  onCategoryChange,
}: FilterBarProps) {
  const platforms = [
    { id: 'all', label: 'All Platforms' },
    { id: 'whatsapp', label: 'WhatsApp' },
    { id: 'telegram', label: 'Telegram' },
    { id: 'discord', label: 'Discord' },
    { id: 'instagram', label: 'Instagram' },
    { id: 'facebook', label: 'Facebook' },
  ];

  const categories = [
    'all',
    'Tech & Programming',
    'Business & Startups',
    'Crypto & Web3',
    'Gaming & Esports',
    'Entertainment & Movies',
  ];

  return (
    <div className="bg-slate-900/90 border border-slate-800/90 p-4 rounded-2xl shadow-xl flex flex-col gap-4 mb-8">
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-5 h-5 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search communities by name, topic, or tags..."
            className="w-full bg-slate-950/80 border border-slate-800 text-white placeholder-slate-500 text-sm pl-11 pr-4 py-2.5 rounded-xl focus:outline-none focus:border-emerald-500 transition"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400 hidden sm:block" />
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="bg-slate-950/80 border border-slate-800 text-slate-300 text-sm px-3 py-2.5 rounded-xl focus:outline-none focus:border-emerald-500 transition"
          >
            <option value="all">All Categories</option>
            {categories.filter(c => c !== 'all').map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-800/60">
        {platforms.map((p) => (
          <button
            key={p.id}
            onClick={() => onPlatformChange(p.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              selectedPlatform === p.id
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950/40'
                : 'bg-slate-800/60 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>
    </div>
  );
}
