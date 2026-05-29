import { createClient } from "@supabase/supabase-js";
import {
  DEFAULT_SUPABASE_ANON_KEY,
  DEFAULT_SUPABASE_URL,
} from "../config/personalization";

const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL?.trim() || DEFAULT_SUPABASE_URL;

const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY?.trim() || DEFAULT_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export async function saveAnswer(
  sessionId: string,
  questionKey: string,
  answer: string,
): Promise<{ ok: boolean; error?: string }> {
  if (!supabase) {
    console.warn("[supabase] not configured");
    return { ok: false, error: "not configured" };
  }

  const { error } = await supabase.from("date_responses").upsert(
    {
      session_id: sessionId,
      question_key: questionKey,
      answer: answer.trim(),
    },
    { onConflict: "session_id,question_key" },
  );

  if (error) {
    console.error("[supabase]", error.message, error);
    return { ok: false, error: error.message };
  }

  return { ok: true };
}