/**
 * Central site configuration & shared content constants.
 * Editing copy, navigation, and key statistics here keeps it consistent
 * across every page.
 */

export const siteConfig = {
  name: 'Kayla Marie Joiner Foundation',
  shortName: 'Buckle Up for Kayla',
  tagline: 'Honoring Kayla. Protecting teens. Building futures.',
  description:
    'The Kayla Marie Joiner Foundation honors Kayla Marie Joiner (1991–2007) by championing teen seatbelt safety and funding scholarships for future pediatric nurses.',
  // Update to the production domain before launch.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://buckleup4kayla.org',
  email: 'info@buckleup4kayla.org',
  domains: ['buckleup4kayla.org', 'buckleup4kayla.com'],
} as const;

/** Kayla's life dates, referenced in several places. */
export const kayla = {
  fullName: 'Kayla Marie Joiner',
  born: 'May 29, 1991',
  passed: 'October 22, 2007',
} as const;

/** Primary navigation used by the Navbar and Footer. */
export const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/story', label: "Kayla's Story" },
  { href: '/buckle-up', label: 'Buckle Up' },
  { href: '/scholarships', label: 'Scholarships' },
  { href: '/impact', label: 'Impact' },
  { href: '/get-involved', label: 'Get Involved' },
] as const;

/** Headline statistics. Sources noted so they can be refreshed over time. */
export const stats = [
  {
    value: '2,500+',
    label: 'Pledges to buckle up',
    sub: 'Teens & families committed to the cause',
  },
  {
    value: '$185K',
    label: 'In scholarships awarded',
    sub: 'Supporting future pediatric nurses',
  },
  {
    value: '40+',
    label: 'Schools reached',
    sub: 'Safety assemblies & campaigns',
  },
  {
    value: '1',
    label: 'Life that changed everything',
    sub: 'And a mission that carries her forward',
  },
] as const;

/**
 * Teen seatbelt safety statistics for /buckle-up.
 * Sources: NHTSA & CDC. Verify and update figures before publishing.
 */
export const safetyStats = [
  {
    stat: '~50%',
    text: 'of teens (13–19) who died in crashes were unrestrained.',
    source: 'NHTSA',
  },
  {
    stat: '45%',
    text: 'reduction in risk of fatal injury for front-seat passengers wearing seatbelts.',
    source: 'CDC',
  },
  {
    stat: '#1',
    text: 'Motor vehicle crashes are a leading cause of death for U.S. teens.',
    source: 'CDC',
  },
  {
    stat: '3 sec',
    text: 'is all it takes to buckle up — the simplest life-saving habit there is.',
    source: 'Buckle Up for Kayla',
  },
] as const;

/** Suggested one-time donation amounts (USD). */
export const donationPresets = [25, 50, 100, 250] as const;
