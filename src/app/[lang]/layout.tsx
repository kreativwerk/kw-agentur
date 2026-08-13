import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import { notFound } from "next/navigation";
import { getDictionary, isLocale, locales, type Locale } from "@/lib/i18n";
import "../globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

const directionContract = `<!--
THESIS: Der Kategorie-Standard der modernen Digitalagentur, kompromisslos sauber
ausgefuehrt - dunkle Buehne, grosse Typografie, eine Signalfarbe; verweigert wird
nicht die Konvention, sondern ihre halbherzige Ausfuehrung (Stock-Karten, Deko-Glas).
OWN-WORLD: Near-Black #0B0B0C, warmes Off-White #F5F4F0, Signal-Orange #FF4D00;
Archivo als einzige Familie, Display fett mit engem Tracking; Linien 1px,
Flaechen statt Karten; Orange-Sweep als wiederkehrende Geste.
STORY: Besucher versteht in Sekunden: Agentur baut Websites/Apps/Software,
sieht echte Referenzen, startet die Anfrage im Chat-Assistenten.
FIRST VIEWPORT: Fixe Nav (Wortmarke KW, Links, Sprachwechsel, CTA). Zentrierte
zweizeilige Display-Headline mit maskiertem Zeilen-Reveal, Subline, zwei CTAs;
unten Marquee der echten Kundendomains. Primaeraktion: Projekt anfragen oeffnet Chat.
FORM: Kategorie-Standard (Standing Exit), vom Nutzer gewaehlt; Seed b35c1349,
Wurf war Index 3/7 (DIN-Zeichnung), Nutzerwahl schlaegt Wurf.
FINISH: unreviewed and undocumented is unfinished; this build ends with the
finish review, the verdict, and DESIGN.md
-->`;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = getDictionary(isLocale(lang) ? lang : "de");
  return {
    title: dict.meta.title,
    description: dict.meta.description,
    alternates: {
      languages: { de: "/de", en: "/en" },
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return (
    <html lang={lang} className={`${archivo.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <span hidden dangerouslySetInnerHTML={{ __html: directionContract }} />
        {children}
      </body>
    </html>
  );
}
