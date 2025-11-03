import React from 'react';
import { CardCategory, CardItem } from '../types';
import { SurpriseMeButtonIcon } from './icons/SurpriseMeButtonIcon';

interface GridScreenProps {
  category: CardCategory;
  onSelectItem: (item: CardItem) => void;
  onBack: () => void;
  onStartRoulette: () => void;
}

const GridScreen: React.FC<GridScreenProps> = ({ category, onSelectItem, onBack, onStartRoulette }) => {
  // Determine the background image based on the category
  const getBackgroundImage = () => {
    switch(category.name) {
      case 'Regions': return '/Images/Clicked/Regions2.png';
      case 'Themes': return '/Images/Clicked/Themes2.png';
      case 'Mood': return '/Images/Clicked/Moods2.png';
      default: return '/Images/Clicked/Regions2.png';
    }
  };

  return (
    <div
      className="relative min-h-screen bg-cover bg-center p-4"
      style={{
        backgroundImage: `url(${getBackgroundImage()})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        imageRendering: '-webkit-optimize-contrast',
        WebkitBackfaceVisibility: 'hidden',
        backfaceVisibility: 'hidden',
        transform: 'translateZ(0)',
        willChange: 'transform'
      }}
    >

      <div className="relative z-10 flex flex-col min-h-screen">
        <header className="relative w-full py-4">
          <button
              onClick={onBack}
              className="px-3 py-1.5 bg-white/20 backdrop-blur-sm border border-white/40 rounded-full text-white hover:bg-white/30 transition-all text-sm font-medium shadow-lg flex items-center gap-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="#166886" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
        </header>

        {/* Grid: Occupies the main space, centered */}
        <main className="flex-grow flex items-center justify-center mt-8 mb-2 px-4">
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6 w-full max-w-5xl">
            {category.items.map((item) => (
              <div key={item.id} className="flex flex-col items-center gap-2">
                <button
                  onClick={() => onSelectItem(item)}
                  className={`aspect-square w-full border-2 rounded-xl overflow-hidden transition-all duration-200
                  bg-slate-50/80 border-slate-200/90 hover:border-[#166886] hover:shadow-xl hover:-translate-y-1 backdrop-blur-sm`}
                >
                  <div className="w-full h-full">{item.icon}</div>
                </button>
                <span className="text-sm md:text-base font-semibold text-black text-center">{item.name}</span>
              </div>
            ))}
          </div>
        </main>

        {/* Footer: Roulette button bottom middle */}
        <footer className="flex justify-center pb-20">
          <button
            onClick={onStartRoulette}
            className="group transition-transform duration-300 ease-in-out hover:scale-105"
          >
            <img
              src="/Images/Buttons/surprise me.png"
              alt="Surprise Me"
              className="group-hover:opacity-90 transition-opacity"
              style={{ height: '70px', width: 'auto' }}
            />
          </button>
        </footer>
      </div>
    </div>
  );
};

export default GridScreen;