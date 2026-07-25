/**
 * Recent events for the memorial page's "Recent Events" tab.
 *
 * Seeded from the foundation's historical records (buckleup4kayla.org).
 * Edit this list to add or update events. To attach photos to an event, drop
 * image files into:  public/kayla/events/<slug>/   — they appear automatically.
 */

export interface FoundationEvent {
  /** Folder name under public/kayla/events/ for this event's photos. */
  slug: string;
  title: string;
  date: string;
  location?: string;
  /** Short highlight, e.g. an amount raised or awarded. */
  highlight?: string;
  description: string;
}

// Newest first.
export const events: FoundationEvent[] = [
  {
    slug: 'carwash-2008',
    title: 'Buckle Up 4 Kayla Car Wash',
    date: 'October 4, 2008',
    location: 'Bob Evans, Naples, FL',
    highlight: '$628 raised',
    description:
      'Volunteers came together for a community car wash that raised $628 for the foundation — all while spreading the "Buckle Up" message to everyone who stopped by.',
  },
  {
    slug: 'scholarships-2008',
    title: 'First Scholarships Awarded',
    date: 'May 2008',
    location: 'Palmetto Ridge High School',
    highlight: '$2,250 in scholarships',
    description:
      'The foundation presented two scholarships totaling $2,250 to Alyssa Goleman and Joyce Gayo of the Palmetto Ridge High School senior class of 2008 — the first students supported in Kayla’s name.',
  },
  {
    slug: 'memorial-plaque-2008',
    title: "A Plaque at Kayla's Memorial",
    date: 'May 2008',
    location: "Kayla's memorial site",
    description:
      "For Kayla's birthday, a memorial plaque was placed in the ocean at her memorial site — a lasting tribute that lets her family and friends feel close to her.",
  },
  {
    slug: 'foundation-launch-2007',
    title: 'The Foundation Begins',
    date: 'November 28, 2007',
    location: 'Palmetto Ridge High School',
    description:
      'Just weeks after losing Kayla, her community rallied together. T-shirts, key chains, and bumper stickers were sold at Palmetto Ridge High School to launch the foundation and establish its scholarship program.',
  },
];
