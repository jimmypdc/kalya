import { Quote, Heart } from 'lucide-react';
import type { PublicMemory } from '@/lib/memories';

/**
 * Displays approved memorial guestbook entries. Purely presentational — the
 * server page fetches approved memories and passes them in.
 */
export default function MemoryWall({ memories }: { memories: PublicMemory[] }) {
  if (memories.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-teal-900/20 bg-white p-10 text-center">
        <Heart
          className="mx-auto h-10 w-10 fill-gold-400 text-gold-400"
          aria-hidden
        />
        <p className="mt-3 text-teal-700">
          No memories have been posted here yet. Be the first to share a story or
          a message in Kayla&apos;s honor — it would mean so much.
        </p>
      </div>
    );
  }

  return (
    <ul className="columns-1 gap-6 sm:columns-2 lg:columns-3 [&>li]:mb-6">
      {memories.map((m, i) => (
        <li
          key={i}
          className="break-inside-avoid rounded-2xl border border-teal-900/10 bg-white p-6 shadow-sm"
        >
          <Quote className="h-6 w-6 text-gold-400" aria-hidden />
          <p className="mt-3 whitespace-pre-line leading-relaxed text-teal-800">
            {m.message}
          </p>
          <footer className="mt-4 border-t border-teal-900/10 pt-3 text-sm">
            <span className="font-semibold text-teal-900">{m.name}</span>
            {m.location && (
              <span className="text-teal-600"> · {m.location}</span>
            )}
            {m.date && (
              <span className="mt-0.5 block text-xs text-teal-500">{m.date}</span>
            )}
          </footer>
        </li>
      ))}
    </ul>
  );
}
