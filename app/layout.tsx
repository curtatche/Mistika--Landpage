import type {Metadata} from 'next';
import { Playfair_Display, Jost } from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const jost = Jost({
  subsets: ['latin'],
  variable: '--font-jost',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Mistika — O Despertar',
  description: 'Em 30 dias você para de repelir homens de valor e começa a atrair relacionamentos que merece.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="pt-BR" className={`${playfair.variable} ${jost.variable}`}>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
