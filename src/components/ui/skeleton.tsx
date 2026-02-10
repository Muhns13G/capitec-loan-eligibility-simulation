'use client';

import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
  variant?: 'default' | 'card' | 'text' | 'circle' | 'chart';
}

export function Skeleton({ className, variant = 'default' }: SkeletonProps) {
  const baseStyles = 'animate-shimmer bg-zinc-200 dark:bg-zinc-800';

  const variants = {
    default: 'rounded-md',
    card: 'rounded-xl h-32',
    text: 'rounded h-4',
    circle: 'rounded-full',
    chart: 'rounded-xl h-[300px]',
  };

  return <div className={cn(baseStyles, variants[variant], className)} />;
}

export function CardSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton variant="card" className="w-full" />
      <div className="space-y-2">
        <Skeleton variant="text" className="w-3/4" />
        <Skeleton variant="text" className="w-1/2" />
      </div>
    </div>
  );
}

export function CalculatorSkeleton() {
  return (
    <div className="space-y-6">
      {/* Title */}
      <Skeleton variant="text" className="h-8 w-48" />

      {/* Input Fields */}
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-3">
          <Skeleton variant="text" className="w-24" />
          <Skeleton variant="card" className="h-10" />
          <Skeleton variant="text" className="h-2 w-full" />
        </div>
        <div className="space-y-3">
          <Skeleton variant="text" className="w-24" />
          <Skeleton variant="card" className="h-10" />
          <Skeleton variant="text" className="h-2 w-full" />
        </div>
      </div>

      {/* Results */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Skeleton variant="card" />
        <Skeleton variant="card" />
        <Skeleton variant="card" />
      </div>
    </div>
  );
}

export function ResultsSkeleton() {
  return (
    <div className="space-y-8">
      {/* Success Banner */}
      <Skeleton variant="card" className="h-32 bg-green-100" />

      {/* Approval Metrics */}
      <div className="space-y-4">
        <Skeleton variant="text" className="h-6 w-48" />
        <Skeleton variant="text" className="h-4 w-full" />
        <Skeleton variant="card" className="h-24" />
      </div>

      {/* Loan Details */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Skeleton variant="card" />
        <Skeleton variant="card" />
        <Skeleton variant="card" />
        <Skeleton variant="card" />
      </div>

      {/* Charts */}
      <div className="grid gap-8 lg:grid-cols-2">
        <Skeleton variant="chart" />
        <Skeleton variant="chart" />
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Skeleton variant="text" className="h-10 w-32" />
        <Skeleton variant="text" className="h-10 w-32" />
        <Skeleton variant="text" className="h-10 w-32" />
      </div>
    </div>
  );
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex gap-4 border-b border-zinc-200 pb-2 dark:border-zinc-800">
        <Skeleton variant="text" className="w-20" />
        <Skeleton variant="text" className="w-24" />
        <Skeleton variant="text" className="w-24" />
        <Skeleton variant="text" className="w-24" />
      </div>

      {/* Rows */}
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex gap-4 py-2">
          <Skeleton variant="text" className="w-20" />
          <Skeleton variant="text" className="w-24" />
          <Skeleton variant="text" className="w-24" />
          <Skeleton variant="text" className="w-24" />
        </div>
      ))}
    </div>
  );
}

export function ChartSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton variant="text" className="h-6 w-48" />
      <Skeleton variant="chart" />
      <div className="flex justify-center gap-6">
        <Skeleton variant="text" className="w-32" />
        <Skeleton variant="text" className="w-32" />
      </div>
    </div>
  );
}
