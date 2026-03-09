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
    <aside className="flex w-44 shrink-0 flex-col gap-5 overflow-y-auto border-r border-gray-200 bg-white p-4">
      {categories.map(({ key, title, options }) => (
        <FilterSection
          key={key}
          title={title}
          options={options}
          selected={selectedFilters[key]}
          onToggle={(value) => onToggle(key, value)}
        />
      ))}
    </aside>
  );
};
