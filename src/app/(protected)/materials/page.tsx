"use client";

import { useEffect, useMemo, useState } from "react";
import DataTable from "@/src/app/components/ui/DataTable";
import CreateModal from "@/src/app/components/ui/CreateModal";
import UpdateModal from "@/src/app/components/ui/UpdateModal";
import DeleteModal from "@/src/app/components/ui/DeleteModal";

import {
  getMaterials,
  createMaterial,
  updateMaterial,
  deleteMaterial,
  Material,
} from "@/src/lib/modules/materials";

import {
  getCategories,
  getUnits,
  getSuppliers,
  LookupItem,
} from "@/src/lib/modules/lookups";

export default function MaterialsPage() {
  const [data, setData] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const [selected, setSelected] = useState<Material | null>(null);

  // LOOKUPS
  const [categoryOptions, setCategoryOptions] = useState<LookupItem[]>([]);
  const [unitOptions, setUnitOptions] = useState<LookupItem[]>([]);
  const [supplierOptions, setSupplierOptions] = useState<LookupItem[]>([]);

  /* =========================
     FETCH LOOKUPS
  ========================= */
  const fetchLookups = async () => {
    try {
      const [cats, unts, sups] = await Promise.all([
        getCategories(),
        getUnits(),
        getSuppliers(),
      ]);

      setCategoryOptions(cats);
      setUnitOptions(unts);
      setSupplierOptions(sups);
    } catch (err) {
      console.error("Failed to load lookups:", err);
    }
  };

  /* =========================
     FETCH DATA
  ========================= */
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await getMaterials();
      setData(res);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    fetchLookups();
  }, []);

  /* =========================
     MAP IDS → NAMES (DISPLAY ONLY)
  ========================= */
  const displayData = useMemo(() => {
    const categoryMap = Object.fromEntries(
      categoryOptions.map((c) => [c.id, c.name])
    );

    const unitMap = Object.fromEntries(
      unitOptions.map((u) => [u.id, u.name])
    );

    const supplierMap = Object.fromEntries(
      supplierOptions.map((s) => [s.id, s.name])
    );

    return data.map((item) => ({
      ...item,
      category_id: categoryMap[item.category_id] || "—",
      unit_id: unitMap[item.unit_id] || "—",
      supplier_id: supplierMap[item.supplier_id] || "—",
    }));
  }, [data, categoryOptions, unitOptions, supplierOptions]);

  /* =========================
     CREATE
  ========================= */
  const handleCreate = async (form: any) => {
    await createMaterial(form);
    setIsCreateOpen(false);
    fetchData();
  };

  /* =========================
     UPDATE
  ========================= */
  const handleUpdate = async (form: any) => {
    if (!selected) return;

    await updateMaterial(selected.id, form);
    setIsUpdateOpen(false);
    setSelected(null);
    fetchData();
  };

  /* =========================
     DELETE
  ========================= */
  const handleDelete = async () => {
    if (!selected) return;

    await deleteMaterial(selected.id);
    setIsDeleteOpen(false);
    setSelected(null);
    fetchData();
  };

  return (
    <div className="p-6 space-y-4">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Materials</h1>

        <button
          onClick={() => setIsCreateOpen(true)}
          className="px-4 py-2 btn-sub border border-black/10 py-2 rounded-sm"
        >
          + Add Material
        </button>
      </div>

      {/* TABLE */}
      <DataTable
        data={displayData}
        loading={loading}
        columns={[
          { key: "material_name", label: "Material" },
          { key: "category_id", label: "Category" },
          { key: "unit_id", label: "Unit" },
          { key: "supplier_id", label: "Supplier" },
          { key: "quantity", label: "Qty" },
          { key: "unit_price", label: "Price" },
        ]}
        onEdit={(row) => {
          setSelected(row);
          setIsUpdateOpen(true);
        }}
        onDelete={(row) => {
          setSelected(row);
          setIsDeleteOpen(true);
        }}
      />

      {/* =========================
         CREATE MODAL
      ========================= */}
      <CreateModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        title="Create Material"
        fields={[
          { name: "material_name", label: "Material Name", type: "text" },

          {
            name: "category_id",
            label: "Category",
            type: "select",
            options: categoryOptions.map((c) => ({
              label: c.name,
              value: c.id,
            }))
          },
          {
            name: "unit_id",
            label: "Unit",
            type: "select",
            options: unitOptions.map((c) => ({
              label: c.name,
              value: c.id,
            }))
          },
          {
            name: "supplier_id",
            label: "Supplier",
            type: "select",
            options: supplierOptions.map((c) => ({
              label: c.name,
              value: c.id,
            }))
          },

          { name: "quantity", label: "Quantity", type: "number" },
          { name: "unit_price", label: "Unit Price", type: "number" },
        ]}
        onSubmit={handleCreate}
      />

      {/* =========================
         UPDATE MODAL
      ========================= */}
      <UpdateModal
        isOpen={isUpdateOpen}
        onClose={() => setIsUpdateOpen(false)}
        title="Update Material"
        initialData={selected || {}}
        fields={[
          { name: "material_name", label: "Material Name", type: "text" },

          {
            name: "category_id",
            label: "Category",
            type: "select",
            options: categoryOptions.map((c) => c.name),
          },
          {
            name: "unit_id",
            label: "Unit",
            type: "select",
            options: unitOptions.map((u) => u.name),
          },
          {
            name: "supplier_id",
            label: "Supplier",
            type: "select",
            options: supplierOptions.map((s) => s.name),
          },

          { name: "quantity", label: "Quantity", type: "number" },
          { name: "unit_price", label: "Unit Price", type: "number" },
        ]}
        onSubmit={handleUpdate}
      />

      {/* =========================
         DELETE MODAL
      ========================= */}
      <DeleteModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        title="Delete Material"
        description={`Are you sure you want to delete "${selected?.material_name || ""
          }"?`}
        onConfirm={handleDelete}
      />
    </div>
  );
}