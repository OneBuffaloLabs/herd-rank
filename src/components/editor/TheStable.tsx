'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown, faBoxOpen } from '@fortawesome/free-solid-svg-icons';
import { TierItem } from '@/db/schema';

interface TheStableProps {
  items: TierItem[];
}

export function TheStable({ items }: TheStableProps) {
  const [isOpen, setIsOpen] = useState(true);

  // Filter for only items that are actually in the stable (unranked)
  // In Phase 3, everything not in a tier should be here.
  const stableItems = items.filter((i) => i.rank === 'unranked');

  return (
    <>
      <div
        className={`transition-all duration-300 ease-in-out w-full ${isOpen ? 'h-48' : 'h-12'}`}
      />

      <aside
        className={`fixed bottom-0 left-0 md:left-64 right-0 z-30 bg-brand-surface border-t border-brand-primary/30 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] transition-all duration-300 ease-in-out ${
          isOpen ? 'translate-y-0' : 'translate-y-[calc(100%-3rem)]'
        }`}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="absolute -top-8 left-1/2 -translate-x-1/2 bg-brand-surface border-t border-l border-r border-brand-primary/30 h-8 px-8 rounded-t-xl text-brand-primary hover:bg-brand-bg transition-colors flex items-center gap-2 text-xs font-bold uppercase tracking-widest cursor-pointer">
          {isOpen ? (
            <FontAwesomeIcon icon={faChevronDown} />
          ) : (
            <FontAwesomeIcon icon={faChevronUp} />
          )}
          The Stable ({stableItems.length})
        </button>

        <div className="h-48 p-6 overflow-x-auto">
          {stableItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-brand-text-muted/30 border-2 border-dashed border-brand-text/5 rounded-xl">
              <FontAwesomeIcon icon={faBoxOpen} className="text-3xl mb-2" />
              <span className="text-sm font-bold uppercase tracking-widest">Stable is Empty</span>
            </div>
          ) : (
            <div className="flex gap-4">
              {stableItems.map((item) => (
                <div
                  key={item.id}
                  className="w-24 h-24 bg-brand-bg border border-brand-text/10 rounded-lg flex-shrink-0 flex items-center justify-center p-2 text-xs text-brand-text-muted hover:border-brand-primary/50 cursor-grab active:cursor-grabbing transition-colors text-center font-bold break-words overflow-hidden">
                  {item.text}
                </div>
              ))}
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
