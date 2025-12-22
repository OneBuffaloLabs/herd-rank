'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const publicLinks = [
  { label: 'Home', href: '/' },
  { label: 'Templates', href: '/templates' },
  { label: 'About', href: '/about' },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="hidden md:flex sticky top-0 z-40 w-full h-16 bg-brand-bg/90 backdrop-blur-md border-b border-brand-primary/20 items-center justify-between px-8">
      {/* Brand Logo Area */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-brand-primary rounded-md flex items-center justify-center font-bold text-white shadow-lg shadow-brand-primary/20">
          H
        </div>
        <span className="text-xl font-bold tracking-tight text-brand-text">HerdRank</span>
      </div>

      {/* Desktop Nav */}
      <nav className="flex items-center gap-6">
        {publicLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`text-sm font-medium transition-colors hover:text-brand-primary ${
              pathname === link.href ? 'text-brand-accent' : 'text-brand-text'
            }`}>
            {link.label}
          </Link>
        ))}
      </nav>

      {/* CTA Area */}
      <div>
        <Link
          href="/editor"
          className="bg-brand-primary hover:bg-brand-primary/90 text-white px-4 py-2 rounded-md text-sm font-semibold transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-brand-primary/20">
          Get Started
        </Link>
      </div>
    </header>
  );
}
