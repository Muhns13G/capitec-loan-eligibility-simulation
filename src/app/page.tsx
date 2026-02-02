// import Image from "next/image";
import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 p-8 dark:bg-zinc-950">
      <div className="w-full max-w-3xl text-center">
        <h1 className="mb-4 text-5xl font-bold text-zinc-900 dark:text-zinc-50">
          Capitec Loan Simulator
        </h1>
        <p className="mb-8 text-xl text-zinc-600 dark:text-zinc-400">
          Check your loan eligibility in minutes
        </p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/calculator"
            className="rounded-lg bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700"
          >
            Calculate Loan
          </Link>
          <Link
            href="/apply"
            className="rounded-lg border border-zinc-300 px-6 py-3 text-zinc-900 transition hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-50 dark:hover:bg-zinc-800"
          >
            Apply Now
          </Link>
        </div>
      </div>
    </main>
  );
}
