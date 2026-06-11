import { supabase } from "@/src/lib/supabaseClient";

export type Unit = {
  id: string;
  name: string;
  description?: string | null;
  created_at?: string;
  updated_at?: string;
};

export async function getUnits(): Promise<Unit[]> {
  const { data, error } = await supabase
    .from("units")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function createUnit(payload: {
  name: string;
  description?: string;
}) {
  const { data, error } = await supabase
    .from("units")
    .insert([payload])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateUnit(
  id: string,
  payload: { name?: string; description?: string }
) {
  const { data, error } = await supabase
    .from("units")
    .update(payload)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteUnit(id: string) {
  const { error } = await supabase.from("units").delete().eq("id", id);

  if (error) throw error;
  return true;
}