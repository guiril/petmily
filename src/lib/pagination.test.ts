import { expect, test } from 'vitest';

import { getPageNumbers } from './pagination';

test('returns all pages when total page count is smaller than 7', () => {
  const pages = getPageNumbers(1, 5);
  expect(pages).toEqual([1, 2, 3, 4, 5]);
});

test('returns all pages when total page count equals 7', () => {
  const pages = getPageNumbers(2, 7);
  expect(pages).toEqual([1, 2, 3, 4, 5, 6, 7]);
});

test('returns all pages when total page count equals 8', () => {
  const pages = getPageNumbers(1, 8);
  expect(pages).toEqual([1, 2, '...', 8]);
});

test('returns all pages when total page count is bigger than 7', () => {
  const pages = getPageNumbers(5, 15);
  expect(pages).toEqual([1, '...', 4, 5, 6, '...', 15]);
});

test('returns all pages when current page is close to the first page', () => {
  const pages = getPageNumbers(2, 10);
  expect(pages).toEqual([1, 2, 3, '...', 10]);
});

test('returns all pages when current page is close to the last page', () => {
  const pages = getPageNumbers(9, 10);
  expect(pages).toEqual([1, '...', 8, 9, 10]);
});

test('returns all pages when current page is the first page', () => {
  const pages = getPageNumbers(1, 10);
  expect(pages).toEqual([1, 2, '...', 10]);
});

test('returns all pages when current page is the last page', () => {
  const pages = getPageNumbers(10, 10);
  expect(pages).toEqual([1, '...', 9, 10]);
});

test('does not show leading ellipsis when current page equals 3', () => {
  const pages = getPageNumbers(3, 10);
  expect(pages).toEqual([1, 2, 3, 4, '...', 10]);
});

test('shows leading ellipsis when current page equals 4', () => {
  const pages = getPageNumbers(4, 10);
  expect(pages).toEqual([1, '...', 3, 4, 5, '...', 10]);
});

test('does not show trailing ellipsis when current page equals total pages minus 2', () => {
  const pages = getPageNumbers(8, 10);
  expect(pages).toEqual([1, '...', 7, 8, 9, 10]);
});

test('shows trailing ellipsis when current page equals total pages minus 3', () => {
  const pages = getPageNumbers(7, 10);
  expect(pages).toEqual([1, '...', 6, 7, 8, '...', 10]);
});
