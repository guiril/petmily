import type { FilterState } from '@/types/filters';
import type { Venue } from '@/types/venue';
import { hasOverlap } from './utils';

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
