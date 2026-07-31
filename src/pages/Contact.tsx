import { useState, FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Link } from '../lib/router';
import { ArrowLeft, ArrowUpRight, Mail, Check } from 'lucide-react';

const FORM_ENDPOINT = 'https://formsubmit.co/ajax/sweaniznoubagh@gmail.com';

type Status = 'idle' | 'sending' | 'ok' | 'error';

export function ContactPage() {
  const { t } = useTranslation();
  const [status, setStatus] = useState<Status>('idle');
  const company = t('legal.company', { returnObjects: true }) as Record<string, string>;

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    // Honeypot — if filled, silently drop
    if ((data.get('_honey') as string)?.length) { setStatus('ok'); return; }
    const payload = {
      name: data.get('name'),
      email: data.get('email'),
      subject: data.get('subject'),
      message: data.get('message'),
      _subject: `[dagontvangst.be] ${data.get('subject') || 'Contact'}`,
      _template: 'table',
      _captcha: 'false',
    };
    setStatus('sending');
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) { setStatus('ok'); form.reset(); }
      else setStatus('error');
    } catch { setStatus('error'); }
  }

  return (
    <div className="bg-paper text-ink min-h-screen overflow-x-hidden">
      <Header solid />

      <main className="pt-32 pb-20 px-6 sm:px-10">
        <div className="max-w-5xl mx-auto">
          <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-ink-2/70 hover:text-ink transition mb-8">
            <ArrowLeft size={15} /> {t('legal.back')}
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-10 lg:gap-16">
            {/* Form */}
            <div>
              <div className="chip mb-5">§ 03 · {t('contact.chip')}</div>
              <h1 className="font-serif text-[36px] sm:text-[52px] leading-[1.02] tracking-tight font-semibold">{t('contact.title')}</h1>
              <p className="mt-4 text-ink-2/75 text-[16px] sm:text-[17px] leading-relaxed max-w-lg">{t('contact.subtitle')}</p>

              {status === 'ok' ? (
                <div className="mt-10 rounded-2xl border border-emerald-200 bg-emerald-50 p-6 flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center shrink-0">
                    <Check size={18} className="text-white" strokeWidth={3} />
                  </div>
                  <div>
                    <div className="font-serif text-lg mb-1">{t('contact.form.success_title')}</div>
                    <div className="text-[14px] text-ink-2/80">{t('contact.form.success')}</div>
                  </div>
                </div>
              ) : (
                <form onSubmit={submit} className="mt-10 space-y-5">
                  {/* honeypot */}
                  <input type="text" name="_honey" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field name="name"    label={t('contact.form.name')}    required />
                    <Field name="email"   label={t('contact.form.email')}   type="email" required />
                  </div>
                  <Field name="subject" label={t('contact.form.subject')} required />
                  <Field name="message" label={t('contact.form.message')} required textarea />

                  <div className="flex flex-wrap items-center gap-4 pt-2">
                    <button
                      type="submit"
                      disabled={status === 'sending'}
                      className="group inline-flex items-center gap-2 bg-ink text-paper font-medium px-6 py-3.5 rounded-full hover:bg-ink-2 transition text-sm disabled:opacity-60"
                    >
                      {status === 'sending' ? t('contact.form.sending') : t('contact.form.send')}
                      <ArrowUpRight size={15} className="group-hover:rotate-45 transition duration-300" />
                    </button>
                    <a href={`mailto:${company.email}`} className="text-sm text-ink-2/70 hover:text-ink transition inline-flex items-center gap-1.5">
                      <Mail size={14} /> {t('contact.direct')} {company.email}
                    </a>
                  </div>

                  {status === 'error' && (
                    <div className="text-sm text-red-600 mt-2">{t('contact.form.error')}</div>
                  )}
                </form>
              )}
            </div>

            {/* Info sidebar */}
            <aside className="lg:mt-[76px]">
              <div className="bg-ink text-paper rounded-3xl p-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-ink-dots opacity-30 pointer-events-none" />
                <div className="relative space-y-6">
                  <InfoRow icon={<Mail size={16} />} label={t('contact.info.email_h')}>
                    <a href={`mailto:${company.email}`} className="hover:underline">{company.email}</a>
                  </InfoRow>
                  <div className="pt-6 border-t border-white/10 font-mono text-[10px] text-white/50 uppercase tracking-widest">
                    {t('contact.hours')}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function Field({
  name, label, type = 'text', required = false, textarea = false,
}: { name: string; label: string; type?: string; required?: boolean; textarea?: boolean }) {
  const shared = "w-full bg-white border border-hair rounded-xl px-4 py-3 text-[15px] text-ink placeholder:text-ink-2/40 focus:outline-none focus:border-ink transition";
  return (
    <label className="block">
      <span className="block font-mono text-[10px] uppercase tracking-widest text-ink-2/60 mb-1.5">{label}{required && ' *'}</span>
      {textarea
        ? <textarea name={name} required={required} rows={6} className={shared} />
        : <input   name={name} required={required} type={type} className={shared} />}
    </label>
  );
}

function InfoRow({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-3">
      <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0">{icon}</div>
      <div>
        <div className="font-mono text-[10px] uppercase tracking-widest text-white/50 mb-0.5">{label}</div>
        <div className="text-[15px] text-paper">{children}</div>
      </div>
    </div>
  );
}
