import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import i18n from './i18n';
import {
  Shield, Link2, Wifi, MapPin, FileDown, MessageCircle,
  Check, ChevronDown, ChevronUp, Lock, Hash, RotateCcw,
  ArrowRight, Star,
} from 'lucide-react';

const APP_URL = import.meta.env.VITE_APP_URL as string ?? 'https://app.dagontvangst.be';

const fade    = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } };
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };

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
function HashChainVisual() {
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
        <Shield size={12} /> Ketting geverifieerd — 3 afsluitingen
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

  const features = [
    { icon: Shield,         key: 'fod',       title: 'FOD-conform',             desc: 'Voldoet aan de Belgische regelgeving voor dagontvangstenboeken.' },
    { icon: Link2,          key: 'chain',      title: 'Hash-chain immutabiliteit',desc: 'Elke afsluiting is cryptografisch geketend. Manipulatie is onmogelijk.' },
    { icon: Wifi,           key: 'pwa',        title: 'Offline PWA',             desc: 'Werkt ook zonder internet. Synchroniseert automatisch bij verbinding.' },
    { icon: MapPin,         key: 'multi',      title: 'Multi-vestiging',         desc: 'Beheer al je zaken vanuit één account met rolgebaseerde toegang.' },
    { icon: FileDown,       key: 'export',     title: 'Export PDF/CSV/JSON',     desc: 'Download elk moment een inspecteur-klaar bundel.' },
    { icon: MessageCircle,  key: 'whatsapp',   title: 'WhatsApp notificaties',   desc: 'Ontvang bevestigingen en herinneringen via WhatsApp.' },
  ];

  const compliance = [
    'Doorlopende nummering per boekjaar',
    'Onwijzigbaarheid na afsluiting',
    'BTW-uitsplitsing per tarief (0/6/12/21%)',
    'Kassa-afstemming met kasverschil',
    '7 jaar bewaarplicht ingebouwd',
    'Export in FOD-leesbaar formaat',
  ];

  const testimonials = [
    { name: 'Sofie D.', role: 'Eigenaar, Brasserie Gent', text: 'Eindelijk geen papieren registers meer. De ketting geeft me gemoedsrust bij een BTW-controle.' },
    { name: 'Karim B.', role: 'Manager, Restaurant Brussel', text: 'Onboarding in 5 minuten. De FOD-export werkt perfect — onze accountant is blij.' },
    { name: 'Elke V.', role: 'Uitbaatster, Café Antwerpen', text: 'De PWA werkt ook als het wifi even uitvalt. Mijn personeel vergeet nooit meer af te sluiten.' },
  ];

  const faqs = [
    { q: 'Is een digitaal dagontvangstenboek verplicht?', a: 'Ja, voor Belgische horeca-ondernemingen die niet met een gecertificeerd kassasysteem werken is een manueel of digitaal dagontvangstenboek verplicht. Dagontvangst automatiseert de vereiste opmaak.' },
    { q: 'Hoe verloopt een FOD-controle?', a: 'De inspecteur vraagt een export van de afsluitingen voor een bepaalde periode. Met Dagontvangst download je een JSON- of PDF-bundel met de hash-manifest — bewijs van integriteit dat de FOD accepteert.' },
    { q: 'Wat als ik een fout heb gemaakt?', a: 'Correcties zijn append-only: het origineel blijft intact en een nieuwe correctie-afsluiting wordt aan de ketting toegevoegd met verwijzing naar het origineel. Zo voldoe je aan de eis van onwijzigbaarheid.' },
    { q: 'Werkt het ook als ik meerdere zaken heb?', a: 'Ja. Eén account ondersteunt meerdere vestigingen. Elk met hun eigen gesloten ketting, rollen en statistieken.' },
  ];

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
          <a href={APP_URL} className="hidden sm:block text-sm text-gray-600 hover:text-gray-900 transition">Inloggen</a>
          <a href={`${APP_URL}/register`}
            className="bg-indigo-600 text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-indigo-700 transition">
            Gratis proberen
          </a>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="pt-32 pb-24 px-6 bg-gradient-to-br from-indigo-50 via-white to-purple-50 overflow-hidden">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex flex-wrap gap-2 mb-6">
              {['FOD-conform', 'Hash-chain', 'PWA offline', 'EU-data'].map((b) => (
                <span key={b} className="text-xs font-medium bg-indigo-100 text-indigo-700 px-2.5 py-1 rounded-full">{b}</span>
              ))}
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight mb-5">
              Digitaal dagontvangstenboek<br />
              <span className="text-indigo-600">voor Belgische horeca</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Verzegel elke dag met één klik. Onwijzigbaar, hash-geketend en altijd klaar voor een FOD-controle.
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              <a href={`${APP_URL}/register`}
                className="flex items-center gap-2 bg-indigo-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-indigo-700 transition text-sm">
                Start je gratis proefperiode <ArrowRight size={16} />
              </a>
              <a href="#features"
                className="flex items-center gap-2 border text-gray-700 font-medium px-6 py-3 rounded-xl hover:bg-gray-50 transition text-sm">
                Meer info
              </a>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-500">
              <div className="flex">
                {[...Array(5)].map((_, i) => <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" />)}
              </div>
              <span>"Eindelijk gemoedsrust bij een BTW-controle." — Sofie D., Gent</span>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 32 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-3xl p-8 shadow-2xl">
            <div className="text-white font-semibold text-sm mb-4 flex items-center gap-2">
              <Shield size={16} /> Live dagafsluiting
            </div>
            <HashChainVisual />
          </motion.div>
        </div>
      </section>

      {/* ── Problem ── */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <h2 className="text-3xl font-bold text-center mb-4">Papieren registers zijn een tikkende tijdbom</h2>
            <p className="text-gray-600 text-center mb-12">Elke fout, elke doorhaling, elk ontbrekend dagblad kan een boete opleveren bij een FOD-controle.</p>
          </Reveal>
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { title: 'Manuele fouten', desc: 'Rekenfout in de BTW-uitsplitsing? Te laat ontdekt is te laat gecorrigeerd.' },
              { title: 'Excel is niet onwijzigbaar', desc: 'Spreadsheets kunnen altijd gewijzigd worden. Een inspecteur weet dat ook.' },
              { title: 'BTW-splitsing vergeten', desc: 'Elk tarief (0/6/12/21%) moet apart bijgehouden worden. Per dag.' },
              { title: 'Auditspoor ontbreekt', desc: 'Zonder bewijs van integriteit staat je advocaat met lege handen.' },
            ].map(({ title, desc }) => (
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
          <Reveal>
            <h2 className="text-3xl font-bold text-center mb-12">Hoe het werkt</h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { num: '01', title: 'Registreer je zaak', desc: 'Maak een account aan, voeg je vestiging toe met BTW-nummer en adres. Klaar in 2 minuten.' },
              { num: '02', title: 'Sluit elke dag af', desc: 'Voer de BTW-lijnen en betaalmethoden in. De kassa-afstemming en hash worden automatisch berekend.' },
              { num: '03', title: 'Verzegeld & verifieerbaar', desc: 'De afsluiting is onwijzigbaar in de ketting opgeslagen. Download een FOD-bundel wanneer nodig.' },
            ].map(({ num, title, desc }) => (
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
          <Reveal>
            <h2 className="text-3xl font-bold text-center mb-12">Alles wat je nodig hebt</h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map(({ icon: Icon, key, title, desc }, i) => (
              <Reveal key={key} delay={i * 0.05}>
                <motion.div whileHover={{ y: -4 }} className="bg-white border rounded-2xl p-5 transition cursor-default">
                  <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center mb-4">
                    <Icon size={20} className="text-indigo-600" />
                  </div>
                  <h3 className="font-semibold text-sm mb-1.5">{title}</h3>
                  <p className="text-sm text-gray-600">{desc}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <Reveal><h2 className="text-3xl font-bold text-center mb-12">Wat klanten zeggen</h2></Reveal>
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
            <h2 className="text-3xl font-bold text-center mb-4">De FOD-Financiën checklist</h2>
            <p className="text-gray-600 text-center mb-10">Dagontvangst voldoet aan alle wettelijke vereisten voor het Belgische dagontvangstenboek.</p>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {compliance.map((item) => (
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
              Bonus: hash-chain maakt elke wijziging detecteerbaar — zelfs bij een database-inbraak.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section className="py-20 px-6">
        <div className="max-w-md mx-auto text-center">
          <Reveal>
            <h2 className="text-3xl font-bold mb-4">Eenvoudige prijs</h2>
            <p className="text-gray-600 mb-8">Geen verborgen kosten. Geen installatie.</p>
            <div className="border-2 border-indigo-600 rounded-3xl p-8 bg-white shadow-xl">
              <div className="flex items-baseline justify-center gap-1 mb-2">
                <span className="text-5xl font-extrabold text-indigo-600">€9</span>
                <span className="text-gray-500 text-sm">/ maand / vestiging</span>
              </div>
              <p className="text-gray-500 text-sm mb-6">14 dagen gratis, geen kredietkaart vereist</p>
              <ul className="space-y-2 text-sm text-left mb-8">
                {[
                  'Onbeperkt afsluitingen',
                  'Onbeperkt gebruikers',
                  'PWA offline modus',
                  'PDF/CSV/JSON export',
                  'FOD-inspecteur toegang',
                  'Hash-chain waarborg',
                ].map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <Check size={15} className="text-emerald-500 shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              <a href={`${APP_URL}/register`}
                className="block w-full bg-indigo-600 text-white font-bold py-3.5 rounded-xl hover:bg-indigo-700 transition text-sm">
                Start 14 dagen gratis
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-2xl mx-auto">
          <Reveal><h2 className="text-3xl font-bold text-center mb-10">Veelgestelde vragen</h2></Reveal>
          <div className="bg-white border rounded-2xl px-6 divide-y">
            {faqs.map(({ q, a }) => <FaqItem key={q} q={q} a={a} />)}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-6 bg-gradient-to-br from-indigo-600 to-indigo-800 text-white text-center">
        <Reveal>
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">Klaar om te starten?</h2>
          <p className="text-indigo-200 mb-8 text-lg">14 dagen gratis, geen kredietkaart, opzegbaar op elk moment.</p>
          <a href={`${APP_URL}/register`}
            className="inline-flex items-center gap-2 bg-white text-indigo-700 font-bold px-8 py-4 rounded-xl hover:bg-indigo-50 transition text-sm">
            Probeer nu gratis <ArrowRight size={16} />
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
          <p className="text-xs text-gray-400">Gemaakt in België voor Belgische horeca</p>
          <div className="flex gap-4 text-xs text-gray-500">
            <a href="#" className="hover:text-gray-800 transition">Privacy</a>
            <a href="#" className="hover:text-gray-800 transition">Voorwaarden</a>
            <a href="mailto:info@dagontvangst.be" className="hover:text-gray-800 transition">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
