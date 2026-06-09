import type { Metadata } from 'next'
import './globals.css'
import { StoreProvider } from '@/lib/store'
import FluidCursor from '@/components/FluidCursor'
import SmoothScroll from '@/components/SmoothScroll'

export const metadata: Metadata = {
  title: 'Cem Besli — Backend Engineer',
  description: 'Software engineering student moving from Ontario to Cologne. Backend, Linux, Docker, PostgreSQL, FastAPI.',
  metadataBase: new URL('https://cembesli.com'),
  openGraph: {
    title: 'Cem Besli — Backend Engineer',
    description: 'Backend engineer relocating to Cologne, Germany.',
    url: 'https://cembesli.com',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <body>
        <StoreProvider>
          <SmoothScroll>
            <FluidCursor />
            {children}
          </SmoothScroll>
        </StoreProvider>
      </body>
    </html>
  )
}
