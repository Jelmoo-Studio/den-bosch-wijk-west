import { Ontmoetingsplek } from "./types";
import { mockPlekken } from "./mockData";
import { isSupabaseConfigured, createClient } from "./supabase";

export async function getPlekken(): Promise<Ontmoetingsplek[]> {
  if (!isSupabaseConfigured) return mockPlekken.filter((p) => p.actief);

  const supabase = createClient();
  const { data, error } = await supabase
    .from("ontmoetingsplekken")
    .select("*")
    .eq("actief", true)
    .order("naam");

  if (error) throw error;
  return data ?? [];
}

export async function getAllePlekken(): Promise<Ontmoetingsplek[]> {
  if (!isSupabaseConfigured) return mockPlekken;

  const supabase = createClient();
  const { data, error } = await supabase
    .from("ontmoetingsplekken")
    .select("*")
    .order("naam");

  if (error) throw error;
  return data ?? [];
}

export async function getPlek(id: string): Promise<Ontmoetingsplek | null> {
  if (!isSupabaseConfigured) {
    return mockPlekken.find((p) => p.id === id) ?? null;
  }

  const supabase = createClient();
  const { data, error } = await supabase
    .from("ontmoetingsplekken")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return null;
  return data;
}

export async function createPlek(
  plek: Omit<Ontmoetingsplek, "id" | "created_at">
): Promise<Ontmoetingsplek> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("ontmoetingsplekken")
    .insert(plek)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updatePlek(
  id: string,
  plek: Partial<Omit<Ontmoetingsplek, "id" | "created_at">>
): Promise<Ontmoetingsplek> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("ontmoetingsplekken")
    .update(plek)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deletePlek(id: string): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase
    .from("ontmoetingsplekken")
    .delete()
    .eq("id", id);

  if (error) throw error;
}
