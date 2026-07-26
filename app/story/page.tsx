import type { Metadata } from 'next';
import Link from 'next/link';
import { Heart, ArrowRight } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import KaylaImage from '@/components/KaylaImage';
import SectionHeading from '@/components/SectionHeading';
import TributeCard from '@/components/TributeCard';
import ShareButtons from '@/components/ShareButtons';
import { kayla } from '@/lib/site';
import { tributes } from '@/lib/tributes';

export const metadata: Metadata = {
  title: "Kayla's Story",
  description:
    "The life and legacy of Kayla Marie Joiner (1991–2007) — remembered with love, and carried forward through teen seatbelt safety and pediatric nursing scholarships.",
};

export default function StoryPage() {
  return (
    <>
      <PageHeader
        eyebrow="Her Story"
        title="Remembering Kayla Marie Joiner"
        description={`${kayla.born} — ${kayla.passed}. A daughter, sister, and friend whose kindness still lights the way.`}
      />

      {/* Life story */}
      <section className="section">
        <div className="container-content grid items-start gap-12 lg:grid-cols-2">
          {/* Sized close to the photo's native resolution (240x320) so it stays
              sharp. If a higher-res scan is added later, max-w can grow again. */}
          <div className="relative mx-auto aspect-[3/4] w-full max-w-xs overflow-hidden rounded-3xl shadow-xl ring-1 ring-teal-900/10 lg:sticky lg:top-24">
            <KaylaImage variant="portrait" sizes="20rem" />
          </div>

          <div className="prose-teal max-w-none space-y-6 text-lg leading-relaxed text-teal-800">
            <p>
              Kayla Marie Joiner was born on{' '}
              <strong className="text-teal-900">{kayla.born}</strong>. From the
              start, she had a gift for making people feel like they belonged.
              She was the friend who remembered the little things, the one who
              showed up when it mattered, and the girl whose laugh could fill a
              whole room.
            </p>
            <p>
              She dreamed of becoming a nurse — specifically, of caring for
              children who were sick or scared. It suited her perfectly. Kayla
              had a natural tenderness, a way of making the people around her
              feel safe and seen.
            </p>
            <p>
              On <strong className="text-teal-900">{kayla.passed}</strong>,
              Kayla&apos;s life was cut short in a car accident. She was just 16.
              The loss left a hole that will never fully close — but it also gave
              our family a mission we hold onto every single day.
            </p>
            <blockquote className="rounded-r-xl border-l-4 border-gold-400 bg-teal-50 py-4 pl-6 pr-4 not-italic">
              <p className="font-serif text-xl text-teal-900">
                &ldquo;Buckling up isn&apos;t just about safety. For us, it&apos;s
                a small daily act of love — a way of saying: I want to come home.
                I want you to come home, too.&rdquo;
              </p>
              <cite className="mt-2 block text-sm not-italic text-teal-600">
                — Sydney Joiner, Kayla&apos;s sister
              </cite>
            </blockquote>
            <p>
              The Kayla Marie Joiner Foundation was created to turn that love
              into action. Through the <strong>Buckle Up for Kayla</strong>{' '}
              campaign, we remind teens that a three-second habit can save a
              lifetime. And through scholarships in her name, we help
              compassionate students become the pediatric nurses Kayla always
              wanted to be.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link href="/pledge" className="btn-accent">
                Take the Pledge in her memory
                <Heart className="h-4 w-4" aria-hidden />
              </Link>
              <Link href="/scholarships" className="btn-outline">
                Explore scholarships
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Tributes */}
      <section className="section bg-teal-50/50">
        <div className="container-content">
          <SectionHeading
            eyebrow="Tributes"
            title="In the words of those who loved her"
            description="These heartfelt tributes were written by Kayla’s friends and family. We preserve them here, exactly in the spirit they were given."
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {tributes.map((tribute) => (
              <TributeCard key={tribute.id} tribute={tribute} />
            ))}
          </div>

          {/* Share */}
          <div className="mt-12 flex flex-col items-center gap-4 rounded-2xl border border-teal-900/10 bg-white p-6 text-center sm:flex-row sm:justify-between sm:text-left">
            <div>
              <h3 className="font-serif text-lg font-bold text-teal-900">
                Share Kayla&apos;s story
              </h3>
              <p className="mt-1 text-sm text-teal-700">
                Sharing her story could be the reason someone buckles up. Pass it
                on.
              </p>
            </div>
            <ShareButtons
              title="Kayla's Story — Buckle Up for Kayla"
              text="Kayla Marie Joiner's story is a reminder to always buckle up. Read it, and take the pledge."
            />
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="section">
        <div className="container-content">
          <div className="rounded-3xl bg-teal-900 px-8 py-12 text-center text-white sm:px-16">
            <h2 className="font-serif text-3xl font-bold sm:text-4xl">
              Help us keep her light shining
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-teal-100">
              Every pledge and every gift carries Kayla&apos;s story to another
              person who needs to hear it.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/donate" className="btn-accent">
                Donate in Kayla&apos;s memory
              </Link>
              <Link
                href="/get-involved"
                className="btn-outline border-white/25 bg-transparent text-white hover:bg-white/10"
              >
                Find other ways to help
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
