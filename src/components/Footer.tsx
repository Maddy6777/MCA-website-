import React from 'react';
import { ExternalLink, ShieldCheck, Heart } from 'lucide-react';
import { Emblem } from './Emblem';
import { Language } from '../types';
import { UI_TRANSLATIONS } from '../data/portalData';

interface FooterProps {
  language: Language;
  onNavigateSection: (sectionId: string) => void;
  onOpenAccessibility: () => void;
  onOpenCompanySearch: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  language,
  onNavigateSection,
  onOpenAccessibility,
  onOpenCompanySearch,
}) => {
  const t = UI_TRANSLATIONS[language];

  return (
    <footer className="bg-[#071d33] text-slate-300 text-xs border-t-2 border-[#FF9933] mt-12" aria-label="Portal Footer">
      {/* Tricolour Accent Line */}
      <div className="tiranga-stripe w-full" aria-hidden="true" />

      {/* Main Footer Links Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand & Mandate Column */}
          <div className="md:col-span-2 space-y-3 pr-4">
            <div className="flex items-center space-x-3">
              <div className="bg-white/10 p-1.5 rounded-xs border border-white/20">
                <Emblem size={42} className="text-white" />
              </div>
              <div>
                <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">
                  {t.govOfIndia}
                </div>
                <div className="text-base font-bold text-white leading-tight">
                  {t.ministryName}
                </div>
              </div>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed">
              {t.footerAboutDesc}
            </p>

            <div className="pt-2 text-[11px] text-slate-400 space-y-1">
              <p>
                <strong>{language === 'en' ? 'Central Secretariat:' : 'केंद्रीय सचिवालय:'}</strong> 3rd Floor, Kartavya Bhawan-1, New Delhi – 110001
              </p>
              <p>
                <strong>{language === 'en' ? 'Helpline:' : 'हेल्पलाइन:'}</strong> 0120-4832500 | <strong>{language === 'en' ? 'Email:' : 'ईमेल:'}</strong> crc.escalation@mca.gov.in
              </p>
            </div>
          </div>

          {/* Column 1: About */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider border-b border-slate-700 pb-1.5">
              {language === 'en' ? 'About Ministry' : 'मंत्रालय के बारे में'}
            </h3>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateSection('hero-section')}
                  className="hover:text-white hover:underline cursor-pointer"
                >
                  {language === 'en' ? 'Overview & Mandate' : 'अवलोकन एवं अधिदेश'}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateSection('directory-section')}
                  className="hover:text-white hover:underline cursor-pointer"
                >
                  {language === 'en' ? 'Organization Directory' : 'संगठन निर्देशिका'}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateSection('orgs-under-ministry-section')}
                  className="hover:text-white hover:underline cursor-pointer"
                >
                  {language === 'en' ? 'Organizations Under MCA' : 'एमसीए के अधीन संगठन'}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateSection('contact-section')}
                  className="hover:text-white hover:underline cursor-pointer"
                >
                  {language === 'en' ? 'Contact Details' : 'संपर्क विवरण'}
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Resources & Services */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider border-b border-slate-700 pb-1.5">
              {language === 'en' ? 'Resources & Laws' : 'संसाधन एवं कानून'}
            </h3>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateSection('info-section-acts')}
                  className="hover:text-white hover:underline cursor-pointer"
                >
                  {language === 'en' ? 'Acts & Rules' : 'अधिनियम एवं नियम'}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateSection('info-section-reports')}
                  className="hover:text-white hover:underline cursor-pointer"
                >
                  {language === 'en' ? 'Annual Reports & Bulletins' : 'वार्षिक रिपोर्ट एवं बुलेटिन'}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateSection('info-section-notifications')}
                  className="hover:text-white hover:underline cursor-pointer"
                >
                  {language === 'en' ? 'Gazette Notifications' : 'राजपत्र अधिसूचनाएं'}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateSection('info-section-circulars')}
                  className="hover:text-white hover:underline cursor-pointer"
                >
                  {language === 'en' ? 'General Circulars' : 'सामान्य परिपत्र'}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenCompanySearch}
                  className="hover:text-white hover:underline text-[#FF9933] cursor-pointer font-medium"
                >
                  {language === 'en' ? 'Company Master Data Lookup' : 'कंपनी मास्टर डेटा खोज'}
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Important External Links & Policies */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider border-b border-slate-700 pb-1.5">
              {language === 'en' ? 'Important Portals' : 'महत्वपूर्ण पोर्टल'}
            </h3>
            <ul className="space-y-2 text-slate-400">
              <li>
                <a
                  href="https://mca.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white hover:underline inline-flex items-center space-x-1"
                >
                  <span>MCA Portal (mca.gov.in)</span>
                  <ExternalLink className="w-3 h-3 text-slate-500 a11y-keep" />
                </a>
              </li>
              <li>
                <a
                  href="https://india.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white hover:underline inline-flex items-center space-x-1"
                >
                  <span>National Portal of India</span>
                  <ExternalLink className="w-3 h-3 text-slate-500 a11y-keep" />
                </a>
              </li>
              <li>
                <a
                  href="https://digitalindia.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white hover:underline inline-flex items-center space-x-1"
                >
                  <span>Digital India</span>
                  <ExternalLink className="w-3 h-3 text-slate-500 a11y-keep" />
                </a>
              </li>
              <li>
                <a
                  href="https://nic.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white hover:underline inline-flex items-center space-x-1"
                >
                  <span>National Informatics Centre</span>
                  <ExternalLink className="w-3 h-3 text-slate-500 a11y-keep" />
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenAccessibility}
                  className="hover:text-white hover:underline cursor-pointer"
                >
                  {language === 'en' ? 'Accessibility Statement' : 'अभिगम्यता विवरण'}
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Policy Badges & Standards Strip */}
        <div className="mt-8 pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4 text-[11px] text-slate-400">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span className="hover:underline cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:underline cursor-pointer">Copyright Policy</span>
            <span>•</span>
            <span className="hover:underline cursor-pointer">Hyperlinking Policy</span>
            <span>•</span>
            <span className="hover:underline cursor-pointer">Terms & Conditions</span>
            <span>•</span>
            <span className="hover:underline cursor-pointer">Disclaimer</span>
          </div>

          <div className="flex items-center space-x-2 text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400 a11y-keep" />
            <span>GIGW 3.0 & WCAG 2.1 AA Compliant</span>
          </div>
        </div>

        {/* Bottom Legal & Last Updated Strip */}
        <div className="mt-6 pt-4 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <div>
            <p className="font-semibold text-slate-300">{t.copyrightNotice}</p>
            <p className="text-[10px] text-slate-500 mt-0.5">{t.webManager}</p>
          </div>

          <div className="text-right">
            <div className="inline-block px-2.5 py-1 bg-slate-800/80 rounded-xs border border-slate-700 text-slate-300 font-mono text-[11px]">
              {t.lastUpdated}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
