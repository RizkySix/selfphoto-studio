import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, Syne } from 'next/font/google'

import { cn } from '@/lib/utils'
import './globals.css'

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-syne',
  display: 'swap',
})

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-plus-jakarta',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Lensa Studio · Self Photo Experience di Bali',
  description:
    'Booking sesi self photo di Lensa Studio. Mulai dari Rp 50.000, 6 pilihan background, dan softcopy gratis.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" className={cn(syne.variable, plusJakarta.variable)}>
      <body className="min-h-screen bg-white font-sans text-studio-black antialiased">
        {children}
      </body>
    </html>
  )
}
