'use client';

import React, { useMemo } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import { SortableItem } from './SortableItem';
import { TierItem, TierDefinition } from '@/db/schema';

interface TierRowProps {
  tier: TierDefinition;
  items: TierItem[];
}

export function TierRow({ tier, items }: TierRowProps) {
  const itemIds = useMemo(() => items.map((i) => i.id!), [items]);

  const { setNodeRef, isOver } = useDroppable({
    id: tier.id,
  });

  const containerClass = isOver
    ? 'bg-brand-primary/10 border-brand-primary/30 ring-2 ring-brand-primary/20'
    : 'bg-brand-surface border-brand-text/5';

  return (
    <div
      ref={setNodeRef}
      className={`flex min-h-32 rounded-xl overflow-hidden shadow-sm transition-colors duration-200 border ${containerClass}`}>
      {/* Tier Label */}
      <div
        className="w-24 md:w-32 flex-shrink-0 flex items-center justify-center text-brand-bg font-black text-3xl md:text-4xl shadow-lg relative z-10 pointer-events-none"
        style={{ backgroundColor: tier.color }}>
        <span className="text-center break-words px-2 drop-shadow-md">{tier.label}</span>
      </div>

      {/* Items Area */}
      <div className="flex-1 p-2 relative">
        <SortableContext items={itemIds} strategy={rectSortingStrategy}>
          {items.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
              <span className="border-2 border-dashed border-brand-text/10 rounded-lg px-6 py-3 text-brand-text-muted/50 text-sm font-bold uppercase tracking-widest">
                Drop Items Here
              </span>
            </div>
          )}

          <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 gap-2 relative z-10">
            {items.map((item) => (
              <SortableItem key={item.id} item={item} renderMode="card" />
            ))}
          </div>
        </SortableContext>
      </div>
    </div>
  );
}
