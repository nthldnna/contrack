"use client";

import { useEffect, useState } from "react";
import DataTable from "@/src/app/components/ui/DataTable";
import CreateModal from "@/src/app/components/ui/CreateModal";
import UpdateModal from "@/src/app/components/ui/UpdateModal";
import DeleteModal from "@/src/app/components/ui/DeleteModal";

import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  Category,
} from "@/src/lib/modules/categories";

export default function CategoriesPage() {
  const [data, setData] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const [selected, setSelected] = useState<Category | null>(null);

  // load data
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await getCategories();
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
    await createCategory(form);
    setIsCreateOpen(false);
    fetchData();
  };

  // UPDATE
  const handleUpdate = async (form: any) => {
    if (!selected) return;
    await updateCategory(selected.id, form);
    setIsUpdateOpen(false);
    setSelected(null);
    fetchData();
  };

  // DELETE
  const handleDelete = async () => {
    if (!selected) return;
    await deleteCategory(selected.id);
    setIsDeleteOpen(false);
    setSelected(null);
    fetchData();
  };

  return (
    <div className="p-6 space-y-4">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Categories</h1>

        <button
          onClick={() => setIsCreateOpen(true)}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          + Add Category
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
        title="Create Category"
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
        title="Update Category"
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
        title="Delete Category"
        description={`Are you sure you want to delete "${
          selected?.name || ""
        }"?`}
        onConfirm={handleDelete}
      />
    </div>
  );
}