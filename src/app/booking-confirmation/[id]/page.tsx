import Link from 'next/link'
import { Check, Clock, ImageIcon, MapPin, Receipt, Users } from 'lucide-react'
import { format, parse } from 'date-fns'
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
    parse(booking.bookingDate, 'yyyy-MM-dd', new Date()),
    'EEEE, d MMMM yyyy',
    { locale: idLocale }
  )

  const shareText = [
    `Booking Lensa Studio`,
    `ID: ${booking.id}`,
    `Nama: ${booking.customerName}`,
    `Tanggal: ${dateLabel}`,
    `Waktu: ${booking.selectedTimeStart} – ${booking.selectedTimeEnd}`,
    `Orang: ${booking.numberOfPeople}`,
    `Durasi sesi foto: ${booking.durationMinutes} menit`,
    `Total waktu di studio: ${booking.totalBlockedMinutes} menit`,
    `Background: ${booking.backgroundTypes.map((b) => BACKGROUND_LABEL[b]).join(', ')}`,
    `Total: ${formatRupiah(booking.totalPrice)}`,
  ].join('\n')

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="container flex-1 py-12 md:py-16">
        <div className="mx-auto max-w-2xl">
          <div className="flex flex-col items-center text-center">
            <div className="flex h-20 w-20 animate-check-pop items-center justify-center rounded-full bg-studio-black text-white shadow-lg">
              <Check className="h-10 w-10" strokeWidth={3} />
            </div>
            <h1 className="mt-6 font-display text-4xl text-studio-black md:text-5xl">
              Booking Berhasil!
            </h1>
            <p className="mt-2 text-sm text-studio-muted">
              Sampai jumpa di studio. Tunjukkan ID booking di bawah ke staff.
            </p>
            <div className="mt-5 rounded-full bg-studio-black px-5 py-2 font-display text-sm font-semibold tracking-wider text-white">
              {booking.id}
            </div>
          </div>

          <div className="mt-10 rounded-3xl border border-studio-border bg-studio-offwhite p-6 shadow-sm md:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-studio-black">
              Detail Booking
            </p>

            <div className="mt-6 space-y-5">
              <DetailRow
                icon={<Users className="h-4 w-4 text-studio-black" />}
                label="Nama"
                value={booking.customerName}
              />
              <DetailRow
                icon={<Users className="h-4 w-4 text-studio-black" />}
                label="WhatsApp"
                value={booking.customerPhone}
              />
              <DetailRow
                icon={<Clock className="h-4 w-4 text-studio-black" />}
                label="Jadwal"
                value={dateLabel}
              />
              <DetailRow
                icon={<Clock className="h-4 w-4 text-studio-black" />}
                label="Waktu"
                value={`${booking.selectedTimeStart} – ${booking.selectedTimeEnd}`}
              />
              <DetailRow
                icon={<Users className="h-4 w-4 text-studio-black" />}
                label="Jumlah Orang"
                value={`${booking.numberOfPeople} orang`}
              />
              <DetailRow
                icon={<Clock className="h-4 w-4 text-studio-black" />}
                label="Durasi sesi foto"
                value={`${booking.durationMinutes} menit`}
              />
              <DetailRow
                icon={<Clock className="h-4 w-4 text-studio-black" />}
                label="Total waktu di studio"
                value={`${booking.totalBlockedMinutes} menit`}
              />
              <DetailRow
                icon={<ImageIcon className="h-4 w-4 text-studio-black" />}
                label="Background"
                value={booking.backgroundTypes
                  .map((b) => BACKGROUND_LABEL[b])
                  .join(', ')}
              />
              <DetailRow
                icon={<ImageIcon className="h-4 w-4 text-studio-black" />}
                label="Softcopy"
                value={SOFTCOPY_LABEL[booking.softcopyOption]}
              />
            </div>

            <Separator className="my-6" />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Receipt className="h-4 w-4 text-studio-black" />
                <span className="text-sm font-semibold uppercase tracking-wide text-studio-black">
                  Total
                </span>
              </div>
              <span className="font-display text-2xl font-semibold text-studio-black">
                {formatRupiah(booking.totalPrice)}
              </span>
            </div>
          </div>

          <div className="mt-6 flex items-start gap-4 rounded-2xl bg-studio-black p-5 text-white md:p-6">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-studio-black">
              <Clock className="h-5 w-5" />
            </span>
            <div>
              <p className="heading-md text-base text-white">
                Mohon datang 5 menit sebelum jadwal
              </p>
              <p className="body-text mt-1 text-sm text-white/70">
                Waktu sesi dimulai tepat pukul {booking.selectedTimeStart}.
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-3xl border border-studio-border bg-white p-6 md:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-studio-black">
              Yang perlu kamu siapkan
            </p>
            <ul className="mt-4 space-y-3 text-sm text-studio-black">
              <Tip
                icon={<Clock className="h-4 w-4 text-studio-black" />}
                text="Datang 5 menit sebelum jadwal sesi."
              />
              <Tip
                icon={<Receipt className="h-4 w-4 text-studio-black" />}
                text="Tunjukkan booking ID ini ke staff."
              />
              <Tip
                icon={<MapPin className="h-4 w-4 text-studio-black" />}
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
      <span className="text-right text-sm font-medium text-studio-black">
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
