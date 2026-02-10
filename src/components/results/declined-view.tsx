'use client';

import { motion, type Variants } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { XCircle, AlertTriangle, TrendingUp, Calculator, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const reasons = [
  'High debt-to-income ratio (above 50%)',
  'Insufficient disposable income',
  'Short employment history (less than 3 months)',
  'Low credit score (below 600)',
  'Recent late payments or defaults',
];

const improvements = [
  {
    title: 'Reduce Your Debt',
    description:
      'Pay down existing debts, especially high-interest credit cards. Aim for a debt-to-income ratio below 40%.',
  },
  {
    title: 'Increase Your Income',
    description:
      'Consider additional income sources, salary increases, or side jobs. More disposable income improves your repayment capacity.',
  },
  {
    title: 'Build Your Credit Score',
    description:
      'Pay all bills on time, keep credit utilization below 30%, and avoid applying for too much credit at once.',
  },
  {
    title: 'Maintain Stable Employment',
    description:
      'Stable employment history (12+ months) shows financial reliability. Avoid frequent job changes if possible.',
  },
];

export function DeclinedView() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Declined Banner */}
      <motion.div variants={itemVariants}>
        <Card className="border-red-200 bg-gradient-to-r from-red-50 to-orange-50 dark:border-red-900 dark:from-red-950 dark:to-orange-950">
          <CardContent className="flex items-center gap-4 p-6">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.3 }}
            >
              <XCircle className="h-12 w-12 text-red-600 dark:text-red-400" />
            </motion.div>
            <div>
              <h2 className="text-2xl font-bold text-red-900 dark:text-red-100">
                Application Not Approved
              </h2>
              <p className="text-red-800 dark:text-red-200">
                Based on our assessment, your loan application does not meet our current eligibility
                criteria.
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Reasons for Decline */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              Common Reasons for Decline
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {reasons.map((reason, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="flex items-start gap-3 text-sm text-zinc-600 dark:text-zinc-400"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-red-500"
                  />
                  {reason}
                </motion.li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </motion.div>

      {/* How to Improve */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              How to Improve Your Eligibility
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {improvements.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                whileHover={{ scale: 1.01, x: 4 }}
                className="rounded-xl bg-gradient-to-r from-zinc-50 to-zinc-100 p-4 transition-shadow hover:shadow-md dark:from-zinc-900 dark:to-zinc-800"
              >
                <h4 className="mb-2 font-semibold text-zinc-900 dark:text-zinc-50">{item.title}</h4>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">{item.description}</p>
              </motion.div>
            ))}
          </CardContent>
        </Card>
      </motion.div>

      {/* Calculator CTA */}
      <motion.div variants={itemVariants}>
        <Card className="border-primary/20 from-primary/5 dark:border-primary/30 bg-gradient-to-r to-transparent">
          <CardContent className="p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="bg-primary/10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full">
                <Calculator className="text-primary h-6 w-6" />
              </div>
              <div className="flex-1">
                <h3 className="text-primary mb-1 font-semibold">Try Our Loan Calculator</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  See how adjusting loan terms and amounts affects your monthly payments.
                </p>
              </div>
              <Button asChild className="group bg-primary hover:bg-primary/90 shrink-0">
                <a href="/calculator">
                  Use Calculator
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Reapply CTA */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="flex-1">
                <h3 className="mb-1 font-semibold text-zinc-900 dark:text-zinc-50">Apply Again</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  You can reapply after 30 days. In the meantime, use our tips to improve your
                  financial situation.
                </p>
              </div>
              <Button
                variant="outline"
                asChild
                className="group shrink-0 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              >
                <a href="/apply">
                  Start New Application
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
