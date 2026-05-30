import { BackgroundType, PriceBreakdown, SoftcopyOption } from './types'

const BASE_PER_PERSON = 30_000
const DURATION_STEP_PRICE = 25_000
const BACKGROUND_SURCHARGE = 50_000
const SOFTCOPY_PAID_PRICE = 20_000

export function calculatePriceBreakdown(
  numberOfPeople: number,
  durationMinutes: number,
  backgroundType: BackgroundType,
  softcopyOption: SoftcopyOption
): PriceBreakdown {
  const basePeople = numberOfPeople * BASE_PER_PERSON

  const extraSteps = Math.max(0, Math.floor((durationMinutes - 10) / 5))
  const durationSurcharge = extraSteps * DURATION_STEP_PRICE

  const backgroundSurcharge =
    backgroundType !== BackgroundType.WALL_BOOK ? BACKGROUND_SURCHARGE : 0

  const softcopySurcharge =
    softcopyOption === SoftcopyOption.PAID ? SOFTCOPY_PAID_PRICE : 0

  const total =
    basePeople + durationSurcharge + backgroundSurcharge + softcopySurcharge

  return {
    basePeople,
    durationSurcharge,
    backgroundSurcharge,
    softcopySurcharge,
    total,
  }
}

export function formatRupiah(amount: number): string {
  const rounded = Math.round(amount)
  const formatted = rounded
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  return `Rp ${formatted}`
}

export function durationSurchargeFor(durationMinutes: number): number {
  const extraSteps = Math.max(0, Math.floor((durationMinutes - 10) / 5))
  return extraSteps * DURATION_STEP_PRICE
}
