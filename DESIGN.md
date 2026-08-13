---
name: Kreativwerk
description: Dunkle Bühne, große Typografie, eine Signalfarbe — der Kategorie-Standard der Digitalagentur, kompromisslos sauber ausgeführt.
colors:
  near-black-stage: "#0b0b0c"
  stage-surface: "#131316"
  stage-surface-2: "#1a1a1f"
  warm-off-white: "#f5f4f0"
  warm-stone: "#a3a19a"
  hairline: "rgba(245, 244, 240, 0.1)"
  signal-orange: "#ff4d00"
  signal-orange-soft: "rgba(255, 77, 0, 0.12)"
typography:
  display:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(3rem, 11vw, 6rem)"
    fontWeight: 800
    lineHeight: 0.98
    letterSpacing: "-0.025em"
    fontVariation: "'wdth' 118"
  headline:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(2.2rem, 6vw, 3.8rem)"
    fontWeight: 800
    lineHeight: 0.98
    letterSpacing: "-0.025em"
    fontVariation: "'wdth' 118"
  title:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 700
    lineHeight: 1.4
  body:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    letterSpacing: "0.025em"
rounded:
  micro: "2px"
  input: "8px"
  tile: "12px"
  chat: "16px"
  pill: "9999px"
spacing:
  gutter-mobile: "20px"
  gutter-desktop: "32px"
  heading-gap: "56px"
  section: "112px"
  section-finale: "128px"
components:
  button-primary:
    backgroundColor: "{colors.signal-orange}"
    textColor: "{colors.near-black-stage}"
    rounded: "{rounded.pill}"
    padding: "14px 28px"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.warm-off-white}"
    rounded: "{rounded.pill}"
    padding: "14px 28px"
  tag-chip:
    backgroundColor: "transparent"
    textColor: "{colors.warm-stone}"
    rounded: "{rounded.pill}"
    padding: "4px 12px"
    typography: "{typography.label}"
  input-field:
    backgroundColor: "{colors.near-black-stage}"
    textColor: "{colors.warm-off-white}"
    rounded: "{rounded.input}"
    padding: "10px 14px"
  chat-bubble-user:
    backgroundColor: "{colors.signal-orange}"
    textColor: "{colors.near-black-stage}"
    rounded: "{rounded.chat}"
    padding: "10px 16px"
  chat-bubble-assistant:
    backgroundColor: "{colors.stage-surface-2}"
    textColor: "{colors.warm-off-white}"
    rounded: "{rounded.chat}"
    padding: "10px 16px"
---

# Design System: Kreativwerk

## Overview

**Creative North Star: "Die dunkle Bühne" (The Dark Stage)**

Kreativwerk nimmt den Kategorie-Standard der modernen Digitalagentur — dunkle Bühne, große Typografie, eine Signalfarbe — und führt ihn kompromisslos sauber aus. Verweigert wird nicht die Konvention, sondern ihre halbherzige Ausführung: keine Stock-Karten, kein Deko-Glas, keine zweite Akzentfarbe. Auf Near-Black liegt warmes Off-White, und ein einziges Signal-Orange trägt jede Betonung — vom CTA über die Textauswahl bis zum Cursor-Caret im Eingabefeld.

Die Welt ist flächig statt kartenhaft: Inhalte sitzen auf großen, ruhigen Flächen, getrennt durch 1px-Haarlinien in Off-White bei 10 % Deckung. Hierarchie entsteht fast ausschließlich typografisch — Archivo als einzige Familie, im Display-Register breit gestellt (wdth 118) und extrafett. Bewegung ist die zweite Stimme des Systems: maskierte Zeilen-Reveals, Clip-Reveals, sich aufziehende Akzentlinien und ein Domain-Marquee, alle auf derselben easeOutExpo-Kurve, alle mit reduced-motion-Fallback. Die Sprache gegenüber Kund:innen ist Deutsch per „Sie" (Englisch gleichwertig).

**Key Characteristics:**
- Near-Black-Bühne (#0b0b0c) mit warmem Off-White (#f5f4f0) und genau einer Signalfarbe (#ff4d00)
- Archivo als einzige Schriftfamilie; Display-Register über die Breitenachse (wdth 118), nicht über neue Fonts
- Flächen statt Karten: 1px-Linien gliedern, Radius nur an Tiles (12px), Chat (16px) und Pills
- Der Orange-Sweep als wiederkehrende Hover-Geste (Services-Zeilen, Referenz-Tiles, Sekundär-Pills)
- Eine Motion-Grammatik: easeOutExpo `cubic-bezier(0.19, 1, 0.22, 1)` überall, reduced-motion immer bedacht
- Durchgestaltete Browser-Oberflächen: orange Selection, orange Caret, oranger Focus-Ring, eigene Scrollbar, tabulare Ziffern

## Colors

Ein warm-dunkles Monochrom mit einer einzigen glühenden Signalfarbe — je seltener das Orange, desto lauter spricht es.

### Primary
- **Signal-Orange** (#ff4d00): Die eine Stimme der Welt. Trägt Primär-CTAs, den Orange-Sweep, die Prozess-Akzentlinien, gefüllte Chat-Draft-Werte, Fehlertexte, `::selection`, `caret-color` und den `:focus-visible`-Ring. Auf Orange steht immer Near-Black als Textfarbe.
- **Signal-Orange Soft** (rgba(255, 77, 0, 0.12)): Transluzente Variante als Token vorgesehen (`--accent-soft`); die Hero nutzt zusätzlich ein radiales Orange-Glühen bei 25 % Deckung hinter der Headline (`radial-gradient(closest-side, rgba(255,77,0,0.35), transparent 70%)`).

### Neutral
- **Near-Black Stage** (#0b0b0c): Seitenhintergrund, die Bühne. Zugleich Textfarbe auf allen orangen Flächen.
- **Stage Surface** (#131316): Erste tonale Stufe — Sektionsbänder (Prozess, Kontakt) und der Chat-Dialog heben sich damit von der Bühne ab.
- **Stage Surface 2** (#1a1a1f): Zweite tonale Stufe — Referenz-Tile-Grund, Assistenten-Bubbles, Chat-Draft-Leiste, Hover-Flächen hinter Icon-Buttons, Scrollbar-Daumen.
- **Warm Off-White** (#f5f4f0): Primäre Textfarbe. Warm, nie reinweiß.
- **Warm Stone** (#a3a19a): Sekundärtext — Sublines, Fließtext-Erklärungen, Nav-Links im Ruhezustand, Meta-Zeilen, Platzhalter.
- **Hairline** (rgba(245, 244, 240, 0.1)): Die einzige Linienfarbe. 1px-Trennlinien, Rahmen von Tiles, Pills, Chips und Inputs. Off-White bei 10 % — nie ein eigenes Grau.

### Named Rules
**The One Signal Rule.** Orange ist die einzige Akzentfarbe des Systems — es gibt keine Sekundärfarbe, keinen Verlauf in eine zweite Buntheit, kein Grün für Erfolg oder Rot für Fehler. Auch Fehlermeldungen sprechen Orange.

**The Ink-on-Orange Rule.** Text auf Orange ist immer Near-Black (#0b0b0c), nie Weiß. Beim Sweep wechseln Titel auf `background`, Sekundärtext auf `background/80` — der Kontrast auf Orange ist Teil der Geste.

**The Hairline Rule.** Linien sind 1px und immer `rgba(245, 244, 240, 0.1)`. Betonte Linien (Prozess-Schritte) sind 2px und orange. Andere Linienstärken und -farben existieren nicht.

## Typography

**Display Font:** Archivo (variable, via next/font, mit system-ui-Fallback)
**Body Font:** Archivo — dieselbe Familie
**Label/Mono Font:** keine eigene; Ziffern laufen als `font-variant-numeric: tabular-nums` (Klasse `.tabular`)

**Character:** Eine einzige Familie, die über ihre Achsen zwei Stimmen spricht: breit, extrafett und eng gesetzt im Display; neutral und ruhig im Fließtext. `font-feature-settings: "ss01"` ist global aktiv.

### Hierarchy
- **Display** (800, `clamp(3rem, 11vw, 6rem)`, line-height 0.98): Hero-Headline und Kontakt-Bookend (`clamp(3rem, 10vw, 5.5rem)`). Immer mit der Klasse `.display`: `font-variation-settings: "wdth" 118`, letter-spacing −0.025em, `text-wrap: balance`. Erscheint per maskiertem Zeilen-Reveal.
- **Headline** (800, `clamp(2.2rem, 6vw, 3.8rem)`, line-height 0.98): Sektionsüberschriften — dieselbe `.display`-Behandlung, eine Stufe kleiner. Services-Zeilentitel nutzen sie bei `1.875–2.25rem`, Referenz-Platzhalter-Domains bei `clamp(1.5rem, 3.2vw, 2.4rem)`.
- **Title** (700, 1.125–1.25rem, normale Breite): Prozess-Schritte, Referenz-Namen, Chat-Titel — fett, aber ohne Display-Achsen.
- **Body** (400, 1rem–1.125rem, line-height 1.5): Fließtext in Warm Stone, begrenzt auf `max-w-prose` bzw. `max-w-xl/2xl` für zentrierte Sublines.
- **Label** (600–700, 0.75rem, tracking-wide, teils UPPERCASE): Marquee-Domains, Kategorie-Zeilen, Chat-Draft-Titel, Tag-Chips. Zähler (»1 / 4«, Copyright-Zeile) zusätzlich `.tabular`.

### Named Rules
**The One Family Rule.** Archivo ist die einzige Schriftfamilie. Neue Register entstehen über Gewicht, Größe und die Breitenachse (wdth 118) — nie über eine zweite Familie.

**The Masked Bookend Rule.** Der maskierte Zeilen-Reveal (`.mask-line` + LineReveal) ist den Display-Headlines vorbehalten und rahmt die Seite: Hero am Anfang, Kontakt-Headline „Bauen wir." am Ende. Er wird nicht auf Fließtext oder Titles angewandt.

## Layout

Ein zentrierter Inhaltskanal von 72rem (`max-w-6xl`) mit 20px Gutter mobil und 32px ab `sm` (640px). Die Hero füllt den ersten Viewport (`min-h-svh`, zentriert); darunter folgt der Domain-Marquee als full-bleed Band mit `border-y`. Sektionen atmen mit 112px vertikalem Padding (`py-28`), das Kontakt-Finale mit 128px; zwischen Sektionsüberschrift und Inhalt liegen 56px (`mt-14`).

Der Rhythmus wechselt zwischen Bühne und Band: Leistungen und Referenzen liegen direkt auf Near-Black, Prozess und Kontakt sitzen als full-bleed Bänder auf Stage Surface mit Haarlinien oben/unten. Grids sind zweckgebunden statt uniform: Services als volle Zeilen mit asymmetrischem Split (`1fr / 1.4fr` ab `sm`), Referenzen zweispaltig ab `sm` (Tiles im Format 16/10), Prozess vierspaltig ab `lg` (zweispaltig ab `sm`). Die Nav ist fixiert und wird erst beim Scrollen (> 24px) zur Fläche: `bg-background/85` mit `backdrop-blur-md` und Haarlinie. Breakpoints sind die Tailwind-Defaults (sm 640px, md 768px, lg 1024px); mobil ersetzt ein Vollbild-Menü mit Display-Links die Linkleiste, der Chat-Dialog füllt mobil den gesamten Viewport.

## Elevation & Depth

Das System ist flach und schichtet tonal: Tiefe entsteht durch die drei Stufen Near-Black → Stage Surface → Stage Surface 2 und durch 1px-Haarlinien, nicht durch Schatten. Karten mit Schlagschatten existieren nicht. Genau zwei Elemente dürfen schweben, beide gehören zum Chat-Layer: der Launcher mit orangem Glühen und der Dialog mit einem tiefen weichen Schatten. Dazu kommt ein einziges atmosphärisches Licht — das radiale Orange-Glühen hinter der Hero-Headline (25 % Deckung, rein dekorativ, `aria-hidden`).

### Shadow Vocabulary
- **Chat-Launcher-Glow** (`box-shadow: 0 8px 30px rgba(255, 77, 0, 0.35)`): Nur am schwebenden Chat-Button — das Orange strahlt, statt zu schatten.
- **Dialog-Schatten** (`shadow-2xl`, `0 25px 50px -12px rgb(0 0 0 / 0.25)`): Nur am Chat-Dialog ab `sm`, wo er als Panel über der Seite schwebt.

### Named Rules
**The Flat Stage Rule.** Flächen im Seitenfluss werfen keine Schatten. Schatten sind dem Chat-Layer vorbehalten, der tatsächlich über der Seite schwebt.

## Shapes

Zwei Formsprachen, klar getrennt: Der Seitenfluss ist rechtwinklig — Sektionsbänder, Services-Zeilen, Prozess-Spalten und Platzhalter-Rahmen haben Radius 0 und werden von 1px-Haarlinien gegliedert. Rundung ist Interaktions- und Objektsprache: Alle Buttons, Chips und der Chat-Eingang sind volle Pills (9999px); Referenz-Tiles tragen 12px (`rounded-xl`), der Chat-Dialog und seine Bubbles 16px (`rounded-2xl`), Formular-Inputs 8px (`rounded-lg`). Chat-Bubbles brechen eine Ecke auf 6px (`rounded-br-md` beim Nutzer, `rounded-bl-md` beim Assistenten), um die Sprechrichtung zu zeigen. Mikro-Radius 2px erscheint nur am KW-Wortmarken-Block und am Focus-Ring.

Der Orange-Sweep ist die Signatur-Geometrie der Welt: eine orange Fläche, die per `scaleY` von unten in das Element wächst (`transform-origin: bottom` → beim Verlassen nach oben). Services-Zeilen, Referenz-Tiles (`.sweep-tile`) und Sekundär-Pills (`.sweep-pill`, mit `overflow: hidden`) teilen dieselbe Geste; sie feuert nur auf echten Hover-Geräten (`@media (hover: hover)`).

## Components

### Buttons
- **Shape:** Volle Pille (9999px), fette Schrift.
- **Primary:** Signal-Orange-Fläche, Near-Black-Text, `px-7 py-3.5` (Nav-Variante kompakter `px-4 py-2`, Kontakt-Finale größer `px-9 py-4`).
- **Hover / Focus:** Wächst auf `scale(1.04)` (aktiv `0.98`), 300ms; kein Farbwechsel — Orange bleibt Orange. Focus über den globalen orangen `:focus-visible`-Ring (2px, offset 3px).
- **Secondary (Sweep-Pill):** Transparent mit Haarlinien-Rand, Off-White-Text; beim Hover füllt der Orange-Sweep die Pille von unten, Rand wird orange, Text wechselt auf Near-Black.
- **Icon-Button:** Runder Ghost (`p-2`), Hover mit Stage-Surface-2-Fläche.

### Chips
- **Style:** Pillen mit Haarlinien-Rand, transparentem Grund, 0.75rem semibold in Warm Stone (`px-3 py-1`); als Leistungs-Tags im Einsatz.
- **State:** Nicht interaktiv; auf dem Orange-Sweep der Elternzeile wechseln sie auf `border-background/40` und Near-Black-Text.

### Cards / Containers
- **Corner Style:** Referenz-Tiles 12px; Sektionsflächen und Services-Zeilen 0.
- **Background:** Tiles auf Stage Surface 2; der Screenshot-Platzhalter komponiert darin einen inneren Haarlinien-Rahmen mit Kategorie-Label, „Screenshot folgt"-Meta (tabular) und großer Display-Domain, deren TLD orange ist.
- **Shadow Strategy:** Keine (siehe Elevation) — Hover spricht über den Orange-Sweep und den Rand, der auf Orange wechselt.
- **Border:** 1px Haarlinie, Hover `border-accent`.
- **Internal Padding:** Platzhalter `p-4` außen, `p-5` im Rahmen.

### Inputs / Fields
- **Style:** Near-Black-Grund, 1px Haarlinien-Rand, 8px Radius (Formular) bzw. Pille (Chat-Eingabe), Platzhalter in Warm Stone, Caret orange.
- **Focus:** Rand wechselt auf Orange (`focus:border-accent`, `outline-none`).
- **Error / Disabled:** Fehlertexte als `role="alert"` in Orange; Disabled bei 50 % Deckung.

### Navigation
- **Style:** Fixiert, transparent auf der Hero; ab 24px Scroll `bg-background/85` + `backdrop-blur-md` + Haarlinie unten. Links 0.875rem in Warm Stone, Hover Off-White (kein Orange, keine Unterstreichung); Sprachwechsel als Uppercase-Kürzel im selben Stil; rechts der Primary-CTA als kompakte Pille. Mobil: Vollbild-Overlay (`bg-background/95`, blur) mit Display-Links in 1.875rem.

### Chat-Widget (Signatur-Komponente)
Der Konversions-Kern und das Schaufenster der Welt: Launcher als orange Pille mit Glow unten rechts; Dialog als 420×640px-Panel (16px Radius, Haarlinien-Rand, mobil Vollbild) auf Stage Surface. Die Signatur ist die Draft-Leiste: Alle acht Anfrage-Felder stehen von Anfang an als leere Slots (`———`) auf Stage Surface 2 und füllen sich sichtbar orange, während das Gespräch läuft — das Gespräch baut das Formular. Nutzer-Bubbles orange mit Near-Black-Text, Assistenten-Bubbles Stage Surface 2; Tipp-Indikator als drei pulsierende Punkte. Vollständig zugänglich: `role="dialog"`, `aria-modal`, Fokus-Falle, Escape schließt, Verlauf `aria-live="polite"`.

### Marquee
Full-bleed Band zwischen Haarlinien: echte Kundendomains in Uppercase-Labels (Warm Stone), Endlos-Lauf über 36s linear (Duplikat-Hälfte `aria-hidden`), an den Rändern per `mask-image` weich ausgeblendet.

## Do's and Don'ts

### Do:
- **Do** jede Betonung mit Signal-Orange (#ff4d00) setzen und Text darauf immer in Near-Black (#0b0b0c) — The Ink-on-Orange Rule.
- **Do** den Orange-Sweep als Hover-Geste wiederverwenden (`.sweep`, `.sweep-tile`, `.sweep-pill`), statt neue Hover-Effekte zu erfinden; nur unter `@media (hover: hover)`.
- **Do** alle Bewegung auf easeOutExpo `cubic-bezier(0.19, 1, 0.22, 1)` fahren und für jede Animation einen reduced-motion-Fallback bereitstellen (statisch rendern, nie Inhalt hinter Masken verstecken).
- **Do** Flächen mit 1px-Haarlinien (`rgba(245, 244, 240, 0.1)`) gliedern und Tiefe tonal schichten (#0b0b0c → #131316 → #1a1a1f).
- **Do** Display-Text mit `.display` setzen (wdth 118, 800, −0.025em, 0.98) und Zahlen/Meta-Zeilen mit `.tabular`.
- **Do** deutsche Copy per „Sie" schreiben und jede Oberfläche gleichwertig in DE und EN führen.

### Don't:
- **Don't** eine zweite Akzent- oder Statusfarbe einführen — auch Fehler sprechen Orange (The One Signal Rule).
- **Don't** Karten mit Schlagschatten, Deko-Glas oder Stock-Optik bauen; Schatten gehören ausschließlich dem schwebenden Chat-Layer.
- **Don't** eine zweite Schriftfamilie oder einen Mono-Font laden; tabulare Ziffern von Archivo übernehmen die Zahlensprache.
- **Don't** Radius auf Sektionsflächen oder Services-Zeilen legen — Rundung ist Pills (9999px), Tiles (12px), Chat (16px) und Inputs (8px) vorbehalten.
- **Don't** reines Weiß (#ffffff), reines Schwarz (#000000) oder eigenständige Grau-Borders verwenden; Linien sind immer Off-White bei 10 %.
- **Don't** unbestätigte Inhalte gestalten: keine erfundenen Kennzahlen, Testimonials oder Logos — Platzhalter (wie das Referenz-Tile „Screenshot folgt") sind als eigene Komposition der Welt gekennzeichnet.
