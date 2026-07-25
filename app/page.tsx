import Link from 'next/link';
import {
  ArrowRight,
  Heart,
  ShieldCheck,
  GraduationCap,
  Users,
  Quote,
} from 'lucide-react';
import KaylaImage from '@/components/KaylaImage';
import StatGrid from '@/components/StatGrid';
import SectionHeading from '@/components/SectionHeading';
import PledgeForm from '@/components/PledgeForm';
import TributeCard from '@/components/TributeCard';
import { buildStats, kayla } from '@/lib/site';
import { getPledgeCount } from '@/lib/pledges';
import { poem, message } from '@/lib/tributes';

// Re-generate every 5 minutes so the live pledge count stays current
// without making the page fully dynamic.
export const revalidate = 300;

export default async function HomePage() {
  const stats = buildStats(await getPledgeCount());

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-teal-950 text-white">
        {/* Decorative gradient wash */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-br from-teal-950 via-teal-900 to-teal-800"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-gold-400/10 blur-3xl"
        />

        <div className="container-content relative grid items-center gap-12 py-20 lg:grid-cols-2 lg:py-28">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-gold-300 ring-1 ring-white/15">
              <Heart className="h-3.5 w-3.5 fill-gold-400 text-gold-400" aria-hidden />
              In loving memory of {kayla.fullName}
            </span>

            <h1 className="mt-6 font-serif text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              Buckle up.
              <span className="block text-gold-400">For Kayla.</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-teal-100">
              Kayla Marie Joiner was full of light, laughter, and a dream of
              caring for children as a nurse. We carry her forward by keeping
              teens safe on the road and helping the next generation of
              pediatric nurses chase the dream she couldn&apos;t finish.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/pledge" className="btn-accent">
                Take the Pledge
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <Link
                href="/donate"
                className="btn-outline border-white/25 bg-transparent text-white hover:bg-white/10"
              >
                Donate
              </Link>
              <Link
                href="/story"
                className="btn-ghost text-teal-100 hover:bg-white/10 hover:text-white"
              >
                Read Kayla&apos;s Story
              </Link>
            </div>

            <p className="mt-6 text-sm text-teal-300">
              {kayla.born} — {kayla.passed}
            </p>
          </div>

          {/* Hero image */}
          <div className="animate-fade-in">
            <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-3xl ring-4 ring-white/10 shadow-2xl">
              {/* PLACEHOLDER — swap in a favorite photo of Kayla. See KaylaImage.tsx */}
              <KaylaImage variant="hero" priority sizes="(min-width: 1024px) 28rem, 100vw" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-teal-950/80 to-transparent p-6">
                <p className="font-serif text-lg italic text-white">
                  &ldquo;Her love is everywhere.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ────────────────────────────────────────────── */}
      <section className="section bg-teal-50/50">
        <div className="container-content">
          <SectionHeading
            eyebrow="Why we're here"
            title="One life. A lasting mission."
            description="A three-second habit, a family's love, and a community coming together — every pledge and every gift carries Kayla’s memory forward, and helps another family avoid the heartbreak ours knows too well."
          />
          <div className="mt-12">
            <StatGrid stats={stats} />
          </div>
        </div>
      </section>

      {/* ── Three pillars ────────────────────────────────────── */}
      <section className="section">
        <div className="container-content">
          <SectionHeading
            eyebrow="What we do"
            title="Three promises we keep in her name"
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <Pillar
              icon={<ShieldCheck className="h-6 w-6" aria-hidden />}
              title="Keep teens safe"
              body="We bring the Buckle Up message to schools, teams, and families — turning a three-second habit into a lifelong one."
              href="/buckle-up"
              cta="See the safety message"
            />
            <Pillar
              icon={<GraduationCap className="h-6 w-6" aria-hidden />}
              title="Fund future nurses"
              body="Our scholarships support compassionate students pursuing pediatric nursing — the career Kayla dreamed of."
              href="/scholarships"
              cta="Explore scholarships"
            />
            <Pillar
              icon={<Users className="h-6 w-6" aria-hidden />}
              title="Bring people together"
              body="From pledge drives to awareness events, we build a community that looks out for one another."
              href="/get-involved"
              cta="Get involved"
            />
          </div>
        </div>
      </section>

      {/* ── Tributes preview ─────────────────────────────────── */}
      <section className="section bg-teal-50/50">
        <div className="container-content">
          <SectionHeading
            eyebrow="In her own community's words"
            title="How Kayla is remembered"
            description="Friends and family shared these tributes. We keep them here, in her honor."
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <TributeCard tribute={poem} />
            <TributeCard tribute={message} />
          </div>
          <div className="mt-8 text-center">
            <Link href="/story" className="btn-primary">
              Read all tributes & Kayla&apos;s story
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Pledge ───────────────────────────────────────────── */}
      <section className="section">
        <div className="container-content grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              align="left"
              eyebrow="A three-second promise"
              title="Take the Buckle Up Pledge"
              description="It’s the simplest way to honor Kayla — and it might save your life or someone you love. Add your name and join thousands who’ve promised to always buckle up."
            />
            <ul className="mt-8 space-y-4">
              {[
                'Promise to always wear your seatbelt — every seat, every trip.',
                'Speak up and ask the people you love to buckle up too.',
                'Help us reach the next teen with a message that matters.',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-teal-800">
                  <Heart
                    className="mt-1 h-5 w-5 shrink-0 fill-gold-400 text-gold-400"
                    aria-hidden
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div id="pledge">
            <PledgeForm />
          </div>
        </div>
      </section>

      {/* ── Impact CTA ───────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-teal-900 text-white">
        <div className="container-content grid items-center gap-10 py-16 lg:grid-cols-5 lg:py-20">
          <div className="lg:col-span-3">
            <Quote className="h-10 w-10 text-gold-400" aria-hidden />
            <blockquote className="mt-4 font-serif text-2xl font-medium leading-relaxed sm:text-3xl">
              &ldquo;If sharing Kayla&apos;s story convinces even one teenager to
              click that seatbelt, then her light keeps saving lives.&rdquo;
            </blockquote>
            <p className="mt-4 text-teal-200">— {message.author}, {message.relationship}</p>
          </div>
          <div className="lg:col-span-2">
            <div className="rounded-2xl bg-white/5 p-8 ring-1 ring-white/10">
              <h3 className="font-serif text-2xl font-bold">
                Your gift becomes her legacy
              </h3>
              <p className="mt-2 text-teal-100">
                Fund scholarships, safety campaigns, and school visits. Every
                dollar carries Kayla forward.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link href="/donate" className="btn-accent w-full sm:w-auto">
                  Donate now
                </Link>
                <Link
                  href="/impact"
                  className="btn-outline w-full border-white/25 bg-transparent text-white hover:bg-white/10 sm:w-auto"
                >
                  See our impact
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Pillar({
  icon,
  title,
  body,
  href,
  cta,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
  href: string;
  cta: string;
}) {
  return (
    <div className="card flex flex-col">
      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-900 text-white">
        {icon}
      </span>
      <h3 className="mt-4 font-serif text-xl font-bold text-teal-900">
        {title}
      </h3>
      <p className="mt-2 flex-1 text-teal-700">{body}</p>
      <Link
        href={href}
        className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-teal-700 hover:text-teal-900"
      >
        {cta}
        <ArrowRight className="h-4 w-4" aria-hidden />
      </Link>
    </div>
  );
}
