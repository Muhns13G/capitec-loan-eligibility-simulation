import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';
import { SkipNavigation, AnnouncementRegion } from '@/components/a11y/accessibility-components';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: false, // Disable preloading to avoid network issues during build
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  title: 'Capitec Loan Eligibility Simulator',
  description: 'Determine your loan eligibility with Capitec Bank',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <SkipNavigation />
        {children}
        <Toaster position="top-center" />
        <AnnouncementRegion />
      </body>
    </html>
  );
}
