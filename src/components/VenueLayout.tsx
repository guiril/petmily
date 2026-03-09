'use client';

import { useMemo, useState } from 'react';
import type { FilterState } from '@/types/filters';
import type { Venue } from '@/types/venue';
import { filterVenues, getDistricts, toggleSetValue } from '@/lib/filter-utils';
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

  const districts = useMemo(() => getDistricts(venues), [venues]);
  const filteredVenues = useMemo(() => filterVenues(venues, selectedFilters), [
    venues,
    selectedFilters,
  ]);

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
          selectedFilters={selectedFilters}
          serviceTypes={SERVICE_TYPES}
          petTypes={PET_TYPES}
          districts={districts}
          onToggle={handleToggle}
        />
      </div>
      <VenueList venues={filteredVenues} totalCount={venues.length} />
    </div>
  );
};
