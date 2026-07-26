import { readdir } from 'node:fs/promises';
import { join } from 'node:path';
import { CalendarDays, MapPin, Sparkles } from 'lucide-react';
import { events, type FoundationEvent } from '@/lib/events';
import LightboxGrid from '@/components/LightboxGrid';

/**
 * "Recent Events" timeline for the memorial page.
 *
 * Auto-discovers every folder in public/kayla/events/ and turns it into an
 * event. Photos in each folder appear under that event. Folders that match a
 * `slug` in lib/events.ts get the richer title/date/description defined there;
 * any other folder derives its title/year from the folder name (e.g.
 * "Jersey Shore - 2008" → "Jersey Shore", 2008).
 */

const IMAGE_EXT = /\.(jpe?g|png|webp|avif|gif)$/i;
const EVENTS_ROOT = join(process.cwd(), 'public', 'kayla', 'events');

interface ResolvedEvent extends FoundationEvent {
  photos: string[];
  year: number;
  order: number;
}

function encodePhoto(slug: string, file: string): string {
  return `/kayla/events/${encodeURIComponent(slug)}/${encodeURIComponent(file)}`;
}

function yearOf(text: string): number {
  const m = String(text).match(/\d{4}/);
  return m ? Number(m[0]) : 0;
}

/** Turn a folder name like "Jersey Shore - 2008" into a title + date. */
function deriveFromFolderName(name: string): { title: string; date: string } {
  const m = name.match(/^(.*?)\s*[-–]\s*(\d{4})\s*$/);
  if (m) return { title: m[1].trim(), date: m[2] };
  return { title: name, date: '' };
}

async function photosIn(slug: string): Promise<string[]> {
  try {
    const files = (await readdir(join(EVENTS_ROOT, slug)))
      .filter((f) => IMAGE_EXT.test(f))
      .sort((a, b) => a.localeCompare(b));
    return files.map((f) => encodePhoto(slug, f));
  } catch {
    return [];
  }
}

async function listEventFolders(): Promise<string[]> {
  try {
    const entries = await readdir(EVENTS_ROOT, { withFileTypes: true });
    return entries.filter((e) => e.isDirectory()).map((e) => e.name);
  } catch {
    return [];
  }
}

async function resolveEvents(): Promise<ResolvedEvent[]> {
  const folders = await listEventFolders();
  const bySlug = new Map(events.map((e, i) => [e.slug, { event: e, order: i }]));
  const seen = new Set<string>();
  const resolved: ResolvedEvent[] = [];

  // 1) Every folder on disk becomes an event (enriched if we have data for it).
  for (const folder of folders) {
    seen.add(folder);
    const photos = await photosIn(folder);
    const match = bySlug.get(folder);

    if (match) {
      resolved.push({
        ...match.event,
        photos,
        year: yearOf(match.event.date),
        order: match.order,
      });
    } else {
      // Unknown folder: derive from its name; skip if it has no photos.
      if (photos.length === 0) continue;
      const { title, date } = deriveFromFolderName(folder);
      resolved.push({
        slug: folder,
        title,
        date,
        photos,
        year: yearOf(date),
        order: 500,
      });
    }
  }

  // 2) Curated events whose folder doesn't exist yet still show as text cards.
  events.forEach((e, i) => {
    if (!seen.has(e.slug)) {
      resolved.push({ ...e, photos: [], year: yearOf(e.date), order: i });
    }
  });

  // Newest year first; ties broken by the order defined in lib/events.ts.
  resolved.sort((a, b) => b.year - a.year || a.order - b.order);
  return resolved;
}

export default async function EventsList() {
  const resolved = await resolveEvents();

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {resolved.map((event) => (
        <EventCard key={event.slug} event={event} />
      ))}

      <p className="pt-2 text-center text-sm text-teal-600">
        These events are just part of Kayla&apos;s story — and there is so much
        more still to come.
      </p>
    </div>
  );
}

function EventCard({ event }: { event: ResolvedEvent }) {
  return (
    <article className="card">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        {event.date && (
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-700">
            <CalendarDays className="h-4 w-4" aria-hidden />
            {event.date}
          </span>
        )}
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
      {event.description && (
        <p className="mt-2 leading-relaxed text-teal-800">{event.description}</p>
      )}

      {event.photos.length > 0 && (
        <div className="mt-4">
          <LightboxGrid
            photos={event.photos.map((src) => ({
              src,
              alt: `Photo from ${event.title}`,
            }))}
            sizes="(min-width: 640px) 20vw, 45vw"
          />
        </div>
      )}
    </article>
  );
}
