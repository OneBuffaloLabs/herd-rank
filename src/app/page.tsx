'use client';

import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/db';
import { useHerdStore } from '@/store/useHerdStore';

export default function TierBoardPage() {
  const { activeBoardId } = useHerdStore();

  // Reactively fetches the board. If activeBoardId changes, this updates.
  // If the DB updates (e.g., item dropped), this re-renders automatically.
  const board = useLiveQuery(
    () => (activeBoardId ? db.boards.get(activeBoardId) : undefined),
    [activeBoardId]
  );

  if (!board) return <div>Loading or Not Found...</div>;

  return <h1>{board.title}</h1>;
}
