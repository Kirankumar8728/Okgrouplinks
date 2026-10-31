import React, { Suspense } from 'react';
import { MainAppView } from '@/src/components/MainAppView';
import { getNetworkStats, getGroups } from '@/src/lib/groups-dal';
import { buildPageMetadata } from '@/src/lib/rank';

export const metadata = buildPageMetadata({
  title: 'Advertise on Group Links — Direct Banner & Featured Placements',
  description: 'Reach tens of thousands of active community members daily through banner ads and sponsored placements.',
  pathname: '/ad',
});

export const revalidate = 60;

export default async function AdPage() {
  const [stats, groupsResult] = await Promise.all([
    getNetworkStats(),
    getGroups({ limit: 25 }),
  ]);

  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400">Loading Advertising Info...</div>}>
      <MainAppView
        initialGroups={groupsResult.groups || []}
        initialStats={stats}
        initialTotalCount={groupsResult.total || 0}
        pageHeading="Advertise on Group Links"
        pageDescription="Reach tens of thousands of active community members daily across WhatsApp, Telegram, Discord, and social networks."
      />
    </Suspense>
  );
}
