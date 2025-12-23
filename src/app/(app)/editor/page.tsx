'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/db';
import { TierItem } from '@/db/schema';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faShareNodes, faSpinner, faGear } from '@fortawesome/free-solid-svg-icons';

// DND Imports
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragOverEvent,
  DragEndEvent,
  pointerWithin,
  CollisionDetection,
  getFirstCollision,
  rectIntersection,
} from '@dnd-kit/core';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';

// Component Imports
import { TheStable } from '@/components/editor/TheStable';
import { NewHerdModal } from '@/components/editor/NewHerdModal';
import { TierRow } from '@/components/editor/dnd/TierRow';
import { SortableItem } from '@/components/editor/dnd/SortableItem';

export default function EditorPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const boardId = searchParams.get('id');
  const numericId = boardId ? parseInt(boardId, 10) : undefined;

  // --- Data Fetching ---
  const board = useLiveQuery(() => (numericId ? db.boards.get(numericId) : undefined), [numericId]);

  const dbItems = useLiveQuery(
    () => (numericId ? db.items.where('boardId').equals(numericId).toArray() : []),
    [numericId]
  );

  // --- Local State for DND ---
  const [items, setItems] = useState<TierItem[]>([]);
  const [activeId, setActiveId] = useState<number | null>(null);

  // Sync DB -> Local State
  useEffect(() => {
    if (dbItems && !activeId) {
      const sorted = [...dbItems].sort((a, b) => a.order - b.order);

      setItems((prev) => {
        // Only update if the data is actually different
        if (JSON.stringify(prev) === JSON.stringify(sorted)) {
          return prev;
        }
        return sorted;
      });
    }
  }, [dbItems, activeId]);

  // --- DND Sensors ---
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // --- Custom Collision Strategy ---
  const customCollisionStrategy: CollisionDetection = useCallback(
    (args) => {
      // 1. First, define which container the pointer is visually inside.
      //    'pointerWithin' is pixel-perfect for "am I inside the box?"
      const pointerCollisions = pointerWithin(args);
      const containerCollision = pointerCollisions.find(
        (c) =>
          // We look for our known container IDs (Tier IDs are numbers/uuids, 'unranked' is stable)
          // Note: In dnd-kit, collisions include both draggable items and droppable containers.
          // We want to find the collision that matches a Container ID.
          c.id === 'unranked' || board?.tiers?.some((t) => t.id === c.id)
      );

      // 2. If we are not inside any valid container (e.g. outside the layout), return nothing.
      if (!containerCollision) {
        return [];
      }

      // 3. We are inside a container (e.g., "Tier S").
      //    Now we want to find the closest item *inside that container* for sorting.
      const cornersCollisions = closestCorners(args);

      // Filter closestCorners to ONLY include items that belong to this specific container.
      // This prevents items from the row above/below "stealing" the focus.
      const validItemCollisions = cornersCollisions.filter((c) => {
        const item = items.find((i) => i.id === c.id);
        if (!item) return false; // Collision was a container, not an item

        // Crucial Check: Is this item actually in the container we are hovering?
        const currentContainerId = item.rank;
        return currentContainerId === containerCollision.id;
      });

      // 4. Return result:
      //    If we are over specific items in this container, return them (so we can insert between them).
      //    If we aren't over items (e.g. empty space in the row), return the Container ID itself.
      if (validItemCollisions.length > 0) {
        return validItemCollisions;
      }

      return [containerCollision];
    },
    [items, board]
  );

  // --- Group Items ---
  const itemsByContainer = useMemo(() => {
    const groups: Record<string, TierItem[]> = {};
    if (board?.tiers) {
      board.tiers.forEach((t) => (groups[t.id] = []));
    }
    groups['unranked'] = [];

    items.forEach((item) => {
      const container = item.rank;
      if (groups[container]) {
        groups[container].push(item);
      } else {
        // Fallback for items with invalid ranks
        groups['unranked'].push(item);
      }
    });
    return groups;
  }, [items, board]);

  // --- Handlers ---

  function handleDragStart(event: DragStartEvent) {
    const { active } = event;
    setActiveId(active.id as number);
  }

  function handleDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    // Find dragging item
    const activeItem = items.find((i) => i.id === activeId);
    if (!activeItem) return;

    // Find dropped target (could be item or container)
    const overItem = items.find((i) => i.id === overId);

    // Resolve Container IDs
    const activeContainer = activeItem.rank;
    const overContainer = overItem ? overItem.rank : (overId as string);

    if (activeContainer !== overContainer) {
      setItems((prev) => {
        const activeIndex = prev.findIndex((i) => i.id === activeId);
        const overIndex = prev.findIndex((i) => i.id === overId);

        let newItems = [...prev];
        const movedItem = newItems[activeIndex];

        // 1. Update Rank
        movedItem.rank = overContainer;

        // 2. Move in Array
        // If dropping on empty container, overIndex is -1.
        // We just leave it at activeIndex (rank update moves it visually to new group)
        if (overIndex !== -1) {
          newItems = arrayMove(newItems, activeIndex, overIndex);
        } else {
          // Optional: Move to end of array to ensure stable sort order in new group
          // newItems.push(newItems.splice(activeIndex, 1)[0]);
        }

        return newItems;
      });
    }
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    const activeId = active.id;
    const overId = over?.id;

    const activeItem = items.find((i) => i.id === activeId);
    if (!activeItem || !overId) {
      setActiveId(null);
      return;
    }

    const overItem = items.find((i) => i.id === overId);
    const overContainer = overItem ? overItem.rank : (overId as string);

    // Force Rank Update
    activeItem.rank = overContainer;

    // Reorder Calculation
    const activeIndex = items.findIndex((i) => i.id === activeId);
    const overIndex = items.findIndex((i) => i.id === overId);

    let newItems = [...items];

    if (overIndex !== -1 && activeIndex !== -1) {
      newItems = arrayMove(newItems, activeIndex, overIndex);
    }

    // Normalize 'order' property for DB
    const updates = newItems.map((item, index) => ({
      ...item,
      order: index,
    }));

    setItems(newItems);

    db.transaction('rw', db.items, async () => {
      await db.items.bulkPut(updates);
    });

    setActiveId(null);
  }

  // --- Render Helpers ---
  const activeItemData = activeId ? items.find((i) => i.id === activeId) : null;
  const isCreatingNew = !boardId;
  const isLoading = !!boardId && !board;

  const [showEditModal, setShowEditModal] = useState(false);
  const isModalOpen = isCreatingNew || showEditModal;
  const handleCloseModal = () => (isCreatingNew ? router.push('/') : setShowEditModal(false));

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={customCollisionStrategy}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}>
      <div className="min-h-screen bg-brand-bg flex flex-col relative overflow-hidden">
        <NewHerdModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          initialBoard={showEditModal ? board : undefined}
          initialItems={showEditModal ? dbItems || [] : undefined}
        />

        <header className="sticky top-0 z-20 bg-brand-bg/95 backdrop-blur border-b border-brand-text/5 px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-brand-text flex items-center gap-3">
              {isLoading ? (
                <span className="flex items-center gap-2 text-brand-text-muted animate-pulse">
                  <FontAwesomeIcon icon={faSpinner} spin /> Loading...
                </span>
              ) : (
                board?.title || 'Untitled Herd'
              )}
            </h1>
            <p className="text-xs text-brand-text-muted font-mono mt-1">
              {board ? 'AUTO-SAVED LOCALLY' : 'SETUP MODE'}
            </p>
          </div>

          <div className="flex gap-3">
            {!isCreatingNew && (
              <button
                onClick={() => setShowEditModal(true)}
                className="w-10 h-10 bg-brand-surface border border-brand-text/10 rounded-lg text-brand-text-muted hover:text-brand-text hover:border-brand-primary hover:bg-brand-primary/10 transition-all flex items-center justify-center cursor-pointer">
                <FontAwesomeIcon icon={faGear} />
              </button>
            )}
            <button className="px-4 py-2 bg-brand-surface border border-brand-text/10 rounded-lg text-sm font-bold text-brand-text hover:bg-brand-primary hover:text-white hover:border-brand-primary transition-all flex items-center gap-2 cursor-pointer">
              <FontAwesomeIcon icon={faSave} />
              <span className="hidden sm:inline">Export</span>
            </button>
            <button className="px-4 py-2 bg-brand-primary text-white rounded-lg text-sm font-bold hover:bg-brand-primary/90 transition-all shadow-[0_0_15px_rgba(0,83,213,0.3)] flex items-center gap-2 cursor-pointer">
              <FontAwesomeIcon icon={faShareNodes} />
              <span className="hidden sm:inline">Share</span>
            </button>
          </div>
        </header>

        <main
          className={`flex-1 p-4 md:p-8 space-y-4 overflow-y-auto transition-opacity duration-500 ${
            isCreatingNew || isLoading ? 'opacity-20 blur-sm pointer-events-none' : 'opacity-100'
          }`}>
          {board?.tiers?.map((tier) => (
            <TierRow key={tier.id} tier={tier} items={itemsByContainer[tier.id] || []} />
          ))}

          {board && (!board.tiers || board.tiers.length === 0) && (
            <div className="p-12 text-center text-brand-text-muted">
              No tiers configured for this herd.
            </div>
          )}
        </main>

        <TheStable items={itemsByContainer['unranked'] || []} />

        <DragOverlay>
          {activeItemData ? (
            <div className="opacity-90 rotate-3 scale-105 cursor-grabbing">
              <SortableItem
                item={activeItemData}
                renderMode={activeItemData.rank === 'unranked' ? 'stable' : 'card'}
              />
            </div>
          ) : null}
        </DragOverlay>
      </div>
    </DndContext>
  );
}
