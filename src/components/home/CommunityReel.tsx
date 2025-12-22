import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faVideo, faPlus } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

// Import data directly (ensure src/data/community-reels.json exists)
import reelsData from '@/data/community-reels.json';

interface CommunityReel {
  id: string;
  thumbnail: string;
  link: string;
  author: string;
}

export function CommunityReel() {
  const reels: CommunityReel[] = reelsData as CommunityReel[];
  const hasReels = reels.length > 0;

  // GitHub Issue Prefill Logic
  const issueTitle = encodeURIComponent('New Community Reel');
  const issueBody = encodeURIComponent('Reel Link: \n\nMore info: ');
  const submitUrl = `https://github.com/OneBuffaloLabs/herd-rank/issues/new?title=${issueTitle}&body=${issueBody}`;

  return (
    <section
      id="community"
      className="w-full bg-brand-surface border-y border-brand-text/5 py-16 mb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-8 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-brand-text">Herds in the Wild</h2>

        <div className="flex items-center gap-4">
          {hasReels && (
            <a
              href={submitUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-brand-primary hover:text-brand-text transition-colors flex items-center gap-2">
              <FontAwesomeIcon icon={faPlus} /> Submit Reel
            </a>
          )}
          <span className="px-3 py-1 bg-brand-accent/20 text-brand-accent border border-brand-accent/30 text-xs font-bold uppercase tracking-wider rounded-full">
            Community
          </span>
        </div>
      </div>

      {!hasReels ? (
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-brand-bg/50 border border-dashed border-brand-text/10 rounded-xl p-12 text-center">
            <div className="w-16 h-16 bg-brand-bg rounded-full flex items-center justify-center mx-auto mb-4 border border-brand-text/5">
              <FontAwesomeIcon icon={faVideo} className="text-2xl text-brand-text-muted/50" />
            </div>

            <h3 className="text-lg font-bold text-brand-text mb-2">Community Reels Coming Soon</h3>
            <p className="text-brand-text-muted max-w-md mx-auto leading-relaxed mb-6">
              We&apos;re waiting for the first herds to be spotted in the wild. Show us how you use
              HerdRank and get featured here.
            </p>

            <a
              href={submitUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-brand-primary hover:bg-brand-primary/90 text-white font-bold rounded-lg transition-colors shadow-lg shadow-brand-primary/20">
              <FontAwesomeIcon icon={faGithub} />
              Submit a Reel
            </a>
          </div>
        </div>
      ) : (
        <div className="flex gap-6 overflow-x-auto px-6 pb-4 scrollbar-hide snap-x">
          {reels.map((reel) => (
            <Link
              key={reel.id}
              href={reel.link}
              target="_blank"
              className="snap-center shrink-0 w-[240px] aspect-[9/16] bg-brand-bg rounded-xl border border-brand-text/10 relative group cursor-pointer hover:border-brand-accent transition-colors overflow-hidden">
              <Image
                src={reel.thumbnail}
                alt={`Reel by ${reel.author}`}
                fill
                className="object-cover opacity-60 group-hover:opacity-80 transition-opacity"
                sizes="240px"
              />

              <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors z-10">
                <div className="w-12 h-12 bg-brand-accent rounded-full flex items-center justify-center text-white shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                  <FontAwesomeIcon icon={faPlay} className="ml-1" />
                </div>
              </div>

              <div className="absolute bottom-4 left-4 right-4 z-10">
                <p className="text-xs font-bold text-white shadow-black drop-shadow-md">
                  @{reel.author}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
