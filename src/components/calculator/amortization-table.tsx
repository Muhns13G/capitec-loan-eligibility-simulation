'use client';

import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatCurrency } from '@/lib/calculations/loan';
import type { AmortizationEntry } from '@/lib/calculations/loan';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ITEMS_PER_PAGE = 12;

interface AmortizationTableProps {
  schedule: AmortizationEntry[];
}

export function AmortizationTable({ schedule }: AmortizationTableProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(schedule.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentSchedule = schedule.slice(startIndex, endIndex);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(1, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(totalPages, prev + 1));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          Amortization Schedule
        </h3>
        <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            aria-label="Previous page"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            aria-label="Next page"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="rounded-lg border border-zinc-200 dark:border-zinc-800">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Month</TableHead>
              <TableHead className="text-right">Payment</TableHead>
              <TableHead className="text-right">Principal</TableHead>
              <TableHead className="text-right">Interest</TableHead>
              <TableHead className="text-right">Balance</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentSchedule.map((entry) => (
              <TableRow key={entry.month}>
                <TableCell>{entry.month}</TableCell>
                <TableCell className="text-right">{formatCurrency(entry.payment)}</TableCell>
                <TableCell className="text-right">{formatCurrency(entry.principal)}</TableCell>
                <TableCell className="text-right">{formatCurrency(entry.interest)}</TableCell>
                <TableCell className="text-right font-medium">
                  {formatCurrency(entry.balance)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
