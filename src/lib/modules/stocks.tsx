import { supabase } from "@/src/lib/supabaseClient";

export type Stock = {
  id: string;
  material_id: string;
  quantity_in: number;
  quantity_out: number;
  current_stock?: number;
  reference?: string;
  created_at?: string;
  updated_at?: string;
};

/**
 * GET ALL STOCKS
 */
export async function getStocks(): Promise<Stock[]> {
  const { data, error } = await supabase
    .from("stocks")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data || [];
}

/**
 * CREATE STOCK ENTRY
 */
export async function createStock(payload: {
  material_id: string;
  quantity_in: number;
  quantity_out: number;
  reference?: string;
}) {
  const { data, error } = await supabase
    .from("stocks")
    .insert([payload])
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * UPDATE STOCK ENTRY
 */
export async function updateStock(
  id: string,
  payload: Partial<{
    material_id: string;
    quantity_in: number;
    quantity_out: number;
    reference: string;
  }>
) {
  const { data, error } = await supabase
    .from("stocks")
    .update(payload)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * DELETE STOCK ENTRY
 */
export async function deleteStock(id: string) {
  const { error } = await supabase
    .from("stocks")
    .delete()
    .eq("id", id);

  if (error) throw error;
  return true;
}