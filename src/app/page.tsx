import Link from 'next/link';
import { PageHeader } from '@/components/a11y/accessibility-components';

export default function HomePage() {
  return (
    <main
      id="main-content"
      className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 p-8 dark:bg-zinc-950"
    >
      <div className="w-full max-w-3xl text-center">
        <PageHeader
          title="Capitec Loan Simulator"
          description="Check your loan eligibility in minutes"
        />
        <nav aria-label="Primary navigation">
          <ul className="flex flex-col justify-center gap-4 sm:flex-row">
            <li>
              <Link
                href="/calculator"
                className="inline-block rounded-lg bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
                aria-label="Calculate your loan payments"
              >
                Calculate Loan
              </Link>
            </li>
            <li>
              <Link
                href="/apply"
                className="inline-block rounded-lg border border-zinc-300 px-6 py-3 text-zinc-900 transition hover:bg-zinc-100 focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 focus:outline-none dark:border-zinc-700 dark:text-zinc-50 dark:hover:bg-zinc-800"
                aria-label="Start loan application"
              >
                Apply Now
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </main>
  );
}
