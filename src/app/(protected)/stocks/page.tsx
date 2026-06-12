"use client";

import { useEffect, useState } from "react";

import DataTable from "@/src/app/components/ui/DataTable";
import CreateModal from "@/src/app/components/ui/CreateModal";
import UpdateModal from "@/src/app/components/ui/UpdateModal";
import DeleteModal from "@/src/app/components/ui/DeleteModal";

import {
  getStocks,
  createStock,
  updateStock,
  deleteStock,
  Stock,
} from "@/src/lib/modules/stocks";

import {
  getMaterials,
  Material,
} from "@/src/lib/modules/materials";

type Option = {
  label: string;
  value: string;
};

export default function StocksPage() {
  const [data, setData] = useState<Stock[]>([]);
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const [selected, setSelected] = useState<Stock | null>(null);

  const [materialOptions, setMaterialOptions] = useState<Option[]>([]);

  /* =========================
     FETCH DATA
  ========================= */
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await getStocks();
      setData(res);
    } finally {
      setLoading(false);
    }
  };

  const fetchMaterials = async () => {
    const res = await getMaterials();

    setMaterials(res);
    setMaterialOptions(
      res.map((m) => ({
        label: m.material_name,
        value: m.id,
      }))
    );
  };

  useEffect(() => {
    fetchData();
    fetchMaterials();
  }, []);

  /* =========================
     CRUD HANDLERS
  ========================= */
  const handleCreate = async (form: any) => {
    await createStock({
      ...form,
      quantity_in: Number(form.quantity_in),
      quantity_out: Number(form.quantity_out),
    });

    setIsCreateOpen(false);
    fetchData();
  };

  const handleUpdate = async (form: any) => {
    if (!selected) return;

    await updateStock(selected.id, {
      ...form,
      quantity_in: Number(form.quantity_in),
      quantity_out: Number(form.quantity_out),
    });

    setIsUpdateOpen(false);
    setSelected(null);
    fetchData();
  };

  const handleDelete = async () => {
    if (!selected) return;

    await deleteStock(selected.id);

    setIsDeleteOpen(false);
    setSelected(null);
    fetchData();
  };

  /* =========================
     UI DATA (optional clean display)
  ========================= */
  const displayData = data.map((s) => ({
    ...s,
    material_id:
      materials.find((m) => m.id === s.material_id)?.material_name ||
      "Unknown",
  }));

  return (
    <div className="p-6 space-y-4">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Stocks</h1>

        <button
          onClick={() => setIsCreateOpen(true)}
          className="px-4 py-2 btn-sub border border-black/10 py-2 rounded-sm"
        >
          + Add Stock
        </button>
      </div>

      {/* TABLE */}
      <DataTable
        data={displayData}
        loading={loading}
        columns={[
          { key: "material_id", label: "Material" },
          { key: "quantity_in", label: "IN" },
          { key: "quantity_out", label: "OUT" },
          { key: "current_stock", label: "Stock" },
          { key: "reference", label: "Reference" },
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
        title="Create Stock Entry"
        fields={[
          {
            name: "material_id",
            label: "Material",
            type: "select",
            options: materialOptions,
          },
          { name: "quantity_in", label: "Quantity In", type: "number" },
          { name: "quantity_out", label: "Quantity Out", type: "number" },
          { name: "reference", label: "Reference", type: "text" },
        ]}
        onSubmit={handleCreate}
      />

      {/* =========================
         UPDATE MODAL
      ========================= */}
      <UpdateModal
        isOpen={isUpdateOpen}
        onClose={() => setIsUpdateOpen(false)}
        title="Update Stock"
        initialData={selected || {}}
        fields={[
          {
            name: "material_id",
            label: "Material",
            type: "select",
            options: materialOptions,
          },
          { name: "quantity_in", label: "Quantity In", type: "number" },
          { name: "quantity_out", label: "Quantity Out", type: "number" },
          { name: "reference", label: "Reference", type: "text" },
        ]}
        onSubmit={handleUpdate}
      />

      {/* =========================
         DELETE MODAL
      ========================= */}
      <DeleteModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        title="Delete Stock"
        description={`Delete this stock entry?`}
        onConfirm={handleDelete}
      />
    </div>
  );
}