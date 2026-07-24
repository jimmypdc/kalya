import type { ReactNode } from 'react';

interface PageHeaderProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
}

/** Consistent teal hero band used at the top of interior pages. */
export default function PageHeader({
  eyebrow,
  title,
  description,
  children,
}: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden bg-teal-950 text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-teal-950 via-teal-900 to-teal-800"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-0 h-80 w-80 rounded-full bg-gold-400/10 blur-3xl"
      />
      <div className="container-content relative py-16 sm:py-20">
        <div className="max-w-3xl animate-fade-up">
          {eyebrow && (
            <span className="text-sm font-semibold uppercase tracking-wider text-gold-300">
              {eyebrow}
            </span>
          )}
          <h1 className="mt-3 font-serif text-4xl font-bold leading-tight sm:text-5xl">
            {title}
          </h1>
          {description && (
            <p className="mt-5 text-lg leading-relaxed text-teal-100">
              {description}
            </p>
          )}
          {children && <div className="mt-8">{children}</div>}
        </div>
      </div>
    </section>
  );
}
