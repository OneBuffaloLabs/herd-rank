import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

export function LandingFooter() {
  return (
    <footer className="mt-auto border-t border-brand-ambient/20 bg-brand-bg pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-start gap-8">
        <div className="max-w-sm">
          <h4 className="text-brand-text font-bold text-lg mb-4 flex items-center gap-2">
            <span className="text-brand-primary">OneBuffalo</span>Labs
          </h4>
          <p className="text-sm text-brand-text-muted leading-relaxed mb-6">
            We’re just a small team in Buffalo, NY making apps the old-fashioned way: fast, private,
            and useful. No hidden trackers, no selling your info. Just a great tool for ranking the
            things you love.
          </p>
          <div className="flex items-center gap-2 text-xs text-brand-text-muted/50 font-mono uppercase tracking-widest">
            <span className="w-2 h-2 bg-brand-accent rounded-full"></span>
            Built in Buffalo, NY
          </div>
        </div>

        <div className="flex gap-4">
          <a
            href="https://github.com/onebuffalolabs/herd-rank"
            className="w-10 h-10 rounded bg-brand-surface border border-brand-text/10 flex items-center justify-center text-brand-text hover:bg-brand-primary hover:border-brand-primary transition-colors">
            <FontAwesomeIcon icon={faGithub} />
          </a>
        </div>
      </div>
    </footer>
  );
}
