"use client";

import { useEffect, useState } from "react";
import DataTable from "@/src/app/components/ui/DataTable";
import CreateModal from "@/src/app/components/ui/CreateModal";
import UpdateModal from "@/src/app/components/ui/UpdateModal";
import DeleteModal from "@/src/app/components/ui/DeleteModal";

import {
  getUnits,
  createUnit,
  updateUnit,
  deleteUnit,
  Unit,
} from "@/src/lib/modules/units";

export default function UnitsPage() {
  const [data, setData] = useState<Unit[]>([]);
  const [loading, setLoading] = useState(true);

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const [selected, setSelected] = useState<Unit | null>(null);

  // load data
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await getUnits();
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
    await createUnit(form);
    setIsCreateOpen(false);
    fetchData();
  };

  // UPDATE
  const handleUpdate = async (form: any) => {
    if (!selected) return;
    await updateUnit(selected.id, form);
    setIsUpdateOpen(false);
    setSelected(null);
    fetchData();
  };

  // DELETE
  const handleDelete = async () => {
    if (!selected) return;
    await deleteUnit(selected.id);
    setIsDeleteOpen(false);
    setSelected(null);
    fetchData();
  };

  return (
    <div className="p-6 space-y-4">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Unit</h1>

        <button
          onClick={() => setIsCreateOpen(true)}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          + Add Unit
        </button>
      </div>

      {/* TABLE */}
      <DataTable
        data={data}
        loading={loading}
        columns={[
          { key: "name", label: "Name" },
          { key: "description", label: "Description" },
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
        title="Create Unit"
        fields={[
          { name: "name", label: "Name", type: "text" },
          { name: "description", label: "Description", type: "text" },
        ]}
        onSubmit={handleCreate}
      />

      {/* UPDATE MODAL */}
      <UpdateModal
        isOpen={isUpdateOpen}
        onClose={() => setIsUpdateOpen(false)}
        title="Update Unit"
        initialData={selected || {}}
        fields={[
          { name: "name", label: "Name", type: "text" },
          { name: "description", label: "Description", type: "text" },
        ]}
        onSubmit={handleUpdate}
      />

      {/* DELETE MODAL */}
      <DeleteModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        title="Delete Unit"
        description={`Are you sure you want to delete "${
          selected?.name || ""
        }"?`}
        onConfirm={handleDelete}
      />
    </div>
  );
}