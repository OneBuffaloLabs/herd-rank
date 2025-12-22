import Dexie, { type EntityTable } from 'dexie';

export interface TierItem {
  id: string;
  blob: Blob;
  fileName: string;
  type: string; // e.g., 'image/png'
  size: number; // Useful for the "Storage Vault" stats page
}

export interface TierBoard {
  id: string;
  title: string;
  description?: string; // For the Gallery view
  currentTheme: 'tundra' | 'steel' | 'sunset';
  createdAt: number; // Date.now()
  updatedAt: number; // For sorting the "Recent" herd
  thumbnail?: string; // Base64 mini-preview for the Gallery

  // The Workspace
  rows: {
    id: string;
    label: string;
    color: string;
  }[];

  // Mapping of items to their locations
  // Key = Row ID, Value = Array of TierItem IDs
  itemMapping: Record<string, string[]>;

  // The "Stable" (Items uploaded but not ranked)
  unranked: string[];
}

const db = new Dexie('HerdRankDB') as Dexie & {
  boards: EntityTable<TierBoard, 'id'>;
  items: EntityTable<TierItem, 'id'>;
};

// Indexing 'updatedAt' allows for lightning-fast sorting on the Home page
db.version(2).stores({
  boards: 'id, title, updatedAt',
  items: 'id',
});

export { db };
