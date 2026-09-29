/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  Language,
  AccessibilitySettings,
  InformationDocument,
  InfoCategory,
} from './types';
import { TopUtilityBar } from './components/TopUtilityBar';
import { Header } from './components/Header';
import { Navbar } from './components/Navbar';
import { Breadcrumb } from './components/Breadcrumb';
import { HeroTitle } from './components/HeroTitle';
import { SearchSection } from './components/SearchSection';
import { ContactCard } from './components/ContactCard';
import { OrganizationDirectory } from './components/OrganizationDirectory';
import { OrganizationsUnderMinistry } from './components/OrganizationsUnderMinistry';
import { InformationSection } from './components/InformationSection';
import { SidebarQuickLinks } from './components/SidebarQuickLinks';
import { AccessibilityPanel } from './components/AccessibilityPanel';
import { SearchModal } from './components/SearchModal';
import { CompanySearchModal } from './components/CompanySearchModal';
import { DocumentModal } from './components/DocumentModal';
import { Footer } from './components/Footer';
import { BackToTop } from './components/BackToTop';
import { UI_TRANSLATIONS } from './data/portalData';
import {
  CalendarDays,
  FileCheck,
  AlertTriangle,
  Headphones,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';

export default function App() {
  const [language, setLanguage] = useState<Language>('en');
  const [accessibility, setAccessibility] = useState<AccessibilitySettings>({
    textSize: 'normal',
    highContrast: false,
    increasedSpacing: false,
    increasedLineHeight: false,
    hideImages: false,
    bigCursor: false,
  });

  // Modals & Panels state
  const [isAccessibilityOpen, setIsAccessibilityOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [searchInitialQuery, setSearchInitialQuery] = useState('');
  const [searchInitialCategory, setSearchInitialCategory] = useState('all');
  const [isCompanySearchOpen, setIsCompanySearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Document viewer modal
  const [selectedDocument, setSelectedDocument] = useState<InformationDocument | null>(null);
  const [isDocModalOpen, setIsDocModalOpen] = useState(false);

  // Navigation tab override for info section
  const [activeInfoTab, setActiveInfoTab] = useState<InfoCategory>('notifications');

  // Audio Screen Reader feedback status banner
  const [audioAnnounceMessage, setAudioAnnounceMessage] = useState<string | null>(null);

  // Synchronize accessibility classes on body tag
  useEffect(() => {
    const body = document.body;

    if (accessibility.highContrast) {
      body.classList.add('high-contrast');
    } else {
      body.classList.remove('high-contrast');
    }

    if (accessibility.increasedSpacing) {
      body.classList.add('increased-spacing');
    } else {
      body.classList.remove('increased-spacing');
    }

    if (accessibility.increasedLineHeight) {
      body.classList.add('increased-line-height');
    } else {
      body.classList.remove('increased-line-height');
    }

    if (accessibility.hideImages) {
      body.classList.add('hide-images');
    } else {
      body.classList.remove('hide-images');
    }

    if (accessibility.bigCursor) {
      body.classList.add('big-cursor');
    } else {
      body.classList.remove('big-cursor');
    }

    return () => {
      body.classList.remove(
        'high-contrast',
        'increased-spacing',
        'increased-line-height',
        'hide-images',
        'big-cursor'
      );
    };
  }, [accessibility]);

  // Global keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // '/' opens search when not in input
      if (
        e.key === '/' &&
        !['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement).tagName)
      ) {
        e.preventDefault();
        setSearchInitialQuery('');
        setSearchInitialCategory('all');
        setIsSearchModalOpen(true);
      }

      // Escape closes modals
      if (e.key === 'Escape') {
        setIsAccessibilityOpen(false);
        setIsSearchModalOpen(false);
        setIsCompanySearchOpen(false);
        setIsDocModalOpen(false);
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Text scaling class based on accessibility.textSize
  const getTextSizeClass = () => {
    switch (accessibility.textSize) {
      case 'sm':
        return 'text-[13px]';
      case 'lg':
        return 'text-[16px]';
      case 'xl':
        return 'text-[18px]';
      case 'normal':
      default:
        return 'text-[14px]';
    }
  };

  const handleUpdateAccessibility = (newSettings: Partial<AccessibilitySettings>) => {
    setAccessibility((prev) => ({ ...prev, ...newSettings }));
  };

  const handleResetAccessibility = () => {
    setAccessibility({
      textSize: 'normal',
      highContrast: false,
      increasedSpacing: false,
      increasedLineHeight: false,
      hideImages: false,
      bigCursor: false,
    });
  };

  // Screen Reader speech synthesis
  const handleScreenReaderAnnounce = () => {
    const textToSpeak =
      language === 'en'
        ? 'Welcome to the Corporate Affairs Portal, Government of India. You are viewing the official information portal for the Ministry of Corporate Affairs, located at 3rd Floor, Kartavya Bhawan-1, New Delhi. Phone: 0120-4832500. Email: crc.escalation@mca.gov.in. Navigation contains Home, About Ministry, Organization Directory, Services, Acts and Rules, Notifications, and Reports.'
        : 'भारत सरकार के कॉरपोरेट कार्य पोर्टल में आपका स्वागत है। आप कॉरपोरेट कार्य मंत्रालय का आधिकारिक सूचना पोर्टल देख रहे हैं, जिसका पता तीसरी मंजिल, कर्तव्य भवन-1, नई दिल्ली है। दूरभाष: 0120-4832500।';

    setAudioAnnounceMessage(textToSpeak);

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = language === 'hi' ? 'hi-IN' : 'en-IN';
      utterance.rate = 0.95;
      window.speechSynthesis.speak(utterance);
    }

    setTimeout(() => {
      setAudioAnnounceMessage(null);
    }, 8000);
  };

  const handleSearchSubmit = (query: string, category: string) => {
    setSearchInitialQuery(query);
    setSearchInitialCategory(category);
    setIsSearchModalOpen(true);
  };

  const handleSelectDocument = (doc: InformationDocument) => {
    setSelectedDocument(doc);
    setIsDocModalOpen(true);
  };

  const handleNavigateSection = (sectionId: string) => {
    if (sectionId.startsWith('info-section-')) {
      const tabKey = sectionId.replace('info-section-', '') as InfoCategory;
      setActiveInfoTab(tabKey);
      const el = document.getElementById('info-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (sectionId === 'quick-company-search') {
      setIsCompanySearchOpen(true);
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col font-sans transition-all duration-150 ${getTextSizeClass()}`}
    >
      {/* Accessible Skip Link */}
      <a href="#main-content" className="skip-link">
        {language === 'en' ? 'Skip to Main Content' : 'मुख्य सामग्री पर जाएं'}
      </a>

      {/* Screen Reader Audio Announce Live Region */}
      <div aria-live="polite" className="sr-only">
        {audioAnnounceMessage}
      </div>

      {audioAnnounceMessage && (
        <div className="bg-[#003366] text-white px-4 py-2 text-xs flex items-center justify-between border-b border-[#FF9933] shadow-md z-50">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping"></span>
            <span>
              <strong>Screen Reader Audio:</strong> {audioAnnounceMessage}
            </span>
          </div>
          <button
            onClick={() => {
              if ('speechSynthesis' in window) window.speechSynthesis.cancel();
              setAudioAnnounceMessage(null);
            }}
            className="text-amber-300 font-bold underline text-xs cursor-pointer ml-4"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* 1. Top Utility Bar */}
      <TopUtilityBar
        language={language}
        onLanguageChange={setLanguage}
        accessibility={accessibility}
        onUpdateAccessibility={handleUpdateAccessibility}
        onOpenAccessibilityPanel={() => setIsAccessibilityOpen(true)}
        onScreenReaderAnnounce={handleScreenReaderAnnounce}
      />

      {/* 2. Main Header */}
      <Header
        language={language}
        onOpenSearch={() => {
          setSearchInitialQuery('');
          setSearchInitialCategory('all');
          setIsSearchModalOpen(true);
        }}
        onOpenAccessibility={() => setIsAccessibilityOpen(true)}
        isMobileMenuOpen={isMobileMenuOpen}
        onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      />

      {/* 3. Primary Navigation Bar */}
      <Navbar
        language={language}
        isMobileOpen={isMobileMenuOpen}
        onCloseMobile={() => setIsMobileMenuOpen(false)}
        onNavigateSection={handleNavigateSection}
        onOpenDocumentModal={(title, summary) => {
          setSelectedDocument({
            id: 'temp-doc',
            category: 'notifications',
            title,
            titleHi: title,
            date: 'September 2026',
            fileType: 'PDF',
            summary,
            summaryHi: summary,
          });
          setIsDocModalOpen(true);
        }}
      />

      {/* 4. Breadcrumb Navigation */}
      <Breadcrumb
        language={language}
        onNavigateHome={() => handleNavigateSection('hero-section')}
      />

      {/* 5. Page Hero / Title */}
      <HeroTitle
        language={language}
        onOpenCompanySearch={() => setIsCompanySearchOpen(true)}
        onNavigateSection={handleNavigateSection}
      />

      {/* 6. Prominent Search Section */}
      <SearchSection
        language={language}
        onSearchSubmit={handleSearchSubmit}
        onOpenCompanySearch={() => setIsCompanySearchOpen(true)}
      />

      {/* 7. Main Content Area */}
      <main id="main-content" className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main 8-column Information Column */}
          <div className="lg:col-span-8 space-y-8">
            {/* Section 1: Contact Details Card (Two Column) */}
            <ContactCard language={language} />

            {/* Section 2: Organization Directory */}
            <OrganizationDirectory language={language} />

            {/* Section 3: Organizations Under This Ministry (Categories with Badges) */}
            <OrganizationsUnderMinistry language={language} />

            {/* Section 4: Information Sections (Notifications, Updates, Circulars, PR, Reports, Acts, Schemes) */}
            <InformationSection
              language={language}
              onSelectDocument={handleSelectDocument}
              activeCategoryOverride={activeInfoTab}
            />
          </div>

          {/* Right 4-column Sidebar / Quick Links & Key Advisories */}
          <aside className="lg:col-span-4 space-y-6">
            {/* Quick Links Block */}
            <SidebarQuickLinks
              language={language}
              onOpenCompanySearch={() => setIsCompanySearchOpen(true)}
              onNavigateSection={handleNavigateSection}
            />

            {/* Statutory Compliance Calendar Card */}
            <div className="bg-white border border-slate-300 rounded-xs shadow-2xs overflow-hidden">
              <div className="bg-[#003366] text-white px-4 py-2.5 flex items-center justify-between border-b border-[#1b436e]">
                <div className="flex items-center space-x-2">
                  <CalendarDays className="w-4 h-4 text-[#FF9933] a11y-keep" />
                  <h3 className="text-xs sm:text-sm font-bold tracking-tight">
                    {language === 'en' ? 'Statutory Compliance Calendar' : 'वैधानिक अनुपालन कैलेंडर'}
                  </h3>
                </div>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded-xs font-bold">
                  2026-27
                </span>
              </div>
              <div className="p-3.5 divide-y divide-slate-100 text-xs">
                <div className="pb-2.5 space-y-1">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-bold text-[#003366]">Form AOC-4 (Financial Statements)</span>
                    <span className="text-red-700 font-bold font-mono">30 Oct 2026</span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Filing within 30 days of Annual General Meeting (AGM) for FY 2025-26.
                  </p>
                </div>
                <div className="py-2.5 space-y-1">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-bold text-[#003366]">Form MGT-7 (Annual Return)</span>
                    <span className="text-amber-700 font-bold font-mono">29 Nov 2026</span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Submission within 60 days of AGM with audited shareholder list.
                  </p>
                </div>
                <div className="pt-2.5 space-y-1">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-bold text-[#003366]">Form CSR-2 (CSR Report)</span>
                    <span className="text-blue-700 font-bold font-mono">30 Nov 2026</span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Extended due date without additional fees for qualifying companies.
                  </p>
                </div>
              </div>
            </div>

            {/* National Corporate Grievance & Helpdesk Card */}
            <div className="bg-[#f8fafc] border border-slate-300 rounded-xs p-4 space-y-3">
              <div className="flex items-center space-x-2">
                <Headphones className="w-4 h-4 text-[#003366] a11y-keep" />
                <h3 className="text-xs sm:text-sm font-bold text-[#003366]">
                  {language === 'en' ? 'Grievance & Support Desk' : 'शिकायत एवं सहायता केंद्र'}
                </h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {language === 'en'
                  ? 'For MCA21 system support, e-filing queries, or digital payment reconciliation, contact the national escalation desk.'
                  : 'एमसीए21 प्रणाली सहायता या ई-फाइलिंग प्रश्नों के लिए राष्ट्रीय डेस्क से संपर्क करें।'}
              </p>
              <div className="bg-white p-2.5 rounded-xs border border-slate-200 text-xs space-y-1">
                <div className="font-semibold text-slate-700">
                  {language === 'en' ? 'CPGRAMS Portal Integration:' : 'सीपीजीआरएएमएस पोर्टल:'}
                </div>
                <div className="text-[11px] text-slate-500">
                  Centralized Public Grievance Redress and Monitoring System (GoI)
                </div>
                <a
                  href="https://pgportal.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-[#003366] font-bold hover:underline text-xs pt-1"
                >
                  <span>pgportal.gov.in</span>
                  <ExternalLink className="w-3 h-3 ml-1 text-slate-400 a11y-keep" />
                </a>
              </div>
            </div>

            {/* Regulatory Assurance Note */}
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xs text-[11px] text-emerald-900 flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5 a11y-keep" />
              <div>
                <strong className="block font-semibold">
                  {language === 'en' ? 'Official Public Notice' : 'आधिकारिक लोक सूचना'}
                </strong>
                <span>
                  {language === 'en'
                    ? 'All official gazette notifications published on this portal are digitally verified under the Information Technology Act, 2000.'
                    : 'इस पोर्टल पर प्रकाशित सभी राजपत्र अधिसूचनाएं आईटी अधिनियम, 2000 के तहत प्रमाणित हैं।'}
                </span>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* 8. Detailed Government Footer */}
      <Footer
        language={language}
        onNavigateSection={handleNavigateSection}
        onOpenAccessibility={() => setIsAccessibilityOpen(true)}
        onOpenCompanySearch={() => setIsCompanySearchOpen(true)}
      />

      {/* 9. Floating Accessible Back to Top */}
      <BackToTop language={language} />

      {/* 10. Interactive Accessibility Settings Panel */}
      <AccessibilityPanel
        isOpen={isAccessibilityOpen}
        onClose={() => setIsAccessibilityOpen(false)}
        settings={accessibility}
        onUpdateSettings={handleUpdateAccessibility}
        onResetSettings={handleResetAccessibility}
        onScreenReaderAnnounce={handleScreenReaderAnnounce}
        language={language}
      />

      {/* 11. Prominent Search Results Modal */}
      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        language={language}
        initialQuery={searchInitialQuery}
        initialCategory={searchInitialCategory}
        onSelectDocument={handleSelectDocument}
      />

      {/* 12. Interactive Company Master Data Tool Modal */}
      <CompanySearchModal
        isOpen={isCompanySearchOpen}
        onClose={() => setIsCompanySearchOpen(false)}
        language={language}
      />

      {/* 13. Official Document / Gazette Viewer Modal */}
      <DocumentModal
        document={selectedDocument}
        isOpen={isDocModalOpen}
        onClose={() => setIsDocModalOpen(false)}
        language={language}
      />
    </div>
  );
}
