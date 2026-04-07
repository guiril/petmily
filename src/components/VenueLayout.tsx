'use client';

import { useState } from 'react';
import type { Venue } from '@/types/venue';
import { FILTER_CONFIGS } from '@/lib/filters';
import { BottomSheet } from './BottomSheet';
import { Sidebar } from './Sidebar';
import { VenueList } from './VenueList';
import { useVenueFilters } from '@/hooks/useVenueFilters';

interface VenueLayoutProps {
  venues: Venue[];
}

export const VenueLayout = ({ venues }: VenueLayoutProps) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const {
    selectedFilters,
    selectedCityDistricts,
    filteredCount,
    currentPage,
    totalPages,
    paginatedVenues,
    setCurrentPage,
    handleToggle,
    handleToggleCityDistrict,
    handleClearAll,
  } = useVenueFilters(venues);

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
        filteredCount={filteredCount}
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
        filteredCount={filteredCount}
        onClose={() => setIsSheetOpen(false)}
        onClearAllFilters={handleClearAll}
        onToggle={handleToggle}
        onToggleCityDistrict={handleToggleCityDistrict}
      />
    </div>
  );
};
