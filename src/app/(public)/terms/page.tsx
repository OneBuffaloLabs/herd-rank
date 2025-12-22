'use client';

import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGavel,
  faScaleBalanced,
  faCopyright,
  faCircleExclamation,
  faChevronLeft,
} from '@fortawesome/free-solid-svg-icons';

export default function TermsOfService() {
  const lastUpdated = 'December 22, 2025';

  return (
    <main className="min-h-screen bg-brand-bg text-text-muted font-sans selection:bg-brand-primary selection:text-text-main">
      {/* Hero Header Section */}
      <section className="relative pt-32 pb-16 px-6 border-b border-brand-secondary/30 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-brand-accent/5 blur-[120px] rounded-full pointer-events-none" />

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
            <div className="w-12 h-12 bg-brand-surface border border-brand-secondary/30 rounded-lg flex items-center justify-center text-brand-primary shadow-lg shadow-brand-primary/10">
              <FontAwesomeIcon icon={faGavel} className="text-xl" />
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-text-main tracking-tight">
              Terms of Service
            </h1>
          </div>
          <p className="text-lg text-text-muted max-w-2xl leading-relaxed">
            Simple rules for a competitive herd. By using HerdRank, you agree to these
            straightforward terms.
          </p>
          <div className="mt-6 inline-block px-3 py-1 bg-brand-surface border border-brand-secondary/50 rounded-md text-xs font-mono">
            Version 1.0 — {lastUpdated}
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-invert prose-brand max-w-none space-y-16">
            {/* 01. Acceptance */}
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/4">
                <span className="text-5xl font-black text-brand-secondary/30 select-none">01</span>
              </div>
              <div className="md:w-3/4">
                <h2 className="text-2xl font-bold text-text-main mb-4 flex items-center gap-2">
                  <FontAwesomeIcon icon={faScaleBalanced} className="text-brand-primary text-lg" />
                  Acceptance of Terms
                </h2>
                <p className="text-text-muted leading-relaxed">
                  By accessing or using HerdRank, provided by OneBuffaloLabs, you agree to be bound
                  by these terms. If you do not agree, please do not use the application. This is a
                  local-first tool provided "as-is" for personal and community use.
                </p>
              </div>
            </div>

            {/* 02. Content & Ownership */}
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/4">
                <span className="text-5xl font-black text-brand-secondary/30 select-none">02</span>
              </div>
              <div className="md:w-3/4">
                <h2 className="text-2xl font-bold text-text-main mb-4 flex items-center gap-2">
                  <FontAwesomeIcon icon={faCopyright} className="text-brand-primary text-lg" />
                  Ownership of Data
                </h2>
                <p className="text-text-muted leading-relaxed mb-4">
                  You own your data. OneBuffaloLabs does not claim any ownership over the images you
                  upload or the lists you create. Because this data is stored locally on your
                  device, you are solely responsible for its maintenance and backup.
                </p>
                <div className="p-4 bg-brand-accent/10 border-l-4 border-brand-accent rounded-r-lg text-sm italic">
                  Note: We cannot recover deleted lists. If you lose your device or clear your
                  browser data, your herds are gone.
                </div>
              </div>
            </div>

            {/* 03. Usage Limits */}
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/4">
                <span className="text-5xl font-black text-brand-secondary/30 select-none">03</span>
              </div>
              <div className="md:w-3/4">
                <h2 className="text-2xl font-bold text-text-main mb-4 flex items-center gap-2">
                  <FontAwesomeIcon
                    icon={faCircleExclamation}
                    className="text-brand-primary text-lg"
                  />
                  Prohibited Use
                </h2>
                <p className="text-text-muted leading-relaxed mb-4">
                  While we don't monitor your local data, any content you share publicly using the
                  HerdRank name or templates must not:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-text-muted">
                  <li>Violate any local, state, or international laws.</li>
                  <li>Infringe on the intellectual property of others.</li>
                  <li>Contain malicious code or attempt to circumvent application security.</li>
                </ul>
              </div>
            </div>

            {/* 04. Disclaimers */}
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/4">
                <span className="text-5xl font-black text-brand-secondary/30 select-none">04</span>
              </div>
              <div className="md:w-3/4">
                <h2 className="text-2xl font-bold text-text-main mb-4">Disclaimer of Warranty</h2>
                <p className="text-text-muted leading-relaxed">
                  HERDRANK IS PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND. ONEBUFFALOLABS SHALL
                  NOT BE LIABLE FOR ANY DATA LOSS, HARDWARE DAMAGE, OR INDIRECT DAMAGES RESULTING
                  FROM THE USE OF THIS SOFTWARE.
                </p>
              </div>
            </div>
          </div>

          {/* Footer CTA */}
          <div className="mt-24 p-12 bg-brand-surface border border-brand-secondary/20 rounded-3xl text-center">
            <h3 className="text-2xl font-bold text-text-main mb-4">Have Questions?</h3>
            <p className="text-text-muted mb-8 max-w-lg mx-auto">
              Our code is open source and our terms are built on trust. Join the discussion on
              GitHub to help us improve.
            </p>
            <a
              href="https://github.com/onebuffalolabs/herd-rank"
              className="inline-flex items-center gap-2 px-8 py-4 bg-brand-primary hover:bg-brand-primary/90 text-white font-bold rounded-xl transition-all hover:scale-105">
              Visit Repository
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
