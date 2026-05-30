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
import { formatRupiah } from '@/lib/pricing'
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
  configured,
}: {
  label: string
  detail?: string
  value: number
  configured: boolean
}) {
  return (
    <div className="flex items-start justify-between gap-3 py-1.5 text-sm">
      <div className="min-w-0">
        <p className="font-medium text-studio-dark">{label}</p>
        {detail && (
          <p className="text-xs text-studio-muted">{detail}</p>
        )}
      </div>
      <span
        key={value}
        className={cn(
          'shrink-0 animate-price-pop font-mono text-sm',
          configured ? 'text-studio-dark' : 'text-studio-muted'
        )}
      >
        {configured ? formatRupiah(value) : '-'}
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
  const peopleConfigured = state.numberOfPeople !== null
  const durationConfigured = state.durationMinutes !== null
  const backgroundConfigured = state.backgroundType !== null
  const softcopyConfigured = state.softcopyOption !== null

  const durationStep = state.durationMinutes
    ? Math.max(0, Math.floor((state.durationMinutes - 10) / 5))
    : 0

  return (
    <div className="space-y-1">
      <Row
        label="Jumlah orang"
        detail={
          peopleConfigured
            ? `${state.numberOfPeople} × ${formatRupiah(30_000)}`
            : 'Belum dipilih'
        }
        value={breakdown.basePeople}
        configured={peopleConfigured}
      />
      <Row
        label="Durasi"
        detail={
          durationConfigured
            ? `${state.durationMinutes} mnt${durationStep > 0 ? ` (${durationStep} × ${formatRupiah(25_000)})` : ''}`
            : 'Belum dipilih'
        }
        value={breakdown.durationSurcharge}
        configured={durationConfigured}
      />
      <Row
        label="Background"
        detail={
          backgroundConfigured
            ? BACKGROUND_LABEL[state.backgroundType!]
            : 'Belum dipilih'
        }
        value={breakdown.backgroundSurcharge}
        configured={backgroundConfigured}
      />
      <Row
        label="Softcopy"
        detail={softcopyConfigured ? 'Sesuai pilihan' : 'Belum dipilih'}
        value={breakdown.softcopySurcharge}
        configured={softcopyConfigured}
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
          {peopleConfigured ? formatRupiah(breakdown.total) : '-'}
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
            className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-3 border-t bg-white px-5 py-3 shadow-[0_-4px_18px_rgba(0,0,0,0.08)] lg:hidden"
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
                {state.numberOfPeople !== null
                  ? formatRupiah(breakdown.total)
                  : '-'}
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
