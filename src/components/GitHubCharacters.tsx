import React from 'react';

export const MonaOctocat: React.FC = () => (
  <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Mona the Octocat */}
    <g filter="url(#glow)">
      <path d="M50 10C28.5 10 11 27.5 11 49C11 66.2 22.3 80.8 38 86.2C40 86.6 40.8 85.4 40.8 84.3V77.7C29.7 80.2 27.4 72.8 27.4 72.8C25.6 68.1 23 66.9 23 66.9C19.4 64.4 23.3 64.5 23.3 64.5C27.3 64.8 29.4 68.6 29.4 68.6C33 74.8 38.8 73 41 72C41.4 69.3 42.5 67.5 43.7 66.5C34.9 65.5 25.6 62 25.6 47.2C25.6 42.8 27.2 39.2 29.5 36.4C29 35.4 27.6 31.2 29.9 25.9C29.9 25.9 33.2 24.8 40.8 30.1C43.7 29.2 46.9 28.7 50 28.7C53.1 28.7 56.3 29.2 59.2 30.1C66.8 24.8 70.1 25.9 70.1 25.9C72.4 31.2 71 35.4 70.5 36.4C72.8 39.2 74.4 42.8 74.4 47.2C74.4 62 65.1 65.5 56.2 66.5C57.7 67.7 59 70.1 59 73.8V84.3C59 85.4 59.8 86.6 61.9 86.2C77.7 80.8 89 66.2 89 49C89 27.5 71.5 10 50 10Z" fill="#9C6CFF"/>
    </g>
    <defs>
      <filter id="glow" x="0" y="0" width="100" height="100" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
        <feOffset/>
        <feGaussianBlur stdDeviation="5"/>
        <feComposite in2="hardAlpha" operator="out"/>
        <feColorMatrix type="matrix" values="0 0 0 0 0.611 0 0 0 0 0.423 0 0 0 0 1 0 0 0 1 0"/>
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
      </filter>
    </defs>
  </svg>
);

export const Copilot: React.FC = () => (
  <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Copilot */}
    <g filter="url(#glow2)">
      <path d="M50 15C36.2 15 25 26.2 25 40C25 53.8 36.2 65 50 65C63.8 65 75 53.8 75 40C75 26.2 63.8 15 50 15ZM40 35C40 32.2 42.2 30 45 30C47.8 30 50 32.2 50 35C50 37.8 47.8 40 45 40C42.2 40 40 37.8 40 35ZM55 40C52.2 40 50 37.8 50 35C50 32.2 52.2 30 55 30C57.8 30 60 32.2 60 35C60 37.8 57.8 40 55 40ZM35 50C35 45 45 45 50 45C55 45 65 45 65 50C65 60 55 65 50 65C45 65 35 60 35 50Z" fill="#9C6CFF"/>
      <path d="M25 75L30 85H70L75 75H25Z" fill="#9C6CFF"/>
    </g>
    <defs>
      <filter id="glow2" x="15" y="5" width="70" height="90" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
        <feOffset/>
        <feGaussianBlur stdDeviation="5"/>
        <feComposite in2="hardAlpha" operator="out"/>
        <feColorMatrix type="matrix" values="0 0 0 0 0.611 0 0 0 0 0.423 0 0 0 0 1 0 0 0 1 0"/>
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
      </filter>
    </defs>
  </svg>
);

export const Ducky: React.FC = () => (
  <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Ducky */}
    <g filter="url(#glow3)">
      <path d="M65 35C65 24 56 15 45 15C34 15 25 24 25 35C25 46 34 55 45 55C56 55 65 46 65 35Z" fill="#FFD43B"/>
      <path d="M45 60C25 60 15 70 15 80C15 85 35 85 45 85C55 85 75 85 75 80C75 70 65 60 45 60Z" fill="#FFD43B"/>
      <path d="M40 30C40 28.3 38.7 27 37 27C35.3 27 34 28.3 34 30C34 31.7 35.3 33 37 33C38.7 33 40 31.7 40 30Z" fill="#000"/>
      <path d="M56 30C56 28.3 54.7 27 53 27C51.3 27 50 28.3 50 30C50 31.7 51.3 33 53 33C54.7 33 56 31.7 56 30Z" fill="#000"/>
      <path d="M50 40L45 45L40 40H50Z" fill="#FF9900"/>
    </g>
    <defs>
      <filter id="glow3" x="5" y="5" width="80" height="90" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
        <feOffset/>
        <feGaussianBlur stdDeviation="5"/>
        <feComposite in2="hardAlpha" operator="out"/>
        <feColorMatrix type="matrix" values="0 0 0 0 0.611 0 0 0 0 0.423 0 0 0 0 1 0 0 0 1 0"/>
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
      </filter>
    </defs>
  </svg>
);

export const Star: React.FC<{size: number, top: string, left: string, delay: string}> = ({size, top, left, delay}) => (
  <div className="absolute animate-twinkle" style={{top, left, animationDelay: delay}}>
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#star-glow)">
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#FFF" fillOpacity="0.9"/>
      </g>
      <defs>
        <filter id="star-glow" x="-50%" y="-50%" width="200%" height="200%" filterUnits="userSpaceOnUse">
          <feGaussianBlur stdDeviation="1" result="blur" />
          <feFlood floodColor="#9c6ade" floodOpacity="0.9" result="color" />
          <feComposite in="color" in2="blur" operator="in" result="glow" />
          <feMerge>
            <feMergeNode in="glow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
    </svg>
  </div>
);