import { NextResponse } from "next/server";
import { saveInquiry } from "@/lib/supabase-server";

export const runtime = "nodejs";

/** Klassischer Formular-Fallback, wenn der Chat-Assistent nicht verfügbar ist. */
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const str = (key: string, max = 2000): string | undefined => {
    const value = body[key];
    return typeof value === "string" && value.trim() ? value.trim().slice(0, max) : undefined;
  };

  const project_type = str("project_type", 50);
  const description = str("description", 5000);
  const name = str("name", 200);
  const email = str("email", 320);

  if (!project_type || !description || !name || !email || !email.includes("@")) {
    return NextResponse.json({ error: "missing_fields" }, { status: 400 });
  }

  const result = await saveInquiry({
    project_type,
    description,
    budget: str("budget", 200),
    timeline: str("timeline", 200),
    name,
    company: str("company", 200),
    email,
    phone: str("phone", 50),
    locale: str("locale", 5) === "en" ? "en" : "de",
    source: "form",
  });

  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 503 });
  }
  return NextResponse.json({ ok: true, id: result.id });
}
