import type { Metadata } from 'next'
import { Playfair_Display, DM_Sans, JetBrains_Mono } from 'next/font/google'
import CursorGlow from '@/components/effects/CursorGlow'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-display',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-body',
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-mono',
})

export const metadata: Metadata = {
  title: 'Cem Besli — Software Engineer',
  description:
    'Software engineering student at Centennial College. Building AI systems, backend APIs, and IoT solutions. Relocating to Cologne, Germany.',
  metadataBase: new URL('https://cembesli.com'),
  openGraph: {
    title: 'Cem Besli — Software Engineer',
    description: 'Building AI systems and backend solutions. Moving to Cologne.',
    url: 'https://cembesli.com',
    type: 'website',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${dmSans.variable} ${jetbrains.variable}`}
    >
      <body>
        <CursorGlow />
        {children}
      </body>
    </html>
  )
}
