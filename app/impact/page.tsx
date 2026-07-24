import type { Metadata } from 'next';
import Link from 'next/link';
import { Quote, TrendingUp, Heart } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import SectionHeading from '@/components/SectionHeading';
import StatGrid from '@/components/StatGrid';
import { stats } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Our Impact',
  description:
    "See the impact of the Kayla Marie Joiner Foundation — pledges taken, scholarships awarded, schools reached, and the voices of the people we've touched.",
};

export default function ImpactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our Impact"
        title="Kayla's memory, measured in lives touched"
        description="Every number here represents a real teen who chose to buckle up, a student pursuing their calling, or a family that felt Kayla's story. This is her legacy at work."
      />

      {/* Headline stats */}
      <section className="section">
        <div className="container-content">
          <StatGrid stats={stats} />
        </div>
      </section>

      {/* Where support goes */}
      <section className="section bg-teal-50/50 pt-0 sm:pt-0">
        <div className="container-content pt-16 sm:pt-24">
          <SectionHeading
            eyebrow="Where your support goes"
            title="Turning generosity into action"
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {allocations.map((a) => (
              <div key={a.title} className="card">
                <div className="flex items-baseline justify-between">
                  <h3 className="font-serif text-lg font-bold text-teal-900">
                    {a.title}
                  </h3>
                  <span className="font-serif text-2xl font-bold text-gold-500">
                    {a.pct}
                  </span>
                </div>
                <div
                  className="mt-3 h-2 w-full overflow-hidden rounded-full bg-teal-100"
                  role="presentation"
                >
                  <div
                    className="h-full rounded-full bg-teal-800"
                    style={{ width: a.pct }}
                  />
                </div>
                <p className="mt-3 text-sm text-teal-700">{a.body}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-xs text-teal-500">
            Illustrative allocation. Replace with your foundation&apos;s audited
            figures as they become available.
          </p>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section">
        <div className="container-content">
          <SectionHeading
            eyebrow="Voices"
            title="What our community says"
            description="The impact we're proudest of can't always be counted — but you can hear it."
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {testimonials.map((t) => (
              <figure key={t.author} className="card flex h-full flex-col">
                <Quote className="h-8 w-8 text-gold-400" aria-hidden />
                <blockquote className="mt-3 flex-1 text-teal-800">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-5 border-t border-teal-900/10 pt-4 text-sm">
                  <span className="font-semibold text-teal-900">{t.author}</span>
                  <span className="block text-teal-600">{t.role}</span>
                </figcaption>
              </figure>
            ))}
          </div>
          <p className="mt-6 text-center text-xs text-teal-500">
            Testimonials are representative examples. Replace with real,
            attributed quotes as you collect them.
          </p>
        </div>
      </section>

      {/* Momentum CTA */}
      <section className="section pt-0">
        <div className="container-content">
          <div className="flex flex-col items-center gap-5 rounded-3xl bg-teal-900 px-8 py-12 text-center text-white">
            <TrendingUp className="h-12 w-12 text-gold-400" aria-hidden />
            <h2 className="font-serif text-3xl font-bold sm:text-4xl">
              Help us grow every one of these numbers
            </h2>
            <p className="max-w-2xl text-teal-100">
              More pledges. More scholarships. More schools reached. With your
              support, Kayla&apos;s impact keeps expanding.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/donate" className="btn-accent">
                Donate
                <Heart className="h-4 w-4" aria-hidden />
              </Link>
              <Link
                href="/pledge"
                className="btn-outline border-white/25 bg-transparent text-white hover:bg-white/10"
              >
                Take the Pledge
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

const allocations = [
  {
    title: 'Scholarships',
    pct: '60%',
    body: 'Direct awards to students pursuing nursing and pediatric care.',
  },
  {
    title: 'Safety outreach',
    pct: '30%',
    body: 'School assemblies, campaign materials, and Buckle Up events.',
  },
  {
    title: 'Operations',
    pct: '10%',
    body: 'Keeping the foundation running responsibly and transparently.',
  },
];

const testimonials = [
  {
    quote:
      "After the Buckle Up for Kayla assembly, my whole team started checking each other before every ride. It became second nature. Kayla's story stuck with us.",
    author: 'High school coach',
    role: 'Buckle Up school partner',
  },
  {
    quote:
      "Receiving the Kayla Marie Joiner scholarship meant I could keep going toward my nursing degree. I think of her every time I care for a child on my unit.",
    author: 'Scholarship recipient',
    role: 'Pediatric nursing student',
  },
  {
    quote:
      "As a parent, this foundation gave me the words to talk to my teen about seatbelts. It's a conversation that could save their life.",
    author: 'Parent & pledge-taker',
    role: 'Community member',
  },
];
