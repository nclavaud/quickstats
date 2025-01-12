import { add, format } from 'date-fns';
import { weekDate } from './date';

export const generateRangeMonths = (start: Date, end: Date): { [key: string]: number } => {
  if (start > end) {
    return generateRangeMonths(end, start);
  }

  const s = new Date(start.getFullYear(), start.getMonth());
  const e = new Date(end.getFullYear(), end.getMonth());

  const range: { [key: string]: number } = {};

  for (let i = s; i <= e; i = new Date(i.getFullYear(), i.getMonth() + 1)) {
    const month = i.getMonth() + 1;
    range[`${i.getFullYear()}-${month < 10 ? '0' : ''}${month}`] = 0;
  }

  return range;
};

export const generateRangeWeeks = (start: Date, end: Date): { [key: string]: number } => {
  if (start > end) {
    return generateRangeWeeks(end, start);
  }

  const range: { [key: string]: number } = {};

  const dowStart = parseInt(format(start, 'i'));
  const dowEnd = parseInt(format(end, 'i'));

  let limit = dowEnd < dowStart ? add(end, { days: dowStart - dowEnd }) : end;
  for (let i = start; i <= limit; i = add(i, { weeks: 1 })) {
    range[weekDate(i)] = 0;
  }

  return range;
};

export const generateRangeYears = (start: Date, end: Date): { [key: string]: number } => {
  if (start > end) {
    return generateRangeYears(end, start);
  }

  const s = start.getFullYear();
  const e = end.getFullYear();

  const range: { [key: string]: number } = {};

  for (let i = s; i <= e; i++) {
    range[i.toString()] = 0;
  }

  return range;
};
