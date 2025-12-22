import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShieldHalved, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

export function Hero() {
  return (
    <section className="relative pt-24 pb-20 px-6 text-center overflow-hidden">
      {/* Ambient Gradient */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-ambient opacity-10 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        <div className="mb-8 p-4 bg-brand-surface rounded-full border border-brand-primary/30 shadow-[0_0_30px_rgba(0,83,213,0.2)]">
          <FontAwesomeIcon icon={faShieldHalved} className="text-5xl text-brand-primary" />
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 text-brand-text leading-[1.1]">
          Rank Everything. <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-text">
            Track Nothing.
          </span>
        </h1>

        <p className="text-lg md:text-xl text-brand-text-muted max-w-2xl mb-10 font-light">
          Create tier lists, brackets, and gauntlets instantly. Everything is saved right here on
          your device, so it’s fast, private, and yours forever.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <Link
            href="/editor"
            className="w-full sm:w-auto px-8 py-4 bg-brand-primary hover:bg-brand-primary/90 text-white font-bold rounded-lg transition-transform hover:-translate-y-0.5 flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(0,83,213,0.4)]">
            Start Ranking <FontAwesomeIcon icon={faArrowRight} />
          </Link>
          <a
            href="https://github.com/onebuffalolabs/herd-rank"
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto px-8 py-4 bg-transparent border border-brand-text-muted/30 hover:border-brand-text text-brand-text font-semibold rounded-lg transition-colors flex items-center justify-center gap-2">
            <FontAwesomeIcon icon={faGithub} /> View GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
