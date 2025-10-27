
import React, { useState, useEffect } from 'react';

interface BlastEffectProps {
  onComplete: () => void;
}

const PARTICLE_COUNT = 12;
const COLORS = ['#8B5CF6', '#A78BFA', '#C4B5FD', '#FBBF24', '#F87171'];

const particleStyles = Array.from({ length: PARTICLE_COUNT }).map((_, i) => {
  const angle = (360 / PARTICLE_COUNT) * i;
  const distance = 80 + Math.random() * 40;
  const color = COLORS[Math.floor(Math.random() * COLORS.length)];
  const size = 8 + Math.random() * 8;
  const duration = 500 + Math.random() * 300;

  return {
    finalTransform: `rotate(${angle}deg) translateX(${distance}px) scale(0)`,
    color,
    size: `${size}px`,
    transition: `transform ${duration}ms cubic-bezier(0.4, 0, 0.2, 1), opacity ${duration}ms ease-out`,
  };
});

export const BlastEffect: React.FC<BlastEffectProps> = ({ onComplete }) => {
  const [isBlasting, setIsBlasting] = useState(false);

  useEffect(() => {
    // Trigger animation shortly after mount to ensure transition is applied
    const startTimer = setTimeout(() => setIsBlasting(true), 50);
    // Call onComplete after animation duration
    const endTimer = setTimeout(onComplete, 800); 

    return () => {
      clearTimeout(startTimer);
      clearTimeout(endTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative w-10 h-10">
      {particleStyles.map((style, i) => (
        <div
          key={i}
          className="absolute top-1/2 left-1/2 rounded-full"
          style={{
            width: style.size,
            height: style.size,
            backgroundColor: style.color,
            transform: isBlasting ? style.finalTransform : 'scale(1)',
            opacity: isBlasting ? 0 : 1,
            transition: style.transition,
            marginLeft: `-${parseFloat(style.size) / 2}px`,
            marginTop: `-${parseFloat(style.size) / 2}px`,
          }}
        />
      ))}
    </div>
  );
};
