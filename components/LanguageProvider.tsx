'use client';

import { useEffect } from 'react';
import i18n from '@/lib/i18n';

interface LanguageProviderProps {
  children: React.ReactNode;
}

export default function LanguageProvider({ children }: LanguageProviderProps) {
  useEffect(() => {
    // Set document language and direction based on current i18n language
    const currentLang = i18n.language;
    const isRTL = currentLang === 'ar';
    
    // Update document attributes
    document.documentElement.lang = currentLang;
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    
    // Add RTL-specific classes and font classes
    if (isRTL) {
      document.documentElement.classList.add('rtl', 'font-arabic');
    } else {
      document.documentElement.classList.remove('rtl', 'font-arabic');
    }

    // Listen for language changes
    const handleLanguageChange = () => {
      const newLang = i18n.language;
      const newIsRTL = newLang === 'ar';
      
      document.documentElement.lang = newLang;
      document.documentElement.dir = newIsRTL ? 'rtl' : 'ltr';
      
      if (newIsRTL) {
        document.documentElement.classList.add('rtl', 'font-arabic');
      } else {
        document.documentElement.classList.remove('rtl', 'font-arabic');
      }
    };

    i18n.on('languageChanged', handleLanguageChange);

    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, []);

  return <>{children}</>;
}
