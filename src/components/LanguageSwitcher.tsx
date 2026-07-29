import { useTranslation } from 'react-i18next';

const LANGS: { code: 'nl' | 'fr' | 'en'; label: string }[] = [
  { code: 'nl', label: 'NL' },
  { code: 'fr', label: 'FR' },
  { code: 'en', label: 'EN' },
];

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const current = i18n.resolvedLanguage ?? 'nl';

  return (
    <div className="lang">
      {LANGS.map((l) => (
        <button
          key={l.code}
          type="button"
          className={`lang__btn ${current.startsWith(l.code) ? 'is-active' : ''}`}
          onClick={() => i18n.changeLanguage(l.code)}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}
