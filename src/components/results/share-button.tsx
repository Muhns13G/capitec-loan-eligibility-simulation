'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Share2, Check, Link2, Mail } from 'lucide-react';
import { formatCurrencyZAR } from '@/lib/currency-formatter';

interface ShareButtonProps {
  resultData?: {
    approvalLikelihood?: number;
    monthlyPayment?: number;
  };
}

export function ShareButton({ resultData }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Silently handle error
    }
  };

  const handleEmail = () => {
    const formattedPayment = resultData?.monthlyPayment
      ? formatCurrencyZAR(resultData.monthlyPayment)
      : 'N/A';

    const subject = 'My Loan Eligibility Results - Capitec';
    const body = `Hi,

I wanted to share my loan eligibility results with you:

${
  resultData
    ? `
Approval Likelihood: ${resultData.approvalLikelihood}%
Estimated Monthly Payment: ${formattedPayment}
`
    : 'Check out my loan eligibility results!'
}

View full details: ${window.location.href}

Best regards`;

    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  if (!showOptions) {
    return (
      <Button variant="outline" size="sm" onClick={() => setShowOptions(true)}>
        <Share2 className="mr-2 h-4 w-4" />
        Share Results
      </Button>
    );
  }

  return (
    <div className="flex gap-2">
      <Button variant="outline" size="sm" onClick={handleCopy}>
        {copied ? (
          <>
            <Check className="mr-2 h-4 w-4 text-green-500" />
            Copied!
          </>
        ) : (
          <>
            <Link2 className="mr-2 h-4 w-4" />
            Copy Link
          </>
        )}
      </Button>
      <Button variant="outline" size="sm" onClick={handleEmail}>
        <Mail className="mr-2 h-4 w-4" />
        Email
      </Button>
      <Button variant="ghost" size="sm" onClick={() => setShowOptions(false)}>
        Cancel
      </Button>
    </div>
  );
}
