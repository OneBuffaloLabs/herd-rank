'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHouse,
  faBug,
  faGhost,
  faBinoculars,
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons';

export default function NotFound() {
  // Default fallback URL
  const [githubUrl, setGithubUrl] = useState(
    'https://github.com/OneBuffaloLabs/herd-rank/issues/new'
  );

  useEffect(() => {
    // This code runs only in the browser, so we can access window.location
    if (typeof window !== 'undefined') {
      const currentUrl = window.location.href;
      const issueTitle = encodeURIComponent('404 Error: Ghost Herd Detected');
      const issueBody = encodeURIComponent(
        `I found a dead link at: ${currentUrl}\n\nExpected behavior:`
      );

      setGithubUrl(
        `https://github.com/OneBuffaloLabs/herd-rank/issues/new?title=${issueTitle}&body=${issueBody}`
      );
    }
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-brand-bg text-brand-text flex items-center justify-center p-6 overflow-hidden">
      {/* 1. Atmosphere: Cold Tundra Night Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--color-brand-ambient)_0%,transparent_60%)] opacity-20 pointer-events-none" />

      <div className="relative z-10 max-w-2xl w-full flex flex-col items-center text-center">
        {/* 2. The Visual: Broken "F-Tier" Row */}
        <div className="w-full max-w-lg mb-12 transform -rotate-2 hover:rotate-0 transition-transform duration-500 ease-out cursor-help group">
          <div className="flex w-full h-32 rounded-lg overflow-hidden border-2 border-brand-surface shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-brand-surface">
            {/* The Rank Label */}
            <div className="w-32 h-full bg-brand-accent flex items-center justify-center border-r-2 border-brand-surface">
              <span className="text-6xl font-black text-brand-bg drop-shadow-md">F</span>
            </div>

            {/* The "Content" (Missing) */}
            <div className="flex-1 flex items-center justify-center gap-6 bg-black/20 group-hover:bg-black/10 transition-colors relative">
              <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(0,0,0,0.2)_10px,rgba(0,0,0,0.2)_20px)] opacity-50"></div>

              <div className="flex flex-col items-center gap-2 z-10 animate-pulse">
                <span className="text-5xl font-mono font-bold text-brand-text-muted/50 tracking-widest">
                  404
                </span>
                <span className="text-xs uppercase font-bold text-brand-accent tracking-widest">
                  Not Found
                </span>
              </div>

              <FontAwesomeIcon
                icon={faGhost}
                className="text-4xl text-brand-text-muted/20 group-hover:text-brand-accent/50 transition-colors duration-300 transform group-hover:-translate-y-2"
              />
            </div>
          </div>
        </div>

        {/* 3. The Mascot & Headline */}
        <div className="mb-8">
          <div className="w-16 h-16 bg-brand-surface border border-brand-primary/30 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_20px_var(--color-brand-primary)]">
            <FontAwesomeIcon icon={faBinoculars} className="text-2xl text-brand-primary" />
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-brand-text mb-4">
            This Bison Wandered <span className="text-brand-primary">Off the Trail.</span>
          </h1>

          <p className="text-lg text-brand-text-muted max-w-lg mx-auto leading-relaxed">
            We couldn't find the page you're looking for. It might have been deleted, moved, or
            perhaps it only exists in a different herd's local storage.
          </p>
        </div>

        {/* 4. Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <Link
            href="/"
            className="px-8 py-3.5 bg-brand-primary hover:bg-brand-primary/90 text-white font-bold rounded-lg shadow-[0_4px_14px_0_rgba(0,83,213,0.39)] transition-all hover:scale-105 active:scale-95 flex items-center gap-2">
            <FontAwesomeIcon icon={faHouse} />
            Back to the Herd
          </Link>

          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-brand-text-muted hover:text-brand-accent transition-colors flex items-center gap-2 group">
            <FontAwesomeIcon icon={faBug} className="group-hover:rotate-12 transition-transform" />
            Report a Ghost Herd
            <FontAwesomeIcon
              icon={faArrowRight}
              className="opacity-0 group-hover:opacity-100 transition-opacity transform -translate-x-2 group-hover:translate-x-0"
            />
          </a>
        </div>
      </div>
    </div>
  );
}
