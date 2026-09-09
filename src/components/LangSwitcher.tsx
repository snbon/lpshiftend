import i18n from '../i18n';
import { LANGS, Lang, useRoute, navigate } from '../lib/router';

export function LangSwitcher({ dark = false }: { dark?: boolean }) {
  const { lang, sub } = useRoute();

  function pick(l: Lang) {
    if (l === lang) return;
    i18n.changeLanguage(l);
    navigate(`/${l}${sub === '/' ? '/' : sub}`, true);
  }

  return (
    <div className={`flex items-center gap-0.5 font-mono text-[11px] ${dark ? 'text-white/60' : 'text-ink-2'}`}>
      {LANGS.map((l, i) => (
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
          {i < LANGS.length - 1 && <span className="opacity-30">/</span>}
        </span>
      ))}
    </div>
  );
}
