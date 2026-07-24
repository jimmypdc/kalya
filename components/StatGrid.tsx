interface Stat {
  value: string;
  label: string;
  sub?: string;
}

/** Responsive grid of headline statistics. */
export default function StatGrid({ stats }: { stats: readonly Stat[] }) {
  return (
    <dl className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
      {stats.map((s) => (
        <div
          key={s.label}
          className="rounded-2xl border border-teal-900/10 bg-white p-6 text-center shadow-sm"
        >
          <dd className="font-serif text-4xl font-bold text-teal-900 sm:text-5xl">
            {s.value}
          </dd>
          <dt className="mt-2 text-sm font-semibold text-teal-800">
            {s.label}
          </dt>
          {s.sub && <p className="mt-1 text-xs text-teal-600">{s.sub}</p>}
        </div>
      ))}
    </dl>
  );
}
