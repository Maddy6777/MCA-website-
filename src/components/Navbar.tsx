import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Home } from 'lucide-react';
import { Language } from '../types';

interface NavItem {
  id: string;
  labelEn: string;
  labelHi: string;
  href?: string;
  actionId?: string;
  children?: {
    id: string;
    labelEn: string;
    labelHi: string;
    descriptionEn?: string;
    href?: string;
    actionId?: string;
  }[];
}

interface NavbarProps {
  language: Language;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
  onNavigateSection: (sectionId: string) => void;
  onOpenDocumentModal: (title: string, summary: string) => void;
}

const NAV_ITEMS: NavItem[] = [
  {
    id: 'home',
    labelEn: 'Home',
    labelHi: 'मुखपृष्ठ',
    actionId: 'hero-section',
  },
  {
    id: 'about',
    labelEn: 'About Ministry',
    labelHi: 'मंत्रालय के बारे में',
    children: [
      {
        id: 'about-overview',
        labelEn: 'Overview & Mandate',
        labelHi: 'अवलोकन एवं अधिदेश',
        descriptionEn: 'Administration of Companies Act, 2013 & LLP Act, 2008',
        actionId: 'about-section',
      },
      {
        id: 'about-vision',
        labelEn: 'Vision & Mission',
        labelHi: 'दृष्टि एवं ध्येय',
        descriptionEn: 'Facilitating corporate growth with regulatory integrity',
        actionId: 'about-section',
      },
      {
        id: 'about-organogram',
        labelEn: 'Administrative Hierarchy',
        labelHi: 'प्रशासनिक पदानुक्रम',
        descriptionEn: 'Apex structure from Ministers to field formations',
        actionId: 'directory-section',
      },
      {
        id: 'about-charter',
        labelEn: "Citizens' Charter",
        labelHi: 'नागरिक अधिकार पत्र',
        descriptionEn: 'Time-bound service delivery commitments',
        actionId: 'contact-section',
      },
    ],
  },
  {
    id: 'organization',
    labelEn: 'Organization',
    labelHi: 'संगठन',
    children: [
      {
        id: 'org-directory',
        labelEn: 'Organization Directory',
        labelHi: 'संगठन निर्देशिका',
        descriptionEn: 'Ministers, Secretary, and Senior Officers contact info',
        actionId: 'directory-section',
      },
      {
        id: 'org-attached',
        labelEn: 'Attached & Subordinate Offices',
        labelHi: 'संलग्न एवं अधीनस्थ कार्यालय',
        descriptionEn: 'SFIO, ROCs, Regional Directors, Official Liquidators',
        actionId: 'orgs-under-ministry-section',
      },
      {
        id: 'org-statutory',
        labelEn: 'Statutory & Autonomous Bodies',
        labelHi: 'सांविधिक एवं स्वायत्त निकाय',
        descriptionEn: 'IBBI, NFRA, IEPFA, ICAI, ICSI, IICA',
        actionId: 'orgs-under-ministry-section',
      },
      {
        id: 'org-tribunals',
        labelEn: 'Tribunals & Commissions',
        labelHi: 'अधिकरण एवं आयोग',
        descriptionEn: 'NCLT, NCLAT, and Competition Commission of India (CCI)',
        actionId: 'orgs-under-ministry-section',
      },
    ],
  },
  {
    id: 'services',
    labelEn: 'Services',
    labelHi: 'सेवाएं',
    children: [
      {
        id: 'srv-master',
        labelEn: 'Company / LLP Master Data',
        labelHi: 'कंपनी / एलएलपी मास्टर डेटा',
        descriptionEn: 'Search public corporate records & charges',
        actionId: 'quick-company-search',
      },
      {
        id: 'srv-incorporation',
        labelEn: 'SPICe+ Incorporation',
        labelHi: 'स्पाइस+ कंपनी निगमन',
        descriptionEn: 'Unified 10-in-1 company registration workflow',
        actionId: 'info-section-schemes',
      },
      {
        id: 'srv-efiling',
        labelEn: 'MCA21 e-Filing (V3)',
        labelHi: 'एमसीए21 ई-फाइलिंग (वी3)',
        descriptionEn: 'Web-based statutory e-form submission portal',
        actionId: 'quicklinks-section',
      },
      {
        id: 'srv-pmis',
        labelEn: 'PM Internship Portal',
        labelHi: 'पीएम इंटर्नशिप पोर्टल',
        descriptionEn: 'Opportunities across Top 500 Companies',
        actionId: 'orgs-under-ministry-section',
      },
    ],
  },
  {
    id: 'acts-rules',
    labelEn: 'Acts & Rules',
    labelHi: 'अधिनियम एवं नियम',
    children: [
      {
        id: 'act-companies',
        labelEn: 'Companies Act, 2013',
        labelHi: 'कंपनी अधिनियम, 2013',
        descriptionEn: 'Principal corporate legislation in India',
        actionId: 'info-section-acts',
      },
      {
        id: 'act-llp',
        labelEn: 'LLP Act, 2008',
        labelHi: 'एलएलपी अधिनियम, 2008',
        descriptionEn: 'Limited Liability Partnership statutes & rules',
        actionId: 'info-section-acts',
      },
      {
        id: 'act-ibc',
        labelEn: 'Insolvency & Bankruptcy Code, 2016',
        labelHi: 'दिवाला और शोधन अक्षमता संहिता, 2016',
        descriptionEn: 'Corporate insolvency and restructuring law',
        actionId: 'info-section-acts',
      },
      {
        id: 'act-rules',
        labelEn: 'Subordinate Legislation & Rules',
        labelHi: 'अधीनस्थ विधान एवं नियम',
        descriptionEn: 'Companies Rules 2014 and procedural orders',
        actionId: 'info-section-acts',
      },
    ],
  },
  {
    id: 'notifications',
    labelEn: 'Notifications',
    labelHi: 'अधिसूचनाएं',
    children: [
      {
        id: 'notif-latest',
        labelEn: 'Latest Notifications',
        labelHi: 'नवीनतम अधिसूचनाएं',
        descriptionEn: 'Gazette notifications and statutory orders',
        actionId: 'info-section-notifications',
      },
      {
        id: 'notif-circulars',
        labelEn: 'General Circulars',
        labelHi: 'सामान्य परिपत्र',
        descriptionEn: 'Procedural clarifications and policy relaxation',
        actionId: 'info-section-circulars',
      },
      {
        id: 'notif-press',
        labelEn: 'Press Releases',
        labelHi: 'प्रेस विज्ञप्ति',
        descriptionEn: 'Official government announcements via PIB',
        actionId: 'info-section-press',
      },
    ],
  },
  {
    id: 'reports',
    labelEn: 'Reports',
    labelHi: 'रिपोर्ट',
    children: [
      {
        id: 'rep-annual',
        labelEn: 'Annual Reports',
        labelHi: 'वार्षिक रिपोर्ट',
        descriptionEn: 'Official ministry progress and audited statistics',
        actionId: 'info-section-reports',
      },
      {
        id: 'rep-bulletin',
        labelEn: 'Monthly Corporate Sector Bulletin',
        labelHi: 'मासिक कॉरपोरेट क्षेत्र बुलेटिन',
        descriptionEn: 'Granular macro statistics on incorporation trends',
        actionId: 'info-section-reports',
      },
    ],
  },
  {
    id: 'contact',
    labelEn: 'Contact Us',
    labelHi: 'संपर्क करें',
    actionId: 'contact-section',
  },
];

export const Navbar: React.FC<NavbarProps> = ({
  language,
  isMobileOpen,
  onCloseMobile,
  onNavigateSection,
}) => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<Record<string, boolean>>({});
  const navRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const handleItemClick = (item: NavItem) => {
    if (!item.children && item.actionId) {
      onNavigateSection(item.actionId);
      setActiveDropdown(null);
      onCloseMobile();
    }
  };

  const handleSubItemClick = (actionId?: string) => {
    if (actionId) {
      onNavigateSection(actionId);
    }
    setActiveDropdown(null);
    onCloseMobile();
  };

  const toggleMobileSubmenu = (itemId: string) => {
    setMobileExpanded((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  return (
    <nav
      ref={navRef}
      className="bg-[#003366] text-white sticky top-0 z-40 shadow-md border-b-2 border-[#FF9933]"
      aria-label="Main Navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center justify-between text-xs lg:text-[13px] font-medium tracking-wide">
          <div className="flex items-center flex-wrap">
            {NAV_ITEMS.map((item) => {
              const hasDropdown = Boolean(item.children && item.children.length > 0);
              const isOpen = activeDropdown === item.id;

              return (
                <div key={item.id} className="relative group">
                  <button
                    type="button"
                    onClick={() => {
                      if (hasDropdown) {
                        setActiveDropdown(isOpen ? null : item.id);
                      } else {
                        handleItemClick(item);
                      }
                    }}
                    onMouseEnter={() => {
                      if (hasDropdown) setActiveDropdown(item.id);
                    }}
                    className={`flex items-center space-x-1 py-3 px-3 lg:px-3.5 border-r border-[#1a4a7d] hover:bg-[#002244] hover:text-[#FF9933] cursor-pointer transition-colors ${
                      isOpen ? 'bg-[#002244] text-[#FF9933]' : 'text-slate-100'
                    }`}
                    aria-expanded={isOpen}
                    aria-haspopup={hasDropdown}
                  >
                    {item.id === 'home' && <Home className="w-3.5 h-3.5 mr-1 a11y-keep" />}
                    <span>{language === 'en' ? item.labelEn : item.labelHi}</span>
                    {hasDropdown && (
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 a11y-keep ${
                          isOpen ? 'rotate-180 text-[#FF9933]' : 'text-slate-300'
                        }`}
                      />
                    )}
                  </button>

                  {/* Dropdown Menu */}
                  {hasDropdown && isOpen && (
                    <div
                      onMouseLeave={() => setActiveDropdown(null)}
                      className="absolute left-0 top-full w-72 bg-white text-slate-800 shadow-xl border-t-2 border-[#FF9933] border-x border-b border-slate-300 py-1.5 z-50 animate-fadeIn"
                      role="menu"
                    >
                      {item.children?.map((sub) => (
                        <button
                          key={sub.id}
                          type="button"
                          onClick={() => handleSubItemClick(sub.actionId)}
                          className="w-full text-left px-4 py-2.5 hover:bg-slate-100 hover:text-[#003366] transition-colors border-b border-slate-100 last:border-b-0 cursor-pointer"
                          role="menuitem"
                        >
                          <div className="font-semibold text-xs text-[#003366]">
                            {language === 'en' ? sub.labelEn : sub.labelHi}
                          </div>
                          {sub.descriptionEn && (
                            <div className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                              {sub.descriptionEn}
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Direct Emergency/Helpdesk Badge */}
          <div className="hidden lg:flex items-center pl-3 text-xs text-amber-200 font-medium">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 mr-2 animate-pulse"></span>
            <span>MCA21 V3 Online</span>
          </div>
        </div>

        {/* Mobile Accordion Menu */}
        {isMobileOpen && (
          <div className="md:hidden py-2 divide-y divide-[#1a4a7d] text-sm">
            {NAV_ITEMS.map((item) => {
              const hasDropdown = Boolean(item.children && item.children.length > 0);
              const isExpanded = mobileExpanded[item.id];

              return (
                <div key={item.id} className="py-1">
                  {hasDropdown ? (
                    <div>
                      <button
                        type="button"
                        onClick={() => toggleMobileSubmenu(item.id)}
                        className="w-full flex items-center justify-between py-2 px-3 text-left font-medium text-slate-100 hover:text-[#FF9933] hover:bg-[#002244] rounded-xs cursor-pointer"
                        aria-expanded={isExpanded}
                      >
                        <span>{language === 'en' ? item.labelEn : item.labelHi}</span>
                        <ChevronDown
                          className={`w-4 h-4 transition-transform ${
                            isExpanded ? 'rotate-180 text-[#FF9933]' : 'text-slate-400'
                          }`}
                        />
                      </button>
                      {isExpanded && (
                        <div className="pl-4 pr-2 py-1 space-y-1 bg-[#002850] rounded-xs mt-1">
                          {item.children?.map((sub) => (
                            <button
                              key={sub.id}
                              type="button"
                              onClick={() => handleSubItemClick(sub.actionId)}
                              className="w-full text-left py-1.5 px-3 text-xs text-slate-200 hover:text-white hover:bg-[#003870] rounded-xs cursor-pointer"
                            >
                              <div className="font-semibold">
                                {language === 'en' ? sub.labelEn : sub.labelHi}
                              </div>
                              {sub.descriptionEn && (
                                <div className="text-[10px] text-slate-400 mt-0.5">
                                  {sub.descriptionEn}
                                </div>
                              )}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleItemClick(item)}
                      className="w-full text-left py-2 px-3 font-medium text-slate-100 hover:text-[#FF9933] hover:bg-[#002244] rounded-xs cursor-pointer"
                    >
                      {language === 'en' ? item.labelEn : item.labelHi}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </nav>
  );
};
