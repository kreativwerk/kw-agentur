#!/usr/bin/env node
/**
 * Statischer Export für klassisches Hosting (IONOS):
 * legt Proxy + API-Routen temporär beiseite (beides braucht Node und ist mit
 * `output: "export"` nicht baubar), baut mit STATIC_EXPORT=1 nach `out/`
 * und stellt danach alles wieder her.
 *
 * Ergebnis: `out/` komplett per FTP auf den Webspace laden —
 * enthält index.html (Sprachweiterleitung), /de, /en und anfrage.php.
 */
import { execSync } from "node:child_process";
import { existsSync, renameSync, rmSync } from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const aside = [
  [path.join(root, "src/proxy.ts"), path.join(root, "src/proxy.ts.static-bak")],
  [path.join(root, "src/app/api"), path.join(root, "src/app/api.static-bak")],
];

const moved = [];
try {
  for (const [from, to] of aside) {
    if (existsSync(from)) {
      renameSync(from, to);
      moved.push([to, from]);
    }
  }
  rmSync(path.join(root, ".next"), { recursive: true, force: true });
  execSync("npx next build", {
    cwd: root,
    stdio: "inherit",
    env: { ...process.env, STATIC_EXPORT: "1" },
  });
  console.log("\n✔ Statischer Export fertig: out/ per FTP hochladen (inkl. anfrage.php).");
} finally {
  for (const [to, from] of moved) {
    renameSync(to, from);
  }
  // Export-Build-Reste entfernen, damit der nächste normale Build/tsc
  // keine veralteten generierten Typen sieht.
  rmSync(path.join(root, ".next"), { recursive: true, force: true });
}
