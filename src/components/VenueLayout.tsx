'use client';

import { useMemo, useState } from 'react';
import type { FilterState } from '@/types/filters';
import type { Venue } from '@/types/venue';
import { FILTER_CONFIGS, filterVenues } from '@/lib/filters';
import { toggleSetValue } from '@/lib/utils';
import { BottomSheet } from './BottomSheet';
import { Sidebar } from './Sidebar';
import { VenueList } from './VenueList';

const PAGE_SIZE = 8;

interface VenueLayoutProps {
  venues: Venue[];
}

export const VenueLayout = ({ venues }: VenueLayoutProps) => {
  const [selectedFilters, setSelectedFilters] = useState<FilterState>({
    serviceTypes: new Set(),
    petTypes: new Set(),
  });

  const [selectedCityDistricts, setSelectedCityDistricts] = useState<
    Record<string, Set<string>>
  >({});

  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredVenues = useMemo(
    () => filterVenues(venues, selectedFilters, selectedCityDistricts),
    [venues, selectedFilters, selectedCityDistricts],
  );

  const totalPages = Math.ceil(filteredVenues.length / PAGE_SIZE);
  const paginatedVenues = filteredVenues.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  const handleToggle = (category: keyof FilterState, value: string) => {
    setCurrentPage(1);
    setSelectedFilters((prev) => ({
      ...prev,
      [category]: toggleSetValue(prev[category], value),
    }));
  };

  const handleToggleCityDistrict = (city: string, district: string) => {
    setCurrentPage(1);
    setSelectedCityDistricts((prev) => ({
      ...prev,
      [city]: toggleSetValue(prev[city] ?? new Set(), district),
    }));
  };

  const handleClearAll = () => {
    setCurrentPage(1);
    setSelectedFilters({
      serviceTypes: new Set(),
      petTypes: new Set(),
    });
    setSelectedCityDistricts({});
  };

  return (
    <div className="flex flex-1 overflow-hidden">
      <div className="max-md:hidden flex">
        <Sidebar
          categories={FILTER_CONFIGS}
          selectedFilters={selectedFilters}
          selectedCityDistricts={selectedCityDistricts}
          onClearAllFilters={handleClearAll}
          onToggle={handleToggle}
          onToggleCityDistrict={handleToggleCityDistrict}
        />
      </div>
      <VenueList
        venues={paginatedVenues}
        filteredCount={filteredVenues.length}
        totalCount={venues.length}
        currentPage={currentPage}
        totalPages={totalPages}
        onOpenSheet={() => setIsSheetOpen(true)}
        onPageChange={setCurrentPage}
      />
      <BottomSheet
        isOpen={isSheetOpen}
        categories={FILTER_CONFIGS}
        selectedFilters={selectedFilters}
        selectedCityDistricts={selectedCityDistricts}
        filteredCount={filteredVenues.length}
        onClose={() => setIsSheetOpen(false)}
        onClearAllFilters={handleClearAll}
        onToggle={handleToggle}
        onToggleCityDistrict={handleToggleCityDistrict}
      />
    </div>
  );
};
