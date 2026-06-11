import { supabase } from "@/src/lib/supabaseClient";

export type Supplier = {
  id: string;
  name: string;
  contact_person: string;
  phone_number: string;
  email?: string | null;
  address?: string | null;
  created_at?: string;
};

export async function getSuppliers(): Promise<Supplier[]> {
  const { data, error } = await supabase
    .from("suppliers")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function createSupplier(payload: {
  name: string;
  contact_person: string;
  phone_number: string;
  email?: string;
  address?: string;
}) {
  const { data, error } = await supabase
    .from("suppliers")
    .insert([payload])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateSupplier(
  id: string,
  payload: Partial<{
    name: string;
    contact_person: string;
    phone_number: string;
    email: string;
    address: string;
  }>
) {
  const { data, error } = await supabase
    .from("suppliers")
    .update(payload)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteSupplier(id: string) {
  const { error } = await supabase
    .from("suppliers")
    .delete()
    .eq("id", id);

  if (error) throw error;
  return true;
}