import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import i18n from './i18n';
import {
  Shield, Link2, Wifi, MapPin, FileDown, MessageCircle,
  Check, ChevronDown, ChevronUp, Lock, Hash, RotateCcw,
  ArrowRight, Star,
} from 'lucide-react';

const APP_URL = (import.meta.env.VITE_APP_URL as string) ?? 'https://app.dagontvangst.be';

const fade    = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } };
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };

// Icons paired with translated feature blocks (order matches nl/fr/en JSON arrays).
const FEATURE_ICONS = [Shield, Link2, Wifi, MapPin, FileDown, MessageCircle];

// ── Scroll-reveal wrapper ────────────────────────────────────────────────────
function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.55, delay }}
    >
      {children}
    </motion.div>
  );
}

// ── Language switcher ────────────────────────────────────────────────────────
function LangSwitcher() {
  const [lang, setLang] = useState(i18n.language.slice(0, 2) as 'nl' | 'fr' | 'en');
  function pick(l: 'nl' | 'fr' | 'en') { setLang(l); i18n.changeLanguage(l); }
  return (
    <div className="flex gap-1">
      {(['nl', 'fr', 'en'] as const).map((l) => (
        <button key={l} onClick={() => pick(l)}
          className={`px-2 py-0.5 rounded text-xs font-medium uppercase transition ${lang === l ? 'bg-indigo-600 text-white' : 'text-gray-500 hover:text-gray-800'}`}>
          {l}
        </button>
      ))}
    </div>
  );
}

// ── Hash-chain visual ────────────────────────────────────────────────────────
function HashChainVisual({ footerText }: { footerText: string }) {
  const blocks = [
    { seq: '#0001', hash: 'a3f9…', date: '28 jul' },
    { seq: '#0002', hash: '7c2e…', date: '29 jul' },
    { seq: '#0003', hash: 'e8b1…', date: '30 jul' },
  ];
  return (
    <div className="space-y-2">
      {blocks.map((b, i) => (
        <motion.div key={b.seq} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.15 }}
          className="bg-white/10 backdrop-blur rounded-xl px-4 py-3 flex items-center gap-4 text-white text-sm">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/20 shrink-0">
            <Lock size={14} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-bold">{b.seq} · {b.date}</div>
            <div className="font-mono text-xs text-indigo-200">{b.hash}</div>
          </div>
          {i < blocks.length - 1 && <Hash size={14} className="text-indigo-300 shrink-0" />}
        </motion.div>
      ))}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
        className="flex items-center gap-2 text-indigo-200 text-xs px-4">
        <Shield size={12} /> {footerText}
      </motion.div>
    </div>
  );
}

// ── FAQ item ─────────────────────────────────────────────────────────────────
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b last:border-0 py-4">
      <button onClick={() => setOpen((o) => !o)} className="flex items-center justify-between w-full text-left gap-4">
        <span className="font-medium text-sm">{q}</span>
        {open ? <ChevronUp size={16} className="shrink-0 text-gray-400" /> : <ChevronDown size={16} className="shrink-0 text-gray-400" />}
      </button>
      {open && <p className="mt-3 text-sm text-gray-600 leading-relaxed">{a}</p>}
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function App() {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  // Arrays come from JSON via returnObjects — always cast to the expected type.
  const heroBadges     = t('landing.hero.badges',        { returnObjects: true }) as string[];
  const problemItems   = t('landing.problem.items',      { returnObjects: true }) as { title: string; desc: string }[];
  const howSteps       = t('landing.how.steps',          { returnObjects: true }) as { num: string; title: string; desc: string }[];
  const featureItems   = t('landing.features.items',     { returnObjects: true }) as { title: string; desc: string }[];
  const testimonials   = t('landing.testimonials.items', { returnObjects: true }) as { name: string; role: string; text: string }[];
  const complianceItems = t('landing.compliance.items',  { returnObjects: true }) as string[];
  const pricingFeatures = t('landing.pricing.features',  { returnObjects: true }) as string[];
  const faqItems       = t('landing.faq.items',          { returnObjects: true }) as { q: string; a: string }[];

  return (
    <div className="min-h-screen bg-white font-sans">

      {/* ── Header ── */}
      <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-200 ${scrolled ? 'bg-white/95 backdrop-blur shadow-sm border-b' : ''}`}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-sm">D</div>
            <span className="font-bold text-gray-900">Dagontvangst</span>
          </div>
          <div className="flex-1" />
          <LangSwitcher />
          <a href={APP_URL} className="hidden sm:block text-sm text-gray-600 hover:text-gray-900 transition">{t('landing.header.sign_in')}</a>
          <a href={`${APP_URL}/register`}
            className="bg-indigo-600 text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-indigo-700 transition">
            {t('landing.header.try_free')}
          </a>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="pt-32 pb-24 px-6 bg-gradient-to-br from-indigo-50 via-white to-purple-50 overflow-hidden">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex flex-wrap gap-2 mb-6">
              {heroBadges.map((b) => (
                <span key={b} className="text-xs font-medium bg-indigo-100 text-indigo-700 px-2.5 py-1 rounded-full">{b}</span>
              ))}
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight mb-5">
              {t('landing.hero.title_line1')}<br />
              <span className="text-indigo-600">{t('landing.hero.title_line2')}</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">{t('landing.hero.subtitle')}</p>
            <div className="flex flex-wrap gap-3 mb-8">
              <a href={`${APP_URL}/register`}
                className="flex items-center gap-2 bg-indigo-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-indigo-700 transition text-sm">
                {t('landing.hero.cta_primary')} <ArrowRight size={16} />
              </a>
              <a href="#features"
                className="flex items-center gap-2 border text-gray-700 font-medium px-6 py-3 rounded-xl hover:bg-gray-50 transition text-sm">
                {t('landing.hero.cta_secondary')}
              </a>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-500">
              <div className="flex">
                {[...Array(5)].map((_, i) => <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" />)}
              </div>
              <span>{t('landing.hero.quote')}</span>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 32 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-3xl p-8 shadow-2xl">
            <div className="text-white font-semibold text-sm mb-4 flex items-center gap-2">
              <Shield size={16} /> {t('landing.hero.chain_title')}
            </div>
            <HashChainVisual footerText={t('landing.hero.chain_footer')} />
          </motion.div>
        </div>
      </section>

      {/* ── Problem ── */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <h2 className="text-3xl font-bold text-center mb-4">{t('landing.problem.title')}</h2>
            <p className="text-gray-600 text-center mb-12">{t('landing.problem.subtitle')}</p>
          </Reveal>
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {problemItems.map(({ title, desc }) => (
              <motion.div key={title} variants={fade} className="bg-white border rounded-2xl p-5">
                <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center mb-3">
                  <span className="text-red-500 font-bold text-xs">✗</span>
                </div>
                <h3 className="font-semibold mb-1 text-sm">{title}</h3>
                <p className="text-sm text-gray-600">{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <Reveal><h2 className="text-3xl font-bold text-center mb-12">{t('landing.how.title')}</h2></Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howSteps.map(({ num, title, desc }) => (
              <Reveal key={num}>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-indigo-600 text-white font-bold text-lg flex items-center justify-center mx-auto mb-4">{num}</div>
                  <h3 className="font-semibold mb-2">{title}</h3>
                  <p className="text-sm text-gray-600">{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="py-20 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <Reveal><h2 className="text-3xl font-bold text-center mb-12">{t('landing.features.title')}</h2></Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featureItems.map(({ title, desc }, i) => {
              const Icon = FEATURE_ICONS[i] ?? Shield;
              return (
                <Reveal key={title} delay={i * 0.05}>
                  <motion.div whileHover={{ y: -4 }} className="bg-white border rounded-2xl p-5 transition cursor-default">
                    <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center mb-4">
                      <Icon size={20} className="text-indigo-600" />
                    </div>
                    <h3 className="font-semibold text-sm mb-1.5">{title}</h3>
                    <p className="text-sm text-gray-600">{desc}</p>
                  </motion.div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <Reveal><h2 className="text-3xl font-bold text-center mb-12">{t('landing.testimonials.title')}</h2></Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map(({ name, role, text }, i) => (
              <Reveal key={name} delay={i * 0.08}>
                <div className="border rounded-2xl p-6 bg-white">
                  <div className="flex mb-3">
                    {[...Array(5)].map((_, j) => <Star key={j} size={14} className="text-yellow-400 fill-yellow-400" />)}
                  </div>
                  <p className="text-sm text-gray-700 mb-4 leading-relaxed">"{text}"</p>
                  <div className="text-sm font-semibold">{name}</div>
                  <div className="text-xs text-gray-500">{role}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Compliance ── */}
      <section className="py-20 px-6 bg-indigo-50">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <h2 className="text-3xl font-bold text-center mb-4">{t('landing.compliance.title')}</h2>
            <p className="text-gray-600 text-center mb-10">{t('landing.compliance.subtitle')}</p>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {complianceItems.map((item) => (
              <Reveal key={item}>
                <div className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 border">
                  <Check size={16} className="text-emerald-500 shrink-0" />
                  <span className="text-sm">{item}</span>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.1}>
            <p className="text-center text-sm text-gray-500 mt-6">
              <RotateCcw size={13} className="inline mr-1" />
              {t('landing.compliance.bonus')}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section className="py-20 px-6">
        <div className="max-w-md mx-auto text-center">
          <Reveal>
            <h2 className="text-3xl font-bold mb-4">{t('landing.pricing.title')}</h2>
            <p className="text-gray-600 mb-8">{t('landing.pricing.subtitle')}</p>
            <div className="border-2 border-indigo-600 rounded-3xl p-8 bg-white shadow-xl">
              <div className="flex items-baseline justify-center gap-1 mb-2">
                <span className="text-5xl font-extrabold text-indigo-600">{t('landing.pricing.price')}</span>
                <span className="text-gray-500 text-sm">{t('landing.pricing.period')}</span>
              </div>
              <p className="text-gray-500 text-sm mb-6">{t('landing.pricing.trial_note')}</p>
              <ul className="space-y-2 text-sm text-left mb-8">
                {pricingFeatures.map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <Check size={15} className="text-emerald-500 shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              <a href={`${APP_URL}/register`}
                className="block w-full bg-indigo-600 text-white font-bold py-3.5 rounded-xl hover:bg-indigo-700 transition text-sm">
                {t('landing.pricing.cta')}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-2xl mx-auto">
          <Reveal><h2 className="text-3xl font-bold text-center mb-10">{t('landing.faq.title')}</h2></Reveal>
          <div className="bg-white border rounded-2xl px-6 divide-y">
            {faqItems.map(({ q, a }) => <FaqItem key={q} q={q} a={a} />)}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-6 bg-gradient-to-br from-indigo-600 to-indigo-800 text-white text-center">
        <Reveal>
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">{t('landing.cta.title')}</h2>
          <p className="text-indigo-200 mb-8 text-lg">{t('landing.cta.subtitle')}</p>
          <a href={`${APP_URL}/register`}
            className="inline-flex items-center gap-2 bg-white text-indigo-700 font-bold px-8 py-4 rounded-xl hover:bg-indigo-50 transition text-sm">
            {t('landing.cta.button')} <ArrowRight size={16} />
          </a>
        </Reveal>
      </section>

      {/* ── Footer ── */}
      <footer className="py-10 px-6 border-t">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">D</div>
            <span className="text-sm font-semibold">Dagontvangst</span>
          </div>
          <p className="text-xs text-gray-400">{t('landing.footer.made_in')}</p>
          <div className="flex gap-4 text-xs text-gray-500">
            <a href="#" className="hover:text-gray-800 transition">{t('landing.footer.privacy')}</a>
            <a href="#" className="hover:text-gray-800 transition">{t('landing.footer.terms')}</a>
            <a href="mailto:info@dagontvangst.be" className="hover:text-gray-800 transition">{t('landing.footer.contact')}</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
