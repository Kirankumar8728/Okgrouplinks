'use client';

import React, { useState } from 'react';
import { Group, NetworkStats } from '@/src/types';
import { Header } from '@/src/components/Header';
import { Footer } from '@/src/components/Footer';
import { FilterBar } from '@/src/components/FilterBar';
import { GroupCard } from '@/src/components/GroupCard';
import { Compass, ShieldCheck, Users, Flame, Sparkles } from 'lucide-react';

interface MainAppViewProps {
  initialGroups: Group[];
  initialTotalCount: number;
  initialStats: NetworkStats;
  pageHeading: string;
  pageDescription: string;
  hideAdultContent?: boolean;
}

export function MainAppView({
  initialGroups,
  initialTotalCount,
  initialStats,
  pageHeading,
  pageDescription,
}: MainAppViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredGroups = initialGroups.filter((group) => {
    if (selectedPlatform !== 'all' && group.platform.toLowerCase() !== selectedPlatform.toLowerCase()) {
      return false;
    }
    if (selectedCategory !== 'all' && group.category.toLowerCase() !== selectedCategory.toLowerCase()) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      return (
        group.title.toLowerCase().includes(q) ||
        group.description.toLowerCase().includes(q) ||
        group.customTags.some((t) => t.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Hero Section */}
        <div className="relative rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 p-8 sm:p-12 mb-10 overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Verified Community Directory</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
              {pageHeading}
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
              {pageDescription}
            </p>

            {/* Stats Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-800/80">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-lg font-bold text-white leading-none">{(initialStats?.totalGroups || 0).toLocaleString()}</p>
                  <p className="text-xs text-slate-400 mt-1">Verified Groups</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-teal-500/10 text-teal-400">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-lg font-bold text-white leading-none">{(((initialStats?.activeMembers || 0)) / 1000).toFixed(1)}k+</p>
                  <p className="text-xs text-slate-400 mt-1">Active Members</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400">
                  <Flame className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-lg font-bold text-white leading-none">+{initialStats?.dailyJoins || 0}</p>
                  <p className="text-xs text-slate-400 mt-1">Daily Joins</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-lg font-bold text-white leading-none">{initialStats?.verifiedGroups || 0}</p>
                  <p className="text-xs text-slate-400 mt-1">Official Badges</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Section */}
        <FilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedPlatform={selectedPlatform}
          onPlatformChange={setSelectedPlatform}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        {/* Directory Grid */}
        {filteredGroups.length === 0 ? (
          <div className="bg-slate-900/60 rounded-2xl p-12 border border-slate-800 text-center flex flex-col items-center gap-3">
            <Compass className="w-10 h-10 text-slate-500 mb-1" />
            <h3 className="text-lg font-semibold text-white">No matching communities found</h3>
            <p className="text-sm text-slate-400 max-w-md">
              Try adjusting your search query, clearing category filters, or browsing other social platforms.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedPlatform('all');
                setSelectedCategory('all');
              }}
              className="mt-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold transition"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGroups.map((group) => (
              <GroupCard key={group.id} group={group} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
