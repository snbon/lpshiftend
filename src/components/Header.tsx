import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { LangSwitcher } from './LangSwitcher';
import { Link } from '../lib/router';

const APP_URL = (import.meta.env.VITE_APP_URL as string) ?? 'https://app.dagontvangst.be';

export function Header({ solid = false }: { solid?: boolean }) {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const showBg = solid || scrolled || open;
  const close = () => setOpen(false);

  return (
    <>
      <header className={`fixed top-0 inset-x-0 z-50 transition-all ${showBg ? 'bg-paper/90 backdrop-blur-md border-b border-hair' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-10 h-16 flex items-center gap-3 sm:gap-6">
          <Link to="/" onClick={close} className="flex items-center gap-2 shrink-0">
            <div className="w-7 h-7 rounded-sm bg-ink text-paper flex items-center justify-center font-serif italic font-semibold">D</div>
            <span className="font-serif text-[17px] font-semibold tracking-tight">Dagontvangst</span>
          </Link>
          <div className="flex-1" />

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            <LangSwitcher />
            <a href={APP_URL} className="text-sm text-ink-2/80 hover:text-ink transition">{t('landing.header.sign_in')}</a>
            <a href={`${APP_URL}/register`}
              className="group flex items-center gap-1.5 bg-ink text-paper text-sm font-medium px-4 py-2 rounded-full hover:bg-ink-2 transition whitespace-nowrap">
              {t('landing.header.try_free')}
              <ArrowUpRight size={14} className="group-hover:rotate-45 transition duration-300" />
            </a>
          </div>

          {/* Mobile burger */}
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className="md:hidden w-10 h-10 -mr-2 flex items-center justify-center rounded-full text-ink hover:bg-ink/5 transition"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={`md:hidden fixed inset-0 z-40 bg-paper transition-opacity duration-300 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        aria-hidden={!open}
      >
        <div className="absolute inset-0 bg-paper-dots mask-radial opacity-60 pointer-events-none" />
        <div className="relative h-full pt-24 pb-10 px-6 flex flex-col">
          <nav className="flex-1 flex flex-col gap-1">
            <MobileLink href={APP_URL} onClick={close}>
              {t('landing.header.sign_in')}
            </MobileLink>
            <MobileLink to="/contact" onClick={close}>
              {t('landing.footer.contact')}
            </MobileLink>
          </nav>

          <div className="mt-8 space-y-6">
            <a
              href={`${APP_URL}/register`}
              onClick={close}
              className="group flex items-center justify-center gap-2 bg-ink text-paper font-medium px-6 py-4 rounded-full hover:bg-ink-2 transition text-[15px] w-full"
            >
              {t('landing.header.try_free')}
              <ArrowUpRight size={16} className="group-hover:rotate-45 transition duration-300" />
            </a>
            <div className="flex items-center justify-between border-t border-hair pt-6">
              <span className="font-mono text-[10px] uppercase tracking-widest text-ink-2/50">
                {t('landing.footer.made_in')}
              </span>
              <LangSwitcher />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function MobileLink({
  to, href, onClick, children,
}: {
  to?: string; href?: string; onClick: () => void; children: React.ReactNode;
}) {
  const cls = "group flex items-center justify-between py-4 border-b border-hair font-serif text-2xl text-ink hover:text-ink-2 transition";
  const inner = (
    <>
      <span>{children}</span>
      <ArrowUpRight size={20} className="text-ink-2/40 group-hover:text-ink group-hover:rotate-45 transition duration-300" />
    </>
  );
  if (to) return <Link to={to} onClick={onClick} className={cls}>{inner}</Link>;
  return <a href={href} onClick={onClick} className={cls}>{inner}</a>;
}
