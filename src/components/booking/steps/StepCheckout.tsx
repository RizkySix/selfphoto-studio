'use client'

import { useMemo, useState } from 'react'
import {
  CalendarDays,
  CalendarIcon,
  CalendarX,
  Clock,
  Loader2,
  ShoppingBag,
} from 'lucide-react'
import { addDays, format, parse } from 'date-fns'
import { id as idLocale } from 'date-fns/locale'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  getAvailableStartTimes,
  getDummySlotsForDate,
} from '@/lib/dummy-data'
import {
  AvailableStartTime,
  DurationMinutes,
  SoftcopyOption,
  getTotalBlockedMinutes,
} from '@/lib/types'

interface StepCheckoutProps {
  customerName: string
  customerPhone: string
  bookingDate: string | null
  startSlotId: string | null
  selectedTimeStart: string | null
  durationMinutes: DurationMinutes
  softcopyOption: SoftcopyOption | null
  isSubmitting: boolean
  canSubmit: boolean
  onCustomerName: (v: string) => void
  onCustomerPhone: (v: string) => void
  onBookingDate: (date: string | null) => void
  onSelectSlot: (slot: AvailableStartTime) => void
  onSoftcopyOption: (o: SoftcopyOption) => void
  onSubmit: () => void
}

export function StepCheckout({
  customerName,
  customerPhone,
  bookingDate,
  startSlotId,
  selectedTimeStart,
  durationMinutes,
  softcopyOption,
  isSubmitting,
  canSubmit,
  onCustomerName,
  onCustomerPhone,
  onBookingDate,
  onSelectSlot,
  onSoftcopyOption,
  onSubmit,
}: StepCheckoutProps) {
  const dateAsDate = bookingDate
    ? parse(bookingDate, 'yyyy-MM-dd', new Date())
    : undefined

  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const maxDate = addDays(today, 30)

  return (
    <div className="animate-slide-in-right space-y-10">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 rounded-full bg-studio-offwhite px-3 py-1 text-xs font-medium text-studio-black">
          <ShoppingBag className="h-3.5 w-3.5" />
          Langkah 4
        </div>
        <h2 className="heading-lg text-3xl text-studio-black md:text-4xl">
          Lengkapi data booking
        </h2>
        <p className="body-text text-sm text-studio-muted">
          Pilih jadwal dan isi data diri kamu.
        </p>
      </div>

      <section className="space-y-4">
        <h3 className="heading-md text-xl text-studio-black">
          Pilih Tanggal & Waktu
        </h3>

        <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
          <div className="rounded-2xl border border-studio-border bg-white p-4 shadow-sm">
            <div className="mb-3 flex items-center gap-2 text-sm font-medium text-studio-black">
              <CalendarIcon className="h-4 w-4 text-studio-black" />
              Tanggal
            </div>
            <Calendar
              mode="single"
              selected={dateAsDate}
              onSelect={(d) =>
                onBookingDate(d ? format(d, 'yyyy-MM-dd') : null)
              }
              disabled={(d) => d < today || d > maxDate}
              locale={idLocale}
            />
            {bookingDate && (
              <p className="mt-3 text-center text-sm text-studio-muted">
                Dipilih:{' '}
                <span className="font-medium text-studio-black">
                  {format(
                    parse(bookingDate, 'yyyy-MM-dd', new Date()),
                    'EEEE, d MMMM yyyy',
                    { locale: idLocale }
                  )}
                </span>
              </p>
            )}
          </div>

          <div className="rounded-2xl border border-studio-border bg-white p-5 shadow-sm">
            {!bookingDate ? (
              <EmptyHint
                icon={<CalendarDays className="h-8 w-8" />}
                title="Pilih tanggal dulu"
                description="Setelah pilih tanggal, kami tampilkan jam mulai yang masih tersedia."
              />
            ) : (
              <TimeSlotPicker
                bookingDate={bookingDate}
                durationMinutes={durationMinutes}
                startSlotId={startSlotId}
                selectedTimeStart={selectedTimeStart}
                onSelectSlot={onSelectSlot}
                onResetDate={() => onBookingDate(null)}
              />
            )}
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="heading-md text-xl text-studio-black">
          Data Diri & Softcopy
        </h3>
        <div className="space-y-4 rounded-2xl border border-studio-border bg-white p-6 shadow-sm">
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
                title="Follow & mention @lensa.studio"
                description="Gratis softcopy semua foto."
                badge={{ text: 'Gratis', variant: 'success' }}
                selected={softcopyOption === SoftcopyOption.FREE_FOLLOW_IG}
              />
              <SoftcopyChoice
                value={SoftcopyOption.FREE_GOOGLE_REVIEW}
                title="Tulis Google Review"
                description="Review jujur untuk softcopy gratis."
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
            <p className="text-xs text-studio-muted">
              Softcopy dikirim via WhatsApp maksimal 1 jam setelah sesi.
            </p>
          </div>
        </div>
      </section>

      <Button
        type="button"
        variant="solid"
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

interface TimeSlotPickerProps {
  bookingDate: string
  durationMinutes: DurationMinutes
  startSlotId: string | null
  selectedTimeStart: string | null
  onSelectSlot: (slot: AvailableStartTime) => void
  onResetDate: () => void
}

interface TimeGroup {
  key: string
  label: string
  range: [string, string]
  items: AvailableStartTime[]
}

const GROUP_DEFS: { key: string; label: string; range: [string, string] }[] = [
  { key: 'pagi', label: 'Pagi', range: ['09:00', '12:00'] },
  { key: 'siang', label: 'Siang', range: ['12:00', '15:00'] },
  { key: 'sore', label: 'Sore', range: ['15:00', '18:00'] },
  { key: 'malam', label: 'Malam', range: ['18:00', '21:00'] },
]

const MAX_VISIBLE = 12

function TimeSlotPicker({
  bookingDate,
  durationMinutes,
  startSlotId,
  selectedTimeStart,
  onSelectSlot,
  onResetDate,
}: TimeSlotPickerProps) {
  const [expanded, setExpanded] = useState(false)
  const [collapsedGroups, setCollapsedGroups] = useState<Set<string>>(
    new Set()
  )

  const availableTimes = useMemo<AvailableStartTime[]>(() => {
    const slots = getDummySlotsForDate(bookingDate)
    return getAvailableStartTimes(slots, durationMinutes)
  }, [bookingDate, durationMinutes])

  const groups = useMemo<TimeGroup[]>(() => {
    return GROUP_DEFS.map((g) => ({
      ...g,
      items: availableTimes.filter(
        (t) => t.timeStart >= g.range[0] && t.timeStart < g.range[1]
      ),
    })).filter((g) => g.items.length > 0)
  }, [availableTimes])

  const totalAvailable = availableTimes.filter((t) => t.isAvailable).length
  const totalStudio = getTotalBlockedMinutes(durationMinutes)

  if (totalAvailable === 0) {
    return (
      <EmptyHint
        icon={<CalendarX className="h-8 w-8" />}
        title="Tidak ada waktu tersedia"
        description="Coba pilih tanggal lain untuk sesi yang kamu mau."
        action={
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onResetDate}
          >
            Pilih tanggal lain
          </Button>
        }
      />
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <p className="label-text text-xs font-semibold uppercase tracking-[0.18em] text-studio-muted">
            Pilih jam mulai
          </p>
          <p className="mt-1 text-sm text-studio-black">
            Sesi <strong>{durationMinutes} menit</strong> · total{' '}
            <strong>{totalStudio} menit</strong> di studio
          </p>
        </div>
        {selectedTimeStart && (
          <div className="rounded-full bg-studio-black px-3 py-1 text-xs font-semibold text-white">
            Terpilih · {selectedTimeStart}
          </div>
        )}
      </div>

      <div className="space-y-5">
        {groups.map((group, gi) => {
          const isCollapsed = collapsedGroups.has(group.key)
          const visibleItems =
            expanded || group.items.length <= MAX_VISIBLE / groups.length + 1
              ? group.items
              : group.items.slice(
                  0,
                  Math.max(2, Math.floor(MAX_VISIBLE / groups.length))
                )

          return (
            <div key={group.key} className="space-y-2">
              <button
                type="button"
                onClick={() =>
                  setCollapsedGroups((prev) => {
                    const next = new Set(prev)
                    if (next.has(group.key)) next.delete(group.key)
                    else next.add(group.key)
                    return next
                  })
                }
                className="flex w-full items-center justify-between text-left"
              >
                <span className="label-text text-xs font-semibold uppercase tracking-[0.18em] text-studio-muted">
                  {group.label} ({group.range[0].replace(':', '.')}–
                  {group.range[1].replace(':', '.')})
                </span>
                <span className="text-[11px] text-studio-muted md:hidden">
                  {isCollapsed ? 'Buka' : 'Tutup'}
                </span>
              </button>

              {!isCollapsed && (
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
                  {visibleItems.map((slot) => {
                    const isSelected =
                      startSlotId === slot.startSlotId && slot.isAvailable
                    const disabled = !slot.isAvailable
                    return (
                      <button
                        key={slot.startSlotId}
                        type="button"
                        disabled={disabled}
                        onClick={() => onSelectSlot(slot)}
                        className={cn(
                          'flex min-h-[64px] flex-col items-center justify-center rounded-xl border px-2 py-2 text-sm transition-all',
                          disabled &&
                            'cursor-not-allowed border-studio-border bg-studio-offwhite text-studio-muted opacity-50',
                          !disabled &&
                            !isSelected &&
                            'border-studio-border bg-white text-studio-black hover:border-studio-black hover:bg-studio-hover',
                          isSelected &&
                            'border-studio-black bg-studio-black text-white font-semibold shadow-sm'
                        )}
                        aria-pressed={isSelected}
                      >
                        <span
                          className={cn(
                            'price-display text-base',
                            disabled && 'line-through'
                          )}
                        >
                          {slot.timeStart}
                        </span>
                        <span
                          className={cn(
                            'mt-0.5 text-[11px]',
                            disabled
                              ? 'text-studio-muted'
                              : isSelected
                                ? 'text-white/70'
                                : 'text-studio-muted'
                          )}
                        >
                          {disabled
                            ? 'Tidak tersedia'
                            : `s/d ${slot.timeEnd}`}
                        </span>
                      </button>
                    )
                  })}
                </div>
              )}

              {gi < groups.length - 1 && (
                <div className="h-px w-full bg-studio-border" aria-hidden />
              )}
            </div>
          )
        })}
      </div>

      {availableTimes.length > MAX_VISIBLE && (
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="w-full"
          onClick={() => setExpanded((v) => !v)}
        >
          {expanded ? 'Tampilkan lebih sedikit' : 'Tampilkan semua waktu'}
        </Button>
      )}

      <p className="flex items-start gap-2 text-xs text-studio-muted">
        <Clock className="mt-0.5 h-3.5 w-3.5" />
        Menampilkan waktu mulai tersedia untuk sesi {durationMinutes} menit
        (total {totalStudio} menit di studio).
      </p>
    </div>
  )
}

function EmptyHint({
  icon,
  title,
  description,
  action,
}: {
  icon: React.ReactNode
  title: string
  description: string
  action?: React.ReactNode
}) {
  return (
    <div className="flex min-h-[16rem] flex-col items-center justify-center rounded-xl border border-dashed border-studio-border bg-studio-offwhite p-6 text-center">
      <div className="text-studio-muted">{icon}</div>
      <p className="heading-md mt-3 text-base text-studio-black">{title}</p>
      <p className="body-text mt-1 max-w-xs text-sm text-studio-muted">
        {description}
      </p>
      {action && <div className="mt-4">{action}</div>}
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
          ? 'border-studio-black bg-studio-offwhite shadow-sm'
          : 'border-studio-border hover:border-studio-black'
      )}
    >
      <RadioGroupItem
        value={value}
        id={`softcopy-${value}`}
        className="mt-1"
      />
      <div className="flex-1">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="font-medium text-studio-black">{title}</p>
          <Badge variant={badge.variant}>{badge.text}</Badge>
        </div>
        <p className="mt-1 text-sm text-studio-muted">{description}</p>
      </div>
    </label>
  )
}
