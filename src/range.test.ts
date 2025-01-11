import { expect, test } from 'vitest';
import { generateRangeMonths, generateRangeYears } from './range';

test('it generates a series of years between two dates', () => {
  const expected = {
    '2023': 0,
    '2024': 0,
    '2025': 0,
  };
  expect(generateRangeYears(new Date('2023-01-01'), new Date('2025-05-05'))).toEqual(expected);
});

test('it always generates a series of years in ascending order', () => {
  const expected = {
    '2023': 0,
    '2024': 0,
    '2025': 0,
  };
  expect(generateRangeYears(new Date('2025-01-01'), new Date('2023-05-05'))).toEqual(expected);
});

test('it generates a series of months between two dates', () => {
  const expected = {
    '2024-05': 0,
    '2024-06': 0,
    '2024-07': 0,
  };
  expect(generateRangeMonths(new Date('2024-05-08'), new Date('2024-07-31'))).toEqual(expected);
});

test('it always generates a series of months in ascending order', () => {
  const expected = {
    '2024-05': 0,
    '2024-06': 0,
    '2024-07': 0,
  };
  expect(generateRangeMonths(new Date('2024-07-31'), new Date('2024-05-08'))).toEqual(expected);
});

test('it generates series of months over several years', () => {
  const expected = {
    '2023-10': 0,
    '2023-11': 0,
    '2023-12': 0,
    '2024-01': 0,
    '2024-02': 0,
  };
  expect(generateRangeMonths(new Date('2023-10-01'), new Date('2024-02-05'))).toEqual(expected);
});
