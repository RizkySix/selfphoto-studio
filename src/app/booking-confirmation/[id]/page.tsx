import Link from 'next/link'
import { Check, Clock, ImageIcon, MapPin, Receipt, Users } from 'lucide-react'
import { format } from 'date-fns'
import { id as idLocale } from 'date-fns/locale'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Navbar } from '@/components/shared/Navbar'
import { Footer } from '@/components/shared/Footer'
import {
  BACKGROUND_LABEL,
  DUMMY_BOOKING_RESULT,
  SOFTCOPY_LABEL,
} from '@/lib/dummy-data'
import { formatRupiah } from '@/lib/pricing'
import { WhatsAppShareButton } from './share-button'

interface PageProps {
  params: { id: string }
}

export default function BookingConfirmationPage({ params }: PageProps) {
  const booking = { ...DUMMY_BOOKING_RESULT, id: params.id }
  const dateLabel = format(
    new Date(booking.bookingDate),
    'EEEE, d MMMM yyyy',
    { locale: idLocale }
  )

  const shareText = [
    `Booking Lensa Studio`,
    `ID: ${booking.id}`,
    `Nama: ${booking.customerName}`,
    `Tanggal: ${dateLabel}`,
    `Jam: ${booking.bookingTime}`,
    `Orang: ${booking.numberOfPeople}`,
    `Durasi: ${booking.durationMinutes} menit`,
    `Background: ${booking.backgroundTypes.map((b) => BACKGROUND_LABEL[b]).join(', ')}`,
    `Total: ${formatRupiah(booking.totalPrice)}`,
  ].join('\n')

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="container flex-1 py-12 md:py-16">
        <div className="mx-auto max-w-2xl">
          <div className="flex flex-col items-center text-center">
            <div className="flex h-20 w-20 animate-check-pop items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg">
              <Check className="h-10 w-10" strokeWidth={3} />
            </div>
            <h1 className="mt-6 font-display text-4xl text-studio-dark md:text-5xl">
              Booking Berhasil!
            </h1>
            <p className="mt-2 text-sm text-studio-muted">
              Sampai jumpa di studio. Tunjukkan ID booking di bawah ke staff.
            </p>
            <div className="mt-5 rounded-full border border-gold/40 bg-gold/10 px-4 py-2 font-mono text-sm font-semibold tracking-wider text-studio-dark">
              {booking.id}
            </div>
          </div>

          <div className="mt-10 rounded-3xl border bg-white p-6 shadow-sm md:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              Detail Booking
            </p>

            <div className="mt-6 space-y-5">
              <DetailRow
                icon={<Users className="h-4 w-4 text-gold" />}
                label="Nama"
                value={booking.customerName}
              />
              <DetailRow
                icon={<Users className="h-4 w-4 text-gold" />}
                label="WhatsApp"
                value={booking.customerPhone}
              />
              <DetailRow
                icon={<Clock className="h-4 w-4 text-gold" />}
                label="Jadwal"
                value={`${dateLabel} · ${booking.bookingTime}`}
              />
              <DetailRow
                icon={<Users className="h-4 w-4 text-gold" />}
                label="Jumlah Orang"
                value={`${booking.numberOfPeople} orang`}
              />
              <DetailRow
                icon={<Clock className="h-4 w-4 text-gold" />}
                label="Durasi"
                value={`${booking.durationMinutes} menit`}
              />
              <DetailRow
                icon={<ImageIcon className="h-4 w-4 text-gold" />}
                label="Background"
                value={booking.backgroundTypes
                  .map((b) => BACKGROUND_LABEL[b])
                  .join(', ')}
              />
              <DetailRow
                icon={<ImageIcon className="h-4 w-4 text-gold" />}
                label="Softcopy"
                value={SOFTCOPY_LABEL[booking.softcopyOption]}
              />
            </div>

            <Separator className="my-6" />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Receipt className="h-4 w-4 text-gold" />
                <span className="text-sm font-semibold uppercase tracking-wide text-studio-dark">
                  Total
                </span>
              </div>
              <span className="font-display text-2xl font-semibold text-gold">
                {formatRupiah(booking.totalPrice)}
              </span>
            </div>
          </div>

          <div className="mt-8 rounded-3xl border border-gold/30 bg-cream p-6 md:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              Yang perlu kamu siapkan
            </p>
            <ul className="mt-4 space-y-3 text-sm text-studio-dark">
              <Tip
                icon={<Clock className="h-4 w-4 text-gold" />}
                text="Datang 5 menit sebelum jadwal sesi."
              />
              <Tip
                icon={<Receipt className="h-4 w-4 text-gold" />}
                text="Tunjukkan booking ID ini ke staff."
              />
              <Tip
                icon={<MapPin className="h-4 w-4 text-gold" />}
                text="Bebas kreasi dengan accessories yang tersedia."
              />
            </ul>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <WhatsAppShareButton text={shareText} />
            <Button asChild variant="outline" size="lg" className="w-full sm:flex-1">
              <Link href="/book">Booking Lagi</Link>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

function DetailRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: string
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-2 text-sm text-studio-muted">
        {icon}
        {label}
      </div>
      <span className="text-right text-sm font-medium text-studio-dark">
        {value}
      </span>
    </div>
  )
}

function Tip({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white">
        {icon}
      </span>
      <span>{text}</span>
    </li>
  )
}
