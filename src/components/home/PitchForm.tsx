'use client';

export function PitchForm() {
  return (
    <section className="px-6 max-w-xl mx-auto w-full mb-32">
      <div className="bg-brand-surface p-8 rounded-2xl border border-brand-text/5 text-center">
        <h2 className="text-2xl font-bold text-brand-text mb-2">Got a great idea?</h2>
        <p className="text-brand-text-muted text-sm mb-8">
          Suggest a template for the community to use.
        </p>

        <form className="space-y-4 text-left" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block text-xs font-bold text-brand-text-muted uppercase tracking-wider mb-2">
              Herd Name
            </label>
            <input
              type="text"
              placeholder="e.g. Best Pizza Toppings"
              className="w-full bg-brand-bg border border-brand-text/10 rounded-lg px-4 py-3 text-brand-text placeholder-brand-text/20 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-brand-text-muted uppercase tracking-wider mb-2">
              What's the big idea?
            </label>
            <textarea
              rows={3}
              placeholder="Why does the world need this rank?"
              className="w-full bg-brand-bg border border-brand-text/10 rounded-lg px-4 py-3 text-brand-text placeholder-brand-text/20 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all"></textarea>
          </div>

          {/* Cloudflare Turnstile Placeholder */}
          <div className="h-16 w-full bg-brand-bg border border-brand-text/5 rounded flex items-center justify-center text-xs text-brand-text-muted/50 font-mono">
            [Cloudflare Turnstile]
          </div>

          <button className="w-full py-3 bg-brand-primary hover:bg-brand-primary/90 text-white font-bold rounded-lg transition-colors shadow-lg shadow-brand-primary/20">
            Submit Suggestion
          </button>
        </form>
      </div>
    </section>
  );
}
