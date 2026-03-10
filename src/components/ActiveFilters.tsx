import { FILTER_CONFIGS } from '@/lib/filter-utils';
import type { FilterState } from '@/types/filters';

interface ActiveFiltersProps {
  selectedFilters: FilterState;
  onRemove: (category: keyof FilterState, value: string) => void;
  onClearAll: () => void;
}

export const ActiveFilters = ({
  selectedFilters,
  onRemove,
  onClearAll,
}: ActiveFiltersProps) => {
  const tags = FILTER_CONFIGS.flatMap(({ key }) =>
    [...selectedFilters[key]].map((value) => ({ category: key, value })),
  );

  if (tags.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-1.5 border-b border-gray-100 bg-white px-4 py-2">
      {tags.map(({ category, value }) => (
        <button
          key={`${category}-${value}`}
          onClick={() => onRemove(category, value)}
          className="flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-700 hover:bg-gray-200"
        >
          {value}
          <span aria-hidden>×</span>
        </button>
      ))}
      <button
        onClick={onClearAll}
        className="text-xs text-gray-400 hover:text-gray-600"
      >
        清除全部
      </button>
    </div>
  );
};
