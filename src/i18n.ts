import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

/**
 * NL primary (Belgian horeca), FR mandatory for the Belgian market, EN
 * for international ownership and press. Copy is deliberately Dagontvangst-
 * specific — every mention of shifts, shift-reports, and ShiftEnd was
 * scrubbed out in the C.1 copy purge; the product is about the day, not
 * about who worked which slot.
 */
const resources = {
  nl: {
    translation: {
      brand: 'Dagontvangst',
      hero: {
        title: 'Het digitale dagontvangstenboek voor de Belgische horeca',
        subtitle: 'Wettelijk correct. Onwijzigbaar. Zonder GKS. Werkt offline op elk toestel.',
        cta: 'Start je 14-daagse proefperiode',
        secondary: 'Bekijk de app',
        badges: ['FOD-conform', 'Hash-chain waarborg', 'PWA · werkt offline', 'EU data'],
      },
      problem: {
        title: 'Papieren registers en Excel zijn een tikkende tijdbom',
        points: [
          'Manuele fouten die pas boven water komen bij een FOD-controle.',
          'Excel-bestanden zijn wettelijk niet onwijzigbaar — dat is een probleem.',
          'BTW-splitsing per tarief? Onmogelijk in enkele kolommen.',
          'Bij audits: geen chronologisch bewijs, geen zekerheid, geen slaap.',
        ],
      },
      how: {
        title: 'Zo werkt het',
        steps: [
          { t: '1. Registreer je zaak', d: 'BTW-nummer, KBO, locatie(s). Klaar in 3 minuten.' },
          { t: '2. Sluit elke dag af', d: 'Voer BTW-lijnen, betaalmethoden en kassa-afstemming in. Dagontvangst controleert alles.' },
          { t: '3. Verzegeld en verifieerbaar', d: 'Elke dagafsluiting wordt cryptografisch verzegeld en aan de vorige gelinkt. Manipulatie wordt automatisch gedetecteerd.' },
        ],
      },
      features: {
        title: 'Alles wat een SME horeca nodig heeft',
        items: [
          { icon: 'shield', t: 'FOD-conforme uitsplitsing', d: 'BTW per tarief (0/6/12/21%), cash/kaart/cheques, kassa-afstemming — precies wat de wet vraagt.' },
          { icon: 'link', t: 'Hash-chain onwijzigbaarheid', d: 'Elke dagafsluiting bevat de SHA-256 hash van de vorige. Wijziging = onmiddellijk detecteerbaar.' },
          { icon: 'wifi-off', t: 'Offline via PWA', d: 'Registreer je dag zonder internet. Alles synchroniseert automatisch zodra je weer online bent.' },
          { icon: 'building', t: 'Meerdere vestigingen', d: 'Één account, meerdere zaken. Elke vestiging heeft zijn eigen verzegelde reeks.' },
          { icon: 'download', t: 'Inspecteurs-export', d: 'Eén klik: JSON-bundel + PDF + hash-manifest. Klaar voor de FOD.' },
          { icon: 'message', t: 'WhatsApp-goedkeuring', d: 'Managers keuren dagafsluitingen goed vanaf hun telefoon. Weerhoudingsloos.' },
        ],
      },
      compliance: {
        title: 'De FOD-Financiën uitleg',
        intro: 'Elke Belgische horecazaak zonder geregistreerd kassasysteem moet een dagontvangstenboek bijhouden. Dagontvangst voldoet aan elk criterium:',
        checks: [
          'Chronologische registratie zonder gaten (opeenvolgend genummerd per boekjaar).',
          'Onwijzigbaar na afsluiting — correcties zijn append-only entries.',
          'Volledige BTW-uitsplitsing per tarief.',
          'Kassa-afstemming (openings-, sluitingskas, kasafnames).',
          '7 jaar bewaarplicht — automatisch beheerd.',
          'Downloadbare exports in FOD-vriendelijk formaat.',
        ],
        note: 'De cryptografische hash-chain gaat vér boven wat de wet strikt vereist. Als een inspecteur je boek opvraagt, kan je bewijzen dat er niets is aangepast sinds het werd verzegeld.',
      },
      testimonials: {
        title: 'Wat horeca-uitbaters ervan vinden',
        items: [
          { name: 'Sofie D.', role: 'Café Central, Gent', quote: 'Voor het eerst voel ik me rustig bij een FOD-controle. De ketting bewijst alles.' },
          { name: 'Karim B.', role: 'Bistro Marolles, Brussel', quote: 'De setup duurde 4 minuten. Sindsdien: elke dag 90 seconden om af te sluiten. Klaar.' },
          { name: 'Elke V.',  role: 'Frituur \'t Pleintje, Antwerpen', quote: 'De offline modus is een gamechanger. Wifi valt uit? Ik registreer gewoon door.' },
        ],
      },
      pricing: {
        title: '€9 per maand. Per zaak.',
        subtitle: '14 dagen gratis. Zeg op wanneer je wil. Geen setup-kosten.',
        includes: [
          'Onbeperkt aantal dagafsluitingen',
          'Onbeperkt aantal gebruikers',
          'PWA offline modus',
          'PDF/CSV/JSON export',
          'FOD-inspecteur toegang (read-only)',
          'WhatsApp-notificaties',
        ],
        cta: 'Start je proefperiode',
      },
      faq: {
        title: 'Veelgestelde vragen',
        items: [
          {
            q: 'Ben ik als horeca-uitbater verplicht een dagontvangstenboek bij te houden?',
            a: 'Ja — elke horecazaak zonder GKS (geregistreerd kassasysteem) is verplicht dagontvangsten te registreren volgens de FOD-Financiën regels.',
          },
          {
            q: 'Wat gebeurt er bij een FOD-controle?',
            a: 'Je maakt in één klik een geverifieerde export (JSON + PDF + hash-manifest). De inspecteur kan de integriteit onafhankelijk verifiëren.',
          },
          {
            q: 'Wat als ik een fout ontdek na afsluiting?',
            a: 'Correcties gebeuren via append-only correctie-entries die naar het origineel verwijzen. Het origineel blijft onaangeroerd — dat is precies wat een auditor wil zien.',
          },
          {
            q: 'Werkt het echt offline?',
            a: 'Ja. Als PWA installeer je Dagontvangst als een echte app. Je kan de hele dag registreren zonder internet; alles synchroniseert automatisch zodra er verbinding is. De verzegeling zelf moet online gebeuren (om het volgnummer atomair toe te wijzen).',
          },
          {
            q: 'Kan ik meerdere zaken beheren met één account?',
            a: 'Ja. Elke vestiging heeft zijn eigen verzegelde ketting; je overzicht bundelt alles onder je juridische entiteit.',
          },
          {
            q: 'Wat kost het?',
            a: '€9 per maand per zaak. 14 dagen gratis proefperiode, geen kaart nodig, opzeggen wanneer je wil. Historische data blijft altijd downloadbaar — ook na opzegging (wettelijke 7-jaar bewaarplicht).',
          },
        ],
      },
      cta: {
        title: 'Slaap deze week nog rustiger.',
        subtitle: 'Registreer nu en probeer Dagontvangst 14 dagen gratis.',
        button: 'Start je proefperiode',
      },
      footer: {
        madeIn: 'Gemaakt in België voor de Belgische horeca',
        contact: 'Contact',
        privacy: 'Privacybeleid',
        terms: 'Algemene voorwaarden',
      },
    },
  },

  fr: {
    translation: {
      brand: 'Dagontvangst',
      hero: {
        title: 'Le journal quotidien des recettes numérique pour l\'horeca belge',
        subtitle: 'Conforme à la loi. Immuable. Sans SCE. Fonctionne hors ligne.',
        cta: 'Commencez votre essai de 14 jours',
        secondary: 'Voir l\'app',
        badges: ['Conforme SPF', 'Chaîne de hachage', 'PWA · hors ligne', 'Données UE'],
      },
      problem: {
        title: 'Les registres papier et Excel sont une bombe à retardement',
        points: [
          'Erreurs manuelles qui n\'apparaissent qu\'au moment d\'un contrôle SPF.',
          'Excel n\'est légalement pas immuable — un vrai problème.',
          'Ventilation TVA par taux ? Impossible en quelques colonnes.',
          'Lors d\'audits : pas de preuve chronologique, pas de sérénité.',
        ],
      },
      how: {
        title: 'Comment ça marche',
        steps: [
          { t: '1. Enregistrez votre établissement', d: 'Numéro TVA, BCE, adresse. Prêt en 3 minutes.' },
          { t: '2. Clôturez chaque journée', d: 'Saisissez les lignes TVA, les paiements et le rapprochement caisse. Dagontvangst vérifie tout.' },
          { t: '3. Scellé et vérifiable', d: 'Chaque clôture est scellée cryptographiquement et liée à la précédente. Toute manipulation est détectée automatiquement.' },
        ],
      },
      features: {
        title: 'Tout ce dont une PME horeca a besoin',
        items: [
          { icon: 'shield', t: 'Ventilation TVA conforme', d: 'TVA par taux (0/6/12/21%), espèces/carte/chèques, rapprochement caisse — exactement ce que la loi exige.' },
          { icon: 'link', t: 'Chaîne de hachage immuable', d: 'Chaque clôture contient le SHA-256 de la précédente. Toute modification est immédiatement détectable.' },
          { icon: 'wifi-off', t: 'Hors ligne via PWA', d: 'Enregistrez votre journée sans internet. Tout se synchronise automatiquement à la reconnexion.' },
          { icon: 'building', t: 'Établissements multiples', d: 'Un compte, plusieurs sites. Chaque site a sa propre séquence scellée.' },
          { icon: 'download', t: 'Export inspecteur', d: 'En un clic : JSON + PDF + manifeste de hachage. Prêt pour le SPF.' },
          { icon: 'message', t: 'Approbation par WhatsApp', d: 'Les managers approuvent les clôtures depuis leur téléphone. Sans friction.' },
        ],
      },
      compliance: {
        title: 'Ce que dit le SPF Finances',
        intro: 'Chaque établissement horeca belge sans caisse enregistrée doit tenir un journal des recettes journalières. Dagontvangst satisfait chaque critère :',
        checks: [
          'Enregistrement chronologique sans lacune (numérotation séquentielle par exercice).',
          'Immuable après clôture — les corrections sont des entrées additionnelles.',
          'Ventilation TVA complète par taux.',
          'Rapprochement de caisse (ouverture, fermeture, prélèvements).',
          'Conservation de 7 ans — gérée automatiquement.',
          'Exports téléchargeables en format SPF.',
        ],
        note: 'La chaîne de hachage cryptographique dépasse largement ce que la loi exige. Face à un inspecteur, vous pouvez prouver que rien n\'a été modifié depuis la clôture.',
      },
      testimonials: {
        title: 'Ce qu\'en pensent les exploitants',
        items: [
          { name: 'Sofie D.', role: 'Café Central, Gand', quote: 'Pour la première fois, je suis serein face à un contrôle SPF. La chaîne prouve tout.' },
          { name: 'Karim B.', role: 'Bistro Marolles, Bruxelles', quote: 'L\'installation a pris 4 minutes. Ensuite : 90 secondes par jour pour clôturer. Terminé.' },
          { name: 'Elke V.',  role: 'Frituur \'t Pleintje, Anvers', quote: 'Le mode hors ligne change la donne. Le wifi tombe ? Je continue à enregistrer.' },
        ],
      },
      pricing: {
        title: '€9 par mois. Par établissement.',
        subtitle: '14 jours gratuits. Résiliez quand vous voulez. Sans frais d\'installation.',
        includes: [
          'Clôtures journalières illimitées',
          'Utilisateurs illimités',
          'Mode PWA hors ligne',
          'Export PDF/CSV/JSON',
          'Accès inspecteur SPF (lecture seule)',
          'Notifications WhatsApp',
        ],
        cta: 'Démarrer l\'essai',
      },
      faq: {
        title: 'Questions fréquentes',
        items: [
          {
            q: 'Suis-je obligé, en tant qu\'exploitant horeca, de tenir un journal des recettes ?',
            a: 'Oui — tout établissement horeca sans SCE (système de caisse enregistrée) doit enregistrer les recettes quotidiennement conformément aux règles du SPF Finances.',
          },
          {
            q: 'Que se passe-t-il lors d\'un contrôle SPF ?',
            a: 'Vous générez en un clic un export vérifié (JSON + PDF + manifeste de hachage). L\'inspecteur peut vérifier l\'intégrité de façon indépendante.',
          },
          {
            q: 'Et si je trouve une erreur après clôture ?',
            a: 'Les corrections se font par entrées additionnelles pointant vers l\'original. L\'original reste intact — c\'est exactement ce qu\'un auditeur veut voir.',
          },
          {
            q: 'Ça marche vraiment hors ligne ?',
            a: 'Oui. En tant que PWA, installez Dagontvangst comme une vraie app. Vous pouvez enregistrer toute la journée sans internet ; tout se synchronise à la reconnexion. La clôture elle-même doit se faire en ligne (pour attribuer le numéro d\'ordre de manière atomique).',
          },
          {
            q: 'Puis-je gérer plusieurs établissements avec un compte ?',
            a: 'Oui. Chaque site a sa propre chaîne scellée ; votre vue globale regroupe tout sous votre entité juridique.',
          },
          {
            q: 'Combien ça coûte ?',
            a: '€9 par mois par établissement. 14 jours gratuits, sans carte, résiliez à tout moment. Les données historiques restent toujours téléchargeables — même après résiliation (obligation légale de 7 ans).',
          },
        ],
      },
      cta: {
        title: 'Dormez plus tranquille dès cette semaine.',
        subtitle: 'Inscrivez-vous et essayez Dagontvangst pendant 14 jours gratuits.',
        button: 'Démarrer l\'essai',
      },
      footer: {
        madeIn: 'Fait en Belgique pour l\'horeca belge',
        contact: 'Contact',
        privacy: 'Politique de confidentialité',
        terms: 'Conditions générales',
      },
    },
  },

  en: {
    translation: {
      brand: 'Dagontvangst',
      hero: {
        title: 'The digital daily receipts book for Belgian hospitality',
        subtitle: 'Legally compliant. Immutable. Without a certified cash register. Works offline.',
        cta: 'Start your 14-day free trial',
        secondary: 'See the app',
        badges: ['FOD-compliant', 'Hash-chain evidence', 'PWA · works offline', 'EU data'],
      },
      problem: {
        title: 'Paper logs and Excel are a ticking time bomb',
        points: [
          'Manual errors surface only during an FOD inspection.',
          'Excel is not legally immutable — that\'s a problem.',
          'VAT breakdown per rate? Impossible in a few columns.',
          'At audit time: no chronological proof, no sleep, no peace.',
        ],
      },
      how: {
        title: 'How it works',
        steps: [
          { t: '1. Register your business', d: 'VAT number, KBO, location(s). Ready in 3 minutes.' },
          { t: '2. Close each day', d: 'Enter VAT lines, payment methods, and cash reconciliation. Dagontvangst validates everything.' },
          { t: '3. Sealed and verifiable', d: 'Every closure is cryptographically sealed and linked to the previous one. Tampering is detected automatically.' },
        ],
      },
      features: {
        title: 'Everything a horeca SME needs',
        items: [
          { icon: 'shield', t: 'FOD-compliant breakdown', d: 'VAT per rate (0/6/12/21%), cash/card/vouchers, cash reconciliation — exactly what the law requires.' },
          { icon: 'link', t: 'Hash-chain immutability', d: 'Every closure contains the SHA-256 hash of the previous one. Any modification is immediately detectable.' },
          { icon: 'wifi-off', t: 'Offline via PWA', d: 'Record your day without internet. Everything syncs automatically once you\'re back online.' },
          { icon: 'building', t: 'Multiple locations', d: 'One account, multiple sites. Each site has its own sealed sequence.' },
          { icon: 'download', t: 'Inspector export', d: 'One click: JSON bundle + PDF + hash manifest. Ready for the FOD.' },
          { icon: 'message', t: 'WhatsApp approvals', d: 'Managers approve closures from their phone. No friction.' },
        ],
      },
      compliance: {
        title: 'What the FOD requires',
        intro: 'Every Belgian horeca establishment without a certified cash register must keep a daily receipts book. Dagontvangst meets every criterion:',
        checks: [
          'Chronological registration with no gaps (sequentially numbered per fiscal year).',
          'Immutable after closure — corrections are append-only entries.',
          'Full VAT breakdown per rate.',
          'Cash reconciliation (opening, closing, drops).',
          '7-year retention — managed automatically.',
          'Downloadable exports in FOD-friendly format.',
        ],
        note: 'The cryptographic hash chain goes well beyond what the law strictly requires. When an inspector asks for your book, you can prove nothing has been modified since it was sealed.',
      },
      testimonials: {
        title: 'What operators say',
        items: [
          { name: 'Sofie D.', role: 'Café Central, Ghent', quote: 'For the first time I feel calm during an FOD inspection. The chain proves everything.' },
          { name: 'Karim B.', role: 'Bistro Marolles, Brussels', quote: 'Setup took 4 minutes. Since then: 90 seconds a day to close. Done.' },
          { name: 'Elke V.',  role: 'Frituur \'t Pleintje, Antwerp', quote: 'Offline mode is a game changer. Wifi drops? I just keep recording.' },
        ],
      },
      pricing: {
        title: '€9 per month. Per business.',
        subtitle: '14 days free. Cancel whenever. No setup fees.',
        includes: [
          'Unlimited daily closures',
          'Unlimited users',
          'PWA offline mode',
          'PDF/CSV/JSON export',
          'FOD-inspector access (read-only)',
          'WhatsApp notifications',
        ],
        cta: 'Start trial',
      },
      faq: {
        title: 'Frequently asked questions',
        items: [
          {
            q: 'As a horeca operator, am I required to keep a daily receipts book?',
            a: 'Yes — every horeca establishment without a certified cash register (GKS) must record daily receipts under FOD Finance rules.',
          },
          {
            q: 'What happens during an FOD inspection?',
            a: 'You generate a verified export in one click (JSON + PDF + hash manifest). The inspector can verify integrity independently.',
          },
          {
            q: 'What if I find a mistake after closing?',
            a: 'Corrections happen via append-only entries pointing at the original. The original stays untouched — exactly what an auditor wants to see.',
          },
          {
            q: 'Does it really work offline?',
            a: 'Yes. Install Dagontvangst as a PWA — a real app. You can record all day without internet; everything syncs when you\'re back online. The sealing itself must happen online (to atomically assign the sequence number).',
          },
          {
            q: 'Can I manage multiple businesses on one account?',
            a: 'Yes. Each location has its own sealed chain; your overview rolls up under your legal entity.',
          },
          {
            q: 'How much does it cost?',
            a: '€9 per month per business. 14 days free, no card required, cancel anytime. Historical data stays downloadable forever — even after cancellation (legally required 7-year retention).',
          },
        ],
      },
      cta: {
        title: 'Sleep easier starting this week.',
        subtitle: 'Sign up and try Dagontvangst free for 14 days.',
        button: 'Start your trial',
      },
      footer: {
        madeIn: 'Made in Belgium for Belgian hospitality',
        contact: 'Contact',
        privacy: 'Privacy policy',
        terms: 'Terms of service',
      },
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'nl',
    supportedLngs: ['nl', 'fr', 'en'],
    interpolation: { escapeValue: false },
    returnObjects: true,
  });

export default i18n;
