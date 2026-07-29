import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ShieldCheck, Link2, WifiOff, Building2, Download, MessageCircle, Check, ArrowRight, Star } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';
import HashChainVisual from './HashChainVisual';

const ICON = {
  shield: ShieldCheck,
  link: Link2,
  'wifi-off': WifiOff,
  building: Building2,
  download: Download,
  message: MessageCircle,
} as const;

const APP_URL = 'https://app.dagontvangst.be';

// Reveal helper — one place to tune the "fade + rise" pattern used across
// every section. Keeps section markup light while the motion feel stays
// consistent.
const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
};

export default function LandingPage() {
  const { t } = useTranslation();

  const problems     = t('problem.points',       { returnObjects: true }) as string[];
  const steps        = t('how.steps',            { returnObjects: true }) as { t: string; d: string }[];
  const features     = t('features.items',       { returnObjects: true }) as { icon: keyof typeof ICON; t: string; d: string }[];
  const checks       = t('compliance.checks',    { returnObjects: true }) as string[];
  const includes     = t('pricing.includes',     { returnObjects: true }) as string[];
  const faqItems     = t('faq.items',            { returnObjects: true }) as { q: string; a: string }[];
  const badges       = t('hero.badges',          { returnObjects: true }) as string[];
  const testimonials = t('testimonials.items',   { returnObjects: true }) as { name: string; role: string; quote: string }[];

  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  return (
    <>
      <header className={`header ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="container header__inner">
          <a href="/" className="brand">
            <span className="brand__mark" aria-hidden>▍</span>
            <span>{t('brand')}</span>
          </a>
          <div className="header__right">
            <LanguageSwitcher />
            <a className="btn btn--ghost btn--sm" href={APP_URL}>{t('hero.secondary')}</a>
            <a className="btn btn--primary btn--sm" href={`${APP_URL}/register`}>
              {t('hero.cta')} <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </header>

      {/* Hero — split column with hash-chain visual on the right */}
      <section className="hero">
        <div className="hero__aurora" aria-hidden />
        <div className="container hero__grid">
          <motion.div
            className="hero__copy"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
          >
            <div className="badges">
              {badges.map((b) => <span key={b} className="badge">{b}</span>)}
            </div>
            <h1 className="hero__title">{t('hero.title')}</h1>
            <p className="hero__subtitle">{t('hero.subtitle')}</p>
            <div className="hero__actions">
              <a className="btn btn--primary btn--lg" href={`${APP_URL}/register`}>
                {t('hero.cta')} <ArrowRight size={18} />
              </a>
              <a className="btn btn--ghost btn--lg" href={APP_URL}>{t('hero.secondary')}</a>
            </div>
            <div className="hero__proof">
              <div className="hero__proof-stars"><Star size={14} fill="currentColor"/><Star size={14} fill="currentColor"/><Star size={14} fill="currentColor"/><Star size={14} fill="currentColor"/><Star size={14} fill="currentColor"/></div>
              <span>Ontworpen met Belgische horeca-uitbaters — 14 dagen gratis, geen kaart nodig.</span>
            </div>
          </motion.div>
          <motion.div
            className="hero__visual"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <HashChainVisual />
          </motion.div>
        </div>
      </section>

      {/* Problem — dark break for rhythm */}
      <section className="section section--dark">
        <div className="container">
          <motion.h2 {...reveal} className="section__title">{t('problem.title')}</motion.h2>
          <div className="grid grid-2">
            {problems.map((p, i) => (
              <motion.div key={p} {...reveal} transition={{ ...reveal.transition, delay: 0.08 * i }} className="card card--dark">
                <span className="card--dark__marker">✕</span>
                {p}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works — numbered path */}
      <section className="section">
        <div className="container">
          <motion.h2 {...reveal} className="section__title">{t('how.title')}</motion.h2>
          <div className="steps">
            {steps.map((s, i) => (
              <motion.div key={s.t} {...reveal} transition={{ ...reveal.transition, delay: 0.1 * i }} className="step">
                <div className="step__num">{i + 1}</div>
                <h3 className="step__title">{s.t.replace(/^\d+\.\s*/, '')}</h3>
                <p className="step__desc">{s.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section section--muted">
        <div className="container">
          <motion.h2 {...reveal} className="section__title">{t('features.title')}</motion.h2>
          <div className="grid grid-3">
            {features.map((f, i) => {
              const Icon = ICON[f.icon] ?? ShieldCheck;
              return (
                <motion.div
                  key={f.t}
                  {...reveal}
                  transition={{ ...reveal.transition, delay: 0.06 * i }}
                  whileHover={{ y: -4 }}
                  className="feature-card"
                >
                  <div className="feature-card__icon"><Icon size={22} /></div>
                  <h3 className="feature-card__title">{f.t}</h3>
                  <p className="feature-card__desc">{f.d}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section">
        <div className="container">
          <motion.h2 {...reveal} className="section__title text-center">{t('testimonials.title')}</motion.h2>
          <div className="grid grid-3 mt-8">
            {testimonials.map((tm, i) => (
              <motion.blockquote
                key={tm.name}
                {...reveal}
                transition={{ ...reveal.transition, delay: 0.08 * i }}
                className="testimonial"
              >
                <div className="testimonial__stars">
                  {Array.from({ length: 5 }).map((_, k) => (
                    <Star key={k} size={14} fill="currentColor" />
                  ))}
                </div>
                <p className="testimonial__quote">"{tm.quote}"</p>
                <footer className="testimonial__author">
                  <div className="testimonial__avatar">{tm.name.charAt(0)}</div>
                  <div>
                    <div className="testimonial__name">{tm.name}</div>
                    <div className="testimonial__role">{tm.role}</div>
                  </div>
                </footer>
              </motion.blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance */}
      <section className="section section--muted">
        <div className="container container--narrow">
          <motion.h2 {...reveal} className="section__title">{t('compliance.title')}</motion.h2>
          <motion.p {...reveal} className="section__intro">{t('compliance.intro')}</motion.p>
          <motion.ul {...reveal} className="checklist">
            {checks.map((c) => (
              <li key={c}><Check size={18} strokeWidth={3} /> {c}</li>
            ))}
          </motion.ul>
          <motion.p {...reveal} className="note">{t('compliance.note')}</motion.p>
        </div>
      </section>

      {/* Pricing — the visual anchor of the site */}
      <section className="section">
        <div className="container container--narrow">
          <motion.h2 {...reveal} className="section__title text-center">{t('pricing.title')}</motion.h2>
          <motion.p {...reveal} className="section__intro text-center">{t('pricing.subtitle')}</motion.p>
          <motion.div {...reveal} className="pricing-card">
            <div className="pricing-card__price">
              <span className="pricing-card__amount">€9</span>
              <span className="pricing-card__period">/ maand / zaak</span>
            </div>
            <div className="pricing-card__trial">14 dagen gratis · geen kaart · zeg op wanneer je wil</div>
            <ul className="checklist checklist--inline">
              {includes.map((i) => (
                <li key={i}><Check size={16} strokeWidth={3} /> {i}</li>
              ))}
            </ul>
            <a className="btn btn--primary btn--lg btn--full" href={`${APP_URL}/register`}>
              {t('pricing.cta')} <ArrowRight size={18} />
            </a>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="container container--narrow">
          <motion.h2 {...reveal} className="section__title">{t('faq.title')}</motion.h2>
          <div className="faq">
            {faqItems.map((it, i) => (
              <motion.details key={it.q} {...reveal} transition={{ ...reveal.transition, delay: 0.05 * i }} className="faq__item">
                <summary>
                  <span>{it.q}</span>
                  <span className="faq__chev" aria-hidden>+</span>
                </summary>
                <p>{it.a}</p>
              </motion.details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section section--cta">
        <div className="container container--narrow text-center">
          <motion.h2 {...reveal} className="section__title">{t('cta.title')}</motion.h2>
          <motion.p {...reveal} className="section__intro">{t('cta.subtitle')}</motion.p>
          <motion.a
            {...reveal}
            className="btn btn--white btn--lg"
            href={`${APP_URL}/register`}
          >
            {t('cta.button')} <ArrowRight size={18} />
          </motion.a>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container footer__inner">
          <div className="footer__brand">
            <div className="brand"><span className="brand__mark" aria-hidden>▍</span> {t('brand')}</div>
            <div className="footer__meta">{t('footer.madeIn')}</div>
          </div>
          <div className="footer__links">
            <a href="/contact">{t('footer.contact')}</a>
            <a href="/privacy">{t('footer.privacy')}</a>
            <a href="/terms">{t('footer.terms')}</a>
          </div>
        </div>
      </footer>
    </>
  );
}
