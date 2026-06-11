import { supabase } from "@/src/lib/supabaseClient";

export type Material = {
  id: string;
  material_name: string;

  category_id: string;
  unit_id: string;
  supplier_id: string;

  quantity: number;
  unit_price: number;

  created_at?: string;
  updated_at?: string;
};

/**
 * GET ALL MATERIALS
 */
export async function getMaterials(): Promise<Material[]> {
  const { data, error } = await supabase
    .from("materials")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data || [];
}

/**
 * CREATE MATERIAL
 */
export async function createMaterial(payload: {
  material_name: string;
  category_id: string;
  unit_id: string;
  supplier_id: string;
  quantity: number;
  unit_price: number;
}) {
  const { data, error } = await supabase
    .from("materials")
    .insert([payload])
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * UPDATE MATERIAL
 */
export async function updateMaterial(
  id: string,
  payload: Partial<{
    material_name: string;
    category_id: string;
    unit_id: string;
    supplier_id: string;
    quantity: number;
    unit_price: number;
  }>
) {
  const { data, error } = await supabase
    .from("materials")
    .update(payload)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * DELETE MATERIAL
 */
export async function deleteMaterial(id: string) {
  const { error } = await supabase
    .from("materials")
    .delete()
    .eq("id", id);

  if (error) throw error;
  return true;
}