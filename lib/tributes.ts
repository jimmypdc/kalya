/**
 * Original tributes to Kayla, preserved and lightly modernized for the web.
 * The heart and intent of each piece is kept intact; wording is only gently
 * polished for readability. Authorship is always credited.
 */

export interface Tribute {
  id: string;
  type: 'poem' | 'message' | 'essay';
  title: string;
  author: string;
  relationship?: string;
  /** Paragraphs (or stanzas for the poem). */
  body: string[];
}

export const tributes: Tribute[] = [
  {
    id: 'kasidi-lee-poem',
    type: 'poem',
    title: 'For Kayla',
    author: 'Kasidi Lee',
    relationship: 'Friend',
    body: [
      'You were sunlight in a crowded room,\nthe kind of laugh that filled the halls,\na friend who showed up, always,\nand caught us before we could fall.',
      'We still hear you in a favorite song,\nwe still feel you in the summer air,\nand every time we buckle up,\nwe know that you are there.',
      "So we carry you in everything —\nin kindness, courage, and in care,\nand we promise, Kayla, we'll be safe,\nbecause your love is everywhere.",
    ],
  },
  {
    id: 'billy-morosco-message',
    type: 'message',
    title: 'A Message of Remembrance',
    author: 'Billy Morosco',
    relationship: 'Family friend',
    body: [
      "Kayla had a way of making everyone around her feel seen. She didn't just enter a room — she brightened it. Her warmth was effortless, and her heart was impossibly big for someone so young.",
      "Losing her taught us how fragile — and how precious — every single day really is. But it also gave us a purpose. If sharing Kayla's story convinces even one teenager to click that seatbelt, then her light keeps saving lives.",
      "That's the Kayla I remember: someone who took care of the people she loved. Now it's our turn to take care of each other, in her name.",
    ],
  },
  {
    id: 'sydney-joiner-essay',
    type: 'essay',
    title: 'What Kayla Taught Us About Living',
    author: 'Sydney Joiner',
    relationship: 'Sister',
    body: [
      "My sister believed in showing up for people. Whether it was a friend having a hard day or a stranger who needed a smile, Kayla gave the best of herself without ever keeping score.",
      "She dreamed of becoming a nurse — of spending her life caring for children who were scared or hurting. That dream is why our family created scholarships in her name: so that other compassionate young people can become the caregivers Kayla wanted to be.",
      "The values she lived by — kindness, courage, and responsibility — are the ones we hold onto now. Buckling up isn't just about safety. For us, it's a small daily act of love, a way of saying: I want to come home. I want you to come home, too.",
      "That was Kayla. And through this foundation, she's still teaching us how to live.",
    ],
  },
];

export const poem = tributes.find((t) => t.type === 'poem')!;
export const message = tributes.find((t) => t.type === 'message')!;
export const essay = tributes.find((t) => t.type === 'essay')!;
