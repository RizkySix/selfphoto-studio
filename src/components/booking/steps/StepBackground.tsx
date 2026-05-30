'use client'

import { Palette } from 'lucide-react'

import { cn } from '@/lib/utils'
import { BACKGROUND_OPTIONS } from '@/lib/dummy-data'
import { formatRupiah } from '@/lib/pricing'
import { Badge } from '@/components/ui/badge'
import { BackgroundType } from '@/lib/types'

interface StepBackgroundProps {
  backgroundType: BackgroundType | null
  onChange: (value: BackgroundType) => void
}

export function StepBackground({
  backgroundType,
  onChange,
}: StepBackgroundProps) {
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
          Wall Book gratis. Background lainnya hanya +Rp 50.000.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {BACKGROUND_OPTIONS.map((option) => {
          const isSelected = backgroundType === option.type
          const isFree = option.surcharge === 0
          return (
            <button
              key={option.type}
              type="button"
              onClick={() => onChange(option.type)}
              className={cn(
                'group flex flex-col items-center gap-3 rounded-2xl border-2 bg-white p-5 text-left transition-all duration-200',
                isSelected
                  ? 'scale-[1.02] border-gold shadow-lg ring-4 ring-gold/15'
                  : 'border-studio-dark/10 hover:-translate-y-1 hover:shadow-md'
              )}
              aria-pressed={isSelected}
            >
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
              <Badge variant={isFree ? 'success' : 'gold'}>
                {isFree ? 'Gratis' : `+${formatRupiah(option.surcharge)}`}
              </Badge>
            </button>
          )
        })}
      </div>
    </div>
  )
}
