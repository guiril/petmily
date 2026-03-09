'use client';

import { useMemo, useState } from 'react';
import type { FilterCategory, FilterState } from '@/types/filters';
import type { Venue } from '@/types/venue';
import { filterVenues, getDistricts, toggleSetValue } from '@/lib/filter-utils';
import { BottomSheet } from './BottomSheet';
import { Sidebar } from './Sidebar';
import { VenueList } from './VenueList';

const SERVICE_TYPES = ['餐飲', '娛樂', '住宿', '交通', '其他'];
const PET_TYPES = ['犬', '貓', '其他'];

interface VenueLayoutProps {
  venues: Venue[];
}

export const VenueLayout = ({ venues }: VenueLayoutProps) => {
  const [selectedFilters, setSelectedFilters] = useState<FilterState>({
    serviceTypes: new Set(),
    petTypes: new Set(),
    districts: new Set(),
  });

  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const districts = useMemo(() => getDistricts(venues), [venues]);
  const filteredVenues = useMemo(() => filterVenues(venues, selectedFilters), [
    venues,
    selectedFilters,
  ]);

  const categories = useMemo<FilterCategory[]>(
    () => [
      { key: 'serviceTypes', title: '服務類型', options: SERVICE_TYPES },
      { key: 'petTypes', title: '寵物種類', options: PET_TYPES },
      { key: 'districts', title: '行政區', options: districts },
    ],
    [districts],
  );

  const handleToggle = (category: keyof FilterState, value: string) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [category]: toggleSetValue(prev[category], value),
    }));
  };

  return (
    <div className="flex flex-1 overflow-hidden">
      <div className="hidden md:flex">
        <Sidebar
          categories={categories}
          selectedFilters={selectedFilters}
          onToggle={handleToggle}
        />
      </div>
      <VenueList
        venues={filteredVenues}
        totalCount={venues.length}
        onOpenSheet={() => setIsSheetOpen(true)}
      />
      <BottomSheet
        isOpen={isSheetOpen}
        onClose={() => setIsSheetOpen(false)}
        categories={categories}
        selectedFilters={selectedFilters}
        onToggle={handleToggle}
      />
    </div>
  );
};
