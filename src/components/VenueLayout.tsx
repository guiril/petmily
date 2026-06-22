'use client';

import { useState } from 'react';
import type { Venue } from '@/types/venue';
import { useVenueFilters } from '@/hooks/useVenueFilters';
import { Header } from '@/components/Header';
import { BottomSheet } from './BottomSheet';
import { Sidebar } from './Sidebar';
import { VenueList } from './VenueList';
import { CityModal } from './CityModal';

interface VenueLayoutProps {
  currentCity: string;
  venues: Venue[];
}

export const VenueLayout = ({ currentCity, venues }: VenueLayoutProps) => {
  const [isCityModalOpen, setIsCityModalOpen] = useState(false);
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

  const handleCityModalOpen = () => {
    setIsCityModalOpen(true);
  };

  return (
    <div className="flex h-dvh flex-col bg-background">
      <Header city={currentCity} onOpenCityModal={handleCityModalOpen} />
      <div className="flex flex-1 overflow-hidden">
        <div className="max-lg:hidden flex">
          <Sidebar
            currentCity={currentCity}
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
          currentCity={currentCity}
          selectedFilters={selectedFilters}
          selectedCityDistricts={selectedCityDistricts}
          filteredCount={filteredCount}
          onClose={() => setIsSheetOpen(false)}
          onClearAllFilters={handleClearAll}
          onToggle={handleToggle}
          onToggleCityDistrict={handleToggleCityDistrict}
        />
        <CityModal
          isOpen={isCityModalOpen}
          currentCity={currentCity}
          onClose={() => setIsCityModalOpen(false)}
        />
      </div>
    </div>
  );
};
