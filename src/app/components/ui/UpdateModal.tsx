import { useEffect, useState } from "react";
import Modal from "./Modal";

export default function UpdateModal({
  isOpen,
  onClose,
  title,
  fields,
  initialData,
  onSubmit,
}: any) {
  const [form, setForm] = useState<any>({});

  const handleChange = (key: string, value: any) => {
    setForm({ ...form, [key]: value });
  };

  useEffect(() => {
    if (initialData) setForm(initialData);
  }, [initialData]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="space-y-4">
        {fields.map((f: any) => (
          <div key={f.name}>
            <label className="text-sm text-gray-600">{f.label}</label>
            {f.type === "select" ? (
              <select
                className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                value={form[f.name] ?? ""}
                onChange={(e) => handleChange(f.name, e.target.value)}
              >
                <option value="">Select {f.label}</option>

                {f.options?.map((opt: any, idx: number) => {
                  const value = typeof opt === "object" ? opt.value : opt;
                  const label = typeof opt === "object" ? opt.label : opt;

                  return (
                    <option key={value ?? idx} value={value}>
                      {label}
                    </option>
                  );
                })}
              </select>
            ) : (
              <input
                className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                type={f.type || "text"}
                value={form[f.name] ?? ""}
                onChange={(e) => handleChange(f.name, e.target.value)}
              />
            )}
          </div>
        ))}

        <div className="flex justify-end gap-2 pt-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-100 rounded-lg">
            Cancel
          </button>

          <button
            onClick={() => onSubmit(form)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Update
          </button>
        </div>
      </div>
    </Modal>
  );
}