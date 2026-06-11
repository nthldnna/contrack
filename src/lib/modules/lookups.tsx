import { supabase } from "@/src/lib/supabaseClient";

/* =========================
   TYPES
========================= */

export type LookupItem = {
  id: string;
  name: string;
};

/* =========================
   CATEGORIES
========================= */
export async function getCategories(): Promise<LookupItem[]> {
  const { data, error } = await supabase
    .from("categories")
    .select("id, name")
    .order("name", { ascending: true });

  if (error) throw error;
  return data || [];
}

/* =========================
   UNITS
========================= */
export async function getUnits(): Promise<LookupItem[]> {
  const { data, error } = await supabase
    .from("units")
    .select("id, name")
    .order("name", { ascending: true });

  if (error) throw error;
  return data || [];
}

/* =========================
   SUPPLIERS
========================= */
export async function getSuppliers(): Promise<LookupItem[]> {
  const { data, error } = await supabase
    .from("suppliers")
    .select("id, name")
    .order("name", { ascending: true });

  if (error) throw error;
  return data || [];
}