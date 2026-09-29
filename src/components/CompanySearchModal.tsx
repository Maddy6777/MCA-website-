import React, { useState } from 'react';
import { X, Search, Building2, CheckCircle2, AlertCircle, FileText } from 'lucide-react';
import { Language, CompanyMasterRecord } from '../types';
import { DEMO_COMPANIES } from '../data/portalData';

interface CompanySearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const CompanySearchModal: React.FC<CompanySearchModalProps> = ({
  isOpen,
  onClose,
  language,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCompany, setSelectedCompany] = useState<CompanyMasterRecord | null>(
    DEMO_COMPANIES[0]
  );

  if (!isOpen) return null;

  const filteredCompanies = DEMO_COMPANIES.filter(
    (c) =>
      c.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.cin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.roc.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-2xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="company-search-title"
    >
      <div className="bg-white rounded-xs shadow-2xl border border-slate-300 w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden animate-fadeIn">
        {/* Modal Header */}
        <div className="bg-[#003366] text-white px-4 py-3 flex items-center justify-between border-b border-[#1b436e]">
          <div className="flex items-center space-x-2">
            <Building2 className="w-5 h-5 text-[#FF9933] a11y-keep" />
            <div>
              <h2 id="company-search-title" className="text-sm sm:text-base font-bold">
                {language === 'en'
                  ? 'Company / LLP Master Data Search (MCA21 V3)'
                  : 'कंपनी / एलएलपी मास्टर डेटा खोज (एमसीए21 वी3)'}
              </h2>
              <p className="text-[11px] text-blue-200">
                {language === 'en'
                  ? 'Official Registry Public Inspection Service'
                  : 'आधिकारिक रजिस्ट्री सार्वजनिक निरीक्षण सेवा'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="p-1 hover:bg-[#002244] rounded-xs text-slate-300 hover:text-white cursor-pointer"
            aria-label="Close Company Search"
          >
            <X className="w-5 h-5 a11y-keep" />
          </button>
        </div>

        {/* Search Bar & Quick Samples */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400 a11y-keep" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={
                language === 'en'
                  ? 'Search by Company Name or Corporate Identity Number (CIN)...'
                  : 'कंपनी के नाम या कॉर्पोरेट पहचान संख्या (CIN) से खोजें...'
              }
              className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-white border border-slate-300 rounded-xs focus:ring-2 focus:ring-[#003366] outline-hidden font-medium"
              autoFocus
            />
          </div>

          <div className="flex items-center flex-wrap gap-1.5 text-xs text-slate-600">
            <span className="font-semibold text-[11px] text-slate-500">
              {language === 'en' ? 'Quick Sample Records:' : 'त्वरित नमूना रिकॉर्ड:'}
            </span>
            {DEMO_COMPANIES.map((c) => (
              <button
                key={c.cin}
                type="button"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCompany(c);
                }}
                className={`px-2 py-0.5 rounded-xs text-[11px] transition-colors cursor-pointer ${
                  selectedCompany?.cin === c.cin
                    ? 'bg-[#003366] text-white font-bold'
                    : 'bg-white border border-slate-300 hover:bg-slate-200'
                }`}
              >
                {c.companyName.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Content: Left List, Right Detailed Profile */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-200">
          {/* List of matches */}
          <div className="p-3 overflow-y-auto max-h-72 md:max-h-full space-y-2 bg-slate-50/50">
            <div className="text-[11px] font-bold text-slate-500 uppercase px-1">
              {language === 'en' ? 'Registry Matches' : 'रजिस्ट्री परिणाम'} ({filteredCompanies.length})
            </div>
            {filteredCompanies.map((c) => {
              const isSelected = selectedCompany?.cin === c.cin;
              return (
                <button
                  key={c.cin}
                  type="button"
                  onClick={() => setSelectedCompany(c)}
                  className={`w-full text-left p-2.5 rounded-xs border transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-blue-50 border-[#003366] ring-1 ring-[#003366]'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="text-xs font-bold text-[#003366] leading-tight">
                    {c.companyName}
                  </div>
                  <div className="text-[10px] font-mono text-slate-500 mt-1 truncate">
                    {c.cin}
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-500 mt-1.5 pt-1 border-t border-slate-100">
                    <span>{c.roc}</span>
                    <span className="font-semibold text-emerald-700 bg-emerald-50 px-1 rounded-xs">
                      {c.status}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Master Record Details Sheet */}
          <div className="md:col-span-2 p-4 sm:p-6 overflow-y-auto space-y-4 bg-white">
            {selectedCompany ? (
              <div className="space-y-4">
                {/* Header banner */}
                <div className="border-b border-slate-200 pb-3 flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-xs bg-[#003366] text-white">
                      {selectedCompany.classOfCompany} Company
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-[#003366] mt-1.5 leading-snug">
                      {selectedCompany.companyName}
                    </h3>
                    <p className="text-xs font-mono text-slate-600 mt-0.5">
                      CIN: <strong>{selectedCompany.cin}</strong>
                    </p>
                  </div>
                  <div className="flex items-center space-x-1 px-2.5 py-1 bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-bold rounded-xs">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 a11y-keep" />
                    <span>{selectedCompany.status}</span>
                  </div>
                </div>

                {/* Granular Master Data Table */}
                <div className="border border-slate-200 rounded-xs overflow-hidden text-xs">
                  <table className="w-full border-collapse">
                    <tbody className="divide-y divide-slate-200">
                      <tr className="bg-slate-50">
                        <td className="py-2 px-3 font-semibold text-slate-600 w-1/3">
                          {language === 'en' ? 'ROC Jurisdiction' : 'आरओसी क्षेत्राधिकार'}
                        </td>
                        <td className="py-2 px-3 font-medium text-slate-900">
                          {selectedCompany.roc}
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-semibold text-slate-600">
                          {language === 'en' ? 'Registration Number' : 'पंजीकरण संख्या'}
                        </td>
                        <td className="py-2 px-3 font-mono text-slate-900">
                          {selectedCompany.registrationNumber}
                        </td>
                      </tr>
                      <tr className="bg-slate-50">
                        <td className="py-2 px-3 font-semibold text-slate-600">
                          {language === 'en' ? 'Company Category' : 'कंपनी श्रेणी'}
                        </td>
                        <td className="py-2 px-3 text-slate-900">
                          {selectedCompany.companyCategory}
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-semibold text-slate-600">
                          {language === 'en' ? 'Date of Incorporation' : 'निगमन की तिथि'}
                        </td>
                        <td className="py-2 px-3 font-medium text-slate-900">
                          {selectedCompany.dateOfIncorporation}
                        </td>
                      </tr>
                      <tr className="bg-slate-50">
                        <td className="py-2 px-3 font-semibold text-slate-600">
                          {language === 'en' ? 'Authorized Capital' : 'अधिकृत पूंजी'}
                        </td>
                        <td className="py-2 px-3 font-bold text-[#003366]">
                          {selectedCompany.authorizedCapital}
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-semibold text-slate-600">
                          {language === 'en' ? 'Paid Up Capital' : 'चुकता पूंजी'}
                        </td>
                        <td className="py-2 px-3 font-bold text-slate-800">
                          {selectedCompany.paidUpCapital}
                        </td>
                      </tr>
                      <tr className="bg-slate-50">
                        <td className="py-2 px-3 font-semibold text-slate-600">
                          {language === 'en' ? 'Registered Address' : 'पंजीकृत पता'}
                        </td>
                        <td className="py-2 px-3 text-slate-800 leading-relaxed">
                          {selectedCompany.registeredAddress}
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-semibold text-slate-600">
                          {language === 'en' ? 'Official Email' : 'आधिकारिक ईमेल'}
                        </td>
                        <td className="py-2 px-3 font-mono text-[#003366]">
                          {selectedCompany.email}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="bg-amber-50 border border-amber-200 p-2.5 rounded-xs text-[11px] text-amber-900 flex items-start space-x-2">
                  <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5 a11y-keep" />
                  <span>
                    {language === 'en'
                      ? 'Note: This public inspection view is extracted from the Central Registry Master Database. For certified copies, visit the MCA21 V3 Portal.'
                      : 'नोट: यह सार्वजनिक निरीक्षण दृश्य केंद्रीय रजिस्ट्री मास्टर डेटाबेस से लिया गया है। प्रमाणित प्रतियों के लिए एमसीए21 वी3 पोर्टल पर जाएं।'}
                  </span>
                </div>
              </div>
            ) : (
              <div className="py-12 text-center text-slate-500 text-sm">
                <p>{language === 'en' ? 'Select a company from the list to view full master data.' : 'पूर्ण मास्टर डेटा देखने के लिए सूची से कंपनी चुनें।'}</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-100 px-4 py-2.5 border-t border-slate-200 text-xs text-slate-600 flex justify-between items-center">
          <span className="text-[11px]">
            {language === 'en'
              ? 'MCA21 Database Synchronization Active'
              : 'एमसीए21 डेटाबेस सिंक्रोनाइज़ेशन सक्रिय'}
          </span>
          <button
            onClick={onClose}
            type="button"
            className="px-4 py-1.5 bg-[#003366] text-white hover:bg-[#002244] rounded-xs font-semibold cursor-pointer text-xs"
          >
            {language === 'en' ? 'Close' : 'बंद करें'}
          </button>
        </div>
      </div>
    </div>
  );
};
