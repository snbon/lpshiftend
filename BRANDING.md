# Dagontvangst — UI Branding & TODO

Design language for the marketing site (v2, editorial "ledger + receipt" aesthetic).
Not the product app. Trilingual: **nl** (primary) / **fr** / **en**.

---

## Identity

The site should feel like a **paper accounting ledger**, not a generic SaaS template.
Two ideas carry the whole brand:

1. **Receipts and stamps.** Thermal-paper receipt in the hero, wax-seal SVG that rotates in on scroll, monospace hash lines, live-scrolling ticker of sealed closures.
2. **Editorial typography.** Serif display headings with italic accents; monospace for anything technical (hashes, sequence numbers, timestamps, chip labels); Inter for body.

If a new section doesn't fit those two ideas, it probably doesn't belong.

---

## Palette

Defined as CSS variables in `src/index.css` and exposed via Tailwind utilities in
`src/index.css` `@layer utilities` (kept out of `tailwind.config.ts` on purpose —
see the "gotcha" below).

| Token         | Value      | Usage                                              |
| ------------- | ---------- | -------------------------------------------------- |
| `--paper`     | `#faf7f2`  | Page background, light buttons on dark sections    |
| `--ink`       | `#0e0e10`  | Text, dark buttons, dark section backgrounds       |
| `--ink-2`     | `#2a2a2e`  | Secondary text, button hover                       |
| `--seal`      | `#b91c1c`  | Wax-seal red — used **only** on stamp SVGs         |
| `--hair`      | `rgba(14,14,16,0.08)` | 1px borders and dividers                |

Accent-only colors: `emerald-500` for "sealed / OK" statuses, `red-400/500` for
"problem / broken" indicators. Everything else is paper/ink.

**Do not add new brand colors** without a reason. The palette is intentionally
tiny — that's what makes the site feel considered.

### Gotcha: `text-paper` needs its utility class

`bg-paper`, `text-paper`, `text-ink`, `text-ink-2`, `bg-ink`, `bg-ink-2`, plus
`hover:bg-ink-2` and `hover:bg-paper` are hand-declared in `src/index.css`
because they are **not** in `tailwind.config.ts`. If you add a new dark section
and forget `text-paper`, text will fall back to inherited `text-ink` and you
get ink-on-ink blackout. When in doubt: always pair `bg-ink` with `text-paper`,
`bg-paper` with `text-ink`.

---

## Typography

Loaded from Google Fonts in `index.html`:

- **Fraunces** — serif display. Headings, italic accent lines, quote marks,
  seal center text, avatar initials. Use variable optical sizing (`font-serif`
  class already has `font-optical-sizing: auto`).
- **JetBrains Mono** — anything the *product* would output: hashes, sequence
  numbers, timestamps, chip labels, receipt bodies, form field labels.
- **Inter** — everything else (body copy, buttons, nav).

Heading sizing follows a fixed responsive ramp — check existing sections before
inventing a new size. Long Dutch/French compound words need
`break-words hyphens-auto` and `lang={i18n.language}` on the `<h1>` so browser
hyphenation kicks in on mobile.

---

## Motifs (reusable set pieces)

Each already lives in `src/App.tsx` or `src/pages/`. Reuse before rebuilding.

- **`Receipt`** — thermal-paper card with jagged edge, dashed dividers, hash
  footer. Use for anything that visualises a single closure.
- **`Seal`** — animated SVG wax stamp. Trilingual by design
  (`VERZEGELD · SEALED · SCELLÉ`). One seal per screen max.
- **`Ticker`** — infinite-scroll marquee of live receipts. Only for the landing
  page below the hero — don't reuse elsewhere.
- **`ChainViz`** — vertical hash chain of 3 blocks. Belongs on dark backgrounds.
- **`StepMock`** — small in-card mockups (form, VAT table, sealed hash). Keep
  proportions consistent when adding new steps.
- **`.chip` / `.chip-dark`** — the mono-font pill used above every section
  heading (`§ 03 · Contact`, etc.). Use section-numbered chips (`01`, `02`, …)
  on the landing; use `§ 01 · …` on legal/contact pages.

Decorative textures (`.bg-paper-dots`, `.bg-ink-dots`, `.grain`, `.squiggle`)
are already available — prefer these over inventing new patterns.

---

## Structure

```
src/
├─ App.tsx                    router shell + <Landing />
├─ i18n/{nl,fr,en}.json       every user-facing string, keyed the same in all three
├─ components/
│  ├─ Header.tsx              fixed nav, scroll-aware background
│  ├─ Footer.tsx              shared across all pages
│  └─ LangSwitcher.tsx        nl / fr / en
├─ pages/
│  ├─ Legal.tsx               renders privacy OR terms via `kind` prop
│  └─ Contact.tsx             FormSubmit AJAX form
└─ lib/router.tsx             pathname-based useRoute + <Link> + navigate()
```

Routes are pathname-based (Netlify SPA fallback in `netlify.toml`):

| Path                                       | Renders                    |
| ------------------------------------------ | -------------------------- |
| `/`                                        | `<Landing />`              |
| `/privacy`                                 | `<LegalPage kind="privacy" />` |
| `/voorwaarden` · `/terms` · `/conditions`  | `<LegalPage kind="terms" />`   |
| `/contact`                                 | `<ContactPage />`          |

---

## i18n rules

- Every user-facing string lives in `src/i18n/{nl,fr,en}.json` under a
  matching key path. Never hardcode Dutch (or any language) into a component.
- Arrays are read via `t('...', { returnObjects: true })` — cast the return
  type inline for TS.
- When you add a key to one language, add it to all three in the same commit.
- The seal SVG is intentionally trilingual on one asset
  (`VERZEGELD · SEALED · SCELLÉ`) — leave it that way.

---

## TODO

Roughly in order of importance.

### Legal & company info (required before public launch)

- [ ] **Register the BV / SRL** and get real KBO/BCE, VAT (`BE0…`), RPR/RPM
      district, and registered address.
- [ ] Fill in `legal.company.{name, vat, kbo, rpr, address, email}` in all
      three JSON files. The keys already exist but only `name` and `email`
      currently render — see `src/pages/Legal.tsx` identity card and
      `src/pages/Contact.tsx` info sidebar to un-hide the extra rows.
- [ ] Put the full "Data controller" address + VAT back into the first
      section body of `legal.privacy.sections[0]` (currently stripped to
      just the company name — restore once the entity is registered).
- [ ] Put `KBO xxxx.xxx.xxx` back into `legal.terms.sections[0]`
      ("Definitions") once known.
- [ ] Have a Belgian lawyer or accountant review the ToS and Privacy Policy
      before going live. The current copy is a reasonable GDPR/Belgian-tax
      starting point, not vetted legal text.
- [ ] Set the correct `last_updated` date in `src/pages/Legal.tsx` (currently
      hardcoded `2026-01-15`). Consider moving to a build-time constant.

### Re-enable CTAs at launch (currently disabled — "Live in August")

All primary CTAs are intentionally disabled buttons showing **"Live in August"**
with a blinking green dot, since the product app isn't public yet. To re-enable:

- [ ] Restore `const APP_URL = (import.meta.env.VITE_APP_URL as string) ?? 'https://app.dagontvangst.be';`
      at the top of `src/App.tsx` (removed while disabled to avoid an unused-var
      lint error).
- [ ] In `src/App.tsx` — swap the three `<button disabled>` "Live in August"
      elements back to `<a href={`${APP_URL}/register`}>` with the original
      classes (`bg-ink text-paper … hover:bg-ink-2`, `bg-paper text-ink … hover:bg-white`,
      and the CTA-section variant). The i18n key for the label is
      `landing.hero.cta_primary` / `landing.pricing.cta` / `landing.cta.button`.
- [ ] In `src/components/Header.tsx` — restore the desktop and mobile
      "Sign in" links (`<a href={APP_URL}>{t('landing.header.sign_in')}</a>`)
      and swap the disabled desktop pill + mobile drawer button back to the
      original `<a href={`${APP_URL}/register`}>{t('landing.header.try_free')}</a>`
      with `ArrowUpRight` icon.
- [ ] The `landing.header.live_soon` i18n keys (nl/fr/en) can stay — useful for
      any future "coming soon" banner. Or delete if you want.
- [ ] Remove the "APP_URL removed while CTAs are disabled" comment in
      `src/App.tsx`.

### Contact form

- [ ] **Activate FormSubmit** — send yourself any test submission from
      `/contact`; FormSubmit will email `sweaniznoubagh@gmail.com` a one-time
      activation link. Click it once — future submissions go through silently.
- [ ] After activation, swap the raw email in `FORM_ENDPOINT`
      (`src/pages/Contact.tsx`) for the random hashed alias FormSubmit gives
      you back. Prevents scrapers from harvesting the address out of the JS
      bundle.
- [ ] When there's a real support inbox (`info@dagontvangst.be`, etc.),
      re-point the endpoint to that address and update
      `legal.company.email` in all three JSON files.
- [ ] Consider adding a simple honeypot alternative (Cloudflare Turnstile) if
      spam becomes a problem — current setup only has a hidden `_honey` field.

### UI / polish

- [ ] Real favicon + Apple touch icon (currently `/favicon.svg` placeholder).
- [ ] Open Graph / Twitter card meta tags — need a proper OG image
      (1200×630, feature the receipt + seal).
- [ ] Cookie banner: only needed if you ever add third-party analytics.
      Current setup is essential-cookies-only, so legally we can skip it —
      but confirm before adding Plausible/GA/etc.
- [ ] Sitemap.xml + robots.txt.
- [ ] Test with a real screen reader — the seal is `aria-hidden`? (currently
      no — the SVG has no `role="presentation"`; add one).

### Content / marketing

- [ ] Replace the three placeholder testimonials in
      `landing.testimonials.items` with real quotes + real names + real
      businesses (with permission).
- [ ] Consider a `/blog` or `/changelog` route — the router is trivial to
      extend, add another `if (path.startsWith('/blog'))` branch in `App.tsx`.
- [ ] `landing.hero.quote` currently hardcodes "Sofie D., Gent" — same as
      testimonial 1. Either drop the hero quote or swap it for a distinct one.

### Tech debt

- [ ] Extract `Receipt`, `Seal`, `Ticker`, `ChainViz`, `StepMock` and `FaqItem`
      from `App.tsx` into `src/components/` — the file is ~600 lines and
      several of these could be reused on other pages.
- [ ] Move the hand-rolled color utilities out of `src/index.css` and into
      `tailwind.config.ts` `theme.extend.colors` **only when** you're sure
      no other custom class relies on the `--ink` / `--paper` CSS variables.
      (Attempted once — see git history — and the darker sections
      temporarily broke because dependent CSS still referenced the vars.
      Do it carefully in one commit.)
- [ ] Add a basic Playwright or Cypress smoke test hitting `/`, `/privacy`,
      `/voorwaarden`, `/contact` before every deploy.
