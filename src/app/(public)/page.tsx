'use client';

import React, { useState, useEffect } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/db';

// Component Imports
import { Hero } from '@/components/home/Hero';
import { RecentsDashboard } from '@/components/home/RecentsDashboard';
import { FeatureGrid } from '@/components/home/FeatureGrid';
import { StarterHerds } from '@/components/home/StarterHerds';
import { CommunityReel } from '@/components/home/CommunityReel';
import { PitchForm } from '@/components/home/PitchForm';
import { LandingFooter } from '@/components/home/LandingFooter';

export default function AdaptiveHomepage() {
  // Reactive Data Fetching
  // Dexie's useLiveQuery observes the database.
  // If 'boards' changes (add/update/delete), this component re-renders automatically.
  const recentBoards = useLiveQuery(() => db.getRecentBoards(4), []);

  // Ensures we don't render DB-dependent UI on the server (which would cause hydration mismatch)
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="w-full min-h-screen bg-brand-bg text-brand-text font-sans selection:bg-brand-primary selection:text-white flex flex-col">
      <Hero />
      <FeatureGrid />
      <StarterHerds templates={[]} />

      {/* Only render after mount to access IndexedDB safely */}
      {mounted && <RecentsDashboard boards={recentBoards} />}

      <CommunityReel />
      <PitchForm />
      <LandingFooter />
    </div>
  );
}
