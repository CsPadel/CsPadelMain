import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import '../i18n/config';

export default function LanguageToggle() {
  const { i18n } = useTranslation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentLang = i18n.language || 'es';

  const toggleLang = () => {
    const nextLang = currentLang === 'es' ? 'en' : 'es';
    i18n.changeLanguage(nextLang);
  };

  if (!mounted) return null; // Avoid hydration mismatch visually if needed

  return (
    <div className="fixed top-8 right-8 z-50 flex items-center bg-brand-dark/50 backdrop-blur-md border border-white/10 rounded-full px-1 py-1">
      <button
        onClick={() => currentLang !== 'es' && toggleLang()}
        className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest transition-colors ${
          currentLang === 'es' 
            ? 'bg-brand-gold text-brand-dark' 
            : 'text-brand-light/60 hover:text-brand-light'
        }`}
      >
        ES
      </button>
      <button
        onClick={() => currentLang !== 'en' && toggleLang()}
        className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest transition-colors ${
          currentLang === 'en' 
            ? 'bg-brand-gold text-brand-dark' 
            : 'text-brand-light/60 hover:text-brand-light'
        }`}
      >
        EN
      </button>
    </div>
  );
}
