import React, { useState, useEffect } from 'react';
import type { SpaTabData } from '../types';
import { BlastEffect } from './BlastEffect';

interface SpaTabProps {
  data: SpaTabData;
  onRemove: (id: number) => void;
}

type Stage = 'idle' | 'active' | 'blasting';

export const SpaTab: React.FC<SpaTabProps> = ({ data, onRemove }) => {
  const [stage, setStage] = useState<Stage>('idle');

  useEffect(() => {
    if (stage === 'active') {
      const timer = setTimeout(() => {
        setStage('blasting');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [stage]);

  const handleBlastComplete = () => {
    onRemove(data.id);
  };

  const handleClick = () => {
    if (stage === 'idle') {
      setStage('active');
    }
  };

  const renderContent = () => {
    switch (stage) {
      case 'idle':
        return (
          <button
            onClick={handleClick}
            className="w-32 h-12 bg-violet-600 text-white font-semibold rounded-full shadow-md hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-opacity-75 transition-all duration-300 transform hover:scale-105"
            aria-label={`Show ${data.label} emotion`}
          >
            {data.label}
          </button>
        );
      case 'active':
        return (
          <div className="w-32 h-32 flex items-center justify-center bg-gray-800 rounded-xl shadow-lg animate-pulse">
            <span className="text-6xl" role="img" aria-label={data.label}>{data.emoji}</span>
          </div>
        );
      case 'blasting':
        return (
          <div className="w-32 h-32 flex items-center justify-center">
            <BlastEffect onComplete={handleBlastComplete} />
          </div>
        );
      default:
        return null;
    }
  };

  return <div className="perspective-1000">{renderContent()}</div>;
};