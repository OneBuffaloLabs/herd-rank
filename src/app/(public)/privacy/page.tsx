'use client';

import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faShieldHalved,
  faLock,
  faUserSlash,
  faServer,
  faChevronLeft,
} from '@fortawesome/free-solid-svg-icons';

export default function PrivacyPolicy() {
  const lastUpdated = 'December 22, 2025';

  return (
    <main className="min-h-screen bg-brand-bg text-text-muted font-sans selection:bg-brand-primary selection:text-text-main">
      {/* Hero Header Section */}
      <section className="relative pt-32 pb-16 px-6 border-b border-brand-secondary/30 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-brand-primary/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-brand-primary hover:text-text-main transition-colors mb-8 group">
            <FontAwesomeIcon
              icon={faChevronLeft}
              className="text-xs group-hover:-translate-x-1 transition-transform"
            />
            <span className="text-sm font-bold uppercase tracking-widest">Back to Herd</span>
          </Link>

          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-brand-surface border border-brand-primary/30 rounded-lg flex items-center justify-center text-brand-primary shadow-lg shadow-brand-primary/10">
              <FontAwesomeIcon icon={faShieldHalved} className="text-xl" />
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-text-main tracking-tight">
              Privacy Policy
            </h1>
          </div>
          <p className="text-lg text-text-muted max-w-2xl leading-relaxed">
            At HerdRank, we believe privacy isn't a feature—it's the foundation. We've built this
            tool so your data never leaves your sight.
          </p>
          <div className="mt-6 inline-block px-3 py-1 bg-brand-surface border border-brand-secondary/50 rounded-md text-xs font-mono">
            Last Updated: {lastUpdated}
          </div>
        </div>
      </section>

      {/* Content Grid */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto grid gap-16">
          {/* Core Principle Card */}
          <div className="bg-brand-surface border border-brand-secondary/20 p-8 rounded-2xl shadow-xl">
            <h2 className="text-2xl font-bold text-text-main mb-6 flex items-center gap-3">
              <FontAwesomeIcon icon={faLock} className="text-brand-primary text-xl" />
              The "Local-First" Guarantee
            </h2>
            <p className="leading-relaxed mb-4">
              HerdRank is a <strong>Local-First</strong> application. This means 100% of your tier
              lists, uploaded images, and ranking data are stored directly in your browser's
              internal database (IndexedDB).
            </p>
            <ul className="grid gap-4 mt-6">
              {[
                { icon: faUserSlash, text: "No accounts required. We don't know who you are." },
                {
                  icon: faServer,
                  text: 'No cloud sync. Your data is never uploaded to our servers.',
                },
                {
                  icon: faShieldHalved,
                  text: "No trackers. We don't use 3rd party analytics or ad pixels.",
                },
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-4 p-4 bg-brand-bg/50 rounded-lg border border-brand-secondary/10">
                  <FontAwesomeIcon icon={item.icon} className="mt-1 text-brand-primary" />
                  <span className="text-sm font-medium leading-tight">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Standard Clauses */}
          <div className="grid gap-12">
            <article>
              <h3 className="text-xl font-bold text-text-main mb-4">1. Information Collection</h3>
              <p className="leading-relaxed">
                We do not collect personal information. When you use the app, the only "data"
                generated is the ranking data you create, which stays on your device. We may collect
                anonymous, aggregate usage data via our own self-hosted analytics to improve
                performance, but this is never tied to your identity.
              </p>
            </article>

            <article>
              <h3 className="text-xl font-bold text-text-main mb-4">2. Data Persistence</h3>
              <p className="leading-relaxed">
                Because data is stored locally, clearing your browser cache or "Site Data" for
                HerdRank will permanently delete your boards. We recommend using the "Export"
                feature regularly to save backups of your herds to your physical drive.
              </p>
            </article>

            <article>
              <h3 className="text-xl font-bold text-text-main mb-4">3. Third Party Links</h3>
              <p className="leading-relaxed">
                Our templates or community reels may link to external sites (like TikTok, YouTube,
                or GitHub). We are not responsible for the privacy practices of these external
                platforms.
              </p>
            </article>

            <article>
              <h3 className="text-xl font-bold text-text-main mb-4">4. Contact</h3>
              <p className="leading-relaxed">
                If you have questions about how we handle data privacy, you can open an issue on our{' '}
                <a
                  href="https://github.com/onebuffalolabs/herd-rank"
                  className="text-brand-primary hover:underline">
                  GitHub Repository
                </a>
                .
              </p>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
