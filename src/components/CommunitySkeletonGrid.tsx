import React from 'react';

export function CommunitySkeletonGrid({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-slate-900/60 rounded-2xl p-5 border border-slate-800/80 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-slate-800" />
            <div className="flex flex-col gap-2 flex-1">
              <div className="h-4 bg-slate-800 rounded w-3/4" />
              <div className="h-3 bg-slate-800/60 rounded w-1/2" />
            </div>
          </div>
          <div className="h-12 bg-slate-800/40 rounded-lg" />
          <div className="flex justify-between items-center pt-2">
            <div className="h-4 bg-slate-800 rounded w-1/4" />
            <div className="h-8 bg-slate-800 rounded-lg w-24" />
          </div>
        </div>
      ))}
    </div>
  );
}
