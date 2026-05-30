import type { Metadata } from 'next'
import { DM_Sans, Playfair_Display } from 'next/font/google'

import { cn } from '@/lib/utils'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Lensa Studio · Self Photo Experience di Bali',
  description:
    'Booking sesi self photo di Lensa Studio. Mulai dari Rp 60.000, 6 pilihan background, dan softcopy gratis.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" className={cn(playfair.variable, dmSans.variable)}>
      <body className="min-h-screen font-sans text-studio-dark antialiased">
        {children}
      </body>
    </html>
  )
}
