import React from 'react';
import { Volume2, Eye, Sun, Settings } from 'lucide-react';
import { Language, AccessibilitySettings, TextSize } from '../types';
import { UI_TRANSLATIONS } from '../data/portalData';

interface TopUtilityBarProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  accessibility: AccessibilitySettings;
  onUpdateAccessibility: (settings: Partial<AccessibilitySettings>) => void;
  onOpenAccessibilityPanel: () => void;
  onScreenReaderAnnounce: () => void;
}

export const TopUtilityBar: React.FC<TopUtilityBarProps> = ({
  language,
  onLanguageChange,
  accessibility,
  onUpdateAccessibility,
  onOpenAccessibilityPanel,
  onScreenReaderAnnounce,
}) => {
  const t = UI_TRANSLATIONS[language];

  const handleTextSizeChange = (size: TextSize) => {
    onUpdateAccessibility({ textSize: size });
  };

  const toggleHighContrast = () => {
    onUpdateAccessibility({ highContrast: !accessibility.highContrast });
  };

  return (
    <div className="bg-[#0e2a47] text-[#e2e8f0] text-xs border-b border-[#1b3d63] py-1.5 px-3 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        {/* Left Utility Links */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          <a
            href="#main-content"
            className="hover:underline focus:bg-[#FF9933] focus:text-[#000000] focus:px-2 focus:py-1 focus:rounded-xs outline-hidden font-medium text-slate-200 hover:text-white transition-colors"
          >
            {t.skipToMain}
          </a>
          <span className="text-slate-500 text-xs">|</span>
          <button
            onClick={onOpenAccessibilityPanel}
            type="button"
            className="hover:underline flex items-center space-x-1 cursor-pointer font-medium text-slate-200 hover:text-white"
            aria-label="Open Accessibility Options"
          >
            <Eye className="w-3.5 h-3.5 a11y-keep" />
            <span>{t.accessibility}</span>
          </button>
          <span className="text-slate-500 text-xs hidden sm:inline">|</span>
          <button
            onClick={onScreenReaderAnnounce}
            type="button"
            className="hidden sm:flex items-center space-x-1 hover:underline cursor-pointer font-medium text-slate-200 hover:text-white"
            title="Read summary of page"
            aria-label="Screen reader audio overview"
          >
            <Volume2 className="w-3.5 h-3.5 a11y-keep" />
            <span>{t.screenReader}</span>
          </button>
        </div>

        {/* Right Accessibility & Language Controls */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Font Resizing Controls */}
          <div className="flex items-center bg-[#071d33] border border-[#1e446d] rounded-xs px-1">
            <button
              onClick={() => handleTextSizeChange('sm')}
              type="button"
              className={`px-1.5 py-0.5 font-bold cursor-pointer transition-colors ${
                accessibility.textSize === 'sm'
                  ? 'bg-[#FF9933] text-black font-extrabold'
                  : 'text-slate-300 hover:text-white'
              }`}
              title="Decrease Font Size"
              aria-label="Decrease Font Size"
            >
              A-
            </button>
            <span className="text-slate-600 text-xs">|</span>
            <button
              onClick={() => handleTextSizeChange('normal')}
              type="button"
              className={`px-1.5 py-0.5 font-bold cursor-pointer transition-colors ${
                accessibility.textSize === 'normal'
                  ? 'bg-[#FF9933] text-black font-extrabold'
                  : 'text-slate-300 hover:text-white'
              }`}
              title="Standard Font Size"
              aria-label="Standard Font Size"
            >
              A
            </button>
            <span className="text-slate-600 text-xs">|</span>
            <button
              onClick={() => handleTextSizeChange('lg')}
              type="button"
              className={`px-1.5 py-0.5 font-bold cursor-pointer transition-colors ${
                accessibility.textSize === 'lg'
                  ? 'bg-[#FF9933] text-black font-extrabold'
                  : 'text-slate-300 hover:text-white'
              }`}
              title="Increase Font Size"
              aria-label="Increase Font Size"
            >
              A+
            </button>
          </div>

          {/* High Contrast Toggle */}
          <button
            onClick={toggleHighContrast}
            type="button"
            className={`px-2 py-0.5 border rounded-xs font-semibold flex items-center space-x-1 cursor-pointer transition-colors ${
              accessibility.highContrast
                ? 'bg-yellow-400 text-black border-yellow-300'
                : 'bg-[#071d33] text-slate-200 border-[#1e446d] hover:bg-[#13375e]'
            }`}
            title="Toggle High Contrast Mode"
            aria-label="Toggle High Contrast Mode"
            aria-pressed={accessibility.highContrast}
          >
            <Sun className="w-3 h-3 a11y-keep" />
            <span className="hidden xs:inline">
              {accessibility.highContrast ? 'Normal' : 'High Contrast'}
            </span>
          </button>

          {/* Language Toggle */}
          <div className="flex items-center bg-[#071d33] border border-[#1e446d] rounded-xs overflow-hidden">
            <button
              onClick={() => onLanguageChange('hi')}
              type="button"
              className={`px-2 py-0.5 cursor-pointer font-medium transition-colors ${
                language === 'hi'
                  ? 'bg-[#FF9933] text-black font-bold'
                  : 'text-slate-300 hover:text-white'
              }`}
              aria-label="हिन्दी संस्करण चुनें"
            >
              हिन्दी
            </button>
            <span className="text-slate-600 text-xs">|</span>
            <button
              onClick={() => onLanguageChange('en')}
              type="button"
              className={`px-2 py-0.5 cursor-pointer font-medium transition-colors ${
                language === 'en'
                  ? 'bg-[#FF9933] text-black font-bold'
                  : 'text-slate-300 hover:text-white'
              }`}
              aria-label="Select English version"
            >
              English
            </button>
          </div>

          {/* Detailed Accessibility Panel Button */}
          <button
            onClick={onOpenAccessibilityPanel}
            type="button"
            className="p-1 rounded-xs bg-[#071d33] border border-[#1e446d] text-slate-300 hover:text-white hover:bg-[#13375e] cursor-pointer"
            title="Advanced Accessibility Settings"
            aria-label="Advanced Accessibility Settings"
          >
            <Settings className="w-3.5 h-3.5 a11y-keep" />
          </button>
        </div>
      </div>
    </div>
  );
};
