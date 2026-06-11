import { supabase } from "@/src/lib/supabaseClient";

export async function getDashboardStats() {
  const [materials, categories, suppliers, units, stocks] =
    await Promise.all([
      supabase.from("materials").select("*", { count: "exact", head: true }),
      supabase.from("categories").select("*", { count: "exact", head: true }),
      supabase.from("suppliers").select("*", { count: "exact", head: true }),
      supabase.from("units").select("*", { count: "exact", head: true }),
      supabase.from("stocks").select("quantity_in, quantity_out, created_at"),
    ]);

  const rows = stocks.data || [];

  const totalStockIn = rows.reduce((a, b) => a + (b.quantity_in || 0), 0);
  const totalStockOut = rows.reduce((a, b) => a + (b.quantity_out || 0), 0);

  return {
    totalMaterials: materials.count || 0,
    totalCategories: categories.count || 0,
    totalSuppliers: suppliers.count || 0,
    totalUnits: units.count || 0,
    totalStockIn,
    totalStockOut,
    currentStock: totalStockIn - totalStockOut,
  };
}

export async function getStockChartData() {
  const { data } = await supabase
    .from("stocks")
    .select("created_at, quantity_in, quantity_out")
    .order("created_at", { ascending: true });

  const map: Record<string, any> = {};

  (data || []).forEach((r) => {
    const date = new Date(r.created_at).toLocaleDateString();

    if (!map[date]) {
      map[date] = { date, in: 0, out: 0 };
    }

    map[date].in += r.quantity_in || 0;
    map[date].out += r.quantity_out || 0;
  });

  return Object.values(map);
}

export async function getCategoryDistribution() {
  const { data } = await supabase
    .from("materials")
    .select("category_id, categories(name)")
    .limit(100);

  const map: Record<string, number> = {};

  (data || []).forEach((m: any) => {
    const name = m.categories?.name || "Unknown";
    map[name] = (map[name] || 0) + 1;
  });

  return Object.entries(map).map(([name, value]) => ({
    name,
    value,
  }));
}

export async function getTopMaterials() {
  const { data } = await supabase
    .from("materials")
    .select("material_name, quantity")
    .order("quantity", { ascending: false })
    .limit(5);

  return data || [];
}

export async function getSupplierDistribution() {
  const { data } = await supabase
    .from("materials")
    .select("supplier_id, suppliers(supplier_name)")
    .limit(100);

  const map: Record<string, number> = {};

  (data || []).forEach((m: any) => {
    const name = m.suppliers?.supplier_name || "Unknown";
    map[name] = (map[name] || 0) + 1;
  });

  return Object.entries(map).map(([name, value]) => ({
    supplier_name: name,
    count: value,
  }));
}
