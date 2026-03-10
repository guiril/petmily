'use client';

import { useMemo, useState } from 'react';
import type { FilterCategory, FilterState } from '@/types/filters';
import type { Venue } from '@/types/venue';
import {
  FILTER_CONFIGS,
  filterVenues,
  getDistricts,
  toggleSetValue,
} from '@/lib/filter-utils';
import { BottomSheet } from './BottomSheet';
import { Sidebar } from './Sidebar';
import { VenueList } from './VenueList';

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
    () =>
      FILTER_CONFIGS.map(({ key, title, staticOptions }) => ({
        key,
        title,
        options: staticOptions ?? districts,
      })),
    [districts],
  );

  const handleToggle = (category: keyof FilterState, value: string) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [category]: toggleSetValue(prev[category], value),
    }));
  };

  const handleClearAll = () => {
    setSelectedFilters({
      serviceTypes: new Set(),
      petTypes: new Set(),
      districts: new Set(),
    });
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
        selectedFilters={selectedFilters}
        onOpenSheet={() => setIsSheetOpen(true)}
        onRemoveFilter={handleToggle}
        onClearAllFilters={handleClearAll}
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
