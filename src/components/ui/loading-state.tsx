'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';

export function LoadingState({ message = 'Loading...' }: { message?: string }) {
  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center p-12">
        <Spinner className="h-8 w-8" />
        <p className="mt-4 text-zinc-600 dark:text-zinc-400">{message}</p>
      </CardContent>
    </Card>
  );
}
