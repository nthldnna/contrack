"use client";

import { useEffect, useState } from "react";

import DataTable from "@/src/app/components/ui/DataTable";
import CreateModal from "@/src/app/components/ui/CreateModal";
import UpdateModal from "@/src/app/components/ui/UpdateModal";
import DeleteModal from "@/src/app/components/ui/DeleteModal";

import {
  getSuppliers,
  createSupplier,
  updateSupplier,
  deleteSupplier,
  Supplier,
} from "@/src/lib/modules/suppliers";

export default function SuppliersPage() {
  const [data, setData] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const [selected, setSelected] = useState<Supplier | null>(null);

  // FETCH
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await getSuppliers();
      setData(res);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // CREATE
  const handleCreate = async (form: any) => {
    await createSupplier(form);
    setIsCreateOpen(false);
    fetchData();
  };

  // UPDATE
  const handleUpdate = async (form: any) => {
    if (!selected) return;
    await updateSupplier(selected.id, form);
    setIsUpdateOpen(false);
    setSelected(null);
    fetchData();
  };

  // DELETE
  const handleDelete = async () => {
    if (!selected) return;
    await deleteSupplier(selected.id);
    setIsDeleteOpen(false);
    setSelected(null);
    fetchData();
  };

  return (
    <div className="p-6 space-y-4">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h1 className="text-xl font-semibold">Suppliers</h1>

        <button
          onClick={() => setIsCreateOpen(true)}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          + Add Supplier
        </button>
      </div>

      {/* TABLE */}
      <DataTable
        data={data}
        loading={loading}
        columns={[
          { key: "name", label: "Supplier" },
          { key: "contact_person", label: "Contact Person" },
          { key: "phone_number", label: "Phone" },
          { key: "email", label: "Email" },
          { key: "address", label: "Address" },
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

      {/* CREATE MODAL */}
      <CreateModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        title="Create Supplier"
        fields={[
          { name: "name", label: "Supplier Name", type: "text" },
          { name: "contact_person", label: "Contact Person", type: "text" },
          { name: "phone_number", label: "Phone Number", type: "text" },
          { name: "email", label: "Email", type: "email" },
          { name: "address", label: "Address", type: "text" },
        ]}
        onSubmit={handleCreate}
      />

      {/* UPDATE MODAL */}
      <UpdateModal
        isOpen={isUpdateOpen}
        onClose={() => setIsUpdateOpen(false)}
        title="Update Supplier"
        initialData={selected || {}}
        fields={[
          { name: "name", label: "Supplier Name", type: "text" },
          { name: "contact_person", label: "Contact Person", type: "text" },
          { name: "phone_number", label: "Phone Number", type: "text" },
          { name: "email", label: "Email", type: "email" },
          { name: "address", label: "Address", type: "text" },
        ]}
        onSubmit={handleUpdate}
      />

      {/* DELETE MODAL */}
      <DeleteModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        title="Delete Supplier"
        description={`Are you sure you want to delete "${
          selected?.name || ""
        }"?`}
        onConfirm={handleDelete}
      />
    </div>
  );
}