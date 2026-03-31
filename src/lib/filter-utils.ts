import type { FilterOption, FilterState } from '@/types/filters';
import type { Venue } from '@/types/venue';
import { hasOverlap } from './utils';

export const FILTER_CONFIGS: {
  key: keyof FilterState;
  title: string;
  options: FilterOption[];
}[] = [
  {
    key: 'serviceTypes',
    title: '服務類型',
    options: [
      { key: 'food', name: '餐飲' },
      { key: 'ent', name: '娛樂' },
      { key: 'stay', name: '住宿' },
      { key: 'trans', name: '交通' },
      { key: 'other', name: '其他' },
    ],
  },
  {
    key: 'petTypes',
    title: '寵物種類',
    options: [
      { key: 'dog', name: '犬', iconSrc: 'images/filter/dog.svg' },
      { key: 'cat', name: '貓', iconSrc: 'images/filter/cat.svg' },
      { key: 'other', name: '其他', iconSrc: 'images/filter/other.svg' },
    ],
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

const matchesTypes = (types: string[], selected: Set<string>): boolean =>
  selected.size === 0 || hasOverlap(types, selected);

const matchesDistrict = (
  city: string,
  district: string,
  selectedCityDistricts: Record<string, Set<string>>,
): boolean => {
  const hasAnySelected = Object.values(selectedCityDistricts).some(
    (districts) => districts.size > 0,
  );

  if (!hasAnySelected) return true;

  return selectedCityDistricts[city]?.has(district) ?? false;
};

export const filterVenues = (
  venues: Venue[],
  selectedFilters: FilterState,
  selectedCityDistricts: Record<string, Set<string>>,
): Venue[] =>
  venues.filter(
    (venue) =>
      matchesTypes(venue.serviceType, selectedFilters.serviceTypes) &&
      matchesTypes(venue.petType, selectedFilters.petTypes) &&
      matchesDistrict(venue.city, venue.district, selectedCityDistricts),
  );
