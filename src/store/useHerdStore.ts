import { create } from 'zustand';
import { db } from '@/db';
import { TierBoard } from '@/db/schema';

interface HerdState {
  activeBoardId: string | null;
  isLoading: boolean;
  error: string | null;
  setActiveBoard: (id: string | null) => void;
  createBoard: (title: string, theme?: TierBoard['currentTheme']) => Promise<string>;
  loadBoard: (id: string) => Promise<void>;
}

export const useHerdStore = create<HerdState>((set, get) => ({
  activeBoardId: null,
  isLoading: false,
  error: null,

  setActiveBoard: (id) => set({ activeBoardId: id }),

  createBoard: async (title, theme = 'tundra') => {
    set({ isLoading: true, error: null });
    try {
      const newBoard: TierBoard = {
        id: crypto.randomUUID(),
        title,
        currentTheme: theme,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        rows: [
          { id: 'S', label: 'S', color: '#ff7f7f' },
          { id: 'A', label: 'A', color: '#ffbf7f' },
          { id: 'B', label: 'B', color: '#ffff7f' },
          { id: 'C', label: 'C', color: '#7fff7f' },
          { id: 'D', label: 'D', color: '#7f7fff' },
        ],
        itemMapping: {},
        unranked: [],
      };

      await db.saveBoard(newBoard);
      set({ activeBoardId: newBoard.id, isLoading: false });
      return newBoard.id;
    } catch (err) {
      console.error('Failed to create board:', err);
      set({ error: 'Failed to create board', isLoading: false });
      throw err;
    }
  },

  loadBoard: async (id) => {
    // In a LiveQuery pattern, the component fetches the data.
    // The store simply sets the context (active ID).
    // However, we can verify existence here if needed.
    set({ activeBoardId: id });
  },
}));
