import { useMemo } from 'react';

type Point = {
  year: number;
  value: number | null;
  rate?: number | null;
  partial?: boolean;
  note?: string;
};

type Props = {
  title: string;
  series: Point[];
  years?: number;
  defaultMeasure?: 'count' | 'rate';
};

export default function RecentMetricChart({ title, series, years = 5, defaultMeasure = 'count' }: Props) {
  const hasCounts = series.some((point) => point.value !== null && point.value !== undefined);
  const hasRates = series.some((point) => point.rate !== null && point.rate !== undefined);
  const measure = defaultMeasure === 'count' && !hasCounts && hasRates ? 'rate' : defaultMeasure;

  const latestYear = Math.max(...series.map((p) => p.year));

  const filtered = useMemo(() => {
    return series.filter((point) => point.year >= latestYear - years + 1);
  }, [series, latestYear, years]);

  const start = filtered[0];
  const end = filtered[filtered.length - 1];
  const startValue = measure === 'count' ? start?.value : start?.rate;
  const endValue = measure === 'count' ? end?.value : end?.rate;
  const delta = startValue && endValue ? (((endValue - startValue) / startValue) * 100).toFixed(1) : null;

  return (
    <section className="metric-chart-shell">
      <div className="metric-chart-shell__header">
        <div>
          <h2>{title}</h2>
          <p>
            Focused detail for the most recent {years} years.
            {delta ? ` Change over this window: ${delta > '0' ? '+' : ''}${delta}%.` : ''}
          </p>
        </div>
      </div>

      <div className="metric-chart-table-wrap">
        <table className="metric-chart-table">
          <thead>
            <tr>
              <th>Year</th>
              <th>{measure === 'count' ? 'Value' : 'Rate'}</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((point) => (
              <tr key={`${point.year}-recent`}>
                <td>{point.year}</td>
                <td>{measure === 'count' ? point.value ?? '—' : point.rate ?? '—'}</td>
                <td>{point.partial ? 'Partial-year flagged' : point.note ?? 'Comparable'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
