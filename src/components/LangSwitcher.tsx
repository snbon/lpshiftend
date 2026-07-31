import { useState } from 'react';
import i18n from '../i18n';

export function LangSwitcher({ dark = false }: { dark?: boolean }) {
  const [lang, setLang] = useState(i18n.language.slice(0, 2) as 'nl' | 'fr' | 'en');
  function pick(l: 'nl' | 'fr' | 'en') { setLang(l); i18n.changeLanguage(l); }
  const langs: ('nl' | 'fr' | 'en')[] = ['nl', 'fr', 'en'];
  return (
    <div className={`flex items-center gap-0.5 font-mono text-[11px] ${dark ? 'text-white/60' : 'text-ink-2'}`}>
      {langs.map((l, i) => (
        <span key={l} className="flex items-center">
          <button
            onClick={() => pick(l)}
            className={`px-1.5 py-0.5 uppercase tracking-wider transition ${
              lang === l
                ? dark ? 'text-white font-semibold' : 'text-ink font-semibold'
                : 'hover:opacity-100 opacity-60'
            }`}
          >
            {l}
          </button>
          {i < langs.length - 1 && <span className="opacity-30">/</span>}
        </span>
      ))}
    </div>
  );
}
