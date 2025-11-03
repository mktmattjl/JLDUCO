import React from 'react';

export const ThemeButtonIcon: React.FC = () => (
    <img
        src="/Images/Buttons/Themes2.png"
        alt="Themes"
        className="group-hover:opacity-80 transition-opacity"
        style={{
            height: '200px',
            width: 'auto',
            imageRendering: '-webkit-optimize-contrast',
            WebkitFontSmoothing: 'antialiased'
        }}
    />
);
