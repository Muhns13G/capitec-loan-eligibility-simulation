'use client';

import { useWizard } from '@/contexts/wizard-context';
import { Save, Check, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function SaveStatusIndicator() {
  const { saveStatus } = useWizard();

  return (
    <div className="flex items-center gap-2 text-sm">
      <AnimatePresence mode="wait">
        {saveStatus === 'saving' && (
          <motion.div
            key="saving"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="flex items-center gap-2 text-zinc-500"
          >
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Saving...</span>
          </motion.div>
        )}

        {saveStatus === 'saved' && (
          <motion.div
            key="saved"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="flex items-center gap-2 text-green-600"
          >
            <Check className="h-4 w-4" />
            <span>Saved</span>
          </motion.div>
        )}

        {saveStatus === 'idle' && (
          <motion.div
            key="idle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2 text-zinc-400"
          >
            <Save className="h-4 w-4" />
            <span>Auto-save</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
