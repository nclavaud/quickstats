import { expect, test } from 'vitest';
import { countByDayOfWeek, countByMonth, countByWeek, countByYear } from './counts';

test('it counts items by year', () => {
  const dates = [
    new Date('2022-11-01'),
    new Date('2024-01-01'),
    new Date('2024-03-01'),
  ];

  const expected = {
    '2022': 1,
    '2023': 0,
    '2024': 2,
  };

  expect(countByYear(dates)).toEqual(expected);
});

test('it return no years when dates are empty', () => {
  expect(countByYear([])).toEqual({});
});

test('it counts items by month', () => {
  const dates = [
    new Date('2022-11-01'),
    new Date('2024-01-01'),
    new Date('2024-03-01'),
  ];

  const expected = {
    '2022-11': 1,
    '2022-12': 0,
    '2023-01': 0,
    '2023-02': 0,
    '2023-03': 0,
    '2023-04': 0,
    '2023-05': 0,
    '2023-06': 0,
    '2023-07': 0,
    '2023-08': 0,
    '2023-09': 0,
    '2023-10': 0,
    '2023-11': 0,
    '2023-12': 0,
    '2024-01': 1,
    '2024-02': 0,
    '2024-03': 1,
  };

  expect(countByMonth(dates)).toEqual(expected);
});

test('it returns no months when dates are empty', () => {
  expect(countByMonth([])).toEqual({});
});

test('it counts items by week', () => {
  const dates = [
    new Date('2024-12-29'),
    new Date('2024-12-30'),
    new Date('2024-12-31'),
    new Date('2025-01-01'),
    new Date('2025-01-02'),
    new Date('2025-01-03'),
  ];

  const expected = {
    '2024-W52': 1,
    '2025-W01': 5,
  };

  expect(countByWeek(dates)).toEqual(expected);
});

test('it returns no weeks when dates are empty', () => {
  expect(countByWeek([])).toEqual({});
});

test('it counts items by day of week', () => {
  const dates = [
    new Date('2025-01-10'),
    new Date('2025-01-11'),
    new Date('2025-01-11'),
  ];

  const expected = {
    'Mon': 0,
    'Tue': 0,
    'Wed': 0,
    'Thu': 0,
    'Fri': 1,
    'Sat': 2,
    'Sun': 0,
  };

  expect(countByDayOfWeek(dates)).toEqual(expected);
});
