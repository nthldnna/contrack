import { Plus } from "lucide-react";

export default function PageHeader({
  section = "Workspace",
  title,
  count,
  actionLabel,
  onAction,
}: {
  section?: string;
  title: string;
  count?: number;
  actionLabel?: string;
  onAction?: () => void;
}) {
  return (
    <div className="flex flex-wrap justify-between items-end gap-3">
      <div className="flex flex-col gap-1">
        <span className="label text-[10px] text-muted">
          {section} / {title}
        </span>
        <h1 className="font-serif lowercase text-[clamp(34px,3.6vw,46px)] leading-[0.95] tracking-[-0.035em] flex items-center gap-2.5">
          {title}
          {count !== undefined && (
            <span className="font-display font-extrabold text-base tracking-normal bg-butter border-2 border-ink rounded-full px-2.5 py-0.5 tabular-nums">
              {count}
            </span>
          )}
        </h1>
      </div>

      {actionLabel && onAction && (
        <button onClick={onAction} className="pill pill-dark">
          <Plus size={16} strokeWidth={2.5} />
          {actionLabel}
        </button>
      )}
    </div>
  );
}
