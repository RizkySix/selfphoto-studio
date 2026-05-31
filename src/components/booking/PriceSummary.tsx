'use client'

import { CalendarDays, ChevronUp, Clock, Receipt } from 'lucide-react'
import { format, parse } from 'date-fns'
import { id as idLocale } from 'date-fns/locale'

import { cn } from '@/lib/utils'
import { Separator } from '@/components/ui/separator'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import {
  EXTRA_BACKGROUND_PRICE,
  EXTRA_PERSON_PRICE,
  MIN_PEOPLE,
  formatRupiah,
} from '@/lib/pricing'
import { BACKGROUND_LABEL } from '@/lib/dummy-data'
import type { BookingState, PriceBreakdown } from '@/lib/types'

interface PriceSummaryProps {
  state: BookingState
  breakdown: PriceBreakdown
}

function Row({
  label,
  detail,
  value,
}: {
  label: string
  detail?: string
  value: string
}) {
  return (
    <div className="flex items-start justify-between gap-3 py-1.5 text-sm">
      <div className="min-w-0">
        <p className="label-text text-studio-black">{label}</p>
        {detail && <p className="text-xs text-studio-muted">{detail}</p>}
      </div>
      <span
        key={value}
        className="shrink-0 animate-price-pop font-mono text-sm text-studio-black"
      >
        {value}
      </span>
    </div>
  )
}

function formatLongDate(date: string): string {
  return format(
    parse(date, 'yyyy-MM-dd', new Date()),
    'EEEE, d MMMM yyyy',
    { locale: idLocale }
  )
}

function formatShortDate(date: string): string {
  return format(parse(date, 'yyyy-MM-dd', new Date()), 'EEE d MMM', {
    locale: idLocale,
  })
}

function Schedule({ state }: { state: BookingState }) {
  if (!state.bookingDate && !state.selectedTimeStart) return null

  return (
    <div className="mt-4 rounded-xl border border-studio-border bg-studio-offwhite p-3 text-sm">
      <p className="label-text text-[11px] font-semibold uppercase tracking-[0.18em] text-studio-muted">
        Jadwal
      </p>
      <div className="mt-2 space-y-1.5">
        <div className="flex items-center justify-between gap-3">
          <span className="flex items-center gap-2 text-studio-muted">
            <CalendarDays className="h-3.5 w-3.5" />
            Tanggal
          </span>
          <span className="text-right font-medium text-studio-black">
            {state.bookingDate ? formatLongDate(state.bookingDate) : '—'}
          </span>
        </div>
        <div className="flex items-center justify-between gap-3">
          <span className="flex items-center gap-2 text-studio-muted">
            <Clock className="h-3.5 w-3.5" />
            Mulai
          </span>
          <span className="price-display text-studio-black">
            {state.selectedTimeStart ?? '—'}
          </span>
        </div>
        <div className="flex items-center justify-between gap-3">
          <span className="flex items-center gap-2 text-studio-muted">
            <Clock className="h-3.5 w-3.5" />
            Selesai
          </span>
          <span className="price-display text-studio-black">
            {state.selectedTimeEnd ?? '—'}
          </span>
        </div>
      </div>
    </div>
  )
}

function Breakdown({
  state,
  breakdown,
}: {
  state: BookingState
  breakdown: PriceBreakdown
}) {
  const extraPeople = Math.max(0, state.numberOfPeople - MIN_PEOPLE)
  const extraBackgrounds = Math.max(0, state.backgroundTypes.length - 1)

  const backgroundNames = state.backgroundTypes
    .map((b) => BACKGROUND_LABEL[b])
    .join(', ')

  return (
    <div className="space-y-1">
      <Row
        label="Paket dasar"
        detail={`${MIN_PEOPLE} orang · 10 menit · 1 background`}
        value={formatRupiah(breakdown.basePackage)}
      />
      <Row
        label="Jumlah orang"
        detail={
          extraPeople > 0
            ? `${state.numberOfPeople} orang (${extraPeople} × ${formatRupiah(EXTRA_PERSON_PRICE)})`
            : `${state.numberOfPeople} orang (sudah termasuk paket)`
        }
        value={formatRupiah(breakdown.peopleSurcharge)}
      />
      <Row
        label="Durasi foto"
        detail={`${state.durationMinutes} menit`}
        value={formatRupiah(breakdown.durationSurcharge)}
      />
      <Row
        label="Background"
        detail={
          backgroundNames
            ? `${state.backgroundTypes.length} pilihan: ${backgroundNames}`
            : 'Belum dipilih'
        }
        value={
          extraBackgrounds > 0
            ? `+${formatRupiah(extraBackgrounds * EXTRA_BACKGROUND_PRICE)}`
            : formatRupiah(0)
        }
      />
      <Row
        label="Softcopy"
        detail={
          state.softcopyOption ? 'Sesuai pilihan' : 'Belum dipilih'
        }
        value={formatRupiah(breakdown.softcopySurcharge)}
      />

      <Separator className="my-3" />

      <div className="-mx-2 flex items-center justify-between rounded-xl bg-studio-black px-4 py-3 text-white">
        <span className="label-text text-xs font-semibold uppercase tracking-[0.18em] text-white/80">
          Total
        </span>
        <span
          key={breakdown.total}
          className="price-display animate-price-pop text-2xl text-white"
        >
          {formatRupiah(breakdown.total)}
        </span>
      </div>

      <Schedule state={state} />
    </div>
  )
}

function MobileBottomLabel({
  state,
  total,
}: {
  state: BookingState
  total: number
}) {
  const datePart = state.bookingDate ? formatShortDate(state.bookingDate) : null
  const timePart =
    state.selectedTimeStart && state.selectedTimeEnd
      ? `${state.selectedTimeStart}–${state.selectedTimeEnd}`
      : null
  const parts = [formatRupiah(total), datePart, timePart].filter(Boolean)

  return (
    <span
      key={parts.join('·')}
      className="price-display animate-price-pop text-base text-studio-black"
    >
      {parts.join(' · ')}
    </span>
  )
}

export function PriceSummary({ state, breakdown }: PriceSummaryProps) {
  return (
    <>
      <aside className="hidden lg:block">
        <div className="sticky top-24 rounded-2xl border border-studio-border bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            <Receipt className="h-4 w-4 text-studio-black" />
            <h3 className="label-text text-xs font-semibold uppercase tracking-[0.18em] text-studio-black">
              Ringkasan Harga
            </h3>
          </div>
          <Breakdown state={state} breakdown={breakdown} />
          <p className="mt-4 text-[11px] leading-relaxed text-studio-muted">
            Sudah termasuk 2 print 4R, akses semua accessories, dan staff
            assistance.
          </p>
        </div>
      </aside>

      <Sheet>
        <SheetTrigger asChild>
          <button
            type="button"
            className={cn(
              'fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-3 border-t border-studio-border bg-white px-5 py-3 shadow-[0_-4px_18px_rgba(0,0,0,0.08)]',
              'lg:hidden'
            )}
            aria-label="Lihat ringkasan harga"
          >
            <div className="flex flex-col text-left">
              <span className="text-[10px] uppercase tracking-[0.18em] text-studio-muted">
                Total
              </span>
              <MobileBottomLabel state={state} total={breakdown.total} />
            </div>
            <div className="flex items-center gap-1 text-xs font-medium text-studio-black">
              Lihat rincian
              <ChevronUp className="h-4 w-4" />
            </div>
          </button>
        </SheetTrigger>
        <SheetContent className="px-5 pb-8 pt-2">
          <SheetHeader>
            <SheetTitle className="text-left font-display text-lg">
              Ringkasan Harga
            </SheetTitle>
          </SheetHeader>
          <div className="px-1">
            <Breakdown state={state} breakdown={breakdown} />
          </div>
        </SheetContent>
      </Sheet>

      <div className="h-20 lg:hidden" aria-hidden />
    </>
  )
}
