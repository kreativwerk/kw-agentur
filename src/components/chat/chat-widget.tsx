"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { MessageCircle, Send, X } from "lucide-react";
import type { Dict, Locale } from "@/lib/i18n";
import { inquiryFieldOrder, type InquiryDraft } from "@/lib/inquiry";
import { CHAT_OPEN_EVENT } from "./chat-events";
import { InquiryForm } from "./inquiry-form";

type DisplayMessage = { role: "user" | "assistant"; text: string };

export function ChatWidget({ dict, lang }: { dict: Dict; lang: Locale }) {
  const [open, setOpen] = useState(false);
  const [formMode, setFormMode] = useState(false);
  const [display, setDisplay] = useState<DisplayMessage[]>([]);
  const [apiMessages, setApiMessages] = useState<unknown[]>([]);
  const [draft, setDraft] = useState<InquiryDraft>({});
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorText, setErrorText] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener(CHAT_OPEN_EVENT, onOpen);
    return () => window.removeEventListener(CHAT_OPEN_EVENT, onOpen);
  }, []);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open, busy]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [display, busy]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }
      // Fokus-Falle: Tab bleibt im Dialog
      if (event.key === "Tab" && dialogRef.current) {
        const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, input, select, textarea, a[href], [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        const active = document.activeElement;
        if (event.shiftKey && (active === first || !dialogRef.current.contains(active))) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && active === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const send = useCallback(async () => {
    const text = input.trim();
    if (!text || busy || submitted) return;
    setInput("");
    setErrorText(null);
    setDisplay((prev) => [...prev, { role: "user", text }]);
    setBusy(true);
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiMessages, userMessage: text, draft, lang }),
      });
      // Statisches Hosting ohne Node-API (z. B. IONOS): direkt zum Formular
      if (response.status === 404 || response.status === 405) {
        setFormMode(true);
        return;
      }
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      if (data.fallback) {
        setFormMode(true);
        return;
      }
      if (data.error) throw new Error(data.error);
      setApiMessages(data.messages ?? []);
      setDraft(data.draft ?? {});
      if (data.submitted) setSubmitted(true);
      const reply: string = data.submitted
        ? `${data.reply ? data.reply + "\n\n" : ""}${dict.chat.submitted}`
        : data.reply;
      if (reply) {
        setDisplay((prev) => [...prev, { role: "assistant", text: reply }]);
      }
    } catch {
      setErrorText(dict.chat.error);
    } finally {
      setBusy(false);
    }
  }, [input, busy, submitted, apiMessages, draft, lang, dict.chat.submitted, dict.chat.error]);


  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={dict.chat.open}
        className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-accent px-5 py-3.5 font-bold text-background shadow-[0_8px_30px_rgba(255,77,0,0.35)] transition-transform duration-300 hover:scale-[1.05] active:scale-[0.97]"
      >
        <MessageCircle size={20} strokeWidth={2.5} aria-hidden />
        <span className="hidden sm:inline">{dict.chat.open}</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={dict.chat.title}
            initial={reduce ? false : { opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? undefined : { opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.19, 1, 0.22, 1] }}
            className="fixed inset-0 z-50 flex flex-col overflow-hidden bg-surface sm:inset-auto sm:bottom-5 sm:right-5 sm:h-[640px] sm:max-h-[calc(100svh-2.5rem)] sm:w-[420px] sm:rounded-2xl sm:border sm:border-line sm:shadow-2xl"
          >
            <header className="flex items-center justify-between border-b border-line px-5 py-4">
              <div>
                <h2 className="font-bold">{dict.chat.title}</h2>
                <p className="text-xs text-muted">{dict.chat.subtitle}</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={dict.chat.close}
                className="rounded-full p-2 text-muted transition-colors hover:bg-surface-2 hover:text-foreground"
              >
                <X size={20} aria-hidden />
              </button>
            </header>

            {formMode ? (
              <div className="flex-1 overflow-y-auto p-5">
                <InquiryForm dict={dict} lang={lang} />
              </div>
            ) : (
              <>
                {/* Signatur der Seite: die Anfrage füllt sich sichtbar,
                    leere Slots von Anfang an — das Gespräch baut das Formular. */}
                <div className="border-b border-line bg-surface-2 px-5 py-3">
                  <p className="text-xs font-bold uppercase tracking-wide text-muted">
                    {dict.chat.draftTitle}
                  </p>
                  <ul className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1">
                    {inquiryFieldOrder.map((field) => {
                      const value = draft[field];
                      return (
                        <li key={field} className="flex min-w-0 items-baseline gap-1.5 text-xs">
                          <span className="shrink-0 text-muted">
                            {dict.chat.fields[field]}
                          </span>
                          <AnimatePresence mode="wait" initial={false}>
                            <motion.span
                              key={value ? String(value) : "empty"}
                              initial={reduce || !value ? false : { opacity: 0, y: 4 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3 }}
                              className={
                                value
                                  ? "truncate font-semibold text-accent"
                                  : "text-muted/70 select-none"
                              }
                            >
                              {value ? String(value) : "———"}
                            </motion.span>
                          </AnimatePresence>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <div
                  ref={scrollRef}
                  className="flex-1 space-y-4 overflow-y-auto p-5"
                  aria-live="polite"
                >
                  <Bubble role="assistant" text={dict.chat.greeting} />
                  {display.map((message, i) => (
                    <Bubble key={i} role={message.role} text={message.text} />
                  ))}
                  {busy && (
                    <div className="flex gap-1.5 px-1" aria-hidden>
                      {[0, 1, 2].map((dot) => (
                        <motion.span
                          key={dot}
                          animate={reduce ? undefined : { opacity: [0.3, 1, 0.3] }}
                          transition={{ repeat: Infinity, duration: 1.1, delay: dot * 0.18 }}
                          className="h-2 w-2 rounded-full bg-muted"
                        />
                      ))}
                    </div>
                  )}
                  {errorText && (
                    <p role="alert" className="text-sm text-accent">
                      {errorText}
                    </p>
                  )}
                </div>

                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                    send();
                  }}
                  className="flex items-center gap-2 border-t border-line p-4"
                >
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    placeholder={dict.chat.placeholder}
                    disabled={busy || submitted}
                    aria-label={dict.chat.placeholder}
                    className="min-w-0 flex-1 rounded-full border border-line bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted focus:border-accent focus:outline-none disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={busy || submitted || !input.trim()}
                    aria-label={dict.chat.send}
                    className="rounded-full bg-accent p-2.5 text-background transition-transform hover:scale-105 active:scale-95 disabled:opacity-40 disabled:hover:scale-100"
                  >
                    <Send size={18} aria-hidden />
                  </button>
                </form>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Bubble({ role, text }: { role: "user" | "assistant"; text: string }) {
  return (
    <div className={role === "user" ? "flex justify-end" : "flex justify-start"}>
      <p
        className={
          role === "user"
            ? "max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-br-md bg-accent px-4 py-2.5 text-sm font-medium text-background"
            : "max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-bl-md bg-surface-2 px-4 py-2.5 text-sm text-foreground"
        }
      >
        {text}
      </p>
    </div>
  );
}
