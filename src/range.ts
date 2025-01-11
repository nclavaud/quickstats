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
