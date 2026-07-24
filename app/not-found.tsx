import Link from 'next/link';
import { Heart } from 'lucide-react';

export default function NotFound() {
  return (
    <section className="section">
      <div className="container-content flex flex-col items-center text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-teal-900 text-white">
          <Heart className="h-7 w-7 fill-gold-400 text-gold-400" aria-hidden />
        </span>
        <p className="mt-6 font-serif text-6xl font-bold text-teal-900">404</p>
        <h1 className="mt-2 font-serif text-2xl font-bold text-teal-900">
          This page couldn&apos;t be found
        </h1>
        <p className="mt-3 max-w-md text-teal-700">
          The page you&apos;re looking for may have moved. Let&apos;s get you back
          to where you can make a difference.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn-primary">
            Back to home
          </Link>
          <Link href="/pledge" className="btn-accent">
            Take the Pledge
          </Link>
        </div>
      </div>
    </section>
  );
}
