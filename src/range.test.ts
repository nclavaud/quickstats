import { expect, test } from 'vitest';
import { generateRangeYears } from './range';

test('it generates a series of years between two dates', () => {
  const expected = {
    '2023': 0,
    '2024': 0,
    '2025': 0,
  };
  expect(generateRangeYears(new Date('2023-01-01'), new Date('2025-05-05'))).toEqual(expected);
});

test('it always generate series in ascending order', () => {
  const expected = {
    '2023': 0,
    '2024': 0,
    '2025': 0,
  };
  expect(generateRangeYears(new Date('2025-01-01'), new Date('2023-05-05'))).toEqual(expected);
});
