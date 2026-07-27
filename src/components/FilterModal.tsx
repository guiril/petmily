'use client';

import Image from 'next/image';
import { DialogTitle } from '@headlessui/react';
import type { FilterState } from '@/types/filters';
import { AVAILABLE_CITIES } from '@/lib/cities';
import { getFilterConfigs } from '@/lib/filters';
import { Modal } from '@/components/common/Modal';
import { FilterSection } from './FilterSection';

interface FilterModalProps {
  isOpen: boolean;
  currentCity: string;
  selectedFilters: FilterState;
  selectedCityDistricts: Record<string, Set<string>>;
  filteredCount: number;
  onClose: () => void;
  onClearAllFilters: () => void;
  onToggle: (category: keyof FilterState, value: string) => void;
  onToggleCityDistrict: (city: string, district: string) => void;
}

export const FilterModal = ({
  isOpen,
  currentCity,
  selectedFilters,
  selectedCityDistricts,
  filteredCount,
  onClose,
  onClearAllFilters,
  onToggle,
  onToggleCityDistrict,
}: FilterModalProps) => {
  const filterConfigs = getFilterConfigs(currentCity);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      panelClassName="w-full max-w-xl max-h-[80vh] flex flex-col overflow-hidden p-0"
    >
      <div className="relative shrink-0 px-6 pt-6 pb-4 flex justify-center items-center border-b border-stone-200">
        <DialogTitle className="text-lg font-semibold leading-5.5 -tracking-[0.43px] text-ink">
          篩選條件
        </DialogTitle>
        <button
          type="button"
          className="absolute right-4 top-4 cursor-pointer"
          onClick={onClose}
        >
          <Image src="/images/close.svg" width={30} height={30} alt="" />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto px-6">
        <div className="flex flex-col">
          {AVAILABLE_CITIES.filter(({ key }) => key === currentCity).map(
            ({ key, name, districts }) => (
              <FilterSection
                key={key}
                name={name}
                options={districts}
                selected={selectedCityDistricts[key] ?? new Set<string>()}
                onToggle={(value) => onToggleCityDistrict(key, value)}
              />
            ),
          )}
          {filterConfigs.map(({ key, name, options }) => (
            <FilterSection
              key={key}
              name={name}
              options={options}
              selected={selectedFilters[key]}
              onToggle={(value) => onToggle(key, value)}
            />
          ))}
        </div>
      </div>
      <div className="shrink-0 flex justify-center items-center gap-5 px-6 py-4 border-t border-stone-200 bg-stone-100">
        <button
          type="button"
          className="text-[13px] leading-4.5 tracking-[0.2px] text-ink-muted underline underline-offset-2 cursor-pointer"
          onClick={onClearAllFilters}
        >
          全部清除
        </button>
        <button
          type="button"
          className="py-3.5 flex-1 max-w-70 text-base font-semibold text-center text-ink bg-[#FFA940] rounded-[30px] cursor-pointer"
          onClick={onClose}
        >
          顯示 {filteredCount} 間店家
        </button>
      </div>
    </Modal>
  );
};
