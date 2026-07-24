import type { ReactNode } from 'react';

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: 'left' | 'center';
  className?: string;
}

/** Reusable section header: small eyebrow label, serif title, lede text. */
export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  className = '',
}: SectionHeadingProps) {
  return (
    <div
      className={`${align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl text-left'} ${className}`}
    >
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2 className="mt-3 font-serif text-3xl font-bold tracking-tight text-teal-900 sm:text-4xl">
        {title}
      </h2>
      {description && <p className="lede mt-4">{description}</p>}
    </div>
  );
}
