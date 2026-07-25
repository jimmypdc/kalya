import type { Metadata } from 'next';
import Link from 'next/link';
import { Quote, TrendingUp, Heart, Mail } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import SectionHeading from '@/components/SectionHeading';
import StatGrid from '@/components/StatGrid';
import { stats, siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Our Impact',
  description:
    'The mission of the Kayla Marie Joiner Foundation — teen seatbelt safety and pediatric nursing scholarships — and the difference your support makes as this community grows.',
};

export default function ImpactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our Impact"
        title="Turning love into lives protected"
        description="This foundation is built on a simple belief: Kayla's story can keep other families whole. Here's what drives us — and the difference your support makes as this community grows."
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
            title="How every gift is put to work"
            description="We're committed to directing the greatest share of every dollar straight to scholarships, while keeping the safety mission strong and operations lean."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {allocations.map((a) => (
              <div key={a.title} className="card">
                <span className="inline-flex rounded-full bg-teal-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-teal-800">
                  {a.tag}
                </span>
                <h3 className="mt-3 font-serif text-lg font-bold text-teal-900">
                  {a.title}
                </h3>
                <p className="mt-2 text-sm text-teal-700">{a.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Voices — honest invitation instead of fabricated testimonials */}
      <section className="section">
        <div className="container-content">
          <div className="rounded-3xl border border-teal-900/10 bg-teal-50 p-8 text-center sm:p-12">
            <Quote className="mx-auto h-10 w-10 text-gold-400" aria-hidden />
            <h2 className="mt-4 font-serif text-3xl font-bold text-teal-900 sm:text-4xl">
              The best stories are still being written
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-teal-700">
              As this community grows, so will the voices in it — teens who chose
              to buckle up, students becoming the nurses Kayla dreamed of being,
              and families who felt her story. Has Kayla&apos;s mission touched
              your life? We would be honored to hear it.
            </p>
            <a
              href={`mailto:${siteConfig.email}?subject=My%20Kayla%20story`}
              className="btn-primary mt-6"
            >
              <Mail className="h-4 w-4" aria-hidden />
              Share your story
            </a>
          </div>
        </div>
      </section>

      {/* Momentum CTA */}
      <section className="section pt-0">
        <div className="container-content">
          <div className="flex flex-col items-center gap-5 rounded-3xl bg-teal-900 px-8 py-12 text-center text-white">
            <TrendingUp className="h-12 w-12 text-gold-400" aria-hidden />
            <h2 className="font-serif text-3xl font-bold sm:text-4xl">
              Help this mission grow
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
    tag: 'Primary focus',
    body: 'The greatest share of every gift funds direct awards to students pursuing nursing and pediatric care.',
  },
  {
    title: 'Safety outreach',
    tag: 'Ongoing',
    body: 'School assemblies, campaign materials, and Buckle Up events that spread the message.',
  },
  {
    title: 'Operations',
    tag: 'Kept lean',
    body: 'The essentials of running the foundation responsibly and transparently.',
  },
];
