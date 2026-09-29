import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { Language } from '../types';
import { UI_TRANSLATIONS } from '../data/portalData';

interface BreadcrumbProps {
  language: Language;
  onNavigateHome: () => void;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ language, onNavigateHome }) => {
  const t = UI_TRANSLATIONS[language];

  return (
    <nav aria-label="Breadcrumb" className="bg-[#f1f5f9] border-b border-slate-200 py-2 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex items-center space-x-1.5 text-xs text-slate-500">
        <button
          type="button"
          onClick={onNavigateHome}
          className="flex items-center text-[#003366] hover:underline font-medium cursor-pointer"
        >
          <Home className="w-3.5 h-3.5 mr-1 text-[#003366] a11y-keep" />
          <span>{t.breadcrumbHome}</span>
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0 a11y-keep" />
        <span className="text-[#003366] hover:underline cursor-pointer font-medium">
          {t.breadcrumbMinistries}
        </span>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0 a11y-keep" />
        <span className="text-slate-700 font-semibold truncate" aria-current="page">
          {t.breadcrumbMCA}
        </span>
      </div>
    </nav>
  );
};
