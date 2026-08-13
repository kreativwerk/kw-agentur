import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary, isLocale } from "@/lib/i18n";

export default async function ImpressumPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDictionary(lang);

  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-5 py-28 sm:px-8">
      <h1 className="display text-4xl">{dict.footer.imprint}</h1>
      {/* PLATZHALTER: echte Angaben (Inhaber, Anschrift, USt-IdNr.) müssen vom
          Betreiber ergänzt werden, bevor die Seite live geht. */}
      <div className="mt-8 space-y-4 text-muted">
        <p className="rounded-lg border border-accent/40 bg-accent-soft p-4 text-sm text-foreground">
          {lang === "de"
            ? "Platzhalter — die Impressumsangaben (Name, Anschrift, Kontakt, USt-IdNr.) werden vor dem Livegang ergänzt."
            : "Placeholder — the legal notice details (name, address, contact, VAT ID) will be added before launch."}
        </p>
        <p>Kreativwerk · kw-agentur.de</p>
      </div>
      <Link href={`/${lang}`} className="mt-10 inline-block text-accent font-semibold">
        ← {lang === "de" ? "Zurück zur Startseite" : "Back to home"}
      </Link>
    </main>
  );
}
