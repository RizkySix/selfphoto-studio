'use client'

import { Minus, Plus, Users } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  BASE_PACKAGE_PRICE,
  EXTRA_PERSON_PRICE,
  MAX_PEOPLE,
  MIN_PEOPLE,
  formatRupiah,
  peopleSurchargeFor,
} from '@/lib/pricing'

interface StepPeopleProps {
  numberOfPeople: number
  onChange: (value: number) => void
}

export function StepPeople({ numberOfPeople, onChange }: StepPeopleProps) {
  const subtotal = BASE_PACKAGE_PRICE + peopleSurchargeFor(numberOfPeople)
  const isAtMin = numberOfPeople <= MIN_PEOPLE
  const isAtMax = numberOfPeople >= MAX_PEOPLE

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
          Minimal 2 orang sudah termasuk paket {formatRupiah(BASE_PACKAGE_PRICE)}.
          Setiap orang tambahan +{formatRupiah(EXTRA_PERSON_PRICE)}.
        </p>
      </div>

      <div className="flex flex-col items-center gap-6 rounded-2xl border bg-white p-8 shadow-sm md:p-12">
        <div className="flex items-center gap-6 md:gap-10">
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="h-14 w-14 rounded-full border-2 border-studio-dark/15 hover:border-gold hover:bg-gold/10"
            onClick={() => onChange(numberOfPeople - 1)}
            disabled={isAtMin}
            aria-label="Kurangi jumlah orang"
          >
            <Minus className="h-6 w-6" />
          </Button>

          <div className="flex min-w-[7rem] flex-col items-center">
            <span
              key={numberOfPeople}
              className="animate-price-pop font-display text-7xl font-semibold text-studio-dark md:text-8xl"
            >
              {numberOfPeople}
            </span>
            <span className="mt-1 text-sm text-studio-muted">orang</span>
          </div>

          <Button
            type="button"
            variant="outline"
            size="icon"
            className="h-14 w-14 rounded-full border-2 border-studio-dark/15 hover:border-gold hover:bg-gold/10"
            onClick={() => onChange(numberOfPeople + 1)}
            disabled={isAtMax}
            aria-label="Tambah jumlah orang"
          >
            <Plus className="h-6 w-6" />
          </Button>
        </div>

        <div className="text-center">
          <p className="text-sm text-studio-muted">
            Paket {formatRupiah(BASE_PACKAGE_PRICE)}
            {numberOfPeople > MIN_PEOPLE && (
              <>
                {' + '}
                {numberOfPeople - MIN_PEOPLE} × {formatRupiah(EXTRA_PERSON_PRICE)}
              </>
            )}
          </p>
          <p className="mt-1 font-display text-2xl font-semibold text-gold">
            = {formatRupiah(subtotal)}
          </p>
        </div>
      </div>

      <p className="text-center text-xs text-studio-muted">
        Minimal {MIN_PEOPLE} orang, maksimal {MAX_PEOPLE} orang.
      </p>
    </div>
  )
}
