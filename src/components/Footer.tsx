import { useTranslation } from 'react-i18next';
import { Link } from '../lib/router';

export function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="bg-paper py-12 px-6 sm:px-10 border-t border-hair">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-sm bg-ink text-paper flex items-center justify-center font-serif italic font-semibold text-xs">D</div>
          <span className="font-serif text-sm font-semibold">Dagontvangst</span>
          <span className="font-mono text-[10px] text-ink-2/40 uppercase tracking-widest ml-2 hidden sm:inline">{t('landing.footer.made_in')}</span>
        </Link>
        <div className="flex items-center gap-6 text-xs text-ink-2/60">
          <Link to="/privacy" className="hover:text-ink transition">{t('landing.footer.privacy')}</Link>
          <Link to="/voorwaarden" className="hover:text-ink transition">{t('landing.footer.terms')}</Link>
          <Link to="/contact" className="hover:text-ink transition">{t('landing.footer.contact')}</Link>
        </div>
      </div>
    </footer>
  );
}
