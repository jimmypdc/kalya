import type { Metadata } from 'next';
import { Heart, Users, ShieldCheck, Share2 } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import PledgeForm from '@/components/PledgeForm';
import { kayla } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Take the Pledge',
  description:
    'Take the Buckle Up for Kayla pledge — a three-second promise to always wear your seatbelt, in memory of Kayla Marie Joiner.',
};

export default function PledgePage() {
  return (
    <>
      <PageHeader
        eyebrow="The Buckle Up Pledge"
        title="Make a promise that could save a life"
        description="It only takes three seconds to buckle up — and a moment to promise you always will. Add your name below and honor Kayla by choosing to come home safe."
      />

      <section className="section">
        <div className="container-content grid items-start gap-12 lg:grid-cols-2">
          {/* Why pledge */}
          <div className="lg:sticky lg:top-24">
            <h2 className="font-serif text-2xl font-bold text-teal-900">
              Why your pledge matters
            </h2>
            <p className="mt-3 text-teal-700">
              Kayla Marie Joiner ({kayla.born} – {kayla.passed}) was just 16. Her
              story is a reminder that the smallest habits protect the biggest
              things — the people we love, and the futures ahead of us.
            </p>

            <ul className="mt-8 space-y-5">
              <Benefit
                icon={<ShieldCheck className="h-5 w-5" aria-hidden />}
                title="You protect yourself"
                body="Seatbelts are the single most effective way to survive a crash. Every seat, every trip."
              />
              <Benefit
                icon={<Users className="h-5 w-5" aria-hidden />}
                title="You protect others"
                body="When you buckle up, you give the people who love you the peace of knowing you'll be home."
              />
              <Benefit
                icon={<Share2 className="h-5 w-5" aria-hidden />}
                title="You spread the message"
                body="Every pledge helps us reach another teen. Take yours, then challenge three friends to do the same."
              />
              <Benefit
                icon={<Heart className="h-5 w-5" aria-hidden />}
                title="You honor Kayla"
                body="You keep her light shining — and turn her story into a habit that saves lives."
              />
            </ul>
          </div>

          {/* Form */}
          <div>
            <PledgeForm />
          </div>
        </div>
      </section>
    </>
  );
}

function Benefit({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <li className="flex items-start gap-4">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-100 text-teal-800">
        {icon}
      </span>
      <div>
        <h3 className="font-semibold text-teal-900">{title}</h3>
        <p className="mt-1 text-sm text-teal-700">{body}</p>
      </div>
    </li>
  );
}
