"use client";

import { useState } from "react";
import type { Dict, Locale } from "@/lib/i18n";

/**
 * Klassisches Anfrage-Formular. Sendet zuerst an die Node-API (/api/inquiry,
 * Vercel & Co.); antwortet die nicht (404/405/503, z. B. auf statischem
 * PHP-Hosting wie IONOS), geht dieselbe Anfrage an /anfrage.php (Mail-Versand).
 */
export function InquiryForm({ dict, lang }: { dict: Dict; lang: Locale }) {
  const [state, setState] = useState<"idle" | "busy" | "done" | "error">("idle");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state === "busy") return;
    setState("busy");
    const form = new FormData(event.currentTarget);
    const payload = JSON.stringify({
      ...Object.fromEntries(form.entries()),
      locale: lang,
    });
    const headers = { "Content-Type": "application/json" };
    try {
      let response = await fetch("/api/inquiry", {
        method: "POST",
        headers,
        body: payload,
      });
      if ([404, 405, 503].includes(response.status)) {
        response = await fetch("/anfrage.php", {
          method: "POST",
          headers,
          body: payload,
        });
      }
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      setState("done");
    } catch {
      setState("error");
    }
  }

  if (state === "done") {
    return <p className="text-sm">{dict.chat.submitted}</p>;
  }

  const f = dict.chat.fields;
  const inputClass =
    "w-full rounded-lg border border-line bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted focus:border-accent focus:outline-none";

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      {/* Honeypot gegen Spam-Bots — bleibt für Menschen unsichtbar */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />
      <select name="project_type" required defaultValue="" className={inputClass}>
        <option value="" disabled>
          {f.project_type} *
        </option>
        <option value="website">Website</option>
        <option value="app">App</option>
        <option value="software">Software</option>
        <option value="other">{lang === "de" ? "Sonstiges" : "Other"}</option>
      </select>
      <textarea
        name="description"
        required
        rows={4}
        placeholder={`${f.description} *`}
        className={inputClass}
      />
      <div className="grid grid-cols-2 gap-3">
        <input name="budget" placeholder={f.budget} className={inputClass} />
        <input name="timeline" placeholder={f.timeline} className={inputClass} />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <input name="name" required placeholder={`${f.name} *`} className={inputClass} />
        <input name="company" placeholder={f.company} className={inputClass} />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <input name="email" type="email" required placeholder={`${f.email} *`} className={inputClass} />
        <input name="phone" type="tel" placeholder={f.phone} className={inputClass} />
      </div>
      {state === "error" && (
        <p role="alert" className="text-sm text-accent">
          {dict.chat.error}
        </p>
      )}
      <button
        type="submit"
        disabled={state === "busy"}
        className="w-full rounded-full bg-accent py-3 font-bold text-background transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
      >
        {state === "busy" ? "…" : dict.chat.send}
      </button>
    </form>
  );
}
