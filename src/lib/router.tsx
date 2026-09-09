import { useState, useEffect } from 'react';

export const LANGS = ['nl', 'fr', 'en'] as const;
export type Lang = typeof LANGS[number];
export const DEFAULT_LANG: Lang = 'nl';

function isLang(x: string | undefined): x is Lang {
  return !!x && (LANGS as readonly string[]).includes(x);
}

function isExternal(to: string) {
  return /^(https?:|mailto:|tel:|#)/.test(to);
}

/** Split "/nl/privacy" → { lang: 'nl', sub: '/privacy' } */
export function parsePath(pathname: string): { lang: Lang; sub: string } {
  const parts = pathname.split('/').filter(Boolean);
  if (isLang(parts[0])) {
    const rest = parts.slice(1).join('/');
    return { lang: parts[0], sub: rest ? '/' + rest : '/' };
  }
  return { lang: DEFAULT_LANG, sub: pathname === '' ? '/' : pathname || '/' };
}

/** Prefix a language into a local path. Passes through external + already-prefixed. */
export function withLang(to: string, lang: Lang) {
  if (isExternal(to)) return to;
  const parts = to.split('/').filter(Boolean);
  if (isLang(parts[0])) return to;
  if (to === '/' || to === '') return `/${lang}/`;
  const normalised = to.startsWith('/') ? to : '/' + to;
  return `/${lang}${normalised}`;
}

export function useRoute() {
  const [path, setPath] = useState(() => window.location.pathname);
  useEffect(() => {
    const fn = () => setPath(window.location.pathname);
    window.addEventListener('popstate', fn);
    return () => window.removeEventListener('popstate', fn);
  }, []);
  return { path, ...parsePath(path) };
}

export function navigate(to: string, replace = false) {
  if (to === window.location.pathname) return;
  window.history[replace ? 'replaceState' : 'pushState']({}, '', to);
  window.dispatchEvent(new PopStateEvent('popstate'));
  if (!replace) window.scrollTo({ top: 0 });
}

export function Link({
  to,
  className,
  children,
  onClick,
}: {
  to: string;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  const { lang } = useRoute();
  const href = withLang(to, lang);
  return (
    <a
      href={href}
      className={className}
      onClick={(e) => {
        if (isExternal(to)) return;
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return;
        e.preventDefault();
        onClick?.();
        navigate(href);
      }}
    >
      {children}
    </a>
  );
}
