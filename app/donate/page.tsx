import type { Metadata } from 'next';
import { GraduationCap, ShieldCheck, Users, Lock } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import DonationWidget from '@/components/DonationWidget';

export const metadata: Metadata = {
  title: 'Donate',
  description:
    'Support teen seatbelt safety and pediatric nursing scholarships. Make a one-time or monthly donation to the Kayla Marie Joiner Foundation.',
};

export default function DonatePage() {
  return (
    <>
      <PageHeader
        eyebrow="Donate"
        title="Your gift carries Kayla forward"
        description="Every donation funds scholarships for future pediatric nurses and safety campaigns that keep teens buckled up. Give once, or become a monthly supporter."
      />

      <section className="section">
        <div className="container-content grid items-start gap-12 lg:grid-cols-2">
          {/* Impact / trust column */}
          <div className="lg:pt-4">
            <h2 className="font-serif text-2xl font-bold text-teal-900">
              Where your donation goes
            </h2>
            <ul className="mt-6 space-y-5">
              <Impact
                icon={<GraduationCap className="h-5 w-5" aria-hidden />}
                title="Scholarships for future nurses"
                body="The majority of every gift funds direct scholarship awards for students pursuing pediatric nursing."
              />
              <Impact
                icon={<ShieldCheck className="h-5 w-5" aria-hidden />}
                title="Life-saving safety outreach"
                body="School assemblies, pledge drives, and campaign materials that spread the Buckle Up message."
              />
              <Impact
                icon={<Users className="h-5 w-5" aria-hidden />}
                title="A community that cares"
                body="Events and programs that bring people together around Kayla's story and mission."
              />
            </ul>

            <div className="mt-8 rounded-2xl bg-teal-50 p-6">
              <h3 className="flex items-center gap-2 font-semibold text-teal-900">
                <Lock className="h-4 w-4" aria-hidden />
                Safe & secure
              </h3>
              <p className="mt-2 text-sm text-teal-700">
                Payments are processed securely by Stripe. We never see or store
                your full card details. Monthly gifts can be canceled anytime.
              </p>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-4 text-center">
              <Figure value="$25" label="Safety materials for a classroom" />
              <Figure value="$100" label="Sponsors a school assembly" />
              <Figure value="$2,500" label="Names a scholarship award" />
            </div>
          </div>

          {/* Donation widget */}
          <div className="lg:sticky lg:top-24">
            <DonationWidget />
          </div>
        </div>
      </section>
    </>
  );
}

function Impact({
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
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-900 text-white">
        {icon}
      </span>
      <div>
        <h3 className="font-semibold text-teal-900">{title}</h3>
        <p className="mt-1 text-sm text-teal-700">{body}</p>
      </div>
    </li>
  );
}

function Figure({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-xl border border-teal-900/10 bg-white p-4">
      <div className="font-serif text-xl font-bold text-teal-900">{value}</div>
      <div className="mt-1 text-xs text-teal-600">{label}</div>
    </div>
  );
}
