'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface WizardStepTransitionProps {
  children: React.ReactNode;
}

export function WizardStepTransition({ children }: WizardStepTransitionProps) {
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const handleStepChange = () => {
      setIsTransitioning(true);
      setTimeout(() => setIsTransitioning(false), 200);
    };

    window.addEventListener('wizard-step-change', handleStepChange);
    return () => window.removeEventListener('wizard-step-change', handleStepChange);
  }, []);

  return (
    <div
      className={cn(
        'transition-opacity duration-200',
        isTransitioning && 'pointer-events-none opacity-50'
      )}
    >
      {children}
      {isTransitioning && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/50 backdrop-blur-sm dark:bg-zinc-950/50">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
        </div>
      )}
    </div>
  );
}
