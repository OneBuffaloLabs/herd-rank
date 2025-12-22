'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faLayerGroup, faPenToSquare, faGear } from '@fortawesome/free-solid-svg-icons';

const navItems = [
  { label: 'Home', href: '/', icon: faHome },
  { label: 'Gallery', href: '/gallery', icon: faLayerGroup },
  { label: 'Editor', href: '/editor', icon: faPenToSquare },
  { label: 'Settings', href: '/settings', icon: faGear },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 z-50 w-full h-16 bg-brand-bg border-t border-brand-primary/20 md:hidden">
      <div className="grid h-full max-w-lg grid-cols-4 mx-auto font-sans">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`inline-flex flex-col items-center justify-center px-5 hover:bg-brand-primary/10 transition-colors group ${
                isActive ? 'text-brand-accent' : 'text-brand-text/70'
              }`}>
              <FontAwesomeIcon
                icon={item.icon}
                className={`w-5 h-5 mb-1 ${
                  isActive ? 'text-brand-accent' : 'text-brand-text/70 group-hover:text-brand-text'
                }`}
              />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
