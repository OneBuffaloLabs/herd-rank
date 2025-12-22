'use client';

import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faRankingStar, faClock, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { TierBoard } from '@/db/schema';

// Utility: Relative Time Formatter
function formatTimeAgo(timestamp: number) {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  if (seconds < 60) return 'Just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

interface RecentsDashboardProps {
  boards?: TierBoard[];
  isLoading?: boolean;
}

export function RecentsDashboard({ boards }: RecentsDashboardProps) {
  const hasBoards = boards && boards.length > 0;

  return (
    <section className="px-6 max-w-7xl mx-auto w-full mb-24">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-brand-text flex items-center gap-3">
          <span className="w-1.5 h-6 bg-brand-primary rounded-full"></span>
          {hasBoards ? 'Welcome Back' : 'Ready to start?'}
        </h2>
      </div>

      {!hasBoards ? (
        <div className="bg-brand-surface border border-brand-text/5 rounded-xl p-10 text-center hover:border-brand-primary/50 transition-colors group cursor-pointer">
          <div className="w-16 h-16 bg-brand-bg rounded-full flex items-center justify-center mx-auto mb-4 border border-brand-text/10 group-hover:border-brand-primary transition-colors">
            <FontAwesomeIcon icon={faPlus} className="text-2xl text-brand-primary" />
          </div>
          <h3 className="text-lg font-semibold text-brand-text mb-2">Create your first Herd</h3>
          <p className="text-brand-text-muted mb-0">
            Your stable is empty. Pick a topic and let's go.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {boards.map((board) => (
            <Link
              key={board.id}
              href={`/editor?id=${board.id}`}
              className="group relative bg-brand-surface border border-brand-text/5 hover:border-brand-primary rounded-xl p-5 transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,83,213,0.15)] flex flex-col">
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded bg-brand-bg border border-brand-text/10 flex items-center justify-center text-brand-primary">
                  <FontAwesomeIcon icon={faRankingStar} />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-text-muted bg-brand-bg px-2 py-1 rounded border border-brand-text/5">
                  {board.currentTheme}
                </span>
              </div>

              <h3 className="font-bold text-lg text-brand-text mb-1 truncate group-hover:text-brand-primary transition-colors">
                {board.title}
              </h3>
              <p className="text-xs text-brand-text-muted flex items-center gap-2 mb-4">
                <FontAwesomeIcon icon={faClock} className="w-3 h-3" />
                Edited {formatTimeAgo(board.updatedAt)}
              </p>

              <div className="mt-auto flex items-center text-sm font-bold text-brand-primary opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-[-10px] group-hover:translate-x-0 duration-300">
                Resume <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
