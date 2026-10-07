import React, { useState } from 'react';
import officialLogoAsset from '../assets/images/logo_psn_ngada.jpg';

interface OfficialClubLogoProps {
  className?: string;
  size?: number | string;
  customUrl?: string;
}

export const OfficialClubLogo: React.FC<OfficialClubLogoProps> = ({
  className = 'w-full h-full',
  size,
  customUrl,
}) => {
  const [imgError, setImgError] = useState(false);

  // If customUrl is a legacy string pointing to src path or empty, prioritize the bundled official asset
  const targetSrc =
    !customUrl ||
    customUrl === '/src/assets/images/logo_psn_ngada.jpg' ||
    customUrl === '/src/assets/images/logo_psn_ngada.jpeg' ||
    customUrl.includes('logo_psn_ngada')
      ? officialLogoAsset
      : customUrl;

  // Render the official uploaded logo image directly
  if (!imgError) {
    return (
      <img
        src={targetSrc}
        alt="Logo Resmi Perserikatan Sepakbola Ngada"
        referrerPolicy="no-referrer"
        onError={() => {
          // If a custom URL fails, try falling back to officialLogoAsset once
          if (targetSrc !== officialLogoAsset) {
            // retry with officialLogoAsset
            setImgError(false);
          } else {
            setImgError(true);
          }
        }}
        className={`object-contain rounded-full bg-black/40 ${className}`}
        style={size ? { width: size, height: size } : undefined}
      />
    );
  }

  return (
    <svg
      viewBox="0 0 500 500"
      className={className}
      style={size ? { width: size, height: size } : undefined}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Logo Resmi Perserikatan Sepakbola Ngada (PSN Ngada)"
    >
      <defs>
        {/* Curved Path for Text "PERSERIKATAN SEPAKBOLA" along lower arc */}
        <path
          id="lowerArcUpper"
          d="M 52 265 A 204 204 0 0 0 448 265"
          fill="none"
        />

        {/* Curved Path for Text "NGADA" along lower bottom arc */}
        <path
          id="lowerArcBottom"
          d="M 120 385 A 200 200 0 0 0 380 385"
          fill="none"
        />

        {/* Gradients */}
        <radialGradient id="badgeBg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#1e1e24" />
          <stop offset="70%" stopColor="#121215" />
          <stop offset="100%" stopColor="#08080a" />
        </radialGradient>

        <linearGradient id="goldOrange" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fb923c" />
          <stop offset="50%" stopColor="#ea580c" />
          <stop offset="100%" stopColor="#c2410c" />
        </linearGradient>

        <linearGradient id="shieldGreen" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#15803d" />
          <stop offset="50%" stopColor="#166534" />
          <stop offset="100%" stopColor="#14532d" />
        </linearGradient>

        {/* 5-pointed Star Symbol */}
        <g id="star">
          <polygon
            points="0,-18 5.5,-5.5 19,-4.5 9,5 12,18 0,11 -12,18 -9,5 -19,-4.5 -5.5,-5.5"
            fill="url(#goldOrange)"
            stroke="#9a3412"
            strokeWidth="0.8"
          />
        </g>
      </defs>

      {/* Outer Black Border */}
      <circle cx="250" cy="250" r="248" fill="#000000" />

      {/* Main Vibrant Orange Outer Ring */}
      <circle cx="250" cy="250" r="238" fill="none" stroke="#ea580c" strokeWidth="14" />
      <circle cx="250" cy="250" r="230" fill="none" stroke="#7c2d12" strokeWidth="2.5" />

      {/* Deep Charcoal Background */}
      <circle cx="250" cy="250" r="228" fill="url(#badgeBg)" />

      {/* Top 7 Stars (Official arrangement) */}
      {/* Center Top Star (Largest) */}
      <g transform="translate(250, 68) scale(1.4)">
        <use href="#star" />
      </g>
      {/* Left 3 Stars */}
      <g transform="translate(190, 85) rotate(-16) scale(0.95)">
        <use href="#star" />
      </g>
      <g transform="translate(136, 122) rotate(-32) scale(0.85)">
        <use href="#star" />
      </g>
      <g transform="translate(95, 174) rotate(-48) scale(0.78)">
        <use href="#star" />
      </g>
      {/* Right 3 Stars */}
      <g transform="translate(310, 85) rotate(16) scale(0.95)">
        <use href="#star" />
      </g>
      <g transform="translate(364, 122) rotate(32) scale(0.85)">
        <use href="#star" />
      </g>
      <g transform="translate(405, 174) rotate(48) scale(0.78)">
        <use href="#star" />
      </g>

      {/* Classic Football (Soccer Ball) below center star */}
      <g transform="translate(250, 126)">
        {/* White Ball Base */}
        <circle cx="0" cy="0" r="25" fill="#f8fafc" stroke="#18181b" strokeWidth="2" />
        {/* Center Pentagon */}
        <polygon points="0,-7.5 7.1,-2.4 4.4,6.1 -4.4,6.1 -7.1,-2.4" fill="#0f172a" />
        {/* Radiating seam lines */}
        <line x1="0" y1="-7.5" x2="0" y2="-19" stroke="#18181b" strokeWidth="2" />
        <line x1="7.1" y1="-2.4" x2="18" y2="-6" stroke="#18181b" strokeWidth="2" />
        <line x1="4.4" y1="6.1" x2="13" y2="17" stroke="#18181b" strokeWidth="2" />
        <line x1="-4.4" y1="6.1" x2="-13" y2="17" stroke="#18181b" strokeWidth="2" />
        <line x1="-7.1" y1="-2.4" x2="-18" y2="-6" stroke="#18181b" strokeWidth="2" />
        {/* Surrounding perimeter pentagons */}
        <polygon points="0,-19 -8,-23 8,-23" fill="#0f172a" />
        <polygon points="18,-6 24,-1 23,-11" fill="#0f172a" />
        <polygon points="13,17 21,17 14,23" fill="#0f172a" />
        <polygon points="-13,17 -21,17 -14,23" fill="#0f172a" />
        <polygon points="-18,-6 -24,-1 -23,-11" fill="#0f172a" />
      </g>

      {/* Laurel Wreath Leaves (Left & Right Branches) */}
      <g fill="#ea580c" stroke="#9a3412" strokeWidth="0.8">
        {/* Left Laurel */}
        <path d="M 222 135 C 202 128 182 144 176 156 C 185 152 202 148 222 135 Z" />
        <path d="M 196 158 C 176 154 158 170 154 185 C 163 180 180 174 196 158 Z" />
        <path d="M 176 190 C 156 188 140 210 138 226 C 148 219 164 210 176 190 Z" />
        <path d="M 164 230 C 144 233 134 258 136 272 C 145 264 158 252 164 230 Z" />
        <path d="M 160 274 C 146 282 140 306 145 320 C 152 310 164 297 160 274 Z" />
        <path d="M 170 318 C 160 330 164 350 175 360 C 177 348 182 335 170 318 Z" />
        <path d="M 194 354 C 186 366 196 382 210 386 C 208 374 210 361 194 354 Z" />

        {/* Right Laurel */}
        <path d="M 278 135 C 298 128 318 144 324 156 C 315 152 298 148 278 135 Z" />
        <path d="M 304 158 C 324 154 342 170 346 185 C 337 180 320 174 304 158 Z" />
        <path d="M 324 190 C 344 188 360 210 362 226 C 352 219 336 210 324 190 Z" />
        <path d="M 336 230 C 356 233 366 258 364 272 C 355 264 342 252 336 230 Z" />
        <path d="M 340 274 C 354 282 360 306 355 320 C 348 310 336 297 340 274 Z" />
        <path d="M 330 318 C 340 330 336 350 325 360 C 323 348 318 335 330 318 Z" />
        <path d="M 306 354 C 314 366 304 382 290 386 C 292 374 290 361 306 354 Z" />
      </g>

      {/* Central Green Shield of Ngada */}
      <g transform="translate(250, 252)">
        {/* Shield Boundary */}
        <path
          d="M 0 -88 L 58 -72 L 74 -30 L 74 35 C 74 72 38 100 0 112 C -38 100 -74 72 -74 35 L -74 -30 L -58 -72 Z"
          fill="url(#shieldGreen)"
          stroke="#f59e0b"
          strokeWidth="3.5"
        />

        {/* Small Orange Star at Shield Crown */}
        <g transform="translate(0, -68) scale(0.65)">
          <use href="#star" />
        </g>

        {/* Orange Banner 'NGADA' */}
        <path
          d="M -38 -46 L 38 -46 L 44 -33 L 38 -31 L -38 -31 L -44 -33 Z"
          fill="#f97316"
          stroke="#7c2d12"
          strokeWidth="1"
        />
        <text
          x="0"
          y="-35"
          fill="#ffffff"
          fontSize="11"
          fontWeight="900"
          letterSpacing="2.5"
          textAnchor="middle"
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          NGADA
        </text>

        {/* Traditional Ngada Stones (White Base) */}
        <g fill="#f8fafc" stroke="#334155" strokeWidth="0.8">
          <ellipse cx="-22" cy="58" rx="8" ry="6" />
          <ellipse cx="-8" cy="56" rx="9" ry="7" />
          <ellipse cx="8" cy="56" rx="9" ry="7" />
          <ellipse cx="22" cy="58" rx="8" ry="6" />
          <ellipse cx="-15" cy="48" rx="8" ry="6" />
          <ellipse cx="0" cy="46" rx="9" ry="7" />
          <ellipse cx="15" cy="48" rx="8" ry="6" />
        </g>

        {/* Orange Ribbon Base */}
        <path
          d="M -26 62 C -10 68 10 68 26 62"
          fill="none"
          stroke="#ea580c"
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* Ngadhu / Ancestral Monument Silhouette */}
        <path
          d="M -6 40 L 6 40 L 4 10 L 13 -12 L 8 -14 L 3 -2 L 2 -26 L -2 -26 L -3 -2 L -8 -14 L -13 -12 L -4 10 Z"
          fill="#09090b"
          stroke="#ffffff"
          strokeWidth="0.9"
        />
        <circle cx="0" cy="8" r="2.2" fill="#ffffff" />
        <circle cx="0" cy="20" r="2.2" fill="#ffffff" />
        <circle cx="0" cy="30" r="2.2" fill="#ffffff" />

        {/* Left Golden Rice Spray */}
        <g fill="#fbbf24" stroke="#d97706" strokeWidth="0.5">
          <path d="M -44 30 C -48 10 -40 -15 -25 -25 C -28 -15 -35 10 -40 30 Z" />
          <ellipse cx="-32" cy="-14" rx="4" ry="2" transform="rotate(-30, -32, -14)" />
          <ellipse cx="-36" cy="-2" rx="4" ry="2" transform="rotate(-20, -36, -2)" />
          <ellipse cx="-40" cy="10" rx="4" ry="2" transform="rotate(-10, -40, 10)" />
          <ellipse cx="-42" cy="22" rx="4" ry="2" transform="rotate(0, -42, 22)" />
        </g>

        {/* Right White Cotton Spray */}
        <g fill="#ffffff" stroke="#16a34a" strokeWidth="0.8">
          <circle cx="28" cy="-14" r="3.5" />
          <circle cx="33" cy="-2" r="3.5" />
          <circle cx="36" cy="10" r="3.5" />
          <circle cx="38" cy="22" r="3.5" />
          <circle cx="34" cy="34" r="3.5" />
        </g>
      </g>

      {/* Outer Curved Typography: PERSERIKATAN SEPAKBOLA */}
      <text
        fill="#f97316"
        fontSize="27"
        fontWeight="800"
        fontFamily="'Times New Roman', Georgia, serif"
        letterSpacing="2.5"
        filter="drop-shadow(0 2px 4px rgba(0,0,0,0.9))"
      >
        <textPath
          href="#lowerArcUpper"
          startOffset="50%"
          textAnchor="middle"
        >
          PERSERIKATAN SEPAKBOLA
        </textPath>
      </text>

      {/* Bottom Concentric Curved Typography: NGADA */}
      <text
        fill="#ea580c"
        fontSize="44"
        fontWeight="900"
        fontFamily="'Times New Roman', Georgia, serif"
        letterSpacing="8"
        filter="drop-shadow(0 2px 4px rgba(0,0,0,0.9))"
      >
        <textPath
          href="#lowerArcBottom"
          startOffset="50%"
          textAnchor="middle"
        >
          NGADA
        </textPath>
      </text>
    </svg>
  );
};
