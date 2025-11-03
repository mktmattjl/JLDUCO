import React from 'react';

export const MoodButtonIcon: React.FC = () => (
    <img
        src="/Images/Buttons/Moods2.png"
        alt="Mood"
        className="group-hover:opacity-80 transition-opacity"
        style={{
            height: '200px',
            width: 'auto',
            imageRendering: '-webkit-optimize-contrast',
            WebkitFontSmoothing: 'antialiased'
        }}
    />
);
