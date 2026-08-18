# Kreativwerk — Agentur-Website

Marketing-Website der Digitalagentur **Kreativwerk** (kw-agentur.de): Websites, Apps und Softwarelösungen. Zweisprachig (DE/EN), mit KI-gestütztem Projektanfrage-Chatbot und Supabase-Anbindung.

## Stack

- **Next.js 16** (App Router, TypeScript, Tailwind CSS 4)
- **Framer Motion** — Scroll-Reveals, Marquee, Micro-Interactions
- **Anthropic Claude API** (`claude-opus-5`) — Chatbot, der die Projektanfrage im Gespräch ausfüllt (`/api/chat`)
- **Supabase** — Speicherung der Anfragen in `project_inquiries` (`supabase/migrations/`)

## Entwicklung

```bash
npm install
cp .env.example .env.local   # Keys eintragen
npm run dev
```

Routen: `/de` und `/en` (Weiterleitung via `src/proxy.ts` nach Accept-Language).

## Umgebungsvariablen

| Variable | Zweck |
|---|---|
| `ANTHROPIC_API_KEY` | Chat-Assistent. Fehlt der Key, zeigt das Widget automatisch das klassische Formular. |
| `SUPABASE_URL` | Projekt-URL des Supabase-Projekts |
| `SUPABASE_SECRET_KEY` | Service-Role-Key (nur serverseitig) |

## Hosting-Variante A: IONOS-Webspace (aktueller Plan — PHP-Formular)

```bash
npm run build:static
```

Danach den kompletten Inhalt von **`out/`** per FTP auf den Webspace laden. Enthalten:

- `index.html` — Sprachweiterleitung auf `/de/` bzw. `/en/`
- `de/`, `en/` — die komplette Website (statisch)
- `anfrage.php` — nimmt das Anfrage-Formular entgegen und sendet es per E-Mail an `info@kw-agentur.de` (Empfänger/Absender oben in der Datei anpassen; Absender-Adresse muss zur Domain gehören und im IONOS-Postfach existieren)

Der Chat-Assistent erkennt statisches Hosting automatisch (keine Node-API) und zeigt direkt das klassische Formular; das Formular sendet an `anfrage.php`. Spam-Schutz per Honeypot-Feld.

## Hosting-Variante B: Vercel (Node — voller Chatbot)

Repo bei Vercel importieren, `ANTHROPIC_API_KEY` setzen — der KI-Assistent läuft dann über `/api/chat`. Das Formular nutzt automatisch `/api/inquiry`.

## Datenbank (aktuell pausiert)

Supabase ist vorbereitet, aber bewusst nicht aktiv (Free-Limit der Organisation erreicht). Migration in `supabase/migrations/0001_project_inquiries.sql` — bei Bedarf Projekt anlegen, `SUPABASE_URL`/`SUPABASE_SECRET_KEY` setzen, fertig. RLS ist aktiv; Inserts laufen ausschließlich über den Service-Key in den Route Handlers.

## Offene Platzhalter (vor Livegang ersetzen)

- **Logo**: `src/components/logo.tsx` — aktuell Wortmarke „KW / Kreativwerk", echtes Logo von kw-agentur.de einsetzen.
- **Referenz-Screenshots**: `public/referenzen/<slug>-desktop.png` (16:10) ablegen und in `src/lib/projects.ts` `hasShots: true` setzen.
- **Birner Elektrotechnik**: Domain in `src/lib/projects.ts` verifizieren (aktuell angenommen: birner-elektrotechnik.de).
- **Impressum & Datenschutz**: `src/app/[lang]/impressum/` und `.../datenschutz/` mit echten Angaben füllen.
- **Kontakt-E-Mail**: in `src/components/contact.tsx` (`info@kw-agentur.de`) prüfen.
