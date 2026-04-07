import { useState } from 'react';
import type { FilterState } from '@/types/filters';
import type { Venue } from '@/types/venue';
import { filterVenues } from '@/lib/filters';
import { toggleSetValue } from '@/lib/utils';

const PAGE_SIZE = 8;

export const useVenueFilters = (venues: Venue[]) => {
  const [selectedFilters, setSelectedFilters] = useState<FilterState>({
    serviceTypes: new Set(),
    petTypes: new Set(),
  });

  const [selectedCityDistricts, setSelectedCityDistricts] = useState<
    Record<string, Set<string>>
  >({});

  const [currentPage, setCurrentPage] = useState(1);

  const filteredVenues = filterVenues(
    venues,
    selectedFilters,
    selectedCityDistricts,
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

  return {
    selectedFilters,
    selectedCityDistricts,
    filteredCount: filteredVenues.length,
    currentPage,
    totalPages,
    paginatedVenues,
    setCurrentPage,
    handleToggle,
    handleToggleCityDistrict,
    handleClearAll,
  };
};
