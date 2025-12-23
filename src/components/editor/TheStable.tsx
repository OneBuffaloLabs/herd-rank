'use client';

import { useState } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable';
import { SortableItem } from './dnd/SortableItem'; // Check your import path
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown, faBoxOpen } from '@fortawesome/free-solid-svg-icons';
import { TierItem } from '@/db/schema';

interface TheStableProps {
  items: TierItem[];
}

export function TheStable({ items }: TheStableProps) {
  const [isOpen, setIsOpen] = useState(true);

  // FIX: Stable ID must match what we check in collision strategy ('unranked')
  const { setNodeRef, isOver } = useDroppable({
    id: 'unranked',
  });

  const bgClass = isOver ? 'bg-brand-primary/10 border-brand-primary/30' : 'bg-brand-surface';

  return (
    <>
      <div
        className={`transition-all duration-300 ease-in-out w-full ${isOpen ? 'h-48' : 'h-12'}`}
      />

      <aside
        className={`fixed bottom-0 left-0 md:left-64 right-0 z-30 border-t border-brand-primary/30 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] transition-all duration-300 ease-in-out ${bgClass} ${
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
          The Stable ({items.length})
        </button>

        {/* FIX: Apply setNodeRef here to the FULL container.
           Added 'w-full' and 'h-full' to ensure the droppable area is maximized.
        */}
        <div
          ref={setNodeRef}
          className="h-48 w-full p-6 overflow-x-auto overflow-y-hidden relative">
          <SortableContext items={items.map((i) => i.id!)} strategy={horizontalListSortingStrategy}>
            {items.length === 0 && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-brand-text-muted/30 border-2 border-dashed border-brand-text/5 rounded-xl pointer-events-none m-6">
                <FontAwesomeIcon icon={faBoxOpen} className="text-3xl mb-2" />
                <span className="text-sm font-bold uppercase tracking-widest">Stable is Empty</span>
              </div>
            )}

            {/* Items Container */}
            <div className="flex gap-4 h-full items-center min-w-full">
              {items.map((item) => (
                <SortableItem key={item.id} item={item} renderMode="stable" />
              ))}
            </div>
          </SortableContext>
        </div>
      </aside>
    </>
  );
}
