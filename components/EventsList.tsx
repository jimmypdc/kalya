import Image from 'next/image';
import { readdir } from 'node:fs/promises';
import { join } from 'node:path';
import { CalendarDays, MapPin, Sparkles } from 'lucide-react';
import { events, type FoundationEvent } from '@/lib/events';

/**
 * "Recent Events" timeline for the memorial page.
 *
 * Each event's photos are auto-discovered from public/kayla/events/<slug>/ —
 * drop image files into that folder and they appear under the event. Events
 * with no photos simply render as text cards.
 */

const IMAGE_EXT = /\.(jpe?g|png|webp|avif|gif)$/i;

async function photosFor(slug: string): Promise<string[]> {
  try {
    const dir = join(process.cwd(), 'public', 'kayla', 'events', slug);
    const files = (await readdir(dir))
      .filter((f) => IMAGE_EXT.test(f))
      .sort((a, b) => a.localeCompare(b));
    return files.map((f) => `/kayla/events/${slug}/${f}`);
  } catch {
    return [];
  }
}

export default async function EventsList() {
  const enriched = await Promise.all(
    events.map(async (e) => ({ event: e, photos: await photosFor(e.slug) })),
  );

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {enriched.map(({ event, photos }) => (
        <EventCard key={event.slug} event={event} photos={photos} />
      ))}

      <p className="pt-2 text-center text-sm text-teal-600">
        These events are just the beginning of Kayla&apos;s legacy — and there is
        so much more to come.
      </p>
    </div>
  );
}

function EventCard({
  event,
  photos,
}: {
  event: FoundationEvent;
  photos: string[];
}) {
  return (
    <article className="card">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-700">
          <CalendarDays className="h-4 w-4" aria-hidden />
          {event.date}
        </span>
        {event.location && (
          <span className="inline-flex items-center gap-1.5 text-sm text-teal-600">
            <MapPin className="h-4 w-4" aria-hidden />
            {event.location}
          </span>
        )}
        {event.highlight && (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-gold-100 px-3 py-1 text-xs font-semibold text-gold-700">
            <Sparkles className="h-3.5 w-3.5" aria-hidden />
            {event.highlight}
          </span>
        )}
      </div>

      <h3 className="mt-3 font-serif text-xl font-bold text-teal-900">
        {event.title}
      </h3>
      <p className="mt-2 leading-relaxed text-teal-800">{event.description}</p>

      {photos.length > 0 && (
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {photos.map((src) => (
            <div
              key={src}
              className="relative aspect-square overflow-hidden rounded-xl bg-teal-100 ring-1 ring-teal-900/10"
            >
              <Image
                src={src}
                alt={`Photo from ${event.title}`}
                fill
                sizes="(min-width: 640px) 20vw, 45vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      )}
    </article>
  );
}
