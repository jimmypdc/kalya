/**
 * Recent events for the memorial page's "Recent Events" tab.
 *
 * HOW EVENTS WORK
 * ───────────────────────────────────────────────────────────────
 * The events tab AUTO-DISCOVERS every folder inside public/kayla/events/.
 * Each folder becomes an event, and the images in it become that event's
 * photos. So to add an event, just create a folder and drop photos in — you
 * can name it like "Title - YEAR" (e.g. "Jersey Shore - 2008") and the tab
 * will show that title and year automatically.
 *
 * The list below is OPTIONAL enrichment: for any folder whose name matches a
 * `slug` here, we use this richer title / date / location / highlight /
 * description instead of the folder name. Edit freely.
 * ───────────────────────────────────────────────────────────────
 */

export interface FoundationEvent {
  /** Must match the folder name under public/kayla/events/ exactly. */
  slug: string;
  title: string;
  date: string;
  location?: string;
  /** Short highlight, e.g. an amount raised or awarded. */
  highlight?: string;
  description?: string;
}

// Order here breaks ties when two events share the same year (newest first).
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
    slug: 'Jersey Shore - 2008',
    title: 'A Day at the Jersey Shore',
    date: '2008',
    location: 'Jersey Shore',
    description:
      "Family and friends gathered at the Jersey Shore for a day in Kayla's honor — sharing memories, laughter, and the kind of togetherness she always brought out in the people around her.",
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
    slug: 'American Heart Association Walk - 2007',
    title: 'American Heart Association Walk',
    date: '2007',
    description:
      "Kayla's family and friends came together for the American Heart Association Walk, stepping out side by side in her memory and carrying her spirit into the community.",
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
