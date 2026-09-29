import React, { useState } from 'react';
import { Network, ExternalLink, MapPin, Calendar, Building, ChevronRight } from 'lucide-react';
import { Language, OrganizationCategory, OrganizationItem } from '../types';
import {
  ORGANIZATION_CATEGORIES,
  ORGANIZATIONS_LIST,
  UI_TRANSLATIONS,
} from '../data/portalData';

interface OrganizationsUnderMinistryProps {
  language: Language;
}

export const OrganizationsUnderMinistry: React.FC<OrganizationsUnderMinistryProps> = ({
  language,
}) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(
    ORGANIZATION_CATEGORIES[0].id
  );
  const t = UI_TRANSLATIONS[language];

  const activeCategory = ORGANIZATION_CATEGORIES.find(
    (c) => c.id === selectedCategoryId
  ) || ORGANIZATION_CATEGORIES[0];

  const currentOrganizations = ORGANIZATIONS_LIST.filter(
    (org) => org.categoryId === selectedCategoryId
  );

  return (
    <section
      id="orgs-under-ministry-section"
      className="bg-white border border-slate-300 rounded-xs shadow-2xs overflow-hidden"
      aria-labelledby="orgs-under-ministry-heading"
    >
      {/* Section Header */}
      <div className="bg-[#003366] text-white px-4 sm:px-6 py-3 flex items-center justify-between border-b border-[#1b436e]">
        <div className="flex items-center space-x-2">
          <Network className="w-4 h-4 text-[#FF9933] a11y-keep" />
          <h2
            id="orgs-under-ministry-heading"
            className="text-base sm:text-lg font-bold tracking-tight"
          >
            {t.orgsUnderMinistryHeading}
          </h2>
        </div>
        <span className="text-[11px] font-medium text-blue-200">
          {language === 'en' ? '7 Functional Categories • 20 Entities' : '7 कार्यात्मक श्रेणियां • 20 निकाय'}
        </span>
      </div>

      <div className="p-4 sm:p-6 space-y-5">
        {/* Category Selection Tabs / Cards with Count Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
          {ORGANIZATION_CATEGORIES.map((cat: OrganizationCategory) => {
            const isSelected = cat.id === selectedCategoryId;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategoryId(cat.id)}
                className={`p-2.5 text-left border rounded-xs transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#003366] text-white border-[#003366] shadow-sm ring-1 ring-[#003366]'
                    : 'bg-[#f8fafc] text-slate-700 border-slate-300 hover:bg-slate-100 hover:border-slate-400'
                }`}
                aria-pressed={isSelected}
              >
                <div className="text-xs font-semibold leading-snug line-clamp-2">
                  {language === 'en' ? cat.name : cat.nameHi}
                </div>
                <div className="flex items-center justify-between mt-2 pt-1 border-t border-slate-200/50">
                  <span className="text-[10px] font-medium uppercase opacity-75">
                    {language === 'en' ? 'Total' : 'कुल'}
                  </span>
                  <span
                    className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                      isSelected
                        ? 'bg-[#FF9933] text-black font-extrabold'
                        : 'bg-slate-200 text-slate-800'
                    }`}
                  >
                    {cat.count}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Category Header Banner */}
        <div className="bg-[#f1f5f9] border-l-4 border-[#FF9933] p-3 text-xs flex flex-wrap items-center justify-between gap-2">
          <div>
            <span className="font-bold text-[#003366] uppercase tracking-wide">
              {language === 'en' ? activeCategory.name : activeCategory.nameHi}
            </span>
            <span className="text-slate-500 ml-2">
              ({currentOrganizations.length}{' '}
              {language === 'en' ? 'active organizations listed' : 'सक्रिय संगठन सूचीबद्ध'})
            </span>
          </div>
          <span className="text-[11px] text-slate-500 italic">
            {language === 'en'
              ? 'Click any organization link to visit official portal'
              : 'आधिकारिक पोर्टल पर जाने के लिए लिंक पर क्लिक करें'}
          </span>
        </div>

        {/* Organizations List Display */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentOrganizations.map((org: OrganizationItem) => (
            <div
              key={org.id}
              className="bg-white border border-slate-300 rounded-xs p-4 flex flex-col justify-between hover:border-[#003366] hover:shadow-xs transition-all space-y-3"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-sm font-bold text-[#003366] leading-tight">
                    {language === 'en' ? org.name : org.nameHi}
                  </h3>
                  {org.shortCode && (
                    <span className="shrink-0 text-[10px] font-mono font-bold bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded-xs border border-slate-200">
                      {org.shortCode}
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  {language === 'en' ? org.description : org.descriptionHi}
                </p>
              </div>

              {/* Metadata rows */}
              <div className="border-t border-slate-100 pt-2.5 space-y-1.5 text-xs text-slate-500">
                <div className="flex items-center space-x-1.5 text-[11px]">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 a11y-keep" />
                  <span className="font-medium text-slate-700 truncate">
                    {language === 'en' ? org.headquarters : org.headquartersHi}
                  </span>
                </div>
                <div className="flex items-center space-x-1.5 text-[11px]">
                  <Building className="w-3.5 h-3.5 text-slate-400 shrink-0 a11y-keep" />
                  <span className="text-slate-600">
                    <strong className="text-slate-700">
                      {language === 'en' ? 'Jurisdiction:' : 'अधिकार क्षेत्र:'}
                    </strong>{' '}
                    {org.jurisdiction}
                  </span>
                </div>
                {org.established && (
                  <div className="flex items-center space-x-1.5 text-[11px]">
                    <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0 a11y-keep" />
                    <span>
                      {language === 'en' ? 'Established:' : 'स्थापना:'} {org.established}
                    </span>
                  </div>
                )}
              </div>

              {/* Action Button */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <a
                  href={org.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-xs font-semibold text-[#003366] hover:underline"
                >
                  <span>{language === 'en' ? 'Visit Official Portal' : 'आधिकारिक पोर्टल पर जाएं'}</span>
                  <ExternalLink className="w-3 h-3 ml-1 text-slate-500 a11y-keep" />
                </a>
                <span className="text-[10px] text-slate-400">
                  {language === 'en' ? 'Government Agency' : 'सरकारी निकाय'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
