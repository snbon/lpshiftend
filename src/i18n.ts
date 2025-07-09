import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  nl: {
    translation: {
      hero: {
        title: "ShiftEnd: Het digitale dagontvangstenboek",
        subtitle: "Wettelijk correct. Supersimpel. Zonder GKS.",
        cta: "Start gratis proefperiode",
        legalBadge: "Wettelijk goedgekeurd voor Belgische horeca",
        demo: "Bekijk demo",
        trust: {
          encryption: "256-bit encryptie",
          eu: "EU-gebaseerd",
          fod: "FOD-compliant"
        }
      },
      problem: {
        title: "Problemen met papieren logs en Excel",
        subtitle: "Stop met handmatige administratie en juridische risico's",
        issues: [
          "Handmatig werk en tijdrovende administratie",
          "Juridische risico's door fouten",
          "Verwarring over wettelijke vereisten",
          "Moeilijke controle en audit"
        ]
      },
      features: {
        title: "Waarom ShiftEnd?",
        subtitle: "Alles wat u nodig heeft voor wettelijke compliance",
        items: [
          "Dagelijkse input: cash, bank, maaltijdcheques, ecocheques, etc.",
          "Voeg vrije notities toe (btw, correcties, opmerking)",
          "Onveranderbare registratie (1x bewaren = permanent)",
          "PDF en CSV export",
          "Automatische tijdstempels",
          "7 jaar veilige cloud-bewaring via Supabase",
          "Meerdere gebruikers en locaties",
          "Werkt op mobiel, tablet en desktop"
        ]
      },
      legal: {
        title: "Wettelijke Compliance",
        subtitle: "Volledig compliant met Belgische wetgeving",
        requirements: [
          "Dagontvangstenboek verplicht voor niet-GKS horeca",
          "Niet wijzigbaar na bewaren",
          "Chronologisch, getimestamped logs",
          "Opslag in EU (via Supabase)",
          "Downloadbare versies voor boekhouder of FOD"
        ]
      },
      pricing: {
        title: "Prijzen",
        subtitle: "Eenvoudige prijzen, geen verrassingen",
        price: "€9/maand",
        description: "Geen setup, 40% winstmarge ingebouwd",
        details: "Geen setup • Geen verborgen kosten • 30 dagen gratis proefperiode",
        tooltip: "Prijzenlogica: €9/maand voor wettelijke compliance zonder gedoe"
      },
      validation: {
        title: "Validatie in aanvraag bij FOD Financiën",
        description: "ShiftEnd voldoet aan alle wettelijke vereisten"
      },
      cta: {
        title: "Vraag gratis toegang aan",
        subtitle: "Begin vandaag nog met wettelijke compliance",
        button: "Aanvragen"
      },
      footer: {
        madeIn: "Gemaakt in België voor Belgische horeca",
        contact: "Contact",
        privacy: "Privacybeleid"
      }
    }
  },
  en: {
    translation: {
      hero: {
        title: "ShiftEnd: The Digital Daily Revenue Log",
        subtitle: "Legally compliant. Super simple. Without GKS.",
        cta: "Start free trial",
        legalBadge: "Legally approved for Belgian horeca",
        demo: "View demo",
        trust: {
          encryption: "256-bit encryption",
          eu: "EU-based",
          fod: "FOD-compliant"
        }
      },
      problem: {
        title: "Problems with paper logs and Excel",
        subtitle: "Stop manual administration and legal risks",
        issues: [
          "Manual work and time-consuming administration",
          "Legal risks due to errors",
          "Confusion about legal requirements",
          "Difficult control and audit"
        ]
      },
      features: {
        title: "Why ShiftEnd?",
        subtitle: "Everything you need for legal compliance",
        items: [
          "Daily input: cash, bank, meal vouchers, eco vouchers, etc.",
          "Add free notes (VAT, corrections, remarks)",
          "Immutable registration (1x save = permanent)",
          "PDF and CSV export",
          "Automatic timestamps",
          "7 years secure cloud storage via Supabase",
          "Multiple users and locations",
          "Works on mobile, tablet and desktop"
        ]
      },
      legal: {
        title: "Legal Compliance",
        subtitle: "Fully compliant with Belgian law",
        requirements: [
          "Daily revenue log required for non-GKS hospitality",
          "Not changeable after saving",
          "Chronological, timestamped logs",
          "Storage in EU (via Supabase)",
          "Downloadable versions for accountant or FOD"
        ]
      },
      pricing: {
        title: "Pricing",
        subtitle: "Simple pricing, no surprises",
        price: "€9/month",
        description: "No setup, 40% profit margin built-in",
        details: "No setup • No hidden fees • 30 days free trial",
        tooltip: "Pricing logic: €9/month for legal compliance without hassle"
      },
      validation: {
        title: "Validation in application at FOD Finance",
        description: "ShiftEnd meets all legal requirements"
      },
      cta: {
        title: "Request free access",
        subtitle: "Start your legal compliance today",
        button: "Request"
      },
      footer: {
        madeIn: "Made in Belgium for Belgian hospitality",
        contact: "Contact",
        privacy: "Privacy Policy"
      }
    }
  },
  fr: {
    translation: {
      hero: {
        title: "ShiftEnd: Le registre quotidien des recettes numérique",
        subtitle: "Conforme à la loi. Super simple. Sans GKS.",
        cta: "Commencer l'essai gratuit",
        legalBadge: "Approuvé légalement pour l'horeca belge",
        demo: "Voir la démo",
        trust: {
          encryption: "Chiffrement 256 bits",
          eu: "Basé dans l'UE",
          fod: "Conforme SPF"
        }
      },
      problem: {
        title: "Problèmes avec les registres papier et Excel",
        subtitle: "Arrêtez l'administration manuelle et les risques juridiques",
        issues: [
          "Travail manuel et administration chronophage",
          "Risques juridiques dus aux erreurs",
          "Confusion sur les exigences légales",
          "Contrôle et audit difficiles"
        ]
      },
      features: {
        title: "Pourquoi ShiftEnd?",
        subtitle: "Tout ce dont vous avez besoin pour la conformité légale",
        items: [
          "Saisie quotidienne: espèces, banque, tickets repas, éco-chèques, etc.",
          "Ajoutez des notes libres (TVA, corrections, remarques)",
          "Enregistrement immuable (1x sauvegarde = permanent)",
          "Export PDF et CSV",
          "Horodatage automatique",
          "7 ans de stockage cloud sécurisé via Supabase",
          "Utilisateurs et emplacements multiples",
          "Fonctionne sur mobile, tablette et desktop"
        ]
      },
      legal: {
        title: "Conformité Légale",
        subtitle: "Entièrement conforme à la législation belge",
        requirements: [
          "Registre quotidien des recettes obligatoire pour l'horeca non-GKS",
          "Non modifiable après sauvegarde",
          "Logs chronologiques et horodatés",
          "Stockage dans l'UE (via Supabase)",
          "Versions téléchargeables pour comptable ou SPF"
        ]
      },
      pricing: {
        title: "Tarification",
        subtitle: "Tarification simple, pas de surprises",
        price: "€9/mois",
        description: "Pas de configuration, 40% de marge bénéficiaire intégrée",
        details: "Pas de configuration • Pas de frais cachés • 30 jours d'essai gratuit",
        tooltip: "Logique de tarification: €9/mois pour la conformité légale sans tracas"
      },
      validation: {
        title: "Validation en demande au SPF Finances",
        description: "ShiftEnd répond à toutes les exigences légales"
      },
      cta: {
        title: "Demander l'accès gratuit",
        subtitle: "Commencez votre conformité légale aujourd'hui",
        button: "Demander"
      },
      footer: {
        madeIn: "Fabriqué en Belgique pour l'horeca belge",
        contact: "Contact",
        privacy: "Politique de confidentialité"
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'nl',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n; 