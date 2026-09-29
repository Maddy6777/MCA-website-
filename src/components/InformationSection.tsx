import React, { useState } from 'react';
import {
  FileText,
  Calendar,
  Eye,
  Download,
  Tag,
  Search,
  BookOpen,
  Filter,
} from 'lucide-react';
import { Language, InfoCategory, InformationDocument } from '../types';
import { INFORMATION_DOCUMENTS, UI_TRANSLATIONS } from '../data/portalData';

interface InformationSectionProps {
  language: Language;
  onSelectDocument: (doc: InformationDocument) => void;
  activeCategoryOverride?: InfoCategory;
}

const TABS: { id: InfoCategory; labelEn: string; labelHi: string }[] = [
  { id: 'notifications', labelEn: 'Latest Notifications', labelHi: 'नवीनतम अधिसूचनाएं' },
  { id: 'updates', labelEn: 'Important Updates', labelHi: 'महत्वपूर्ण अपडेट' },
  { id: 'circulars', labelEn: 'Circulars', labelHi: 'परिपत्र' },
  { id: 'press_releases', labelEn: 'Press Releases', labelHi: 'प्रेस विज्ञप्ति' },
  { id: 'reports', labelEn: 'Reports', labelHi: 'रिपोर्ट' },
  { id: 'acts_rules', labelEn: 'Acts & Rules', labelHi: 'अधिनियम एवं नियम' },
  { id: 'schemes', labelEn: 'Schemes & Programmes', labelHi: 'योजनाएं एवं कार्यक्रम' },
];

export const InformationSection: React.FC<InformationSectionProps> = ({
  language,
  onSelectDocument,
  activeCategoryOverride,
}) => {
  const [activeTab, setActiveTab] = useState<InfoCategory>('notifications');
  const [filterText, setFilterText] = useState('');
  const t = UI_TRANSLATIONS[language];

  // Sync if override requested from navigation
  React.useEffect(() => {
    if (activeCategoryOverride) {
      setActiveTab(activeCategoryOverride);
    }
  }, [activeCategoryOverride]);

  const currentTabDocs = INFORMATION_DOCUMENTS.filter(
    (doc) => doc.category === activeTab
  );

  const filteredDocs = currentTabDocs.filter((doc) => {
    const q = filterText.toLowerCase();
    const title = (language === 'en' ? doc.title : doc.titleHi).toLowerCase();
    const summary = (language === 'en' ? doc.summary : doc.summaryHi).toLowerCase();
    const ref = (doc.refNumber || '').toLowerCase();
    return !q || title.includes(q) || summary.includes(q) || ref.includes(q);
  });

  return (
    <section
      id="info-section"
      className="bg-white border border-slate-300 rounded-xs shadow-2xs overflow-hidden"
      aria-labelledby="info-heading"
    >
      {/* Section Header */}
      <div className="bg-[#003366] text-white px-4 sm:px-6 py-3 flex items-center justify-between border-b border-[#1b436e]">
        <div className="flex items-center space-x-2">
          <BookOpen className="w-4 h-4 text-[#FF9933] a11y-keep" />
          <h2 id="info-heading" className="text-base sm:text-lg font-bold tracking-tight">
            {t.latestInfoHeading}
          </h2>
        </div>
        <span className="text-[11px] font-medium text-blue-200">
          {language === 'en' ? 'Official Documents & Gazette' : 'आधिकारिक दस्तावेज एवं राजपत्र'}
        </span>
      </div>

      {/* Tabs Bar */}
      <div className="bg-[#f1f5f9] border-b border-slate-300 px-2 sm:px-4 pt-2 overflow-x-auto scrollbar-none">
        <div className="flex space-x-1 sm:space-x-1.5 min-w-max pb-px" role="tablist">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => {
                  setActiveTab(tab.id);
                  setFilterText('');
                }}
                className={`px-3 py-2 text-xs font-semibold rounded-t-xs border-t border-x transition-colors cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-white text-[#003366] border-slate-300 border-b-2 border-b-white -mb-px shadow-2xs'
                    : 'bg-slate-200/70 text-slate-600 border-transparent hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                {language === 'en' ? tab.labelEn : tab.labelHi}
              </button>
            );
          })}
        </div>
      </div>

      <div className="p-4 sm:p-6 space-y-4">
        {/* In-tab search & filter */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-[#f8fafc] p-2.5 rounded-xs border border-slate-200">
          <div className="relative flex-1 max-w-md">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400 a11y-keep" />
            <input
              type="text"
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              placeholder={
                language === 'en'
                  ? 'Filter by title, reference number, or keywords...'
                  : 'शीर्षक या संदर्भ संख्या से फ़िल्टर करें...'
              }
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-300 rounded-xs focus:ring-1 focus:ring-[#003366] outline-hidden"
            />
          </div>
          <div className="text-xs text-slate-500 flex items-center space-x-2">
            <Filter className="w-3 h-3 text-slate-400 a11y-keep" />
            <span>
              {language === 'en'
                ? `Showing ${filteredDocs.length} of ${currentTabDocs.length} documents`
                : `${currentTabDocs.length} में से ${filteredDocs.length} दस्तावेज प्रदर्शित`}
            </span>
          </div>
        </div>

        {/* Documents Table / List */}
        <div className="divide-y divide-slate-200 border border-slate-200 rounded-xs overflow-hidden">
          {filteredDocs.length === 0 ? (
            <div className="py-8 text-center text-slate-500 text-xs">
              {language === 'en'
                ? 'No documents found matching the filter criteria.'
                : 'फ़िल्टर से मेल खाता कोई दस्तावेज़ नहीं मिला।'}
            </div>
          ) : (
            filteredDocs.map((doc) => (
              <div
                key={doc.id}
                className="p-3.5 sm:p-4 bg-white hover:bg-slate-50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="space-y-1.5 flex-1 pr-2">
                  <div className="flex flex-wrap items-center gap-2 text-[11px]">
                    <span className="inline-flex items-center px-1.5 py-0.2 bg-blue-50 text-[#003366] font-semibold rounded-xs border border-blue-200">
                      <Tag className="w-2.5 h-2.5 mr-1 a11y-keep" />
                      {doc.category.replace('_', ' ').toUpperCase()}
                    </span>
                    {doc.refNumber && (
                      <span className="text-slate-600 font-mono font-medium">
                        [{doc.refNumber}]
                      </span>
                    )}
                    <span className="text-slate-400">•</span>
                    <span className="inline-flex items-center text-slate-500">
                      <Calendar className="w-3 h-3 mr-1 a11y-keep" />
                      {doc.date}
                    </span>
                    {doc.fileSize && (
                      <span className="text-slate-400 text-[10px]">
                        ({doc.fileType} • {doc.fileSize})
                      </span>
                    )}
                  </div>

                  <h3 className="text-sm font-bold text-[#003366] leading-snug">
                    {language === 'en' ? doc.title : doc.titleHi}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {language === 'en' ? doc.summary : doc.summaryHi}
                  </p>
                </div>

                {/* Document Actions */}
                <div className="flex items-center space-x-2 shrink-0 pt-1 sm:pt-0">
                  <button
                    type="button"
                    onClick={() => onSelectDocument(doc)}
                    className="inline-flex items-center space-x-1 px-3 py-1.5 bg-[#003366] hover:bg-[#002244] text-white text-xs font-semibold rounded-xs transition-colors cursor-pointer shadow-2xs"
                    title="View Document Details"
                  >
                    <Eye className="w-3.5 h-3.5 a11y-keep" />
                    <span>{t.viewDoc}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onSelectDocument(doc)}
                    className="inline-flex items-center space-x-1 px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-xs border border-slate-300 transition-colors cursor-pointer"
                    title="Download Official Gazette Copy"
                  >
                    <Download className="w-3.5 h-3.5 text-slate-500 a11y-keep" />
                    <span className="hidden xs:inline">{t.downloadPdf}</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};
