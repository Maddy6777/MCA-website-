import React from 'react';

interface EmblemProps {
  className?: string;
  size?: number;
}

export const Emblem: React.FC<EmblemProps> = ({ className = '', size = 52 }) => {
  return (
    <div
      className={`inline-flex flex-col items-center justify-center shrink-0 ${className}`}
      role="img"
      aria-label="Generic State Emblem of India Placeholder"
    >
      <svg
        width={size}
        height={size * 1.25}
        viewBox="0 0 100 125"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-[#003366] transition-colors a11y-keep"
      >
        {/* Stylized Four Lions Capital Top Motif (Generic Original Representation) */}
        <g stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
          {/* Central Lion Head */}
          <path d="M50 12 C44 12, 40 18, 40 24 C40 32, 44 38, 50 42 C56 38, 60 32, 60 24 C60 18, 56 12, 50 12 Z" fill="#003366" fillOpacity="0.08" />
          <path d="M46 22 C48 20, 52 20, 54 22" />
          <circle cx="47" cy="25" r="1.5" fill="currentColor" />
          <circle cx="53" cy="25" r="1.5" fill="currentColor" />
          <path d="M48 30 Q50 33 52 30" />
          <path d="M44 36 Q50 40 56 36" />

          {/* Left Lion Silhouette */}
          <path d="M38 18 C30 18, 26 24, 25 32 C24 38, 28 44, 38 46" />
          <path d="M30 25 C31 23, 34 24, 35 26" />
          <circle cx="31" cy="28" r="1.2" fill="currentColor" />

          {/* Right Lion Silhouette */}
          <path d="M62 18 C70 18, 74 24, 75 32 C76 38, 72 44, 62 46" />
          <path d="M70 25 C69 23, 66 24, 65 26" />
          <circle cx="69" cy="28" r="1.2" fill="currentColor" />

          {/* Mane and Collar Detailing */}
          <path d="M34 38 Q50 50 66 38" />
          <path d="M38 46 Q50 54 62 46" />
          <path d="M42 50 L50 55 L58 50" />

          {/* Abacus Platform */}
          <rect x="18" y="56" width="64" height="6" rx="1.5" fill="#003366" fillOpacity="0.15" />
          <line x1="15" y1="62" x2="85" y2="62" strokeWidth="2" />

          {/* Central Ashoka Chakra */}
          <circle cx="50" cy="74" r="11" strokeWidth="2.2" />
          <circle cx="50" cy="74" r="2.2" fill="currentColor" />
          {/* Chakra Spokes */}
          <line x1="50" y1="63" x2="50" y2="85" strokeWidth="1" />
          <line x1="39" y1="74" x2="61" y2="74" strokeWidth="1" />
          <line x1="42.2" y1="66.2" x2="57.8" y2="81.8" strokeWidth="1" />
          <line x1="42.2" y1="81.8" x2="57.8" y2="66.2" strokeWidth="1" />
          <line x1="45.5" y1="63.8" x2="54.5" y2="84.2" strokeWidth="0.8" />
          <line x1="54.5" y1="63.8" x2="45.5" y2="84.2" strokeWidth="0.8" />
          <line x1="39.8" y1="69.5" x2="60.2" y2="78.5" strokeWidth="0.8" />
          <line x1="39.8" y1="78.5" x2="60.2" y2="69.5" strokeWidth="0.8" />

          {/* Galloping Horse (Left) & Bull (Right) Stylized Glyphs */}
          <path d="M25 76 C23 71, 28 68, 32 72 C33 75, 29 78, 26 77" strokeWidth="1.5" />
          <path d="M75 76 C77 71, 72 68, 68 72 C67 75, 71 78, 74 77" strokeWidth="1.5" />

          {/* Inverted Lotus Pedestal Base */}
          <path d="M22 87 Q50 82 78 87 L82 95 Q50 90 18 95 Z" fill="#003366" fillOpacity="0.1" />
          <path d="M26 89 Q50 96 74 89" strokeWidth="1.5" />
          <line x1="14" y1="96" x2="86" y2="96" strokeWidth="2.5" />

          {/* Saffron & Green Accent Dots */}
          <circle cx="16" cy="96" r="2.5" fill="#FF9933" stroke="none" />
          <circle cx="84" cy="96" r="2.5" fill="#138808" stroke="none" />
        </g>

        {/* Motto Placeholder: सत्यमेव जयते */}
        <text
          x="50"
          y="112"
          textAnchor="middle"
          fontSize="10"
          fontWeight="bold"
          fontFamily="Noto Sans Devanagari, sans-serif"
          fill="currentColor"
          letterSpacing="1"
        >
          सत्यमेव जयते
        </text>
      </svg>
    </div>
  );
};
