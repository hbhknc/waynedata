export const FILLED_BAR_CHAR = '█';
export const EMPTY_BAR_CHAR = '░';
export const MAX_BAR_WIDTH = 16;

export const formatNumber = (value: number, maximumFractionDigits = 1) =>
  value.toLocaleString(undefined, { maximumFractionDigits });

export const barForValue = (value: number, min: number, max: number, width = MAX_BAR_WIDTH) => {
  if (max === min) {
    const midpoint = Math.floor(width / 2);
    return FILLED_BAR_CHAR.repeat(midpoint) + EMPTY_BAR_CHAR.repeat(width - midpoint);
  }

  const normalized = (value - min) / (max - min);
  const filledWidth = Math.max(1, Math.round(normalized * width));
  return FILLED_BAR_CHAR.repeat(filledWidth) + EMPTY_BAR_CHAR.repeat(width - filledWidth);
};

interface BuildSeriesChartOptions {
  min?: number;
  max?: number;
}

export const buildSeriesChart = (
  rows: Array<{ label: string; value: number; suffix?: string; note?: string }>,
  valueFormatter: (value: number) => string = (value) => formatNumber(value),
  options: BuildSeriesChartOptions = {}
) => {
  const values = rows.map((row) => row.value);
  const min = options.min ?? Math.min(...values);
  const max = options.max ?? Math.max(...values);

  return rows
    .map((row) => {
      const bar = barForValue(row.value, min, max);
      return `${row.label} | ${bar} | ${valueFormatter(row.value)}${row.suffix ?? ''}${row.note ? ` ${row.note}` : ''}`;
    })
    .join('\n');
};
