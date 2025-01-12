import { format } from 'date-fns';

export const weekDate = (date: Date): string => {
  const week = format(date, 'II');
  let year = date.getFullYear();
  if (week == '01' && date.getMonth() == 11) {
    year++;
  }
  return `${year}-W${week}`;
};
