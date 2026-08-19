import { describe, expect, test } from 'vitest';

import type { FilterState } from '@/types/filters';
import type { Venue } from '@/types/venue';

import { getFilterConfigs, filterVenues } from './filters';

describe('getFilterConfigs', () => {
  const getConfigKeys = (cityKey: string) =>
    getFilterConfigs(cityKey).map((config) => config.key);

  test('includes petTypes for a city that supports it', () => {
    expect(getConfigKeys('taichung')).toContain('petTypes');
  });

  test('excludes petTypes for a city that does not support it', () => {
    expect(getConfigKeys('taipei')).not.toContain('petTypes');
  });

  test('always includes serviceTypes', () => {
    expect(getConfigKeys('taichung')).toContain('serviceTypes');
    expect(getConfigKeys('taipei')).toContain('serviceTypes');
  });
});

describe('filterVenues', () => {
  const foodVenueInZhongqu: Venue = {
    id: 'venue-1',
    name: '中區寵物友善餐廳',
    address: '台中市中區某路 1 號',
    district: '中區',
    city: 'taichung',
    serviceTypes: ['food'],
    petTypes: ['dog'],
  };

  const entAndStayVenueInDongqu: Venue = {
    id: 'venue-2',
    name: '東區寵物友善旅宿',
    address: '台中市東區某路 2 號',
    district: '東區',
    city: 'taichung',
    serviceTypes: ['ent', 'stay'],
    petTypes: ['cat'],
  };

  const transVenueInBeitou: Venue = {
    id: 'venue-3',
    name: '北投寵物友善交通',
    address: '台北市北投區某路 3 號',
    district: '北投區',
    city: 'taipei',
    serviceTypes: ['trans'],
    petTypes: ['other'],
  };

  const venues: Venue[] = [
    foodVenueInZhongqu,
    entAndStayVenueInDongqu,
    transVenueInBeitou,
  ];

  const emptyFilters: FilterState = {
    serviceTypes: new Set(),
    petTypes: new Set(),
  };

  test('returns all venues when no filters are selected', () => {
    const results = filterVenues(venues, emptyFilters, {});
    expect(results).toEqual(venues);
  });

  test('returns venues matching serviceTypes filter', () => {
    const results = filterVenues(
      venues,
      { serviceTypes: new Set(['ent', 'trans']), petTypes: new Set() },
      { taichung: new Set() },
    );
    expect(results).toEqual([entAndStayVenueInDongqu, transVenueInBeitou]);
  });

  test('returns only the venue matching petTypes filter', () => {
    const results = filterVenues(
      venues,
      { serviceTypes: new Set(), petTypes: new Set(['other']) },
      { taichung: new Set() },
    );
    expect(results).toEqual([transVenueInBeitou]);
  });

  test('returns only the venue matching district filter', () => {
    const results = filterVenues(
      venues,
      { serviceTypes: new Set(), petTypes: new Set() },
      { taichung: new Set(['東區']) },
    );
    expect(results).toEqual([entAndStayVenueInDongqu]);
  });

  test('returns only the venue matching serviceTypes and petTypes filters', () => {
    const results = filterVenues(
      venues,
      { serviceTypes: new Set(['food']), petTypes: new Set(['dog']) },
      {},
    );
    expect(results).toEqual([foodVenueInZhongqu]);
  });

  test('returns only the venue matching serviceTypes, petTypes, and district filters', () => {
    const results = filterVenues(
      venues,
      { serviceTypes: new Set(['food']), petTypes: new Set(['dog']) },
      { taichung: new Set(['中區']) },
    );
    expect(results).toEqual([foodVenueInZhongqu]);
  });

  test('returns none of the venues when venues is empty', () => {
    const results = filterVenues(
      [],
      { serviceTypes: new Set(), petTypes: new Set() },
      {},
    );
    expect(results).toEqual([]);
  });

  test('returns none of the venues when not matching filter', () => {
    const results = filterVenues(
      venues,
      { serviceTypes: new Set(['food']), petTypes: new Set(['dog']) },
      { taichung: new Set(['東區']) },
    );
    expect(results).toEqual([]);
  });
});
