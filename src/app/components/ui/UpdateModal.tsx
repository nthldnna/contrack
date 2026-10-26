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
      <div className="space-y-3">
        {fields.map((f: any) => (
          <div key={f.name}>
            <label htmlFor={`field-${f.name}`} className="field-label">{f.label}</label>
            {f.type === "select" ? (
              <select
                id={`field-${f.name}`}
                className="field"
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
                id={`field-${f.name}`}
                className="field"
                type={f.type || "text"}
                value={form[f.name] ?? ""}
                onChange={(e) => handleChange(f.name, e.target.value)}
              />
            )}
          </div>
        ))}

        <div className="flex justify-end gap-2 pt-3">
          <button onClick={onClose} className="pill pill-flat">
            Cancel
          </button>

          <button
            onClick={() => onSubmit(form)}
            className="pill pill-dark"
          >
            Update
          </button>
        </div>
      </div>
    </Modal>
  );
}