import React, { useState } from 'react';
import { Search, SlidersHorizontal, ArrowRight } from 'lucide-react';
import { Language } from '../types';
import { UI_TRANSLATIONS } from '../data/portalData';

export const SEARCH_CATEGORIES = [
  { id: 'all', labelEn: 'All Categories', labelHi: 'सभी श्रेणियां' },
  { id: 'acts', labelEn: 'Acts', labelHi: 'अधिनियम' },
  { id: 'services', labelEn: 'Services', labelHi: 'सेवाएं' },
  { id: 'notifications', labelEn: 'Notifications', labelHi: 'अधिसूचनाएं' },
  { id: 'schemes', labelEn: 'Schemes', labelHi: 'योजनाएं' },
  { id: 'reports', labelEn: 'Reports', labelHi: 'रिपोर्ट' },
  { id: 'news', labelEn: 'News & Press', labelHi: 'समाचार एवं प्रेस' },
  { id: 'documents', labelEn: 'Documents & Forms', labelHi: 'दस्तावेज एवं प्रपत्र' },
];

interface SearchSectionProps {
  language: Language;
  onSearchSubmit: (query: string, category: string) => void;
  onOpenCompanySearch: () => void;
}

export const SearchSection: React.FC<SearchSectionProps> = ({
  language,
  onSearchSubmit,
  onOpenCompanySearch,
}) => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const t = UI_TRANSLATIONS[language];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchSubmit(query, category);
  };

  const handleQuickTagClick = (tagQuery: string, tagCat: string = 'all') => {
    setQuery(tagQuery);
    setCategory(tagCat);
    onSearchSubmit(tagQuery, tagCat);
  };

  return (
    <section className="bg-[#f1f5f9] border-b border-slate-200 py-6 px-4 sm:px-6" aria-label="Portal Search">
      <div className="max-w-7xl mx-auto">
        <form onSubmit={handleSubmit} className="bg-white p-3 sm:p-4 rounded-xs border border-slate-300 shadow-sm">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            {/* Category Selector */}
            <div className="relative shrink-0 sm:w-48">
              <label htmlFor="search-category" className="sr-only">
                {language === 'en' ? 'Select Category' : 'श्रेणी चुनें'}
              </label>
              <div className="flex items-center absolute inset-y-0 left-0 pl-3 pointer-events-none text-slate-500">
                <SlidersHorizontal className="w-3.5 h-3.5 a11y-keep" />
              </div>
              <select
                id="search-category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full pl-9 pr-8 py-2 text-xs font-medium text-slate-700 bg-slate-50 border border-slate-300 rounded-xs focus:ring-1 focus:ring-[#003366] focus:border-[#003366] outline-hidden cursor-pointer"
              >
                {SEARCH_CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {language === 'en' ? cat.labelEn : cat.labelHi}
                  </option>
                ))}
              </select>
            </div>

            {/* Search Input Box */}
            <div className="relative flex-1">
              <label htmlFor="main-search-input" className="sr-only">
                {t.searchPlaceholder}
              </label>
              <div className="flex items-center absolute inset-y-0 left-0 pl-3 pointer-events-none text-slate-400">
                <Search className="w-4 h-4 a11y-keep" />
              </div>
              <input
                id="main-search-input"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm text-slate-800 placeholder-slate-400 bg-white border border-slate-300 rounded-xs focus:ring-2 focus:ring-[#003366] focus:border-[#003366] outline-hidden"
              />
            </div>

            {/* Search Button */}
            <button
              type="submit"
              className="flex items-center justify-center space-x-1.5 px-6 py-2 bg-[#003366] hover:bg-[#002244] text-white text-xs sm:text-sm font-semibold rounded-xs transition-colors cursor-pointer shrink-0"
            >
              <Search className="w-4 h-4 a11y-keep" />
              <span>{t.searchButton}</span>
            </button>
          </div>

          {/* Trending Search Topics */}
          <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-500 font-medium">
              {language === 'en' ? 'Quick Searches:' : 'त्वरित खोजें:'}
            </span>
            <button
              type="button"
              onClick={() => handleQuickTagClick('SPICe+', 'schemes')}
              className="px-2 py-0.5 bg-slate-100 hover:bg-[#003366] hover:text-white text-slate-700 rounded-xs border border-slate-200 transition-colors cursor-pointer text-[11px]"
            >
              SPICe+ Incorporation
            </button>
            <button
              type="button"
              onClick={() => handleQuickTagClick('CSR-2', 'notifications')}
              className="px-2 py-0.5 bg-slate-100 hover:bg-[#003366] hover:text-white text-slate-700 rounded-xs border border-slate-200 transition-colors cursor-pointer text-[11px]"
            >
              Form CSR-2
            </button>
            <button
              type="button"
              onClick={() => handleQuickTagClick('Dematerialisation', 'notifications')}
              className="px-2 py-0.5 bg-slate-100 hover:bg-[#003366] hover:text-white text-slate-700 rounded-xs border border-slate-200 transition-colors cursor-pointer text-[11px]"
            >
              Rule 9B Demat
            </button>
            <button
              type="button"
              onClick={() => handleQuickTagClick('PM Internship', 'schemes')}
              className="px-2 py-0.5 bg-slate-100 hover:bg-[#003366] hover:text-white text-slate-700 rounded-xs border border-slate-200 transition-colors cursor-pointer text-[11px]"
            >
              PM Internship Scheme
            </button>
            <button
              type="button"
              onClick={() => handleQuickTagClick('Companies Act 2013', 'acts')}
              className="px-2 py-0.5 bg-slate-100 hover:bg-[#003366] hover:text-white text-slate-700 rounded-xs border border-slate-200 transition-colors cursor-pointer text-[11px]"
            >
              Companies Act 2013
            </button>
            <button
              type="button"
              onClick={onOpenCompanySearch}
              className="ml-auto inline-flex items-center text-[#003366] font-semibold hover:underline text-[11px] cursor-pointer"
            >
              <span>{language === 'en' ? 'Looking for Company Status?' : 'कंपनी स्थिति खोज रहे हैं?'}</span>
              <ArrowRight className="w-3 h-3 ml-0.5 a11y-keep" />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};
