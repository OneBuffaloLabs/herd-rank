import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBolt, faLayerGroup, faGavel, faStopwatch } from '@fortawesome/free-solid-svg-icons';

export function FeatureGrid() {
  const features = [
    {
      icon: faBolt,
      title: 'Your Data, Your Device',
      desc: 'Everything is stored in your browser. We never see what you rank.',
    },
    {
      icon: faLayerGroup,
      title: 'Rank Any Way You Want',
      desc: 'Switch between Tier Lists, Brackets, and Gauntlets instantly.',
    },
    {
      icon: faGavel,
      title: 'Settle the Debate',
      desc: "Can't decide? Use Gauntlet mode for 1v1 comparisons.",
    },
    {
      icon: faStopwatch,
      title: "Blink and It's Done",
      desc: 'No loading screens. No accounts. Just instant speed.',
    },
  ];

  return (
    <section id="features" className="px-6 max-w-7xl mx-auto w-full mb-24">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {features.map((feature, i) => (
          <div
            key={i}
            className="p-6 rounded-xl border border-brand-text/5 bg-transparent hover:bg-brand-surface transition-colors group">
            <FontAwesomeIcon
              icon={feature.icon}
              className="text-2xl text-brand-primary mb-4 group-hover:scale-110 transition-transform"
            />
            <h3 className="text-lg font-bold text-brand-text mb-2">{feature.title}</h3>
            <p className="text-sm text-brand-text-muted leading-relaxed">{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
