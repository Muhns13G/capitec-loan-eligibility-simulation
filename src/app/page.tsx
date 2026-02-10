'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { GravityStarsBackground } from '@/components/animate-ui/components/backgrounds/gravity-stars';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CalculatorPreview } from '@/components/calculator-preview';
import { useTypewriter } from '@/hooks/useTypewriter';
import {
  Calculator,
  FileText,
  Clock,
  Shield,
  TrendingUp,
  ChevronRight,
  Star,
  Users,
} from 'lucide-react';

const features = [
  {
    icon: Clock,
    title: 'Instant Results',
    description: 'Get your loan eligibility assessment in minutes, not days.',
  },
  {
    icon: Shield,
    title: 'Secure Process',
    description: 'Your information is protected with bank-grade security.',
  },
  {
    icon: TrendingUp,
    title: 'Better Rates',
    description: 'Access competitive interest rates tailored to your profile.',
  },
];

const steps = [
  {
    number: '01',
    title: 'Fill Application',
    description: 'Complete our simple online form with your details.',
  },
  {
    number: '02',
    title: 'Get Instant Results',
    description: 'Receive your eligibility assessment immediately.',
  },
  {
    number: '03',
    title: 'Receive Funds',
    description: 'If approved, get your loan disbursed quickly.',
  },
];

export default function HomePage() {
  const { displayText, isTyping } = useTypewriter({
    text: 'Check Your Loan Eligibility in Minutes',
    speed: 50,
    delay: 500,
  });
  return (
    <div className="relative min-h-screen">
      {/* Gravity Stars Background */}
      <div className="fixed inset-0 -z-10">
        <GravityStarsBackground
          starsCount={100}
          starsSize={2}
          starsOpacity={0.6}
          glowIntensity={20}
          movementSpeed={0.2}
          mouseInfluence={150}
          mouseGravity="attract"
          gravityStrength={50}
        />
      </div>

      {/* Hero Section */}
      <section className="relative px-4 pt-20 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="text-center"
          >
            {/* Trust Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="bg-primary/10 text-primary mb-8 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium"
            >
              <Star className="fill-primary h-4 w-4" />
              Trusted by 5M+ South Africans
            </motion.div>

            {/* Main Headline with Typewriter Effect and Color Scheme */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mb-6 min-h-[3.5ex] text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
            >
              {isTyping ? (
                // Simple typewriter while typing
                <span className="text-foreground">
                  {displayText}
                  <span className="animate-pulse">|</span>
                </span>
              ) : (
                // Color scheme after typing completes
                <>
                  <span className="text-foreground">Check Your Loan</span>{' '}
                  <span className="text-primary">Eligibility</span>
                  <br className="hidden sm:block" />
                  <span className="text-muted-foreground">in Minutes</span>
                </>
              )}
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-muted-foreground mx-auto mb-10 max-w-2xl text-lg"
            >
              Use our free loan simulator to find out how much you could qualify for. No impact on
              your credit score. Quick, easy, and secure.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <Link href="/calculator">
                <Button
                  size="lg"
                  className="group bg-primary hover:bg-primary/90 text-primary-foreground shadow-primary/25 hover:shadow-primary/30 relative overflow-hidden px-8 py-6 text-lg font-semibold shadow-lg transition-all duration-300 hover:shadow-xl"
                >
                  <Calculator className="mr-2 h-5 w-5" />
                  Calculate Your Loan
                  <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/apply">
                <Button
                  size="lg"
                  variant="outline"
                  className="group hover:bg-muted/50 border-2 px-8 py-6 text-lg font-semibold"
                >
                  <FileText className="mr-2 h-5 w-5" />
                  Start Application
                </Button>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-muted-foreground mt-12 flex flex-wrap items-center justify-center gap-8 text-sm"
            >
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>5M+ Customers</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>2 min assessment</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                <span>Bank-grade security</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Quick Estimate & Features Section - Side by side on desktop */}
      <section className="relative px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-10 text-center lg:mb-12"
          >
            <h2 className="text-foreground mb-4 text-3xl font-bold">
              Quick Estimate
              <span className="text-muted-foreground"> & Why Choose Capitec?</span>
            </h2>
            <p className="text-muted-foreground mx-auto max-w-2xl">
              Get a ballpark figure in seconds and discover why millions trust us.
            </p>
          </motion.div>

          <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-center">
            {/* Calculator - Left side on desktop */}
            <div className="w-full lg:w-auto lg:max-w-md lg:flex-1">
              <CalculatorPreview />
            </div>

            {/* Features - Right side on desktop, stacked on mobile */}
            <div className="w-full lg:w-auto lg:max-w-lg lg:flex-1">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    <Card className="group bg-card/80 border-border/50 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
                      <CardContent className="p-3">
                        <div className="flex items-start gap-3">
                          <div className="bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg transition-colors">
                            <feature.icon className="h-4 w-4" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <h3 className="text-foreground mb-0.5 text-sm leading-tight font-semibold">
                              {feature.title}
                            </h3>
                            <p className="text-muted-foreground text-xs leading-relaxed">
                              {feature.description}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="relative px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            <h2 className="text-foreground mb-4 text-3xl font-bold">How It Works</h2>
            <p className="text-muted-foreground mx-auto max-w-2xl">
              Three simple steps to check your loan eligibility.
            </p>
          </motion.div>

          <div className="grid gap-8 sm:grid-cols-3">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.5 }}
                className="text-center"
              >
                <div className="bg-primary/10 text-primary border-primary/20 mb-4 inline-flex h-24 w-24 items-center justify-center rounded-full border-2 text-3xl font-bold">
                  {step.number}
                </div>
                <h3 className="text-foreground mb-2 text-xl font-semibold">{step.title}</h3>
                <p className="text-muted-foreground mx-auto max-w-xs text-sm">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="from-primary/10 via-primary/5 to-background border-primary/20 overflow-hidden bg-gradient-to-br">
              <CardContent className="p-8 text-center sm:p-12">
                <h2 className="text-foreground mb-4 text-2xl font-bold sm:text-3xl">
                  Ready to Check Your Eligibility?
                </h2>
                <p className="text-muted-foreground mx-auto mb-8 max-w-xl">
                  Take the first step towards your financial goals. Our loan simulator gives you
                  instant results with no impact on your credit score.
                </p>
                <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                  <Link href="/calculator">
                    <Button
                      size="lg"
                      className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-primary/25 px-8 shadow-lg"
                    >
                      <Calculator className="mr-2 h-5 w-5" />
                      Start Calculator
                    </Button>
                  </Link>
                  <Link href="/apply">
                    <Button size="lg" variant="outline" className="border-2">
                      <FileText className="mr-2 h-5 w-5" />
                      Apply Now
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-border/50 relative mt-16 border-t px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-muted-foreground flex flex-col items-center justify-between gap-4 text-sm sm:flex-row">
            <p>© 2025 Capitec Bank. All rights reserved.</p>
            <p>This is a prototype simulator for demonstration purposes.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
