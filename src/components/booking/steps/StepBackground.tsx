'use client'

import { Check, Palette } from 'lucide-react'

import { cn } from '@/lib/utils'
import { BACKGROUND_OPTIONS } from '@/lib/dummy-data'
import {
  EXTRA_BACKGROUND_PRICE,
  MAX_BACKGROUNDS,
  backgroundSurchargeFor,
  formatRupiah,
} from '@/lib/pricing'
import { Badge } from '@/components/ui/badge'
import { BackgroundType } from '@/lib/types'

interface StepBackgroundProps {
  backgroundTypes: BackgroundType[]
  onToggle: (type: BackgroundType) => void
}

export function StepBackground({
  backgroundTypes,
  onToggle,
}: StepBackgroundProps) {
  const selectedCount = backgroundTypes.length
  const isAtMax = selectedCount >= MAX_BACKGROUNDS
  const currentSurcharge = backgroundSurchargeFor(selectedCount)

  return (
    <div className="animate-slide-in-right space-y-8">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 rounded-full bg-gold/10 px-3 py-1 text-xs font-medium text-gold">
          <Palette className="h-3.5 w-3.5" />
          Langkah 3
        </div>
        <h2 className="font-display text-3xl text-studio-dark md:text-4xl">
          Pilih background favorit kamu
        </h2>
        <p className="text-sm text-studio-muted">
          1 background sudah termasuk paket. Tambah background lain hanya
          +{formatRupiah(EXTRA_BACKGROUND_PRICE)} per pilihan, maksimal{' '}
          {MAX_BACKGROUNDS} background.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-gold/30 bg-gold/5 px-4 py-3 text-sm">
        <span className="text-studio-dark">
          Terpilih{' '}
          <span className="font-semibold">
            {selectedCount}/{MAX_BACKGROUNDS}
          </span>{' '}
          background
        </span>
        <span className="font-medium text-gold">
          {currentSurcharge === 0
            ? 'Tidak ada biaya tambahan'
            : `+${formatRupiah(currentSurcharge)}`}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {BACKGROUND_OPTIONS.map((option) => {
          const isSelected = backgroundTypes.includes(option.type)
          const isDisabled = !isSelected && isAtMax
          const orderIndex = backgroundTypes.indexOf(option.type)

          return (
            <button
              key={option.type}
              type="button"
              onClick={() => onToggle(option.type)}
              disabled={isDisabled}
              className={cn(
                'group relative flex flex-col items-center gap-3 rounded-2xl border-2 bg-white p-5 text-left transition-all duration-200',
                isSelected
                  ? 'scale-[1.02] border-gold shadow-lg ring-4 ring-gold/15'
                  : 'border-studio-dark/10 hover:-translate-y-1 hover:shadow-md',
                isDisabled && 'cursor-not-allowed opacity-50 hover:translate-y-0 hover:shadow-none'
              )}
              aria-pressed={isSelected}
            >
              {isSelected && (
                <div className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-gold text-studio-dark shadow">
                  <Check className="h-3.5 w-3.5" strokeWidth={3} />
                </div>
              )}
              {isSelected && orderIndex > 0 && (
                <div className="absolute left-3 top-3 rounded-full bg-studio-dark px-2 py-0.5 text-[10px] font-semibold text-cream">
                  #{orderIndex + 1}
                </div>
              )}
              <div
                className="h-20 w-20 rounded-full border-4 border-white shadow-inner ring-1 ring-studio-dark/10 transition-transform group-hover:scale-105"
                style={{ backgroundColor: option.colorPreview }}
                aria-hidden
              />
              <div className="text-center">
                <p className="font-display text-lg font-semibold text-studio-dark">
                  {option.label}
                </p>
                <p className="mt-0.5 text-xs text-studio-muted">
                  {option.description}
                </p>
              </div>
              <Badge variant={isSelected ? 'gold' : 'secondary'}>
                {isSelected
                  ? orderIndex === 0
                    ? 'Termasuk paket'
                    : `+${formatRupiah(EXTRA_BACKGROUND_PRICE)}`
                  : `+${formatRupiah(EXTRA_BACKGROUND_PRICE)}`}
              </Badge>
            </button>
          )
        })}
      </div>

      {isAtMax && (
        <p className="text-center text-xs text-amber-700">
          Maksimal {MAX_BACKGROUNDS} background tercapai. Hapus salah satu
          untuk mengganti.
        </p>
      )}
    </div>
  )
}
