import { create } from 'zustand';
import { db } from '@/db';
import { TierBoard } from '@/db/schema';

interface HerdState {
  activeBoardId: number | null;
  isLoading: boolean;
  error: string | null;
  setActiveBoard: (id: number | null) => void;
  createBoard: (title: string, theme?: TierBoard['currentTheme']) => Promise<number>;
  loadBoard: (id: number) => Promise<void>;
}

export const useHerdStore = create<HerdState>((set) => ({
  // Fixed: Removed unused 'get'
  activeBoardId: null,
  isLoading: false,
  error: null,

  setActiveBoard: (id) => set({ activeBoardId: id }),

  createBoard: async (title, theme = 'modern-tundra') => {
    set({ isLoading: true, error: null });
    try {
      const newBoard: TierBoard = {
        title,
        type: 'tier', // Default type
        currentTheme: theme,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        isArchived: false,
        tiers: [
          { id: crypto.randomUUID(), label: 'S', color: '#c60c30' },
          { id: crypto.randomUUID(), label: 'A', color: '#ff6b35' },
          { id: crypto.randomUUID(), label: 'B', color: '#f7c548' },
          { id: crypto.randomUUID(), label: 'C', color: '#3a86ff' },
          { id: crypto.randomUUID(), label: 'D', color: '#8338ec' },
          { id: crypto.randomUUID(), label: 'F', color: '#a1a1aa' },
        ],
      };

      // Use the standard Dexie 'add' method which returns the new numeric Key
      const id = await db.boards.add(newBoard);

      set({ activeBoardId: id, isLoading: false });
      return id;
    } catch (err) {
      console.error('Failed to create board:', err);
      set({ error: 'Failed to create board', isLoading: false });
      throw err;
    }
  },

  loadBoard: async (id) => {
    set({ activeBoardId: id });
  },
}));
