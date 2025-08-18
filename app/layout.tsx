import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import './fonts.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ErrorBoundary from '@/components/ErrorBoundary';
import PWAProvider from '@/components/PWAProvider';
import LighthouseMonitor from '@/components/LighthouseMonitor';
import LanguageProvider from '@/components/LanguageProvider';
import FontLoader from '@/components/FontLoader';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Portfolio - Senior Full Stack Engineer',
  description: 'Professional portfolio showcasing full-stack development projects and skills',
  keywords: ['portfolio', 'full stack', 'full stack developer', 'dot net', 'dotnet developer', '.net', 'dotnet', '.net core', 'c# developer', 'c#', '.net core developer', '.net developer', 'ASP.NET Developer', 'Oracle Developer', 'developer', 'react', 'next.js', 'typescript', 'web development', 'web design', 'web development services', 'web design services', 'web development company', 'web design company', 'web development agency', 'web design agency', 'web development services', 'web design services', 'web development company', 'web design company', 'web development agency', 'web design agency'],
  authors: [{ name: 'Muhammad Zaman' }],
  creator: 'Muhammad Zaman',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://mzamaann.dev.github.io/portfolio',
    title: 'Portfolio - Senior Full Stack Engineer',
    description: 'Professional portfolio showcasing full-stack development projects and skills',
    siteName: 'Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portfolio - Full Stack Engineer',
    description: 'Professional portfolio showcasing full-stack development projects and skills',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning className="font-sans">
      <body className={inter.className}>
        <ErrorBoundary>
          <ThemeProvider>
            <LanguageProvider>
              <FontLoader />
              <PWAProvider />
              <a href="#main-content" className="skip-link">
                Skip to main content
              </a>
              <div className="min-h-screen bg-white dark:bg-dark-900">
                <Header />
                <main id="main-content">
                  {children}
                </main>
                <Footer />
              </div>
            </LanguageProvider>
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
