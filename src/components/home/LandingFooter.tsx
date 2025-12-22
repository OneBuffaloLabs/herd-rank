import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

export function LandingFooter() {
  return (
    <footer className="mt-auto border-t border-brand-ambient/20 bg-brand-bg pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-start gap-10">
        {/* Left: Project Branding */}
        <div className="max-w-sm">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-6 bg-brand-primary rounded flex items-center justify-center text-white text-xs font-bold shadow-[0_0_10px_var(--color-brand-primary)]">
              H
            </div>
            <h4 className="text-brand-text font-bold text-lg tracking-tight">HerdRank</h4>
          </div>

          <p className="text-sm text-brand-text-muted leading-relaxed mb-6">
            The privacy-first competitive ranking engine. Create tier lists, brackets, and gauntlets
            without leaving your browser.
          </p>

          <div className="text-sm text-brand-text-muted">
            Built by{' '}
            <a
              href="https://onebuffalolabs.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-primary hover:text-brand-text transition-colors font-medium">
              OneBuffaloLabs
            </a>
          </div>

          <div className="mt-2 flex items-center gap-2 text-xs text-brand-text-muted/50 font-mono uppercase tracking-widest">
            <span className="w-1.5 h-1.5 bg-brand-accent rounded-full"></span>
            Buffalo, NY
          </div>
        </div>

        {/* Right: Navigation Links */}
        <div className="flex flex-col md:items-end gap-6">
          <nav className="flex flex-wrap items-center gap-6 text-sm font-medium text-brand-text-muted">
            <Link href="/privacy" className="hover:text-brand-text transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-brand-text transition-colors">
              Terms of Service
            </Link>
          </nav>

          <div className="flex gap-4">
            <a
              href="https://github.com/onebuffalolabs/herd-rank"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Repository"
              className="w-10 h-10 rounded bg-brand-surface border border-brand-text/10 flex items-center justify-center text-brand-text hover:bg-brand-primary hover:border-brand-primary transition-colors">
              <FontAwesomeIcon icon={faGithub} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
