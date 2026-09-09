import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import i18n from './i18n';
import {
  Shield, Link2, Wifi, MapPin, FileDown, MessageCircle,
  Check, ChevronDown, ChevronUp, ArrowUpRight, ArrowRight,
} from 'lucide-react';
import { useRoute, navigate, LANGS, Lang, DEFAULT_LANG } from './lib/router';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { LegalPage } from './pages/Legal';
import { ContactPage } from './pages/Contact';

import { APP_URL } from './lib/config';
const FEATURE_ICONS = [Shield, Link2, Wifi, MapPin, FileDown, MessageCircle];

// ── FAQ item ─────────────────────────────────────────────────────────────────
function FaqItem({ q, a, idx }: { q: string; a: string; idx: number }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-t border-hair py-5">
      <button onClick={() => setOpen((o) => !o)} className="flex items-start justify-between w-full text-left gap-6">
        <div className="flex gap-4">
          <span className="font-mono text-xs text-ink-2/60 mt-1">{String(idx + 1).padStart(2, '0')}</span>
          <span className="font-serif text-lg leading-snug">{q}</span>
        </div>
        {open
          ? <ChevronUp size={18} className="shrink-0 text-ink-2/60 mt-1.5" />
          : <ChevronDown size={18} className="shrink-0 text-ink-2/60 mt-1.5" />}
      </button>
      {open && <p className="mt-4 ml-10 text-[15px] text-ink-2/80 leading-relaxed max-w-2xl">{a}</p>}
    </div>
  );
}

// ── Wax-seal stamp ───────────────────────────────────────────────────────────
function Seal({ text = 'VERZEGELD' }: { text?: string }) {
  return (
    <div className="animate-stamp absolute -top-4 right-0 sm:top-8 sm:-right-6 w-24 sm:w-28 h-24 sm:h-28 select-none pointer-events-none">
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_4px_8px_rgba(185,28,28,0.35)]">
        <defs>
          <path id="seal-arc-top" d="M 50,50 m -34,0 a 34,34 0 1,1 68,0" />
          <path id="seal-arc-bot" d="M 50,50 m -34,0 a 34,34 0 1,0 68,0" />
        </defs>
        <circle cx="50" cy="50" r="45" fill="none" stroke="var(--seal)" strokeWidth="2" strokeDasharray="2 3" opacity="0.9" />
        <circle cx="50" cy="50" r="38" fill="none" stroke="var(--seal)" strokeWidth="2.5" opacity="0.95" />
        <text fill="var(--seal)" fontFamily="JetBrains Mono, monospace" fontSize="8.5" fontWeight="700" letterSpacing="1.3">
          <textPath href="#seal-arc-top" startOffset="50%" textAnchor="middle">{text}</textPath>
        </text>
        <text fill="var(--seal)" fontFamily="JetBrains Mono, monospace" fontSize="6.5" letterSpacing="1.5">
          <textPath href="#seal-arc-bot" startOffset="50%" textAnchor="middle">BE · FOD-FIN · v1</textPath>
        </text>
        <g transform="translate(50 50)">
          <text textAnchor="middle" dominantBaseline="central" fill="var(--seal)" fontFamily="Fraunces, serif" fontStyle="italic" fontWeight="600" fontSize="14">
            2026
          </text>
        </g>
      </svg>
    </div>
  );
}

// ── Live receipt ─────────────────────────────────────────────────────────────
function Receipt() {
  return (
    <div className="relative">
      {/* Paper shadow */}
      <div className="absolute -inset-6 bg-black/10 blur-3xl rounded-full" aria-hidden />
      <motion.div
        initial={{ opacity: 0, y: 32, rotate: 2 }}
        animate={{ opacity: 1, y: 0, rotate: 1.5 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative"
      >
        <div className="receipt-edge receipt-edge-top bg-white border border-hair shadow-[0_30px_60px_-20px_rgba(0,0,0,0.25)] w-full max-w-[300px] sm:max-w-[360px] mx-auto">
          <div className="px-6 pt-6 pb-8 font-mono text-[11px] text-ink-2">
            <div className="flex items-center justify-between text-[10px] tracking-widest uppercase text-ink-2/60 border-b border-dashed border-hair pb-3">
              <span>Dagontvangst</span>
              <span>#0142</span>
            </div>

            <div className="pt-4 space-y-1.5">
              <div className="flex justify-between"><span className="text-ink-2/60">Datum</span><span>30-07-2026</span></div>
              <div className="flex justify-between"><span className="text-ink-2/60">Vestiging</span><span>Brasserie Gent</span></div>
              <div className="flex justify-between"><span className="text-ink-2/60">Volgnr</span><span>#0142</span></div>
            </div>

            <div className="mt-4 pt-3 border-t border-dashed border-hair space-y-1">
              <div className="flex justify-between"><span>0 %  ·  vrijgesteld</span><span>€ 12,00</span></div>
              <div className="flex justify-between"><span>6 %  ·  eten</span><span>€ 640,50</span></div>
              <div className="flex justify-between"><span>12 % ·  bereid</span><span>€ 128,10</span></div>
              <div className="flex justify-between"><span>21 % ·  drank</span><span>€ 459,90</span></div>
            </div>

            <div className="mt-4 pt-3 border-t border-dashed border-hair">
              <div className="flex justify-between text-[13px] font-semibold text-ink">
                <span>BRUTO</span><span>€ 1.240,50</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-dashed border-hair space-y-1">
              <div className="flex justify-between"><span className="text-ink-2/60">Cash</span><span>€ 312,00</span></div>
              <div className="flex justify-between"><span className="text-ink-2/60">Bancontact</span><span>€ 720,50</span></div>
              <div className="flex justify-between"><span className="text-ink-2/60">Voucher</span><span>€ 208,00</span></div>
            </div>

            <div className="mt-4 pt-3 border-t border-dashed border-hair text-[10px] text-ink-2/60 leading-relaxed">
              <div>prev  a3f9e02c…7c2e</div>
              <div className="text-ink font-semibold">hash  4b1d0f8a…e8b1</div>
              <div>sealed 30-07-2026 · 23:47</div>
            </div>
          </div>
        </div>
        <Seal text="VERZEGELD · SEALED · SCELLÉ" />
      </motion.div>
    </div>
  );
}

// ── Marquee ticker of live receipts ──────────────────────────────────────────
function Ticker() {
  const items = [
    { seq: '#0140', amt: '€ 987,10',   hash: 'e8b1…3a2f', time: '28-07 · 22:14' },
    { seq: '#0141', amt: '€ 1.412,00', hash: '9c02…b7d1', time: '29-07 · 23:02' },
    { seq: '#0142', amt: '€ 1.240,50', hash: '4b1d…e8b1', time: '30-07 · 23:47' },
    { seq: '#0143', amt: '€ 1.098,00', hash: 'a3f9…7c2e', time: '31-07 · 22:58' },
    { seq: '#0144', amt: '€ 1.560,20', hash: 'c412…8fa3', time: '01-08 · 23:11' },
    { seq: '#0145', amt: '€ 892,40',   hash: '77e0…10bc', time: '02-08 · 22:40' },
  ];
  const row = [...items, ...items];
  return (
    <div className="relative overflow-hidden border-y border-hair bg-white/50">
      <div className="absolute inset-y-0 left-0 w-10 sm:w-24 bg-gradient-to-r from-[var(--paper)] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-10 sm:w-24 bg-gradient-to-l from-[var(--paper)] to-transparent z-10 pointer-events-none" />
      <div className="flex gap-8 py-4 animate-marquee whitespace-nowrap font-mono text-[12px] text-ink-2">
        {row.map((r, i) => (
          <span key={i} className="flex items-center gap-3 shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 blink" />
            <span className="text-ink font-semibold">{r.seq}</span>
            <span>·</span>
            <span>{r.amt}</span>
            <span>·</span>
            <span className="text-ink-2/60">{r.hash}</span>
            <span>·</span>
            <span className="text-ink-2/50">{r.time}</span>
            <span className="text-ink-2/30 pl-4">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}

// ── Hash chain visualization (for feature bento) ─────────────────────────────
function ChainViz() {
  const blocks = [
    { n: '#0140', h: 'e8b1…', d: '28-07' },
    { n: '#0141', h: '9c02…', d: '29-07' },
    { n: '#0142', h: '4b1d…', d: '30-07' },
  ];
  return (
    <div className="relative">
      <div className="space-y-3">
        {blocks.map((b, i) => (
          <motion.div
            key={b.n}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 + i * 0.15 }}
            className="relative flex items-center gap-3"
          >
            <div className="font-mono text-[10px] text-white/40 w-14 shrink-0">{b.d}</div>
            <div className="flex-1 rounded-lg bg-white/[0.06] border border-white/10 px-3 py-2.5 flex items-center justify-between font-mono">
              <span className="text-white text-[13px] font-semibold">{b.n}</span>
              <span className="text-white/60 text-[11px]">{b.h}</span>
            </div>
            {i < blocks.length - 1 && (
              <div className="absolute left-[70px] top-full h-3 w-px bg-gradient-to-b from-white/30 to-transparent" />
            )}
          </motion.div>
        ))}
      </div>
      <div className="mt-4 flex items-center gap-2 font-mono text-[10px] text-emerald-400/90">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 blink" />
        chain verified · SHA-256
      </div>
    </div>
  );
}

// ── Step card with mini mockup ───────────────────────────────────────────────
function StepMock({ i }: { i: number }) {
  if (i === 0) {
    return (
      <div className="rounded-lg bg-white border border-hair p-4 space-y-2.5 font-mono text-[11px]">
        <div className="text-ink-2/50 text-[9px] tracking-widest uppercase">Nieuwe vestiging</div>
        <div className="border-b border-hair pb-2"><div className="text-ink-2/50 text-[9px]">Naam</div><div>Brasserie Gent</div></div>
        <div className="border-b border-hair pb-2"><div className="text-ink-2/50 text-[9px]">BTW</div><div>BE 0123.456.789</div></div>
        <div className="pt-1"><div className="text-ink-2/50 text-[9px]">Adres</div><div>Kortrijksesteenweg 12</div></div>
      </div>
    );
  }
  if (i === 1) {
    return (
      <div className="rounded-lg bg-white border border-hair p-4 space-y-1.5 font-mono text-[11px]">
        <div className="flex justify-between text-ink-2/60 text-[9px] uppercase tracking-widest border-b border-hair pb-1.5"><span>BTW-lijn</span><span>bedrag</span></div>
        <div className="flex justify-between"><span>6 %</span><span>€ 640,50</span></div>
        <div className="flex justify-between"><span>12 %</span><span>€ 128,10</span></div>
        <div className="flex justify-between"><span>21 %</span><span>€ 459,90</span></div>
        <div className="flex justify-between font-semibold text-ink pt-1.5 border-t border-hair"><span>Bruto</span><span>€ 1.240,50</span></div>
      </div>
    );
  }
  return (
    <div className="rounded-lg bg-ink text-white p-4 font-mono text-[11px] relative overflow-hidden">
      <div className="text-white/50 text-[9px] uppercase tracking-widest mb-2">Sealed</div>
      <div className="text-emerald-400">✓ chain OK</div>
      <div className="mt-1.5 text-white/70">#0142 · 4b1d…e8b1</div>
      <div className="mt-3 text-white/50 text-[10px]">30-07-2026 · 23:47</div>
    </div>
  );
}

// ── Router ───────────────────────────────────────────────────────────────────
export default function App() {
  const { path, lang, sub } = useRoute();

  // Bare "/" (or unknown language) → redirect to /{detected-lang}/
  useEffect(() => {
    const parts = path.split('/').filter(Boolean);
    const first = parts[0];
    const isLangPrefixed = first && (LANGS as readonly string[]).includes(first);
    if (!isLangPrefixed) {
      const detected = (i18n.language?.slice(0, 2) as Lang) ?? DEFAULT_LANG;
      const target = (LANGS as readonly string[]).includes(detected) ? detected : DEFAULT_LANG;
      const rest = path === '/' ? '' : path;
      navigate(`/${target}${rest}`, true);
    }
  }, [path]);

  // Keep i18n in sync with URL language
  useEffect(() => {
    if (i18n.language?.slice(0, 2) !== lang) i18n.changeLanguage(lang);
    document.documentElement.lang = lang;
  }, [lang]);

  if (sub.startsWith('/privacy') || sub.startsWith('/confidentialite'))
    return <LegalPage kind="privacy" />;
  if (sub.startsWith('/voorwaarden') || sub.startsWith('/terms') || sub.startsWith('/conditions'))
    return <LegalPage kind="terms" />;
  if (sub.startsWith('/contact'))
    return <ContactPage />;
  return <Landing />;
}

// ── Landing ──────────────────────────────────────────────────────────────────
function Landing() {
  const { t } = useTranslation();

  const problemItems    = t('landing.problem.items',      { returnObjects: true }) as { title: string; desc: string }[];
  const howSteps        = t('landing.how.steps',          { returnObjects: true }) as { num: string; title: string; desc: string }[];
  const featureItems    = t('landing.features.items',     { returnObjects: true }) as { title: string; desc: string }[];
  const testimonials    = t('landing.testimonials.items', { returnObjects: true }) as { name: string; role: string; text: string }[];
  const complianceItems = t('landing.compliance.items',   { returnObjects: true }) as string[];
  const pricingFeatures = t('landing.pricing.features',   { returnObjects: true }) as string[];
  const faqItems        = t('landing.faq.items',          { returnObjects: true }) as { q: string; a: string }[];

  return (
    <div className="bg-paper text-ink min-h-screen overflow-x-hidden">

      <Header />

      {/* Beta notice. Stated before anything is claimed below it: visitors are
          being asked to trust this with a legally required register, so "try it
          alongside your current book" belongs above the pitch, not buried in
          the pricing section. */}
      {/* mt-16 clears the fixed 64px header, which otherwise sits on top of
          this and hides it entirely. */}
      <div className="relative mt-16 bg-ink text-paper/90 px-6 sm:px-10 py-3">
        <div className="max-w-7xl mx-auto flex items-start gap-3 text-[13px] leading-relaxed">
          <span className="mt-0.5 shrink-0 font-mono text-[10px] uppercase tracking-widest bg-paper/15 rounded-full px-2 py-0.5">
            {t('landing.beta_banner.label')}
          </span>
          <p className="text-paper/80">{t('landing.beta_banner.text')}</p>
        </div>
      </div>

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative pt-12 sm:pt-20 pb-16 sm:pb-24 px-6 sm:px-10">
        <div className="absolute inset-0 bg-paper-dots mask-radial opacity-70 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1.35fr_1fr] gap-12 lg:gap-14 items-center">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
              className="font-serif text-[34px] sm:text-[48px] lg:text-[56px] xl:text-[62px] leading-[1.02] tracking-[-0.02em] font-semibold hyphens-none [word-break:normal]"
              lang={i18n.language.slice(0, 2)}
            >
              {t('landing.hero.title_line1')}<br />
              <span className="italic font-normal text-ink-2/80">{t('landing.hero.title_line2')}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }}
              className="mt-8 text-[17px] sm:text-[19px] text-ink-2/80 leading-relaxed max-w-xl"
            >
              {t('landing.hero.subtitle')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-10 flex flex-wrap items-center gap-3"
            >
              <a
                href={`${APP_URL}/register`}
                className="inline-flex items-center gap-2 bg-ink text-paper font-medium px-6 py-3.5 rounded-full hover:bg-ink-2 transition"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 blink" />
                {t('landing.header.try_now')}
              </a>
              <a href="#features"
                className="inline-flex items-center gap-2 text-ink font-medium px-6 py-3.5 rounded-full border border-hair hover:bg-white transition">
                {t('landing.hero.cta_secondary')}
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
              className="mt-10 flex items-center gap-3 text-sm text-ink-2/70 font-serif italic"
            >
              <span className="text-xl leading-none">”</span>
              {t('landing.hero.quote')}
            </motion.div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <Receipt />
          </div>
        </div>
      </section>

      {/* ── TICKER ────────────────────────────────────────────────────────── */}
      <Ticker />

      {/* ── STATEMENT (dark) ─────────────────────────────────────────────── */}
      <section className="relative bg-ink text-paper py-24 sm:py-32 px-6 sm:px-10 overflow-hidden">
        <div className="absolute inset-0 bg-ink-dots mask-radial opacity-60" />
        <div className="relative max-w-5xl mx-auto text-center">
          <div className="chip chip-dark mb-8">01 · {t('landing.chips.why')}</div>
          <h2 className="font-serif text-[28px] sm:text-[44px] lg:text-[52px] leading-[1.05] tracking-tight font-normal">
            {t('landing.problem.title')}
          </h2>
          <p className="mt-6 text-white/60 text-[15px] sm:text-[17px] max-w-2xl mx-auto leading-relaxed">
            {t('landing.problem.subtitle')}
          </p>

          <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/10 border border-white/10 rounded-2xl overflow-hidden">
            {problemItems.map(({ title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-ink p-6 sm:p-8 text-left"
              >
                <div className="font-mono text-[10px] text-white/40 mb-4 flex items-center gap-2">
                  <span className="text-red-400">✕</span>
                  {String(i + 1).padStart(2, '0')} · {t('landing.chips.risk')}
                </div>
                <h3 className="font-serif text-2xl mb-3">{title}</h3>
                <p className="text-white/60 text-[15px] leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────────── */}
      <section className="relative py-24 sm:py-32 px-6 sm:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-20">
            <div>
              <div className="chip mb-5">02 · {t('landing.chips.workflow')}</div>
              <h2 className="font-serif text-[32px] sm:text-[44px] lg:text-[52px] leading-[1.05] tracking-tight max-w-xl">
                {t('landing.how.title')}
              </h2>
            </div>
            <div className="font-mono text-xs text-ink-2/60 max-w-xs">
              {t('landing.how.intro')}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {howSteps.map(({ num, title, desc }, i) => (
              <motion.div
                key={num}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative border border-hair rounded-2xl p-6 bg-white/70 hover:bg-white transition"
              >
                <div className="flex items-baseline justify-between mb-6">
                  <span className="font-serif text-[54px] leading-none text-ink-2/15 font-semibold">{num}</span>
                  <span className="font-mono text-[10px] text-ink-2/50 uppercase tracking-widest">{t('landing.chips.step')} {i + 1}/3</span>
                </div>
                <h3 className="font-serif text-xl mb-2">{title}</h3>
                <p className="text-[14px] text-ink-2/75 leading-relaxed mb-5">{desc}</p>
                <StepMock i={i} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES — bento ─────────────────────────────────────────────── */}
      <section id="features" className="relative py-24 sm:py-32 px-6 sm:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16">
            <div>
              <div className="chip mb-5">03 · {t('landing.chips.features')}</div>
              <h2 className="font-serif text-[32px] sm:text-[44px] lg:text-[52px] leading-[1.05] tracking-tight max-w-2xl">
                {t('landing.features.title')}.<br />
                <span className="italic font-normal text-ink-2/70">{t('landing.featuresExtra.accent')}</span>
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[minmax(220px,auto)]">
            {/* Big feature card — chain */}
            <div className="sm:col-span-2 lg:col-span-2 lg:row-span-2 relative bg-ink text-paper rounded-3xl p-8 overflow-hidden grain">
              <div className="absolute inset-0 bg-ink-dots opacity-40" />
              <div className="relative flex flex-col h-full">
                <div className="chip chip-dark mb-4">{t('landing.chips.sealed')}</div>
                <h3 className="font-serif text-3xl sm:text-4xl leading-tight max-w-sm">
                  {featureItems[1]?.title ?? 'Hash-chain immutabiliteit'}
                </h3>
                <p className="mt-3 text-white/60 max-w-sm text-[15px] leading-relaxed">
                  {featureItems[1]?.desc}
                </p>
                <div className="mt-auto pt-8">
                  <ChainViz />
                </div>
              </div>
            </div>

            {/* Small feature cards */}
            {featureItems
              .map((item, idx) => ({ ...item, idx }))
              .filter((f) => f.idx !== 1)
              .map(({ title, desc, idx }) => {
                const Icon = FEATURE_ICONS[idx] ?? Shield;
                return (
                  <motion.div
                    key={title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.05 * idx }}
                    className="relative border border-hair rounded-3xl p-6 bg-white/60 hover:bg-white hover:-translate-y-0.5 transition"
                  >
                    <div className="flex items-start justify-between mb-6">
                      <div className="w-10 h-10 rounded-xl bg-ink text-paper flex items-center justify-center">
                        <Icon size={18} />
                      </div>
                      <span className="font-mono text-[10px] text-ink-2/40">/{String(idx + 1).padStart(2, '0')}</span>
                    </div>
                    <h3 className="font-serif text-lg leading-snug mb-1.5">{title}</h3>
                    <p className="text-[13.5px] text-ink-2/70 leading-relaxed">{desc}</p>
                  </motion.div>
                );
              })}
          </div>
        </div>
      </section>

      {/* ── COMPLIANCE — split ───────────────────────────────────────────── */}
      <section className="relative py-24 sm:py-32 px-6 sm:px-10 bg-white/50 border-y border-hair">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20">
          <div className="lg:sticky lg:top-24 self-start">
            <div className="chip mb-5">04 · {t('landing.chips.compliance')}</div>
            <h2 className="font-serif text-[32px] sm:text-[44px] lg:text-[48px] leading-[1.05] tracking-tight">
              {t('landing.compliance.title')}
            </h2>
            <p className="mt-6 text-ink-2/75 text-[16px] leading-relaxed max-w-md">
              {t('landing.compliance.subtitle')}
            </p>
            <p className="mt-8 text-sm text-ink-2/60 font-serif italic max-w-md">
              {t('landing.compliance.bonus')}
            </p>
          </div>

          <div className="relative">
            <div className="hidden md:block absolute -top-10 right-2 z-10 pointer-events-none">
              <div className="relative w-28 h-28">
                <div className="animate-stamp absolute inset-0">
                  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_4px_8px_rgba(185,28,28,0.35)]">
                    <defs>
                      <path id="cmp-arc-top" d="M 50,50 m -34,0 a 34,34 0 1,1 68,0" />
                      <path id="cmp-arc-bot" d="M 50,50 m -34,0 a 34,34 0 1,0 68,0" />
                    </defs>
                    <circle cx="50" cy="50" r="45" fill="none" stroke="var(--seal)" strokeWidth="2" strokeDasharray="2 3" opacity="0.9" />
                    <circle cx="50" cy="50" r="38" fill="none" stroke="var(--seal)" strokeWidth="2.5" opacity="0.95" />
                    <text fill="var(--seal)" fontFamily="JetBrains Mono, monospace" fontSize="8.5" fontWeight="700" letterSpacing="1.3">
                      <textPath href="#cmp-arc-top" startOffset="50%" textAnchor="middle">FOD · SPF · FPS</textPath>
                    </text>
                    <text fill="var(--seal)" fontFamily="JetBrains Mono, monospace" fontSize="6.5" letterSpacing="1.5">
                      <textPath href="#cmp-arc-bot" startOffset="50%" textAnchor="middle">CONFORM · 2026</textPath>
                    </text>
                    <g transform="translate(50 50) rotate(-8)">
                      <text textAnchor="middle" dominantBaseline="central" fill="var(--seal)" fontFamily="Fraunces, serif" fontStyle="italic" fontWeight="600" fontSize="13">
                        conform
                      </text>
                    </g>
                  </svg>
                </div>
              </div>
            </div>
            <ul className="divide-y divide-hair border border-hair rounded-2xl bg-white overflow-hidden">
              {complianceItems.map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="flex items-start gap-5 px-6 py-5"
                >
                  <span className="font-mono text-[10px] text-ink-2/40 mt-1 shrink-0 w-6">{String(i + 1).padStart(2, '0')}</span>
                  <span className="flex-1 text-[15px] leading-relaxed">{item}</span>
                  <span className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center shrink-0">
                    <Check size={14} className="text-white" strokeWidth={3} />
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
      <section className="relative py-24 sm:py-32 px-6 sm:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between gap-6 mb-12 md:mb-14">
            <div>
              <div className="chip mb-5">05 · {t('landing.chips.reviews')}</div>
              <h2 className="font-serif text-[32px] sm:text-[44px] lg:text-[52px] leading-[1.05] tracking-tight max-w-2xl">
                {t('landing.testimonialsExtra.heading')}<br />
                <span className="italic font-normal text-ink-2/70">{t('landing.testimonialsExtra.accent')}</span>
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map(({ name, role, text }, i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative bg-white border border-hair rounded-2xl p-7 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.15)] ${
                  i === 0 ? 'md:rotate-[-1.2deg]' : i === 2 ? 'md:rotate-[1.5deg]' : 'md:-translate-y-3'
                }`}
              >
                <div className="font-serif text-4xl leading-none text-ink-2/25 select-none">“</div>
                <p className="mt-2 font-serif italic text-[17px] leading-snug text-ink-2">{text}</p>
                <div className="mt-6 pt-4 border-t border-dashed border-hair flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-ink text-paper font-serif italic font-semibold flex items-center justify-center">
                    {name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-serif text-[15px] font-semibold leading-tight">{name}</div>
                    <div className="font-mono text-[10px] text-ink-2/60 uppercase tracking-wider mt-0.5">{role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING + FAQ side by side ───────────────────────────────────── */}
      <section className="relative py-24 sm:py-32 px-6 sm:px-10 bg-white/60 border-y border-hair">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-20">

          {/* Pricing */}
          <div>
            <div className="chip mb-5">06 · {t('landing.chips.pricing')}</div>
            <h2 className="font-serif text-[32px] sm:text-[40px] lg:text-[46px] leading-[1.05] tracking-tight mb-3">
              {t('landing.pricing.title')}
            </h2>
            <p className="text-ink-2/70 mb-8">{t('landing.pricing.subtitle')}</p>

            <div className="relative bg-ink text-paper rounded-3xl p-8 overflow-hidden grain">
              <div className="absolute inset-0 bg-ink-dots opacity-30" />
              <div className="relative">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="font-serif text-6xl sm:text-7xl font-semibold tracking-tight">{t('landing.pricing.price')}</span>
                  <span className="text-white/50 font-mono text-xs uppercase tracking-widest">{t('landing.pricing.period')}</span>
                </div>
                <div className="font-mono text-[11px] text-white/50 mb-8">{t('landing.pricing.trial_note')}</div>

                <ul className="space-y-2.5 mb-8">
                  {pricingFeatures.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-[14px] text-white/90">
                      <span className="w-4 h-4 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                        <Check size={11} className="text-emerald-400" strokeWidth={3} />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>

                <a
                  href={`${APP_URL}/register`}
                  className="flex items-center justify-center gap-2 bg-paper text-ink font-medium py-3.5 rounded-full w-full hover:opacity-90 transition"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 blink" />
                  {t('landing.header.try_now')}
                </a>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div>
            <div className="chip mb-5">07 · {t('landing.chips.faq')}</div>
            <h2 className="font-serif text-[32px] sm:text-[40px] lg:text-[46px] leading-[1.05] tracking-tight mb-8">
              {t('landing.faq.title')}
            </h2>
            <div>
              {faqItems.map(({ q, a }, i) => <FaqItem key={q} q={q} a={a} idx={i} />)}
              <div className="border-t border-hair" />
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────────── */}
      <section className="relative bg-ink text-paper py-28 sm:py-40 px-6 sm:px-10 overflow-hidden grain">
        <div className="absolute inset-0 bg-ink-dots mask-radial opacity-60" />
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="chip chip-dark mb-8 mx-auto">{t('landing.chips.ready')}</div>
          <h2 className="font-serif text-[36px] sm:text-[60px] lg:text-[80px] leading-[0.98] tracking-tight font-normal">
            {t('landing.cta.title_lead')}<br />
            <span className="italic text-white/60">{t('landing.cta.title_accent')}</span>
          </h2>
          <p className="mt-8 text-white/60 text-[15px] sm:text-[17px] max-w-xl mx-auto px-4">{t('landing.cta.subtitle')}</p>
          <a
            href={`${APP_URL}/register`}
            className="mt-10 inline-flex items-center gap-2 bg-paper text-ink font-medium px-8 py-4 rounded-full hover:opacity-90 transition"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 blink" />
            {t('landing.header.try_now')}
          </a>
          <div className="mt-14 flex items-center justify-center gap-x-6 gap-y-2 font-mono text-[10px] text-white/40 uppercase tracking-widest flex-wrap px-4">
            {(t('landing.cta.trust', { returnObjects: true }) as string[]).map((c) => (
              <span key={c}>· {c}</span>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
