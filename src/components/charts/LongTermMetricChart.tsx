import { useMemo, useState } from 'react';

type Point = {
  year: number;
  value: number | null;
  rate?: number | null;
  comparable?: boolean;
  partial?: boolean;
  estimated?: boolean;
  note?: string;
};

type SeriesBreak = {
  year: number;
  label: string;
  note: string;
};

type Props = {
  title: string;
  series: Point[];
  seriesBreaks?: SeriesBreak[];
  defaultMeasure?: 'count' | 'rate';
  defaultView?: 'all' | '20y' | '10y' | '5y' | '3y';
};

export default function LongTermMetricChart({
  title,
  series,
  seriesBreaks = [],
  defaultMeasure = 'count',
  defaultView = 'all'
}: Props) {
  const availableMeasures = useMemo(() => {
    const hasCounts = series.some((point) => point.value !== null && point.value !== undefined);
    const hasRates = series.some((point) => point.rate !== null && point.rate !== undefined);
    return {
      hasCounts,
      hasRates,
      measures: [hasCounts ? 'count' : null, hasRates ? 'rate' : null].filter(Boolean) as Array<'count' | 'rate'>
    };
  }, [series]);

  const initialMeasure = availableMeasures.measures.includes(defaultMeasure)
    ? defaultMeasure
    : availableMeasures.measures[0] ?? 'count';

  const [measure, setMeasure] = useState<'count' | 'rate'>(initialMeasure);
  const [view, setView] = useState<'all' | '20y' | '10y' | '5y' | '3y'>(defaultView);

  const latestYear = Math.max(...series.map((p) => p.year));

  const filtered = useMemo(() => {
    if (view === 'all') return series;
    const span = { '20y': 20, '10y': 10, '5y': 5, '3y': 3 }[view];
    return series.filter((p) => p.year >= latestYear - span + 1);
  }, [series, view, latestYear]);

  const chartMax = useMemo(() => {
    const values = filtered
      .map((point) => (measure === 'count' ? point.value : point.rate) ?? 0)
      .filter((value) => value > 0);

    return values.length ? Math.max(...values) : 1;
  }, [filtered, measure]);

  return (
    <section className="metric-chart-shell">
      <div className="metric-chart-shell__header">
        <div>
          <h2>{title}</h2>
          <p>Default view emphasizes the longest available time horizon.</p>
        </div>

        <div className="metric-chart-shell__controls">
          {availableMeasures.measures.length > 1 && (
            <label>
              <span>Measure</span>
              <select value={measure} onChange={(e) => setMeasure(e.target.value as 'count' | 'rate')}>
                {availableMeasures.hasCounts && <option value="count">Count</option>}
                {availableMeasures.hasRates && <option value="rate">Rate</option>}
              </select>
            </label>
          )}

          <label>
            <span>Range</span>
            <select value={view} onChange={(e) => setView(e.target.value as Props['defaultView'])}>
              <option value="all">All</option>
              <option value="20y">20Y</option>
              <option value="10y">10Y</option>
              <option value="5y">5Y</option>
              <option value="3y">3Y</option>
            </select>
          </label>
        </div>
      </div>

      <div className="metric-chart-bars" role="img" aria-label={`${title} bar chart`}>
        {filtered.map((point) => {
          const rawValue = (measure === 'count' ? point.value : point.rate) ?? null;
          const numericValue = rawValue ?? 0;
          const height = chartMax > 0 && rawValue !== null ? Math.max(6, Math.round((numericValue / chartMax) * 160)) : 6;
          const classes = [
            'metric-chart-bars__bar',
            point.comparable === false ? 'is-reference' : '',
            point.partial ? 'is-partial' : ''
          ].filter(Boolean).join(' ');

          return (
            <div className="metric-chart-bars__item" key={point.year}>
              <div
                className={classes}
                style={{ height: `${height}px` }}
                title={point.note ? `${point.year}: ${rawValue ?? '—'} — ${point.note}` : `${point.year}: ${rawValue ?? '—'}`}
              />
              <div className="metric-chart-bars__year">{point.year}</div>
              <div className="metric-chart-bars__value">{rawValue ?? '—'}</div>
            </div>
          );
        })}
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
              <tr key={`${point.year}-row`}>
                <td>{point.year}</td>
                <td>{measure === 'count' ? point.value ?? '—' : point.rate ?? '—'}</td>
                <td>
                  {point.partial
                    ? 'Partial-year flagged'
                    : point.comparable === false
                      ? 'Reference only'
                      : 'Comparable'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {seriesBreaks.length > 0 && (
        <div className="metric-chart-notes">
          <h3>Series breaks</h3>
          <ul>
            {seriesBreaks.map((item) => (
              <li key={`${item.year}-${item.label}`}>
                <strong>{item.year}:</strong> {item.label} — {item.note}
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
