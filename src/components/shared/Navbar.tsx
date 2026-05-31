import Link from 'next/link'
import { Camera } from 'lucide-react'

import { Button } from '@/components/ui/button'

export function Navbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-studio-border bg-white backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-studio-black text-white">
            <Camera className="h-4 w-4" />
          </span>
          <span className="font-display text-lg tracking-wide text-studio-black">
            LENSA <span className="text-studio-black">STUDIO</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-studio-muted md:flex">
          <Link href="/" className="hover:text-studio-black">
            Beranda
          </Link>
          <Link href="/book" className="hover:text-studio-black">
            Booking
          </Link>
          <a href="#" className="hover:text-studio-black">
            Galeri
          </a>
          <a href="#" className="hover:text-studio-black">
            Kontak
          </a>
        </nav>

        <Button asChild variant="solid" size="sm">
          <Link href="/book">Booking</Link>
        </Button>
      </div>
    </header>
  )
}
