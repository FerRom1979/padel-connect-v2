import type { Metadata } from 'next';
import { Barlow_Condensed, Geist } from 'next/font/google';

import { Providers } from '@/components/providers';
import './globals.css';

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
});

// Condensada de marcador deportivo. Solo wordmark y titulos.
const barlowCondensed = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-barlow-condensed',
});

export const metadata: Metadata = {
  title: 'Padel Connect',
  description: 'Encontrá jugadores, armá partidos y descubrí clubes de pádel.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${geist.variable} ${barlowCondensed.variable}`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
