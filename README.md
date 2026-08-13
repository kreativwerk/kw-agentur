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

## Datenbank

Migration in `supabase/migrations/0001_project_inquiries.sql` — anlegen mit dem Supabase SQL-Editor oder `supabase db push`. RLS ist aktiv; Inserts laufen ausschließlich über den Service-Key in den Route Handlers.

## Offene Platzhalter (vor Livegang ersetzen)

- **Logo**: `src/components/logo.tsx` — aktuell Wortmarke „KW / Kreativwerk", echtes Logo von kw-agentur.de einsetzen.
- **Referenz-Screenshots**: `public/referenzen/<slug>-desktop.png` (16:10) ablegen und in `src/lib/projects.ts` `hasShots: true` setzen.
- **Birner Elektrotechnik**: Domain in `src/lib/projects.ts` verifizieren (aktuell angenommen: birner-elektrotechnik.de).
- **Impressum & Datenschutz**: `src/app/[lang]/impressum/` und `.../datenschutz/` mit echten Angaben füllen.
- **Kontakt-E-Mail**: in `src/components/contact.tsx` (`info@kw-agentur.de`) prüfen.
