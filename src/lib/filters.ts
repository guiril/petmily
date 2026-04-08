import type { FilterOption, FilterState } from '@/types/filters';
import type { Venue } from '@/types/venue';
import { hasOverlap } from './utils';

interface FilterConfig {
  key: keyof FilterState;
  name: string;
  options: FilterOption[];
}

export const FILTER_CONFIGS: FilterConfig[] = [
  {
    key: 'serviceTypes',
    name: '服務類型',
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
    name: '寵物種類',
    options: [
      { key: 'dog', name: '犬', iconSrc: 'images/filter/dog.svg' },
      { key: 'cat', name: '貓', iconSrc: 'images/filter/cat.svg' },
      { key: 'other', name: '其他', iconSrc: 'images/filter/other.svg' },
    ],
  },
];

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
      matchesTypes(venue.serviceTypes, selectedFilters.serviceTypes) &&
      matchesTypes(venue.petTypes, selectedFilters.petTypes) &&
      matchesDistrict(venue.city, venue.district, selectedCityDistricts),
  );
