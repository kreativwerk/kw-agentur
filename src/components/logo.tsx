/**
 * Platzhalter-Wortmarke, bis das echte Logo von kw-agentur.de vorliegt.
 * Austausch: dieses SVG durch die Logo-Datei ersetzen, Prop-API beibehalten.
 */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-baseline gap-2 font-extrabold tracking-tight ${className}`}
    >
      <span className="bg-accent text-background px-1.5 py-0.5 leading-none rounded-[2px]">
        KW
      </span>
      <span className="hidden sm:inline text-foreground leading-none">
        Kreativwerk
      </span>
    </span>
  );
}
