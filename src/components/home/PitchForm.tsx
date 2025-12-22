'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faBug, faLightbulb, faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';

export function PitchForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // Construct the GitHub URL dynamically based on user input
  const issueBody = `**Description:**\n${description}\n\n*Drafted via HerdRank Landing Page*`;
  const githubUrl = `https://github.com/OneBuffaloLabs/herd-rank/issues/new?title=${encodeURIComponent(
    title
  )}&body=${encodeURIComponent(issueBody)}`;

  const isFormValid = title.trim().length > 0;

  return (
    <section className="px-6 max-w-xl mx-auto w-full mb-32">
      <div className="bg-brand-surface p-8 rounded-2xl border border-brand-text/5 text-center">
        <div className="flex justify-center gap-4 mb-4 text-brand-primary opacity-80">
          <FontAwesomeIcon icon={faBug} className="text-xl" />
          <FontAwesomeIcon icon={faLightbulb} className="text-xl" />
        </div>

        <h2 className="text-2xl font-bold text-brand-text mb-2">Contribute to the Herd</h2>
        <p className="text-brand-text-muted text-sm mb-8">
          Found a bug? Have a feature idea? Draft your issue here and submit it directly to our
          GitHub.
        </p>

        <div className="space-y-4 text-left">
          <div>
            <label className="block text-xs font-bold text-brand-text-muted uppercase tracking-wider mb-2">
              Issue Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Add support for Tier Lists with SSS Rank"
              className="w-full bg-brand-bg border border-brand-text/10 rounded-lg px-4 py-3 text-brand-text placeholder-brand-text/20 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-brand-text-muted uppercase tracking-wider mb-2">
              Details
            </label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the bug or feature..."
              className="w-full bg-brand-bg border border-brand-text/10 rounded-lg px-4 py-3 text-brand-text placeholder-brand-text/20 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all"></textarea>
          </div>

          <a
            href={isFormValid ? githubUrl : '#'}
            target={isFormValid ? '_blank' : undefined}
            rel={isFormValid ? 'noopener noreferrer' : undefined}
            className={`flex items-center justify-center gap-2 w-full py-3 font-bold rounded-lg transition-all shadow-lg ${
              isFormValid
                ? 'bg-brand-primary hover:bg-brand-primary/90 text-white shadow-brand-primary/20 cursor-pointer'
                : 'bg-brand-bg border border-brand-text/5 text-brand-text-muted cursor-not-allowed opacity-50'
            }`}>
            <FontAwesomeIcon icon={faGithub} />
            <span>Draft Issue on GitHub</span>
            {isFormValid && (
              <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="text-xs opacity-70" />
            )}
          </a>

          <p className="text-xs text-center text-brand-text-muted/40 mt-2">
            You will be redirected to GitHub to finalize and submit.
          </p>
        </div>
      </div>
    </section>
  );
}
