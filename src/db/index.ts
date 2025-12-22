import Dexie, { type EntityTable } from 'dexie';
import { TierBoard, TierItem } from './schema';

export class HerdDatabase extends Dexie {
  boards!: EntityTable<TierBoard, 'id'>;
  items!: EntityTable<TierItem, 'id'>;

  constructor() {
    super('HerdRankDB');

    this.version(2).stores({
      boards: 'id, title, updatedAt',
      items: 'id',
    });
  }

  // --- CRUD Operations ---

  /**
   * Creates or updates a board in the database.
   * Updates 'updatedAt' to now.
   */
  async saveBoard(board: TierBoard): Promise<string> {
    const updatedBoard = {
      ...board,
      updatedAt: Date.now(),
    };
    await this.boards.put(updatedBoard);
    return updatedBoard.id;
  }

  /**
   * Retrieves the 'limit' most recently modified boards.
   * Used for the "State-Aware" Homepage.
   */
  async getRecentBoards(limit: number = 4): Promise<TierBoard[]> {
    return this.boards.orderBy('updatedAt').reverse().limit(limit).toArray();
  }

  /**
   * Deletes a board and permanently removes its associated images/blobs.
   * This prevents "zombie" images from filling up the user's storage quota.
   */
  async deleteBoard(boardId: string): Promise<void> {
    await this.transaction('rw', this.boards, this.items, async () => {
      // 1. Fetch the board to find which items belong to it
      const board = await this.boards.get(boardId);

      if (board) {
        // 2. Gather all Item IDs (from the rows and the unranked "stable")
        const mappedItemIds = Object.values(board.itemMapping).flat();
        const unrankedItemIds = board.unranked;
        const allItemIds = [...mappedItemIds, ...unrankedItemIds];

        // 3. Delete the items first
        if (allItemIds.length > 0) {
          await this.items.bulkDelete(allItemIds);
        }
      }

      // 4. Finally, delete the board
      await this.boards.delete(boardId);
    });
  }

  /**
   * Bulk add images (Blobs) to the database.
   * Returns an array of created TierItem objects.
   */
  async addImages(files: File[]): Promise<TierItem[]> {
    const newItems: TierItem[] = files.map((file) => ({
      id: crypto.randomUUID(),
      blob: file,
      fileName: file.name,
      type: file.type,
      size: file.size,
    }));

    await this.items.bulkAdd(newItems);
    return newItems;
  }
}

// Export Singleton Instance
export const db = new HerdDatabase();
