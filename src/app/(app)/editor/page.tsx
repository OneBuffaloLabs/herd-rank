'use client';

import React, { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/db';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faShareNodes, faSpinner, faGear } from '@fortawesome/free-solid-svg-icons';

// Component Imports
import { TheStable } from '@/components/editor/TheStable';
import { NewHerdModal } from '@/components/editor/NewHerdModal';

export default function EditorPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const boardId = searchParams.get('id');
  const numericId = boardId ? parseInt(boardId, 10) : undefined;

  // Modal State
  const [showEditModal, setShowEditModal] = useState(false);

  // Fetch Data
  const board = useLiveQuery(() => (numericId ? db.boards.get(numericId) : undefined), [numericId]);

  const items =
    useLiveQuery(
      () => (numericId ? db.items.where('boardId').equals(numericId).toArray() : []),
      [numericId]
    ) || [];

  const isCreatingNew = !boardId;
  const isLoading = !!boardId && !board;

  const isModalOpen = isCreatingNew || showEditModal;

  const handleCloseModal = () => {
    if (isCreatingNew) {
      router.push('/');
    } else {
      setShowEditModal(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-bg flex flex-col relative">
      <NewHerdModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        initialBoard={showEditModal ? board : undefined}
        // NEW: Pass items to the modal for editing
        initialItems={showEditModal ? items : undefined}
      />

      {/* Header */}
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
              className="w-10 h-10 bg-brand-surface border border-brand-text/10 rounded-lg text-brand-text-muted hover:text-brand-text hover:border-brand-primary hover:bg-brand-primary/10 transition-all flex items-center justify-center cursor-pointer"
              title="Herd Settings">
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

      {/* Main Canvas */}
      <main
        className={`flex-1 p-4 md:p-8 space-y-4 overflow-y-auto transition-opacity duration-500 ${
          isCreatingNew || isLoading ? 'opacity-20 blur-sm pointer-events-none' : 'opacity-100'
        }`}>
        {board?.tiers?.map((tier) => (
          <div
            key={tier.id}
            className="flex min-h-[120px] bg-brand-surface border border-brand-text/5 rounded-xl overflow-hidden shadow-sm">
            <div
              className="w-24 md:w-32 flex-shrink-0 flex items-center justify-center text-brand-bg font-black text-3xl md:text-4xl shadow-lg relative"
              style={{ backgroundColor: tier.color }}>
              <span className="text-center break-words px-2 drop-shadow-md">{tier.label}</span>
            </div>

            <div className="flex-1 p-4 flex items-center justify-center border-l border-black/10">
              <div className="w-full h-full border-2 border-dashed border-brand-text/5 rounded-lg flex items-center justify-center text-brand-text-muted/20 text-sm font-bold uppercase tracking-widest">
                Drop {tier.label} Items Here
              </div>
            </div>
          </div>
        ))}

        {board && (!board.tiers || board.tiers.length === 0) && (
          <div className="p-12 text-center text-brand-text-muted">
            No tiers configured for this herd.
          </div>
        )}
      </main>

      <TheStable items={items} />
    </div>
  );
}
