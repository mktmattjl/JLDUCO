import React, { useState, useEffect, useContext } from 'react';
import { CardItem } from '../types';
import { generateItemDescription } from '../services/geminiService';
import { AppContext } from '../App';

interface DetailScreenProps {
  item: CardItem;
  onBack: () => void;
}

const DetailScreen: React.FC<DetailScreenProps> = ({ item, onBack }) => {
  const [description, setDescription] = useState<string | null>(null);
  const context = useContext(AppContext);

  // Function to get the background image based on category and item name
  const getBackgroundImage = () => {
    if (!context?.currentCategory?.name) return '/Images/Clicked/Selection.png';

    const categoryName = context.currentCategory.name;
    const itemName = item.name;

    // Map category names to folder names
    const folderMap: { [key: string]: string } = {
      'Regions': 'REGIONS',
      'Themes': 'THEME',
      'Mood': 'MOOD'
    };

    const folder = folderMap[categoryName];
    if (!folder) return '/Images/Clicked/Selection.png';

    // Create mapping for special cases with extensions
    const nameMapping: { [key: string]: string } = {
      // Regions
      'Paris': 'PARIS.jpg',
      'French Riviera & Provence': 'PROVENCE.jpg',
      'Loire Valley': 'LOIRE VALLEY.jpg',
      'Bordeaux Region': 'BORDEAUX.jpg',
      'Burgundy': 'BURGUNDY.jpg',
      'Alsace': 'ALSACE.jpg',
      'Champagne': 'CHAMPAGNE.jpg',
      'Normandy & Brittany': 'NORMANDY.jpg',
      'Rhone Valley / Lyon': 'RHONE VALLEY.jpg',
      'Dordogne': 'DORDOGNE.jpg',
      'French Alps': 'FRENCH ALPS.jpg',
      'Corsica': 'CORSICA.jpg',

      // Themes
      'Adrenaline': 'ADRENALINE.jpg',
      'Alpine adventures': 'ALPINE ADVENTURES.jpg',
      'Art & culture': 'ART AND CULTURE.png',
      'Craftsmanship': 'CRAFTSMANSHIP.jpeg',
      'Fashion': 'FASHION.jpg',
      'Gastronomy': 'GASTRONOMY.jpeg',
      'Historic footsteps': 'HISTORIC FOOTSTEPS.jpg',
      'Quiet sanctuaries': 'QUIET SANCTUARIES2.jpg',
      'Romantic escapes': 'ROMANTIC ESCAPE.jpg',
      'Wellness': 'WELLNESS.jpg',
      'Wine & Champagne': 'WINE AND CHAMPAGNE.jpg',
      'Yachting': 'YACHTING.jpeg',

      // Moods
      'The Night You Felt Famous': 'NIGHT FAMOUS.jpg',
      'The Taste You\'ll Chase Forever': 'TASTE FOREVER.jpg',
      'The Stranger Who Knew Your Name': 'FEELING HOME.jpg',
      'The Sun That Stayed Up Too Late': 'SUN STAYED UP LATE.jpg',
      'The Vineyard That Shared Its Secret': 'VINEYARD SECRET.jpeg',
      'The Moment the Music Found You': 'MUSIC FOUND YOU.jpg',
      'A Place Only You Were Meant to See': 'PLACE ONLY YOU WERE MEANT TO SEE.jpg',
      'Where the Map Was Finally Wrong': 'WHERE THE MAP WAS FINALLY WRONG.jpg',
      'The Art That Looked Back': 'THE ART THAT LOOKED BACK.jpg',
      'The Key to a Door No One Uses': 'THE KEY TO DOOR NO ONE USES.jpeg',
      'The Invitation Sent a Century Ago': 'THE INVITATION SENT A CENTURY AGO.jpeg',
      'First Kiss Energy': 'FIRST KISS ENERGY.jpg'
    };

    // Get the mapped filename with extension
    const fileName = nameMapping[itemName];

    if (fileName) {
      // URL encode the filename to handle spaces and special characters
      const encodedFileName = encodeURIComponent(fileName).replace(/%2F/g, '/');
      return `/Images/Clicked/${folder}/${encodedFileName}`;
    }

    // Fallback to default
    return '/Images/Clicked/Selection.png';
  };

  useEffect(() => {
    const fetchDescription = async () => {
      if (!context?.currentCategory?.name) return;
      const fetchedDescription = await generateItemDescription(item.name, context.currentCategory.name);
      setDescription(fetchedDescription);
    };

    // Reset description on item change
    setDescription(null);
    fetchDescription();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item, context?.currentCategory?.name]);

  return (
    <div className="relative w-full h-screen text-white overflow-hidden">
      <div className="absolute inset-0">
        <div
          style={{
            backgroundImage: `url(${getBackgroundImage()})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            imageRendering: 'high-quality',
            WebkitBackfaceVisibility: 'hidden',
            backfaceVisibility: 'hidden'
          }}
          className="w-full h-full bg-cover bg-center ken-burns"
        ></div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

      <div className="relative z-10 flex flex-col justify-between h-full p-6 md:p-12">
        <header className="flex justify-between items-center">
          <button onClick={onBack} className="px-3 py-1.5 bg-white/20 backdrop-blur-sm border border-white/40 rounded-full text-white hover:bg-white/30 transition-all text-sm font-medium shadow-lg flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="#166886" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
        </header>

        <main className="flex-grow flex items-end justify-start text-left pb-8">
            <div className="max-w-5xl animate-fade-in-up">
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6">{item.name}</h1>
                {description && (
                    <p className="text-xl md:text-2xl lg:text-3xl font-light leading-relaxed">{description}</p>
                )}
            </div>
        </main>

        {/* Footer is intentionally empty to keep focus on the visual */}
        <footer></footer>
      </div>
      <style>{`
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
            animation: fadeInUp 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default DetailScreen;
