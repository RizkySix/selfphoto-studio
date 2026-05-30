'use client'

import { Clock } from 'lucide-react'

import { cn } from '@/lib/utils'
import { DURATION_OPTIONS } from '@/lib/dummy-data'
import { durationSurchargeFor, formatRupiah } from '@/lib/pricing'

interface StepDurationProps {
  durationMinutes: number | null
  onChange: (value: number) => void
}

export function StepDuration({ durationMinutes, onChange }: StepDurationProps) {
  return (
    <div className="animate-slide-in-right space-y-8">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 rounded-full bg-gold/10 px-3 py-1 text-xs font-medium text-gold">
          <Clock className="h-3.5 w-3.5" />
          Langkah 2
        </div>
        <h2 className="font-display text-3xl text-studio-dark md:text-4xl">
          Pilih durasi sesi foto
        </h2>
        <p className="text-sm text-studio-muted">
          Mulai dari 10 menit, bisa diperpanjang sampai 60 menit.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {DURATION_OPTIONS.map((minutes) => {
          const surcharge = durationSurchargeFor(minutes)
          const isSelected = durationMinutes === minutes
          return (
            <button
              key={minutes}
              type="button"
              onClick={() => onChange(minutes)}
              className={cn(
                'group flex min-h-[6.5rem] flex-col items-center justify-center rounded-xl border-2 bg-white p-4 transition-all duration-200',
                isSelected
                  ? 'border-gold bg-gold/10 shadow-md'
                  : 'border-studio-dark/10 hover:-translate-y-0.5 hover:border-gold/40 hover:shadow-sm'
              )}
              aria-pressed={isSelected}
            >
              <span
                className={cn(
                  'font-display text-2xl font-semibold transition-colors',
                  isSelected ? 'text-studio-dark' : 'text-studio-dark/90'
                )}
              >
                {minutes}
              </span>
              <span className="text-xs uppercase tracking-wide text-studio-muted">
                menit
              </span>
              <span
                className={cn(
                  'mt-2 text-xs font-semibold',
                  surcharge === 0
                    ? 'text-emerald-600'
                    : isSelected
                      ? 'text-studio-dark'
                      : 'text-studio-muted'
                )}
              >
                {surcharge === 0 ? 'Gratis' : `+${formatRupiah(surcharge)}`}
              </span>
            </button>
          )
        })}
      </div>

      <p className="text-center text-xs text-studio-muted">
        Durasi dihitung sejak sesi dimulai.
      </p>
    </div>
  )
}
