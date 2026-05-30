'use client'

import { ChevronUp, Receipt } from 'lucide-react'

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
        <p className="font-medium text-studio-dark">{label}</p>
        {detail && <p className="text-xs text-studio-muted">{detail}</p>}
      </div>
      <span
        key={value}
        className="shrink-0 animate-price-pop font-mono text-sm text-studio-dark"
      >
        {value}
      </span>
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
  const durationStep = Math.max(
    0,
    Math.floor((state.durationMinutes - 10) / 5)
  )
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
        label="Tambahan orang"
        detail={
          extraPeople > 0
            ? `${extraPeople} × ${formatRupiah(EXTRA_PERSON_PRICE)}`
            : `${state.numberOfPeople} orang (sudah termasuk paket)`
        }
        value={formatRupiah(breakdown.peopleSurcharge)}
      />
      <Row
        label="Durasi"
        detail={
          durationStep > 0
            ? `${state.durationMinutes} mnt (${durationStep} × ${formatRupiah(25_000)})`
            : `${state.durationMinutes} mnt (sudah termasuk paket)`
        }
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

      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold uppercase tracking-wide text-studio-dark">
          Total
        </span>
        <span
          key={breakdown.total}
          className="animate-price-pop font-display text-2xl font-semibold text-gold"
        >
          {formatRupiah(breakdown.total)}
        </span>
      </div>
    </div>
  )
}

export function PriceSummary({ state, breakdown }: PriceSummaryProps) {
  return (
    <>
      <aside className="hidden lg:block">
        <div className="sticky top-24 rounded-2xl border bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            <Receipt className="h-4 w-4 text-gold" />
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-studio-dark">
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
              'fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-3 border-t bg-white px-5 py-3 shadow-[0_-4px_18px_rgba(0,0,0,0.08)]',
              'lg:hidden'
            )}
            aria-label="Lihat ringkasan harga"
          >
            <div className="flex flex-col text-left">
              <span className="text-[10px] uppercase tracking-[0.18em] text-studio-muted">
                Total
              </span>
              <span
                key={breakdown.total}
                className="animate-price-pop font-display text-xl font-semibold text-gold"
              >
                {formatRupiah(breakdown.total)}
              </span>
            </div>
            <div className="flex items-center gap-1 text-xs font-medium text-studio-dark">
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
