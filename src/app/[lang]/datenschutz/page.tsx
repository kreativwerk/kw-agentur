import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary, isLocale } from "@/lib/i18n";

export default async function DatenschutzPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDictionary(lang);

  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-5 py-28 sm:px-8">
      <h1 className="display text-4xl">{dict.footer.privacy}</h1>
      {/* PLATZHALTER: Datenschutzerklärung muss vor Livegang juristisch geprüft
          ergänzt werden (Verarbeitung der Anfrage-Daten via Supabase/Anthropic). */}
      <div className="mt-8 space-y-4 text-muted">
        <p className="rounded-lg border border-accent/40 bg-accent-soft p-4 text-sm text-foreground">
          {lang === "de"
            ? "Platzhalter — die vollständige Datenschutzerklärung wird vor dem Livegang ergänzt. Hinweis: Angaben aus dem Anfrage-Assistenten werden zur Bearbeitung Ihrer Anfrage gespeichert."
            : "Placeholder — the full privacy policy will be added before launch. Note: details from the inquiry assistant are stored to process your request."}
        </p>
      </div>
      <Link href={`/${lang}`} className="mt-10 inline-block text-accent font-semibold">
        ← {lang === "de" ? "Zurück zur Startseite" : "Back to home"}
      </Link>
    </main>
  );
}
