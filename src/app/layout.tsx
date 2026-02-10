import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';
import { SkipNavigation, AnnouncementRegion } from '@/components/a11y/accessibility-components';
import { NavigationHeader } from '@/components/navigation-header';
import { ThemeProvider } from '@/components/theme-provider';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: false,
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
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          <SkipNavigation />
          <NavigationHeader />
          <main id="main-content" className="min-h-screen">
            {children}
          </main>
          <Toaster position="top-center" />
          <AnnouncementRegion />
        </ThemeProvider>
      </body>
    </html>
  );
}
