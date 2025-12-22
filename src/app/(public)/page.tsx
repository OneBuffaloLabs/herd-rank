'use client';

import React, { useState, useEffect } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/db';

// Component Imports
import { Hero } from '@/components/home/Hero';
import { RecentsDashboard } from '@/components/home/RecentsDashboard';
import { FeatureGrid } from '@/components/home/FeatureGrid';
import { CommunityReel } from '@/components/home/CommunityReel';
import { PitchForm } from '@/components/home/PitchForm';
import { LandingFooter } from '@/components/home/LandingFooter';

export default function AdaptiveHomepage() {
  const recentBoards = useLiveQuery(() => db.getRecentBoards(4), []);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="w-full min-h-screen bg-brand-bg text-brand-text font-sans selection:bg-brand-primary selection:text-white flex flex-col">
      <Hero />
      <FeatureGrid />
      {mounted && <RecentsDashboard boards={recentBoards} />}
      <CommunityReel />
      <PitchForm />
      <LandingFooter />
    </div>
  );
}
