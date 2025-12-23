import Dexie, { Table } from 'dexie';
import { TierBoard, TierItem } from './schema';

export class HerdRankDB extends Dexie {
  // Strongly typed table definitions
  boards!: Table<TierBoard, number>;
  items!: Table<TierItem, number>;

  constructor() {
    super('HerdRankDB');

    // Schema Declaration
    // ++id: Auto-increment primary key
    // updatedAt: Indexed for sorting recents
    // boardId: Indexed for fetching items by board
    this.version(2).stores({
      boards: '++id, title, type, updatedAt, isArchived',
      items: '++id, boardId, rank',
    });
  }

  /**
   * Fetch the N most recently modified boards.
   * Filters out archived boards automatically.
   */
  async getRecentBoards(limit: number = 4): Promise<TierBoard[]> {
    return this.boards
      .orderBy('updatedAt')
      .reverse() // Newest first
      .filter((board) => !board.isArchived)
      .limit(limit)
      .toArray();
  }
}

// Export a singleton instance of the database
export const db = new HerdRankDB();
