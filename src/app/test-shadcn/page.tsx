'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function TestShadcnPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-50 p-8 dark:bg-zinc-950">
      <div className="w-full max-w-2xl space-y-8">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
          Shadcn Components Test
        </h1>

        <Card>
          <CardHeader>
            <CardTitle>Button Variants</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-4">
            <Button>Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
            <Button disabled>Disabled</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Input & Select</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input placeholder="Enter text..." />
            <Input type="number" placeholder="Enter number..." />
            <Input disabled placeholder="Disabled input..." />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Progress Bar</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Progress value={0} />
            <Progress value={50} />
            <Progress value={100} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Table</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Month</TableHead>
                  <TableHead className="text-right">Payment</TableHead>
                  <TableHead className="text-right">Balance</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>1</TableCell>
                  <TableCell className="text-right">R5,000.00</TableCell>
                  <TableCell className="text-right">R95,000.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>2</TableCell>
                  <TableCell className="text-right">R5,000.00</TableCell>
                  <TableCell className="text-right">R90,000.00</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-950">
          <CardContent className="p-6">
            <p className="text-green-900 dark:text-green-100">
              ✅ All Shadcn components rendering correctly!
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
