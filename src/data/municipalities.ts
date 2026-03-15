export type Municipality = {
  slug: string;
  name: string;
  agencyNotes: string;
  focus: string[];
  status: string;
};

export const municipalities: Municipality[] = [
  {
    slug: 'goldsboro',
    name: 'Goldsboro',
    agencyNotes:
      'Priority launch municipality due to population size, public safety footprint, and likely data volume.',
    focus: ['crime trends', 'calls for service', 'public safety spending'],
    status: 'Planned for launch'
  },
  {
    slug: 'mount-olive',
    name: 'Mount Olive',
    agencyNotes:
      'Strong candidate for early inclusion because it is distinct, recognizable, and analytically manageable.',
    focus: ['crime trends', 'fire and EMS context', 'budget tracking'],
    status: 'Planned for launch'
  },
  {
    slug: 'pikeville',
    name: 'Pikeville',
    agencyNotes:
      'Useful for small-town comparison pages and long-range trend analysis.',
    focus: ['incident trends', 'budget context', 'staffing or service coverage'],
    status: 'Planned for launch'
  },
  {
    slug: 'fremont',
    name: 'Fremont',
    agencyNotes:
      'Good fit for a later wave once core county and major municipal datasets are stable.',
    focus: ['trend snapshots', 'service coverage', 'budget context'],
    status: 'Phase 2'
  },
  {
    slug: 'seven-springs',
    name: 'Seven Springs',
    agencyNotes:
      'Best treated as a smaller profile with careful attention to limited denominators and sparse data.',
    focus: ['small-town comparisons', 'service area notes', 'annual trend summaries'],
    status: 'Phase 2'
  },
  {
    slug: 'eureka',
    name: 'Eureka',
    agencyNotes:
      'Likely better as a concise profile page unless stronger source coverage becomes available.',
    focus: ['annual snapshots', 'service coverage', 'budget notes'],
    status: 'Phase 2'
  },
  {
    slug: 'walnut-creek',
    name: 'Walnut Creek',
    agencyNotes:
      'Suitable for a lean profile page with explicit caveats about scope and data completeness.',
    focus: ['snapshot indicators', 'comparison context', 'source coverage'],
    status: 'Phase 2'
  }
];

export const municipalityStatusLegend = [
  'Planned for launch: included in the first public release.',
  'Phase 2: queued for expansion after the core data pipeline is stable.'
];
