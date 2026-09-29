import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';
import { Language } from '../types';

interface BackToTopProps {
  language: Language;
}

export const BackToTop: React.FC<BackToTopProps> = ({ language }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-40 p-2.5 bg-[#003366] hover:bg-[#002244] text-white border-2 border-white shadow-lg rounded-xs cursor-pointer transition-all hover:-translate-y-0.5 focus:outline-hidden focus:ring-2 focus:ring-[#FF9933]"
      title={language === 'en' ? 'Back to top' : 'शीर्ष पर वापस जाएं'}
      aria-label={language === 'en' ? 'Scroll to top of page' : 'पृष्ठ के शीर्ष पर स्क्रॉल करें'}
    >
      <ChevronUp className="w-5 h-5 a11y-keep" />
    </button>
  );
};
