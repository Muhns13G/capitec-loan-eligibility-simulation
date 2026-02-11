'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import type { CalculatorResult } from '@/hooks/useLoanCalculator';

interface PaymentBreakdownChartProps {
  result: CalculatorResult;
}

export function PaymentBreakdownChart({ result }: PaymentBreakdownChartProps) {
  const data = [
    {
      name: 'Principal',
      value: result.monthlyPayment * result.amortizationSchedule.length - result.totalInterest,
      color: '#3b82f6',
    },
    {
      name: 'Interest',
      value: result.totalInterest,
      color: '#8b5cf6',
    },
  ];

  return (
    <div role="img" aria-label="Payment breakdown chart showing principal and interest portions">
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={(entry) =>
              `${entry.name}: ${Math.round((entry.value / result.totalRepayment) * 100)}%`
            }
            outerRadius={60}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number | undefined) => [
              new Intl.NumberFormat('en-ZA', {
                style: 'currency',
                currency: 'ZAR',
                minimumFractionDigits: 2,
              }).format(value ?? 0),
              '',
            ]}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
