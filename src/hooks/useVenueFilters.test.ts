import { describe, expect, test } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import type { Venue } from '@/types/venue';
import { useVenueFilters } from './useVenueFilters';

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

const venues = [
  foodVenueInZhongqu,
  entAndStayVenueInDongqu,
  transVenueInBeitou,
];

const createVenue = (id: number): Venue => ({
  id: `venue-${id}`,
  name: `venue-${id}`,
  address: `address-${id}`,
  district: '中區',
  city: 'taichung',
  serviceTypes: ['food'],
  petTypes: ['dog'],
});

test('initial state shows all venues on page 1', () => {
  const { result } = renderHook(() => useVenueFilters(venues));

  expect(result.current.currentPage).toBe(1);
  expect(result.current.filteredCount).toBe(venues.length);
});

describe('handleToggle', () => {
  test('updates selectedFilters', () => {
    const { result } = renderHook(() => useVenueFilters(venues));

    act(() => {
      result.current.handleToggle('serviceTypes', 'ent');
    });

    expect(result.current.selectedFilters.serviceTypes.has('ent')).toBe(true);
  });

  test('resets currentPage to 1', () => {
    const { result } = renderHook(() => useVenueFilters(venues));

    act(() => {
      result.current.setCurrentPage(5);
    });

    act(() => {
      result.current.handleToggle('serviceTypes', 'ent');
    });

    expect(result.current.currentPage).toBe(1);
  });
});

describe('handleToggleCityDistrict', () => {
  test('adds a district for a new city', () => {
    const { result } = renderHook(() => useVenueFilters(venues));

    act(() => {
      result.current.handleToggleCityDistrict('taichung', '東區');
    });

    expect(result.current.selectedCityDistricts.taichung.has('東區')).toBe(
      true,
    );
  });

  test('called twice removes the district', () => {
    const { result } = renderHook(() => useVenueFilters(venues));

    act(() => {
      result.current.handleToggleCityDistrict('taichung', '東區');
    });

    act(() => {
      result.current.handleToggleCityDistrict('taichung', '東區');
    });

    expect(result.current.selectedCityDistricts.taichung.has('東區')).toBe(
      false,
    );
  });

  test('resets currentPage to 1', () => {
    const { result } = renderHook(() => useVenueFilters(venues));

    act(() => {
      result.current.setCurrentPage(5);
    });

    act(() => {
      result.current.handleToggleCityDistrict('taichung', '東區');
    });

    expect(result.current.currentPage).toBe(1);
  });
});

describe('handleClearAll', () => {
  test('resets selectedFilters', () => {
    const { result } = renderHook(() => useVenueFilters(venues));

    act(() => {
      result.current.handleToggle('serviceTypes', 'ent');
    });

    act(() => {
      result.current.handleClearAll();
    });

    expect(result.current.selectedFilters).toEqual({
      serviceTypes: new Set(),
      petTypes: new Set(),
    });
  });

  test('resets selectedCityDistricts', () => {
    const { result } = renderHook(() => useVenueFilters(venues));

    act(() => {
      result.current.handleToggleCityDistrict('taichung', '東區');
    });

    act(() => {
      result.current.handleClearAll();
    });

    expect(result.current.selectedCityDistricts).toEqual({});
  });

  test('resets currentPage to 1', () => {
    const { result } = renderHook(() => useVenueFilters(venues));

    act(() => {
      result.current.setCurrentPage(5);
    });

    act(() => {
      result.current.handleClearAll();
    });

    expect(result.current.currentPage).toBe(1);
  });
});

describe('totalPages and paginatedVenues', () => {
  test('returns totalPages when venues length is 8', () => {
    const eightVenues = Array.from({ length: 8 }, (_, index) =>
      createVenue(index),
    );

    const { result } = renderHook(() => useVenueFilters(eightVenues));

    expect(result.current.totalPages).toBe(1);
  });

  test('returns totalPages and page 2 paginatedVenues when venues length is 9', () => {
    const nineVenues = Array.from({ length: 9 }, (_, index) =>
      createVenue(index),
    );

    const { result } = renderHook(() => useVenueFilters(nineVenues));

    act(() => {
      result.current.setCurrentPage(2);
    });

    expect(result.current.totalPages).toBe(2);
    expect(result.current.paginatedVenues.length).toBe(1);
  });

  test('returns totalPages and paginatedVenues as empty when filtered venues length is 0', () => {
    const { result } = renderHook(() => useVenueFilters(venues));

    act(() => {
      result.current.handleToggle('serviceTypes', 'park');
    });

    expect(result.current.totalPages).toBe(0);
    expect(result.current.paginatedVenues.length).toBe(0);
  });
});
