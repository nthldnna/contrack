import { useEffect } from "react";
import { X } from "lucide-react";

export default function Modal({
  isOpen,
  onClose,
  children,
  title,
  tone = "blush",
}: {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  tone?: "blush" | "butter" | "powder";
}) {
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const frame = { blush: "bg-blush", butter: "bg-butter", powder: "bg-powder" }[tone];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* backdrop */}
      <div className="absolute inset-0 bg-ink/40" onClick={onClose} />

      {/* modal box */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={`relative w-full max-w-md max-h-[90vh] overflow-y-auto ${frame} border-2 border-ink rounded-[20px] p-2 card-raised pop-in`}
      >
        <div className="bg-white border-2 border-ink rounded-[14px] p-5">
          <div className="flex justify-between items-start gap-3 mb-4">
            {title && (
              <h2 className="font-serif lowercase text-[28px] leading-none tracking-[-0.03em]">{title}</h2>
            )}
            <button
              onClick={onClose}
              aria-label="Close"
              className="ml-auto inline-grid place-items-center w-8 h-8 rounded-lg border-[1.5px] border-transparent hover:border-ink"
            >
              <X size={17} strokeWidth={2.5} />
            </button>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}
