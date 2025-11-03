import React from 'react';
import { CardCategory } from '../types';
import { RegionButtonIcon } from './icons/RegionButtonIcon';
import { ThemeButtonIcon } from './icons/ThemeButtonIcon';
import { MoodButtonIcon } from './icons/MoodButtonIcon';
import { SurpriseMeButtonIcon } from './icons/SurpriseMeButtonIcon';

interface CategoryScreenProps {
  categories: CardCategory[];
  onSelect: (category: CardCategory) => void;
  onBack: () => void;
  onSurpriseMe: () => void;
}

const getCategoryIcon = (categoryName: CardCategory['name']) => {
    switch(categoryName) {
        case 'Regions': return <RegionButtonIcon />;
        case 'Themes': return <ThemeButtonIcon />;
        case 'Mood': return <MoodButtonIcon />;
        default: return null;
    }
}

const CategoryScreen: React.FC<CategoryScreenProps> = ({ categories, onSelect, onBack, onSurpriseMe }) => {
  // Use a collage of all category images for the main category selection screen
  // We'll use Regions.png as the default background
  return (
    <div
      className="relative min-h-screen bg-cover bg-center p-4"
      style={{
        backgroundImage: 'url(/Images/Clicked/Selection.png)',
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

        <main className="flex-grow flex flex-col items-center justify-center w-full">
          <div className="flex items-center justify-center space-x-8 md:space-x-16 mb-20">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => onSelect(category)}
                aria-label={`Select ${category.name}`}
                className="group transition-transform duration-300 ease-in-out hover:scale-105"
              >
                {getCategoryIcon(category.name)}
              </button>
            ))}
          </div>

          <button
              onClick={onSurpriseMe}
              aria-label="Surprise Me"
              className="group transition-transform duration-300 ease-in-out hover:scale-105"
          >
              <SurpriseMeButtonIcon />
          </button>
        </main>
      </div>
    </div>
  );
};

export default CategoryScreen;