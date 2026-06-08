import type { Metadata } from 'next'
import { DM_Mono, IBM_Plex_Sans, Fira_Code } from 'next/font/google'
import './globals.css'

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['300', '400'],
  variable: '--font-display',
})

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-body',
})

const firaCode = Fira_Code({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-mono',
})

export const metadata: Metadata = {
  title: 'Cem Besli — Software Engineer',
  description:
    'Software Engineering student at Centennial College. Building AI systems, backend APIs, and IoT pipelines. Moving to Cologne, Germany.',
  metadataBase: new URL('https://cembesli.com'),
  openGraph: {
    title: 'Cem Besli — Software Engineer',
    description:
      'Software Engineering student. Building AI systems, backend APIs, and IoT pipelines.',
    url: 'https://cembesli.com',
    siteName: 'Cem Besli',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://cembesli.com',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${dmMono.variable} ${ibmPlexSans.variable} ${firaCode.variable}`}
    >
      <body>{children}</body>
    </html>
  )
}
