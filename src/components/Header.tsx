import React from 'react';
import { Search, Eye, Menu, X } from 'lucide-react';
import { Emblem } from './Emblem';
import { Language } from '../types';
import { UI_TRANSLATIONS } from '../data/portalData';

interface HeaderProps {
  language: Language;
  onOpenSearch: () => void;
  onOpenAccessibility: () => void;
  isMobileMenuOpen: boolean;
  onToggleMobileMenu: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  onOpenSearch,
  onOpenAccessibility,
  isMobileMenuOpen,
  onToggleMobileMenu,
}) => {
  const t = UI_TRANSLATIONS[language];

  return (
    <header className="bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5">
        <div className="flex items-center justify-between gap-4">
          {/* Left Brand Identity */}
          <div className="flex items-center space-x-3.5 sm:space-x-5">
            <Emblem size={50} />
            <div className="border-l border-slate-300 pl-3.5 sm:pl-5">
              <div className="text-[11px] sm:text-xs font-semibold tracking-wide text-slate-600 uppercase">
                {t.govOfIndia}
              </div>
              <div className="text-base sm:text-2xl font-bold text-[#003366] tracking-tight leading-tight">
                {t.ministryName}
              </div>
              <div className="hidden md:block text-[11px] text-slate-500 font-medium">
                {language === 'en'
                  ? 'Official Information & Regulatory Portal'
                  : 'आधिकारिक सूचना एवं विनियामक पोर्टल'}
              </div>
            </div>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              type="button"
              className="flex items-center space-x-1.5 px-3 py-2 text-xs font-semibold text-[#003366] bg-slate-50 border border-slate-300 hover:bg-slate-100 hover:border-[#003366] rounded-xs cursor-pointer transition-colors shadow-2xs"
              title="Search the portal"
              aria-label="Search website"
            >
              <Search className="w-4 h-4 text-[#003366] a11y-keep" />
              <span className="hidden sm:inline">
                {language === 'en' ? 'Search' : 'खोजें'}
              </span>
              <kbd className="hidden lg:inline-block ml-1 px-1.5 py-0.5 text-[10px] font-mono text-slate-500 bg-white border border-slate-200 rounded-xs">
                /
              </kbd>
            </button>

            {/* Accessibility Trigger */}
            <button
              onClick={onOpenAccessibility}
              type="button"
              className="p-2 text-slate-700 bg-slate-50 border border-slate-300 hover:bg-slate-100 hover:border-[#003366] rounded-xs cursor-pointer transition-colors"
              title="Accessibility Options"
              aria-label="Open accessibility settings"
            >
              <Eye className="w-4 h-4 text-[#003366] a11y-keep" />
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={onToggleMobileMenu}
              type="button"
              className="md:hidden p-2 text-slate-800 bg-slate-100 border border-slate-300 rounded-xs cursor-pointer hover:bg-slate-200 focus:outline-hidden"
              aria-label={isMobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-red-700 a11y-keep" />
              ) : (
                <Menu className="w-5 h-5 text-[#003366] a11y-keep" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Tricolour Accent Bar */}
      <div className="tiranga-stripe w-full" aria-hidden="true" />
    </header>
  );
};
