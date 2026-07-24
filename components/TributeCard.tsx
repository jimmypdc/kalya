import { Quote } from 'lucide-react';
import type { Tribute } from '@/lib/tributes';

/** Renders a single tribute (poem / message / essay) as a card. */
export default function TributeCard({ tribute }: { tribute: Tribute }) {
  const isPoem = tribute.type === 'poem';

  return (
    <figure className="card flex h-full flex-col">
      <Quote className="h-8 w-8 text-gold-400" aria-hidden />
      <h3 className="mt-3 font-serif text-xl font-bold text-teal-900">
        {tribute.title}
      </h3>

      <blockquote className="mt-3 flex-1 space-y-3 text-teal-800">
        {tribute.body.map((para, i) => (
          <p
            key={i}
            className={
              isPoem ? 'whitespace-pre-line italic leading-relaxed' : 'leading-relaxed'
            }
          >
            {para}
          </p>
        ))}
      </blockquote>

      <figcaption className="mt-5 border-t border-teal-900/10 pt-4 text-sm">
        <span className="font-semibold text-teal-900">— {tribute.author}</span>
        {tribute.relationship && (
          <span className="text-teal-600">, {tribute.relationship}</span>
        )}
      </figcaption>
    </figure>
  );
}
