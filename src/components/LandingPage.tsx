import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ShieldCheck, Link2, WifiOff, Building2, Download, MessageCircle, Check } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';

const ICON = {
  shield: ShieldCheck,
  link: Link2,
  'wifi-off': WifiOff,
  building: Building2,
  download: Download,
  message: MessageCircle,
} as const;

const APP_URL = 'https://app.dagontvangst.be';

export default function LandingPage() {
  const { t } = useTranslation();

  const problems  = t('problem.points',    { returnObjects: true }) as string[];
  const steps     = t('how.steps',         { returnObjects: true }) as { t: string; d: string }[];
  const features  = t('features.items',    { returnObjects: true }) as { icon: keyof typeof ICON; t: string; d: string }[];
  const checks    = t('compliance.checks', { returnObjects: true }) as string[];
  const includes  = t('pricing.includes',  { returnObjects: true }) as string[];
  const faqItems  = t('faq.items',         { returnObjects: true }) as { q: string; a: string }[];
  const badges    = t('hero.badges',       { returnObjects: true }) as string[];

  return (
    <>
      <header className="header">
        <div className="container header__inner">
          <div className="brand"><span className="brand__mark">■</span> {t('brand')}</div>
          <div className="header__right">
            <LanguageSwitcher />
            <a className="btn btn--ghost" href={APP_URL}>{t('hero.secondary')}</a>
            <a className="btn btn--primary" href={`${APP_URL}/register`}>{t('hero.cta')}</a>
          </div>
        </div>
      </header>

      <section className="hero">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="badges">
              {badges.map((b) => <span key={b} className="badge">{b}</span>)}
            </div>
            <h1 className="hero__title">{t('hero.title')}</h1>
            <p className="hero__subtitle">{t('hero.subtitle')}</p>
            <div className="hero__actions">
              <a className="btn btn--primary btn--lg" href={`${APP_URL}/register`}>{t('hero.cta')}</a>
              <a className="btn btn--ghost btn--lg" href={APP_URL}>{t('hero.secondary')}</a>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section section--dark">
        <div className="container">
          <h2 className="section__title">{t('problem.title')}</h2>
          <div className="grid grid-2">
            {problems.map((p) => <div key={p} className="card card--dark">{p}</div>)}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section__title">{t('how.title')}</h2>
          <div className="grid grid-3">
            {steps.map((s) => (
              <div key={s.t} className="card">
                <h3 className="card__title">{s.t}</h3>
                <p>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--muted">
        <div className="container">
          <h2 className="section__title">{t('features.title')}</h2>
          <div className="grid grid-3">
            {features.map((f) => {
              const Icon = ICON[f.icon] ?? ShieldCheck;
              return (
                <div key={f.t} className="card">
                  <Icon className="card__icon" size={28} />
                  <h3 className="card__title">{f.t}</h3>
                  <p>{f.d}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container container--narrow">
          <h2 className="section__title">{t('compliance.title')}</h2>
          <p className="section__intro">{t('compliance.intro')}</p>
          <ul className="checklist">
            {checks.map((c) => <li key={c}><Check size={18} /> {c}</li>)}
          </ul>
          <p className="note">{t('compliance.note')}</p>
        </div>
      </section>

      <section className="section section--muted">
        <div className="container container--narrow">
          <h2 className="section__title">{t('pricing.title')}</h2>
          <p className="section__intro">{t('pricing.subtitle')}</p>
          <div className="pricing-card">
            <ul className="checklist checklist--inline">
              {includes.map((i) => <li key={i}><Check size={16} /> {i}</li>)}
            </ul>
            <a className="btn btn--primary btn--lg" href={`${APP_URL}/register`}>{t('pricing.cta')}</a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container container--narrow">
          <h2 className="section__title">{t('faq.title')}</h2>
          <div className="faq">
            {faqItems.map((it) => (
              <details key={it.q} className="faq__item">
                <summary>{it.q}</summary>
                <p>{it.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--cta">
        <div className="container container--narrow text-center">
          <h2 className="section__title">{t('cta.title')}</h2>
          <p className="section__intro">{t('cta.subtitle')}</p>
          <a className="btn btn--primary btn--lg" href={`${APP_URL}/register`}>{t('cta.button')}</a>
        </div>
      </section>

      <footer className="footer">
        <div className="container footer__inner">
          <div className="brand">{t('brand')}</div>
          <div className="footer__links">
            <a href="/contact">{t('footer.contact')}</a>
            <a href="/privacy">{t('footer.privacy')}</a>
            <a href="/terms">{t('footer.terms')}</a>
          </div>
          <div className="footer__meta">{t('footer.madeIn')}</div>
        </div>
      </footer>
    </>
  );
}
