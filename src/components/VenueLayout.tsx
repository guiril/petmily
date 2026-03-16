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

const PAGE_SIZE = 10;

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
  const [currentPage, setCurrentPage] = useState(1);

  const districts = useMemo(() => getDistricts(venues), [venues]);
  const filteredVenues = useMemo(() => filterVenues(venues, selectedFilters), [
    venues,
    selectedFilters,
  ]);

  const totalPages = Math.ceil(filteredVenues.length / PAGE_SIZE);
  const paginatedVenues = filteredVenues.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

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
    setCurrentPage(1);
    setSelectedFilters((prev) => ({
      ...prev,
      [category]: toggleSetValue(prev[category], value),
    }));
  };

  const handleClearAll = () => {
    setCurrentPage(1);
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
        venues={paginatedVenues}
        filteredCount={filteredVenues.length}
        totalCount={venues.length}
        currentPage={currentPage}
        totalPages={totalPages}
        selectedFilters={selectedFilters}
        onOpenSheet={() => setIsSheetOpen(true)}
        onRemoveFilter={handleToggle}
        onClearAllFilters={handleClearAll}
        onPageChange={setCurrentPage}
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
