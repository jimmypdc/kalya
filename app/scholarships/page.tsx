import type { Metadata } from 'next';
import Link from 'next/link';
import {
  GraduationCap,
  CheckCircle2,
  Calendar,
  FileText,
  Heart,
  Mail,
} from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import SectionHeading from '@/components/SectionHeading';
import KaylaImage from '@/components/KaylaImage';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Scholarships',
  description:
    'The Kayla Marie Joiner Memorial Scholarship supports compassionate students pursuing pediatric nursing — the career Kayla dreamed of. Learn how to apply.',
};

export default function ScholarshipsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Scholarships"
        title="The Kayla Marie Joiner Memorial Scholarship"
        description="Kayla dreamed of becoming a nurse who cared for children. This scholarship helps students carry that dream forward — one compassionate caregiver at a time."
      >
        <a href="#apply" className="btn-accent">
          How to apply
        </a>
      </PageHeader>

      {/* Overview */}
      <section className="section">
        <div className="container-content grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Our mission"
              title="Turning heartbreak into opportunity"
              description="Each year, we award scholarships to students pursuing a degree in nursing — with a special place in our hearts for those drawn to pediatric care, just as Kayla was."
            />
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <MiniStat value="$2,500" label="Typical award" />
              <MiniStat value="Annual" label="Application cycle" />
              <MiniStat value="Pediatric" label="Nursing focus" />
            </div>
            <p className="mt-6 text-teal-700">
              Awards are made possible entirely through donations to the
              foundation. When you give, you&apos;re investing directly in the
              next generation of caregivers.
            </p>
          </div>
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-xl ring-1 ring-teal-900/10">
            {/* PLACEHOLDER — a nursing student image. */}
            <KaylaImage variant="scholarship" sizes="(min-width: 1024px) 40rem, 100vw" />
          </div>
        </div>
      </section>

      {/* Eligibility */}
      <section className="section bg-teal-50/50">
        <div className="container-content grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Eligibility"
              title="Who we're looking for"
            />
            <ul className="mt-8 space-y-4">
              {eligibility.map((item) => (
                <li key={item} className="flex items-start gap-3 text-teal-800">
                  <CheckCircle2
                    className="mt-0.5 h-5 w-5 shrink-0 text-teal-700"
                    aria-hidden
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <SectionHeading
              align="left"
              eyebrow="What we value"
              title="More than grades"
              description="Kayla led with her heart. We look for applicants who do the same."
            />
            <div className="mt-8 grid gap-4">
              {values.map((v) => (
                <div key={v.title} className="card">
                  <h3 className="font-serif text-lg font-bold text-teal-900">
                    {v.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-teal-700">{v.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How to apply */}
      <section id="apply" className="section scroll-mt-20">
        <div className="container-content">
          <SectionHeading
            eyebrow="How to apply"
            title="Applying is simple"
            description="Follow these steps. If you have questions at any point, we're always happy to help."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <Step
              icon={<FileText className="h-6 w-6" aria-hidden />}
              n={1}
              title="Prepare your materials"
              body="Gather proof of enrollment/acceptance into a nursing program, an academic transcript, and one letter of recommendation."
            />
            <Step
              icon={<Heart className="h-6 w-6" aria-hidden />}
              n={2}
              title="Write your essay"
              body="In 500–750 words, tell us why you're pursuing nursing and how you hope to care for children and families."
            />
            <Step
              icon={<Calendar className="h-6 w-6" aria-hidden />}
              n={3}
              title="Submit before the deadline"
              body="Email your completed application to us. Applications are typically due each spring for the upcoming academic year."
            />
          </div>

          <div className="mt-12 rounded-3xl border border-teal-900/10 bg-teal-50 p-8 text-center sm:p-12">
            <GraduationCap className="mx-auto h-12 w-12 text-teal-800" aria-hidden />
            <h3 className="mt-4 font-serif text-2xl font-bold text-teal-900">
              Ready to apply, or have a question?
            </h3>
            <p className="mx-auto mt-2 max-w-xl text-teal-700">
              We&apos;d love to hear from you. Reach out and our scholarship team
              will send you the current application form and deadline.
            </p>
            <a
              href={`mailto:${siteConfig.email}?subject=Scholarship%20Application`}
              className="btn-primary mt-6"
            >
              <Mail className="h-4 w-4" aria-hidden />
              Email the scholarship team
            </a>
            <p className="mt-3 text-sm text-teal-600">{siteConfig.email}</p>
          </div>
        </div>
      </section>

      {/* Support CTA */}
      <section className="section pt-0">
        <div className="container-content">
          <div className="flex flex-col items-center gap-5 rounded-3xl bg-teal-900 px-8 py-12 text-center text-white">
            <h2 className="font-serif text-3xl font-bold sm:text-4xl">
              Fund a future nurse
            </h2>
            <p className="max-w-2xl text-teal-100">
              Scholarships are powered entirely by generous donors. Your gift
              helps a compassionate student become the caregiver Kayla dreamed of
              being.
            </p>
            <Link href="/donate" className="btn-accent">
              Support the scholarship fund
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function MiniStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-xl border border-teal-900/10 bg-white p-4 text-center">
      <div className="font-serif text-2xl font-bold text-teal-900">{value}</div>
      <div className="mt-1 text-xs font-medium text-teal-600">{label}</div>
    </div>
  );
}

function Step({
  icon,
  n,
  title,
  body,
}: {
  icon: React.ReactNode;
  n: number;
  title: string;
  body: string;
}) {
  return (
    <div className="card flex flex-col">
      <div className="flex items-center gap-3">
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-900 text-white">
          {icon}
        </span>
        <span className="font-serif text-sm font-semibold uppercase tracking-wide text-gold-500">
          Step {n}
        </span>
      </div>
      <h3 className="mt-4 font-serif text-xl font-bold text-teal-900">{title}</h3>
      <p className="mt-2 text-teal-700">{body}</p>
    </div>
  );
}

const eligibility = [
  'Graduating high school seniors or current college students.',
  'Accepted into, or enrolled in, an accredited nursing program.',
  'A demonstrated interest in pediatric or child-focused nursing.',
  'A commitment to compassionate, community-minded care.',
  'Strong academic standing and a genuine, personal essay.',
];

const values = [
  {
    title: 'Compassion',
    body: 'A real desire to comfort and care for children and families in difficult moments.',
  },
  {
    title: 'Courage',
    body: 'The resilience to show up and do hard, meaningful work — the way Kayla always did.',
  },
  {
    title: 'Responsibility',
    body: 'A commitment to safety, service, and looking out for the people around you.',
  },
];
