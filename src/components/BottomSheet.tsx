'use client';

import type { FilterCategory, FilterState } from '@/types/filters';
import { FilterSection } from './FilterSection';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  categories: FilterCategory[];
  selectedFilters: FilterState;
  onToggle: (category: keyof FilterState, value: string) => void;
}

export const BottomSheet = ({
  isOpen,
  onClose,
  categories,
  selectedFilters,
  onToggle,
}: BottomSheetProps) => {
  const backdrop = (
    <div
      className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
        isOpen ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={onClose}
    />
  );

  return (
    <div
      className={`fixed inset-0 z-50 md:hidden ${
        isOpen ? '' : 'pointer-events-none'
      }`}
    >
      {backdrop}
      <div
        className={`absolute bottom-0 left-0 right-0 max-h-[80vh] overflow-y-auto rounded-t-2xl bg-orange-50 p-5 transition-transform duration-300 ${
          isOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="mb-4 flex items-center justify-between">
          <span className="text-sm font-semibold text-orange-900">篩選</span>
          <button onClick={onClose} className="text-sm text-orange-400">
            關閉
          </button>
        </div>
        <div className="flex flex-col divide-y divide-orange-100">
          {categories.map(({ key, title, options }) => (
            <div key={key} className="py-4">
              <FilterSection
                title={title}
                options={options}
                selected={selectedFilters[key]}
                onToggle={(value) => onToggle(key, value)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
