import type { NextConfig } from "next";

// STATIC_EXPORT=1 (npm run build:static) erzeugt den FTP-fähigen Export für
// klassisches Hosting (IONOS): reines HTML/CSS/JS + public/anfrage.php.
// Proxy und API-Routen werden vom Build-Skript dabei beiseitegelegt.
const staticExport = process.env.STATIC_EXPORT === "1";

const nextConfig: NextConfig = {
  ...(staticExport
    ? {
        output: "export",
        trailingSlash: true,
        images: { unoptimized: true },
      }
    : {}),
};

export default nextConfig;
