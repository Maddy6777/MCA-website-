import React, { useState, useMemo } from 'react';
import { X, Search, FileText, Calendar, Tag, ExternalLink, ArrowRight } from 'lucide-react';
import { Language, InformationDocument } from '../types';
import { INFORMATION_DOCUMENTS, ORGANIZATIONS_LIST } from '../data/portalData';
import { SEARCH_CATEGORIES } from './SearchSection';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  initialQuery?: string;
  initialCategory?: string;
  onSelectDocument: (doc: InformationDocument) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  language,
  initialQuery = '',
  initialCategory = 'all',
  onSelectDocument,
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  // Sync when initialQuery/category updates
  React.useEffect(() => {
    setQuery(initialQuery);
    setSelectedCategory(initialCategory);
  }, [initialQuery, initialCategory]);

  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();

    // Map doc results
    const docResults = INFORMATION_DOCUMENTS.map((doc) => {
      let mappedCat = 'documents';
      if (doc.category === 'acts_rules') mappedCat = 'acts';
      else if (doc.category === 'schemes') mappedCat = 'schemes';
      else if (doc.category === 'reports') mappedCat = 'reports';
      else if (doc.category === 'notifications') mappedCat = 'notifications';
      else if (doc.category === 'press_releases') mappedCat = 'news';

      return {
        id: doc.id,
        title: language === 'en' ? doc.title : doc.titleHi,
        category: mappedCat,
        categoryDisplay: doc.category.replace('_', ' ').toUpperCase(),
        date: doc.date,
        refNumber: doc.refNumber,
        snippet: language === 'en' ? doc.summary : doc.summaryHi,
        rawDoc: doc,
      };
    });

    // Map organization results as services/agencies
    const orgResults = ORGANIZATIONS_LIST.map((org) => ({
      id: org.id,
      title: language === 'en' ? org.name : org.nameHi,
      category: 'services',
      categoryDisplay: 'AGENCY / SERVICE',
      date: org.established ? `Est. ${org.established}` : 'Permanent Statutory Office',
      refNumber: org.shortCode,
      snippet: language === 'en' ? org.description : org.descriptionHi,
      website: org.website,
    }));

    const combined = [...docResults, ...orgResults];

    return combined.filter((item) => {
      const matchesCategory =
        selectedCategory === 'all' || item.category === selectedCategory;
      const matchesQuery =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.snippet.toLowerCase().includes(q) ||
        (item.refNumber && item.refNumber.toLowerCase().includes(q));
      return matchesCategory && matchesQuery;
    });
  }, [query, selectedCategory, language]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-2xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="search-modal-title"
    >
      <div className="bg-white rounded-xs shadow-2xl border border-slate-300 w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden animate-fadeIn">
        {/* Header */}
        <div className="bg-[#003366] text-white px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Search className="w-4 h-4 text-[#FF9933] a11y-keep" />
            <h2 id="search-modal-title" className="text-sm sm:text-base font-semibold">
              {language === 'en' ? 'Portal Search Results' : 'पोर्टल खोज परिणाम'}
            </h2>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="p-1 hover:bg-[#002244] rounded-xs text-slate-300 hover:text-white cursor-pointer"
            aria-label="Close search results"
          >
            <X className="w-5 h-5 a11y-keep" />
          </button>
        </div>

        {/* Search controls inside modal */}
        <div className="p-4 border-b border-slate-200 bg-slate-50 space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400 a11y-keep" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={
                language === 'en'
                  ? 'Refine search terms (e.g. Companies Act, CSR, ROC)...'
                  : 'खोज शब्द परिष्कृत करें...'
              }
              className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-slate-300 rounded-xs focus:ring-2 focus:ring-[#003366] outline-hidden"
              autoFocus
            />
          </div>

          {/* Filter pills */}
          <div className="flex items-center flex-wrap gap-1.5 text-xs">
            <span className="text-slate-500 font-medium text-[11px] mr-1">
              {language === 'en' ? 'Filter by Category:' : 'श्रेणी अनुसार:'}
            </span>
            {SEARCH_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-2 py-0.5 rounded-xs text-[11px] font-medium transition-colors cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#003366] text-white font-semibold'
                    : 'bg-white border border-slate-300 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {language === 'en' ? cat.labelEn : cat.labelHi}
              </button>
            ))}
          </div>
        </div>

        {/* Results List */}
        <div className="p-4 overflow-y-auto flex-1 divide-y divide-slate-200">
          <div className="pb-2 text-xs text-slate-500 flex justify-between items-center">
            <span>
              {language === 'en'
                ? `Showing ${searchResults.length} official records`
                : `${searchResults.length} आधिकारिक रिकॉर्ड प्रदर्शित`}
            </span>
            {query && (
              <span>
                {language === 'en' ? `Query: "${query}"` : `खोज: "${query}"`}
              </span>
            )}
          </div>

          {searchResults.length === 0 ? (
            <div className="py-12 text-center text-slate-500 text-sm">
              <p className="font-medium">
                {language === 'en'
                  ? 'No matching records found for this query.'
                  : 'इस खोज के लिए कोई मेल खाता रिकॉर्ड नहीं मिला।'}
              </p>
              <p className="text-xs text-slate-400 mt-1">
                {language === 'en'
                  ? 'Try broader keywords like "SPICe", "CSR", "ROC", or select "All Categories".'
                  : 'व्यापक कीवर्ड जैसे "SPICe", "CSR", "ROC" आज़माएँ।'}
              </p>
            </div>
          ) : (
            searchResults.map((item) => (
              <div key={item.id} className="py-3.5 hover:bg-slate-50 transition-colors">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2 text-[11px]">
                      <span className="inline-flex items-center px-1.5 py-0.5 bg-blue-50 text-[#003366] font-semibold rounded-xs border border-blue-200">
                        <Tag className="w-2.5 h-2.5 mr-1 a11y-keep" />
                        {item.categoryDisplay}
                      </span>
                      {item.refNumber && (
                        <span className="text-slate-500 font-mono">
                          {item.refNumber}
                        </span>
                      )}
                      <span className="text-slate-400">•</span>
                      <span className="inline-flex items-center text-slate-500">
                        <Calendar className="w-3 h-3 mr-1 a11y-keep" />
                        {item.date}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-[#003366] leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {item.snippet}
                    </p>
                  </div>

                  <div className="shrink-0 pt-1">
                    {'rawDoc' in item && item.rawDoc ? (
                      <button
                        type="button"
                        onClick={() => {
                          onSelectDocument(item.rawDoc);
                          onClose();
                        }}
                        className="inline-flex items-center px-2.5 py-1 text-xs font-semibold text-[#003366] bg-slate-100 hover:bg-[#003366] hover:text-white border border-slate-300 rounded-xs transition-colors cursor-pointer"
                      >
                        <FileText className="w-3.5 h-3.5 mr-1 a11y-keep" />
                        <span>{language === 'en' ? 'View' : 'देखें'}</span>
                      </button>
                    ) : 'website' in item && item.website ? (
                      <a
                        href={item.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-2.5 py-1 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-xs transition-colors"
                      >
                        <span>{language === 'en' ? 'Portal' : 'पोर्टल'}</span>
                        <ExternalLink className="w-3 h-3 ml-1 a11y-keep" />
                      </a>
                    ) : null}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-100 px-4 py-2.5 border-t border-slate-200 text-xs text-slate-500 flex justify-between items-center">
          <span>{language === 'en' ? 'MCA Information Portal Search Engine' : 'एमसीए सूचना पोर्टल सर्च इंजन'}</span>
          <button
            onClick={onClose}
            type="button"
            className="px-3 py-1 bg-white border border-slate-300 hover:bg-slate-50 rounded-xs text-slate-700 font-medium cursor-pointer"
          >
            {language === 'en' ? 'Close' : 'बंद करें'}
          </button>
        </div>
      </div>
    </div>
  );
};
