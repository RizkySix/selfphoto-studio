'use client'

import { CalendarIcon, Loader2, ShoppingBag } from 'lucide-react'
import { format } from 'date-fns'
import { id as idLocale } from 'date-fns/locale'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { DUMMY_SLOTS } from '@/lib/dummy-data'
import { SoftcopyOption } from '@/lib/types'

interface StepCheckoutProps {
  customerName: string
  customerPhone: string
  bookingDate: Date | null
  bookingTime: string | null
  softcopyOption: SoftcopyOption | null
  isSubmitting: boolean
  canSubmit: boolean
  onCustomerName: (v: string) => void
  onCustomerPhone: (v: string) => void
  onBookingDate: (d: Date | null) => void
  onBookingTime: (t: string) => void
  onSoftcopyOption: (o: SoftcopyOption) => void
  onSubmit: () => void
}

export function StepCheckout({
  customerName,
  customerPhone,
  bookingDate,
  bookingTime,
  softcopyOption,
  isSubmitting,
  canSubmit,
  onCustomerName,
  onCustomerPhone,
  onBookingDate,
  onBookingTime,
  onSoftcopyOption,
  onSubmit,
}: StepCheckoutProps) {
  return (
    <div className="animate-slide-in-right space-y-10">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 rounded-full bg-gold/10 px-3 py-1 text-xs font-medium text-gold">
          <ShoppingBag className="h-3.5 w-3.5" />
          Langkah 4
        </div>
        <h2 className="font-display text-3xl text-studio-dark md:text-4xl">
          Lengkapi data booking
        </h2>
        <p className="text-sm text-studio-muted">
          Pilih jadwal dan isi data diri kamu.
        </p>
      </div>

      <section className="space-y-4">
        <h3 className="font-display text-xl text-studio-dark">
          Pilih Jadwal
        </h3>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border bg-white p-4 shadow-sm">
            <div className="mb-3 flex items-center gap-2 text-sm font-medium text-studio-dark">
              <CalendarIcon className="h-4 w-4 text-gold" />
              Tanggal Booking
            </div>
            <Calendar
              mode="single"
              selected={bookingDate ?? undefined}
              onSelect={(d) => onBookingDate(d ?? null)}
              disabled={(d) =>
                d <
                new Date(new Date().setHours(0, 0, 0, 0))
              }
              locale={idLocale}
            />
            {bookingDate && (
              <p className="mt-3 text-center text-sm text-studio-muted">
                Dipilih:{' '}
                <span className="font-medium text-studio-dark">
                  {format(bookingDate, 'EEEE, d MMMM yyyy', {
                    locale: idLocale,
                  })}
                </span>
              </p>
            )}
          </div>

          <div className="rounded-2xl border bg-white p-4 shadow-sm">
            <div className="mb-3 text-sm font-medium text-studio-dark">
              Pilih Waktu
            </div>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {DUMMY_SLOTS.map((slot) => {
                const isSelected = bookingTime === slot.timeStart
                return (
                  <button
                    key={slot.id}
                    type="button"
                    disabled={slot.isBooked}
                    onClick={() => onBookingTime(slot.timeStart)}
                    className={cn(
                      'flex min-h-[44px] flex-col items-center justify-center rounded-lg border px-2 py-2 text-sm transition-all',
                      slot.isBooked &&
                        'cursor-not-allowed border-dashed border-studio-muted/30 bg-studio-muted/5 text-studio-muted/60 line-through',
                      !slot.isBooked &&
                        !isSelected &&
                        'border-studio-dark/10 bg-white hover:border-gold hover:bg-gold/5',
                      isSelected &&
                        'border-gold bg-gold text-studio-dark font-semibold shadow-sm'
                    )}
                  >
                    <span>
                      {slot.timeStart} – {slot.timeEnd}
                    </span>
                  </button>
                )
              })}
            </div>
            <p className="mt-3 text-xs text-studio-muted">
              Slot yang dicoret sudah terisi.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="font-display text-xl text-studio-dark">
          Data Diri & Softcopy
        </h3>
        <div className="space-y-4 rounded-2xl border bg-white p-6 shadow-sm">
          <div className="space-y-2">
            <Label htmlFor="customer-name">Nama Lengkap</Label>
            <Input
              id="customer-name"
              placeholder="Nama sesuai KTP"
              value={customerName}
              onChange={(e) => onCustomerName(e.target.value)}
              autoComplete="name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="customer-phone">Nomor WhatsApp</Label>
            <Input
              id="customer-phone"
              type="tel"
              inputMode="numeric"
              placeholder="08xxxxxxxxxx"
              value={customerPhone}
              onChange={(e) =>
                onCustomerPhone(e.target.value.replace(/[^\d+]/g, ''))
              }
              autoComplete="tel"
            />
          </div>

          <div className="space-y-3 pt-2">
            <Label>Pilihan Softcopy</Label>
            <RadioGroup
              value={softcopyOption ?? ''}
              onValueChange={(v) => onSoftcopyOption(v as SoftcopyOption)}
              className="space-y-2"
            >
              <SoftcopyChoice
                value={SoftcopyOption.FREE_FOLLOW_IG}
                title="Follow & Mention Instagram"
                description="Gratis softcopy semua foto."
                badge={{ text: 'Gratis', variant: 'success' }}
                selected={softcopyOption === SoftcopyOption.FREE_FOLLOW_IG}
              />
              <SoftcopyChoice
                value={SoftcopyOption.FREE_GOOGLE_REVIEW}
                title="Google Review"
                description="Tulis review jujur untuk softcopy gratis."
                badge={{ text: 'Gratis', variant: 'success' }}
                selected={
                  softcopyOption === SoftcopyOption.FREE_GOOGLE_REVIEW
                }
              />
              <SoftcopyChoice
                value={SoftcopyOption.PAID}
                title="Tidak (beli softcopy)"
                description="Langsung dapat semua softcopy tanpa syarat."
                badge={{ text: '+Rp 20.000', variant: 'warning' }}
                selected={softcopyOption === SoftcopyOption.PAID}
              />
            </RadioGroup>
          </div>
        </div>
      </section>

      <Button
        type="button"
        variant="gold"
        size="xl"
        className="w-full"
        disabled={!canSubmit || isSubmitting}
        onClick={onSubmit}
      >
        {isSubmitting ? (
          <span className="flex items-center gap-2">
            <Loader2 className="h-5 w-5 animate-spin" />
            Memproses booking...
          </span>
        ) : (
          'Konfirmasi Booking'
        )}
      </Button>
    </div>
  )
}

interface SoftcopyChoiceProps {
  value: SoftcopyOption
  title: string
  description: string
  badge: { text: string; variant: 'success' | 'warning' }
  selected: boolean
}

function SoftcopyChoice({
  value,
  title,
  description,
  badge,
  selected,
}: SoftcopyChoiceProps) {
  return (
    <label
      htmlFor={`softcopy-${value}`}
      className={cn(
        'flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition-all',
        selected
          ? 'border-gold bg-gold/5 shadow-sm'
          : 'border-studio-dark/10 hover:border-gold/50'
      )}
    >
      <RadioGroupItem value={value} id={`softcopy-${value}`} className="mt-1" />
      <div className="flex-1">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="font-medium text-studio-dark">{title}</p>
          <Badge variant={badge.variant}>{badge.text}</Badge>
        </div>
        <p className="mt-1 text-sm text-studio-muted">{description}</p>
      </div>
    </label>
  )
}
