'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTimes,
  faLayerGroup,
  faTrophy,
  faGavel,
  faPlus,
  faTrash,
  faPalette,
  faExclamationCircle,
  faSave,
} from '@fortawesome/free-solid-svg-icons';
import { v4 as uuidv4 } from 'uuid';
import { db } from '@/db';
import { BoardType, TierBoard, TierItem, TierDefinition } from '@/db/schema';

// --- Types ---
type ModeSelection = BoardType;
interface TierConfig extends TierDefinition {}

// --- Defaults ---
const DEFAULT_TIER_COLORS = ['#c60c30', '#ff6b35', '#f7c548', '#3a86ff', '#8338ec', '#a1a1aa'];
const DEFAULT_TIERS: TierConfig[] = [
  { id: uuidv4(), label: 'S', color: DEFAULT_TIER_COLORS[0] },
  { id: uuidv4(), label: 'A', color: DEFAULT_TIER_COLORS[1] },
  { id: uuidv4(), label: 'B', color: DEFAULT_TIER_COLORS[2] },
  { id: uuidv4(), label: 'C', color: DEFAULT_TIER_COLORS[3] },
  { id: uuidv4(), label: 'D', color: DEFAULT_TIER_COLORS[4] },
  { id: uuidv4(), label: 'F', color: DEFAULT_TIER_COLORS[5] },
];

interface NewHerdModalProps {
  isOpen: boolean;
  onClose: () => void;
  // NEW: Optional props for Edit Mode
  initialBoard?: TierBoard;
}

export function NewHerdModal({ isOpen, onClose, initialBoard }: NewHerdModalProps) {
  const router = useRouter();
  const modalRef = useRef<HTMLDivElement>(null);
  const isEditing = !!initialBoard;

  // --- Form State ---
  const [herdTitle, setHerdTitle] = useState('');
  const [selectedMode, setSelectedMode] = useState<ModeSelection>('tier');
  const [tiers, setTiers] = useState<TierConfig[]>(DEFAULT_TIERS);
  const [stableInput, setStableInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ title?: string; stable?: string }>({});

  // --- Load Initial Data (Edit Mode) ---
  useEffect(() => {
    if (isOpen && initialBoard) {
      setHerdTitle(initialBoard.title);
      setSelectedMode(initialBoard.type);
      if (initialBoard.tiers) {
        setTiers(initialBoard.tiers);
      }
      // Note: We do NOT load existing items into stableInput to avoid data loss.
      // stableInput remains empty for "Add More" functionality.
    } else if (isOpen && !initialBoard) {
      // Reset for Create Mode
      setHerdTitle('');
      setTiers(DEFAULT_TIERS);
      setStableInput('');
    }
  }, [isOpen, initialBoard]);

  // --- Focus Trap ---
  useEffect(() => {
    if (isOpen) {
      modalRef.current?.focus();
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  };

  if (!isOpen) return null;

  // --- Handlers ---
  const handleAddTier = () => {
    const nextColorIndex = tiers.length % DEFAULT_TIER_COLORS.length;
    setTiers([
      ...tiers,
      { id: uuidv4(), label: 'New Tier', color: DEFAULT_TIER_COLORS[nextColorIndex] },
    ]);
  };

  const handleRemoveTier = (idToRemove: string) => {
    if (tiers.length <= 1) return;
    setTiers(tiers.filter((t) => t.id !== idToRemove));
  };

  const handleTierChange = (id: string, field: keyof TierConfig, value: string) => {
    setTiers(tiers.map((t) => (t.id === id ? { ...t, [field]: value } : t)));
  };

  const validate = () => {
    const newErrors: { title?: string; stable?: string } = {};
    const rawItems = stableInput
      .split('\n')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    if (!herdTitle.trim()) newErrors.title = 'Title is required';

    // Only enforce 3 items on creation, not editing (unless they want to add more)
    if (!isEditing && rawItems.length < 3) {
      newErrors.stable = 'Please add at least 3 items to start';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) return;
    setIsSubmitting(true);

    try {
      const rawItems = stableInput
        .split('\n')
        .map((s) => s.trim())
        .filter((s) => s.length > 0);

      if (isEditing && initialBoard && initialBoard.id) {
        // --- UPDATE MODE ---
        await db.transaction('rw', db.boards, db.items, async () => {
          // 1. Update Board
          await db.boards.update(initialBoard.id!, {
            title: herdTitle.trim(),
            tiers: tiers,
            updatedAt: Date.now(),
          });

          // 2. Add NEW items (if any)
          if (rawItems.length > 0) {
            const itemsToAdd: TierItem[] = rawItems.map((text, index) => ({
              boardId: initialBoard.id!,
              text: text,
              rank: 'unranked',
              order: Date.now() + index, // Ensure they go to end
            }));
            await db.items.bulkAdd(itemsToAdd);
          }
        });
        onClose(); // Close modal and stay on page
      } else {
        // --- CREATE MODE ---
        const newBoard: TierBoard = {
          title: herdTitle.trim(),
          type: selectedMode,
          currentTheme: 'modern-tundra',
          createdAt: Date.now(),
          updatedAt: Date.now(),
          isArchived: false,
          tiers: selectedMode === 'tier' ? tiers : undefined,
        };

        const newBoardId = await db.transaction('rw', db.boards, db.items, async () => {
          const boardId = await db.boards.add(newBoard);
          const itemsToAdd: TierItem[] = rawItems.map((text, index) => ({
            boardId: boardId,
            text: text,
            rank: 'unranked',
            order: index,
          }));
          await db.items.bulkAdd(itemsToAdd);
          return boardId;
        });
        router.push(`/editor?id=${newBoardId}`);
      }
    } catch (error) {
      console.error('Failed to save herd:', error);
      alert('Error saving. Check console.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn"
      role="dialog"
      aria-modal="true"
      onKeyDown={handleKeyDown}>
      <div
        ref={modalRef}
        tabIndex={-1}
        className="w-full max-w-2xl max-h-[90vh] bg-brand-surface border border-brand-secondary/20 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-scaleIn outline-none">
        <div className="flex items-center justify-between p-6 border-b border-brand-text/5 bg-brand-bg/50">
          <h2 className="text-xl font-bold text-brand-text">
            {isEditing ? 'Edit Herd Settings' : 'Assemble a New Herd'}
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full text-brand-text-muted hover:text-brand-text hover:bg-brand-text/10 transition-colors cursor-pointer"
            aria-label="Close modal">
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-thin scrollbar-thumb-brand-secondary/50 scrollbar-track-brand-bg">
          {/* Title */}
          <section>
            <label
              htmlFor="herdTitle"
              className="block text-xs font-bold text-brand-text-muted uppercase tracking-wider mb-3 cursor-pointer">
              Herd Title <span className="text-brand-accent">*</span>
            </label>
            <input
              id="herdTitle"
              type="text"
              value={herdTitle}
              onChange={(e) => setHerdTitle(e.target.value)}
              placeholder="e.g. Best N64 Games"
              className={`w-full bg-brand-bg border rounded-lg px-4 py-3 text-brand-text focus:outline-none transition-all font-medium ${
                errors.title
                  ? 'border-brand-accent focus:ring-brand-accent'
                  : 'border-brand-text/10 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary'
              }`}
              autoFocus={!isEditing}
            />
            {errors.title && (
              <p className="text-brand-accent text-xs mt-2 font-bold">
                <FontAwesomeIcon icon={faExclamationCircle} /> {errors.title}
              </p>
            )}
          </section>

          {/* Mode Selection (Locked if Editing) */}
          <section className={isEditing ? 'opacity-50 pointer-events-none grayscale' : ''}>
            <span className="block text-xs font-bold text-brand-text-muted uppercase tracking-wider mb-3">
              Ranking Mode {isEditing && '(Locked)'}
            </span>
            <div className="grid grid-cols-3 gap-4">
              <button
                onClick={() => setSelectedMode('tier')}
                className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                  selectedMode === 'tier'
                    ? 'bg-brand-primary/10 border-brand-primary text-brand-text shadow-[0_0_15px_rgba(0,83,213,0.2)]'
                    : 'bg-brand-bg border-brand-text/10 text-brand-text-muted hover:border-brand-text/30'
                }`}>
                <FontAwesomeIcon
                  icon={faLayerGroup}
                  className={`text-2xl mb-3 ${
                    selectedMode === 'tier' ? 'text-brand-primary' : 'text-brand-text-muted/50'
                  }`}
                />
                <h3 className="font-bold mb-1">Tier List</h3>
              </button>
              {[
                { mode: 'bracket', icon: faTrophy, label: 'Bracket' },
                { mode: 'gauntlet', icon: faGavel, label: 'Gauntlet' },
              ].map((item) => (
                <div
                  key={item.label}
                  className="p-4 rounded-xl border bg-brand-bg/50 border-brand-text/5 text-brand-text-muted/30 cursor-not-allowed relative overflow-hidden grayscale opacity-70">
                  <FontAwesomeIcon icon={item.icon} className="text-2xl mb-3 opacity-50" />
                  <h3 className="font-bold mb-1">{item.label}</h3>
                </div>
              ))}
            </div>
          </section>

          {/* Tier Config */}
          {selectedMode === 'tier' && (
            <section className="animate-fadeIn">
              <div className="flex items-center justify-between mb-3">
                <span className="block text-xs font-bold text-brand-text-muted uppercase tracking-wider">
                  Tier Configuration
                </span>
              </div>
              <div className="space-y-3 mb-4">
                {tiers.map((tier) => (
                  <div
                    key={tier.id}
                    className="flex items-center gap-3 bg-brand-bg p-2 rounded-lg border border-brand-text/5 group focus-within:border-brand-primary/50 transition-colors">
                    <div className="relative w-10 h-10 flex-shrink-0 cursor-pointer hover:scale-105 transition-transform">
                      <input
                        type="color"
                        value={tier.color}
                        onChange={(e) => handleTierChange(tier.id, 'color', e.target.value)}
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
                      />
                      <div
                        className="w-full h-full rounded flex items-center justify-center border border-brand-text/10 shadow-sm"
                        style={{ backgroundColor: tier.color }}>
                        <FontAwesomeIcon
                          icon={faPalette}
                          className="text-brand-bg opacity-0 group-hover:opacity-50 transition-opacity text-sm"
                        />
                      </div>
                    </div>
                    <input
                      type="text"
                      value={tier.label}
                      onChange={(e) => handleTierChange(tier.id, 'label', e.target.value)}
                      className="flex-1 bg-transparent border-none focus:ring-0 text-brand-text font-bold placeholder-brand-text/20"
                      placeholder="Tier Label"
                    />
                    <button
                      onClick={() => handleRemoveTier(tier.id)}
                      disabled={tiers.length <= 1}
                      className={`w-8 h-8 flex items-center justify-center rounded hover:bg-brand-surface transition-colors ${
                        tiers.length <= 1
                          ? 'text-brand-text-muted/20 cursor-not-allowed'
                          : 'text-brand-text-muted hover:text-brand-accent cursor-pointer'
                      }`}>
                      <FontAwesomeIcon icon={faTrash} className="text-sm" />
                    </button>
                  </div>
                ))}
              </div>
              <button
                onClick={handleAddTier}
                className="w-full py-3 bg-brand-surface border border-dashed border-brand-text/20 rounded-lg text-brand-text-muted hover:text-brand-primary hover:border-brand-primary transition-all flex items-center justify-center gap-2 text-sm font-bold tracking-wider uppercase cursor-pointer">
                <FontAwesomeIcon icon={faPlus} /> Add Tier Row
              </button>
            </section>
          )}

          {/* Stable Init / Add More */}
          <section>
            <div className="flex justify-between mb-3">
              <label
                htmlFor="stableInput"
                className="block text-xs font-bold text-brand-text-muted uppercase tracking-wider cursor-pointer">
                {isEditing ? 'Add More Items' : 'Populate the Stable'}{' '}
                <span className={isEditing ? 'hidden' : 'text-brand-accent'}>*</span>
              </label>
              <span
                className={`text-xs font-bold ${
                  stableInput.split('\n').filter((s) => s.trim()).length >= 3
                    ? 'text-brand-primary'
                    : 'text-brand-text-muted'
                }`}>
                {stableInput.split('\n').filter((s) => s.trim()).length}{' '}
                {isEditing ? 'Adding' : '/ 3 Required'}
              </span>
            </div>

            <textarea
              id="stableInput"
              rows={5}
              value={stableInput}
              onChange={(e) => setStableInput(e.target.value)}
              placeholder={
                isEditing
                  ? 'Paste NEW items here to add to your stable...'
                  : 'Paste items here, separated by a new line.\nExample:\nItem 1\nItem 2\nItem 3'
              }
              className={`w-full bg-brand-bg border rounded-lg px-4 py-3 text-brand-text placeholder-brand-text/20 focus:outline-none transition-all resize-y font-mono text-sm leading-relaxed ${
                errors.stable
                  ? 'border-brand-accent focus:ring-brand-accent'
                  : 'border-brand-text/10 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary'
              }`}
            />
            {errors.stable && (
              <p className="text-brand-accent text-xs mt-2 font-bold">
                <FontAwesomeIcon icon={faExclamationCircle} /> {errors.stable}
              </p>
            )}
          </section>
        </div>

        <div className="p-6 border-t border-brand-text/5 bg-brand-bg/50 flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-6 py-3 rounded-lg text-sm font-bold text-brand-text-muted hover:text-brand-text hover:bg-brand-text/5 transition-colors cursor-pointer">
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isSubmitting}
            className="px-8 py-3 bg-brand-primary text-white font-bold rounded-lg transition-all shadow-lg flex items-center gap-2 hover:bg-brand-primary/90 hover:scale-[1.02] shadow-brand-primary/20 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
            {isSubmitting ? (
              <span className="animate-pulse">Saving...</span>
            ) : (
              <>
                <FontAwesomeIcon icon={isEditing ? faSave : faPlus} />{' '}
                {isEditing ? 'Save Changes' : 'Create Herd'}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
