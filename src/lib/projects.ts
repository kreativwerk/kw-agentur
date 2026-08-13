export type Project = {
  slug: string;
  name: string;
  domain: string;
  url: string;
  category: { de: string; en: string };
  /** Screenshots land in /public/referenzen/<slug>-desktop.png und -mobile.png */
  hasShots?: boolean;
};

export const projects: Project[] = [
  {
    slug: "alotec",
    name: "Alotec GmbH",
    domain: "alotec-gmbh.de",
    url: "https://alotec-gmbh.de",
    category: { de: "Unternehmenswebsite", en: "Corporate website" },
  },
  {
    slug: "edelfrei",
    name: "Edelfrei",
    domain: "edelfrei.com",
    url: "https://edelfrei.com",
    category: { de: "Markenauftritt", en: "Brand website" },
  },
  {
    slug: "kfz-gutachter-erlangen",
    name: "KFZ-Gutachter Erlangen",
    domain: "kfzgutachtererlangen.de",
    url: "https://kfzgutachtererlangen.de",
    category: { de: "KFZ-Sachverständige", en: "Vehicle assessors" },
  },
  {
    slug: "jan-dimov",
    name: "Jan Dimov",
    domain: "jan-dimov.de",
    url: "https://jan-dimov.de",
    category: { de: "Persönliche Website", en: "Personal website" },
  },
  {
    slug: "ziebert-bad",
    name: "Ziebert Bad",
    domain: "ziebert-bad.de",
    url: "https://ziebert-bad.de",
    category: { de: "Bad & Sanitär", en: "Bathrooms & plumbing" },
  },
  {
    slug: "kosovo-personal",
    name: "Kosovo Personal",
    domain: "kosovo-personal.com",
    url: "https://kosovo-personal.com",
    category: { de: "Personalvermittlung", en: "Recruitment" },
  },
  {
    slug: "birner-elektrotechnik",
    name: "Birner Elektrotechnik",
    domain: "birner-elektrotechnik.de",
    url: "https://birner-elektrotechnik.de",
    category: { de: "Elektrotechnik", en: "Electrical engineering" },
  },
  {
    slug: "sw-pv",
    name: "SW Photovoltaik",
    domain: "sw-pv.de",
    url: "https://sw-pv.de",
    category: { de: "Photovoltaik", en: "Solar energy" },
  },
  {
    slug: "elektro-an",
    name: "Elektro AN",
    domain: "elektro-an.de",
    url: "https://elektro-an.de",
    category: { de: "Elektrotechnik", en: "Electrical services" },
  },
  {
    slug: "sum-makler",
    name: "SUM Makler",
    domain: "sum-makler.de",
    url: "https://sum-makler.de",
    category: { de: "Immobilien", en: "Real estate" },
  },
];
