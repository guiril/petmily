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
    <div className="flex flex-wrap items-center gap-1.5 border-b border-orange-100 bg-orange-50 px-4 py-2">
      {tags.map(({ category, value }) => (
        <button
          key={`${category}-${value}`}
          onClick={() => onRemove(category, value)}
          className="flex cursor-pointer items-center gap-1 rounded-full bg-orange-200 px-2.5 py-1 text-sm text-orange-800 hover:bg-orange-300"
        >
          {value}
          <span aria-hidden>×</span>
        </button>
      ))}
      <button
        onClick={onClearAll}
        className="cursor-pointer text-sm text-orange-400 hover:text-orange-600"
      >
        清除全部
      </button>
    </div>
  );
};
