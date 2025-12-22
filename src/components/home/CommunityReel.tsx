import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

export function CommunityReel() {
  return (
    <section
      id="community"
      className="w-full bg-brand-surface border-y border-brand-text/5 py-16 mb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-8 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-brand-text">Herds in the Wild</h2>
        <span className="px-3 py-1 bg-brand-accent/20 text-brand-accent border border-brand-accent/30 text-xs font-bold uppercase tracking-wider rounded-full">
          Community
        </span>
      </div>

      <div className="flex gap-6 overflow-x-auto px-6 pb-4 scrollbar-hide snap-x">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="snap-center shrink-0 w-[240px] aspect-[9/16] bg-brand-bg rounded-xl border border-brand-text/10 relative group cursor-pointer hover:border-brand-accent transition-colors overflow-hidden">
            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors z-10">
              <div className="w-12 h-12 bg-brand-accent rounded-full flex items-center justify-center text-white shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                <FontAwesomeIcon icon={faPlay} className="ml-1" />
              </div>
            </div>
            {/* Mock Video UI */}
            <div className="absolute bottom-4 left-4 right-4 z-10">
              <div className="h-3 w-2/3 bg-white/20 rounded mb-2"></div>
              <div className="h-3 w-1/3 bg-white/20 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
