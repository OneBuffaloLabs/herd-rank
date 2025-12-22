'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLayerGroup,
  faPenToSquare,
  faGear,
  faChartLine,
  faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';

const appLinks = [
  { label: 'My Gallery', href: '/gallery', icon: faLayerGroup },
  { label: 'Tier Editor', href: '/editor', icon: faPenToSquare },
  { label: 'Analytics', href: '/analytics', icon: faChartLine },
  { label: 'Settings', href: '/settings', icon: faGear },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex fixed left-0 top-0 z-40 h-screen w-64 flex-col bg-brand-bg border-r border-brand-primary/10">
      {/* Sidebar Header */}
      <div className="flex h-16 items-center px-6 border-b border-brand-primary/10">
        <div className="w-6 h-6 bg-brand-accent rounded-sm mr-3"></div>
        <span className="text-lg font-bold tracking-tight text-brand-text">Workspace</span>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
        {appLinks.map((link) => {
          const isActive = pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-all duration-200 group ${
                isActive
                  ? 'bg-brand-primary/10 text-brand-accent'
                  : 'text-brand-text/80 hover:bg-brand-primary/5 hover:text-brand-text'
              }`}>
              <FontAwesomeIcon
                icon={link.icon}
                className={`w-4 h-4 ${
                  isActive ? 'text-brand-accent' : 'text-brand-text/50 group-hover:text-brand-text'
                }`}
              />
              {link.label}
            </Link>
          );
        })}
      </nav>

      {/* Sidebar Footer */}
      <div className="p-4 border-t border-brand-primary/10">
        <button className="flex w-full items-center gap-3 px-3 py-2 text-sm font-medium text-brand-text/60 hover:text-brand-accent transition-colors">
          <FontAwesomeIcon icon={faSignOutAlt} className="w-4 h-4" />
          Exit Workspace
        </button>
      </div>
    </aside>
  );
}
