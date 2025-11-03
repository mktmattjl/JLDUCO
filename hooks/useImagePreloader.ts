import { useEffect } from 'react';

/**
 * Hook to preload images in the background.
 * @param imagePaths - Array of image paths to preload
 */
export const useImagePreloader = (imagePaths: string[]) => {
  useEffect(() => {
    const preloadImages = () => {
      imagePaths.forEach(path => {
        const img = new Image();
        img.src = path;
      });
    };

    // Preload images after a small delay to not block initial render
    const timeoutId = setTimeout(preloadImages, 100);

    return () => clearTimeout(timeoutId);
  }, [imagePaths]);
};

/**
 * Get all image paths that need to be preloaded for the app.
 * This includes all detail screen backgrounds for regions, themes, and moods.
 */
export const getAllImagePaths = (): string[] => {
  const imagePaths: string[] = [];

  // Region images
  const regions = [
    'PARIS.jpg',
    'PROVENCE.jpg',
    'LOIRE VALLEY.jpg',
    'BORDEAUX.jpg',
    'BURGUNDY.jpg',
    'ALSACE.jpg',
    'CHAMPAGNE.jpg',
    'NORMANDY.jpg',
    'RHONE VALLEY.jpg',
    'DORDOGNE.jpg',
    'FRENCH ALPS.jpg',
    'CORSICA.jpg'
  ];

  regions.forEach(fileName => {
    const encodedFileName = encodeURIComponent(fileName).replace(/%2F/g, '/');
    imagePaths.push(`/Images/REGIONS/${encodedFileName}`);
  });

  // Theme images
  const themes = [
    'ADRENALINE.jpg',
    'ALPINE ADVENTURES.jpg',
    'ART AND CULTURE.png',
    'CRAFTSMANSHIP.jpeg',
    'FASHION.jpg',
    'GASTRONOMY.jpeg',
    'HISTORIC FOOTSTEPS.jpg',
    'QUIET SANCTUARIES2.jpg',
    'ROMANTIC ESCAPE.jpg',
    'WELLNESS.jpg',
    'WINE AND CHAMPAGNE.jpg',
    'YACHTING.jpeg'
  ];

  themes.forEach(fileName => {
    const encodedFileName = encodeURIComponent(fileName).replace(/%2F/g, '/');
    imagePaths.push(`/Images/THEME/${encodedFileName}`);
  });

  // Mood images
  const moods = [
    'NIGHT FAMOUS.jpg',
    'TASTE FOREVER.jpg',
    'FEELING HOME.jpg',
    'SUN STAYED UP LATE.jpg',
    'VINEYARD SECRET.jpeg',
    'MUSIC FOUND YOU.jpg',
    'PLACE ONLY YOU WERE MEANT TO SEE.jpg',
    'WHERE THE MAP WAS FINALLY WRONG.jpg',
    'THE ART THAT LOOKED BACK.jpg',
    'THE KEY TO DOOR NO ONE USES.jpeg',
    'THE INVITATION SENT A CENTURY AGO.jpeg',
    'FIRST KISS ENERGY.jpg'
  ];

  moods.forEach(fileName => {
    const encodedFileName = encodeURIComponent(fileName).replace(/%2F/g, '/');
    imagePaths.push(`/Images/MOOD/${encodedFileName}`);
  });

  // Add category screen background images
  imagePaths.push('/Images/Selection.png');
  imagePaths.push('/Images/Home.png');

  return imagePaths;
};
