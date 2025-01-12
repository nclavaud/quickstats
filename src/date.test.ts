import { expect, test } from 'vitest';
import { weekDate } from './date';

const labels = [
  ['2024-12-17', '2024-W51'],
  ['2024-12-24', '2024-W52'],
  ['2024-12-29', '2024-W52'],
  ['2024-12-30', '2025-W01'],
  ['2024-12-31', '2025-W01'],
  ['2025-01-01', '2025-W01'],
  ['2025-01-08', '2025-W02'],
];

test.each(labels)('it renders the correct week date for %s', (day, expected) => {
  expect(weekDate(new Date(day))).toEqual(expected);
});
