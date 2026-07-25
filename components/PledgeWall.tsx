import { Heart, Quote } from 'lucide-react';
import type { PublicPledge } from '@/lib/pledges';

interface PledgeWallProps {
  pledges: PublicPledge[];
  count: number | null;
}

/**
 * Displays recent public pledges as a warm "wall" of first names.
 * Purely presentational — the server page fetches the data and passes it in.
 * Shows an inviting empty state before any pledges exist.
 */
export default function PledgeWall({ pledges, count }: PledgeWallProps) {
  const hasPledges = pledges.length > 0;

  return (
    <div>
      {/* Count headline */}
      <div className="text-center">
        {count && count > 0 ? (
          <p className="font-serif text-2xl font-bold text-teal-900 sm:text-3xl">
            <span className="text-gold-500">{count.toLocaleString('en-US')}</span>{' '}
            {count === 1 ? 'person has' : 'people have'} promised to buckle up
          </p>
        ) : (
          <p className="font-serif text-2xl font-bold text-teal-900 sm:text-3xl">
            Be the first to add your name
          </p>
        )}
      </div>

      {/* The wall */}
      {hasPledges ? (
        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {pledges.map((p, i) => (
            <li
              key={i}
              className="rounded-xl border border-teal-900/10 bg-white p-4 shadow-sm"
            >
              <div className="flex items-center gap-2">
                <Heart
                  className="h-4 w-4 shrink-0 fill-gold-400 text-gold-400"
                  aria-hidden
                />
                <span className="font-semibold text-teal-900">{p.firstName}</span>
                {p.location && (
                  <span className="text-sm text-teal-600">· {p.location}</span>
                )}
              </div>
              {p.message && (
                <p className="mt-2 flex gap-1.5 text-sm italic text-teal-700">
                  <Quote className="h-3.5 w-3.5 shrink-0 text-gold-400" aria-hidden />
                  <span>{p.message}</span>
                </p>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-8 rounded-2xl border border-dashed border-teal-900/20 bg-white p-10 text-center">
          <Heart
            className="mx-auto h-10 w-10 fill-gold-400 text-gold-400"
            aria-hidden
          />
          <p className="mt-3 text-teal-700">
            Every movement starts with one promise. Take the pledge above and
            your first name will appear here, joining everyone who chooses to
            come home safe — in memory of Kayla.
          </p>
        </div>
      )}
    </div>
  );
}
