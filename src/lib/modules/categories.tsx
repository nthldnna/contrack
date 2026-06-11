import { supabase } from "@/src/lib/supabaseClient";

export type Category = {
  id: string;
  name: string;
  description?: string | null;
  created_at?: string;
  updated_at?: string;
};

export async function getCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function createCategory(payload: {
  name: string;
  description?: string;
}) {
  const { data, error } = await supabase
    .from("categories")
    .insert([payload])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateCategory(
  id: string,
  payload: { name?: string; description?: string }
) {
  const { data, error } = await supabase
    .from("categories")
    .update(payload)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteCategory(id: string) {
  const { error } = await supabase.from("categories").delete().eq("id", id);

  if (error) throw error;
  return true;
}