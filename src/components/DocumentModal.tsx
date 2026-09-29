import React from 'react';
import { X, FileText, Download, Printer, Calendar, Tag, ShieldCheck, Share2 } from 'lucide-react';
import { Language, InformationDocument } from '../types';

interface DocumentModalProps {
  document: InformationDocument | null;
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const DocumentModal: React.FC<DocumentModalProps> = ({
  document,
  isOpen,
  onClose,
  language,
}) => {
  if (!isOpen || !document) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const filename = `${document.refNumber || 'MCA-DOC'}.txt`;
    const content = `GOVERNMENT OF INDIA
MINISTRY OF CORPORATE AFFAIRS
${document.refNumber ? `Ref: ${document.refNumber}` : ''}
Date: ${document.date}

Title: ${document.title}

SUMMARY:
${document.summary}

DETAILS:
${document.details || 'Standard statutory publication under the Companies Act / LLP Act.'}

=======================================
Corporate Affairs Information Portal (Demo)
`;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = window.document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-2xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="document-modal-title"
    >
      <div className="bg-white rounded-xs shadow-2xl border border-slate-300 w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden animate-fadeIn">
        {/* Header */}
        <div className="bg-[#003366] text-white px-4 py-3 flex items-center justify-between border-b border-[#1b436e]">
          <div className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-[#FF9933] a11y-keep" />
            <h2 id="document-modal-title" className="text-sm sm:text-base font-bold">
              {language === 'en' ? 'Official Gazette / Document Viewer' : 'आधिकारिक राजपत्र / दस्तावेज दर्शक'}
            </h2>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="p-1 hover:bg-[#002244] rounded-xs text-slate-300 hover:text-white cursor-pointer"
            aria-label="Close document"
          >
            <X className="w-5 h-5 a11y-keep" />
          </button>
        </div>

        {/* Document Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4">
          {/* Official Letterhead Mockup */}
          <div className="text-center border-b border-slate-200 pb-3">
            <div className="text-xs uppercase font-bold text-slate-600 tracking-wider">
              {language === 'en' ? 'Government of India' : 'भारत सरकार'}
            </div>
            <div className="text-sm font-bold text-[#003366] uppercase">
              {language === 'en' ? 'Ministry of Corporate Affairs' : 'कॉरपोरेट कार्य मंत्रालय'}
            </div>
            <div className="text-[11px] text-slate-500">
              Kartavya Bhawan-1, New Delhi – 110001
            </div>
          </div>

          {/* Reference & Date Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs bg-slate-50 p-2.5 rounded-xs border border-slate-200">
            <div>
              <span className="font-semibold text-slate-500">
                {language === 'en' ? 'Reference Number:' : 'संदर्भ संख्या:'}
              </span>{' '}
              <span className="font-mono font-bold text-slate-800">
                {document.refNumber || 'MCA-NOTIF-GEN'}
              </span>
            </div>
            <div className="flex items-center space-x-1 text-slate-600">
              <Calendar className="w-3.5 h-3.5 a11y-keep" />
              <span>{document.date}</span>
            </div>
          </div>

          {/* Document Title */}
          <div>
            <div className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-xs bg-blue-100 text-[#003366] mb-1.5 uppercase">
              {document.category.replace('_', ' ')}
            </div>
            <h3 className="text-base sm:text-lg font-bold text-[#003366] leading-snug">
              {language === 'en' ? document.title : document.titleHi}
            </h3>
          </div>

          {/* Document Executive Summary */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wide">
              {language === 'en' ? 'Executive Summary / Clarification' : 'कार्यकारी सारांश / स्पष्टीकरण'}
            </h4>
            <div className="bg-[#f8fafc] border-l-4 border-[#003366] p-3 text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
              {language === 'en' ? document.summary : document.summaryHi}
            </div>
          </div>

          {/* Statutory Details */}
          {document.details && (
            <div className="space-y-1.5 text-xs text-slate-600 leading-relaxed border-t border-slate-200 pt-3">
              <h4 className="font-bold text-slate-700 uppercase tracking-wide text-[11px]">
                {language === 'en' ? 'Statutory Provision Extract' : 'वैधानिक प्रावधान उद्धरण'}
              </h4>
              <p className="font-serif bg-slate-50 p-3 rounded-xs border border-slate-200 text-slate-800">
                "{document.details}"
              </p>
            </div>
          )}

          {/* Verification Badge */}
          <div className="flex items-center space-x-2 text-[11px] text-emerald-800 bg-emerald-50 border border-emerald-200 p-2.5 rounded-xs">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 a11y-keep" />
            <span>
              {language === 'en'
                ? 'Certified official public publication issued under the seal of the Ministry of Corporate Affairs.'
                : 'कॉरपोरेट कार्य मंत्रालय की मुहर के तहत जारी प्रमाणित आधिकारिक सार्वजनिक प्रकाशन।'}
            </span>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="bg-slate-100 px-4 py-3 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <button
              onClick={handleDownload}
              type="button"
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-[#003366] hover:bg-[#002244] text-white text-xs font-semibold rounded-xs transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 a11y-keep" />
              <span>{language === 'en' ? 'Download Official Copy' : 'आधिकारिक प्रति डाउनलोड करें'}</span>
            </button>
            <button
              onClick={handlePrint}
              type="button"
              className="inline-flex items-center space-x-1 px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium border border-slate-300 rounded-xs transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 a11y-keep" />
              <span>{language === 'en' ? 'Print' : 'प्रिंट'}</span>
            </button>
          </div>

          <button
            onClick={onClose}
            type="button"
            className="px-3 py-1.5 bg-white border border-slate-300 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-xs cursor-pointer"
          >
            {language === 'en' ? 'Close' : 'बंद करें'}
          </button>
        </div>
      </div>
    </div>
  );
};
