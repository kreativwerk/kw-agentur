import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Server-seitiger Supabase-Client mit Service-Key — nur in Route Handlers
 * verwenden, niemals im Client-Bundle.
 */
export function getSupabaseAdmin(): SupabaseClient | null {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}

export async function saveInquiry(data: {
  project_type: string;
  description: string;
  budget?: string;
  timeline?: string;
  name: string;
  company?: string;
  email: string;
  phone?: string;
  locale: string;
  source: "chat" | "form";
}): Promise<{ ok: true; id: string } | { ok: false; error: string }> {
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return { ok: false, error: "database_not_configured" };
  }
  const { data: row, error } = await supabase
    .from("project_inquiries")
    .insert(data)
    .select("id")
    .single();
  if (error) {
    console.error("saveInquiry failed:", error.message);
    return { ok: false, error: "insert_failed" };
  }
  return { ok: true, id: row.id as string };
}
