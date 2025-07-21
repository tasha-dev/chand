// Codes by mahdi tasha
// Importing part
import '@/style/index.css';
import { RootLayoutProps } from '@/type/component';
import { ReactNode } from 'react';
import { Open_Sans } from 'next/font/google';
import { cn } from '@/lib/utils';
import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/component/ui/sonner';

// Defining metadata of the pages
export const metadata: Metadata = {
  title: 'Chand — Modern Web & PWA App',
  description:
    'Chand is a fast, modern web and PWA version of the original iOS app — rebuilt with custom UI and enhanced performance.',
  applicationName: 'Chand',
  keywords: [
    'Chand',
    'PWA',
    'Modern App',
    'Web App',
    'Chand iOS',
    'Next.js',
    'React',
    'Mahdi Tasha',
  ],
  creator: 'Mahdi Tasha',
  manifest: '/manifest.json',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  robots: {
    index: true,
    follow: true,
    nocache: false,
  },
};

// Defining font
const OpenSans = Open_Sans({
  display: 'block',
  style: ['normal'],
  subsets: ['latin'],
  weight: ['300', '500', '600', '800'],
});

// Creating and exporting RootLayout component as default
export default function RootLayout({ children }: RootLayoutProps): ReactNode {
  // Returning JSX
  return (
    <html suppressHydrationWarning>
      <body
        className={cn(
          'bg-background overflow-x-hidden overflow-y-auto text-foreground',
          OpenSans.className,
        )}
      >
        <Toaster />
        <ThemeProvider attribute={'class'}>{children}</ThemeProvider>
      </body>
    </html>
  );
}
