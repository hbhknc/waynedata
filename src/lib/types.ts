export type DataFrequency = 'annual' | 'quarterly' | 'monthly';
export type ValueUnit =
  | 'incidents'
  | 'calls'
  | 'arrests'
  | 'citations'
  | 'bookings'
  | 'dollars'
  | 'positions'
  | 'percent';

export type RateUnit =
  | 'per_1k'
  | 'per_10k'
  | 'per_100k'
  | 'pct_of_population'
  | 'none';

export interface SeriesBreak {
  year: number;
  label: string;
  note: string;
}

export interface DataSourceRef {
  name: string;
  publisher?: string;
  url?: string;
  file_path?: string;
  notes?: string;
}

export interface MetricMeta {
  metric_id: string;
  metric_name: string;
  category:
    | 'crime'
    | 'fire_ems'
    | 'traffic'
    | 'jail_courts'
    | 'budgets_staffing'
    | 'demographics';
  geography_type: 'county' | 'municipality';
  geography_id: string;
  geography_name: string;
  description: string;
  available_since: number;
  comparable_since: number;
  last_year_available: number;
  frequency: DataFrequency;
  unit: ValueUnit;
  rate_unit: RateUnit;
  default_chart_view: 'all' | '20y' | '10y' | '5y' | '3y';
  default_measure: 'count' | 'rate';
  source_name: string;
  sources: DataSourceRef[];
  methodology_notes: string;
  comparability_notes: string;
  caveats?: string[];
  series_breaks: SeriesBreak[];
  update_schedule?: string;
  last_updated: string;
}

export interface MetricSeriesPoint {
  year: number;
  value: number | null;
  rate?: number | null;
  population?: number | null;
  comparable?: boolean;
  estimated?: boolean;
  partial?: boolean;
  note?: string;
}

export interface MetricSeries {
  metric_id: string;
  points: MetricSeriesPoint[];
}

export interface MetricSummary {
  metric_id: string;
  current_year: number;
  current_value: number | null;
  current_rate?: number | null;
  previous_year?: number | null;
  previous_value?: number | null;
  previous_rate?: number | null;
  yoy_change_pct?: number | null;
  five_year_change_pct?: number | null;
  ten_year_change_pct?: number | null;
  comparable_years_count: number;
  long_term_average_value?: number | null;
  long_term_median_value?: number | null;
  long_term_average_rate?: number | null;
  long_term_median_rate?: number | null;
  peak_value?: number | null;
  peak_year?: number | null;
  trough_value?: number | null;
  trough_year?: number | null;
  rank_current_value?: number | null;
  percentile_current_value?: number | null;
  above_long_term_average_value?: boolean | null;
  above_long_term_average_rate?: boolean | null;
  status_badges?: string[];
  summary_sentence?: string;
}
