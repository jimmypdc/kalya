import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Heart,
  HandCoins,
  School,
  Share2,
  Users,
  Calendar,
  Mail,
} from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import SectionHeading from '@/components/SectionHeading';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Get Involved',
  description:
    "There are many ways to honor Kayla — take the pledge, donate, bring Buckle Up to your school, volunteer, or spread the word. Find the way that's right for you.",
};

export default function GetInvolvedPage() {
  return (
    <>
      <PageHeader
        eyebrow="Get Involved"
        title="Find your way to make a difference"
        description="Kayla brought people together — and that's exactly how her mission grows. Whether you have three seconds or a few hours, there's a place for you here."
      />

      {/* Ways to help */}
      <section className="section">
        <div className="container-content">
          <SectionHeading
            eyebrow="Ways to help"
            title="Every action carries her forward"
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {ways.map((w) => (
              <div key={w.title} className="card flex flex-col">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-900 text-white">
                  {w.icon}
                </span>
                <h3 className="mt-4 font-serif text-xl font-bold text-teal-900">
                  {w.title}
                </h3>
                <p className="mt-2 flex-1 text-teal-700">{w.body}</p>
                <Link
                  href={w.href}
                  className={`mt-5 ${w.primary ? 'btn-accent' : 'btn-outline'} w-full`}
                >
                  {w.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bring Buckle Up to your school */}
      <section className="section bg-teal-50/50">
        <div className="container-content grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              align="left"
              eyebrow="For schools & teams"
              title="Bring the Buckle Up message to your community"
              description="We partner with schools, sports teams, driver's-ed programs, and youth groups to share Kayla's story and the life-saving habit of buckling up."
            />
            <ul className="mt-8 space-y-3 text-teal-800">
              {[
                'Assembly presentations and guest speakers',
                'Pledge drives with printable pledge cards',
                'Awareness materials and campaign toolkits',
                'Safe-driving events around prom and graduation',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Heart
                    className="mt-1 h-4 w-4 shrink-0 fill-gold-400 text-gold-400"
                    aria-hidden
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <a
              href={`mailto:${siteConfig.email}?subject=Bring%20Buckle%20Up%20to%20our%20school`}
              className="btn-primary mt-8"
            >
              <Mail className="h-4 w-4" aria-hidden />
              Request a school partnership
            </a>
          </div>

          <div className="rounded-3xl bg-teal-900 p-8 text-white sm:p-10">
            <Calendar className="h-10 w-10 text-gold-400" aria-hidden />
            <h3 className="mt-4 font-serif text-2xl font-bold">
              Host or attend an event
            </h3>
            <p className="mt-3 text-teal-100">
              From awareness walks to fundraising nights, our events keep
              Kayla&apos;s memory alive and our mission moving. Reach out to learn
              what&apos;s coming up, or to plan one of your own.
            </p>
            <a
              href={`mailto:${siteConfig.email}?subject=Events`}
              className="btn-accent mt-6"
            >
              Get event details
            </a>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section pt-0">
        <div className="container-content">
          <div className="flex flex-col items-center gap-5 rounded-3xl bg-gradient-to-br from-teal-900 to-teal-800 px-8 py-12 text-center text-white">
            <Users className="h-12 w-12 text-gold-400" aria-hidden />
            <h2 className="font-serif text-3xl font-bold sm:text-4xl">
              Start with three seconds
            </h2>
            <p className="max-w-2xl text-teal-100">
              The simplest way to get involved is also the most powerful. Take
              the Buckle Up Pledge today — then invite someone you love to do the
              same.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/pledge" className="btn-accent">
                Take the Pledge
              </Link>
              <Link
                href="/donate"
                className="btn-outline border-white/25 bg-transparent text-white hover:bg-white/10"
              >
                Donate
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

const ways = [
  {
    icon: <Heart className="h-6 w-6" aria-hidden />,
    title: 'Take the Pledge',
    body: 'The three-second promise to always buckle up. Free, powerful, and the heart of everything we do.',
    href: '/pledge',
    cta: 'Take the Pledge',
    primary: true,
  },
  {
    icon: <HandCoins className="h-6 w-6" aria-hidden />,
    title: 'Donate',
    body: 'Fund scholarships and safety outreach with a one-time or monthly gift. Every dollar makes an impact.',
    href: '/donate',
    cta: 'Donate now',
    primary: false,
  },
  {
    icon: <School className="h-6 w-6" aria-hidden />,
    title: 'Partner your school',
    body: "Invite Buckle Up for Kayla to your school, team, or youth group for an assembly or pledge drive.",
    href: `mailto:${siteConfig.email}?subject=School%20Partnership`,
    cta: 'Reach out',
    primary: false,
  },
  {
    icon: <Share2 className="h-6 w-6" aria-hidden />,
    title: 'Spread the word',
    body: "Share Kayla's story on social media and challenge friends to take the pledge. Awareness saves lives.",
    href: '/story',
    cta: "Read & share Kayla's story",
    primary: false,
  },
  {
    icon: <Users className="h-6 w-6" aria-hidden />,
    title: 'Volunteer',
    body: 'Lend your time and talents at events, pledge drives, and campaigns. We can always use passionate help.',
    href: `mailto:${siteConfig.email}?subject=Volunteering`,
    cta: 'Volunteer with us',
    primary: false,
  },
  {
    icon: <Mail className="h-6 w-6" aria-hidden />,
    title: 'Stay connected',
    body: "Get updates on scholarships, events, and safety campaigns. We'll only email when it matters.",
    href: `mailto:${siteConfig.email}?subject=Stay%20Connected`,
    cta: 'Keep in touch',
    primary: false,
  },
];
