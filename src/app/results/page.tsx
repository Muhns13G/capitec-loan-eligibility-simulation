'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';

export default function ResultsPage() {
  const [result, setResult] = useState<unknown>(null);

  useEffect(() => {
    const savedResult = localStorage.getItem('loan-wizard-result');
    if (savedResult) {
      setResult(JSON.parse(savedResult));
    }
  }, []);

  if (!result) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-zinc-50 p-8 dark:bg-zinc-950">
        <Card className="w-full max-w-3xl">
          <CardContent className="p-12 text-center">
            <h1 className="mb-4 text-3xl font-bold text-zinc-900 dark:text-zinc-50">
              Processing Your Application
            </h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              Please wait while we calculate your eligibility...
            </p>
          </CardContent>
        </Card>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center bg-zinc-50 p-8 dark:bg-zinc-950">
      <div className="w-full max-w-3xl">
        <h1 className="mb-8 text-3xl font-bold text-zinc-900 dark:text-zinc-50">
          Eligibility Results
        </h1>

        <Card>
          <CardContent className="p-8">
            <p className="text-zinc-600 dark:text-zinc-400">
              Full results display coming in Sprint 9...
            </p>
            <pre className="mt-4 overflow-auto rounded bg-zinc-100 p-4 text-xs dark:bg-zinc-900">
              {JSON.stringify(result, null, 2)}
            </pre>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
