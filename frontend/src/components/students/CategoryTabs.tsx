import type { Category } from "../../types/category";

export default function CategoryTabs({
  categories,
  selectedCategoryId,
  onSelect,
}: {
  categories: Category[];
  selectedCategoryId: string | null; // null = All
  onSelect: (categoryId: string | null) => void;
}) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      <button
        type="button"
        onClick={() => onSelect(null)}
        className={`shrink-0 px-4 py-2 rounded-xl text-sm font-semibold transition
          ${selectedCategoryId === null
            ? "bg-blue-600 text-white shadow"
            : "bg-white/70 backdrop-blur-xl border border-gray-200 text-gray-700 hover:bg-white"
          }`}
      >
        All
      </button>

      {categories.map((cat) => (
        <button
          key={cat.id}
          type="button"
          onClick={() => onSelect(cat.id)}
          className={`shrink-0 px-4 py-2 rounded-xl text-sm font-semibold transition
            ${selectedCategoryId === cat.id
              ? "bg-blue-600 text-white shadow"
              : "bg-white/70 backdrop-blur-xl border border-gray-200 text-gray-700 hover:bg-white"
            }`}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
}
