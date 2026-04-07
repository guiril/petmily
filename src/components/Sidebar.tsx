'use client';

import Image from 'next/image';
import type { FilterCategory, FilterState } from '@/types/filters';
import { CITIES } from '@/lib/cities';
import { FilterSection } from './FilterSection';

interface SidebarProps {
  categories: FilterCategory[];
  selectedFilters: FilterState;
  selectedCityDistricts: Record<string, Set<string>>;
  onClearAllFilters: () => void;
  onToggle: (category: keyof FilterState, value: string) => void;
  onToggleCityDistrict: (city: string, district: string) => void;
}

export const Sidebar = ({
  categories,
  selectedFilters,
  selectedCityDistricts,
  onClearAllFilters,
  onToggle,
  onToggleCityDistrict,
}: SidebarProps) => {
  return (
    <aside className="w-65 px-4 flex shrink-0 flex-col border-r border-orange-200 bg-white overflow-y-hidden hover:overflow-y-auto [scrollbar-gutter:stable]">
      <div className="pt-6 pb-4 flex justify-between items-center">
        <p className="text-lg font-bold leading-5.5 -tracking-[0.43px] text-ink-heading">
          篩選
        </p>
        <button
          className="text-[13px] leading-4.5 tracking-[0.2px] text-[#A6A09B] cursor-pointer underline underline-offset-2"
          onClick={() => onClearAllFilters()}
        >
          全部清除
        </button>
      </div>
      <FilterSection
        name="台中市"
        options={
          CITIES.find((city) => city.key === 'taichung')?.districts ?? []
        }
        selected={selectedCityDistricts['taichung'] ?? new Set<string>()}
        onToggle={(value) => onToggleCityDistrict('taichung', value)}
      />
      {categories.map(({ key, name, options }) => (
        <FilterSection
          key={key}
          name={name}
          options={options}
          selected={selectedFilters[key]}
          onToggle={(value) => onToggle(key, value)}
        />
      ))}
    </aside>
  );
};
