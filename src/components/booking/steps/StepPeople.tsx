'use client'

import { Minus, Plus, Users } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { formatRupiah } from '@/lib/pricing'

interface StepPeopleProps {
  numberOfPeople: number | null
  onChange: (value: number) => void
}

const MIN_PEOPLE = 2
const MAX_PEOPLE = 10
const PRICE_PER_PERSON = 30_000

export function StepPeople({ numberOfPeople, onChange }: StepPeopleProps) {
  const current = numberOfPeople ?? MIN_PEOPLE
  const subtotal = current * PRICE_PER_PERSON
  const isAtMin = current <= MIN_PEOPLE
  const isAtMax = current >= MAX_PEOPLE

  const handleDecrement = () => {
    if (!isAtMin) onChange(current - 1)
  }

  const handleIncrement = () => {
    if (numberOfPeople === null) {
      onChange(MIN_PEOPLE)
      return
    }
    if (!isAtMax) onChange(current + 1)
  }

  return (
    <div className="animate-slide-in-right space-y-8">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 rounded-full bg-gold/10 px-3 py-1 text-xs font-medium text-gold">
          <Users className="h-3.5 w-3.5" />
          Langkah 1
        </div>
        <h2 className="font-display text-3xl text-studio-dark md:text-4xl">
          Berapa orang yang akan foto?
        </h2>
        <p className="text-sm text-studio-muted">
          Pilih jumlah orang dari 2 sampai 10 orang.
        </p>
      </div>

      <div className="flex flex-col items-center gap-6 rounded-2xl border bg-white p-8 shadow-sm md:p-12">
        <div className="flex items-center gap-6 md:gap-10">
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="h-14 w-14 rounded-full border-2 border-studio-dark/15 hover:border-gold hover:bg-gold/10"
            onClick={handleDecrement}
            disabled={numberOfPeople === null || isAtMin}
            aria-label="Kurangi jumlah orang"
          >
            <Minus className="h-6 w-6" />
          </Button>

          <div className="flex min-w-[7rem] flex-col items-center">
            <span
              key={current}
              className="animate-price-pop font-display text-7xl font-semibold text-studio-dark md:text-8xl"
            >
              {numberOfPeople ?? '-'}
            </span>
            <span className="mt-1 text-sm text-studio-muted">orang</span>
          </div>

          <Button
            type="button"
            variant="outline"
            size="icon"
            className="h-14 w-14 rounded-full border-2 border-studio-dark/15 hover:border-gold hover:bg-gold/10"
            onClick={handleIncrement}
            disabled={isAtMax}
            aria-label="Tambah jumlah orang"
          >
            <Plus className="h-6 w-6" />
          </Button>
        </div>

        <div className="text-center">
          <p className="text-sm text-studio-muted">
            {numberOfPeople ?? '-'} × {formatRupiah(PRICE_PER_PERSON)}/orang
          </p>
          <p className="mt-1 font-display text-2xl font-semibold text-gold">
            = {numberOfPeople === null ? '-' : formatRupiah(subtotal)}
          </p>
        </div>
      </div>

      <p className="text-center text-xs text-studio-muted">
        Tap tombol{' '}
        <span className="font-semibold text-studio-dark">+</span> untuk
        memulai
      </p>
    </div>
  )
}
