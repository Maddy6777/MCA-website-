import React from 'react';
import {
  X,
  Eye,
  Type,
  Sun,
  MousePointer,
  ImageOff,
  AlignJustify,
  Volume2,
  RotateCcw,
  Sparkles,
  Check,
} from 'lucide-react';
import { AccessibilitySettings, Language, TextSize } from '../types';

interface AccessibilityPanelProps {
  isOpen: boolean;
  onClose: () => void;
  settings: AccessibilitySettings;
  onUpdateSettings: (newSettings: Partial<AccessibilitySettings>) => void;
  onResetSettings: () => void;
  onScreenReaderAnnounce: () => void;
  language: Language;
}

export const AccessibilityPanel: React.FC<AccessibilityPanelProps> = ({
  isOpen,
  onClose,
  settings,
  onUpdateSettings,
  onResetSettings,
  onScreenReaderAnnounce,
  language,
}) => {
  if (!isOpen) return null;

  const fontSizes: { size: TextSize; label: string; desc: string }[] = [
    { size: 'sm', label: 'A-', desc: language === 'en' ? 'Small' : 'छोटा' },
    { size: 'normal', label: 'A', desc: language === 'en' ? 'Standard' : 'सामान्य' },
    { size: 'lg', label: 'A+', desc: language === 'en' ? 'Large' : 'बड़ा' },
    { size: 'xl', label: 'A++', desc: language === 'en' ? 'Extra Large' : 'अति विशाल' },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-2xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="accessibility-panel-title"
    >
      <div className="bg-white rounded-xs shadow-2xl border border-slate-300 w-full max-w-lg max-h-[90vh] flex flex-col overflow-hidden animate-fadeIn">
        {/* Panel Header */}
        <div className="bg-[#003366] text-white px-4 py-3 flex items-center justify-between border-b border-[#1b436e]">
          <div className="flex items-center space-x-2">
            <Eye className="w-5 h-5 text-[#FF9933] a11y-keep" />
            <h2 id="accessibility-panel-title" className="text-sm sm:text-base font-bold">
              {language === 'en' ? 'Accessibility Options & Assistive Tools' : 'अभिगम्यता विकल्प एवं सहायक उपकरण'}
            </h2>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="p-1 hover:bg-[#002244] rounded-xs text-slate-300 hover:text-white cursor-pointer"
            aria-label="Close Accessibility Panel"
          >
            <X className="w-5 h-5 a11y-keep" />
          </button>
        </div>

        {/* Panel Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 divide-y divide-slate-200">
          {/* 1. Font Size Adjustment */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-xs font-bold text-[#003366] uppercase tracking-wide">
              <Type className="w-4 h-4 text-[#003366] a11y-keep" />
              <span>{language === 'en' ? 'Text Size Scaling' : 'पाठ आकार समायोजन'}</span>
            </div>
            <p className="text-xs text-slate-600">
              {language === 'en'
                ? 'Adjust typography scale across the portal for enhanced readability.'
                : 'बेहतर पठनीयता के लिए पोर्टल भर में पाठ का आकार समायोजित करें।'}
            </p>
            <div className="grid grid-cols-4 gap-2 pt-1">
              {fontSizes.map((f) => (
                <button
                  key={f.size}
                  type="button"
                  onClick={() => onUpdateSettings({ textSize: f.size })}
                  className={`p-2 rounded-xs border text-center transition-all cursor-pointer ${
                    settings.textSize === f.size
                      ? 'bg-[#003366] text-white border-[#003366] font-bold shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-300 hover:bg-slate-100'
                  }`}
                >
                  <span className="block text-sm font-bold">{f.label}</span>
                  <span className="block text-[10px] opacity-80">{f.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 2. High Contrast Mode */}
          <div className="pt-4 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-xs font-bold text-[#003366] uppercase tracking-wide">
                <Sun className="w-4 h-4 text-[#003366] a11y-keep" />
                <span>{language === 'en' ? 'High Contrast Mode' : 'उच्च कंट्रास्ट मोड'}</span>
              </div>
              <button
                type="button"
                onClick={() => onUpdateSettings({ highContrast: !settings.highContrast })}
                className={`px-3 py-1 text-xs font-bold rounded-xs cursor-pointer transition-colors ${
                  settings.highContrast
                    ? 'bg-yellow-400 text-black border border-yellow-500'
                    : 'bg-slate-100 text-slate-700 border border-slate-300 hover:bg-slate-200'
                }`}
                aria-pressed={settings.highContrast}
              >
                {settings.highContrast
                  ? language === 'en' ? 'Enabled (Yellow/Black)' : 'सक्रिय (पीला/काला)'
                  : language === 'en' ? 'Normal Contrast' : 'सामान्य कंट्रास्ट'}
              </button>
            </div>
            <p className="text-xs text-slate-600">
              {language === 'en'
                ? 'Converts layout to high-contrast monochrome scheme compliant with WCAG AAA guidelines.'
                : 'लेआउट को उच्च-कंट्रास्ट योजना में बदलता है।'}
            </p>
          </div>

          {/* 3. Text Spacing & Line Height */}
          <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Increased Spacing */}
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800">
                  {language === 'en' ? 'Text Spacing' : 'अक्षर अंतर'}
                </span>
                <input
                  type="checkbox"
                  id="toggle-spacing"
                  checked={settings.increasedSpacing}
                  onChange={(e) => onUpdateSettings({ increasedSpacing: e.target.checked })}
                  className="w-4 h-4 text-[#003366] rounded-xs cursor-pointer"
                />
              </div>
              <p className="text-[11px] text-slate-500">
                {language === 'en'
                  ? 'Expands letter and word spacing for dyslexia comfort.'
                  : 'अक्षरों और शब्दों के बीच अंतर बढ़ाता है।'}
              </p>
            </div>

            {/* Increased Line Height */}
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800">
                  {language === 'en' ? 'Line Height' : 'पंक्ति ऊंचाई'}
                </span>
                <input
                  type="checkbox"
                  id="toggle-lineheight"
                  checked={settings.increasedLineHeight}
                  onChange={(e) => onUpdateSettings({ increasedLineHeight: e.target.checked })}
                  className="w-4 h-4 text-[#003366] rounded-xs cursor-pointer"
                />
              </div>
              <p className="text-[11px] text-slate-500">
                {language === 'en'
                  ? 'Increases line spacing to 1.9x for relaxed scanning.'
                  : 'आसान पढ़ने के लिए पंक्तियों के बीच स्थान बढ़ाता है।'}
              </p>
            </div>
          </div>

          {/* 4. Assistive Vision Modes: Hide Images & Big Cursor */}
          <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Hide Images */}
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xs space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1.5">
                  <ImageOff className="w-3.5 h-3.5 text-slate-600 a11y-keep" />
                  <span className="text-xs font-bold text-slate-800">
                    {language === 'en' ? 'Hide Images' : 'चित्र छिपाएँ'}
                  </span>
                </div>
                <input
                  type="checkbox"
                  id="toggle-hideimages"
                  checked={settings.hideImages}
                  onChange={(e) => onUpdateSettings({ hideImages: e.target.checked })}
                  className="w-4 h-4 text-[#003366] rounded-xs cursor-pointer"
                />
              </div>
              <p className="text-[11px] text-slate-500">
                {language === 'en'
                  ? 'Removes graphic visuals for distraction-free reading.'
                  : 'चित्रों को छुपाकर केवल पाठ प्रदर्शित करता है।'}
              </p>
            </div>

            {/* Big Cursor */}
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xs space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1.5">
                  <MousePointer className="w-3.5 h-3.5 text-slate-600 a11y-keep" />
                  <span className="text-xs font-bold text-slate-800">
                    {language === 'en' ? 'Big Cursor' : 'बड़ा कर्सर'}
                  </span>
                </div>
                <input
                  type="checkbox"
                  id="toggle-bigcursor"
                  checked={settings.bigCursor}
                  onChange={(e) => onUpdateSettings({ bigCursor: e.target.checked })}
                  className="w-4 h-4 text-[#003366] rounded-xs cursor-pointer"
                />
              </div>
              <p className="text-[11px] text-slate-500">
                {language === 'en'
                  ? 'Enlarges mouse pointer for motor and low-vision tracking.'
                  : 'माउस कर्सर का आकार बढ़ाता है।'}
              </p>
            </div>
          </div>

          {/* 5. Audio Synthesizer / Screen Reader Overview */}
          <div className="pt-4 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-xs font-bold text-[#003366] uppercase tracking-wide">
                <Volume2 className="w-4 h-4 text-[#003366] a11y-keep" />
                <span>{language === 'en' ? 'Screen Reader Audio Announcer' : 'स्क्रीन रीडर ऑडियो उद्घोषक'}</span>
              </div>
              <button
                type="button"
                onClick={onScreenReaderAnnounce}
                className="px-3 py-1.5 bg-[#003366] hover:bg-[#002244] text-white text-xs font-semibold rounded-xs cursor-pointer flex items-center space-x-1.5 transition-colors"
              >
                <Volume2 className="w-3.5 h-3.5 a11y-keep" />
                <span>{language === 'en' ? 'Listen to Page Summary' : 'पृष्ठ सारांश सुनें'}</span>
              </button>
            </div>
            <p className="text-xs text-slate-600">
              {language === 'en'
                ? 'Uses the browser SpeechSynthesis engine to audibly announce portal navigation landmarks and contact coordinates.'
                : 'पोर्टल नेविगेशन और संपर्क विवरण का ऑडियो विवरण प्रदान करता है।'}
            </p>
          </div>

          {/* Keyboard Shortcuts Info */}
          <div className="pt-4 bg-slate-50 p-3 rounded-xs border border-slate-200 text-xs text-slate-600 space-y-1">
            <span className="font-bold text-[#003366] block">
              {language === 'en' ? 'Keyboard Navigation Shortcuts:' : 'कीबोर्ड शॉर्टकट:'}
            </span>
            <div className="grid grid-cols-2 gap-1 text-[11px]">
              <div>
                <kbd className="px-1.5 py-0.5 bg-white border border-slate-300 rounded-xs font-mono font-bold">
                  Tab
                </kbd>{' '}
                Navigate elements
              </div>
              <div>
                <kbd className="px-1.5 py-0.5 bg-white border border-slate-300 rounded-xs font-mono font-bold">
                  /
                </kbd>{' '}
                Search website
              </div>
              <div>
                <kbd className="px-1.5 py-0.5 bg-white border border-slate-300 rounded-xs font-mono font-bold">
                  Esc
                </kbd>{' '}
                Close modal/menu
              </div>
              <div>
                <kbd className="px-1.5 py-0.5 bg-white border border-slate-300 rounded-xs font-mono font-bold">
                  Enter
                </kbd>{' '}
                Activate links
              </div>
            </div>
          </div>
        </div>

        {/* Panel Footer */}
        <div className="bg-slate-100 px-4 py-3 border-t border-slate-200 flex items-center justify-between">
          <button
            type="button"
            onClick={onResetSettings}
            className="inline-flex items-center space-x-1 px-3 py-1.5 bg-white border border-slate-300 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-xs cursor-pointer transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-500 a11y-keep" />
            <span>{language === 'en' ? 'Reset All Defaults' : 'सभी डिफ़ॉल्ट रीसेट करें'}</span>
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 bg-[#003366] hover:bg-[#002244] text-white text-xs font-semibold rounded-xs cursor-pointer transition-colors"
          >
            {language === 'en' ? 'Done / Close' : 'पूर्ण / बंद करें'}
          </button>
        </div>
      </div>
    </div>
  );
};
