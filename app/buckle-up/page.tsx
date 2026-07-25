import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { access } from 'node:fs/promises';
import { join } from 'node:path';
import { ShieldCheck, AlertTriangle, Clock, Users, Heart } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import SectionHeading from '@/components/SectionHeading';
import KaylaImage from '@/components/KaylaImage';
import { safetyStats } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Buckle Up for Kayla',
  description:
    'Teen seatbelt safety saves lives. Learn the facts, take the three-second habit seriously, and join the Buckle Up for Kayla movement.',
};

// The campaign poster section renders only when the image file is present, so
// nothing looks broken before it's added. To show it, add the poster at:
//   public/kayla/buckle-up-poster.jpg
const POSTER_PATH = '/kayla/buckle-up-poster.jpg';

async function posterExists(): Promise<boolean> {
  try {
    await access(join(process.cwd(), 'public', 'kayla', 'buckle-up-poster.jpg'));
    return true;
  } catch {
    return false;
  }
}

export default async function BuckleUpPage() {
  const hasPoster = await posterExists();

  return (
    <>
      <PageHeader
        eyebrow="The Safety Message"
        title="A three-second habit that saves lives"
        description="Motor vehicle crashes are a leading cause of death for teens — and far too often, a seatbelt could have made the difference. This is why we do what we do."
      >
        <Link href="/pledge" className="btn-accent">
          Take the Buckle Up Pledge
          <Heart className="h-4 w-4" aria-hidden />
        </Link>
      </PageHeader>

      {/* Why it matters */}
      <section className="section">
        <div className="container-content grid items-center gap-12 lg:grid-cols-2">
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-3xl shadow-xl ring-1 ring-teal-900/10">
            {/* PLACEHOLDER — a fastened seatbelt image. */}
            <KaylaImage variant="safety" sizes="(min-width: 1024px) 44rem, 100vw" />
          </div>
          <div>
            <SectionHeading
              align="left"
              eyebrow="Why it matters"
              title="Kayla’s story is a reminder we can’t ignore"
              description="We share the facts not to frighten, but to empower. When teens understand the risk — and the ease of the fix — they buckle up. And when they buckle up, they come home."
            />
            <ul className="mt-8 space-y-4">
              <MessageItem
                icon={<Clock className="h-5 w-5" aria-hidden />}
                text="It takes about three seconds to buckle up — the single most effective way to protect yourself in a crash."
              />
              <MessageItem
                icon={<Users className="h-5 w-5" aria-hidden />}
                text="Buckling up isn't just for the driver. Every passenger, in every seat, on every trip."
              />
              <MessageItem
                icon={<AlertTriangle className="h-5 w-5" aria-hidden />}
                text="Most teen crash fatalities happen close to home, on familiar roads, at everyday speeds."
              />
            </ul>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="section bg-teal-50/50">
        <div className="container-content">
          <SectionHeading
            eyebrow="The statistics"
            title="What the numbers tell us"
            description="Current figures from national safety organizations. Behind every statistic is a family — like ours."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {safetyStats.map((s) => (
              <div key={s.text} className="card flex items-start gap-5">
                <span className="font-serif text-4xl font-bold text-teal-900">
                  {s.stat}
                </span>
                <div>
                  <p className="text-teal-800">{s.text}</p>
                  <p className="mt-2 text-xs font-medium uppercase tracking-wide text-teal-500">
                    Source: {s.source}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-xs text-teal-500">
            Statistics are drawn from NHTSA and CDC guidance. Please verify and
            update figures periodically for accuracy.
          </p>
        </div>
      </section>

      {/* National campaign poster (renders only when the file exists) */}
      {hasPoster && (
        <section className="section pt-0">
          <div className="container-content">
            <div className="grid items-center gap-10 lg:grid-cols-2">
              <div>
                <SectionHeading
                  align="left"
                  eyebrow="A national campaign"
                  title="Kayla's story, shared to save lives"
                  description="Kayla was featured in the “Seat Belts Save Lives” campaign alongside other Florida teens — created with the Florida Pediatric Society, the American Academy of Pediatrics, and News Channel 8."
                />
                <p className="mt-6 text-teal-700">
                  Four teens. One survivor. The poster asks the question that
                  sits at the heart of everything we do:{' '}
                  <strong className="text-teal-900">
                    which one will you be?
                  </strong>{' '}
                  A seatbelt is the difference between a statistic and a story
                  that gets to continue.
                </p>
                <Link href="/pledge" className="btn-accent mt-8">
                  Take the Pledge
                  <Heart className="h-4 w-4" aria-hidden />
                </Link>
              </div>

              <figure className="mx-auto w-full max-w-md">
                <Image
                  src={POSTER_PATH}
                  alt="“Seat Belts Save Lives” campaign poster featuring Kayla Joiner and three other Florida teens — only one of whom survived a crash."
                  width={1050}
                  height={1500}
                  sizes="(min-width: 1024px) 28rem, 100vw"
                  className="h-auto w-full rounded-2xl shadow-xl ring-1 ring-teal-900/10"
                />
                <figcaption className="mt-3 text-center text-xs text-teal-500">
                  Public safety campaign poster. Kayla Joiner, Parkland, FL.
                </figcaption>
              </figure>
            </div>
          </div>
        </section>
      )}

      {/* Safe driving habits */}
      <section className="section">
        <div className="container-content">
          <SectionHeading
            eyebrow="Buckle Up + more"
            title="Five habits every teen driver should keep"
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {habits.map((h, i) => (
              <div key={h.title} className="card">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-900 text-sm font-bold text-white">
                    {i + 1}
                  </span>
                  <h3 className="font-serif text-lg font-bold text-teal-900">
                    {h.title}
                  </h3>
                </div>
                <p className="mt-3 text-teal-700">{h.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section pt-0">
        <div className="container-content">
          <div className="flex flex-col items-center gap-6 rounded-3xl bg-teal-900 px-8 py-12 text-center text-white">
            <ShieldCheck className="h-12 w-12 text-gold-400" aria-hidden />
            <h2 className="font-serif text-3xl font-bold sm:text-4xl">
              Make the promise. Share the message.
            </h2>
            <p className="max-w-2xl text-teal-100">
              Add your name to the Buckle Up Pledge, then challenge three friends
              to do the same. That&apos;s how a movement — and a life-saving
              habit — spreads.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/pledge" className="btn-accent">
                Take the Pledge
              </Link>
              <Link
                href="/get-involved"
                className="btn-outline border-white/25 bg-transparent text-white hover:bg-white/10"
              >
                Bring the message to your school
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function MessageItem({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <li className="flex items-start gap-3 text-teal-800">
      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal-100 text-teal-800">
        {icon}
      </span>
      <span>{text}</span>
    </li>
  );
}

const habits = [
  {
    title: 'Buckle up first',
    body: 'Before the car moves an inch, everyone is belted — no exceptions, no "just down the street."',
  },
  {
    title: 'Phone away',
    body: 'Silence it, stow it, or hand it to a passenger. A text is never worth a life.',
  },
  {
    title: 'Mind your speed',
    body: 'Speed reduces reaction time and increases crash severity. Give yourself room to respond.',
  },
  {
    title: 'Limit distractions',
    body: 'Loud music, extra passengers, and eating on the go all pull focus from the road.',
  },
  {
    title: 'Never impaired',
    body: 'Never drive after drinking or using substances — and never ride with someone who has.',
  },
  {
    title: 'Speak up',
    body: 'If you feel unsafe as a passenger, say something. Real friends buckle up for each other.',
  },
];
