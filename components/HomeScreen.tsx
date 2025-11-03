import React, { useState } from 'react';
import { useImagePreloader, getAllImagePaths } from '../hooks/useImagePreloader';

interface HomeScreenProps {
  onStart: () => void;
  onToggleAdmin: () => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onStart, onToggleAdmin }) => {
  const [adminClickCount, setAdminClickCount] = useState(0);

  // Preload all images in the background when on home screen
  useImagePreloader(getAllImagePaths());

  const handleSecretAdminClick = () => {
    const newCount = adminClickCount + 1;
    setAdminClickCount(newCount);
    if (newCount >= 5) {
      onToggleAdmin();
      setAdminClickCount(0); // Reset after activation
    }
  };
  
  // Stop propagation for the secret click area so it doesn't also trigger the main onStart click.
  const handleSecretZoneClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleSecretAdminClick();
  };

  // Reset admin click counter if user clicks anywhere else
  const handleMainClick = () => {
    setAdminClickCount(0);
    onStart();
  }

  return (
    <div
      onClick={handleMainClick}
      className="relative flex flex-col items-center justify-center h-screen p-8 text-center cursor-pointer bg-cover bg-center"
      style={{
        backgroundImage: 'url(/Images/Home.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        imageRendering: '-webkit-optimize-contrast',
        WebkitBackfaceVisibility: 'hidden',
        backfaceVisibility: 'hidden',
        transform: 'translateZ(0)',
        willChange: 'transform'
      }}
    >
      <div className="absolute inset-0 bg-black/20"></div>
      
      {/* Secret Admin Access Area */}
      <div
        className="absolute top-0 left-0 w-24 h-24 z-20"
        onClick={handleSecretZoneClick}
        aria-label="Admin access"
      ></div>

      <div className="relative z-10 flex flex-col items-center w-full h-full pt-12">
        <p className="text-sm md:text-base text-white/60 font-light animate-pulse">
          Click anywhere to begin
        </p>
      </div>
    </div>
  );
};

export default HomeScreen;