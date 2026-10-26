import Modal from "./Modal";

export default function DeleteModal({
  isOpen,
  onClose,
  title,
  description,
  onConfirm,
}: any) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} tone="butter">
      <p className="text-sm leading-relaxed text-[#3B3934] mb-5">{description}</p>

      <div className="flex justify-end gap-2">
        <button onClick={onClose} className="pill pill-flat">
          Cancel
        </button>

        <button onClick={onConfirm} className="pill bg-[#A3362E] text-white">
          Delete
        </button>
      </div>
    </Modal>
  );
}
