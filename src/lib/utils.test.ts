import { describe, expect, test } from 'vitest';

import { hasOverlap, toggleSetValue } from './utils';

const items = ['A', 'B', 'C', 'D', 'E'];

describe('hasOverlap', () => {
  test('returns true when items overlap with selected', () => {
    const result = hasOverlap(items, new Set(['B', 'C']));
    expect(result).toBe(true);
  });

  test('returns false when items do not overlap with selected', () => {
    const result = hasOverlap(items, new Set(['Z']));
    expect(result).toBe(false);
  });
});

describe('toggleSetValue', () => {
  test('returns a new set with the value added when it does not exist', () => {
    const result = toggleSetValue(new Set(items), 'F');
    expect(result).toEqual(new Set(['A', 'B', 'C', 'D', 'E', 'F']));
  });

  test('returns a new set with the value removed when it exists', () => {
    const result = toggleSetValue(new Set(items), 'C');
    expect(result).toEqual(new Set(['A', 'B', 'D', 'E']));
  });

  test('does not mutate the original set', () => {
    const original = new Set(items);
    toggleSetValue(original, 'F');
    expect(original).toEqual(new Set(items));
  });
});
