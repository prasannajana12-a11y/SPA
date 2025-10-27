import React, { useState, useCallback } from 'react';
import { SpaTab } from './components/SpaTab';
import type { SpaTabData } from './types';

const INITIAL_TABS: SpaTabData[] = [
  { id: 1, label: 'HAPPY', emoji: '😊' },
  { id: 2, label: 'SAD', emoji: '😢' },
  { id: 3, label: 'JUST FINE', emoji: '😐' },
  { id: 4, label: 'BROKEN', emoji: '💔' },
  { id: 5, label: 'SLEEPY', emoji: '😴' },
  { id: 6, label: 'ANGRY', emoji: '😠' },
  { id: 7, label: 'IN LOVE', emoji: '😍' },
  { id: 8, label: 'SURPRISED', emoji: '😮' },
];

const App: React.FC = () => {
  const [tabs, setTabs] = useState<SpaTabData[]>(INITIAL_TABS);

  const handleRemoveTab = useCallback((idToRemove: number) => {
    setTabs(prevTabs => prevTabs.filter(tab => tab.id !== idToRemove));
  }, []);

  const handleReset = () => {
    setTabs(INITIAL_TABS);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-black text-white flex flex-col items-center justify-center p-4 font-sans">
      <div className="w-full max-w-4xl text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-2 text-violet-400 tracking-wider">
          Single Page Application
        </h1>
        <p className="text-gray-400 mb-8">Click an emotion to see it blast away!</p>
        
        <div className="flex flex-wrap items-center justify-center gap-4 mb-12 min-h-[80px]">
          {tabs.map(tab => (
            <SpaTab key={tab.id} data={tab} onRemove={handleRemoveTab} />
          ))}
          {tabs.length === 0 && (
             <p className="text-gray-500 text-xl">All emotions have been blasted!</p>
          )}
        </div>

        <button
          onClick={handleReset}
          className="bg-zinc-700 hover:bg-zinc-800 text-white font-bold py-2 px-6 rounded-lg shadow-lg transition-transform transform hover:scale-105"
        >
          Reset Tabs
        </button>
      </div>
    </div>
  );
};

export default App;