// Define valid board types
export type BoardType = 'tier' | 'bracket' | 'gauntlet';

// NEW: Interface for a single Tier Row definition (Color & Label)
export interface TierDefinition {
  id: string; // UUID for the row
  label: string; // e.g., "S", "God Tier"
  color: string; // Hex code
}

// Updated Board Interface
export interface TierBoard {
  id?: number;
  title: string;
  type: BoardType;
  currentTheme: string;
  createdAt: number;
  updatedAt: number;
  isArchived?: boolean;

  // NEW: Store the custom rows here
  tiers?: TierDefinition[];
}

// Interface for Items (unchanged)
export interface TierItem {
  id?: number;
  boardId: number;
  text: string;
  imageBlob?: Blob;
  rank: string; // Will match the 'id' from TierDefinition
  order: number;
}
