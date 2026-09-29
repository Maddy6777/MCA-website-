import React from 'react';
import {
  Globe,
  FileText,
  Search,
  Briefcase,
  Download,
  BookOpen,
  Bell,
  PhoneCall,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import { Language } from '../types';
import { QUICK_LINKS, UI_TRANSLATIONS } from '../data/portalData';

interface SidebarQuickLinksProps {
  language: Language;
  onOpenCompanySearch: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const SidebarQuickLinks: React.FC<SidebarQuickLinksProps> = ({
  language,
  onOpenCompanySearch,
  onNavigateSection,
}) => {
  const t = UI_TRANSLATIONS[language];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Globe':
        return <Globe className="w-4 h-4 a11y-keep" />;
      case 'FileText':
        return <FileText className="w-4 h-4 a11y-keep" />;
      case 'Search':
        return <Search className="w-4 h-4 a11y-keep" />;
      case 'Briefcase':
        return <Briefcase className="w-4 h-4 a11y-keep" />;
      case 'Download':
        return <Download className="w-4 h-4 a11y-keep" />;
      case 'BookOpen':
        return <BookOpen className="w-4 h-4 a11y-keep" />;
      case 'Bell':
        return <Bell className="w-4 h-4 a11y-keep" />;
      case 'PhoneCall':
        return <PhoneCall className="w-4 h-4 a11y-keep" />;
      default:
        return <ExternalLink className="w-4 h-4 a11y-keep" />;
    }
  };

  const handleLinkClick = (item: typeof QUICK_LINKS[0]) => {
    if (item.actionType === 'company_search') {
      onOpenCompanySearch();
    } else if (item.actionType === 'acts_rules') {
      onNavigateSection('info-section-acts');
    } else if (item.actionType === 'notifications') {
      onNavigateSection('info-section-notifications');
    } else if (item.actionType === 'contact') {
      onNavigateSection('contact-section');
    } else if (item.url) {
      window.open(item.url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <aside
      id="quicklinks-section"
      className="bg-white border border-slate-300 rounded-xs shadow-2xs overflow-hidden"
      aria-labelledby="quick-links-heading"
    >
      {/* Header */}
      <div className="bg-[#003366] text-white px-4 py-3 flex items-center justify-between border-b border-[#1b436e]">
        <h2 id="quick-links-heading" className="text-sm sm:text-base font-bold tracking-tight">
          {t.quickLinksHeading}
        </h2>
        <span className="text-[10px] bg-amber-500/20 text-amber-300 font-bold px-1.5 py-0.5 rounded-xs border border-amber-400/40">
          Services
        </span>
      </div>

      {/* Button Links List */}
      <div className="p-3 space-y-2">
        {QUICK_LINKS.map((link) => (
          <button
            key={link.title}
            type="button"
            onClick={() => handleLinkClick(link)}
            className="w-full text-left p-2.5 bg-[#f8fafc] hover:bg-slate-100 border border-slate-300 hover:border-[#003366] rounded-xs transition-colors flex items-center justify-between group cursor-pointer"
          >
            <div className="flex items-center space-x-2.5 min-w-0 pr-2">
              <div className="p-1.5 bg-blue-50 text-[#003366] rounded-xs border border-blue-200 group-hover:bg-[#003366] group-hover:text-white transition-colors shrink-0">
                {getIcon(link.icon)}
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-[#003366] group-hover:text-[#002244] truncate">
                  {language === 'en' ? link.title : link.titleHi}
                </div>
                <div className="text-[10px] text-slate-500 truncate">
                  {language === 'en' ? link.desc : link.descHi}
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-1 shrink-0">
              <span className="text-[10px] font-semibold text-slate-500 bg-white border border-slate-200 px-1.5 py-0.2 rounded-xs">
                {link.tag}
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#003366] a11y-keep" />
            </div>
          </button>
        ))}

        {/* Highlighted Direct Tool Card */}
        <div className="mt-3 p-3 bg-blue-50/80 border border-blue-200 rounded-xs">
          <div className="flex items-start space-x-2">
            <ShieldCheck className="w-4 h-4 text-[#003366] shrink-0 mt-0.5 a11y-keep" />
            <div className="text-xs">
              <span className="font-bold text-[#003366] block">
                {language === 'en' ? 'Check Company Master Data' : 'कंपनी मास्टर डेटा जांचें'}
              </span>
              <p className="text-[11px] text-slate-600 mt-0.5">
                {language === 'en'
                  ? 'Instant lookup for active companies, ROC jurisdiction, and capital records.'
                  : 'सक्रिय कंपनियों, आरओसी क्षेत्राधिकार और पूंजी रिकॉर्ड की त्वरित खोज।'}
              </p>
              <button
                type="button"
                onClick={onOpenCompanySearch}
                className="mt-2 w-full py-1.5 px-3 bg-[#003366] hover:bg-[#002244] text-white text-xs font-semibold rounded-xs transition-colors cursor-pointer"
              >
                {language === 'en' ? 'Launch Search Tool' : 'सर्च टूल प्रारंभ करें'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
