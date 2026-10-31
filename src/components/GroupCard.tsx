'use client';

import React, { useState } from 'react';
import { Group } from '@/src/types';
import { ExternalLink, CheckCircle2, Users, ThumbsUp, Bookmark, Star, Share2 } from 'lucide-react';

export function GroupCard({ group }: { group: Group }) {
  const [upvotes, setUpvotes] = useState(group.upvotes || 0);
  const [hasUpvoted, setHasUpvoted] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const getPlatformStyle = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'whatsapp':
        return { name: 'WhatsApp', bg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' };
      case 'telegram':
        return { name: 'Telegram', bg: 'bg-sky-500/10 text-sky-400 border-sky-500/20' };
      case 'discord':
        return { name: 'Discord', bg: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' };
      case 'facebook':
        return { name: 'Facebook', bg: 'bg-blue-500/10 text-blue-400 border-blue-500/20' };
      case 'instagram':
        return { name: 'Instagram', bg: 'bg-pink-500/10 text-pink-400 border-pink-500/20' };
      default:
        return { name: platform, bg: 'bg-slate-500/10 text-slate-400 border-slate-500/20' };
    }
  };

  const platformStyle = getPlatformStyle(group.platform);

  const handleUpvote = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!hasUpvoted) {
      setUpvotes((prev) => prev + 1);
      setHasUpvoted(true);
    }
  };

  return (
    <div className="bg-slate-900/80 hover:bg-slate-900/95 border border-slate-800/80 hover:border-emerald-500/30 rounded-2xl p-5 flex flex-col justify-between gap-4 transition-all duration-200 hover:shadow-xl hover:shadow-emerald-950/20 group relative overflow-hidden">
      {group.featured && (
        <div className="absolute top-0 right-0 bg-gradient-to-l from-emerald-600 to-teal-600 text-white text-[9px] font-extrabold uppercase px-2.5 py-0.5 rounded-bl-lg tracking-wider">
          Featured
        </div>
      )}

      <div>
        <div className="flex items-start justify-between gap-3 mb-3.5">
          <div className="flex items-center gap-3">
            <img
              src={group.imageUrl}
              alt={group.title}
              className="w-12 h-12 rounded-xl object-cover border border-slate-700/80 bg-slate-800 shrink-0 group-hover:scale-105 transition-transform"
            />
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <h3 className="font-bold text-sm text-white group-hover:text-emerald-400 transition-colors truncate">
                  {group.title}
                </h3>
                {group.verified && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" title="Verified Community" />
                )}
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                <span className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-slate-500" />
                  <span>{(group.memberCount || 100).toLocaleString()}</span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 text-amber-400 font-medium">
                  <Star className="w-3 h-3 fill-amber-400" />
                  <span>{group.rating || 4.9}</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        <span className={`inline-block text-[10px] font-semibold px-2.5 py-0.5 rounded-full border mb-2.5 ${platformStyle.bg}`}>
          {platformStyle.name}
        </span>

        <p className="text-slate-300 text-xs leading-relaxed line-clamp-2 mb-3">
          {group.description}
        </p>

        <div className="flex flex-wrap gap-1.5">
          <span className="text-[10px] font-medium bg-slate-800 text-slate-300 px-2 py-0.5 rounded-md border border-slate-700/50">
            {group.category}
          </span>
          {group.customTags?.slice(0, 3).map((tag, i) => (
            <span key={i} className="text-[10px] text-teal-300 bg-teal-950/50 px-2 py-0.5 rounded-md border border-teal-800/40 font-mono">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2">
          <button
            onClick={handleUpvote}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg border text-xs font-semibold transition ${
              hasUpvoted
                ? 'bg-emerald-600/20 border-emerald-500/50 text-emerald-400'
                : 'bg-slate-800/80 border-slate-700/80 text-slate-400 hover:text-white hover:border-slate-600'
            }`}
          >
            <ThumbsUp className="w-3.5 h-3.5" />
            <span>{upvotes}</span>
          </button>
          <button
            onClick={() => setIsBookmarked(!isBookmarked)}
            className={`p-1.5 rounded-lg border transition ${
              isBookmarked
                ? 'bg-teal-600/20 border-teal-500/50 text-teal-400'
                : 'bg-slate-800/80 border-slate-700/80 text-slate-400 hover:text-white hover:border-slate-600'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
          </button>
        </div>

        <a
          href={group.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3.5 py-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold rounded-xl shadow-md shadow-emerald-950/40 transition text-xs active:scale-95"
        >
          <span>Join Link</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}
