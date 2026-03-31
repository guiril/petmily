'use client';

import Image from 'next/image';
import type { FilterCategory, FilterState } from '@/types/filters';
import { CITIES } from '@/lib/cities';
import { FilterSection } from './FilterSection';

interface BottomSheetProps {
  isOpen: boolean;
  categories: FilterCategory[];
  selectedFilters: FilterState;
  selectedCityDistricts: Record<string, Set<string>>;
  filteredCount: number;
  onClose: () => void;
  onClearAllFilters: () => void;
  onToggle: (category: keyof FilterState, value: string) => void;
  onToggleCityDistrict: (city: string, district: string) => void;
}

export const BottomSheet = ({
  isOpen,
  categories,
  selectedFilters,
  selectedCityDistricts,
  filteredCount,
  onClose,
  onClearAllFilters,
  onToggle,
  onToggleCityDistrict,
}: BottomSheetProps) => {
  return (
    <>
      <div
        className={`fixed inset-0 z-50 hidden max-md:block ${
          isOpen ? '' : 'pointer-events-none'
        }`}
      >
        <div
          className={`absolute inset-0 bg-black/60 transition-opacity duration-300 ${
            isOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={onClose}
        />
        <div
          className={`h-[82.63vh] pt-2.75 absolute bottom-0 left-0 right-0 flex flex-col rounded-t-2xl bg-white/98 transition-transform duration-300 ${
            isOpen ? 'translate-y-0' : 'translate-y-full'
          }`}
        >
          <div className="relative h-12.5 px-4 pt-4 pb-3 mb-3 flex justify-center items-end shrink-0">
            <span className="text-lg font-semibold leading-5.5 -tracking-[0.43px] text-[#0C0A09]">
              篩選
            </span>
            <button
              type="button"
              className="absolute top-3 right-4"
              onClick={onClose}
            >
              <Image src="/images/close.svg" width={30} height={30} alt="" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-4 pb-29.75">
            <div className="flex flex-col">
              <FilterSection
                title="台中市"
                options={
                  CITIES.find((city) => city.key === 'taichung')?.districts ??
                  []
                }
                selected={
                  selectedCityDistricts['taichung'] ?? new Set<string>()
                }
                onToggle={(value) => onToggleCityDistrict('taichung', value)}
              />
              {categories.map(({ key, title, options }) => (
                <FilterSection
                  key={key}
                  title={title}
                  options={options}
                  selected={selectedFilters[key]}
                  onToggle={(value) => onToggle(key, value)}
                />
              ))}
            </div>
          </div>
        </div>
        <div
          className={`pt-4 pb-8.5 px-4 gap-5 absolute inset-x-0 bottom-0 z-51 flex justify-center items-center border-t border-[#E7E5E4] bg-[#F5F5F4] transition-transform duration-300 ${
            isOpen ? 'translate-y-0' : 'translate-y-full'
          }`}
        >
          <button
            type="button"
            className="text-[13px] leading-4.5 trackcking-[0.2px] text-[#79716B] underline underline-offset-2 cursor-pointer"
            onClick={onClearAllFilters}
          >
            全部清除
          </button>
          <span className="py-3.5 flex-1 text-base font-semibold text-center text-[#0C0A09] bg-[#FFA940] rounded-[30px]">
            目前顯示 {filteredCount} 間店家
          </span>
        </div>
      </div>
    </>
  );
};
