import React, { useState, useEffect } from 'react';
import { RouletteItem } from '../types';

interface RouletteOverlayProps {
  items: RouletteItem[];
  onComplete: (selection: RouletteItem) => void;
}

const RouletteOverlay: React.FC<RouletteOverlayProps> = ({ items, onComplete }) => {
    const [currentItem, setCurrentItem] = useState<RouletteItem | null>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true); // Fade in the overlay

        const finalItem = items[Math.floor(Math.random() * items.length)];
        const timeouts: number[] = [];
        let cumulativeDelay = 500; // Delay for overlay to fade in

        const scheduleItemChange = (item: RouletteItem, delay: number) => {
            timeouts.push(window.setTimeout(() => {
                setCurrentItem(item);
            }, cumulativeDelay));
            cumulativeDelay += delay;
        };

        // Phase 1: Slow start
        scheduleItemChange(items[Math.floor(Math.random() * items.length)], 400);
        scheduleItemChange(items[Math.floor(Math.random() * items.length)], 300);

        // Phase 2: Fast spin
        for (let i = 0; i < 20; i++) {
            // Cycle through items for visual variety
            scheduleItemChange(items[i % items.length], 100);
        }

        // Phase 3: Slow down
        scheduleItemChange(items[Math.floor(Math.random() * items.length)], 200);
        scheduleItemChange(items[Math.floor(Math.random() * items.length)], 400);
        scheduleItemChange(items[Math.floor(Math.random() * items.length)], 600);
        
        // Land on the final item
        scheduleItemChange(finalItem, 800);

        // After a final pause, call onComplete directly to transition to the detail screen.
        // This prevents the previous screen from flashing.
        timeouts.push(window.setTimeout(() => {
            onComplete(finalItem);
        }, cumulativeDelay + 1500));

        // Cleanup function to clear all scheduled timeouts if the component unmounts
        return () => {
            timeouts.forEach(clearTimeout);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [items, onComplete]);

    const getImageUrl = (item: RouletteItem | null): string => {
        if (!item) return '';

        const categoryName = item.category.name;
        const itemName = item.item.name;

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

        const fileName = nameMapping[itemName];
        if (fileName) {
            const encodedFileName = encodeURIComponent(fileName).replace(/%2F/g, '/');
            return `/Images/${folder}/${encodedFileName}`;
        }

        return '/Images/Clicked/Selection.png';
    };

    const imageUrl = getImageUrl(currentItem);

    return (
        <div className={`fixed inset-0 bg-black z-50 transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`} aria-live="polite" aria-atomic="true">
            {currentItem && (
                <>
                    <div
                        key={currentItem.item.id} // Change key to re-trigger Ken Burns effect
                        style={{ backgroundImage: `url(${imageUrl})` }}
                        className="w-full h-full bg-cover bg-center opacity-60 ken-burns"
                    ></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                    <div className="absolute inset-0 flex items-center justify-center text-center text-white">
                         {/* By changing the key, we tell React this is a new element, so it unmounts the old one and mounts the new one, re-triggering the animation. */}
                        <div
                            key={`${currentItem.item.id}-text`}
                            className="max-w-4xl animate-fade-in"
                        >
                            <h1 className="text-6xl md:text-8xl font-bold tracking-tight">{currentItem.item.name}</h1>
                        </div>
                    </div>
                </>
            )}
            {/* Ephemeral animation styles */}
            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: scale(0.95); }
                    to { opacity: 1; transform: scale(1); }
                }
                .animate-fade-in {
                    animation: fadeIn 0.3s ease-out forwards;
                }
            `}</style>
        </div>
    );
};

export default RouletteOverlay;
