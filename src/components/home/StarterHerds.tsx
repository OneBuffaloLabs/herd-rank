import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLayerGroup, faArrowRight, faPlus } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

// Interface for what a Template looks like
export interface Template {
  id: string;
  title: string;
  description: string;
  category: string;
  image?: string;
}

interface StarterHerdsProps {
  templates?: Template[];
}

export function StarterHerds({ templates = [] }: StarterHerdsProps) {
  const hasTemplates = templates.length > 0;

  // GitHub Issue Prefill Logic
  const issueTitle = encodeURIComponent('New Herd Template');
  const issueBody = encodeURIComponent(
    'Template Title: \nDescription: \nCategory: \nImage Link (optional): \n'
  );
  const submitUrl = `https://github.com/OneBuffaloLabs/herd-rank/issues/new?title=${issueTitle}&body=${issueBody}`;

  return (
    <section id="templates" className="px-6 max-w-7xl mx-auto w-full mb-24">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-brand-text">Starter Herds</h2>
          <p className="text-sm text-brand-text-muted mt-1">
            Jumpstart your ranking with these curated templates.
          </p>
        </div>

        <div className="flex items-center gap-4">
          {/* Header Link (Visible if templates exist) */}
          {hasTemplates && (
            <>
              <a
                href={submitUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-brand-primary hover:text-brand-text transition-colors flex items-center gap-2">
                <FontAwesomeIcon icon={faPlus} /> Submit Template
              </a>
              <Link
                href="/templates"
                className="text-sm font-bold text-brand-text hover:text-brand-primary transition-colors flex items-center gap-2">
                View All <FontAwesomeIcon icon={faArrowRight} />
              </Link>
            </>
          )}
        </div>
      </div>

      {!hasTemplates ? (
        // --- Empty State ---
        <div className="w-full bg-brand-surface border border-dashed border-brand-text/10 rounded-xl p-12 text-center">
          <div className="w-16 h-16 bg-brand-bg rounded-full flex items-center justify-center mx-auto mb-4 border border-brand-text/5">
            <FontAwesomeIcon icon={faLayerGroup} className="text-2xl text-brand-text-muted/50" />
          </div>
          <h3 className="text-lg font-bold text-brand-text mb-2">Curating the Collection</h3>
          <p className="text-brand-text-muted max-w-md mx-auto leading-relaxed mb-6">
            We're hand-picking the best community templates to help you start ranking faster. Have a
            great idea for a template? Let us know.
          </p>

          <a
            href={submitUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-brand-primary hover:bg-brand-primary/90 text-white font-bold rounded-lg transition-colors shadow-lg shadow-brand-primary/20">
            <FontAwesomeIcon icon={faGithub} />
            Submit Template
          </a>
        </div>
      ) : (
        // --- Template Grid ---
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {templates.map((template) => (
            <div
              key={template.id}
              className="group flex flex-col bg-brand-surface border border-brand-text/5 rounded-xl overflow-hidden hover:border-brand-primary/50 transition-all cursor-pointer">
              {/* Image/Placeholder */}
              <div className="w-full h-40 bg-brand-bg flex items-center justify-center text-brand-text-muted/30">
                {template.image ? (
                  <img
                    src={template.image}
                    alt={template.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <FontAwesomeIcon icon={faLayerGroup} className="text-4xl" />
                )}
              </div>

              <div className="p-5 flex-1 flex flex-col">
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-primary mb-2">
                  {template.category}
                </span>
                <h3 className="text-lg font-bold text-brand-text mb-2 group-hover:text-brand-primary transition-colors">
                  {template.title}
                </h3>
                <p className="text-sm text-brand-text-muted mb-4 flex-1">{template.description}</p>
                <button className="w-full py-2 bg-brand-bg border border-brand-text/10 rounded text-sm font-bold text-brand-text hover:bg-brand-primary hover:text-white hover:border-brand-primary transition-all">
                  Use Template
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
