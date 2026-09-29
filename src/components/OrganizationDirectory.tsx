import React, { useState } from 'react';
import { Users, Phone, Mail, ChevronDown, ChevronUp, UserCheck, Shield } from 'lucide-react';
import { Language, OfficialProfile } from '../types';
import { OFFICIALS, UI_TRANSLATIONS } from '../data/portalData';

interface OrganizationDirectoryProps {
  language: Language;
}

export const OrganizationDirectory: React.FC<OrganizationDirectoryProps> = ({ language }) => {
  const [showAll, setShowAll] = useState(false);
  const t = UI_TRANSLATIONS[language];

  // Primary 3 apex leaders (as specified in the prompt)
  const leadershipOfficials = OFFICIALS.filter((off) => off.isLeadership);
  // Additional officials revealed upon "View More"
  const additionalOfficials = OFFICIALS.filter((off) => !off.isLeadership);

  const displayedOfficials = showAll
    ? [...leadershipOfficials, ...additionalOfficials]
    : leadershipOfficials;

  return (
    <section
      id="directory-section"
      className="bg-white border border-slate-300 rounded-xs shadow-2xs overflow-hidden"
      aria-labelledby="directory-heading"
    >
      {/* Section Header */}
      <div className="bg-[#003366] text-white px-4 sm:px-6 py-3 flex items-center justify-between border-b border-[#1b436e]">
        <div className="flex items-center space-x-2">
          <Users className="w-4 h-4 text-[#FF9933] a11y-keep" />
          <h2 id="directory-heading" className="text-base sm:text-lg font-bold tracking-tight">
            {t.orgDirectoryHeading}
          </h2>
        </div>
        <span className="text-[11px] font-medium text-blue-200">
          {language === 'en' ? 'Apex Leadership & Key Officials' : 'शीर्ष नेतृत्व एवं प्रमुख अधिकारी'}
        </span>
      </div>

      <div className="p-4 sm:p-6 space-y-4">
        {/* Profile Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayedOfficials.map((officer: OfficialProfile) => (
            <div
              key={officer.id}
              className="bg-[#f8fafc] border border-slate-300 rounded-xs p-4 flex flex-col justify-between hover:border-[#003366] transition-colors relative"
            >
              {/* Header Badge */}
              <div className="flex items-start justify-between gap-2 mb-2">
                <span
                  className={`inline-block text-[11px] font-bold px-2 py-0.5 rounded-xs uppercase tracking-wider ${
                    officer.isLeadership
                      ? 'bg-[#003366] text-white'
                      : 'bg-slate-200 text-slate-800'
                  }`}
                >
                  {language === 'en' ? officer.designation : officer.designationHi}
                </span>
                {officer.isLeadership && (
                  <span title="Union Executive" className="text-amber-500">
                    <Shield className="w-4 h-4 fill-amber-500/20 a11y-keep" />
                  </span>
                )}
              </div>

              {/* Name & Ministry */}
              <div className="space-y-1 mb-3">
                <h3 className="text-sm sm:text-base font-bold text-[#003366] leading-tight">
                  {language === 'en' ? officer.name : officer.nameHi}
                </h3>
                <div className="text-xs text-slate-600 font-medium">
                  {language === 'en' ? officer.ministry : officer.ministryHi}
                </div>
                {officer.room && (
                  <div className="text-[11px] text-slate-500 font-mono">
                    {officer.room}
                  </div>
                )}
              </div>

              {/* Contact rows */}
              <div className="border-t border-slate-200 pt-2.5 space-y-1.5 text-xs text-slate-700">
                <div className="flex items-center space-x-2">
                  <Phone className="w-3.5 h-3.5 text-slate-500 a11y-keep shrink-0" />
                  <span className="font-semibold text-slate-500 text-[11px]">
                    {language === 'en' ? 'Phone:' : 'दूरभाष:'}
                  </span>
                  <a
                    href={`tel:${officer.phone.split(',')[0].trim()}`}
                    className="font-bold text-[#003366] hover:underline"
                  >
                    {officer.phone}
                  </a>
                </div>

                <div className="flex items-center space-x-2">
                  <Mail className="w-3.5 h-3.5 text-slate-500 a11y-keep shrink-0" />
                  <span className="font-semibold text-slate-500 text-[11px]">
                    {language === 'en' ? 'Email:' : 'ईमेल:'}
                  </span>
                  <a
                    href={`mailto:${officer.email}`}
                    className="font-medium text-[#003366] hover:underline truncate"
                  >
                    {officer.email}
                  </a>
                </div>
              </div>

              {/* Bio summary note if available */}
              {officer.bio && (
                <div className="mt-2.5 pt-2 border-t border-dashed border-slate-200 text-[11px] text-slate-500 leading-snug">
                  {officer.bio}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* View More / View Less Toggle Button */}
        <div className="pt-2 text-center">
          <button
            type="button"
            onClick={() => setShowAll(!showAll)}
            className="inline-flex items-center space-x-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-[#003366] text-xs font-semibold rounded-xs border border-slate-300 transition-colors cursor-pointer"
            aria-expanded={showAll}
          >
            <span>{showAll ? t.viewLess : t.viewMore}</span>
            {showAll ? (
              <ChevronUp className="w-4 h-4 a11y-keep" />
            ) : (
              <ChevronDown className="w-4 h-4 a11y-keep" />
            )}
          </button>
          {!showAll && (
            <p className="text-[11px] text-slate-500 mt-1">
              {language === 'en'
                ? 'Includes Additional Secretary, Joint Secretaries, DGCoA, and Senior Economic Adviser'
                : 'अपर सचिव, संयुक्त सचिव, महानिदेशक एवं वरिष्ठ आर्थिक सलाहकार शामिल हैं'}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};
