import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Globe,
  Clock,
  Train,
  CheckCircle2,
  Navigation,
  Copy,
} from 'lucide-react';
import { Language } from '../types';
import { UI_TRANSLATIONS } from '../data/portalData';

interface ContactCardProps {
  language: Language;
}

export const ContactCard: React.FC<ContactCardProps> = ({ language }) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const t = UI_TRANSLATIONS[language];

  const copyToClipboard = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <section
      id="contact-section"
      className="bg-white border border-slate-300 rounded-xs shadow-2xs overflow-hidden"
      aria-labelledby="contact-heading"
    >
      {/* Section Header */}
      <div className="bg-[#003366] text-white px-4 sm:px-6 py-3 flex items-center justify-between border-b border-[#1b436e]">
        <div className="flex items-center space-x-2">
          <MapPin className="w-4 h-4 text-[#FF9933] a11y-keep" />
          <h2 id="contact-heading" className="text-base sm:text-lg font-bold tracking-tight">
            {t.contactHeading}
          </h2>
        </div>
        <span className="text-[11px] font-medium text-blue-200">
          {language === 'en' ? 'Central Secretariat Complex' : 'केंद्रीय सचिवालय परिसर'}
        </span>
      </div>

      <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column: Official Contact Information */}
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-bold text-[#003366] uppercase tracking-wide">
              {t.contactAddressTitle}
            </h3>
            <div className="mt-1 text-xs sm:text-sm text-slate-700 space-y-0.5 font-medium">
              <p>{t.contactAddressStreet}</p>
              <p>{t.contactAddressCity}</p>
              <p className="text-slate-500 text-xs">
                {language === 'en' ? 'Central Vista, New Delhi' : 'सेंट्रल विस्टा, नई दिल्ली'}
              </p>
            </div>
          </div>

          <div className="border-t border-slate-200 pt-3 space-y-3">
            {/* Phone Item */}
            <div className="flex items-start justify-between group">
              <div className="flex items-start space-x-2.5">
                <div className="p-1.5 bg-blue-50 text-[#003366] rounded-xs border border-blue-200 mt-0.5">
                  <Phone className="w-3.5 h-3.5 a11y-keep" />
                </div>
                <div>
                  <div className="text-[11px] font-semibold text-slate-500">
                    {t.contactPhoneLabel}
                  </div>
                  <a
                    href="tel:0120-4832500"
                    className="text-xs sm:text-sm font-bold text-[#003366] hover:underline"
                    aria-label="Call 0120-4832500"
                  >
                    0120-4832500
                  </a>
                  <span className="block text-[10px] text-slate-500">
                    {language === 'en'
                      ? 'National Corporate Helpdesk (09:00 - 18:00)'
                      : 'राष्ट्रीय कॉरपोरेट हेल्पडेस्क (09:00 - 18:00)'}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => copyToClipboard('01204832500', 'phone')}
                className="text-slate-400 hover:text-[#003366] p-1 text-xs cursor-pointer"
                title="Copy phone number"
                aria-label="Copy phone number"
              >
                {copiedField === 'phone' ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 a11y-keep" />
                ) : (
                  <Copy className="w-3.5 h-3.5 a11y-keep" />
                )}
              </button>
            </div>

            {/* Email Item */}
            <div className="flex items-start justify-between group">
              <div className="flex items-start space-x-2.5">
                <div className="p-1.5 bg-blue-50 text-[#003366] rounded-xs border border-blue-200 mt-0.5">
                  <Mail className="w-3.5 h-3.5 a11y-keep" />
                </div>
                <div>
                  <div className="text-[11px] font-semibold text-slate-500">
                    {t.contactEmailLabel}
                  </div>
                  <a
                    href="mailto:crc.escalation@mca.gov.in"
                    className="text-xs sm:text-sm font-bold text-[#003366] hover:underline break-all"
                    aria-label="Send email to crc.escalation@mca.gov.in"
                  >
                    crc.escalation@mca.gov.in
                  </a>
                  <span className="block text-[10px] text-slate-500">
                    {language === 'en' ? 'Central Registration Centre Grievances' : 'केंद्रीय पंजीकरण केंद्र शिकायतें'}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => copyToClipboard('crc.escalation@mca.gov.in', 'email')}
                className="text-slate-400 hover:text-[#003366] p-1 text-xs cursor-pointer"
                title="Copy email address"
                aria-label="Copy email address"
              >
                {copiedField === 'email' ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 a11y-keep" />
                ) : (
                  <Copy className="w-3.5 h-3.5 a11y-keep" />
                )}
              </button>
            </div>

            {/* Website Item */}
            <div className="flex items-start justify-between group">
              <div className="flex items-start space-x-2.5">
                <div className="p-1.5 bg-blue-50 text-[#003366] rounded-xs border border-blue-200 mt-0.5">
                  <Globe className="w-3.5 h-3.5 a11y-keep" />
                </div>
                <div>
                  <div className="text-[11px] font-semibold text-slate-500">
                    {t.contactWebsiteLabel}
                  </div>
                  <a
                    href="https://www.mca.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs sm:text-sm font-bold text-[#003366] hover:underline"
                    aria-label="Open official MCA website"
                  >
                    www.mca.gov.in
                  </a>
                  <span className="block text-[10px] text-slate-500">
                    {language === 'en' ? 'Official Central Government Portal' : 'आधिकारिक केंद्र सरकार पोर्टल'}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => copyToClipboard('https://www.mca.gov.in', 'website')}
                className="text-slate-400 hover:text-[#003366] p-1 text-xs cursor-pointer"
                title="Copy website link"
                aria-label="Copy website link"
              >
                {copiedField === 'website' ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 a11y-keep" />
                ) : (
                  <Copy className="w-3.5 h-3.5 a11y-keep" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Location & Transit Map Card */}
        <div className="bg-[#f8fafc] border border-slate-300 rounded-xs p-3.5 sm:p-4 flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-[#003366] uppercase tracking-wider flex items-center">
                <Navigation className="w-3 h-3 mr-1.5 text-[#003366] a11y-keep" />
                {t.locationCardTitle}
              </h3>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded-xs">
                {language === 'en' ? 'Kartavya Path Zone' : 'कर्तव्य पथ क्षेत्र'}
              </span>
            </div>

            {/* Stylized Government Map Graphic */}
            <div className="relative mt-2.5 h-28 bg-[#e2e8f0] rounded-xs border border-slate-300 overflow-hidden flex items-center justify-center image-placeholder">
              <div
                className="absolute inset-0 opacity-40 bg-[radial-gradient(#003366_1px,transparent_1px)] [background-size:12px_12px]"
                aria-hidden="true"
              />
              <div className="absolute inset-x-0 h-4 bg-slate-300 top-12" />
              <div className="absolute inset-y-0 w-4 bg-slate-300 left-24" />

              {/* Pin marker */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="bg-[#003366] text-white p-1 rounded-full shadow-md border-2 border-white animate-bounce">
                  <MapPin className="w-4 h-4 text-[#FF9933] a11y-keep" />
                </div>
                <span className="text-[10px] font-bold text-[#003366] bg-white/95 px-2 py-0.5 rounded-xs shadow-2xs mt-1 border border-slate-200">
                  Kartavya Bhawan-1, New Delhi
                </span>
              </div>
            </div>
          </div>

          {/* Location Key Highlights */}
          <div className="space-y-1.5 text-xs text-slate-600 border-t border-slate-200 pt-2.5">
            <div className="flex items-center space-x-2 text-[11px]">
              <Clock className="w-3.5 h-3.5 text-slate-500 a11y-keep shrink-0" />
              <span>{t.locationOfficeHours}</span>
            </div>
            <div className="flex items-center space-x-2 text-[11px]">
              <Train className="w-3.5 h-3.5 text-slate-500 a11y-keep shrink-0" />
              <span>{t.locationMetro}</span>
            </div>
          </div>

          <a
            href="https://maps.google.com/?q=Kartavya+Bhawan+New+Delhi"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full text-center py-1.5 px-3 bg-white hover:bg-slate-100 text-[#003366] border border-slate-300 text-xs font-semibold rounded-xs transition-colors flex items-center justify-center space-x-1"
          >
            <span>{t.viewOnMap}</span>
            <Navigation className="w-3 h-3 a11y-keep" />
          </a>
        </div>
      </div>
    </section>
  );
};
