import Link from 'next/link'
import {
  ArrowRight,
  Camera,
  Clock,
  Image as ImageIcon,
  Palette,
  Printer,
  Sparkles,
  Wallet,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Navbar } from '@/components/shared/Navbar'
import { Footer } from '@/components/shared/Footer'

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        <section className="relative overflow-hidden">
          <div className="container grid gap-12 py-16 md:grid-cols-[1.1fr_0.9fr] md:py-24">
            <div className="stagger space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-white/60 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-gold">
                <Sparkles className="h-3.5 w-3.5" />
                Self Photo Studio · Bali
              </div>

              <h1 className="font-display text-5xl leading-tight text-studio-dark md:text-6xl lg:text-7xl">
                Self Photo,
                <br />
                <span className="text-gold">vibes-nya kamu.</span>
              </h1>

              <p className="max-w-lg text-base text-studio-muted md:text-lg">
                LENSA STUDIO — Self Photo Experience di Bali. Bebas berekspresi,
                bebas pose, dan bawa pulang foto cetak hari itu juga.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <Button asChild variant="gold" size="xl">
                  <Link href="/book">
                    Booking Sekarang
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="ghost" size="xl" className="text-studio-dark">
                  <a href="#highlights">Lihat selengkapnya</a>
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/5] overflow-hidden rounded-3xl bg-gradient-to-br from-gold/30 via-cream to-studio-dark/80 shadow-xl">
                <div className="flex h-full w-full flex-col items-center justify-center text-center text-cream">
                  <Camera className="h-16 w-16 text-gold" strokeWidth={1.4} />
                  <p className="mt-4 font-display text-2xl text-cream">
                    Frame your moment
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-[0.3em] text-cream/70">
                    Lensa · Canggu · Bali
                  </p>
                </div>
              </div>
              <div className="absolute -bottom-5 -left-5 hidden rounded-2xl border bg-white p-4 shadow-lg md:block">
                <p className="text-xs text-studio-muted">Mulai dari</p>
                <p className="font-display text-2xl font-semibold text-gold">
                  Rp 60.000
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="highlights" className="container py-12">
          <div className="grid gap-4 md:grid-cols-3">
            <HighlightCard
              icon={<Wallet className="h-5 w-5" />}
              title="Mulai dari Rp 60.000"
              description="Harga ramah, tanpa biaya tersembunyi."
            />
            <HighlightCard
              icon={<Clock className="h-5 w-5" />}
              title="Self Photo 10–60 Menit"
              description="Pilih durasi sesuai kebutuhan kamu."
            />
            <HighlightCard
              icon={<Palette className="h-5 w-5" />}
              title="6 Pilihan Background"
              description="Dari Wall Book sampai Taman Garden."
            />
          </div>
        </section>

        <section className="container py-16">
          <div className="rounded-3xl border bg-white p-8 shadow-sm md:p-12">
            <div className="mb-8 max-w-xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                Yang kamu dapat
              </p>
              <h2 className="mt-2 font-display text-3xl text-studio-dark md:text-4xl">
                Semua yang perlu, sudah dalam paket.
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <InclusionItem
                icon={<Printer className="h-5 w-5" />}
                title="2 Print 4R"
                description="Hasil cetak langsung jadi setelah sesi."
              />
              <InclusionItem
                icon={<Sparkles className="h-5 w-5" />}
                title="Free Accessories"
                description="Topi, kacamata, dan props gratis dipakai."
              />
              <InclusionItem
                icon={<ImageIcon className="h-5 w-5" />}
                title="Free Softcopy"
                description="Cukup follow IG atau Google Review."
              />
              <InclusionItem
                icon={<Wallet className="h-5 w-5" />}
                title="Real-time Calculator"
                description="Harga update real-time saat booking."
              />
            </div>
          </div>
        </section>

        <section className="container pb-20">
          <div className="rounded-3xl bg-studio-dark p-10 text-cream md:p-14">
            <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="font-display text-3xl md:text-4xl">
                  Siap untuk sesi <span className="text-gold">kamu</span>?
                </h3>
                <p className="mt-2 max-w-md text-sm text-cream/70">
                  Booking hanya 4 langkah. Total harga langsung kelihatan
                  sebelum bayar.
                </p>
              </div>
              <Button asChild variant="gold" size="xl">
                <Link href="/book">
                  Mulai Booking
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

function HighlightCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/15 text-gold">
        {icon}
      </div>
      <p className="mt-4 font-display text-xl text-studio-dark">{title}</p>
      <p className="mt-1 text-sm text-studio-muted">{description}</p>
    </div>
  )
}

function InclusionItem({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="flex gap-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cream text-gold">
        {icon}
      </div>
      <div>
        <p className="font-semibold text-studio-dark">{title}</p>
        <p className="mt-0.5 text-sm text-studio-muted">{description}</p>
      </div>
    </div>
  )
}
