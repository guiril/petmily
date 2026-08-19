import { describe, expect, test } from 'vitest';

import type { FilterState } from '@/types/filters';
import type { Venue } from '@/types/venue';

import { getFilterConfigs, filterVenues } from './filters';

describe('getFilterConfigs', () => {
  const serviceTypes = {
    key: 'serviceTypes',
    name: '服務類型',
    options: [
      { key: 'food', name: '餐飲' },
      { key: 'ent', name: '娛樂' },
      { key: 'stay', name: '住宿' },
      { key: 'trans', name: '交通' },
      { key: 'other', name: '其他' },
    ],
  };

  const petTypes = {
    key: 'petTypes',
    name: '寵物種類',
    options: [
      { key: 'dog', name: '犬', iconSrc: 'images/filter/dog.svg' },
      { key: 'cat', name: '貓', iconSrc: 'images/filter/cat.svg' },
      { key: 'other', name: '其他', iconSrc: 'images/filter/other.svg' },
    ],
  };

  test('returns filter config with petTypes', () => {
    const results = getFilterConfigs('taichung');
    expect(results).toEqual([serviceTypes, petTypes]);
  });

  test('returns filter config without petTypes', () => {
    const results = getFilterConfigs('taipei');
    expect(results).toEqual([serviceTypes]);
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
