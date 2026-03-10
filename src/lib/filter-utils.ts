import type { FilterState } from '@/types/filters';
import type { Venue } from '@/types/venue';
import { hasOverlap } from './utils';

export const FILTER_CONFIGS: {
  key: keyof FilterState;
  title: string;
  staticOptions?: string[];
}[] = [
  {
    key: 'serviceTypes',
    title: '服務類型',
    staticOptions: ['餐飲', '娛樂', '住宿', '交通', '其他'],
  },
  {
    key: 'petTypes',
    title: '寵物種類',
    staticOptions: ['犬', '貓', '其他'],
  },
  {
    key: 'districts',
    title: '行政區',
  },
];

export const toggleSetValue = (
  set: Set<string>,
  value: string,
): Set<string> => {
  const newSet = new Set(set);

  if (newSet.has(value)) {
    newSet.delete(value);
  } else {
    newSet.add(value);
  }

  return newSet;
};

export const getDistricts = (venues: Venue[]): string[] =>
  [...new Set(venues.map((venue) => venue.district))].sort();

const matchesServiceType = (venue: Venue, selected: Set<string>): boolean =>
  selected.size === 0 || hasOverlap(venue.serviceType, selected);

const matchesPetType = (venue: Venue, selected: Set<string>): boolean =>
  selected.size === 0 || hasOverlap(venue.petType, selected);

const matchesDistrict = (venue: Venue, selected: Set<string>): boolean =>
  selected.size === 0 || selected.has(venue.district);

export const filterVenues = (
  venues: Venue[],
  selectedFilters: FilterState,
): Venue[] =>
  venues.filter(
    (venue) =>
      matchesServiceType(venue, selectedFilters.serviceTypes) &&
      matchesPetType(venue, selectedFilters.petTypes) &&
      matchesDistrict(venue, selectedFilters.districts),
  );
