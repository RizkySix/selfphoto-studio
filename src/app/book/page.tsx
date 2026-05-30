'use client'

import { BookingWizard } from '@/components/booking/BookingWizard'
import { PriceSummary } from '@/components/booking/PriceSummary'
import { Navbar } from '@/components/shared/Navbar'
import { useBooking } from '@/hooks/useBooking'

export default function BookPage() {
  const booking = useBooking()

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="container py-8 md:py-12">
        <div className="mb-8 max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            Booking Sesi
          </p>
          <h1 className="mt-2 font-display text-3xl text-studio-dark md:text-4xl">
            Atur sesi self photo kamu
          </h1>
          <p className="mt-2 text-sm text-studio-muted">
            Cukup 4 langkah. Total harga update otomatis di sebelah kanan.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          <div className="rounded-3xl border bg-cream/40 p-6 shadow-sm md:p-8">
            <BookingWizard booking={booking} />
          </div>
          <PriceSummary
            state={booking.state}
            breakdown={booking.priceBreakdown}
          />
        </div>
      </main>
    </div>
  )
}
