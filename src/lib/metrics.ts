import type { MetricMeta, MetricSeries, MetricSeriesPoint, MetricSummary } from './types';

export function getComparablePoints(series: MetricSeries, comparableSince: number): MetricSeriesPoint[] {
  return series.points.filter((p) => p.year >= comparableSince && p.comparable !== false && p.value !== null);
}

export function getPointsForRange(
  series: MetricSeries,
  view: 'all' | '20y' | '10y' | '5y' | '3y',
  latestYear: number
): MetricSeriesPoint[] {
  if (view === 'all') return series.points;

  const spanByView = {
    '20y': 20,
    '10y': 10,
    '5y': 5,
    '3y': 3
  } as const;

  const span = spanByView[view];
  return series.points.filter((p) => p.year >= latestYear - span + 1);
}

export function formatBadgeLabel(summary: MetricSummary): string[] {
  return summary.status_badges ?? [];
}

export function getMetricAvailability(meta: MetricMeta) {
  return {
    availableSince: meta.available_since,
    comparableSince: meta.comparable_since,
    lastYearAvailable: meta.last_year_available
  };
}

export function formatSignedPercent(value: number | null | undefined): string {
  if (value === null || value === undefined || Number.isNaN(value)) return '—';
  const rounded = Math.round(value * 10) / 10;
  const prefix = rounded > 0 ? '+' : '';
  return `${prefix}${rounded}%`;
}
