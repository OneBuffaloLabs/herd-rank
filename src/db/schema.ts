// Define valid board types for the union
export type BoardType = 'tier' | 'bracket' | 'gauntlet';

// Interface for the Board (The container)
export interface TierBoard {
  id?: number; // Auto-incrementing ID
  title: string; // User-defined title (e.g., "Best 90s Movies")
  type: BoardType; // The mode (Tier List vs Bracket)
  currentTheme: string; // Theme ID (e.g., "electric-tundra")
  createdAt: number; // Timestamp
  updatedAt: number; // Timestamp (Used for sorting Recents)
  isArchived?: boolean; // Soft delete flag
}

// Interface for Items (The ranked entities)
export interface TierItem {
  id?: number; // Auto-incrementing ID
  boardId: number; // Foreign Key to TierBoard
  text: string; // Label text
  imageBlob?: Blob; // Binary data for local images (No URLs required)
  rank: string; // Current rank ID (e.g., "S", "A", "trash")
  order: number; // Sort order within the rank
}
