import type { FilterCategory, FilterState } from '@/types/filters';
import { FilterSection } from './FilterSection';

interface SidebarProps {
  categories: FilterCategory[];
  selectedFilters: FilterState;
  onToggle: (category: keyof FilterState, value: string) => void;
}

export const Sidebar = ({
  categories,
  selectedFilters,
  onToggle,
}: SidebarProps) => {
  return (
    <aside className="flex w-56 shrink-0 flex-col divide-y divide-orange-100 overflow-y-auto border-r border-orange-200 bg-orange-50">
      {categories.map(({ key, title, options }) => (
        <div key={key} className="px-4 py-4">
          <FilterSection
            title={title}
            options={options}
            selected={selectedFilters[key]}
            onToggle={(value) => onToggle(key, value)}
          />
        </div>
      ))}
    </aside>
  );
};
