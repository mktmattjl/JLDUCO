import React from 'react';
import { CardCategory } from './types';
import { PlaceholderIcon } from './components/icons/PlaceholderIcon';

const REGIONS = [
  { id: 'r1', name: 'Paris', icon: <img src="/Images/picto/Regions/Paris.png?v=2" alt="Paris" className="w-full h-full object-contain" /> },
  { id: 'r2', name: 'French Riviera & Provence', icon: <img src="/Images/picto/Regions/Provence.png?v=2" alt="Provence" className="w-full h-full object-contain" /> },
  { id: 'r3', name: 'Loire Valley', icon: <img src="/Images/picto/Regions/Loire Valley.png?v=2" alt="Loire Valley" className="w-full h-full object-contain" /> },
  { id: 'r4', name: 'Bordeaux Region', icon: <img src="/Images/picto/Regions/Bordeaux.png?v=2" alt="Bordeaux" className="w-full h-full object-contain" /> },
  { id: 'r5', name: 'Burgundy', icon: <img src="/Images/picto/Regions/Burgundy.png?v=2" alt="Burgundy" className="w-full h-full object-contain" /> },
  { id: 'r6', name: 'Alsace', icon: <img src="/Images/picto/Regions/Alsace.png?v=2" alt="Alsace" className="w-full h-full object-contain" /> },
  { id: 'r7', name: 'Champagne', icon: <img src="/Images/picto/Regions/Champagne.png?v=2" alt="Champagne" className="w-full h-full object-contain" /> },
  { id: 'r8', name: 'Normandy & Brittany', icon: <img src="/Images/picto/Regions/Normandy.png?v=2" alt="Normandy" className="w-full h-full object-contain" /> },
  { id: 'r9', name: 'Rhone Valley / Lyon', icon: <img src="/Images/picto/Regions/Lyon.png?v=2" alt="Lyon" className="w-full h-full object-contain" /> },
  { id: 'r10', name: 'Dordogne', icon: <img src="/Images/picto/Regions/Dordogne.png?v=2" alt="Dordogne" className="w-full h-full object-contain" /> },
  { id: 'r11', name: 'French Alps', icon: <img src="/Images/picto/Regions/French_Alps.png?v=2" alt="French Alps" className="w-full h-full object-contain" /> },
  { id: 'r12', name: 'Corsica', icon: <img src="/Images/picto/Regions/Corsica.png?v=2" alt="Corsica" className="w-full h-full object-contain" /> },
];

const THEMES = [
  { id: 't1', name: 'Adrenaline', icon: <img src="/Images/picto/Themes/Adrenaline.png?v=2" alt="Adrenaline" className="w-full h-full object-contain" /> },
  { id: 't2', name: 'Alpine adventures', icon: <img src="/Images/picto/Themes/Alpine Adventures.png?v=2" alt="Alpine Adventures" className="w-full h-full object-contain" /> },
  { id: 't3', name: 'Art & culture', icon: <img src="/Images/picto/Themes/Art and Culture.png?v=2" alt="Art and Culture" className="w-full h-full object-contain" /> },
  { id: 't4', name: 'Craftsmanship', icon: <img src="/Images/picto/Themes/Craftsmanship.png?v=2" alt="Craftsmanship" className="w-full h-full object-contain" /> },
  { id: 't5', name: 'Fashion', icon: <img src="/Images/picto/Themes/Fashion.png?v=2" alt="Fashion" className="w-full h-full object-contain" /> },
  { id: 't6', name: 'Gastronomy', icon: <img src="/Images/picto/Themes/Gastronomy.png?v=2" alt="Gastronomy" className="w-full h-full object-contain" /> },
  { id: 't7', name: 'Historic footsteps', icon: <img src="/Images/picto/Themes/Historic Footsteps.png?v=2" alt="Historic Footsteps" className="w-full h-full object-contain" /> },
  { id: 't8', name: 'Quiet sanctuaries', icon: <img src="/Images/picto/Themes/Quiet Sanctuaries.png?v=2" alt="Quiet Sanctuaries" className="w-full h-full object-contain" /> },
  { id: 't9', name: 'Romantic escapes', icon: <img src="/Images/picto/Themes/Romantic Escapes.png?v=2" alt="Romantic Escapes" className="w-full h-full object-contain" /> },
  { id: 't10', name: 'Wellness', icon: <img src="/Images/picto/Themes/Spa and Wellness.png?v=2" alt="Spa and Wellness" className="w-full h-full object-contain" /> },
  { id: 't11', name: 'Wine & Champagne', icon: <img src="/Images/picto/Themes/Wine .png?v=2" alt="Wine" className="w-full h-full object-contain" /> },
  { id: 't12', name: 'Yachting', icon: <img src="/Images/picto/Themes/Yachting.png?v=2" alt="Yachting" className="w-full h-full object-contain" /> },
];

const MOODS = [
  { id: 'f1', name: 'The Night You Felt Famous', icon: <img src="/Images/picto/Moods/The night you felt famous.png" alt="The night you felt famous" className="w-full h-full object-contain" /> },
  { id: 'f2', name: 'The Taste You\'ll Chase Forever', icon: <img src="/Images/picto/Moods/The taste you'll chase forever.png" alt="The taste you'll chase forever" className="w-full h-full object-contain" /> },
  { id: 'f3', name: 'The Stranger Who Knew Your Name', icon: <img src="/Images/picto/Moods/The stranger who knew your name.png" alt="The stranger who knew your name" className="w-full h-full object-contain" /> },
  { id: 'f4', name: 'The Sun That Stayed Up Too Late', icon: <img src="/Images/picto/Moods/The sun that stayed up to o late.png" alt="The sun that stayed up too late" className="w-full h-full object-contain" /> },
  { id: 'f5', name: 'The Vineyard That Shared Its Secret', icon: <img src="/Images/picto/Moods/The vineyard that shared its secrets.png" alt="The vineyard that shared its secrets" className="w-full h-full object-contain" /> },
  { id: 'f6', name: 'The Moment the Music Found You', icon: <img src="/Images/picto/Moods/The moment the music found you.png" alt="The moment the music found you" className="w-full h-full object-contain" /> },
  { id: 'f7', name: 'A Place Only You Were Meant to See', icon: <img src="/Images/picto/Moods/A place only you were meant to see.png" alt="A place only you were meant to see" className="w-full h-full object-contain" /> },
  { id: 'f8', name: 'Where the Map Was Finally Wrong', icon: <img src="/Images/picto/Moods/Where the map was finally wrong.png" alt="Where the map was finally wrong" className="w-full h-full object-contain" /> },
  { id: 'f9', name: 'The Art That Looked Back', icon: <img src="/Images/picto/Moods/The art that looked back.png" alt="The art that looked back" className="w-full h-full object-contain" /> },
  { id: 'f11', name: 'The Key to a Door No One Uses', icon: <img src="/Images/picto/Moods/The key to a door no one uses.png" alt="The key to a door no one uses" className="w-full h-full object-contain" /> },
  { id: 'f12', name: 'The Invitation Sent a Century Ago', icon: <img src="/Images/picto/Moods/The invitation sent a century ago.png" alt="The invitation sent a century ago" className="w-full h-full object-contain" /> },
  { id: 'f14', name: 'First Kiss Energy', icon: <img src="/Images/picto/Moods/First kiss energy.png" alt="First kiss energy" className="w-full h-full object-contain" /> },
];

export const CATEGORIES: CardCategory[] = [
  { name: 'Regions', items: REGIONS },
  { name: 'Themes', items: THEMES },
  { name: 'Mood', items: MOODS },
];
