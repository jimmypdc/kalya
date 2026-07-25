import type { Metadata } from 'next';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import SectionHeading from '@/components/SectionHeading';
import PhotoGallery from '@/components/PhotoGallery';
import MemoryForm from '@/components/MemoryForm';
import MemoryWall from '@/components/MemoryWall';
import { kayla } from '@/lib/site';
import { poem } from '@/lib/tributes';
import { getApprovedMemories } from '@/lib/memories';

export const metadata: Metadata = {
  title: 'Memorial',
  description:
    'A photo memorial for Kayla Marie Joiner (1991–2007). Look through her gallery, and leave a memory or message in her honor.',
};

// Refresh so newly-approved memories appear.
export const revalidate = 120;

export default async function MemorialPage() {
  const memories = await getApprovedMemories();

  return (
    <>
      <PageHeader
        eyebrow="Memorial"
        title="In loving memory of Kayla"
        description={`${kayla.born} — ${kayla.passed}. A place to remember Kayla — her smile, her spirit, and the way she made everyone feel they belonged. Look through her photos, and leave a memory below.`}
      />

      {/* Photo gallery */}
      <section className="section">
        <div className="container-content">
          <SectionHeading
            eyebrow="Her light"
            title="A life full of love"
            description="Every photo holds a moment we hold onto — a smile, a memory, a piece of the light Kayla brought to everyone around her."
          />
          <div className="mt-12">
            <PhotoGallery />
          </div>
        </div>
      </section>

      {/* A verse */}
      <section className="bg-teal-900 py-16 text-white">
        <div className="container-content text-center">
          <Heart
            className="mx-auto h-9 w-9 fill-gold-400 text-gold-400"
            aria-hidden
          />
          <blockquote className="mx-auto mt-5 max-w-2xl whitespace-pre-line font-serif text-2xl italic leading-relaxed">
            {poem.body[poem.body.length - 1]}
          </blockquote>
          <p className="mt-4 text-teal-200">— {poem.author}</p>
        </div>
      </section>

      {/* Leave a memory */}
      <section className="section">
        <div className="container-content grid items-start gap-12 lg:grid-cols-2">
          <div className="lg:sticky lg:top-24">
            <SectionHeading
              align="left"
              eyebrow="The guestbook"
              title="Leave a memory"
              description="Whether you knew Kayla or were simply touched by her story, your words help keep her light alive. Share a memory, a moment, or a message for her family."
            />
            <div className="mt-6 rounded-2xl bg-teal-50 p-6 text-sm text-teal-700">
              To protect this space, every memory is gently reviewed before it
              appears on the wall. Thank you for your patience — and your love.
            </div>
          </div>
          <MemoryForm />
        </div>
      </section>

      {/* Memory wall */}
      <section className="section bg-teal-50/50 pt-0 sm:pt-0">
        <div className="container-content pt-16 sm:pt-24">
          <SectionHeading
            eyebrow="The memory wall"
            title="Words shared in her honor"
          />
          <div className="mt-12">
            <MemoryWall memories={memories} />
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="section pt-0">
        <div className="container-content">
          <div className="flex flex-col items-center gap-5 rounded-3xl bg-teal-900 px-8 py-12 text-center text-white">
            <h2 className="font-serif text-3xl font-bold sm:text-4xl">
              Carry her memory forward
            </h2>
            <p className="max-w-2xl text-teal-100">
              The most meaningful way to honor Kayla is to live out her values —
              buckle up, and help the next generation of caregivers.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/pledge" className="btn-accent">
                Take the Pledge
              </Link>
              <Link
                href="/donate"
                className="btn-outline border-white/25 bg-transparent text-white hover:bg-white/10"
              >
                Donate in her memory
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
