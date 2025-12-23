'use client';

import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { TierItem } from '@/db/schema';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGripVertical } from '@fortawesome/free-solid-svg-icons';

interface SortableItemProps {
  item: TierItem;
  renderMode?: 'card' | 'stable';
}

export function SortableItem({ item, renderMode = 'card' }: SortableItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: item.id!,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
    zIndex: isDragging ? 999 : 'auto',
  };

  // STABLE LOOK (Bottom Drawer)
  // Keeps the larger "Card" look for easier identification before ranking
  if (renderMode === 'stable') {
    return (
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="w-24 h-24 bg-brand-bg border border-brand-text/10 rounded-lg flex-shrink-0 flex flex-col items-center justify-center p-2 text-xs text-brand-text-muted hover:border-brand-primary/50 cursor-grab active:cursor-grabbing text-center break-words overflow-hidden relative group touch-none">
        <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-30 transition-opacity">
          <FontAwesomeIcon icon={faGripVertical} />
        </div>
        <span className="line-clamp-3 font-bold">{item.text}</span>
      </div>
    );
  }

  // CARD LOOK (Inside Tier Rows)
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="relative w-full aspect-square bg-brand-bg border border-brand-text/10 rounded-md flex items-center justify-center p-1 shadow-sm hover:border-brand-primary/50 cursor-grab active:cursor-grabbing touch-none group overflow-hidden">
      {/* Smaller text for the smaller grid cells */}
      <span className="text-[10px] sm:text-xs font-bold text-brand-text text-center leading-tight line-clamp-3 break-words">
        {item.text}
      </span>
    </div>
  );
}
