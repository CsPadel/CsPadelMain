import React from 'react';
import { useTranslation } from 'react-i18next';
import '../i18n/config';

export default function FooterIsland() {
  const { t } = useTranslation();

  return (
    <footer className="py-14 bg-brand-dark border-t-2 border-brand-gold/60 text-center px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-4">
          <img src="/logogold.webp" alt="CourtSide Logo" className="h-6 object-contain" />
          <p className="text-brand-light/40 text-xs uppercase tracking-widest">{t('footer.rights')}</p>
        </div>
        <div className="flex gap-8 text-brand-light/40 text-xs uppercase tracking-widest">
          <a href="#" className="hover:text-brand-gold transition-colors">{t('footer.privacy')}</a>
          <a href="#" className="hover:text-brand-gold transition-colors">{t('footer.terms')}</a>
        </div>
      </div>
    </footer>
  );
}
