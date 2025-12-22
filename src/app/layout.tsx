import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import AnalyticsInitializer from '@/components/AnalyticsInitializer';
import { BottomNav } from '@/components/navigation/BottomNav';
import './globals.css';

import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'HerdRank',
  description: 'Local-first Tier List Maker',
};

export const viewport: Viewport = {
  themeColor: '#00338d',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased flex flex-col min-h-screen bg-brand-bg text-brand-text`}>
        {/* Main Content Area */}
        <div className="flex-grow flex flex-col pb-16 md:pb-0">{children}</div>

        {/* Mobile Global Navigation (Hidden on Desktop) */}
        <BottomNav />

        <AnalyticsInitializer />
      </body>
    </html>
  );
}
