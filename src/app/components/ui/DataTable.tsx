import { useMemo, useState } from "react";
import { Pencil, Trash2, ArrowUpDown, ArrowUp, ArrowDown, Search } from "lucide-react";

type Column = {
  key: string;
  label: string;
};

type Props<T> = {
  data: T[];
  columns: Column[];
  loading?: boolean;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
};

export default function DataTable<T extends Record<string, any>>({
  data,
  columns,
  loading,
  onEdit,
  onDelete,
}: Props<T>) {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const processedData = useMemo(() => {
    let filtered = data;

    // 🔍 SEARCH
    if (search.trim()) {
      filtered = filtered.filter((row) =>
        columns.some((col) =>
          String(row[col.key])
            .toLowerCase()
            .includes(search.toLowerCase())
        )
      );
    }

    // ↕️ SORT
    if (sortKey) {
      filtered = [...filtered].sort((a, b) => {
        const aVal = a[sortKey];
        const bVal = b[sortKey];

        if (aVal < bVal) return sortOrder === "asc" ? -1 : 1;
        if (aVal > bVal) return sortOrder === "asc" ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [data, search, sortKey, sortOrder, columns]);

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const hasActions = Boolean(onEdit || onDelete);

  return (
    <div className="card overflow-hidden">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2 p-3 border-b-2 border-ink bg-[#F4F9FA]">
        <div className="relative flex-1 min-w-[180px] max-w-sm">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" aria-hidden="true" />
          <label htmlFor="table-search" className="sr-only">
            Search
          </label>
          <input
            id="table-search"
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="field field-round h-9 pl-8 text-[13px] border-[1.5px]"
          />
        </div>
        <span className="label text-[10px] text-muted ml-auto">
          {loading ? "Loading" : `${processedData.length} of ${data.length}`}
        </span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-[13px] tabular-nums">
          <thead>
            <tr className="border-b-2 border-ink">
              {columns.map((col) => {
                const active = sortKey === col.key;
                const SortIcon = !active ? ArrowUpDown : sortOrder === "asc" ? ArrowUp : ArrowDown;
                return (
                  <th
                    key={col.key}
                    aria-sort={active ? (sortOrder === "asc" ? "ascending" : "descending") : undefined}
                    className="text-left font-normal p-0"
                  >
                    <button
                      onClick={() => handleSort(col.key)}
                      className="label text-[10px] w-full flex items-center gap-1 px-3.5 py-2.5 hover:bg-paper whitespace-nowrap"
                    >
                      {col.label}
                      <SortIcon size={11} className={active ? "" : "opacity-40"} />
                    </button>
                  </th>
                );
              })}

              {hasActions && (
                <th className="px-3.5 py-2.5">
                  <span className="sr-only">Actions</span>
                </th>
              )}
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={columns.length + 1} className="text-center py-8 text-muted label text-[10px]">
                  Loading...
                </td>
              </tr>
            ) : processedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 1} className="text-center py-8 text-muted text-sm">
                  {search ? `Nothing matches "${search}".` : "No records yet."}
                </td>
              </tr>
            ) : (
              processedData.map((row, i) => (
                <tr key={i} className="border-b-[1.5px] border-rule last:border-b-0 hover:bg-paper transition-colors">
                  {columns.map((col, ci) => (
                    <td
                      key={col.key}
                      className={`px-3.5 py-2.5 whitespace-nowrap ${ci === 0 ? "font-semibold" : "text-[#3B3934]"}`}
                    >
                      {row[col.key] ?? "—"}
                    </td>
                  ))}

                  {hasActions && (
                    <td className="px-2 py-1">
                      <div className="flex justify-end gap-0.5">
                        {onEdit && (
                          <button
                            onClick={() => onEdit(row)}
                            className="inline-grid place-items-center w-8 h-8 rounded-lg border-[1.5px] border-transparent hover:border-ink hover:bg-white"
                            aria-label="Edit"
                            title="Edit"
                          >
                            <Pencil size={15} />
                          </button>
                        )}

                        {onDelete && (
                          <button
                            onClick={() => onDelete(row)}
                            className="inline-grid place-items-center w-8 h-8 rounded-lg border-[1.5px] border-transparent text-[#A3362E] hover:border-ink hover:bg-blush"
                            aria-label="Delete"
                            title="Delete"
                          >
                            <Trash2 size={15} />
                          </button>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
