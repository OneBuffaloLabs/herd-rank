'use client';

import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHandshake,
  faHouseUser,
  faBolt,
  faChevronLeft,
  faAnchor,
} from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-brand-bg text-text-muted font-sans selection:bg-brand-primary selection:text-text-main">
      {/* 1. Hero / The "Why" */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden border-b border-brand-secondary/20">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-primary/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-brand-primary hover:text-text-main transition-colors mb-12 group">
            <FontAwesomeIcon
              icon={faChevronLeft}
              className="text-xs group-hover:-translate-x-1 transition-transform"
            />
            <span className="text-sm font-bold uppercase tracking-widest">Back to Herd</span>
          </Link>

          <h1 className="text-5xl md:text-7xl font-extrabold text-text-main tracking-tight mb-8">
            Tools that <span className="text-brand-primary">respect you.</span>
          </h1>

          <p className="text-xl md:text-2xl text-text-muted leading-relaxed max-w-3xl">
            We&apos;re tired of apps that feel like they&apos;re fighting you for your attention or
            your data. HerdRank was built for people who just want a fast, reliable way to rank
            things without a catch.
          </p>
        </div>
      </section>

      {/* 2. Plain English Pillars */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Pillar 1 */}
          <div className="p-8 bg-brand-surface border border-brand-secondary/20 rounded-2xl hover:border-brand-primary/40 transition-all group">
            <div className="w-12 h-12 bg-brand-bg rounded-lg flex items-center justify-center mb-6 text-brand-primary border border-brand-secondary/30">
              <FontAwesomeIcon icon={faHouseUser} className="text-xl" />
            </div>
            <h3 className="text-xl font-bold text-text-main mb-4">You&apos;re the owner</h3>
            <p className="text-sm leading-relaxed">
              When you create a list here, it stays on your computer. We don&apos;t have a
              &quot;cloud&quot; because we don&apos;t want your files. If you want to save your
              work, you just keep it. It&apos;s yours.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="p-8 bg-brand-surface border border-brand-secondary/20 rounded-2xl hover:border-brand-primary/40 transition-all group">
            <div className="w-12 h-12 bg-brand-bg rounded-lg flex items-center justify-center mb-6 text-brand-primary border border-brand-secondary/30">
              <FontAwesomeIcon icon={faBolt} className="text-xl" />
            </div>
            <h3 className="text-xl font-bold text-text-main mb-4">Actually fast</h3>
            <p className="text-sm leading-relaxed">
              Because the app doesn&apos;t have to talk to a distant server every time you click a
              button, everything is instant. It feels like a real tool, not a slow website.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="p-8 bg-brand-surface border border-brand-secondary/20 rounded-2xl hover:border-brand-primary/40 transition-all group">
            <div className="w-12 h-12 bg-brand-bg rounded-lg flex items-center justify-center mb-6 text-brand-primary border border-brand-secondary/30">
              <FontAwesomeIcon icon={faHandshake} className="text-xl" />
            </div>
            <h3 className="text-xl font-bold text-text-main mb-4">No funny business</h3>
            <p className="text-sm leading-relaxed">
              No accounts to create, no passwords to reset, and no &quot;pro&quot; plans. We
              aren&apos;t selling your data or tracking your habits. We just want you to make cool
              lists.
            </p>
          </div>
        </div>
      </section>

      {/* 3. The Human Story */}
      <section className="py-24 px-6 bg-brand-surface/30">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-text-main mb-6">Made with care in Buffalo</h2>
            <p className="leading-relaxed mb-6">
              HerdRank is a project by{' '}
              <Link
                href="https://onebuffalolabs.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-brand-primary hover:text-text-main transition-colors">
                OneBuffaloLabs
              </Link>
              . We&apos;re a small team based in Buffalo, NY, and we believe the internet works best
              when tools are simple, transparent, and don&apos;t try to &quot;engage&quot; you for
              hours.
            </p>
            <p className="leading-relaxed mb-8 text-sm">
              We build &quot;Small Tech&quot;&mdash;software that does one job well, respects your
              time, and stays out of your way once the job is done.
            </p>
            <Link
              href="https://github.com/onebuffalolabs/herd-rank"
              target="_blank"
              className="inline-flex items-center gap-2 px-6 py-3 bg-brand-primary text-text-main font-bold rounded-lg hover:opacity-90 transition-all">
              <FontAwesomeIcon icon={faGithub} />
              See how it&apos;s built
            </Link>
          </div>
          <div className="w-full md:w-72 aspect-square bg-brand-bg border-4 border-brand-secondary/20 rounded-3xl flex items-center justify-center relative overflow-hidden">
            <FontAwesomeIcon icon={faAnchor} className="text-8xl text-brand-secondary/20" />
            <div className="absolute bottom-4 text-[10px] font-mono uppercase tracking-[0.2em] text-brand-text-muted/50">
              Built to Last
            </div>
          </div>
        </div>
      </section>

      {/* 4. Closing CTA */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto p-12 bg-brand-surface border border-brand-secondary/30 rounded-3xl text-center">
          <h2 className="text-3xl font-bold text-text-main mb-4 text-center">
            Ready to get started?
          </h2>
          <p className="text-text-muted mb-8 max-w-md mx-auto">
            Give it a try. No signup required, just pure ranking speed.
          </p>
          <Link
            href="/editor"
            className="inline-flex items-center gap-3 px-10 py-4 bg-brand-primary hover:opacity-90 text-text-main font-black rounded-xl transition-all hover:scale-105">
            Create Your First Herd
            <FontAwesomeIcon icon={faBolt} />
          </Link>
        </div>
      </section>
    </main>
  );
}
