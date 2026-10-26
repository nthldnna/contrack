import { useState } from "react";
import Modal from "./Modal";

export default function CreateModal({
  isOpen,
  onClose,
  title,
  fields,
  onSubmit,
}: any) {
  const [form, setForm] = useState<any>({});

  const handleChange = (key: string, value: any) => {
    setForm({ ...form, [key]: value });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="space-y-3">

        {fields.map((f: any) => (
          <div key={f.name}>
            <label htmlFor={`field-${f.name}`} className="field-label">
              {f.label}
            </label>

            {/* =========================
                SELECT FIELD
            ========================= */}
            {f.type === "select" ? (
              <select
                id={`field-${f.name}`}
                className="field"
                value={form[f.name] || ""}
                onChange={(e) => handleChange(f.name, e.target.value)}
              >
                <option value="">Select {f.label}</option>

                {f.options?.map((opt: any) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            ) : (
              <input
                id={`field-${f.name}`}
                className="field"
                type={f.type || "text"}
                value={form[f.name] || ""}
                onChange={(e) => handleChange(f.name, e.target.value)}
              />
            )}
          </div>
        ))}

        {/* ACTIONS */}
        <div className="flex justify-end gap-2 pt-3">
          <button onClick={onClose} className="pill pill-flat">
            Cancel
          </button>

          <button
            onClick={() => onSubmit(form)}
            className="pill pill-dark"
          >
            Create
          </button>
        </div>
      </div>
    </Modal>
  );
}