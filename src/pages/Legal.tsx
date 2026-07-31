import { useTranslation } from 'react-i18next';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Link } from '../lib/router';
import { ArrowLeft } from 'lucide-react';

export function LegalPage({ kind }: { kind: 'privacy' | 'terms' }) {
  const { t } = useTranslation();
  const title    = t(`legal.${kind}.title`);
  const subtitle = t(`legal.${kind}.subtitle`);
  const sections = t(`legal.${kind}.sections`, { returnObjects: true }) as { h: string; b: string }[];

  const company = t('legal.company', { returnObjects: true }) as Record<string, string>;

  return (
    <div className="bg-paper text-ink min-h-screen overflow-x-hidden">
      <Header solid />

      <main className="pt-32 pb-20 px-6 sm:px-10">
        <div className="max-w-3xl mx-auto">
          <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-ink-2/70 hover:text-ink transition mb-8">
            <ArrowLeft size={15} /> {t('legal.back')}
          </Link>

          <div className="chip mb-5">{kind === 'privacy' ? '§ 01' : '§ 02'} · {t(`legal.chip.${kind}`)}</div>
          <h1 className="font-serif text-[36px] sm:text-[52px] leading-[1.02] tracking-tight font-semibold">{title}</h1>
          <p className="mt-4 text-ink-2/75 text-[16px] sm:text-[17px] leading-relaxed max-w-2xl">{subtitle}</p>
          <div className="mt-6 font-mono text-[11px] text-ink-2/50 uppercase tracking-widest">
            {t('legal.last_updated')} · 2026-01-15
          </div>

          <div className="mt-12 border-t border-hair" />

          <article className="mt-8 space-y-10">
            {sections.map((s, i) => (
              <section key={s.h}>
                <div className="flex gap-4">
                  <span className="font-mono text-xs text-ink-2/40 pt-1 shrink-0">{String(i + 1).padStart(2, '0')}</span>
                  <div className="flex-1">
                    <h2 className="font-serif text-[22px] sm:text-[26px] leading-snug mb-3">{s.h}</h2>
                    <p className="text-[15px] sm:text-[16px] text-ink-2/85 leading-relaxed whitespace-pre-line">{s.b}</p>
                  </div>
                </div>
              </section>
            ))}
          </article>

          <div className="mt-16 pt-8 border-t border-hair">
            <div className="chip mb-4">{t('legal.identity_title')}</div>
            <div className="bg-white border border-hair rounded-2xl p-6 font-mono text-[13px] text-ink-2/85 space-y-1.5 leading-relaxed">
              <div><span className="text-ink-2/50 w-24 inline-block">Company</span> {company.name}</div>
              <div><span className="text-ink-2/50 w-24 inline-block">Email</span> <a href={`mailto:${company.email}`} className="text-ink hover:underline">{company.email}</a></div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
