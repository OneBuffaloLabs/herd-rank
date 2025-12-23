'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandPointer, faGavel, faTrophy, faGear } from '@fortawesome/free-solid-svg-icons';

type EditorMode = 'manual' | 'gauntlet' | 'bracket';

interface ControlHubProps {
  currentMode: EditorMode;
  onModeChange: (mode: EditorMode) => void;
}

export function ControlHub({ currentMode, onModeChange }: ControlHubProps) {
  const getButtonClass = (mode: EditorMode) => {
    const baseClass =
      'flex flex-col items-center justify-center w-16 h-16 rounded-xl transition-all duration-200 border';
    const activeClass =
      'bg-brand-primary text-white border-brand-primary shadow-[0_0_15px_var(--color-brand-primary)] translate-y-[-4px]';
    const inactiveClass =
      'bg-brand-surface text-brand-text-muted border-brand-text/10 hover:bg-brand-bg hover:text-brand-text';

    return `${baseClass} ${currentMode === mode ? activeClass : inactiveClass}`;
  };

  return (
    <div className="fixed bottom-32 right-6 z-40 flex flex-col gap-4">
      {/* Mode Switcher Group */}
      <div className="bg-brand-surface/90 backdrop-blur-md p-2 rounded-2xl border border-brand-text/10 shadow-2xl flex flex-col gap-2">
        <button
          onClick={() => onModeChange('manual')}
          className={getButtonClass('manual')}
          title="Manual Drag & Drop">
          <FontAwesomeIcon icon={faHandPointer} className="text-xl mb-1" />
          <span className="text-[10px] font-bold uppercase tracking-wider">Drag</span>
        </button>

        <button
          onClick={() => onModeChange('gauntlet')}
          className={getButtonClass('gauntlet')}
          title="Gauntlet Mode (1v1)">
          <FontAwesomeIcon icon={faGavel} className="text-xl mb-1" />
          <span className="text-[10px] font-bold uppercase tracking-wider">Judge</span>
        </button>

        <button
          onClick={() => onModeChange('bracket')}
          className={getButtonClass('bracket')}
          title="Tournament Bracket">
          <FontAwesomeIcon icon={faTrophy} className="text-xl mb-1" />
          <span className="text-[10px] font-bold uppercase tracking-wider">Cup</span>
        </button>
      </div>

      {/* Settings Toggle */}
      <button className="w-12 h-12 rounded-full bg-brand-bg border border-brand-text/10 text-brand-text-muted hover:text-brand-primary hover:border-brand-primary flex items-center justify-center shadow-lg transition-colors mx-auto">
        <FontAwesomeIcon icon={faGear} />
      </button>
    </div>
  );
}
