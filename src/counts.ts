import { collect } from 'collect.js';
import { add, format, lightFormat } from 'date-fns';
import { weekDate } from './date';
import { generateRangeMonths, generateRangeQuarters, generateRangeWeeks, generateRangeYears } from './range';

export const countByYear = (dates: Date[]) => {
  if (dates.length == 0) {
    return {};
  }

  const minDate = new Date(collect(dates).min());
  const maxDate = new Date(collect(dates).max());

  return collect(generateRangeYears(minDate, maxDate))
    .merge(collect(dates)
      .countBy((date: Date) => lightFormat(date, 'yyyy'))
      .sortKeys()
      .all()
    )
    .all();
}

export const countByQuarter = (dates: Date[]) => {
  if (dates.length == 0) {
    return {};
  }

  const minDate = new Date(collect(dates).min());
  const maxDate = new Date(collect(dates).max());

  return collect(generateRangeQuarters(minDate, maxDate))
    .merge(collect(dates)
      .countBy((date: Date) => format(date, "yyyy-'Q'Q"))
      .sortKeys()
      .all()
    )
    .all();
}

export const countByMonth = (dates: Date[]) => {
  if (dates.length == 0) {
    return {};
  }

  const minDate = new Date(collect(dates).min());
  const maxDate = new Date(collect(dates).max());

  return collect(generateRangeMonths(minDate, maxDate))
    .merge(collect(dates)
      .countBy((date: Date) => lightFormat(date, 'yyyy-MM'))
      .sortKeys()
      .all()
    )
    .all();
}

export const countByWeek = (dates: Date[]) => {
  if (dates.length == 0) {
    return {};
  }

  const minDate = new Date(collect(dates).min());
  const maxDate = new Date(collect(dates).max());

  return collect(generateRangeWeeks(minDate, maxDate))
    .merge(collect(dates)
      .countBy((date: Date) => weekDate(date))
      .sortKeys()
      .all()
    )
    .all();
}

export const countByDayOfWeek = (dates: Date[]) => {
  const dayLabels: { [key: number]: string } = {
    1: 'Mon',
    2: 'Tue',
    3: 'Wed',
    4: 'Thu',
    5: 'Fri',
    6: 'Sat',
    7: 'Sun',
  };

  const series = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
  };

  return collect(series).merge(
    collect(dates)
      .countBy((date: Date) => format(date, 'i'))
      .all()
    )
    .sortKeys()
    .mapWithKeys((value: string, key: number) => [dayLabels[key], value])
    .all();
}

export const countMaxConsecutiveDaysWithoutData = (dates: Date[]) => {
  const minDate = new Date(collect(dates).min());
  const maxDate = new Date(collect(dates).max());

  const _dates = collect(dates)
    .map(date => lightFormat(date, 'yyyy-MM-dd'))
    .unique();

  let maxPeriod = 0;
  let period = 0;

  for (let i = minDate; i < maxDate; i = add(i, { days: 1 })) {
    const formatted = lightFormat(i, 'yyyy-MM-dd');
    if (_dates.contains(formatted)) {
      maxPeriod = period > maxPeriod ? period : maxPeriod;
      period = 0;
    } else {
      period++;
    }
  }

  return maxPeriod;
};
