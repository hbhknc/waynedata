export const site = {
  name: 'Wayne Public Safety Monitor',
  tagline: 'Tracking public safety across Wayne County.',
  mission:
    'An independent, nonpartisan source for public safety data, trends, and accountability in Wayne County and its municipalities.',
  county: 'Wayne County, North Carolina',
  email: 'editor@example.com',
  nav: [
    { href: '/', label: 'Home' },
    { href: '/county-dashboard', label: 'County Dashboard' },
    { href: '/municipalities', label: 'Municipalities' },
    { href: '/crime', label: 'Crime' },
    { href: '/fire-ems', label: 'Fire & EMS' },
    { href: '/budgets-staffing', label: 'Budgets & Staffing' },
    { href: '/reports', label: 'Reports' },
    { href: '/methodology', label: 'Methodology' },
    { href: '/about', label: 'About' }
  ],
  footerLinks: [
    { href: '/about', label: 'About' },
    { href: '/methodology', label: 'Methodology' },
    { href: '/reports', label: 'Reports' },
    { href: '/municipalities', label: 'Municipalities' }
  ]
};

export const homepageCards = [
  {
    title: 'County Dashboard',
    href: '/county-dashboard',
    description:
      'A countywide snapshot page for crime, fire and EMS, spending, and high-level accountability indicators.'
  },
  {
    title: 'Municipalities',
    href: '/municipalities',
    description:
      'Profile pages for Wayne County municipalities, built to support side-by-side comparison over time.'
  },
  {
    title: 'Reports',
    href: '/reports',
    description:
      'Plain-language briefings and recurring reports that explain what changed and why it matters.'
  },
  {
    title: 'Methodology',
    href: '/methodology',
    description:
      'Definitions, caveats, source notes, and update practices to keep the project transparent and defensible.'
  }
];

export const launchRoadmap = [
  'Connect real county and municipal datasets.',
  'Publish first monthly Wayne Public Safety Brief.',
  'Add downloadable source-document library under Public Records.',
  'Expand municipality profile coverage and comparison tables.',
  'Add charts once the data pipeline is in place and validated.'
];
