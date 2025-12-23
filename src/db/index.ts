import Dexie, { Table } from 'dexie';
import { TierBoard, TierItem } from './schema';

export class HerdRankDB extends Dexie {
  boards!: Table<TierBoard, number>;
  items!: Table<TierItem, number>;

  constructor() {
    super('HerdRankDB');

    // Version 3: Adds support for custom 'tiers' field in Board
    this.version(3).stores({
      boards: '++id, title, type, updatedAt, isArchived',
      items: '++id, boardId, rank',
    });
  }

  async getRecentBoards(limit: number = 4): Promise<TierBoard[]> {
    return this.boards
      .orderBy('updatedAt')
      .reverse()
      .filter((board) => !board.isArchived)
      .limit(limit)
      .toArray();
  }
}

export const db = new HerdRankDB();
