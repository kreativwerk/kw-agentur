import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";
import { isSubmittable, type InquiryDraft } from "@/lib/inquiry";
import { saveInquiry } from "@/lib/supabase-server";

export const runtime = "nodejs";
export const maxDuration = 60;

const MODEL = "claude-opus-5";
const MAX_TURN_MESSAGES = 60;
const MAX_TOOL_ITERATIONS = 4;

function systemPrompt(lang: string): string {
  const de = lang !== "en";
  return de
    ? `Du bist der Projektanfrage-Assistent der Digitalagentur Kreativwerk (kw-agentur.de).
Kreativwerk baut Websites, Apps und individuelle Softwarelösungen für Unternehmen im DACH-Raum.

Deine Aufgabe: Führe ein natürliches, freundliches Gespräch (per "Sie") und fülle dabei Schritt für Schritt die Projektanfrage aus. Erfasse: Projektart (Website, App oder Software), Beschreibung des Vorhabens, Budgetrahmen, Zeitrahmen, Name, Firma (optional), E-Mail, Telefon (optional).

Regeln:
- Stelle höchstens eine bis zwei Fragen pro Nachricht, halte Antworten kurz (2-4 Sätze).
- Rufe update_inquiry auf, sobald du neue Angaben erfährst — auch Teilangaben.
- Erfinde keine Angaben und keine Preise. Bei Budget-/Preisfragen: Konkrete Angebote macht das Team nach dem Erstgespräch; sage keine Kosten oder Konditionen zu.
- Wenn Projektart, Beschreibung, Name und E-Mail vorliegen: Fasse die Anfrage kurz zusammen, frage nach Bestätigung, und rufe erst nach der Bestätigung submit_inquiry auf.
- Bleib beim Thema Projektanfrage. Andere Fragen zur Agentur darfst du kurz beantworten, lenke dann zurück.`
    : `You are the project-inquiry assistant of the digital agency Kreativwerk (kw-agentur.de).
Kreativwerk builds websites, apps and custom software for businesses.

Your job: have a natural, friendly conversation and fill in the project inquiry step by step. Collect: project type (website, app or software), description, budget range, timeline, name, company (optional), email, phone (optional).

Rules:
- Ask at most one or two questions per message; keep replies short (2-4 sentences).
- Call update_inquiry as soon as you learn new details — partial data included.
- Never invent details or prices. For pricing questions: concrete quotes come from the team after the first call; never promise costs or conditions.
- Once project type, description, name and email are known: summarize the inquiry, ask for confirmation, and only after confirmation call submit_inquiry.
- Stay on the topic of the project inquiry; answer brief questions about the agency, then steer back.`;
}

const draftSchema = {
  type: "object" as const,
  properties: {
    project_type: {
      type: "string",
      enum: ["website", "app", "software", "other"],
      description: "Art des Projekts",
    },
    description: { type: "string", description: "Beschreibung des Vorhabens" },
    budget: { type: "string", description: "Budgetrahmen, z.B. '5.000-10.000 €'" },
    timeline: { type: "string", description: "Gewünschter Zeitrahmen" },
    name: { type: "string", description: "Name der Kontaktperson" },
    company: { type: "string", description: "Firmenname" },
    email: { type: "string", description: "E-Mail-Adresse" },
    phone: { type: "string", description: "Telefonnummer" },
  },
  required: [],
  additionalProperties: false,
};

const tools: Anthropic.Beta.BetaToolUnion[] = [
  {
    name: "update_inquiry",
    description:
      "Speichert neue oder korrigierte Angaben des Kunden im Anfrage-Entwurf. Rufe dieses Tool auf, sobald der Kunde eine relevante Angabe macht — auch unvollständige. Übergib nur Felder, die sich geändert haben.",
    input_schema: draftSchema,
  },
  {
    name: "submit_inquiry",
    description:
      "Reicht die vollständige, vom Kunden bestätigte Projektanfrage endgültig ein. Erst aufrufen, wenn Projektart, Beschreibung, Name und E-Mail vorliegen UND der Kunde die Zusammenfassung bestätigt hat.",
    input_schema: { type: "object", properties: {}, additionalProperties: false },
  },
];

type ChatRequest = {
  messages: Anthropic.Beta.BetaMessageParam[];
  userMessage: string;
  draft: InquiryDraft;
  lang: "de" | "en";
};

export async function POST(request: Request) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({ fallback: true });
  }

  let body: ChatRequest;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const lang = body.lang === "en" ? "en" : "de";
  const priorMessages = Array.isArray(body.messages) ? body.messages : [];
  const userMessage = typeof body.userMessage === "string" ? body.userMessage.slice(0, 4000) : "";
  if (!userMessage.trim() || priorMessages.length > MAX_TURN_MESSAGES) {
    return NextResponse.json({ error: "invalid_request" }, { status: 400 });
  }

  const draft: InquiryDraft = { ...(body.draft ?? {}) };
  let submitted = false;
  let submitError: string | undefined;

  const client = new Anthropic();
  const messages: Anthropic.Beta.BetaMessageParam[] = [
    ...priorMessages,
    { role: "user", content: userMessage },
  ];

  try {
    for (let i = 0; i < MAX_TOOL_ITERATIONS; i++) {
      const response = await client.beta.messages.create({
        model: MODEL,
        max_tokens: 1500,
        output_config: { effort: "low" },
        system: systemPrompt(lang),
        tools,
        messages,
        betas: ["server-side-fallback-2026-07-01"],
        fallbacks: "default",
      });

      if (response.stop_reason === "refusal") {
        return NextResponse.json({ error: "refused" }, { status: 200 });
      }

      messages.push({ role: "assistant", content: response.content });

      if (response.stop_reason !== "tool_use") break;

      const toolResults: Anthropic.Beta.BetaToolResultBlockParam[] = [];
      for (const block of response.content) {
        if (block.type !== "tool_use") continue;

        if (block.name === "update_inquiry") {
          const input = block.input as InquiryDraft;
          for (const [key, value] of Object.entries(input)) {
            if (typeof value === "string" && value.trim()) {
              draft[key as keyof InquiryDraft] = value.trim();
            }
          }
          toolResults.push({
            type: "tool_result",
            tool_use_id: block.id,
            content: JSON.stringify({ ok: true, draft }),
          });
        } else if (block.name === "submit_inquiry") {
          if (!isSubmittable(draft)) {
            toolResults.push({
              type: "tool_result",
              tool_use_id: block.id,
              content: JSON.stringify({ ok: false, error: "missing_required_fields", draft }),
              is_error: true,
            });
          } else {
            const result = await saveInquiry({
              project_type: draft.project_type!,
              description: draft.description!,
              budget: draft.budget,
              timeline: draft.timeline,
              name: draft.name!,
              company: draft.company,
              email: draft.email!,
              phone: draft.phone,
              locale: lang,
              source: "chat",
            });
            if (result.ok) {
              submitted = true;
              toolResults.push({
                type: "tool_result",
                tool_use_id: block.id,
                content: JSON.stringify({ ok: true, id: result.id }),
              });
            } else {
              submitError = result.error;
              toolResults.push({
                type: "tool_result",
                tool_use_id: block.id,
                content: JSON.stringify({ ok: false, error: result.error }),
                is_error: true,
              });
            }
          }
        }
      }

      if (toolResults.length === 0) break;
      messages.push({ role: "user", content: toolResults });
    }
  } catch (error) {
    if (error instanceof Anthropic.RateLimitError) {
      return NextResponse.json({ error: "rate_limited" }, { status: 429 });
    }
    if (error instanceof Anthropic.APIError) {
      console.error("Anthropic API error:", error.status, error.message);
      return NextResponse.json({ error: "upstream" }, { status: 502 });
    }
    throw error;
  }

  const last = messages[messages.length - 1];
  let reply = "";
  if (last.role === "assistant" && Array.isArray(last.content)) {
    reply = last.content
      .filter((b): b is Anthropic.Beta.BetaTextBlock => b.type === "text")
      .map((b) => b.text)
      .join("\n");
  }

  return NextResponse.json({ reply, messages, draft, submitted, submitError });
}
