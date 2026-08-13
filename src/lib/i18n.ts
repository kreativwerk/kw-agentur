export const locales = ["de", "en"] as const;
export type Locale = (typeof locales)[number];

const de = {
  meta: {
    title: "Kreativwerk — Websites, Apps & Softwarelösungen",
    description:
      "Kreativwerk ist die Digitalagentur für Websites, Apps und maßgeschneiderte Software. Erzählen Sie uns von Ihrem Projekt — unser Assistent nimmt Ihre Anfrage direkt auf.",
  },
  nav: {
    services: "Leistungen",
    work: "Referenzen",
    process: "Ablauf",
    contact: "Kontakt",
    cta: "Projekt anfragen",
  },
  hero: {
    line1: "Wir bauen",
    line2: "digitale Produkte.",
    sub: "Websites, Apps und Softwarelösungen — konzipiert, gestaltet und entwickelt in einem Haus.",
    ctaPrimary: "Projekt anfragen",
    ctaSecondary: "Referenzen ansehen",
    clientsLabel: "Umgesetzte Projekte",
  },
  services: {
    heading: "Was wir bauen",
    items: [
      {
        title: "Websites",
        text: "Vom Markenauftritt bis zum Online-Shop: schnelle, wartbare Websites, die gefunden werden und verkaufen.",
        tags: ["Corporate Websites", "Landingpages", "Shops", "SEO", "CMS"],
      },
      {
        title: "Apps",
        text: "Mobile und Web-Apps mit durchdachter UX — vom Prototyp bis in die Stores.",
        tags: ["iOS & Android", "Web-Apps", "Prototyping", "UX/UI"],
      },
      {
        title: "Software",
        text: "Individuelle Lösungen, die Ihre Abläufe abbilden: Portale, Automatisierung, Schnittstellen, KI-Integrationen.",
        tags: ["Portale", "Automatisierung", "APIs", "KI-Integration"],
      },
    ],
  },
  process: {
    heading: "So arbeiten wir",
    steps: [
      {
        title: "Erstgespräch",
        text: "Wir hören zu: Ziele, Zielgruppe, Budgetrahmen. Unverbindlich und kostenlos.",
      },
      {
        title: "Konzept & Design",
        text: "Struktur, Inhalte und Gestaltung — abgestimmt, bevor eine Zeile Code entsteht.",
      },
      {
        title: "Entwicklung",
        text: "Sauber umgesetzt, laufend abgestimmt, auf allen Geräten getestet.",
      },
      {
        title: "Launch & Betreuung",
        text: "Go-live, Einweisung und Weiterentwicklung — wir bleiben ansprechbar.",
      },
    ],
  },
  work: {
    heading: "Referenzen",
    sub: "Eine Auswahl umgesetzter Projekte.",
    visit: "Website ansehen",
    shotPending: "Screenshot folgt",
  },
  about: {
    statement:
      "Kreativwerk ist der digitale Partner für den Mittelstand: eine Agentur, die zuhört, klar plant und selbst entwickelt — ohne Umwege über Dritte.",
  },
  contact: {
    heading: "Lass uns bauen.",
    sub: "Erzählen Sie unserem Assistenten von Ihrem Projekt — er stellt die richtigen Fragen und Ihre Anfrage landet direkt bei uns.",
    cta: "Anfrage starten",
    or: "oder klassisch per E-Mail:",
  },
  footer: {
    imprint: "Impressum",
    privacy: "Datenschutz",
    rights: "Alle Rechte vorbehalten.",
  },
  chat: {
    open: "Projektanfrage starten",
    title: "Projektanfrage",
    subtitle: "Assistent von Kreativwerk",
    greeting:
      "Hallo! Ich helfe Ihnen, Ihre Projektanfrage an Kreativwerk zu stellen. Worum geht es — eine Website, eine App oder eine individuelle Software?",
    placeholder: "Ihre Nachricht …",
    send: "Senden",
    close: "Schließen",
    draftTitle: "Ihre Anfrage",
    submitted:
      "Vielen Dank! Ihre Anfrage ist eingegangen — wir melden uns in der Regel innerhalb eines Werktags.",
    error:
      "Das hat leider nicht geklappt. Bitte versuchen Sie es erneut oder schreiben Sie uns per E-Mail.",
    fields: {
      project_type: "Projektart",
      description: "Beschreibung",
      budget: "Budgetrahmen",
      timeline: "Zeitrahmen",
      name: "Name",
      company: "Firma",
      email: "E-Mail",
      phone: "Telefon",
    },
  },
};

export type Dict = typeof de;

const en: Dict = {
  meta: {
    title: "Kreativwerk — Websites, Apps & Custom Software",
    description:
      "Kreativwerk is a digital agency for websites, apps and custom software. Tell us about your project — our assistant takes your inquiry directly.",
  },
  nav: {
    services: "Services",
    work: "Work",
    process: "Process",
    contact: "Contact",
    cta: "Start a project",
  },
  hero: {
    line1: "We build",
    line2: "digital products.",
    sub: "Websites, apps and custom software — designed, built and shipped under one roof.",
    ctaPrimary: "Start a project",
    ctaSecondary: "See our work",
    clientsLabel: "Delivered projects",
  },
  services: {
    heading: "What we build",
    items: [
      {
        title: "Websites",
        text: "From brand sites to online shops: fast, maintainable websites that get found and convert.",
        tags: ["Corporate websites", "Landing pages", "Shops", "SEO", "CMS"],
      },
      {
        title: "Apps",
        text: "Mobile and web apps with considered UX — from prototype to the app stores.",
        tags: ["iOS & Android", "Web apps", "Prototyping", "UX/UI"],
      },
      {
        title: "Software",
        text: "Custom solutions that fit your workflows: portals, automation, integrations, AI features.",
        tags: ["Portals", "Automation", "APIs", "AI integration"],
      },
    ],
  },
  process: {
    heading: "How we work",
    steps: [
      {
        title: "First call",
        text: "We listen: goals, audience, budget. Free and without obligation.",
      },
      {
        title: "Concept & design",
        text: "Structure, content and design — agreed before a single line of code.",
      },
      {
        title: "Development",
        text: "Built cleanly, reviewed continuously, tested on every device.",
      },
      {
        title: "Launch & support",
        text: "Go-live, onboarding and ongoing development — we stay available.",
      },
    ],
  },
  work: {
    heading: "Selected work",
    sub: "A selection of delivered projects.",
    visit: "Visit website",
    shotPending: "Screenshot coming soon",
  },
  about: {
    statement:
      "Kreativwerk is the digital partner for small and mid-sized businesses: an agency that listens, plans clearly and builds in-house — no middlemen.",
  },
  contact: {
    heading: "Let's build.",
    sub: "Tell our assistant about your project — it asks the right questions and your inquiry lands directly with us.",
    cta: "Start your inquiry",
    or: "or the classic way, via email:",
  },
  footer: {
    imprint: "Imprint",
    privacy: "Privacy",
    rights: "All rights reserved.",
  },
  chat: {
    open: "Start project inquiry",
    title: "Project inquiry",
    subtitle: "Kreativwerk assistant",
    greeting:
      "Hi! I'll help you send your project inquiry to Kreativwerk. What is it about — a website, an app or custom software?",
    placeholder: "Your message …",
    send: "Send",
    close: "Close",
    draftTitle: "Your inquiry",
    submitted:
      "Thank you! Your inquiry has been received — we usually reply within one business day.",
    error:
      "Something went wrong. Please try again or contact us via email.",
    fields: {
      project_type: "Project type",
      description: "Description",
      budget: "Budget",
      timeline: "Timeline",
      name: "Name",
      company: "Company",
      email: "Email",
      phone: "Phone",
    },
  },
};

const dictionaries: Record<Locale, Dict> = { de, en };

export function getDictionary(locale: Locale): Dict {
  return dictionaries[locale] ?? de;
}

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
