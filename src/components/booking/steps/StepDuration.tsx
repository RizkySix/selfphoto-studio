'use client'

import { Check, Clock, Image as ImageIcon, Printer, Sparkles } from 'lucide-react'

import { cn } from '@/lib/utils'
import {
  DURATION_OPTIONS,
  DurationMinutes,
  getTotalBlockedMinutes,
} from '@/lib/types'
import { durationSurchargeFor, formatRupiah } from '@/lib/pricing'

interface StepDurationProps {
  durationMinutes: DurationMinutes | null
  onChange: (value: DurationMinutes) => void
}

export function StepDuration({ durationMinutes, onChange }: StepDurationProps) {
  return (
    <div className="animate-slide-in-right space-y-8">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 rounded-full bg-studio-offwhite px-3 py-1 text-xs font-medium text-studio-black">
          <Clock className="h-3.5 w-3.5" />
          Langkah 2
        </div>
        <h2 className="heading-lg text-3xl text-studio-black md:text-4xl">
          Pilih durasi sesi foto
        </h2>
        <p className="body-text text-sm text-studio-muted">
          Mulai dari 10 menit, maksimal 30 menit. Setiap +5 menit hanya
          +{formatRupiah(25_000)}.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
          {DURATION_OPTIONS.map((minutes) => {
            const surcharge = durationSurchargeFor(minutes)
            const isSelected = durationMinutes === minutes
            return (
              <button
                key={minutes}
                type="button"
                onClick={() => onChange(minutes)}
                className={cn(
                  'group flex min-h-[7.5rem] flex-col items-start justify-between rounded-2xl border-2 p-4 text-left transition-all duration-200',
                  isSelected
                    ? 'border-studio-black bg-studio-black text-white shadow-md'
                    : 'border-studio-border bg-white hover:-translate-y-0.5 hover:border-studio-black hover:bg-studio-hover hover:shadow-sm'
                )}
                aria-pressed={isSelected}
              >
                <div>
                  <p
                    className={cn(
                      'price-display text-3xl',
                      isSelected ? 'text-white' : 'text-studio-black'
                    )}
                  >
                    {minutes}{' '}
                    <span className="text-base font-medium">mnt</span>
                  </p>
                  <p
                    className={cn(
                      'mt-1 text-xs',
                      isSelected ? 'text-white/70' : 'text-studio-muted'
                    )}
                  >
                    Sesi foto + pilih foto
                  </p>
                </div>
                <p
                  className={cn(
                    'mt-3 text-xs font-semibold uppercase tracking-wide',
                    isSelected
                      ? 'text-white'
                      : surcharge === 0
                        ? 'text-studio-black'
                        : 'text-studio-muted'
                  )}
                >
                  {surcharge === 0
                    ? 'Termasuk paket'
                    : `+${formatRupiah(surcharge)}`}
                </p>
              </button>
            )
          })}
        </div>

        <YouGetCard durationMinutes={durationMinutes} />
      </div>
    </div>
  )
}

interface YouGetCardProps {
  durationMinutes: DurationMinutes | null
}

function YouGetCard({ durationMinutes }: YouGetCardProps) {
  if (!durationMinutes) {
    return (
      <aside className="flex min-h-[18rem] flex-col items-center justify-center rounded-2xl border border-dashed border-studio-border bg-studio-offwhite p-6 text-center">
        <Clock className="h-10 w-10 text-studio-muted" strokeWidth={1.4} />
        <p className="mt-3 label-text text-sm text-studio-muted">
          Pilih durasi untuk melihat detail sesi
        </p>
      </aside>
    )
  }

  const totalStudio = getTotalBlockedMinutes(durationMinutes)

  return (
    <aside className="rounded-2xl border border-studio-border bg-white p-6 shadow-sm">
      <p className="label-text text-xs font-semibold uppercase tracking-[0.18em] text-studio-muted">
        Kamu mendapat
      </p>
      <ul className="mt-4 space-y-3">
        <Item icon={<Clock className="h-3.5 w-3.5" />}>
          <strong className="font-semibold text-studio-black">
            {durationMinutes} menit
          </strong>{' '}
          bebas berpose
        </Item>
        <Item icon={<ImageIcon className="h-3.5 w-3.5" />}>
          <strong className="font-semibold text-studio-black">
            {durationMinutes} menit
          </strong>{' '}
          pilih foto favorit
        </Item>
        <Item icon={<Printer className="h-3.5 w-3.5" />}>
          2 print ukuran 4R
        </Item>
        <Item icon={<Sparkles className="h-3.5 w-3.5" />}>
          Free accessories
        </Item>
        <Item icon={<ImageIcon className="h-3.5 w-3.5" />}>
          Free softcopy (dengan syarat)
        </Item>
      </ul>

      <div className="mt-5 rounded-xl bg-studio-black px-4 py-3 text-white">
        <p className="label-text text-[11px] uppercase tracking-[0.18em] text-white/70">
          Total waktu di studio
        </p>
        <p className="price-display mt-0.5 text-2xl text-white">
          {totalStudio} menit
        </p>
      </div>
    </aside>
  )
}

function Item({
  icon,
  children,
}: {
  icon: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <li className="flex items-start gap-3 text-sm text-studio-black">
      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-studio-black text-white">
        <Check className="h-3 w-3" strokeWidth={3} />
      </span>
      <span className="body-text flex-1">{children}</span>
      <span className="sr-only">{icon}</span>
    </li>
  )
}
