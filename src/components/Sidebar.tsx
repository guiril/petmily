import type { FilterState } from '@/types/filters';
import { FilterSection } from './FilterSection';

interface SidebarProps {
  selectedFilters: FilterState;
  serviceTypes: string[];
  petTypes: string[];
  districts: string[];
  onToggle: (category: keyof FilterState, value: string) => void;
}

export const Sidebar = ({
  selectedFilters,
  serviceTypes,
  petTypes,
  districts,
  onToggle,
}: SidebarProps) => {
  return (
    <aside className="flex w-44 shrink-0 flex-col gap-5 overflow-y-auto border-r border-gray-200 bg-white p-4">
      <FilterSection
        title="服務類型"
        options={serviceTypes}
        selected={selectedFilters.serviceTypes}
        onToggle={(value) => onToggle('serviceTypes', value)}
      />
      <FilterSection
        title="寵物種類"
        options={petTypes}
        selected={selectedFilters.petTypes}
        onToggle={(value) => onToggle('petTypes', value)}
      />
      <FilterSection
        title="行政區"
        options={districts}
        selected={selectedFilters.districts}
        onToggle={(value) => onToggle('districts', value)}
      />
    </aside>
  );
};
