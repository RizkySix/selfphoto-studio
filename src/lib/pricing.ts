import { BackgroundType, PriceBreakdown, SoftcopyOption } from './types'

export const BASE_PACKAGE_PRICE = 50_000
export const MIN_PEOPLE = 2
export const MAX_PEOPLE = 10
export const EXTRA_PERSON_PRICE = 30_000

export const DEFAULT_DURATION = 10
export const MAX_DURATION = 30
export const DURATION_STEP = 5
export const DURATION_STEP_PRICE = 25_000

export const MAX_BACKGROUNDS = 3
export const EXTRA_BACKGROUND_PRICE = 50_000

export const SOFTCOPY_PAID_PRICE = 20_000

export function calculatePriceBreakdown(
  numberOfPeople: number,
  durationMinutes: number,
  backgroundTypes: BackgroundType[],
  softcopyOption: SoftcopyOption | null
): PriceBreakdown {
  const basePackage = BASE_PACKAGE_PRICE

  const extraPeople = Math.max(0, numberOfPeople - MIN_PEOPLE)
  const peopleSurcharge = extraPeople * EXTRA_PERSON_PRICE

  const extraSteps = Math.max(
    0,
    Math.floor((durationMinutes - DEFAULT_DURATION) / DURATION_STEP)
  )
  const durationSurcharge = extraSteps * DURATION_STEP_PRICE

  const extraBackgrounds = Math.max(0, backgroundTypes.length - 1)
  const backgroundSurcharge = extraBackgrounds * EXTRA_BACKGROUND_PRICE

  const softcopySurcharge =
    softcopyOption === SoftcopyOption.PAID ? SOFTCOPY_PAID_PRICE : 0

  const total =
    basePackage +
    peopleSurcharge +
    durationSurcharge +
    backgroundSurcharge +
    softcopySurcharge

  return {
    basePackage,
    peopleSurcharge,
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
  const extraSteps = Math.max(
    0,
    Math.floor((durationMinutes - DEFAULT_DURATION) / DURATION_STEP)
  )
  return extraSteps * DURATION_STEP_PRICE
}

export function backgroundSurchargeFor(count: number): number {
  return Math.max(0, count - 1) * EXTRA_BACKGROUND_PRICE
}

export function peopleSurchargeFor(count: number): number {
  return Math.max(0, count - MIN_PEOPLE) * EXTRA_PERSON_PRICE
}
