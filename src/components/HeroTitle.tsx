import React from 'react';
import { ShieldCheck, ExternalLink, FileSpreadsheet, Building2 } from 'lucide-react';
import { Language } from '../types';

interface HeroTitleProps {
  language: Language;
  onOpenCompanySearch: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const HeroTitle: React.FC<HeroTitleProps> = ({
  language,
  onOpenCompanySearch,
  onNavigateSection,
}) => {
  return (
    <section
      id="hero-section"
      className="bg-white border-b border-slate-200 py-6 px-4 sm:px-6 relative overflow-hidden"
    >
      {/* Subtle tricolour left bar accent */}
      <div className="absolute left-0 top-0 bottom-0 w-1.5 tiranga-stripe-vertical" aria-hidden="true" />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 mb-2 bg-blue-50 border border-blue-200 rounded-xs text-[11px] font-semibold text-[#003366]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#003366] a11y-keep" />
            <span>
              {language === 'en'
                ? 'Central Government Public Information Portal'
                : 'केंद्रीय सरकार लोक सूचना पोर्टल'}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#003366] tracking-tight">
            {language === 'en' ? 'Corporate Affairs (MCA)' : 'कॉरपोरेट कार्य मंत्रालय (एमसीए)'}
          </h1>
          <p className="text-sm sm:text-base text-slate-600 font-medium mt-1">
            {language === 'en'
              ? 'Ministry of Corporate Affairs, Government of India'
              : 'कॉरपोरेट कार्य मंत्रालय, भारत सरकार'}
          </p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-xs text-slate-500">
            <span>
              <strong className="text-slate-700">
                {language === 'en' ? 'Mandate:' : 'अधिदेश:'}
              </strong>{' '}
              {language === 'en'
                ? 'Companies Act 2013 • LLP Act 2008 • IBC 2016'
                : 'कंपनी अधिनियम 2013 • एलएलपी अधिनियम 2008 • आईबीसी 2016'}
            </span>
            <span className="hidden sm:inline text-slate-300">•</span>
            <span>
              <strong className="text-slate-700">
                {language === 'en' ? 'Jurisdiction:' : 'क्षेत्राधिकार:'}
              </strong>{' '}
              {language === 'en' ? 'Republic of India (Pan-India)' : 'भारत गणराज्य (अखिल भारतीय)'}
            </span>
          </div>
        </div>

        {/* Action Shortcut Badges */}
        <div className="flex flex-wrap items-center gap-2 pt-2 md:pt-0">
          <button
            type="button"
            onClick={onOpenCompanySearch}
            className="flex items-center space-x-1.5 px-3 py-2 bg-[#003366] hover:bg-[#002244] text-white text-xs font-semibold rounded-xs border border-[#003366] transition-colors cursor-pointer shadow-xs"
          >
            <Building2 className="w-3.5 h-3.5 a11y-keep text-[#FF9933]" />
            <span>{language === 'en' ? 'Company Master Data' : 'कंपनी मास्टर डेटा'}</span>
          </button>
          <button
            type="button"
            onClick={() => onNavigateSection('info-section-notifications')}
            className="flex items-center space-x-1.5 px-3 py-2 bg-slate-50 hover:bg-slate-100 text-[#003366] text-xs font-semibold rounded-xs border border-slate-300 transition-colors cursor-pointer shadow-2xs"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 a11y-keep" />
            <span>{language === 'en' ? 'Latest Gazette Orders' : 'नवीनतम राजपत्र आदेश'}</span>
          </button>
          <a
            href="https://mca.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1 px-3 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-medium rounded-xs border border-slate-300 transition-colors"
          >
            <span>{language === 'en' ? 'Official MCA.gov.in' : 'आधिकारिक MCA.gov.in'}</span>
            <ExternalLink className="w-3 h-3 text-slate-400 a11y-keep" />
          </a>
        </div>
      </div>
    </section>
  );
};
