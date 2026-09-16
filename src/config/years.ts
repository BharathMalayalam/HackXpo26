export const years = {
  '25': {
    label: "HACKXPO '25",
    edition: "HACKXPO '25",
    fullYear: 2025,
    shortYear: '25',
    date: 'March 28 – 29, 2025',
    githubOrg: 'hackxpo25-gce',
    tagline: 'Innovate. Build. Transform.',
    department: 'Department of Information Technology',
    institution: 'Government College of Engineering, Erode',
    venue: 'IT Computing & Research Auditorium, GCE Erode Campus',
    theme: 'Autonomous Systems, Generative AI & Sustainable Smart Solutions',
  },
  '26': {
    label: "HACKXPO '26",
    edition: "HACKXPO '26",
    fullYear: 2026,
    shortYear: '26',
    date: 'March 27 – 28, 2026',
    githubOrg: 'hackxpo26-gce',
    tagline: 'Innovate. Build. Transform.',
    department: 'Department of Information Technology',
    institution: 'Government College of Engineering, Erode',
    venue: 'IT Computing & Research Auditorium, GCE Erode Campus',
    theme: 'Autonomous Systems, Generative AI & Sustainable Smart Solutions',
  },
} as const;

export type YearKey = keyof typeof years;
export const CURRENT_YEAR: YearKey = '26';
export const AVAILABLE_YEARS: YearKey[] = Object.keys(years) as YearKey[];
